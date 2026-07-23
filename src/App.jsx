import { useState, useCallback } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CarsSection from './components/CarsSection'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import FAQSection from './components/FAQSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import Modal from './components/Modal'
import ApplicationForm from './components/ApplicationForm'
import './App.css'

function App() {
  const [applicationOpen, setApplicationOpen] = useState(false)

  const scrollToSection = useCallback((href) => {
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      const offset = 145
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, [])

  const handleFindCar = () => scrollToSection('#cars')
  const handleAskQuestion = () => scrollToSection('#contacts')
  const handleSubmitApplication = () => setApplicationOpen(true)

  return (
    <div className="app">
      <Navbar onNavClick={scrollToSection} />
      <main>
        <Hero onFindCar={handleFindCar} />
        <CarsSection />
        <AboutSection />
        <ServicesSection onSubmitApplication={handleSubmitApplication} />
        <FAQSection onAskQuestion={handleAskQuestion} />
        <ContactSection onSubmitApplication={handleSubmitApplication} />
      </main>
      <Footer onNavClick={scrollToSection} />

      <Modal
        isOpen={applicationOpen}
        onClose={() => setApplicationOpen(false)}
        title="Submit your application"
      >
        <ApplicationForm
          onSuccess={() => {
            setTimeout(() => setApplicationOpen(false), 2000)
          }}
        />
      </Modal>
    </div>
  )
}

export default App
