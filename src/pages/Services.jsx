import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Signal, Gauge, Radio, Radar, Network, Library, ShieldAlert, Wrench, Receipt } from 'lucide-react';
import droneGeospatialImg from '../assets/services/drone-geospatial.png';

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
    image: droneGeospatialImg,
    bulletPoints: ['Implementing Resilient Network Architecture with secure cabling for KPTCL Substations.', 'Conducting comprehensive UAS/Drone-based inspections and data modeling for the Bhadra Dam (KNNL).', 'Executing long-term hardware and network maintenance contracts.']
  },
];

export default function Services() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollProgressRef = useRef(0);

  const [leftOverrideIdx, setLeftOverrideIdx] = useState(null);
  const [rightOverrideIdx, setRightOverrideIdx] = useState(null);

  const isHoveringLeft = useRef(false);
  const isHoveringRight = useRef(false);

  const lastWheelTimeLeft = useRef(0);
  const lastWheelTimeRight = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const scrollableHeight = height - window.innerHeight;
      if (scrollableHeight <= 0) return;

      let progress = 0;
      if (top > 0) {
        progress = 0;
      } else if (-top > scrollableHeight) {
        progress = 1;
      } else {
        progress = -top / scrollableHeight;
      }

      scrollProgressRef.current = progress;
      setScrollProgress(progress);

      if (!isHoveringLeft.current) {
        setLeftOverrideIdx(null);
      }
      if (!isHoveringRight.current) {
        setRightOverrideIdx(null);
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

  // Independent wheel handler for Left Showcase Card
  useEffect(() => {
    const leftEl = leftCardRef.current;
    const rightEl = rightCardRef.current;

    const handleLeftWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();

      const now = Date.now();
      if (now - lastWheelTimeLeft.current < 220) return;
      lastWheelTimeLeft.current = now;

      setLeftOverrideIdx((prev) => {
        const current =
          prev !== null
            ? prev
            : Math.min(
                Math.floor(scrollProgressRef.current * services.length),
                services.length - 1
              );
        if (e.deltaY > 0) {
          return Math.min(current + 1, services.length - 1);
        } else if (e.deltaY < 0) {
          return Math.max(current - 1, 0);
        }
        return current;
      });
    };

    const handleRightWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();

      const now = Date.now();
      if (now - lastWheelTimeRight.current < 220) return;
      lastWheelTimeRight.current = now;

      setRightOverrideIdx((prev) => {
        const current =
          prev !== null
            ? prev
            : Math.min(
                Math.floor(scrollProgressRef.current * timeline.length),
                timeline.length - 1
              );
        if (e.deltaY > 0) {
          return Math.min(current + 1, timeline.length - 1);
        } else if (e.deltaY < 0) {
          return Math.max(current - 1, 0);
        }
        return current;
      });
    };

    if (leftEl) leftEl.addEventListener('wheel', handleLeftWheel, { passive: false });
    if (rightEl) rightEl.addEventListener('wheel', handleRightWheel, { passive: false });

    return () => {
      if (leftEl) leftEl.removeEventListener('wheel', handleLeftWheel);
      if (rightEl) rightEl.removeEventListener('wheel', handleRightWheel);
    };
  }, []);

  const globalSvcIdx = Math.min(
    Math.floor(scrollProgress * services.length),
    services.length - 1
  );

  const globalTimelineIdx = Math.min(
    Math.floor(scrollProgress * timeline.length),
    timeline.length - 1
  );

  const activeSvcIdx = leftOverrideIdx !== null ? leftOverrideIdx : globalSvcIdx;
  const activeTimelineIdx =
    rightOverrideIdx !== null ? rightOverrideIdx : globalTimelineIdx;

  return (
    <div style={{ background: 'var(--bg-primary)' }}>

      {/* ════ HERO ════ */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)', overflow: 'hidden', padding: '160px 0 50px' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div className="reveal">
              <div style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '40px', borderLeft: '1px solid var(--border-medium)', paddingLeft: '20px' }}>
                IT SERVICES & JOURNEY
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

      {/* ════ DUAL-COLUMN SYNCHRONIZED STICKY ANIMATED SHOWCASE ════ */}
      <section
        ref={containerRef}
        className="showcase-sticky-outer"
        style={{
          height: '450vh',
          position: 'relative',
          background: 'var(--bg-secondary)',
        }}
      >
        <div
          className="showcase-sticky-inner"
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            overflow: 'hidden',
            padding: '24px 0',
            boxSizing: 'border-box',
          }}
        >
          <div className="showcase-wrap" style={{ width: '100%', padding: '0 40px', boxSizing: 'border-box' }}>
            {/* 2-COLUMN SPLIT GRID */}
            <div
              className="dual-showcase-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
                gap: '32px',
                alignItems: 'center',
              }}
            >
              {/* ════ LEFT COLUMN: SERVICE PORTFOLIO ANIMATED SHOWCASE ════ */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <div style={{ marginBottom: '20px', flexShrink: 0 }}>
                  <div
                    style={{
                      fontSize: '13px',
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                      marginBottom: '8px',
                      display: 'inline-block',
                      borderLeft: '1px solid var(--border-medium)',
                      paddingLeft: '14px',
                      fontWeight: 500,
                    }}
                  >
                    ENTERPRISE CAPABILITIES
                  </div>
                  <h2
                    style={{
                      fontSize: 'clamp(30px, 2.8vw, 42px)',
                      fontWeight: 300,
                      letterSpacing: '0.05em',
                      color: 'var(--text-main)',
                      textTransform: 'uppercase',
                      margin: 0,
                      lineHeight: 1.15,
                    }}
                  >
                    Our Service <span style={{ fontWeight: 400 }}>Portfolio</span>
                  </h2>
                </div>

                {/* Active Animated Service Card Showcase (Compact 460px Height) */}
                <div
                  ref={leftCardRef}
                  className="showcase-card-compact"
                  onMouseEnter={() => {
                    isHoveringLeft.current = true;
                  }}
                  onMouseLeave={() => {
                    isHoveringLeft.current = false;
                    setLeftOverrideIdx(null);
                  }}
                  style={{
                    position: 'relative',
                    height: '460px',
                    overflow: 'hidden',
                    borderRadius: '20px',
                    border: '1px solid var(--border-light)',
                    background: 'var(--bg-primary)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
                  }}
                >
                  {services.map((svc, i) => {
                    const isActive = i === activeSvcIdx;
                    return (
                      <div
                        key={i}
                        className="showcase-card-inner-padding"
                        onClick={() => navigate(`/services/${svc.id}`)}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          padding: '40px 36px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          opacity: isActive ? 1 : 0,
                          transform: isActive
                            ? 'translateY(0) scale(1)'
                            : i < activeSvcIdx
                            ? 'translateY(-30px) scale(0.95)'
                            : 'translateY(30px) scale(0.95)',
                          pointerEvents: isActive ? 'auto' : 'none',
                          transition:
                            'all 0.5s cubic-bezier(0.2, 1, 0.3, 1)',
                          cursor: 'pointer',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div
                            style={{
                              width: '64px',
                              height: '64px',
                              borderRadius: '50%',
                              background: 'transparent',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              border: '1px solid var(--accent-blue)',
                              color: 'var(--text-main)',
                            }}
                          >
                            {React.cloneElement(svc.icon, {
                              size: 30,
                              strokeWidth: 1.5,
                            })}
                          </div>
                          <span
                            style={{
                              fontSize: '11px',
                              letterSpacing: '0.18em',
                              textTransform: 'uppercase',
                              color: 'var(--accent-blue)',
                              border: '1px solid var(--accent-blue)',
                              padding: '6px 18px',
                              borderRadius: '20px',
                              fontWeight: 600,
                            }}
                          >
                            {svc.tag}
                          </span>
                        </div>

                        <div style={{ margin: '14px 0' }}>
                          <h3
                            style={{
                              fontSize: 'clamp(20px, 1.8vw, 26px)',
                              fontWeight: 400,
                              marginBottom: '12px',
                              color: 'var(--text-main)',
                              letterSpacing: '0.03em',
                              textTransform: 'uppercase',
                              lineHeight: 1.3,
                            }}
                          >
                            {svc.title}
                          </h3>
                          <p
                            style={{
                              fontSize: '15px',
                              color: 'var(--text-secondary)',
                              lineHeight: 1.7,
                              margin: 0,
                              fontWeight: 300,
                            }}
                          >
                            {svc.desc}
                          </p>
                        </div>

                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderTop: '1px solid var(--border-light)',
                            paddingTop: '16px',
                          }}
                        >
                          <div
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '8px',
                              color: 'var(--accent-blue)',
                              fontWeight: 600,
                              fontSize: '12px',
                              textTransform: 'uppercase',
                              letterSpacing: '0.15em',
                            }}
                          >
                            Explore Service Details{' '}
                            <ArrowRight size={14} strokeWidth={1.5} />
                          </div>
                          <div
                            style={{
                              fontSize: '11px',
                              color: 'var(--text-muted)',
                              fontWeight: 600,
                            }}
                          >
                            0{i + 1} / 0{services.length}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Dot Progress Bar for Left Column */}
                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    justifyContent: 'center',
                    marginTop: '16px',
                    flexShrink: 0,
                  }}
                >
                  {services.map((_, i) => (
                    <div
                      key={i}
                      onClick={() => setLeftOverrideIdx(i)}
                      style={{
                        width: i === activeSvcIdx ? '28px' : '8px',
                        height: '8px',
                        borderRadius: '4px',
                        background:
                          i === activeSvcIdx
                            ? 'var(--accent-blue)'
                            : 'var(--border-medium)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* ════ RIGHT COLUMN: COMPANY HISTORY ANIMATED TIMELINE SHOWCASE ════ */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <div style={{ marginBottom: '20px', flexShrink: 0 }}>
                  <div
                    style={{
                      fontSize: '13px',
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                      marginBottom: '8px',
                      display: 'inline-block',
                      borderLeft: '1px solid var(--border-medium)',
                      paddingLeft: '14px',
                      fontWeight: 500,
                    }}
                  >
                    COMPANY HISTORY
                  </div>
                  <h2
                    style={{
                      fontSize: 'clamp(30px, 2.8vw, 42px)',
                      fontWeight: 300,
                      letterSpacing: '0.05em',
                      color: 'var(--text-main)',
                      textTransform: 'uppercase',
                      margin: 0,
                      lineHeight: 1.15,
                    }}
                  >
                    Our <span style={{ fontWeight: 400 }}>Journey</span>
                  </h2>
                </div>

                {/* Timeline Animation Container (Compact 460px Height) */}
                <div
                  ref={rightCardRef}
                  className="showcase-card-compact showcase-card-inner-padding"
                  onMouseEnter={() => {
                    isHoveringRight.current = true;
                  }}
                  onMouseLeave={() => {
                    isHoveringRight.current = false;
                    setRightOverrideIdx(null);
                  }}
                  style={{
                    display: 'flex',
                    gap: '24px',
                    alignItems: 'center',
                    height: '460px',
                    background: 'var(--bg-primary)',
                    borderRadius: '20px',
                    border: '1px solid var(--border-light)',
                    padding: '38px 32px',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Left Ruler & Animated Vertical Sliding Year Indicator */}
                  <div
                    className="showcase-ruler-col"
                    style={{
                      width: '180px',
                      height: '100%',
                      flexShrink: 0,
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      overflow: 'hidden',
                      borderRight: '1px solid var(--border-light)',
                      paddingRight: '14px',
                      WebkitMaskImage:
                        'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                      maskImage:
                        'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                    }}
                  >
                    {/* Fake Ruler */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                      }}
                    >
                      {timeline.map((_, i) => (
                        <div
                          key={i}
                          style={{
                            width: i === activeTimelineIdx ? '16px' : '8px',
                            height: i === activeTimelineIdx ? '2px' : '1px',
                            background:
                              i === activeTimelineIdx
                                ? 'var(--accent-blue)'
                                : 'var(--text-muted)',
                            transition: 'all 0.3s ease',
                          }}
                        />
                      ))}
                    </div>

                    {/* Big Animated Sliding Year Digits (No Truncation) */}
                    <div
                      className="showcase-ruler-digits"
                      style={{
                        position: 'absolute',
                        left: '34px',
                        top: '50%',
                        width: '130px',
                        display: 'flex',
                        flexDirection: 'column',
                        transition:
                          'transform 0.5s cubic-bezier(0.2, 1, 0.3, 1)',
                        transform: `translateY(calc(-32px - (64px * ${activeTimelineIdx})))`,
                        zIndex: 1,
                      }}
                    >
                      {timeline.map((item, i) => (
                        <div
                          key={i}
                          style={{
                            height: '64px',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <div
                            className="showcase-ruler-digit-text"
                            style={{
                              fontSize: 'clamp(32px, 3vw, 42px)',
                              fontWeight: 800,
                              lineHeight: 1,
                              color:
                                i === activeTimelineIdx
                                  ? 'var(--accent-blue)'
                                  : 'var(--border-medium)',
                              transition:
                                'color 0.3s ease, transform 0.3s ease',
                              transform:
                                i === activeTimelineIdx
                                  ? 'scale(1.1)'
                                  : 'scale(0.9)',
                              fontFamily: "'Plus Jakarta Sans', sans-serif",
                              letterSpacing: '0.02em',
                            }}
                          >
                            {item.year}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Event Details with Smooth Transition */}
                  <div
                    style={{
                      flex: 1,
                      height: '100%',
                      position: 'relative',
                      overflow: 'hidden',
                      paddingLeft: '4px',
                    }}
                  >
                    {timeline.map((item, i) => {
                      const isActive = i === activeTimelineIdx;
                      return (
                        <div
                          key={i}
                          style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            gap: '14px',
                            opacity: isActive ? 1 : 0,
                            transform: isActive
                              ? 'translateY(0) scale(1)'
                              : i < activeTimelineIdx
                              ? 'translateY(-25px) scale(0.95)'
                              : 'translateY(25px) scale(0.95)',
                            pointerEvents: isActive ? 'auto' : 'none',
                            transition:
                              'all 0.5s cubic-bezier(0.2, 1, 0.3, 1)',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}
                          >
                            <span
                              className="mono-text"
                              style={{
                                fontSize: '11px',
                                color: 'var(--accent-blue)',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.15em',
                              }}
                            >
                              JANUARY {item.year}
                            </span>
                            <span
                              style={{
                                fontSize: '11px',
                                color: 'var(--text-muted)',
                              }}
                            >
                              Milestone {i + 1}/{timeline.length}
                            </span>
                          </div>

                          <h3
                            style={{
                              fontSize: 'clamp(18px, 1.6vw, 22px)',
                              fontWeight: 400,
                              lineHeight: 1.35,
                              color: 'var(--text-main)',
                              margin: 0,
                            }}
                          >
                            {item.event}
                          </h3>

                          {item.bulletPoints && (
                            <ul
                              style={{
                                margin: 0,
                                paddingLeft: '18px',
                                color: 'var(--text-secondary)',
                                fontSize: '14px',
                                lineHeight: 1.6,
                                fontWeight: 300,
                              }}
                            >
                              {item.bulletPoints.map((bp, idx) => (
                                <li key={idx} style={{ marginBottom: '6px' }}>
                                  {bp}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Year Indicator Bar */}
                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    justifyContent: 'center',
                    marginTop: '16px',
                    flexShrink: 0,
                  }}
                >
                  {timeline.map((item, i) => (
                    <div
                      key={i}
                      onClick={() => setRightOverrideIdx(i)}
                      style={{
                        width: i === activeTimelineIdx ? '28px' : '8px',
                        height: '8px',
                        borderRadius: '4px',
                        background:
                          i === activeTimelineIdx
                            ? 'var(--accent-blue)'
                            : 'var(--border-medium)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ TECH PARTNERS ════ */}
      <section style={{ padding: '60px 0 50px', background: '#050505', color: '#fff' }}>
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
