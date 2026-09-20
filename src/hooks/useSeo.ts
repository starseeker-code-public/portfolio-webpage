import { useEffect } from 'react'
import { ROUTE_SEO } from '../data/seo'

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * Keeps the title, description and canonical in step with the current route.
 *
 * Crawlers never need this — they get a prerendered document per route, with
 * the head already correct (src/data/seo.ts, baked in by vite.config.ts). This
 * is for the human case: following the in-app link from the hero to /cv is a
 * client-side navigation, and without it the browser tab, the bookmark title
 * and the canonical would all still describe the landing page.
 */
export function useSeo(route: keyof typeof ROUTE_SEO) {
  useEffect(() => {
    const seo = ROUTE_SEO[route]
    if (!seo) return

    document.title = seo.title
    setMeta('meta[name="description"]', 'name', 'description', seo.description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', seo.title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', seo.description)
    setMeta('meta[property="og:url"]', 'property', 'og:url', seo.url)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = seo.url
  }, [route])
}
