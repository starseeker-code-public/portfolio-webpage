/**
 * Contact-form relay. The browser posts here; this posts to the mail endpoint.
 *
 * WHY THIS EXISTS AT ALL — the form could `fetch()` the backend directly, and
 * that is exactly what must not happen. The backend authenticates with a shared
 * bearer token, and this is a STATIC site: anything the browser needs is in the
 * bundle, and anything in the bundle is public. A `VITE_`-prefixed secret is not
 * a secret, it is a secret published to everyone who opens devtools — and a
 * leaked token on an endpoint that sends mail is a spam relay with someone
 * else's domain reputation attached.
 *
 * A Netlify Function runs on Netlify's servers, so `process.env` here is genuinely
 * server-side. The token is read at invocation and never leaves this file.
 *
 * It also removes a problem rather than solving one: because the call is
 * server-to-server, the backend never sees a browser Origin and needs no CORS
 * configuration at all. Calling it from the page would have meant adding
 * django-cors-headers to a project that deliberately removed it.
 *
 * Deployed at /.netlify/functions/contact — the DEFAULT path, deliberately. A
 * custom `config.path` of /api/... would sit in the same namespace as the
 * `/* -> /index.html` SPA rewrite in netlify.toml, and the failure mode of
 * getting that precedence wrong is the form posting into the HTML shell and
 * "succeeding" with a 200.
 */

/** Fixed here, not taken from the request: the backend accepts these and drops the rest. */
const FIELDS = ['name', 'email', 'company', 'subject', 'message'] as const
const REQUIRED = ['name', 'email', 'message'] as const

/** Mirrors the caps on the backend, so the message is rejected here with a
 *  readable reason rather than silently truncated there. */
const MAX_FIELD = 500
const MAX_MESSAGE = 5000

/** Netlify's own synchronous limit is 10 s; stop short of it so a slow upstream
 *  returns OUR message rather than Netlify's generic 502 page. The backend runs
 *  on Cloud Run and sends mail inline, so a cold start is genuinely slow. */
const UPSTREAM_TIMEOUT_MS = 9000

const DEFAULT_ENDPOINT = 'https://fiveaday-332600671945.europe-southwest1.run.app/api/portfolio/contact/'

/**
 * Best-effort per-visitor throttle.
 *
 * Deliberately in-memory, and deliberately described as best-effort: this runs
 * on Lambda, so the map survives only while a container stays warm and a burst
 * spread across cold starts slips through. It is worth having anyway because it
 * catches the common case — one person, one impatient finger, ten submissions —
 * at zero cost and with no external store.
 *
 * The REAL ceiling is the backend's own rate limit. That one is a global cap
 * (every request reaches it from Netlify's egress address, so per-IP buckets
 * there hold the whole site's traffic); this one is the only layer that can see
 * individual visitors, which is why both exist.
 */
const RATE_LIMIT = 3
const RATE_WINDOW_MS = 10 * 60 * 1000
const seen = new Map<string, number[]>()

function throttled(ip: string): boolean {
  const now = Date.now()
  const hits = (seen.get(ip) ?? []).filter(t => now - t < RATE_WINDOW_MS)
  hits.push(now)
  seen.set(ip, hits)

  // A warm container must not accumulate an address per visitor forever.
  if (seen.size > 500) {
    for (const [key, times] of seen) {
      if (times.every(t => now - t >= RATE_WINDOW_MS)) seen.delete(key)
    }
  }
  return hits.length > RATE_LIMIT
}

function json(body: Record<string, unknown>, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return json({ ok: false, error: 'Method not allowed.' }, 405)
  }

  const token = process.env.PORTFOLIO_CONTACT_TOKEN
  const endpoint = process.env.PORTFOLIO_CONTACT_ENDPOINT || DEFAULT_ENDPOINT
  if (!token) {
    // Configuration, not visitor error. Say so in the log — where only I can
    // see it — and give the visitor a channel that does work.
    console.error('PORTFOLIO_CONTACT_TOKEN is not set; the contact form cannot deliver.')
    return json({ ok: false, error: 'The form is not available right now. Please email me directly.' }, 503)
  }

  let payload: Record<string, unknown>
  try {
    const parsed = await request.json()
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) throw new Error('not an object')
    payload = parsed as Record<string, unknown>
  } catch {
    return json({ ok: false, error: 'Malformed request.' }, 400)
  }

  // Honeypot: a field no human ever sees, let alone fills in. A cheerful 200
  // with nothing sent — telling a bot it was caught only teaches it to leave
  // the field alone next time.
  if (String(payload['company_website'] ?? '').trim()) {
    return json({ ok: true }, 200)
  }

  const values: Record<string, string> = {}
  for (const field of FIELDS) {
    const raw = payload[field]
    values[field] = raw === null || raw === undefined ? '' : String(raw).trim()
  }

  const missing = REQUIRED.filter(field => !values[field])
  if (missing.length > 0) {
    return json({ ok: false, error: `Please fill in: ${missing.join(', ')}.` }, 400)
  }
  // Not a validator so much as a typo-catcher — the real check is whether a
  // reply ever arrives, and an over-strict pattern rejects valid addresses.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    return json({ ok: false, error: 'That email address does not look right.' }, 400)
  }
  if (values.message.length > MAX_MESSAGE) {
    return json({ ok: false, error: `Please keep the message under ${MAX_MESSAGE} characters.` }, 400)
  }
  if (FIELDS.some(field => field !== 'message' && values[field].length > MAX_FIELD)) {
    return json({ ok: false, error: 'One of the fields is too long.' }, 400)
  }

  // Netlify sets x-nf-client-connection-ip to the real client address; the
  // x-forwarded-for fallback is for `netlify dev`, where the former is absent.
  const ip =
    request.headers.get('x-nf-client-connection-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'
  if (throttled(ip)) {
    return json({ ok: false, error: 'That is a few messages in a short while — try again later.' }, 429)
  }

  let upstream: Response
  try {
    upstream = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    })
  } catch (error) {
    // Includes the abort. The backend sends mail inline on Cloud Run, so a cold
    // start can genuinely outlast the budget above — and the message may still
    // arrive. Never claim it did.
    console.error('Contact relay could not reach the mail endpoint:', error)
    return json({ ok: false, error: 'Could not reach the mail service. Please email me directly.' }, 502)
  }

  if (!upstream.ok) {
    // The upstream body is deliberately NOT forwarded. It is written for me, not
    // for a visitor, and echoing it verbatim turns this into a probe for the
    // backend's internals (which settings are missing, whether a token matched).
    console.error(`Mail endpoint refused the relay: HTTP ${upstream.status}`)
    const visitorFacing =
      upstream.status === 429
        ? 'Too many messages right now — please try again later.'
        : 'The message could not be sent. Please email me directly.'
    return json({ ok: false, error: visitorFacing }, upstream.status === 429 ? 429 : 502)
  }

  return json({ ok: true }, 200)
}
