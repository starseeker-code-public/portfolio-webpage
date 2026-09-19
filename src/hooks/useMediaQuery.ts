import { useMemo, useSyncExternalStore } from 'react'

/** True only for devices with a real hovering pointer. Touch browsers emit a
 *  synthetic `mouseenter` just before `click`, so a control wired to both would
 *  open on the enter and immediately close on the click. Gate the hover half. */
export function canHover() {
  return typeof window !== 'undefined'
    && window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    useMemo(
      () => (onChange: () => void) => {
        const mq = window.matchMedia(query)
        mq.addEventListener('change', onChange)
        return () => mq.removeEventListener('change', onChange)
      },
      [query],
    ),
    () => window.matchMedia(query).matches,
    () => false,
  )
}
