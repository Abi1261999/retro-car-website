import { contactInfo } from '../data/contact'

export default function ContactSection({ onSubmitApplication }) {
  return (
    <section id="contacts" className="contact-section">
      <div className="contact-section__inner">
        <div className="contact-header">
          <h2 className="contact-title">
            Where
            <br />
            to find us
          </h2>

          <div className="contact-header__info">
            <a href={contactInfo.phoneHref} className="contact-phone">
              {contactInfo.phone}
            </a>
            <address className="contact-address">{contactInfo.address}</address>
            <button
              type="button"
              className="btn btn-pill btn-contact-cta"
              onClick={onSubmitApplication}
            >
              Submit your application
            </button>
          </div>
        </div>

        <img
          src={contactInfo.mapImage}
          alt="Map showing our location"
          className="contact-map"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  )
}
