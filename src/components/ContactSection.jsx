import ApplicationForm from './ApplicationForm'

export default function ContactSection({ onSubmitApplication }) {
  return (
    <section id="contacts" className="contact-section section">
      <div className="container contact-grid">
        <div className="contact-info">
          <h2 className="section-title">
            Where
            <br />
            to find us
          </h2>
          <div className="contact-details">
            <a href="tel:+17015811331" className="contact-link">
              +1 (701) 581-1331
            </a>
            <address className="contact-address">
              161 Trumpeter Ave, Soldotna, Alaska
            </address>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onSubmitApplication}
          >
            Submit your application
          </button>
        </div>

        <div className="contact-form-wrap">
          <h3 className="contact-form-title">Get in touch</h3>
          <ApplicationForm />
        </div>
      </div>
    </section>
  )
}
