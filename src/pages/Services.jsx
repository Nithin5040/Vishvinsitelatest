import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Signal, Gauge, Radio, Radar, Network, Library, ShieldAlert, Wrench, Receipt } from 'lucide-react';

// Import local partner logos
import logoDell from '../assets/partners/DELL Tech.png';
import logoDLink from '../assets/partners/D_Link.png';
import logoFortinet from '../assets/partners/Fortinet.png';
import logoHP from '../assets/partners/HP.png';
import logoRedHat from '../assets/partners/Red_Hat.png';
import logoSangoma from '../assets/partners/Sangoma.jpg';
import logoSophos from '../assets/partners/Sophos.png';
import logoVertiv from '../assets/partners/Vertiv.jpg';
import logoZscaler from '../assets/partners/Zscaler.png';
import logoCiscoMeraki from '../assets/partners/cisco-meraki (2).png';
import logoCisco from '../assets/partners/cisco.png';
import logoDinstar from '../assets/partners/dinstar.png';
import logoKaspersky from '../assets/partners/kaspersky.png';
import logoLenovo from '../assets/partners/lenovo.png';
import logoTrendMicro from '../assets/partners/trend-micro.png';
import logoShieldWorkz from '../assets/partners/ShieldWorkz.png';
import logoEnGenius from '../assets/partners/EnGenius.png';
import logoExtremeNetworks from '../assets/partners/ExtremeNetworks.jpg';
import logoXaasio from '../assets/partners/XAASIO.png';
import logoCheckPoint from '../assets/partners/CheckPoint.png';

const services = [
  { 
    id: 'smart-poles',
    icon: <Signal />, 
    title: 'Smart Street Poles',          
    desc: 'Connectivity and environmental sensing integrated into city grids via smart poles.',        
    tag: 'Smart City',
  },
  { 
    id: 'ami',
    icon: <Gauge />, 
    title: 'AMI (Advanced Metering)',      
    desc: 'Bi-directional links for real-time network logs between consumer meters and utility portals.',
    tag: 'Metering',    
  },
  { 
    id: 'amr',
    icon: <Radio />, 
    title: 'AMR (Automatic Meter Read)',   
    desc: 'Automated extraction of consumption logs and sensor statuses from remote industrial nodes.',  
    tag: 'Automation',  
  },
  { 
    id: 'drone',
    icon: <Radar />, 
    title: 'Drone-Based Inspection',       
    desc: 'High-resolution aerial scanning, LiDAR mapping, and thermal fault detection.',                
    tag: 'Aerial Survey',
  },
  { 
    id: 'it-infra',
    icon: <Network />, 
    title: 'IT Infrastructure Integration',
    desc: 'Strategic consultation and hardware deployment to modernize wide-area utility systems.',       
    tag: 'IT Infra',    
  },
  { 
    id: 'digital-library',
    icon: <Library />, 
    title: 'Digital Library Solutions',    
    desc: 'Cloud-hosted enterprise content platforms to index, store, and secure massive libraries.',     
    tag: 'Cloud Content',
  },
  { 
    id: 'vms',
    icon: <ShieldAlert />, 
    title: 'Vigilance Metering (VMS)',     
    desc: 'Application portals for tracking energy audits and field inspection schedules.',              
    tag: 'Monitoring',  
  },
  { 
    id: 'meter-installation',
    icon: <Wrench />, 
    title: 'Meter Supply & Installation',  
    desc: 'Technical site deployment and replacements by certified metering engineers.',                  
    tag: 'Deployment',  
  },
  { 
    id: 'metering-billing',
    icon: <Receipt />, 
    title: 'IT-Enabled Metering & Billing Systems',  
    desc: 'Static meter retrofits, systematic meter reading, validation, automated bill generation, and revenue assurance.',                  
    tag: 'Metering & Billing',  
  },
];

const partners = [
  { name: 'Zscaler', src: logoZscaler, category: 'Security' },
  { name: 'Cisco Meraki', src: logoCiscoMeraki, category: 'Networking' },
  { name: 'Trend Micro', src: logoTrendMicro, category: 'Security' },
  { name: 'Sophos', src: logoSophos, category: 'Security' },
  { name: 'HP', src: logoHP, category: 'Hardware' },
  { name: 'Kaspersky', src: logoKaspersky, category: 'Security' },
  { name: 'Sangoma', src: logoSangoma, category: 'Communications' },
  { name: 'Dinstar', src: logoDinstar, category: 'Communications' },
  { name: 'D-Link', src: logoDLink, category: 'Networking' },
  { name: 'Dell', src: logoDell, category: 'Hardware' },
  { name: 'Fortinet', src: logoFortinet, category: 'Security' },
  { name: 'Red Hat', src: logoRedHat, category: 'Cloud' },
  { name: 'Cisco', src: logoCisco, category: 'Networking' },
  { name: 'Lenovo', src: logoLenovo, category: 'Hardware' },
  { name: 'Vertiv', src: logoVertiv, category: 'Infrastructure' },
  { name: 'ShieldWorkz', src: logoShieldWorkz, category: 'Security' },
  { name: 'EnGenius', src: logoEnGenius, category: 'Networking' },
  { name: 'Extreme Networks', src: logoExtremeNetworks, category: 'Networking' },
  { name: 'XAASIO', src: logoXaasio, category: 'Cloud' },
  { name: 'Check Point', src: logoCheckPoint, category: 'Security' },
];

export default function Services() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollX, setScrollX] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !trackRef.current) return;
      
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const trackWidth = trackRef.current.scrollWidth;
      const viewWidth = window.innerWidth;
      
      const maxScrollX = trackWidth - viewWidth;
      if (maxScrollX <= 0) {
        setScrollX(0);
        return;
      }
      
      const scrollableHeight = height - window.innerHeight;
      
      if (top > 0) {
        setScrollX(0);
      } else if (-top > scrollableHeight) {
        setScrollX(-maxScrollX);
      } else {
        const progress = -top / scrollableHeight;
        setScrollX(-(progress * maxScrollX));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div style={{ background: 'var(--bg-primary)' }}>

      {/* ════ HERO ════ */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)', overflow: 'hidden', padding: '160px 0' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div className="reveal">
              <div style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '40px', borderLeft: '1px solid var(--border-medium)', paddingLeft: '20px' }}>
                IT SERVICES
              </div>
              <h1 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 200, lineHeight: 1.2, marginBottom: '24px', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-main)' }}>
                Technology & <br/><span style={{ color: 'var(--text-main)', fontWeight: 400 }}>IT Services.</span>
              </h1>
              <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '40px', fontWeight: 300, maxWidth: '500px' }}>
                Cost-effective, secure and scalable enterprise applications, mobile solutions, drone diagnostics and business intelligence platforms — built to maximize infrastructure assets.
              </p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', border: '1px solid var(--text-main)', padding: '12px 24px', borderRadius: '40px', color: 'var(--bg-primary)', background: 'var(--text-main)', transition: 'all 0.3s' }}>
                  Get a Quote
                </Link>
                <Link to="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', border: '1px solid var(--border-medium)', padding: '12px 24px', borderRadius: '40px', color: 'var(--text-main)', transition: 'all 0.3s' }} onMouseOver={e => e.currentTarget.style.borderColor = 'var(--text-main)'} onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border-medium)'}>
                  About Us <ArrowRight size={14} />
                </Link>
              </div>
            </div>
            <div className="reveal-stagger">
              <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80" alt="Tech" style={{ borderRadius: '8px', width: '100%', height: 'auto' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ════ SERVICE GRID (Sticky Scroll) ════ */}
      <section ref={sectionRef} style={{ height: '300vh', position: 'relative', background: 'var(--bg-secondary)' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          
          <div className="wrap" style={{ width: '100%', paddingTop: '160px' }}>
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '80px' }}>
              <div style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px', display: 'inline-block', borderLeft: '1px solid var(--border-medium)', paddingLeft: '16px' }}>
                ENTERPRISE CAPABILITIES
              </div>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 200, letterSpacing: '0.05em', color: 'var(--text-main)', marginBottom: '24px', textTransform: 'uppercase' }}>
                Our Service <span style={{ fontWeight: 400 }}>Portfolio</span>
              </h2>
              <p style={{ fontSize: '16px', color: 'var(--text-secondary)', fontWeight: 300, maxWidth: '600px', margin: '0 auto', lineHeight: 1.8 }}>Comprehensive service verticals engineered for utility modernization, smart infrastructure, and enterprise IT across Karnataka.</p>
            </div>
          </div>

          <div 
            ref={trackRef}
            style={{ 
              display: 'flex', 
              transform: `translateX(${scrollX}px)`, 
              willChange: 'transform',
              borderTop: '1px solid var(--border-light)', 
              borderBottom: '1px solid var(--border-light)',
              width: 'max-content'
            }}
          >
            {services.map((svc, i) => (
              <div
                key={i}
                onClick={() => navigate(`/services/${svc.id}`)}
                style={{ flexShrink: 0, width: '400px', cursor: 'pointer', background: 'transparent', padding: '64px 48px', borderRight: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', transition: 'background 0.4s ease' }}
                onMouseOver={e => e.currentTarget.style.background = 'var(--bg-primary)'}
                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ color: 'var(--text-main)', marginBottom: '40px', display: 'inline-flex' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-medium)' }}>
                    {React.cloneElement(svc.icon, { size: 36, strokeWidth: 1 })}
                  </div>
                </div>
                <div style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '24px' }}>{svc.tag}</div>
                <h3 style={{ fontSize: '24px', fontWeight: 300, marginBottom: '24px', color: 'var(--text-main)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{svc.title}</h3>
                <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.8, flex: 1, marginBottom: '48px', fontWeight: 300 }}>{svc.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-main)', fontWeight: 400, fontSize: '11px', marginTop: 'auto', textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.7, transition: 'opacity 0.3s' }} onMouseOver={e => e.currentTarget.style.opacity = 1} onMouseOut={e => e.currentTarget.style.opacity = 0.7}>
                  View Details <ArrowRight size={14} strokeWidth={1.5} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ TECH PARTNERS ════ */}
      <section style={{ padding: '40px 0 50px', background: '#050505', color: '#fff' }}>
        <div className="wrap">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#666', marginBottom: '8px', display: 'inline-block', borderLeft: '1px solid #333', paddingLeft: '14px' }}>
              TECHNOLOGY PARTNERS
            </div>
            <h2 style={{ fontSize: '32px', fontWeight: 300, letterSpacing: '0.05em', color: '#fff', marginBottom: '6px' }}>
              Our Alliance Network
            </h2>
            <p style={{ fontSize: '15px', color: '#888', fontWeight: 300, maxWidth: '600px', margin: '0 auto' }}>Authorized resellers and integrators for the world's leading technology brands.</p>
          </div>

          <style>
            {`
              @keyframes marqueeScrollPartners {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .marquee-track-partners:hover {
                animation-play-state: paused;
              }
            `}
          </style>
          
          <div style={{ 
            overflow: 'hidden', 
            width: '100%', 
            position: 'relative',
            marginBottom: '32px',
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
          }}>
            <div 
              className="marquee-track-partners"
              style={{ 
                display: 'flex', 
                gap: '32px', 
                width: 'max-content',
                animation: 'marqueeScrollPartners 45s linear infinite',
                padding: '12px 0'
              }}
            >
              {[...partners, ...partners].map((p, i) => (
                <div key={i} style={{ flexShrink: 0, width: '200px', background: '#fff', borderRadius: '12px', padding: '12px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '130px', transition: 'all 0.3s', border: '1px solid rgba(255,255,255,0.1)' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05) translateY(-4px)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1) translateY(0)'}>
                  <img src={p.src} alt={p.name} style={{ width: '92%', height: '92%', objectFit: 'contain' }} />
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center' }} className="reveal">
            <h3 style={{ fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 300, letterSpacing: '0.05em', marginBottom: '8px', textTransform: 'uppercase' }}>
              Need a custom solution?
            </h3>
            <p style={{ fontSize: '15px', color: '#888', marginBottom: '20px', fontWeight: 300 }}>
              Talk to our team about your specific infrastructure requirements.
            </p>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', border: '1px solid #fff', padding: '10px 24px', borderRadius: '40px', color: '#050505', background: '#fff', transition: 'all 0.3s' }}>
              Contact Our Team <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
