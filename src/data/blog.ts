import { useState, useEffect } from 'react'
import type { BlogPost } from '../types'

export const BLOG_API_URL = 'https://personal-blog-backend-e538.onrender.com/api/feed/portfolio'

export const BLOG_FRONTEND = 'https://joaquin-blog.uk'
const CACHE_KEY = 'blog_posts_cache'
const MAX_POSTS = 3

// Render's router prefixes internal links with "a/" in the feed response.
// Strip that prefix and prepend the real frontend base URL.
function fixPostUrl(url: string): string {
  if (url.startsWith('http')) return url
  return `${BLOG_FRONTEND}/${url.replace(/^a\//, '')}`
}

function saveToCache(posts: BlogPost[]): void {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(posts)) } catch {}
}

function loadFromCache(): BlogPost[] | null {
  try { return JSON.parse(localStorage.getItem(CACHE_KEY) ?? 'null') } catch { return null }
}

const PREVIEW_POST: BlogPost = {
  title: 'Why I switched from Celery to asyncio queues for I/O-bound tasks',
  date: 'Mar 2026',
  url: 'https://github.com/starseeker-code-public/personal-blog',
  readTime: '8 min',
}

const RETRY_DELAY_MS = 2 * 60 * 1000

// Silent background retry — only saves to cache, never touches the current UI.
// When the user next loads the page they'll get the freshly cached data.
const backgroundRetry = async (retriesLeft: number): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS))
  try {
    const r = await fetch(BLOG_API_URL)
    if (!r.ok) throw new Error()
    const data: BlogPost[] = await r.json()
    const fixed = data.map(p => ({ ...p, url: fixPostUrl(p.url) })).slice(0, MAX_POSTS)
    saveToCache(fixed)
  } catch {
    if (retriesLeft > 0) backgroundRetry(retriesLeft - 1)
  }
}

export function useBlogPosts() {
  const cached = loadFromCache()
  const [posts, setPosts] = useState<BlogPost[]>(cached ?? [PREVIEW_POST])
  const [isLive, setIsLive] = useState(false)
  const [fetchFailed, setFetchFailed] = useState(false)
  const hadCache = cached !== null

  useEffect(() => {
    fetch(BLOG_API_URL)
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then((data: BlogPost[]) => {
        const fixed = data.map(p => ({ ...p, url: fixPostUrl(p.url) })).slice(0, MAX_POSTS)
        saveToCache(fixed)
        setPosts(fixed)
        setIsLive(true)
      })
      .catch(() => { setFetchFailed(true); backgroundRetry(1) })
  }, [])

  // true when fetch failed and user has no cached data — show fallback message
  const showFallback = fetchFailed && !hadCache

  return { posts, isLive, showFallback }
}
