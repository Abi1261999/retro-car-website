import { contactInfo } from '../data/contact'

export default function ContactsContent({ onSubmitApplication, isPage = false }) {
  return (
    <div className={`contacts-header ${isPage ? 'contacts-header--page' : ''}`}>
      {isPage ? (
        <h1 className="contacts-page__title">Contacts</h1>
      ) : (
        <h2 className="contacts-title">Contacts</h2>
      )}

      <div className="contacts-header__info">
        <a href={contactInfo.phoneHref} className="contacts-phone">
          {contactInfo.phone}
        </a>
        <address className="contacts-address">{contactInfo.address}</address>
        <button
          type="button"
          className="btn btn-pill btn-contacts-cta"
          onClick={onSubmitApplication}
        >
          Submit your application
        </button>
      </div>
    </div>
  )
}
