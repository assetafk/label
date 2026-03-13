import { FormEvent, useId, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../app/useAuth'
import { login as apiLogin } from '../lib/api'

export function LoginRoute() {
  const emailId = useId()
  const passwordId = useId()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const nav = useNavigate()
  const location = useLocation()

  const from =
    (location.state && typeof location.state === 'object'
      ? (location.state as { from?: string }).from
      : null) ?? '/'

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await apiLogin(email, password)
      login(res.user, res.token)
      nav(from, { replace: true })
    } catch (err) {
      const message =
        err && typeof err === 'object' && 'message' in err && typeof (err as any).message === 'string'
          ? (err as any).message
          : 'Failed to log in'
      setError(message)
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100dvh-6rem)] items-center justify-center">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[rgb(var(--card))] p-8 shadow-lg">
        <h1 className="text-2xl font-semibold tracking-tight text-[rgb(var(--fg))]">
          Sign in
        </h1>
        <p className="mt-2 text-sm text-[rgb(var(--fg)/0.7)]">
          Enter the admin email and password to access the protected area.
        </p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <label
              htmlFor={emailId}
              className="text-xs tracking-[0.22em] uppercase text-[rgb(var(--fg)/0.6)]"
            >
              Email
            </label>
            <input
              id={emailId}
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-[rgb(var(--fg))] placeholder:text-[rgb(var(--fg)/0.45)] outline-none focus:border-white/25"
              placeholder="admin@example.com"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor={passwordId}
              className="text-xs tracking-[0.22em] uppercase text-[rgb(var(--fg)/0.6)]"
            >
              Password
            </label>
            <input
              id={passwordId}
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-[rgb(var(--fg))] placeholder:text-[rgb(var(--fg)/0.45)] outline-none focus:border-white/25"
              placeholder="••••••••"
            />
          </div>

          {error ? (
            <div className="text-sm text-red-200">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}

