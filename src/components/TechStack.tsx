import {
  SiExpress,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from 'react-icons/si'

const stack = [
  {
    label: 'React',
    description: 'Modern client UI, hooks, transitions.',
    Icon: SiReact,
  },
  {
    label: 'TypeScript',
    description: 'Types across components and API layer.',
    Icon: SiTypescript,
  },
  {
    label: 'Vite',
    description: 'Fast dev server and production build.',
    Icon: SiVite,
  },
  {
    label: 'Tailwind',
    description: 'Layout, spacing, typography tokens.',
    Icon: SiTailwindcss,
  },
  {
    label: 'Express',
    description: 'Local JSON API for works and clients.',
    Icon: SiExpress,
  },
  {
    label: 'Postgres-ready',
    description: 'API shape designed for a real DB backend.',
    Icon: SiPostgresql,
  },
]

export function TechStack() {
  return (
    <section>
      <div className="flex items-end justify-between gap-6">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Tech stack
        </h2>
        <p className="hidden max-w-[40ch] text-xs leading-relaxed text-[rgb(var(--fg)/0.65)] md:block">
          A production-friendly setup with typed API layer, smooth dev
          experience, and motion built into the component model.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {stack.map(({ label, description, Icon }) => (
          <div
            key={label}
            className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[rgb(var(--card))] px-4 py-4"
          >
            <div className="mt-0.5 rounded-xl bg-black/40 p-2">
              <Icon className="h-5 w-5 text-[rgb(var(--accent))]" />
            </div>
            <div>
              <div className="text-sm font-medium">{label}</div>
              <p className="mt-1 text-xs leading-relaxed text-[rgb(var(--fg)/0.65)]">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

