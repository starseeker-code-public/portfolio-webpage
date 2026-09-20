import { lazy, Suspense } from 'react'
import { AppRoutes } from './routes'

/* Split out: /cv pulls in jsPDF + html2canvas, which the landing page never needs. */
const CV = lazy(() => import('./pages/CV'))

export default function App() {
  return (
    <AppRoutes
      cv={
        <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
          <CV />
        </Suspense>
      }
    />
  )
}
