const services = [
  {
    num: '01',
    title: 'SHIPPING',
    description:
      'Nationwide and international enclosed transport for your classic vehicle, handled by specialists who treat every car like a masterpiece.',
  },
  {
    num: '02',
    title: 'WARRANTY PURCHASE',
    description:
      'Extended warranty options designed specifically for vintage and classic automobiles, giving you confidence in every mile.',
  },
  {
    num: '03',
    title: 'FINANCING',
    description:
      'Flexible financing through specialty lenders who understand the unique value of classic cars and collector vehicles.',
  },
]

export default function ServicesSection({ onSubmitApplication }) {
  return (
    <section id="services" className="services-section section">
      <div className="container">
        <div className="services-header">
          <div>
            <p className="section-eyebrow">Delighting our clients</p>
            <h2 className="section-title">Services</h2>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onSubmitApplication}
          >
            Submit your application
          </button>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <article key={service.num} className="service-card">
              <div className="service-card__num">
                {service.num} / {service.title}
              </div>
              <p className="service-card__desc">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
