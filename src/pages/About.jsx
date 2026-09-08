import { Target, Heart, Award, Zap, ArrowRight, Quote } from 'lucide-react';
import React from 'react';
import ceoImg from '../assets/ceo.jpg';
import cfoImg from '../assets/cfo.avif';

export default function About() {
  const ethos = [
    { icon: <Target size={32} />, title: 'Anchored by Goal',  desc: 'We target outcomes that continue to add utility long after project delivery.' },
    { icon: <Heart size={32} />, title: 'Care & Synergy',     desc: 'We collaborate across fields, keeping systems transparent, symmetrical, and sincere.' },
    { icon: <Award size={32} />, title: 'Accountability',     desc: 'We address technical challenges head-on and remain dedicated until genuine resolution.' },
    { icon: <Zap size={32} />,   title: 'Agile Execution',    desc: 'Adapting system integrations quickly to support regulatory shifts and hardware expansions.' },
  ];

  const leaders = [
    {
      role: "CEO's Message", 
      title: 'Managing Director & CEO',
      bg: ceoImg,
      paragraphs: [
        'Establishing a business that would cater to new frontier technologies of Information age and build it to last has been my dream for Vishvin. Progress for me has been a constant motivation and hence once one milestone is achieved, there is always another one waiting to be crossed to accomplish our Goals & Mission. It is with this belief , that Vishvin is in the business of ITeS that has now diversified into IT Infra Services , smart metering & drone technology.',
        'We aim to become a prominent name in its business segment catering to government & private clients.',
        'With a laser focussed brilliant team , I am confident that we can overcome any challenge and bring success to Vishvin.  The journey of Vishvin has just begun and the best is to be witnessed. With the support of my team and clients, I am confident that the company will continue to scale new milestones of excellence for years to come.'
      ]
    },
    {
      role: "CFO's Message", 
      title: 'Ashok M — Director & CFO',
      bg: cfoImg,
      paragraphs: [
        'We always perceived our company as a unit that could make a difference with its quality and competitive pricing providing value to the products & Services rendered.Our financial  team at Vishvin look to steadily implement the financial strategy and capital policy planned for the company, specifically strengthening the financial base by appropriately managing cash allocation and implement returns to shareholders.',
        'Furthermore, in considering our medium- to long-term portfolio, We will aim to realize maximized investment efficiency and optimise allocation of management resources.',
        'We have Identified 3 critical growth levers across the organization and managed at all levels of the company:'
      ],
      bullets: [
        'Controlling Cost of Capital',
        'Optimizing Short-Term Profit',
        'Maximizing Long-Term Profit'
      ]
    },
    {
      role: "Director's Message", 
      title: 'S Venkatesh Murthy — Director',
      bg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
      paragraphs: [
        'It is a great honour to be the Director of Vishvin Technologies steering Marketing & Projects of the company at this vital juncture of transition & transformation as Vishvin has envisioned to embrace New Frontier Technologies dominating the Information Age focussing on Quality Products & Services to delight Customers.',
        'In a span of 5 years,  Vishvin Technologies became a prominent name in the business of ITeS & IT Infra serving Utilities & the MD’s vision is to make this company a preferred one in the upcoming technologies in the Geospatial sector using Drones for various applications and IoT Solutions especially Smart Metering in Utilities. We always want to push our company and achieve more prosperous milestones. We have already made break throughs in the identified areas and look forward to a Quantum leap'
      ]
    },
  ];

  return (
    <div style={{ background: 'var(--bg-primary)' }}>
      {/* ════ HERO ════ */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)', overflow: 'hidden', padding: '160px 0' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div className="reveal">
              <div style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '40px', borderLeft: '1px solid var(--border-medium)', paddingLeft: '20px' }}>
                OUR STORY
              </div>
              <h1 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 200, lineHeight: 1.2, marginBottom: '24px', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-main)' }}>
                75 Years of Achieving <br/><span style={{ color: 'var(--text-main)', fontWeight: 400 }}>Excellence.</span>
              </h1>
              <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '40px', fontWeight: 300, maxWidth: '500px' }}>
                Our team of experienced technical leads, systems analysts, and engineers offers enterprise clients a unified partner for modernizing their critical information infrastructure.
              </p>
            </div>
            <div className="reveal-stagger">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" alt="Team" style={{ borderRadius: '8px', width: '100%', height: 'auto' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ════ MISSION & VALUES ════ */}
      <section style={{ padding: '160px 0', background: 'var(--bg-secondary)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '80px', alignItems: 'start' }}>
            
            {/* Sticky Left Sidebar */}
            <div className="reveal" style={{ position: 'sticky', top: '160px' }}>
              <div style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px', display: 'inline-block', borderLeft: '1px solid var(--border-medium)', paddingLeft: '16px' }}>
                MISSION & VALUES
              </div>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 200, letterSpacing: '0.05em', color: 'var(--text-main)', textTransform: 'uppercase', lineHeight: 1.2 }}>
                Corporate <br/><span style={{ fontWeight: 400 }}>Objectives</span>
              </h2>
            </div>

            {/* Scrolling Right Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {[
                { tag: 'Mission', title: 'Premier Integration', desc: 'To deliver sustainable technology solutions with proven products, precise execution, and dependable support across government and private utilities.' },
                { tag: 'Vision',  title: 'Customer Delight',  desc: 'To satisfy customers and key stakeholders by providing top-tier support that aids them in attaining business and operational excellence.' },
                { tag: 'Foundation', title: 'Since 2017', desc: 'Established as a preferred IT partner to bolster India\'s digital growth, pairing capital allocation with dedicated technology execution.' },
              ].map((card, i) => (
                <div key={i} className="reveal-stagger" style={{ background: 'var(--bg-primary)', padding: '64px', borderRadius: '8px', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', transition: 'transform 0.4s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-8px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{card.tag}</div>
                    <div style={{ fontSize: '40px', fontWeight: 100, color: 'var(--border-medium)', lineHeight: 1 }}>0{i + 1}</div>
                  </div>
                  <h3 style={{ fontSize: '32px', fontWeight: 300, marginBottom: '24px', color: 'var(--text-main)', letterSpacing: '0.02em', textTransform: 'uppercase' }}>{card.title}</h3>
                  <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.8, fontWeight: 300 }}>{card.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ════ ETHOS ════ */}
      <section style={{ padding: '160px 0', background: 'var(--bg-primary)' }}>
        <div className="wrap">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '100px' }}>
            <div style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px', display: 'inline-block', borderLeft: '1px solid var(--border-medium)', paddingLeft: '16px' }}>
              OUR ETHOS
            </div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 200, letterSpacing: '0.05em', color: 'var(--text-main)', marginBottom: '24px', textTransform: 'uppercase' }}>
              Our Work <span style={{ fontWeight: 400 }}>Ethos</span>
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', fontWeight: 300, maxWidth: '600px', margin: '0 auto', lineHeight: 1.8 }}>The principles that drive every integration, deployment, and client relationship.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', borderTop: '1px solid var(--border-light)', borderLeft: '1px solid var(--border-light)' }}>
            {ethos.map((e, i) => (
              <div key={i} className="reveal-stagger" style={{ padding: '80px 48px', borderRight: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', transition: 'background 0.4s ease' }} onMouseOver={e => e.currentTarget.style.background = 'var(--bg-secondary)'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                <div style={{ color: 'var(--text-main)', marginBottom: '40px', display: 'inline-flex' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-medium)' }}>
                    {React.cloneElement(e.icon, { size: 36, strokeWidth: 1 })}
                  </div>
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 300, marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-main)' }}>{e.title}</h3>
                <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.8, fontWeight: 300, flex: 1 }}>{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ LEADERSHIP ════ */}
      <section style={{ padding: '120px 0', background: '#050505', color: '#fff' }}>
        <div className="wrap">
          <div className="reveal" style={{ marginBottom: '80px' }}>
            <div style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#666', marginBottom: '16px', display: 'inline-block', borderLeft: '1px solid #333', paddingLeft: '16px' }}>
              LEADERSHIP MESSAGES
            </div>
            <h2 style={{ fontSize: '32px', fontWeight: 300, letterSpacing: '0.05em', color: '#fff' }}>
              A Word From Our Leadership
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '40px', alignItems: 'stretch' }}>
            {leaders.map((l, i) => (
              <div key={i} className="reveal-stagger" style={{ background: '#0a0a0a', padding: '40px', borderRadius: '8px', border: '1px solid #1a1a1a', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
                  <img src={l.bg} alt={l.title} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-medium)' }} />
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 400, color: '#fff', margin: 0 }}>{l.title}</h3>
                    <div style={{ fontSize: '11px', color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>{l.role}</div>
                  </div>
                </div>
                <Quote size={24} style={{ color: '#333', marginBottom: '20px', flexShrink: 0 }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                  {l.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} style={{ fontSize: '14px', color: '#aaa', lineHeight: 1.8, margin: 0, fontWeight: 300, textAlign: 'justify' }}>
                      {p}
                    </p>
                  ))}
                  {l.bullets && (
                    <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px', color: '#bbb', fontSize: '14px', lineHeight: 1.8 }}>
                      {l.bullets.map((b, bIdx) => (
                        <li key={bIdx} style={{ fontWeight: 400 }}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
