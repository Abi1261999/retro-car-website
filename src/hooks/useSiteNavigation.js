import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const SCROLL_OFFSET = 145

export function useSiteNavigation() {
  const navigate = useNavigate()
  const location = useLocation()

  const scrollToId = useCallback((id) => {
    const el = document.getElementById(id)
    if (!el) return

    const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET
    window.scrollTo({ top, behavior: 'smooth' })
  }, [])

  const navigateTo = useCallback(
    (href) => {
      if (href === '/cars' || href === '#cars') {
        if (location.pathname !== '/cars') {
          navigate('/cars')
        }
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }

      if (href.startsWith('#')) {
        const id = href.replace('#', '')

        if (location.pathname !== '/') {
          navigate({ pathname: '/', hash: href })
          return
        }

        scrollToId(id)
        return
      }

      if (href === '/' || href === '#hero') {
        navigate('/')
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }

      navigate(href)
    },
    [location.pathname, navigate, scrollToId],
  )

  return { navigateTo, scrollToId }
}
