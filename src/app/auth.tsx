import { useCallback, useEffect, useMemo, useReducer } from 'react'
import { AuthContext, authReducer, getInitialAuthState } from './authContext'
import { getCurrentUser } from '../lib/api'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, undefined, () => getInitialAuthState())

  useEffect(() => {
    if (!state.token || state.user || !state.loading) return

    let cancelled = false
    ;(async () => {
      try {
        const res = await getCurrentUser()
        if (cancelled) return
        dispatch({ type: 'login', user: res.user, token: state.token! })
      } catch {
        if (cancelled) return
        window.localStorage.removeItem('auth_token')
        dispatch({ type: 'logout' })
      }
    })()

    return () => {
      cancelled = true
    }
  }, [state.loading, state.token, state.user])

  const login = useCallback((user: { email: string }, token: string) => {
    window.localStorage.setItem('auth_token', token)
    dispatch({ type: 'login', user, token })
  }, [])

  const logout = useCallback(() => {
    window.localStorage.removeItem('auth_token')
    dispatch({ type: 'logout' })
  }, [])

  const value = useMemo(
    () => ({
      user: state.user,
      token: state.token,
      loading: state.loading,
      login,
      logout,
    }),
    [login, logout, state.loading, state.token, state.user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

