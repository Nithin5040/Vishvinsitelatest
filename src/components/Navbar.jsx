import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logoImg from '../assets/logo.png';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const close = () => setMobileOpen(false);

  const links = [
    { to: '/', label: 'Home', end: true },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/career', label: 'Career' },
    { to: '/gallery', label: 'Gallery' },
  ];

  return (
    <>
      <nav>
        <div className={`navbar-wrapper${scrolled ? ' scrolled' : ''}`}>
          <div className="wrap">
            <div className="navbar-inner">

              {/* Logo */}
              <Link to="/" onClick={close} className="nav-logo-wrap">
                <img src={logoImg} alt="Vishvin Technologies" />
              </Link>

              {/* Desktop Links */}
              <div className="nav-links">
                {links.map(l => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    end={l.end}
                    className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                  >
                    {l.label}
                  </NavLink>
                ))}
              </div>

              {/* Desktop CTA */}
              <div className="nav-cta">
                <Link to="/contact" className="btn btn-primary btn-sm">
                  Contact Us
                </Link>
              </div>

              {/* Mobile Hamburger */}
              <button
                className="nav-mobile-btn"
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>

            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Full-Screen Overlay */}
      <div className={`mobile-overlay${mobileOpen ? ' open' : ''}`} role="dialog" aria-modal="true">

        {/* Close button */}
        <button className="mobile-overlay-close" onClick={close} aria-label="Close navigation">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Logo inside overlay */}
        <Link to="/" onClick={close} style={{ marginBottom: '40px' }}>
          <img src={logoImg} alt="Vishvin Technologies" style={{ height: '48px' }} />
        </Link>

        {/* Nav Links */}
        {links.map((l, i) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            onClick={close}
            style={{ transitionDelay: `${i * 40}ms` }}
            className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`}
          >
            {l.label}
          </NavLink>
        ))}

        {/* Mobile CTA */}
        <Link
          to="/contact"
          onClick={close}
          className="btn btn-primary btn-lg"
          style={{ marginTop: '32px', transitionDelay: '160ms' }}
        >
          Contact Us
        </Link>

      </div>
    </>
  );
}
