import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import CarsSection from '../components/CarsSection'
import AboutSection from '../components/AboutSection'
import ServicesSection from '../components/ServicesSection'
import FAQSection from '../components/FAQSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'
import Modal from '../components/Modal'
import ApplicationForm from '../components/ApplicationForm'
import { useRouter } from '../hooks/useAppRouter'
import { useSiteNavigation } from '../hooks/useSiteNavigation'

export default function HomePage() {
  const [applicationOpen, setApplicationOpen] = useState(false)
  const { navigateTo, scrollToId } = useSiteNavigation()
  const { hash } = useRouter()

  useEffect(() => {
    if (!hash) return

    const id = hash.replace('#', '')
    const timer = window.setTimeout(() => scrollToId(id), 120)
    return () => window.clearTimeout(timer)
  }, [hash, scrollToId])

  return (
    <>
      <Navbar onNavClick={navigateTo} />
      <main>
        <Hero onFindCar={() => navigateTo('#cars')} />
        <CarsSection onViewAllCars={() => navigateTo('/cars')} />
        <AboutSection />
        <ServicesSection onSubmitApplication={() => setApplicationOpen(true)} />
        <FAQSection onAskQuestion={() => navigateTo('#contacts')} />
        <ContactSection onSubmitApplication={() => setApplicationOpen(true)} />
      </main>
      <Footer onNavClick={navigateTo} />

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
    </>
  )
}
