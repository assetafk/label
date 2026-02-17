import Lenis from 'lenis'
import { useEffect, useRef } from 'react'
import { setLenis } from './lenisStore'

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    })
    setLenis(instance)

    const raf = (time: number) => {
      instance.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }
    rafRef.current = requestAnimationFrame(raf)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return children
}

