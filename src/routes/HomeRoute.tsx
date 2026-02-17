import { useId, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import { WorkCard } from '../components/WorkCard'
import { TechStack } from '../components/TechStack'
import { Spinner } from '../components/Spinner'
import { useClients } from '../queries/clients'
import { useContactMutation } from '../queries/contact'
import { usePrefetchWork, useWorks } from '../queries/works'

export function HomeRoute() {
  const prefetchWork = usePrefetchWork()
  const { data: works, isLoading: worksLoading } = useWorks({})
  const featured = useMemo(() => (works ?? []).slice(0, 3), [works])

  const { data: clients } = useClients()

  const nameId = useId()
  const emailId = useId()
  const messageId = useId()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const contact = useContactMutation()

  return (
    <div className="space-y-24">
      <section className="pt-10 md:pt-16">
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs tracking-[0.18em] uppercase text-[rgb(var(--fg)/0.75)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--accent))]" />
              React • Motion • Craft
            </div>
            <h1 className="mt-6 text-balance text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
              High‑craft websites for brands that refuse to blend in.
            </h1>
            <p className="mt-6 max-w-[56ch] text-pretty text-base leading-relaxed text-[rgb(var(--fg)/0.75)] md:text-lg">
              We design and build motion‑first experiences for launches, campaigns,
              and studio portfolios — with a system behind every detail.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                to="/works"
                className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white/90"
              >
                View works
              </Link>
              <a
                href="#contact"
                className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-[rgb(var(--fg)/0.9)] transition hover:bg-white/10"
              >
                Start a project
              </a>
            </div>
          </div>

          <div className="md:col-span-4">
            <Reveal className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-[rgb(var(--card))] p-6">
              <div className="text-xs tracking-[0.22em] uppercase text-[rgb(var(--fg)/0.6)]">
                Now booking
              </div>
              <div className="mt-4 text-2xl font-semibold leading-tight">
                Web, motion, interaction.
              </div>
              <div className="mt-3 text-sm leading-relaxed text-[rgb(var(--fg)/0.65)]">
                Senior-only team. Tight feedback loops. Production-ready code.
              </div>
              <div className="mt-8 flex items-center justify-between text-sm text-[rgb(var(--fg)/0.75)]">
                <span>Based in</span>
                <span className="text-[rgb(var(--fg)/0.92)]">Kyiv / Worldwide</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Featured works
          </h2>
          <Link
            to="/works"
            className="text-sm text-[rgb(var(--fg)/0.75)] hover:text-[rgb(var(--fg))]"
          >
            See all
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {worksLoading ? (
            <div className="md:col-span-3 flex justify-center">
              <Spinner label="Loading featured works…" />
            </div>
          ) : null}

          {worksLoading
            ? Array.from({ length: 0 }).map((_, i) => (
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
            : featured.map((w) => (
                <WorkCard key={w.slug} work={w} onPrefetch={prefetchWork} />
              ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Services
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[rgb(var(--fg)/0.65)] md:text-base">
            A small, senior team that ships end‑to‑end: visual direction, motion
            language, and production code.
          </p>
        </Reveal>
        <div className="grid gap-4 md:col-span-7 md:grid-cols-2">
          {[
            {
              t: 'Web design',
              d: 'Typography, layout, and systems that scale.',
            },
            {
              t: 'Web development',
              d: 'Type-safe React builds with clean architecture.',
            },
            {
              t: 'Interactive',
              d: 'Motion that feels intentional, not noisy.',
            },
            {
              t: 'Launch support',
              d: 'Fast iteration loops with real production constraints.',
            },
          ].map((x) => (
            <Reveal
              key={x.t}
              className="rounded-3xl border border-white/10 bg-black/20 p-6"
            >
              <div className="text-sm font-semibold tracking-tight">{x.t}</div>
              <div className="mt-2 text-sm leading-relaxed text-[rgb(var(--fg)/0.65)]">
                {x.d}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <TechStack />

      <section>
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Clients
        </h2>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {(clients ?? []).map((c) => (
            <div
              key={c.name}
              className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4"
            >
              <div className="text-sm font-medium">{c.name}</div>
              <div className="mt-1 text-xs tracking-[0.18em] uppercase text-[rgb(var(--fg)/0.55)]">
                {c.kind}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="scroll-mt-24">
        <div className="rounded-3xl border border-white/10 bg-[rgb(var(--card))] p-8 md:p-10">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Let’s build something loud (in the right way).
          </h2>
          <p className="mt-3 max-w-[70ch] text-sm leading-relaxed text-[rgb(var(--fg)/0.65)]">
            Tell us about your product, timeline, and what “success” means. We’ll
            respond with a short plan and next steps.
          </p>

          <form
            className="mt-8 grid gap-4 md:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault()
              contact.mutate({ name, email, message })
            }}
          >
            <div className="space-y-2">
              <label
                htmlFor={nameId}
                className="text-xs tracking-[0.22em] uppercase text-[rgb(var(--fg)/0.6)]"
              >
                Name
              </label>
              <input
                id={nameId}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-[rgb(var(--fg))] placeholder:text-[rgb(var(--fg)/0.45)] outline-none focus:border-white/25"
                placeholder="Your name"
                autoComplete="name"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor={emailId}
                className="text-xs tracking-[0.22em] uppercase text-[rgb(var(--fg)/0.6)]"
              >
                Email
              </label>
              <input
                id={emailId}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-[rgb(var(--fg))] placeholder:text-[rgb(var(--fg)/0.45)] outline-none focus:border-white/25"
                placeholder="you@company.com"
                autoComplete="email"
                inputMode="email"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label
                htmlFor={messageId}
                className="text-xs tracking-[0.22em] uppercase text-[rgb(var(--fg)/0.6)]"
              >
                Message
              </label>
              <textarea
                id={messageId}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[120px] w-full resize-y rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-[rgb(var(--fg))] placeholder:text-[rgb(var(--fg)/0.45)] outline-none focus:border-white/25"
                placeholder="What are we building?"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 md:col-span-2">
              <button
                type="submit"
                disabled={contact.isPending}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {contact.isPending ? (
                  <>
                    <span>Sending…</span>
                  </>
                ) : (
                  'Send message'
                )}
                <span aria-hidden>→</span>
              </button>

              <Link
                to="/works"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-[rgb(var(--fg)/0.92)] transition hover:bg-white/10"
              >
                Explore works
              </Link>

              {contact.data && contact.data.ok ? (
                <div className="text-sm text-[rgb(var(--fg)/0.75)]">
                  Received. We’ll reply soon.
                </div>
              ) : null}
              {contact.data && !contact.data.ok ? (
                <div className="text-sm text-red-200">
                  Please check: {contact.data.issues.join(', ')}
                </div>
              ) : null}
              {contact.isError ? (
                <div className="text-sm text-red-200">
                  Failed to send. Try again.
                </div>
              ) : null}
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

