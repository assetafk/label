import { useMemo, useState } from 'react'

function buildSrcSet(src: string, widths: number[]) {
  try {
    const url = new URL(src)
    const parts = widths.map((w) => {
      url.searchParams.set('w', String(w))
      return `${url.toString()} ${w}w`
    })
    return parts.join(', ')
  } catch {
    return undefined
  }
}

export function SmartImage({
  src,
  alt,
  className,
  sizes,
  widths = [480, 768, 1024, 1280, 1600],
  priority = false,
}: {
  src: string
  alt: string
  className?: string
  sizes?: string
  widths?: number[]
  priority?: boolean
}) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  const srcSet = useMemo(() => buildSrcSet(src, widths), [src, widths])

  return (
    <div className={['relative h-full w-full overflow-hidden', className].join(' ')}>
      {!loaded && !failed ? (
        <div className="absolute inset-0 animate-pulse bg-white/5" />
      ) : null}

      {failed ? (
        <div className="absolute inset-0 grid place-items-center bg-black/30 text-xs tracking-[0.22em] uppercase text-[rgb(var(--fg)/0.55)]">
          Image unavailable
        </div>
      ) : (
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={[
            'h-full w-full object-cover',
            'transition duration-500',
            loaded ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
        />
      )}
    </div>
  )
}

