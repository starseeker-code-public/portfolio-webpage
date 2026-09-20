import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { AppRoutes } from './routes'
import CV from './pages/CV'

/**
 * Build-time only. scripts/prerender.mjs calls this once per route and folds the
 * markup into dist/, so a crawler that never runs JavaScript still gets the whole
 * page. That is most of them: LinkedIn, Slack, WhatsApp, X and the AI crawlers
 * read the raw response and nothing else.
 *
 * CV is imported eagerly here — the lazy() wrapper App.tsx uses would make
 * renderToString emit the Suspense fallback (an empty div) instead of the CV.
 */
export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <AppRoutes cv={<CV />} />
    </StaticRouter>,
  )
}

/* Re-exported so scripts/prerender.mjs has a single compiled module to import:
   it needs the head markup and the route list alongside render(), and reaching
   into the uncompiled TypeScript of src/data/seo.ts from a plain .mjs script is
   not something Node will do for us. */
export {
  renderHeadTags, INDEXABLE_ROUTES,
  SEO_BLOCK_START, SEO_BLOCK_END,
} from './data/seo'
