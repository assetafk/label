import {
  useCallback,
  useEffect,
  useInsertionEffect,
  useMemo,
  useReducer,
} from 'react'
import {
  getInitialTheme,
  ThemeContext,
  themeReducer,
  type Theme,
} from './themeContext'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(themeReducer, undefined, getInitialTheme)

  const setTheme = useCallback((t: Theme) => dispatch({ type: 'set', theme: t }), [])
  const toggleTheme = useCallback(() => dispatch({ type: 'toggle' }), [])

  useInsertionEffect(() => {
    document.documentElement.dataset.theme = state.theme
  }, [state.theme])

  useEffect(() => {
    window.localStorage.setItem('theme', state.theme)
  }, [state.theme])

  const value = useMemo(
    () => ({ theme: state.theme, setTheme, toggleTheme }),
    [setTheme, state.theme, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
