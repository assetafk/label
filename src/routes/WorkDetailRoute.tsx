import { Link, useParams } from 'react-router-dom'
import { useRef } from 'react'
import { Gallery, type GalleryHandle } from '../components/Gallery'
import { SmartImage } from '../components/SmartImage'
import { useWork } from '../queries/works'

export function WorkDetailRoute() {
  const { slug } = useParams()
  const { data: work, isLoading, isError, error } = useWork(slug ?? '')
  const galleryRef = useRef<GalleryHandle | null>(null)
  const slides =
    work?.gallery?.length
      ? work.gallery
      : work?.cover?.kind === 'image'
        ? [{ src: work.cover.src, alt: work.cover.alt }]
        : undefined

  return (
    <div className="space-y-10 pt-10">
      <header className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/works"
            className="text-sm text-[rgb(var(--fg)/0.75)] hover:text-[rgb(var(--fg))]"
          >
            ← Back
          </Link>
          <div className="text-xs tracking-[0.22em] uppercase text-[rgb(var(--fg)/0.55)]">
            Work
          </div>
        </div>
        {isLoading ? (
          <div className="space-y-4">
            <div className="h-10 w-2/3 animate-pulse rounded bg-white/5" />
            <div className="h-4 w-full animate-pulse rounded bg-white/5" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-white/5" />
          </div>
        ) : isError ? (
          <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-sm text-red-100">
            Failed to load work:{' '}
            {error instanceof Error ? error.message : 'Unknown error'}
          </div>
        ) : work ? (
          <>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              {work.title}
            </h1>
            <p className="max-w-[70ch] text-sm leading-relaxed text-[rgb(var(--fg)/0.65)] md:text-base">
              {work.tagline}
            </p>
          </>
        ) : null}
      </header>

      <section className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-8">
          <Gallery ref={galleryRef} title="Preview" slides={slides} />

          {work?.blocks?.length ? (
            <div className="mt-6 space-y-4">
              {work.blocks.map((b, idx) =>
                b.type === 'text' ? (
                  <div
                    key={`${b.title}-${idx}`}
                    className="rounded-3xl border border-white/10 bg-black/30 p-6"
                  >
                    <div className="text-xs tracking-[0.22em] uppercase text-[rgb(var(--fg)/0.6)]">
                      {b.title}
                    </div>
                    <div className="mt-3 text-sm leading-relaxed text-[rgb(var(--fg)/0.75)]">
                      {b.body}
                    </div>
                  </div>
                ) : (
                  <div
                    key={`${b.alt}-${idx}`}
                    className="overflow-hidden rounded-3xl border border-white/10 bg-[rgb(var(--card))]"
                  >
                    <div className="aspect-[16/9]">
                      {/* image block */}
                      <SmartImage src={b.src} alt={b.alt} sizes="(max-width: 768px) 100vw, 70vw" />
                    </div>
                    {b.caption ? (
                      <div className="border-t border-white/10 px-5 py-4 text-xs text-[rgb(var(--fg)/0.65)]">
                        {b.caption}
                      </div>
                    ) : null}
                  </div>
                ),
              )}
            </div>
          ) : null}
        </div>
        <div className="space-y-4 md:col-span-4">
          <div className="rounded-3xl border border-white/10 bg-black p-6">
            <div className="text-xs tracking-[0.22em] uppercase text-[rgb(var(--fg)/0.6)]">
              Stack
            </div>
            <div className="mt-3 text-sm text-[rgb(var(--fg)/0.75)]">
              React, Motion, Query, Tailwind
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => galleryRef.current?.prev()}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-[rgb(var(--fg)/0.75)] hover:bg-white/10"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={() => galleryRef.current?.next()}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-[rgb(var(--fg)/0.75)] hover:bg-white/10"
              >
                Next
              </button>
              <button
                type="button"
                onClick={() => galleryRef.current?.goTo(0)}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-[rgb(var(--fg)/0.75)] hover:bg-white/10"
              >
                Reset
              </button>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-[rgb(var(--card))] p-6">
            <div className="text-xs tracking-[0.22em] uppercase text-[rgb(var(--fg)/0.6)]">
              Deliverables
            </div>
            <ul className="mt-3 space-y-2 text-sm text-[rgb(var(--fg)/0.75)]">
              {(work?.services ?? ['UI system', 'Motion language', 'Prefetch + caching'])
                .slice(0, 5)
                .map((s) => (
                  <li key={s}>{s}</li>
                ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

