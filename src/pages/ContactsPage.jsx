import { useState } from 'react'
import Navbar from '../components/Navbar'
import ContactContent from '../components/ContactContent'
import Footer from '../components/Footer'
import Modal from '../components/Modal'
import ApplicationForm from '../components/ApplicationForm'
import { useSiteNavigation } from '../hooks/useSiteNavigation'

export default function ContactsPage() {
  const { navigateTo } = useSiteNavigation()
  const [applicationOpen, setApplicationOpen] = useState(false)

  return (
    <>
      <Navbar onNavClick={navigateTo} />
      <main className="contacts-page">
        <div className="contacts-page__inner">
          <ContactContent
            isPage
            onSubmitApplication={() => setApplicationOpen(true)}
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
