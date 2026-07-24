import { contactInfo } from '../data/contact'

export default function ContactContent({ onSubmitApplication, isPage = false }) {
  return (
    <>
      <div className={`contact-header ${isPage ? 'contact-header--page' : ''}`}>
        {isPage ? (
          <h1 className="contact-page__title">Contacts</h1>
        ) : (
          <h2 className="contact-title">
            Where
            <br />
            to find us
          </h2>
        )}

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
    </>
  )
}
