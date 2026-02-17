import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 260, damping: 40 })

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-[rgb(var(--accent))]"
      style={{ scaleX }}
    />
  )
}

