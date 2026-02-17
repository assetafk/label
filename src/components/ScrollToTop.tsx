import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from '../app/useLenis'

export function ScrollToTop() {
  const { pathname } = useLocation()
  const { scrollTo } = useLenis()

  useEffect(() => {
    scrollTo(0, { immediate: true })
  }, [pathname, scrollTo])

  return null
}

