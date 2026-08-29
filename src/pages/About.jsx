import { Target, Heart, Award, Zap, ArrowRight, Quote } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';

export default function About() {
  const [hoveredTimelineIdx, setHoveredTimelineIdx] = useState(0);
  const observerRef = useRef(null);
  const eventRefs = useRef([]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setHoveredTimelineIdx(index);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 } // triggers when item enters the middle 20% of the screen
    );

    eventRefs.current.forEach((el) => {
      if (el) observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);
  
  const ethos = [
    { icon: <Target size={32} />, title: 'Anchored by Goal',  desc: 'We target outcomes that continue to add utility long after project delivery.' },
    { icon: <Heart size={32} />, title: 'Care & Synergy',     desc: 'We collaborate across fields, keeping systems transparent, symmetrical, and sincere.' },
    { icon: <Award size={32} />, title: 'Accountability',     desc: 'We address technical challenges head-on and remain dedicated until genuine resolution.' },
    { icon: <Zap size={32} />,   title: 'Agile Execution',    desc: 'Adapting system integrations quickly to support regulatory shifts and hardware expansions.' },
  ];

  const leaders = [
    {
      role: 'CEO OFFICE', title: 'Chief Executive Officer',
      bg: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=1000&q=80',
      quote: 'Establishing a firm rooted in frontier technologies of the information age. Our team remains focused on scaling new milestones across state metering and grids.',
    },
    {
      role: 'CFO DIRECTIVE', title: 'Ashok M — CFO',
      bg: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80',
      quote: 'Aiming to deliver real utility value through competitive pricing. We focus capital on reducing project expenses and maximizing long-term service longevity.',
    },
    {
      role: 'OPERATIONS', title: 'S Venkatesh Murthy — Director',
      bg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
      quote: 'Steering operational networks while keeping client delight central. Vishvin is built to support smart grid architectures and high-resolution LiDAR sweeps.',
    },
  ];

  const timeline = [
    { 
      year: '2017', 
      event: 'Commenced Operations & Facility Management Services', 
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      bulletPoints: ['Provided skilled manpower for operating Any Time Payment machines at BESCOM.', 'Commenced initial operations across O&M divisions in September 2017.']
    },
    { 
      year: '2018', 
      event: 'Expanded Manpower Services for Utility Metering', 
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80',
      bulletPoints: ['Secured a 3-year contract with BESCOM.', 'Provided manpower for spot meter reading and energy bill issuance in RAPDRP areas.', 'Handled the Build, Own, Operate & Maintain (BOOM) basis for ATP machines.']
    },
    { 
      year: '2019', 
      event: 'Scaling Operations & System Integrations', 
      image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=800&q=80',
      bulletPoints: ['Expanded utility support services across multiple new districts.', 'Began integrating modernized data logging systems for field operations.']
    },
    { 
      year: '2020', 
      event: 'Hardware Infrastructure & Enterprise Services', 
      image: 'https://images.unsplash.com/photo-1551739440-5dd934d3a94a?auto=format&fit=crop&w=800&q=80',
      bulletPoints: ['Supplied and commissioned IT hardware and office infrastructure for field offices.', 'Partnered with KPTCL to provide comprehensive corporate office manpower services.']
    },
    { 
      year: '2021', 
      event: 'Facility Management & GIS Maintenance', 
      image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80',
      bulletPoints: ['Delivered Facility Management Services (FMS) for 21 RAPDRP towns under CESCOM.', 'Provided manpower services for the maintenance of GIS systems at BWSSB.', 'Extended IPDS IT Phase-II implementation services to BESCOM.']
    },
    { 
      year: '2022', 
      event: 'Statewide IT Hardware Commissioning', 
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      bulletPoints: ['Supplied and installed IT hardware for Customer Care Centres under IPDS Phase-II for BESCOM.', 'Provided FMS across GESCOM, MESCOM, and CESCOM IPDS towns.', 'Managed ticketing systems and resolution for thousands of IT assets.']
    },
    { 
      year: '2023', 
      event: 'Smart Metering & Drone Inspections', 
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      bulletPoints: ['Executed replacement of electromechanical meters with electrostatic meters for HESCOM.', 'Conducted aerial inspections of EHV Transmission lines using Unmanned Aviation Systems (UAS/Drones) for KPTCL.', 'Supplied IT infrastructure to the Department of Public Library across Karnataka.']
    },
    { 
      year: '2024', 
      event: 'Web-Enabled Software & Network Security', 
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
      bulletPoints: ['Implemented scalable web software for power requirements decision-making at KPTCL.', 'Deployed Application Access Control Systems and Secured Structured Cabling for KPTCL networks.', 'Expanded GIS digitization operators and technical manpower services.']
    },
    { 
      year: '2025', 
      event: 'Cloud Solutions & Metering Overhauls', 
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
      bulletPoints: ['Replacing existing meters with new Static Meters across Kalaburagi O&M Zone for GESCOM.', 'Implementing an Enterprise Office Suite and Email Cloud solution for KPTCL.', 'Supplying and commissioning extensive desktop hardware for multiple client divisions.']
    },
    { 
      year: '2026', 
      event: 'Resilient Architectures & Advanced UAS Inspections', 
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      bulletPoints: ['Implementing Resilient Network Architecture with secure cabling for KPTCL Substations.', 'Conducting comprehensive UAS/Drone-based inspections and data modeling for the Bhadra Dam (KNNL).', 'Executing long-term hardware and network maintenance contracts.']
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

      {/* ════ TIMELINE ════ */}
      <section style={{ padding: '120px 0', position: 'relative', background: 'var(--bg-secondary)' }}>
        <div className="wrap">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '120px' }}>
            <div style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px', display: 'inline-block', borderLeft: '1px solid var(--border-medium)', paddingLeft: '16px' }}>
              COMPANY HISTORY
            </div>
            <h2 style={{ fontSize: '40px', fontWeight: 300, letterSpacing: '0.05em', color: 'var(--text-main)' }}>
              Our Journey
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '80px', position: 'relative', alignItems: 'flex-start' }}>
            
            {/* LEFT: Sticky Years */}
            <div style={{ 
              position: 'sticky', top: '0', height: '100vh', flex: '0 0 40%', 
              display: 'flex', alignItems: 'center', overflow: 'hidden', 
              borderLeft: '1px solid var(--border-light)', paddingLeft: '40px',
              marginTop: '-120px', // offset section padding to make it full height
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)'
            }}>
              
              {/* Fake Ruler */}
              <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {timeline.map((_, i) => (
                  <div 
                    key={i} 
                    style={{ 
                      width: i === hoveredTimelineIdx ? '16px' : '12px', 
                      height: i === hoveredTimelineIdx ? '2px' : '1px', 
                      background: i === hoveredTimelineIdx ? 'var(--accent-blue)' : 'var(--text-muted)',
                      transition: 'all 0.3s ease'
                    }} 
                  />
                ))}
              </div>

              {/* Large Circle Decoration */}
              <div style={{ 
                position: 'absolute', left: '20%', top: '50%', transform: 'translateY(-50%)',
                width: '400px', height: '400px', borderRadius: '50%', border: '1px solid var(--border-medium)',
                zIndex: 0, pointerEvents: 'none', transition: 'all 0.5s ease'
              }}>
                <div style={{ position: 'absolute', top: '-1px', right: '40px', width: '60px', height: '2px', background: 'var(--accent-blue)', transform: 'rotate(30deg)' }} />
              </div>

              <div style={{ 
                position: 'absolute', top: '50%',
                display: 'flex', flexDirection: 'column', transition: 'transform 0.5s cubic-bezier(0.2, 1, 0.3, 1)',
                transform: `translateY(calc(-60px - (120px * ${hoveredTimelineIdx})))`,
                zIndex: 1
              }}>
                {timeline.map((item, i) => (
                  <div key={i} style={{ height: '120px', display: 'flex', alignItems: 'center' }}>
                    <div style={{ 
                      fontSize: 'clamp(64px, 8vw, 120px)', fontWeight: 800, lineHeight: 1,
                      color: i === hoveredTimelineIdx ? 'var(--accent-blue)' : 'var(--border-medium)',
                      transition: 'color 0.3s ease, transform 0.3s ease',
                      transform: i === hoveredTimelineIdx ? 'scale(1.05)' : 'scale(1)',
                      fontFamily: "'Plus Jakarta Sans', sans-serif"
                    }}>
                      {item.year}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Scrolling Events */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingBottom: '30vh' }}>
              {timeline.map((item, i) => (
                <div 
                  key={i} 
                  ref={el => eventRefs.current[i] = el}
                  data-index={i}
                  className="timeline-event-item reveal-stagger"
                  style={{ 
                    minHeight: '60vh', padding: '80px 0', borderBottom: '1px solid var(--border-light)',
                    display: 'flex', flexDirection: 'column', justifyContent: 'center'
                  }}
                  onMouseEnter={() => setHoveredTimelineIdx(i)}
                >
                  <div className="mono-text" style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '16px', textTransform: 'uppercase' }}>
                    January {item.year}
                  </div>
                  <h3 style={{ fontSize: '24px', marginBottom: '24px', lineHeight: 1.4, color: 'var(--text-main)' }}>
                    {item.event}
                  </h3>
                  {item.bulletPoints && (
                    <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.7 }}>
                      {item.bulletPoints.map((bp, idx) => (
                        <li key={idx} style={{ marginBottom: '12px' }}>{bp}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            {leaders.map((l, i) => (
              <div key={i} className="reveal-stagger" style={{ background: '#0a0a0a', padding: '40px', borderRadius: '4px', border: '1px solid #1a1a1a', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
                  <img src={l.bg} alt={l.title} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', filter: 'grayscale(100%) brightness(1.2)' }} />
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 400, color: '#fff' }}>{l.title}</h3>
                    <div style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>{l.role}</div>
                  </div>
                </div>
                <Quote size={24} style={{ color: '#333', marginBottom: '24px' }} />
                <p style={{ fontSize: '15px', color: '#999', fontStyle: 'italic', lineHeight: 1.8 }}>"{l.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
