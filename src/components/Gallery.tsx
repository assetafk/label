import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'

export type GalleryHandle = {
  next: () => void
  prev: () => void
  goTo: (index: number) => void
}

export const Gallery = forwardRef<
  GalleryHandle,
  { title?: string; slides?: { from: string; to: string }[] }
>(function Gallery({ title = 'Gallery', slides }, ref) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const items = useMemo(
    () =>
      slides ?? [
        { from: 'rgba(255,255,255,0.12)', to: 'rgba(210,255,105,0.18)' },
        { from: 'rgba(210,255,105,0.12)', to: 'rgba(255,255,255,0.10)' },
        { from: 'rgba(255,255,255,0.08)', to: 'rgba(255,255,255,0.02)' },
      ],
    [slides],
  )

  const [index, setIndex] = useState(0)

  useImperativeHandle(
    ref,
    () => ({
      next: () => setIndex((i) => (i + 1) % items.length),
      prev: () => setIndex((i) => (i - 1 + items.length) % items.length),
      goTo: (i) => setIndex(() => Math.max(0, Math.min(items.length - 1, i))),
    }),
    [items.length],
  )

  const slide = items[index]

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[rgb(var(--card))]">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
        <div className="text-xs tracking-[0.22em] uppercase text-white/60">
          {title}
        </div>
        <div className="flex items-center gap-2 text-xs text-white/60">
          <button
            type="button"
            className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 hover:bg-white/10"
            onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}
          >
            Prev
          </button>
          <button
            type="button"
            className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 hover:bg-white/10"
            onClick={() => setIndex((i) => (i + 1) % items.length)}
          >
            Next
          </button>
        </div>
      </div>

      <div ref={containerRef} className="aspect-[16/9] w-full">
        <div
          className="h-full w-full"
          style={{
            background: `linear-gradient(135deg, ${slide.from}, transparent 45%, ${slide.to})`,
          }}
        />
      </div>
    </div>
  )
})

