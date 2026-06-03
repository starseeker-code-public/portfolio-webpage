import { useState, useEffect } from 'react'
import type { BlogPost } from '../types'

export const BLOG_API_URL = 'https://raw.githubusercontent.com/starseeker-code-public/personal-blog/main/posts.json'

const PREVIEW_POST: BlogPost = {
  title: 'Why I switched from Celery to asyncio queues for I/O-bound tasks',
  date: 'Mar 2026',
  url: 'https://github.com/starseeker-code-public/personal-blog',
  readTime: '8 min',
}

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([PREVIEW_POST])
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    fetch(BLOG_API_URL)
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then((data: BlogPost[]) => { setPosts(data); setIsLive(true) })
      .catch(() => {})
  }, [])

  return { posts, isLive }
}
