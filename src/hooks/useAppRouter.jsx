import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const RouterContext = createContext(null)

function getPathname() {
  return window.location.pathname
}

function getHash() {
  return window.location.hash
}

export function AppRouterProvider({ children }) {
  const [pathname, setPathname] = useState(getPathname)
  const [hash, setHash] = useState(getHash)

  useEffect(() => {
    const onChange = () => {
      setPathname(getPathname())
      setHash(getHash())
    }

    window.addEventListener('popstate', onChange)
    window.addEventListener('hashchange', onChange)
    return () => {
      window.removeEventListener('popstate', onChange)
      window.removeEventListener('hashchange', onChange)
    }
  }, [])

  const navigate = useCallback((to) => {
    if (to.startsWith('#')) {
      const nextUrl = `${window.location.pathname}${to}`
      if (`${window.location.pathname}${window.location.hash}` !== nextUrl) {
        window.history.pushState({}, '', nextUrl)
      }
      setHash(to)
      setPathname(getPathname())
      return
    }

    const nextPath = to.startsWith('/') ? to : `/${to}`
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath)
    }
    setPathname(nextPath)
    setHash(getHash())
  }, [])

  const value = useMemo(
    () => ({
      pathname,
      hash,
      navigate,
    }),
    [pathname, hash, navigate],
  )

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export function useRouter() {
  const context = useContext(RouterContext)
  if (!context) {
    throw new Error('useRouter must be used within AppRouterProvider')
  }
  return context
}
