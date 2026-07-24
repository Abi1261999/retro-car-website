import { useState, useEffect } from 'react'
import { useRouter } from '../hooks/useAppRouter'

const navLinks = [
  { label: 'Cars', href: '/cars' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contacts', href: '#contacts' },
]

export default function Navbar({ onNavClick }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useRouter()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const handleNav = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    onNavClick(href)
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <a
          href="/"
          className="navbar__logo"
          onClick={(e) => handleNav(e, '/')}
        >
          Cars Classic Autotrader
        </a>

        <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}>
          <ul className="navbar__links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={(e) => handleNav(e, link.href)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="tel:+12403751288" className="navbar__phone navbar__phone--mobile">
            +1 (240) 375-1288
          </a>
        </nav>

        <a href="tel:+12403751288" className="navbar__phone navbar__phone--desktop">
          +1 (240) 375-1288
        </a>

        <button
          type="button"
          className={`navbar__toggle ${menuOpen ? 'navbar__toggle--open' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
