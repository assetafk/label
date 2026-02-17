import { Link } from 'react-router-dom'

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-10 md:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="space-y-2">
            <div className="text-sm font-medium tracking-[0.18em] uppercase opacity-80">
              Label Studio
            </div>
            <div className="text-sm text-white/60">
              Motion-first web experiences. Built with React.
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-white/60">
            <Link className="hover:text-white" to="/works">
              Works
            </Link>
            <a className="hover:text-white" href="#contact">
              Contact
            </a>
            <a
              className="hover:text-white"
              href="https://www.awwwards.com/fantik.studio/"
              target="_blank"
              rel="noreferrer"
            >
              Inspiration
            </a>
          </div>
        </div>

        <div className="mt-8 text-xs text-white/40">
          © {new Date().getFullYear()} Label. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

