import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.png';

export default function Footer() {
  const year = new Date().getFullYear();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/career', label: 'Career' },
    { to: '/contact', label: 'Contact' },
    { to: '/gallery', label: 'Gallery' },
  ];

  const serviceLinks = [
    'Smart Metering (AMI/AMR)',
    'Smart Street Poles',
    'Drone Inspection',
    'IT Infrastructure',
    'Cloud IoT Solutions',
    'Vigilance Metering (VMS)',
  ];

  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-light)', padding: '80px 0 32px' }}>
      <div className="wrap">

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', marginBottom: '64px' }}>
          
          {/* Col 1: Brand */}
          <div style={{ gridColumn: 'span 2' }}>
            <Link to="/" style={{ display: 'inline-block', marginBottom: '24px' }}>
              <img src={logoImg} alt="Vishvin Technologies" style={{ height: '48px' }} />
            </Link>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px', maxWidth: '360px' }}>
              Empowering India's digital future with resilient utility networks, state-of-the-art smart infrastructure, and unparalleled enterprise modernization solutions.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 style={{ fontSize: '14px', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-main)', marginBottom: '24px' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {navLinks.map(l => (
                <Link key={l.to} to={l.to} style={{ fontSize: '14px', color: 'var(--text-secondary)', transition: 'color 0.2s ease' }} onMouseOver={e => e.currentTarget.style.color = 'var(--accent-blue)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 style={{ fontSize: '14px', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-main)', marginBottom: '24px' }}>Core Solutions</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {serviceLinks.map(s => (
                <Link key={s} to="/services" style={{ fontSize: '14px', color: 'var(--text-secondary)', transition: 'color 0.2s ease' }} onMouseOver={e => e.currentTarget.style.color = 'var(--accent-blue)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
                  {s}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 style={{ fontSize: '14px', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-main)', marginBottom: '24px' }}>Headquarters</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Global Office</span>
                <span style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  No. 3359, 2nd Floor, Above More Supermarket,<br />
                  Hosakerehalli Cross, BSK 3rd Stage,<br />
                  Bengaluru – 560 085
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="mailto:support@vishvin.com" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text-secondary)' }} onMouseOver={e => e.currentTarget.style.color = 'var(--accent-blue)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  support@vishvin.com
                </a>
                <a href="tel:08035711232" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text-secondary)' }} onMouseOver={e => e.currentTarget.style.color = 'var(--accent-blue)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  080-35711232
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', paddingTop: '32px', borderTop: '1px solid var(--border-light)' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            © {year} Vishvin Technologies Pvt. Ltd. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link to="/contact" style={{ fontSize: '13px', color: 'var(--text-muted)' }} onMouseOver={e => e.currentTarget.style.color = 'var(--text-main)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>Privacy Policy</Link>
            <Link to="/contact" style={{ fontSize: '13px', color: 'var(--text-muted)' }} onMouseOver={e => e.currentTarget.style.color = 'var(--text-main)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
