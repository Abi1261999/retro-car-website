import ServicesContent from './ServicesContent'

export default function ServicesSection({ onSubmitApplication }) {
  return (
    <section id="services" className="services-section">
      <div className="services-section__inner">
        <ServicesContent onSubmitApplication={onSubmitApplication} />
      </div>
    </section>
  )
}
