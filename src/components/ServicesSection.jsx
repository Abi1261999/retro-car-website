import ServicesContent from './ServicesContent'

export default function ServicesSection({ onSubmitApplication, onServiceClick }) {
  return (
    <section id="services" className="services-section">
      <div className="services-section__inner">
        <ServicesContent
          onSubmitApplication={onSubmitApplication}
          onServiceClick={onServiceClick}
        />
      </div>
    </section>
  )
}
