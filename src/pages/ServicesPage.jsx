import { useState } from 'react'
import Navbar from '../components/Navbar'
import ServicesContent from '../components/ServicesContent'
import Footer from '../components/Footer'
import Modal from '../components/Modal'
import ApplicationForm from '../components/ApplicationForm'
import { useSiteNavigation } from '../hooks/useSiteNavigation'

export default function ServicesPage() {
  const { navigateTo } = useSiteNavigation()
  const [applicationOpen, setApplicationOpen] = useState(false)

  return (
    <>
      <Navbar onNavClick={navigateTo} />
      <main className="services-page">
        <div className="services-page__inner">
          <ServicesContent
            isPage
            onSubmitApplication={() => setApplicationOpen(true)}
            onServiceClick={(service) => navigateTo(`/services/${service.id}`)}
          />
        </div>
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
