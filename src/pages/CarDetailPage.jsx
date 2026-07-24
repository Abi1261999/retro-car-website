import { useState } from 'react'
import { ArrowUpRight } from '../components/ArrowUpRight'
import Navbar from '../components/Navbar'
import ServicesSection from '../components/ServicesSection'
import FAQSection from '../components/FAQSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'
import Modal from '../components/Modal'
import ApplicationForm from '../components/ApplicationForm'
import {
  carDetailAbout,
  carDetailSpecs,
  formatPrice,
  getCarById,
  getCarGallery,
} from '../data/cars'
import { useSiteNavigation } from '../hooks/useSiteNavigation'

export default function CarDetailPage({ carId }) {
  const car = getCarById(carId)
  const { navigateTo } = useSiteNavigation()
  const [applicationOpen, setApplicationOpen] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  if (!car) {
    return (
      <>
        <Navbar onNavClick={navigateTo} />
        <main className="car-detail-page">
          <div className="car-detail-page__inner car-detail-page__inner--missing">
            <h1 className="car-detail-page__heading">Car not found</h1>
            <button type="button" className="btn btn-pill" onClick={() => navigateTo('/cars')}>
              Back to all cars
            </button>
          </div>
        </main>
        <Footer onNavClick={navigateTo} />
      </>
    )
  }

  const gallery = getCarGallery(car)

  return (
    <>
      <Navbar onNavClick={navigateTo} />
      <main className="car-detail-page">
        <div className="car-detail-page__inner">
          <h1 className="car-detail-page__heading">{car.name}</h1>

          <div className="car-detail-gallery">
            <button
              type="button"
              className="car-detail-gallery__main"
              onClick={() => setActiveImage(0)}
              aria-label="View main car photo"
            >
              <img src={gallery[activeImage]} alt={car.name} />
            </button>
            <div className="car-detail-gallery__thumbs">
              {gallery.map((image, index) => (
                <button
                  key={`${car.id}-${index}`}
                  type="button"
                  className={`car-detail-gallery__thumb ${activeImage === index ? 'car-detail-gallery__thumb--active' : ''}`}
                  onClick={() => setActiveImage(index)}
                  aria-label={`View car photo ${index + 1}`}
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </div>
          </div>

          <div className="car-detail-info">
            <div className="car-detail-info__left">
              <h2 className="car-detail-info__title">{car.name}</h2>
              <p className="car-detail-info__price">{formatPrice(car.price)}</p>

              <dl className="car-detail-specs">
                {carDetailSpecs.map((spec) => (
                  <div key={spec.label} className="car-detail-specs__row">
                    <dt>{spec.label}</dt>
                    <dd>{spec.value}</dd>
                  </div>
                ))}
              </dl>

              <button
                type="button"
                className="btn btn-rent-detail"
                onClick={() => setApplicationOpen(true)}
              >
                Rent
                <ArrowUpRight />
              </button>
            </div>

            <div className="car-detail-info__right">
              <h3 className="car-detail-about__title">About the car</h3>
              <p className="car-detail-about__subtitle">{carDetailAbout.title}</p>
              <div className="car-detail-about__copy">
                {carDetailAbout.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <ServicesSection onSubmitApplication={() => setApplicationOpen(true)} />
        <FAQSection onAskQuestion={() => navigateTo('#contacts')} />
        <ContactSection onSubmitApplication={() => setApplicationOpen(true)} />
      </main>
      <Footer onNavClick={navigateTo} />

      <Modal
        isOpen={applicationOpen}
        onClose={() => setApplicationOpen(false)}
        title={`Rent ${car.name}`}
      >
        <p className="modal-car-price">
          {formatPrice(car.price)}
          <span> / day</span>
        </p>
        <ApplicationForm
          onSuccess={() => {
            setTimeout(() => setApplicationOpen(false), 2000)
          }}
        />
      </Modal>
    </>
  )
}
