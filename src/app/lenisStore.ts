import Lenis from 'lenis'

let current: Lenis | null = null
const listeners = new Set<() => void>()

export function getLenis() {
  return current
}

export function setLenis(next: Lenis | null) {
  current = next
  for (const l of listeners) l()
}

export function subscribeLenis(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

