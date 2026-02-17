import { useCallback, useMemo, useReducer } from 'react'
import { UiContext, uiReducer } from './uiContext'

export function UiProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(uiReducer, { menuOpen: false })

  const openMenu = useCallback(() => dispatch({ type: 'openMenu' }), [])
  const closeMenu = useCallback(() => dispatch({ type: 'closeMenu' }), [])
  const toggleMenu = useCallback(() => dispatch({ type: 'toggleMenu' }), [])

  const value = useMemo(
    () => ({ menuOpen: state.menuOpen, openMenu, closeMenu, toggleMenu }),
    [closeMenu, openMenu, state.menuOpen, toggleMenu],
  )

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>
}
