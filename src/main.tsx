import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

const container = document.getElementById('root')!

const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

/* scripts/prerender.mjs writes the markup into #root at build time, so in
   production there is already a tree to adopt — hydrating reuses it instead of
   throwing it away and repainting. `npm run dev` serves an empty root and takes
   the createRoot branch. */
if (container.firstElementChild) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
