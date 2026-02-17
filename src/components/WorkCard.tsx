import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Work } from '../lib/api'

export function WorkCard({
  work,
  onPrefetch,
}: {
  work: Work
  onPrefetch?: (slug: string) => void
}) {
  const from = work.cover?.from ?? 'rgba(255,255,255,0.10)'
  const to = work.cover?.to ?? 'rgba(255,255,255,0.02)'

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
      <Link
        to={`/works/${work.slug}`}
        onMouseEnter={() => onPrefetch?.(work.slug)}
        onFocus={() => onPrefetch?.(work.slug)}
        className="group block overflow-hidden rounded-3xl border border-white/10 bg-[rgb(var(--card))]"
      >
        <div
          className="aspect-[16/10] w-full"
          style={{
            background: `linear-gradient(135deg, ${from}, transparent 45%, ${to})`,
          }}
        />
        <div className="space-y-2 p-6">
          <div className="flex items-center justify-between gap-4 text-xs tracking-[0.22em] uppercase text-white/50">
            <span>{work.industry}</span>
            <span>{work.year}</span>
          </div>
          <div className="text-lg font-semibold tracking-tight md:text-xl">
            {work.title}
          </div>
          <div className="text-sm text-white/60">{work.tagline}</div>
          <div className="mt-4 flex flex-wrap gap-2">
            {work.services.slice(0, 3).map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70"
              >
                {s}
              </span>
            ))}
          </div>
          <div className="pt-2 text-sm text-white/70 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            View case <span aria-hidden>→</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

