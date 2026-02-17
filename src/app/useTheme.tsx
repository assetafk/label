import { useContext, useDebugValue } from 'react'
import { ThemeContext } from './themeContext'

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  useDebugValue(ctx.theme)
  return ctx
}

