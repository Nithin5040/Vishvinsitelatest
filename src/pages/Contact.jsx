import React, { useState } from 'react';
import { MapPin, Mail, Phone, Globe, Check } from 'lucide-react';
import mapImg from '../assets/map.png';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [focused, setFocused] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', company: '', subject: '', message: '' });
      }, 6000);
    }, 1200);
  };

  const inputStyle = (field) => ({
    width: '100%', padding: '14px 16px',
    background: 'var(--bg-primary)',
    border: focused === field ? '1px solid var(--accent-blue)' : '1px solid var(--border-medium)',
    borderRadius: '12px', color: 'var(--text-main)',
    fontSize: '15px', fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    boxShadow: focused === field ? '0 0 0 3px var(--accent-blue-light)' : 'none',
  });

  const labelStyle = {
    fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em',
    color: 'var(--text-secondary)', fontWeight: 600,
  };

  const infoCards = [
    { icon: <MapPin size={24} />, label: 'Head Office', content: 'No. 3359, 2nd Floor, Above More Supermarket, Hosakerehalli Cross, BSK 3rd Stage, Bengaluru – 560 085', href: null },
    { icon: <Mail size={24} />,   label: 'Email',       content: 'support@vishvin.com', href: 'mailto:support@vishvin.com' },
    { icon: <Phone size={24} />,  label: 'Telephone',   content: '080-35711232', href: 'tel:08035711232' },
    { icon: <Globe size={24} />,  label: 'LinkedIn',    content: 'Connect on LinkedIn', href: 'https://www.linkedin.com/company/vishvin-technologies-private-limited/about/' },
  ];

  return (
    <div style={{ background: 'var(--bg-primary)' }}>

      {/* ════ HERO ════ */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)', padding: '160px 0' }}>
        <div className="wrap">
          <div className="reveal" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px', display: 'inline-block', borderLeft: '1px solid var(--border-medium)', paddingLeft: '16px' }}>
              CONTACT US
            </div>
            <h1 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 200, lineHeight: 1.2, marginBottom: '24px', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-main)' }}>
              Let's Start a <br/><span style={{ color: 'var(--text-main)', fontWeight: 400 }}>Conversation.</span>
            </h1>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: '640px', margin: '0 auto', fontWeight: 300 }}>
              Have a project, partnership, or technical question in mind? Reach out to our technical consulting office.
            </p>
          </div>
        </div>
      </section>

      {/* ════ CONTACT FORM + INFO ════ */}
      <section style={{ padding: '80px 0 160px', background: 'var(--bg-secondary)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '48px', alignItems: 'stretch' }}>

            {/* ── FORM ── */}
            <div className="reveal" style={{ background: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-light)', padding: '48px' }}>
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: 300, marginBottom: '8px', color: 'var(--text-main)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Send Us a Message</h2>
                <p style={{ fontSize: '15px', color: 'var(--text-secondary)', fontWeight: 300 }}>Our team will respond within one business day.</p>
              </div>

              {submitted ? (
                <div style={{ padding: '48px', textAlign: 'center', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '8px' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--bg-primary)', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', border: '1px solid var(--border-light)' }}>
                    <Check size={32} strokeWidth={1.5} />
                  </div>
                  <h3 style={{ fontSize: '24px', fontWeight: 300, color: 'var(--text-main)', marginBottom: '12px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Message Sent!</h3>
                  <p style={{ fontSize: '15px', color: 'var(--text-secondary)', fontWeight: 300 }}>An engineer will follow up shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={labelStyle}>Name</label>
                      <input required type="text" name="name" value={formData.name} onChange={handleChange} onFocus={() => setFocused('name')} onBlur={() => setFocused('')} placeholder="Your full name" style={inputStyle('name')} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={labelStyle}>Email</label>
                      <input required type="email" name="email" value={formData.email} onChange={handleChange} onFocus={() => setFocused('email')} onBlur={() => setFocused('')} placeholder="your@email.com" style={inputStyle('email')} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={labelStyle}>Company</label>
                      <input type="text" name="company" value={formData.company} onChange={handleChange} onFocus={() => setFocused('company')} onBlur={() => setFocused('')} placeholder="Organization (optional)" style={inputStyle('company')} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={labelStyle}>Subject</label>
                      <input type="text" name="subject" value={formData.subject} onChange={handleChange} onFocus={() => setFocused('subject')} onBlur={() => setFocused('')} placeholder="e.g. Smart Grid Project" style={inputStyle('subject')} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={labelStyle}>Message</label>
                    <textarea required name="message" value={formData.message} onChange={handleChange} onFocus={() => setFocused('message')} onBlur={() => setFocused('')} placeholder="Tell us about your project, network scope, or requirements..." rows="5" style={{ ...inputStyle('message'), resize: 'vertical' }} />
                  </div>

                  <button type="submit" style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '12px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', border: '1px solid var(--text-main)', padding: '12px 24px', borderRadius: '40px', color: 'var(--bg-primary)', background: 'var(--text-main)', transition: 'all 0.3s', opacity: submitting ? 0.7 : 1, cursor: submitting ? 'wait' : 'pointer' }} disabled={submitting}>
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            {/* ── INFO CARDS PANEL ── */}
            <div className="reveal-stagger" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ background: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-light)', overflow: 'hidden' }}>
                <a href="https://maps.google.com/?q=Vishvin+Technologies+Pvt" target="_blank" rel="noopener noreferrer" style={{ display: 'block', height: '240px', position: 'relative' }}>
                  <img src={mapImg} alt="Vishvin Technologies Map Location" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </a>
                <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  {infoCards.map((card, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                      <div style={{ color: 'var(--text-main)', marginTop: '4px' }}>
                        {React.cloneElement(card.icon, { strokeWidth: 1.5 })}
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.15em' }}>{card.label}</div>
                        {card.href ? (
                          <a href={card.href} target={card.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ fontSize: '15px', color: 'var(--text-main)', fontWeight: 300, transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--text-secondary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-main)'}>
                            {card.content}
                          </a>
                        ) : (
                          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0, fontWeight: 300 }}>{card.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
