import { createContext } from 'react'
import type { AuthUser } from '../lib/api'

export type AuthState = {
  user: AuthUser | null
  token: string | null
  loading: boolean
}

export type AuthAction =
  | { type: 'start' }
  | { type: 'login'; user: AuthUser; token: string }
  | { type: 'logout' }

export function getInitialAuthState(): AuthState {
  if (typeof window === 'undefined') return { user: null, token: null, loading: true }
  const token = window.localStorage.getItem('auth_token')
  return { user: null, token, loading: !!token }
}

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'start':
      return { ...state, loading: true }
    case 'login':
      return { user: action.user, token: action.token, loading: false }
    case 'logout':
      return { user: null, token: null, loading: false }
  }
}

export type AuthContextValue = {
  user: AuthUser | null
  token: string | null
  loading: boolean
  login: (user: AuthUser, token: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

