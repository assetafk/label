import { Link } from 'react-router-dom'

export function NotFoundRoute() {
  return (
    <div className="pt-16">
      <div className="rounded-3xl border border-white/10 bg-[rgb(var(--card))] p-10">
        <div className="text-xs tracking-[0.22em] uppercase text-white/60">
          404
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
          Page not found
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-white/60">
          The page you’re looking for doesn’t exist (yet).
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white/90"
          >
            Go home <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

