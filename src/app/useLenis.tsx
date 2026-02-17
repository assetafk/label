import { useCallback, useSyncExternalStore } from 'react'
import { getLenis, subscribeLenis } from './lenisStore'

export function useLenis() {
  const lenis = useSyncExternalStore(subscribeLenis, getLenis, getLenis)

  const scrollTo = useCallback(
    (
      target: number | string | HTMLElement,
      opts?: { offset?: number; immediate?: boolean },
    ) => {
      if (!lenis) {
        if (opts?.immediate) {
          if (typeof target === 'number') window.scrollTo({ top: target })
          else if (typeof target === 'string')
            document.querySelector(target)?.scrollIntoView()
          else target.scrollIntoView()
        }
        return
      }

      if (opts?.immediate) {
        if (typeof target === 'number') window.scrollTo({ top: target })
        else if (typeof target === 'string') document.querySelector(target)?.scrollIntoView()
        else target.scrollIntoView()
        return
      }

      lenis.scrollTo(target, { offset: opts?.offset ?? 0 })
    },
    [lenis],
  )

  return { lenis, scrollTo }
}

