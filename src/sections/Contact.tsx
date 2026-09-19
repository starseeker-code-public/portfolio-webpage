import { useState } from 'react'
import { SITE } from '../data'
import { useRandomQuote } from '../data/quotes'
import { Section, SectionHeading } from '../components/ui'
import { IcoGithub, IcoLinkedin, IcoWhatsapp, IcoMail } from '../components/icons'

const ICON_LINKS = [
  { label: 'GitHub',   icon: <IcoGithub />,   href: SITE.social.github },
  { label: 'LinkedIn', icon: <IcoLinkedin />,  href: SITE.social.linkedin },
  { label: 'WhatsApp', icon: <IcoWhatsapp />,  href: SITE.social.whatsapp },
]

/* The Netlify Function, at its DEFAULT path. It is the only thing that holds the
   API token — the browser never sees it, because everything this bundle knows is
   public. See netlify/functions/contact.ts.

   Running `vite dev` alone, this 404s and the form reports that it could not
   send: functions only exist under `netlify dev`. That is the honest failure —
   the alternative, faking a success in development, hides exactly the bug this
   form is most likely to have. */
const ENDPOINT = '/.netlify/functions/contact'

/* Mirrors the caps in the function and on the backend. Enforced here only to
   tell someone BEFORE they lose a long message, never as the real check. */
const MAX_MESSAGE = 5000

type Status = 'idle' | 'sending' | 'sent' | 'error'

const FIELD_CLASS =
  'w-full rounded-lg bg-slate-900/70 border border-white/10 px-3 py-2.5 text-sm text-slate-200 ' +
  'placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 ' +
  'transition-colors disabled:opacity-60'

function Label({ htmlFor, children, optional }: { htmlFor: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="block text-xs text-slate-400 mb-1.5">
      {children}
      {optional && <span className="text-slate-600"> (optional)</span>}
    </label>
  )
}

function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [length, setLength] = useState(0)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'sending') return

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    setStatus('sending')
    setError('')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      /* The response is checked, not assumed. A form that reports "sent" on
         anything it manages to receive looks identical whether it delivered or
         vanished — and nobody follows up on a message they believe arrived. */
      const body = await res.json().catch(() => ({}))
      if (!res.ok || body?.ok !== true) {
        setError(body?.error || 'The message could not be sent. Please email me directly.')
        setStatus('error')
        return
      }
      form.reset()
      setLength(0)
      setStatus('sent')
    } catch {
      // Offline, DNS, a blocked request — never reached the function at all.
      setError('Could not reach the server. Please email me directly.')
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div
        role="status"
        className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-6 text-center"
      >
        <p className="text-emerald-300 text-sm font-medium mb-1">Message sent — thanks!</p>
        <p className="text-slate-400 text-xs mb-4">
          It lands in my inbox and I usually reply within a day or two.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="text-indigo-400 hover:text-indigo-300 text-xs underline underline-offset-4 transition-colors"
        >
          Send another
        </button>
      </div>
    )
  }

  const sending = status === 'sending'

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-xl border border-white/10 bg-slate-900/40 p-5 sm:p-6">
      {/* Honeypot. Hidden from people and from screen readers, left in the DOM
          for the bots that fill in every field they find. A non-empty value gets
          a cheerful 200 from the function and nothing is sent. `absolute` rather
          than `display:none`, which the better bots check for. */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor="company_website">Leave this empty</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cf-name">Name</Label>
          <input id="cf-name" name="name" type="text" required maxLength={500} autoComplete="name"
            disabled={sending} className={FIELD_CLASS} placeholder="Ada Lovelace" />
        </div>
        <div>
          <Label htmlFor="cf-email">Email</Label>
          <input id="cf-email" name="email" type="email" required maxLength={500} autoComplete="email"
            disabled={sending} className={FIELD_CLASS} placeholder="ada@example.com" />
        </div>
        <div>
          <Label htmlFor="cf-company" optional>Company</Label>
          <input id="cf-company" name="company" type="text" maxLength={500} autoComplete="organization"
            disabled={sending} className={FIELD_CLASS} placeholder="Analytical Engines Ltd." />
        </div>
        <div>
          <Label htmlFor="cf-subject" optional>Subject</Label>
          <input id="cf-subject" name="subject" type="text" maxLength={500}
            disabled={sending} className={FIELD_CLASS} placeholder="Backend role / project" />
        </div>
      </div>

      <div className="mt-4">
        <Label htmlFor="cf-message">Message</Label>
        <textarea id="cf-message" name="message" required rows={5} maxLength={MAX_MESSAGE}
          disabled={sending} className={`${FIELD_CLASS} resize-y min-h-[120px]`}
          onChange={e => setLength(e.target.value.length)}
          placeholder="What are you building, and where could I help?" />
        {/* Only once it is close enough to matter — a counter from zero is noise. */}
        {length > MAX_MESSAGE * 0.8 && (
          <p className="text-right text-xs text-slate-500 mt-1">{MAX_MESSAGE - length} characters left</p>
        )}
      </div>

      {/* aria-live so the outcome is announced, not just shown. Rendered only
          when there is something to say, so it never reserves empty space. */}
      {status === 'error' && (
        <p role="alert" className="mt-4 text-sm text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
          {error}{' '}
          <a href={`mailto:${SITE.email}`} className="underline underline-offset-4 hover:text-rose-200">
            {SITE.email}
          </a>
        </p>
      )}

      <button type="submit" disabled={sending}
        className="mt-5 w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
        {sending ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}

export function Contact() {
  const quote = useRandomQuote()

  return (
    <Section id="contact">
      <SectionHeading>Contact</SectionHeading>

      <p className="text-slate-400 text-sm mb-6 max-w-lg">
        Have a project in mind or just want to talk Python? Feel free to reach out.
      </p>

      {quote && (
        <p className="text-slate-500 text-xs italic mb-8 max-w-lg">
          "{quote.q}" — {quote.a}
        </p>
      )}

      <div className="grid lg:grid-cols-[minmax(0,1fr)_auto] gap-8 lg:gap-12 items-start">
        <div className="max-w-xl">
          <ContactForm />
        </div>

        <div>
          <p className="text-slate-500 text-xs uppercase tracking-widest mb-3">Or reach me directly</p>
          <div className="flex flex-col sm:flex-row lg:flex-col sm:flex-wrap gap-3">
            <a href={`mailto:${SITE.email}`}
              className="flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm transition-colors break-all sm:break-normal">
              <IcoMail /> <span>{SITE.email}</span>
            </a>
            <a href={SITE.phoneUrl}
              className="flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm transition-colors">
              📞 {SITE.phone}
            </a>
            <a href={SITE.locationUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm transition-colors">
              📍 {SITE.location}
            </a>
          </div>

          <div className="flex gap-3 mt-4">
            {ICON_LINKS.map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                aria-label={l.label}
                className="flex items-center justify-center w-12 h-12 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors">
                {l.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
