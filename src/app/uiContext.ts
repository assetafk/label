import { createContext } from 'react'

export type UiState = {
  menuOpen: boolean
}

export type UiAction =
  | { type: 'openMenu' }
  | { type: 'closeMenu' }
  | { type: 'toggleMenu' }

export function uiReducer(state: UiState, action: UiAction): UiState {
  switch (action.type) {
    case 'openMenu':
      return { ...state, menuOpen: true }
    case 'closeMenu':
      return { ...state, menuOpen: false }
    case 'toggleMenu':
      return { ...state, menuOpen: !state.menuOpen }
  }
}

export type UiContextValue = {
  menuOpen: boolean
  openMenu: () => void
  closeMenu: () => void
  toggleMenu: () => void
}

export const UiContext = createContext<UiContextValue | null>(null)

