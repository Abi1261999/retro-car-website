import { useEffect } from 'react'
import { AppRouterProvider, useRouter } from './hooks/useAppRouter'
import HomePage from './pages/HomePage'
import CarsPage from './pages/CarsPage'
import CarDetailPage from './pages/CarDetailPage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import './App.css'

function AppRoutes() {
  const { pathname } = useRouter()
  const carMatch = pathname.match(/^\/cars\/(\d+)$/)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  if (carMatch) {
    return <CarDetailPage carId={carMatch[1]} />
  }

  if (pathname === '/cars') {
    return <CarsPage />
  }

  if (pathname === '/about') {
    return <AboutPage />
  }

  if (pathname === '/services') {
    return <ServicesPage />
  }

  return <HomePage />
}

function App() {
  return (
    <AppRouterProvider>
      <div className="app">
        <AppRoutes />
      </div>
    </AppRouterProvider>
  )
}

export default App
