import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { SmartImage } from './SmartImage'

export type GalleryHandle = {
  next: () => void
  prev: () => void
  goTo: (index: number) => void
}

export const Gallery = forwardRef<
  GalleryHandle,
  { title?: string; slides?: { src: string; alt: string }[] }
>(function Gallery({ title = 'Gallery', slides }, ref) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const items = useMemo(
    () =>
      slides ?? [
        {
          src: 'https://images.unsplash.com/photo-1520975958225-2e7f4d8a2f7a?auto=format&fit=crop&q=80&w=1600',
          alt: 'Abstract studio light',
        },
        {
          src: 'https://images.unsplash.com/photo-1526481280695-3c687fd643ed?auto=format&fit=crop&q=80&w=1600',
          alt: 'Close-up of typography print',
        },
        {
          src: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&q=80&w=1600',
          alt: 'Desk with design sketches',
        },
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
        <div className="text-xs tracking-[0.22em] uppercase text-[rgb(var(--fg)/0.6)]">
          {title}
        </div>
        <div className="flex items-center gap-2 text-xs text-[rgb(var(--fg)/0.65)]">
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
        <SmartImage
          src={slide.src}
          alt={slide.alt}
          sizes="(max-width: 768px) 100vw, 70vw"
          className="h-full w-full"
        />
      </div>
    </div>
  )
})

