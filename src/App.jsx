import { AppRouterProvider, useRouter } from './hooks/useAppRouter'
import HomePage from './pages/HomePage'
import CarsPage from './pages/CarsPage'
import './App.css'

function AppRoutes() {
  const { pathname } = useRouter()

  if (pathname === '/cars') {
    return <CarsPage />
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
