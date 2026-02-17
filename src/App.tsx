import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { HomeRoute } from './routes/HomeRoute'
import { NotFoundRoute } from './routes/NotFoundRoute'
import { WorkDetailRoute } from './routes/WorkDetailRoute'
import { WorksRoute } from './routes/WorksRoute'
import { ScrollToTop } from './components/ScrollToTop'
import { ScrollProgress } from './components/ScrollProgress'

export default function App() {
  const location = useLocation()
  const reduceMotion = useReducedMotion()

  return (
    <div className="noise min-h-dvh">
      <ScrollProgress />
      <ScrollToTop />
      <SiteHeader />

      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-[1200px] px-4 pb-24 pt-20 md:px-8"
        >
          <Routes location={location}>
            <Route path="/" element={<HomeRoute />} />
            <Route path="/works" element={<WorksRoute />} />
            <Route path="/works/:slug" element={<WorkDetailRoute />} />
            <Route path="*" element={<NotFoundRoute />} />
          </Routes>
        </motion.main>
      </AnimatePresence>

      <SiteFooter />
    </div>
  )
}
