import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

/* Split out: /cv pulls in jsPDF + html2canvas, which the landing page never needs. */
const CV = lazy(() => import('./pages/CV'))

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/cv"
        element={
          <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
            <CV />
          </Suspense>
        }
      />
    </Routes>
  )
}
