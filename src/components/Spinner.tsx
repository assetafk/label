import { ImSpinner2 } from 'react-icons/im'

export function Spinner({
  size = 18,
  label,
}: {
  size?: number
  label?: string
}) {
  return (
    <span
      className="inline-flex items-center gap-2"
      role="status"
      aria-label={label ?? 'Loading'}
    >
      <ImSpinner2
        size={size}
        className="animate-spin text-[rgb(var(--accent))]"
      />
      {label ? (
        <span className="text-xs text-[rgb(var(--fg)/0.7)]">{label}</span>
      ) : null}
    </span>
  )
}

