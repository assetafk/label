import { createContext } from 'react'

export type Theme = 'dark' | 'light'

export type ThemeState = { theme: Theme }
export type ThemeAction = { type: 'set'; theme: Theme } | { type: 'toggle' }

export function getInitialTheme(): ThemeState {
  if (typeof window === 'undefined') return { theme: 'dark' }
  const saved = window.localStorage.getItem('theme')
  if (saved === 'light' || saved === 'dark') return { theme: saved }
  const prefersLight =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: light)').matches
  return { theme: prefersLight ? 'light' : 'dark' }
}

export function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case 'set':
      return { theme: action.theme }
    case 'toggle':
      return { theme: state.theme === 'dark' ? 'light' : 'dark' }
  }
}

export type ThemeContextValue = {
  theme: Theme
  setTheme: (t: Theme) => void
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

