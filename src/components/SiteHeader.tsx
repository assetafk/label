import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../app/useTheme'
import { useUi } from '../app/useUi'
import { useLenis } from '../app/useLenis'

function navLinkClassName({ isActive }: { isActive: boolean }) {
  return [
    'text-sm tracking-wide transition-opacity',
    isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100',
  ].join(' ')
}

export function SiteHeader() {
  const nav = useNavigate()
  const location = useLocation()
  const { scrollTo } = useLenis()
  const { theme, toggleTheme } = useTheme()
  const { menuOpen, closeMenu, toggleMenu } = useUi()
  const headerRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const el = headerRef.current
    if (!el) return

    const set = () => {
      document.documentElement.style.setProperty('--header-h', `${el.offsetHeight}px`)
    }
    set()

    const ro = new ResizeObserver(() => set())
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    closeMenu()
  }, [closeMenu, location.pathname])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [closeMenu, menuOpen])

  const onContact = useCallback(() => {
    if (location.pathname !== '/') {
      nav('/')
      // allow route transition to mount contact section
      setTimeout(() => {
        scrollTo('#contact', { offset: -88 })
      }, 50)
      return
    }
    scrollTo('#contact', { offset: -88 })
  }, [location.pathname, nav, scrollTo])

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur"
    >
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-4 md:px-8">
        <NavLink to="/" className="group inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[rgb(var(--accent))]" />
          <span className="text-sm font-medium tracking-[0.18em] uppercase text-[rgb(var(--fg))] opacity-90 group-hover:opacity-100">
            Label
          </span>
        </NavLink>

        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-6 md:flex">
            <NavLink to="/works" className={navLinkClassName}>
              Works
            </NavLink>
            <button
              type="button"
              onClick={onContact}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm tracking-wide opacity-90 transition hover:bg-white/10 hover:opacity-100"
            >
              Contact
            </button>
          </nav>

          <button
            type="button"
            onClick={toggleTheme}
            className="hidden rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs tracking-[0.22em] uppercase text-[rgb(var(--fg)/0.75)] transition hover:bg-white/10 hover:text-[rgb(var(--fg))] md:inline-flex"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? 'Dark' : 'Light'}
          </button>

          <button
            type="button"
            onClick={toggleMenu}
            className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm tracking-wide text-[rgb(var(--fg)/0.85)] transition hover:bg-white/10 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            Menu
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="md:hidden">
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            aria-hidden
            onClick={closeMenu}
          />
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            className="fixed right-4 top-20 z-50 w-[min(92vw,360px)] overflow-hidden rounded-3xl border border-white/10 bg-black/70 p-4 backdrop-blur"
          >
            <div className="flex items-center justify-between">
              <div className="text-xs tracking-[0.22em] uppercase text-[rgb(var(--fg)/0.65)]">
                Navigation
              </div>
              <button
                type="button"
                onClick={closeMenu}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-[rgb(var(--fg)/0.75)]"
              >
                Close
              </button>
            </div>

            <div className="mt-4 grid gap-2">
              <NavLink
                to="/works"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[rgb(var(--fg)/0.85)]"
              >
                Works
              </NavLink>
              <button
                type="button"
                onClick={() => {
                  closeMenu()
                  onContact()
                }}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-[rgb(var(--fg)/0.85)]"
              >
                Contact
              </button>
              <button
                type="button"
                onClick={() => {
                  toggleTheme()
                }}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-[rgb(var(--fg)/0.85)]"
              >
                Theme: {theme === 'dark' ? 'Dark' : 'Light'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}

