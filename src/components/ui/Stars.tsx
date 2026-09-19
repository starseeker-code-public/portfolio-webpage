import { useMemo } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'

export function Stars() {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  /* Phones pay for every one of these nodes on each composited frame, so they
     get a thinner field. Memoised because Math.random() in the render body
     reshuffled the whole sky on any parent re-render. */
  const count = isMobile ? 110 : 300

  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() > 0.88 ? 2 : 1,
        opacity: 0.2 + Math.random() * 0.6,
      })),
    [count],
  )

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <div
        className={reducedMotion ? 'absolute inset-0' : 'stars-layer absolute inset-0'}
        style={{ width: '150%', height: '150%', top: '-25%', left: '-25%' }}
      >
        {stars.map(s => (
          <div key={s.id} className="absolute rounded-full bg-white"
            style={{ top: s.top, left: s.left, width: s.size, height: s.size, opacity: s.opacity }} />
        ))}
      </div>
    </div>
  )
}
