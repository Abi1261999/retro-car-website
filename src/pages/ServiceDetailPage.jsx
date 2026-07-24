import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Modal from '../components/Modal'
import ApplicationForm from '../components/ApplicationForm'
import { getServiceById } from '../data/services'
import { useSiteNavigation } from '../hooks/useSiteNavigation'

export default function ServiceDetailPage({ serviceId }) {
  const service = getServiceById(serviceId)
  const { navigateTo } = useSiteNavigation()
  const [applicationOpen, setApplicationOpen] = useState(false)

  if (!service) {
    return (
      <>
        <Navbar onNavClick={navigateTo} />
        <main className="service-detail-page">
          <div className="service-detail-page__inner service-detail-page__inner--missing">
            <h1 className="service-detail-page__title">Service not found</h1>
            <button type="button" className="btn btn-pill" onClick={() => navigateTo('/services')}>
              Back to services
            </button>
          </div>
        </main>
        <Footer onNavClick={navigateTo} />
      </>
    )
  }

  return (
    <>
      <Navbar onNavClick={navigateTo} />
      <main className="service-detail-page">
        <div className="service-detail-page__inner">
          <h1 className="service-detail-page__title">{service.title}</h1>

          <div className="service-detail-content">
            <img
              src={service.image}
              alt={service.title}
              className="service-detail__image"
              loading="lazy"
              decoding="async"
            />

            <div className="service-detail-content__right">
              <div className="service-detail-intro__copy">
                {service.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>

              <button
                type="button"
                className="btn btn-service-cta"
                onClick={() => setApplicationOpen(true)}
              >
                {service.cta}
              </button>
            </div>
          </div>
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
