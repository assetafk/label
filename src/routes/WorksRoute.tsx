import { useDeferredValue, useMemo, useState, useTransition } from 'react'
import { WorkCard } from '../components/WorkCard'
import { usePrefetchWork, useWorks } from '../queries/works'

export function WorksRoute() {
  const [q, setQ] = useState('')
  const [service, setService] = useState<string | undefined>(undefined)
  const [year, setYear] = useState<number | undefined>(undefined)
  const [isPending, startTransition] = useTransition()
  const deferredQ = useDeferredValue(q)
  const prefetchWork = usePrefetchWork()

  const { data: works, isLoading, isError, error } = useWorks({
    q: deferredQ || undefined,
    service,
    year,
  })

  const services = useMemo(() => {
    const set = new Set<string>()
    for (const w of works ?? []) for (const s of w.services) set.add(s)
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [works])

  const years = useMemo(() => {
    const set = new Set<number>()
    for (const w of works ?? []) set.add(w.year)
    return Array.from(set).sort((a, b) => b - a)
  }, [works])

  return (
    <div className="space-y-10">
      <header className="pt-10">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
          Works
        </h1>
        <p className="mt-4 max-w-[70ch] text-sm leading-relaxed text-white/60 md:text-base">
          A curated set of experiments, launches, and interactive builds. Data
          is loaded from the local API with TanStack Query.
        </p>
      </header>

      <section className="rounded-3xl border border-white/10 bg-[rgb(var(--card))] p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <div className="text-xs tracking-[0.22em] uppercase text-white/60">
              Search
            </div>
            <div className="text-sm text-white/60">
              Try “motion”, “design”, “SaaS”…
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-3 md:max-w-[520px] md:flex-row md:justify-end">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search works"
              className="w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/25"
            />
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => startTransition(() => setService(undefined))}
              className={[
                'rounded-full border px-3 py-1 text-xs transition',
                !service
                  ? 'border-white/25 bg-white/10 text-white'
                  : 'border-white/15 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white',
              ].join(' ')}
            >
              All services
            </button>
            {services.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() =>
                  startTransition(() =>
                    setService((cur) => (cur === s ? undefined : s)),
                  )
                }
                className={[
                  'rounded-full border px-3 py-1 text-xs transition',
                  service === s
                    ? 'border-white/25 bg-white/10 text-white'
                    : 'border-white/15 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white',
                ].join(' ')}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="text-xs tracking-[0.22em] uppercase text-white/50">
              Year
            </div>
            <select
              value={year ?? ''}
              onChange={(e) => {
                const v = e.target.value
                startTransition(() => setYear(v ? Number(v) : undefined))
              }}
              className="rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-xs text-white/80 outline-none focus:border-white/25"
            >
              <option value="">All</option>
              {years.map((y) => (
                <option key={y} value={String(y)}>
                  {y}
                </option>
              ))}
            </select>
            {isPending ? (
              <div className="text-xs text-white/50">Updating…</div>
            ) : null}
          </div>
        </div>
      </section>

      {isError ? (
        <section className="rounded-3xl border border-red-500/30 bg-red-500/10 p-8 text-sm text-red-100">
          Failed to load works: {error instanceof Error ? error.message : 'Unknown error'}
        </section>
      ) : null}

      <section className="grid gap-6 md:grid-cols-2">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-3xl border border-white/10 bg-[rgb(var(--card))]"
              >
                <div className="aspect-[16/10] w-full animate-pulse bg-white/5" />
                <div className="space-y-3 p-6">
                  <div className="h-3 w-2/3 animate-pulse rounded bg-white/5" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-white/5" />
                  <div className="h-3 w-1/3 animate-pulse rounded bg-white/5" />
                </div>
              </div>
            ))
          : (works ?? []).map((w) => (
              <WorkCard key={w.slug} work={w} onPrefetch={prefetchWork} />
            ))}
      </section>

      {!isLoading && (works?.length ?? 0) === 0 ? (
        <section className="rounded-3xl border border-white/10 bg-[rgb(var(--card))] p-10 text-sm text-white/60">
          No works found. Try a different query.
        </section>
      ) : null}
    </div>
  )
}

