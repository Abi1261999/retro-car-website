import { contactInfo } from '../data/contact'
import { footerNavColumns } from '../data/footer'

export default function Footer({ onNavClick }) {
  const handleNav = (e, href) => {
    e.preventDefault()
    onNavClick(href)
  }

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <a
            href="/"
            className="footer__logo"
            onClick={(e) => handleNav(e, '/')}
          >
            Cars Classic Autotrader
          </a>
          <a href="#privacy" className="footer__privacy" onClick={(e) => e.preventDefault()}>
            Privacy Policies
          </a>
        </div>

        <nav className="footer__nav" aria-label="Footer">
          {footerNavColumns.map((column, columnIndex) => (
            <ul key={columnIndex} className="footer__nav-col">
              {column.map((link, linkIndex) => (
                <li key={`${columnIndex}-${linkIndex}`}>
                  <a href={link.href} onClick={(e) => handleNav(e, link.href)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </nav>

        <div className="footer__contact">
          <a href={contactInfo.phoneHref}>{contactInfo.phone}</a>
          <address>{contactInfo.address}</address>
        </div>

        <p className="footer__copyright">&copy; Cars Classic Autotrader 2024</p>
      </div>
    </footer>
  )
}
