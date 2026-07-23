const footerNavColumns = [
  [
    { label: 'Cars', href: '#cars' },
    { label: 'About Us', href: '#about' },
    { label: 'About Us', href: '#about' },
  ],
  [
    { label: 'How to rent', href: '#cars' },
    { label: 'Contacts', href: '#contacts' },
  ],
]

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
            href="#hero"
            className="footer__logo"
            onClick={(e) => handleNav(e, '#hero')}
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
          <a href="tel:+17015811331">+1 (701) 581-1331</a>
          <address>161 Trumpeter Ave, Soldotna, Alaska</address>
        </div>
      </div>

      <div className="footer__bottom">
        <p>&copy; Cars Classic Autotrader 2024</p>
      </div>
    </footer>
  )
}
