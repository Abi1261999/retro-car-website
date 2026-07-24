import { services } from '../data/services'

export default function ServicesContent({
  onSubmitApplication,
  onServiceClick,
  isPage = false,
}) {
  const handleCardClick = (service) => {
    if (onServiceClick) {
      onServiceClick(service)
      return
    }

    onSubmitApplication?.()
  }

  return (
    <>
      <div className={`services-header ${isPage ? 'services-header--page' : ''}`}>
        {isPage ? (
          <h1 className="services-page__title">Services</h1>
        ) : (
          <h2 className="services-title">Services</h2>
        )}
        <button
          type="button"
          className="btn btn-services-cta"
          onClick={onSubmitApplication}
        >
          Submit your application
        </button>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <button
            key={service.id}
            type="button"
            className="service-card"
            onClick={() => handleCardClick(service)}
            aria-label={`${service.num} ${service.title} — view details`}
          >
            <img
              src={service.image}
              alt=""
              className="service-card__image"
              loading="lazy"
              decoding="async"
            />
            <div className="service-card__overlay" aria-hidden="true" />
            <p className="service-card__label">
              <span className="service-card__num">{service.num}</span>
              <span className="service-card__slash"> / </span>
              <span className="service-card__title">{service.title}</span>
            </p>
          </button>
        ))}
      </div>
    </>
  )
}
