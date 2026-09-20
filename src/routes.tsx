import type { ReactNode } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

/**
 * The one route table. The client passes a lazily-loaded CV (App.tsx) and the
 * prerender pass passes an eagerly-imported one (entry-server.tsx); keeping the
 * paths here means the two can never drift out of step with each other — or
 * with the sitemap, which is generated from the same list of paths in
 * src/data/seo.ts.
 */
export function AppRoutes({ cv }: { cv: ReactNode }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cv" element={cv} />
    </Routes>
  )
}
