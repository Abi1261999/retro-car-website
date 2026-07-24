import { useCallback } from 'react'
import { useRouter } from './useAppRouter'

const SCROLL_OFFSET = 145

export function useSiteNavigation() {
  const { pathname, navigate } = useRouter()

  const scrollToId = useCallback((id) => {
    const el = document.getElementById(id)
    if (!el) return

    const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET
    window.scrollTo({ top, behavior: 'smooth' })
  }, [])

  const navigateTo = useCallback(
    (href) => {
      if (href === '/cars' || href === '#cars') {
        if (pathname !== '/cars') {
          navigate('/cars')
        }
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }

      if (href.startsWith('#')) {
        const id = href.replace('#', '')

        if (pathname !== '/') {
          navigate(href)
          return
        }

        navigate(href)
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
    [pathname, navigate, scrollToId],
  )

  return { navigateTo, scrollToId }
}
