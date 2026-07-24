import ContactContent from './ContactContent'

export default function ContactSection({ onSubmitApplication }) {
  return (
    <section id="contacts" className="contact-section">
      <div className="contact-section__inner">
        <ContactContent onSubmitApplication={onSubmitApplication} />
      </div>
    </section>
  )
}
