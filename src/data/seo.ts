import { SITE } from './site'
import { YEARS_EXP } from './career'

/* Everything a crawler reads before it runs a line of JavaScript.
   Leaf module by design — vite.config.ts imports it to bake the <head> and the
   JSON-LD into dist/index.html at build time, so it must stay free of React and
   of anything that touches `window`. */

/** No trailing slash: every URL below is built by concatenation. */
export const SITE_URL = 'https://joaquin-hm.com'

export const OG_IMAGE = `${SITE_URL}/og-image.jpg`
export const OG_IMAGE_ALT =
  'Joaquín Hernández Martínez — Senior Backend Engineer. Python, distributed systems, cloud, AI integration.'

/** Searches spell the name both ways, and the two are different strings to a
 *  search engine. The accented form is the one people read; the bare ASCII form
 *  is the one they type, and the one LinkedIn and GitHub already index. */
export const NAME_ASCII = 'Joaquin Hernandez Martinez'

export interface RouteSeo {
  title: string
  description: string
  /** Absolute canonical URL. */
  url: string
  /** og:type — a person's landing page is a profile, a document is an article. */
  ogType: 'profile' | 'article'
}

export const ROUTE_SEO: Record<string, RouteSeo> = {
  '/': {
    title: `${SITE.name} — Senior Python Backend Engineer`,
    description:
      `Senior Python backend engineer with ${YEARS_EXP}+ years building distributed systems, ` +
      `APIs and cloud infrastructure, now with AI-integrated workflows. ` +
      `Available for backend, architecture and consulting work from Albacete, Spain.`,
    url: `${SITE_URL}/`,
    ogType: 'profile',
  },
  '/cv': {
    title: `CV — ${SITE.name}, Senior Python Backend Engineer`,
    description:
      `Curriculum vitae of ${SITE.name}: ${YEARS_EXP}+ years of Python backend engineering across ` +
      `Allot, Mercedes-Benz and Tajamar. Distributed architecture, Kubernetes, Kafka, ` +
      `FastAPI and team leadership. Downloadable as PDF.`,
    url: `${SITE_URL}/cv`,
    ogType: 'article',
  },
}

/** The routes that go in the sitemap, in priority order. */
export const INDEXABLE_ROUTES = Object.keys(ROUTE_SEO)

/* A deliberate shortlist, not SKILLS.flat(). knowsAbout is an entity hint, and
   eighty terms dilute it into noise — these are the ones worth ranking for. */
const KNOWS_ABOUT = [
  'Python', 'Backend Development', 'Distributed Systems', 'Microservices',
  'FastAPI', 'Django', 'Flask', 'Celery', 'AsyncIO',
  'PostgreSQL', 'MongoDB', 'Redis', 'Apache Kafka', 'Elasticsearch',
  'Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD',
  'REST APIs', 'GraphQL', 'gRPC', 'OpenAPI', 'Event-Driven Architecture',
  'Domain-Driven Design', 'Software Architecture', 'Technical Leadership',
  'AI Integration', 'Large Language Models',
]

/**
 * schema.org description of who owns this site, as a @graph so the Person,
 * the WebSite and the current page can reference each other by @id instead of
 * being three unrelated islands. That linkage is what lets Google treat the
 * GitHub, LinkedIn and dev.to profiles in `sameAs` as the same human.
 */
export function buildJsonLd(route: keyof typeof ROUTE_SEO = '/'): string {
  const seo = ROUTE_SEO[route] ?? ROUTE_SEO['/']
  const personId = `${SITE_URL}/#person`
  const siteId = `${SITE_URL}/#website`

  const graph: unknown[] = [
    {
      '@type': 'Person',
      '@id': personId,
      name: SITE.name,
      alternateName: [NAME_ASCII, 'Joaquín Hernández'],
      url: `${SITE_URL}/`,
      image: `${SITE_URL}${SITE.photo}`,
      email: `mailto:${SITE.email}`,
      telephone: SITE.phone,
      jobTitle: 'Senior Python Backend Engineer',
      description:
        `Senior Python engineer with ${YEARS_EXP}+ years in advanced backend development, ` +
        `distributed system design and AI-integrated workflows.`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Albacete',
        addressCountry: 'ES',
      },
      worksFor: {
        '@type': 'Organization',
        name: 'Allot',
        url: 'https://www.allot.com',
      },
      knowsLanguage: [
        { '@type': 'Language', name: 'Spanish', alternateName: 'es' },
        { '@type': 'Language', name: 'English', alternateName: 'en' },
      ],
      knowsAbout: KNOWS_ABOUT,
      sameAs: [
        SITE.social.github,
        SITE.social.linkedin,
        SITE.social.devto,
        SITE.social.codewars,
      ],
    },
    {
      '@type': 'WebSite',
      '@id': siteId,
      url: `${SITE_URL}/`,
      name: `${SITE.name} — Portfolio`,
      inLanguage: 'en',
      publisher: { '@id': personId },
    },
    {
      '@type': route === '/' ? 'ProfilePage' : 'WebPage',
      '@id': `${seo.url}#page`,
      url: seo.url,
      name: seo.title,
      description: seo.description,
      isPartOf: { '@id': siteId },
      about: { '@id': personId },
      primaryImageOfPage: { '@type': 'ImageObject', url: OG_IMAGE },
    },
  ]

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
}

/** Markers the prerender step looks for when it swaps the '/' head for '/cv'. */
export const SEO_BLOCK_START = '<!--seo:start-->'
export const SEO_BLOCK_END = '<!--seo:end-->'

function attr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * The whole crawler-facing <head>, as a string, for one route.
 *
 * This is deliberately not a React component. Social crawlers — LinkedIn,
 * Slack, WhatsApp, X — never execute the bundle, so anything rendered by React
 * is invisible to exactly the audience these tags exist for. They have to be in
 * the HTML that leaves the server.
 */
export function renderHeadTags(route: keyof typeof ROUTE_SEO = '/'): string {
  const seo = ROUTE_SEO[route] ?? ROUTE_SEO['/']
  const tags = [
    `<title>${attr(seo.title)}</title>`,
    `<meta name="description" content="${attr(seo.description)}" />`,
    `<link rel="canonical" href="${attr(seo.url)}" />`,
    `<meta name="author" content="${attr(SITE.name)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />`,

    `<meta property="og:type" content="${seo.ogType}" />`,
    `<meta property="og:site_name" content="${attr(SITE.name)}" />`,
    `<meta property="og:locale" content="en_GB" />`,
    `<meta property="og:url" content="${attr(seo.url)}" />`,
    `<meta property="og:title" content="${attr(seo.title)}" />`,
    `<meta property="og:description" content="${attr(seo.description)}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${attr(OG_IMAGE_ALT)}" />`,

    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${attr(seo.title)}" />`,
    `<meta name="twitter:description" content="${attr(seo.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    `<meta name="twitter:image:alt" content="${attr(OG_IMAGE_ALT)}" />`,

    /* `<` escaped: an unescaped `</script>` anywhere in the JSON would close the
       tag early and spill the rest of the graph into the document as text. */
    `<script type="application/ld+json">${buildJsonLd(route).replace(/</g, '\\u003c')}</script>`,
  ]
  return [SEO_BLOCK_START, ...tags.map(t => `    ${t}`), `    ${SEO_BLOCK_END}`].join('\n')
}

/** sitemap.xml contents. `lastmod` is build date — the site redeploys on change. */
export function renderSitemap(lastmod = new Date().toISOString().slice(0, 10)): string {
  const urls = INDEXABLE_ROUTES.map(route => {
    const { url } = ROUTE_SEO[route]
    const priority = route === '/' ? '1.0' : '0.8'
    return [
      '  <url>',
      `    <loc>${url}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      '    <changefreq>monthly</changefreq>',
      `    <priority>${priority}</priority>`,
      '  </url>',
    ].join('\n')
  })
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n')
}

/** robots.txt contents. */
export function renderRobots(): string {
  return [
    '# https://www.robotstxt.org/robotstxt.html',
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ].join('\n')
}

/**
 * Netlify serves dist/404.html, with a real 404 status, for anything that does
 * not match a file or a redirect rule. Before it existed the SPA catch-all
 * answered every unknown path with the landing page at status 200, which is an
 * unbounded supply of soft-404 duplicates for a crawler to find and index.
 *
 * Deliberately standalone: it inlines its own styles rather than loading the
 * hashed bundle, so a wrong URL costs one small request and nothing else.
 */
export function render404(): string {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page not found — ${SITE.name}</title>
    <meta name="robots" content="noindex, follow" />
    <meta name="theme-color" content="#060516" />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <style>
      :root { color-scheme: dark }
      body {
        margin: 0; min-height: 100vh; display: flex; flex-direction: column;
        align-items: center; justify-content: center; gap: 1rem;
        background: #060516; color: #cbd5e1; text-align: center; padding: 2rem;
        font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
      }
      h1 { margin: 0; font-size: 4rem; font-weight: 700; color: #818cf8 }
      p { margin: 0; color: #64748b }
      a {
        margin-top: .5rem; padding: .75rem 1.5rem; border-radius: .5rem;
        background: #4f46e5; color: #fff; text-decoration: none; font-size: .875rem;
      }
      a:hover { background: #6366f1 }
    </style>
  </head>
  <body>
    <h1>404</h1>
    <p>That page does not exist.</p>
    <a href="/">Back to the portfolio</a>
  </body>
</html>
`
}
