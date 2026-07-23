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
                alt=""
                className="service-card__image"
                loading="lazy"
                decoding="async"
              />
              <div className="service-card__overlay">
                <p className="service-card__label">
                  {service.num} / {service.title}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
