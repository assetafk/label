import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Work } from '../lib/api'
import { SmartImage } from './SmartImage'

export function WorkCard({
  work,
  onPrefetch,
}: {
  work: Work
  onPrefetch?: (slug: string) => void
}) {
  const cover = work.cover

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
      <Link
        to={`/works/${work.slug}`}
        onMouseEnter={() => onPrefetch?.(work.slug)}
        onFocus={() => onPrefetch?.(work.slug)}
        className="group block overflow-hidden rounded-3xl border border-white/10 bg-[rgb(var(--card))]"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          {cover?.kind === 'image' ? (
            <SmartImage
              src={cover.src}
              alt={cover.alt}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="absolute inset-0"
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${
                  cover?.kind === 'gradient' ? cover.from : 'rgba(255,255,255,0.10)'
                }, transparent 45%, ${
                  cover?.kind === 'gradient' ? cover.to : 'rgba(255,255,255,0.02)'
                })`,
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/0 to-black/0" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 text-xs tracking-[0.22em] uppercase text-[rgb(var(--fg)/0.85)]">
            <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1">
              {work.industry}
            </span>
            <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1">
              {work.year}
            </span>
          </div>
        </div>
        <div className="space-y-2 p-6">
          <div className="text-lg font-semibold tracking-tight md:text-xl">
            {work.title}
          </div>
          <div className="text-sm text-[rgb(var(--fg)/0.65)]">{work.tagline}</div>
          <div className="mt-4 flex flex-wrap gap-2">
            {work.services.slice(0, 3).map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-[rgb(var(--fg)/0.75)]"
              >
                {s}
              </span>
            ))}
          </div>
          <div className="pt-2 text-sm text-[rgb(var(--fg)/0.75)] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            View case <span aria-hidden>→</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

