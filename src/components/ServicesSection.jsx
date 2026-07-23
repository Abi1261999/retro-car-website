import { services } from '../data/services'

export default function ServicesSection({ onSubmitApplication }) {
  return (
    <section id="services" className="services-section">
      <div className="services-section__inner">
        <div className="services-header">
          <h2 className="services-title">Services</h2>
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
            <article key={service.id} className="service-card">
              <img
                src={service.image}
                alt={service.title}
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
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
