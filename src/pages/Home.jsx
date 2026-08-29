import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Import local assets
import heroVideo from '../assets/Video Project 2.mp4';
import homeItInfraImg from '../assets/services/home-it-infra.jpg';
import homeCloudIotImg from '../assets/services/home-cloud-iot.jpg';
import logoKreis from '../assets/services/07 KREIS.avif';
import logoGok from '../assets/services/08 GOK.avif';
import logoTribal from '../assets/services/09 Department of tribal welfare.avif';
import logoRevenue from '../assets/services/10 revenue department karnataka.avif';
import logoCollegiate from '../assets/services/11 Department of college education.avif';
import logoLibrary from '../assets/services/12 Department of public liberary.avif';
import logoKnnl from '../assets/services/13 karnataka neeravery nigam limited.avif';
import logoAdvarra from '../assets/services/14 advarra.avif';
import logoCims from '../assets/services/15 Cimscrnagara Karnataka.avif';

export default function Home() {
  const stats = [
    { num: '75+', label: 'Years Combined Experience' },
    { num: '25+', label: 'Enterprise Clients' },
    { num: '500+', label: 'Skilled Professionals' },
    { num: '99.9%', label: 'Network Uptime SLA' },
  ];

  const services = [
    { 
      id: 'it-infra', 
      title: 'Systems & Network Integration', 
      desc: 'Modernizing core LAN/WAN infrastructures, optical fibers, and private virtualization clusters. We build highly resilient architectures engineered to scale effortlessly with your organization\'s growth. By implementing robust structured cabling and comprehensive security protocols, we ensure continuous service delivery, zero-downtime operations, and a rock-solid foundation for all mission-critical government and enterprise deployments.', 
      bg: homeItInfraImg 
    },
    { 
      id: 'smart-poles', 
      title: 'Cloud-Based IoT Solutions', 
      desc: 'Hosting secure SCADA data streams on enterprise-grade Azure IoT platforms, seamlessly rendering complex metrics onto intuitive, real-time dashboards. We transform raw field data into actionable intelligence, providing advanced analytics and predictive maintenance alerts. Our cloud architecture empowers utility decision-makers to optimize resources, reduce operational overhead, and maintain absolute control over decentralized grids.', 
      bg: homeCloudIotImg 
    },
    { 
      id: 'drone', 
      title: 'Drone & Geospatial Analytics', 
      desc: 'Performing precision aerial utility mapping, high-resolution LiDAR sweeps, and automated asset fault detection using state-of-the-art Unmanned Aviation Systems. Our perception-enabled systems provide an unparalleled bird\'s-eye view of your entire grid infrastructure, instantly identifying anomalies and structural vulnerabilities. We deliver comprehensive digital twin models that dramatically enhance safety and accelerate maintenance workflows.', 
      bg: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1000&q=80' 
    },
  ];

  const clients = [
    { src: 'https://static.wixstatic.com/media/27df3d_01695d6f150446cb86a3eecf46b05941~mv2.jpg', name: 'KPTCL' },
    { src: 'https://static.wixstatic.com/media/27df3d_a5757f8522bf4653adebb663660c59e5~mv2.jpg', name: 'BESCOM' },
    { src: 'https://static.wixstatic.com/media/27df3d_57d1ea026eb943249520481189db8044~mv2.jpg', name: 'HESCOM' },
    { src: 'https://static.wixstatic.com/media/27df3d_5ff84dc2096247f8b4d720574b77a714~mv2.jpg', name: 'GESCOM' },
    { src: 'https://static.wixstatic.com/media/27df3d_aaa5df13556e4ab8bc7f7ab73dea7b9a~mv2.jpg', name: 'CESCOM' },
    { src: 'https://static.wixstatic.com/media/27df3d_98d162d93aa64835862d317f96b60512~mv2.jpg', name: 'BWSSB' },
    { src: logoKreis, name: 'KREIS' },
    { src: logoGok, name: 'Govt of Karnataka' },
    { src: logoTribal, name: 'Tribal Welfare' },
    { src: logoRevenue, name: 'Revenue Dept' },
    { src: logoCollegiate, name: 'Collegiate Education' },
    { src: logoLibrary, name: 'Public Libraries' },
    { src: logoKnnl, name: 'KNNL' },
    { src: logoAdvarra, name: 'ADVARRA' },
    { src: logoCims, name: 'CIMS' },
  ];

  // Helper for scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-stagger, .reveal-left, .reveal-right');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
        }
      });
    }, { threshold: 0.1 });
    
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const [heroReady, setHeroReady] = useState(false);
  const introCanvasRef = useRef(null);

  // Binary animation inside hero section only
  useEffect(() => {
    const canvas = introCanvasRef.current;
    if (!canvas) return;
    const section = canvas.parentElement;
    canvas.width = section.offsetWidth;
    canvas.height = section.offsetHeight;
    const ctx = canvas.getContext('2d');

    const fontSize = 15;
    const charW = fontSize * 0.62;
    const numRows = Math.floor(canvas.height / (fontSize * 1.8));
    const numCols = Math.floor(canvas.width / charW) + 2;

    // Rows appear one-by-one from top, staggered
    const rows = Array.from({ length: numRows }, (_, i) => ({
      y: (i + 1) * (canvas.height / numRows),
      chars: Array.from({ length: numCols }, () => Math.random() > 0.5 ? '1' : '0'),
      headFrac: -(i * 18), // stagger each row start so they appear line by line
      speed: 1.2 + Math.random() * 0.5,
    }));

    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.10)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      rows.forEach(row => {
        row.headFrac += row.speed;
        const head = Math.floor(row.headFrac);
        if (head < 0) return; // not started yet

        row.chars.forEach((ch, ci) => {
          const dist = head - ci;
          if (dist < 0 || dist > 30) return;
          const alpha = dist === 0 ? 1 : Math.max(0, 1 - dist / 30);
          ctx.fillStyle = dist === 0
            ? `rgba(255,255,255,1)`
            : dist < 5
              ? `rgba(140,210,255,${alpha * 0.95})`
              : `rgba(50,130,220,${alpha * 0.55})`;
          ctx.fillText(ch, ci * charW, row.y);
          if (Math.random() > 0.997) row.chars[ci] = row.chars[ci] === '1' ? '0' : '1';
        });

        if (row.headFrac > numCols + 30) {
          row.headFrac = -(Math.random() * 20);
          row.chars = row.chars.map(() => Math.random() > 0.5 ? '1' : '0');
        }
      });
    };

    const interval = setInterval(draw, 35);
    // After 3s fade canvas, reveal video+text
    const fadeTimer = setTimeout(() => setHeroReady(true), 3000);

    return () => { clearInterval(interval); clearTimeout(fadeTimer); };
  }, []);

  return (
    <div style={{ background: 'var(--bg-primary)' }}>
      
      {/* 1. HERO SECTION */}
      <section style={{ 
        position: 'relative', height: '90vh', minHeight: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', overflow: 'hidden', background: '#000'
      }}>
        {/* Binary canvas — only inside hero, fades out */}
        <canvas
          ref={introCanvasRef}
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            zIndex: 2, pointerEvents: 'none',
            opacity: heroReady ? 0 : 1,
            transition: 'opacity 1.6s ease',
          }}
        />
        {/* Video — fades in after binary */}
        <video 
          autoPlay loop muted playsInline
          src={heroVideo} 
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            objectFit: 'cover', zIndex: 0,
            opacity: heroReady ? 1 : 0,
            transition: 'opacity 1.6s ease',
          }}
        />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)', zIndex: 1 }} />
        
        {/* Text — fades in after binary */}
        <div className="wrap" style={{
          position: 'relative', zIndex: 3, textAlign: 'center', maxWidth: '1000px', margin: '0 auto',
          opacity: heroReady ? 1 : 0, transform: heroReady ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 1.4s ease 0.4s, transform 1.4s ease 0.4s'
        }}>
          <div style={{ fontSize: '13px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '32px', color: '#fff', opacity: 0.8 }}>
            Welcome to the future of utility
          </div>
          <h1 style={{ fontSize: 'clamp(48px, 6vw, 90px)', fontWeight: 200, letterSpacing: '0.12em', lineHeight: 1.15, color: '#fff', textTransform: 'uppercase', marginBottom: '32px' }}>
            YOUR DIGITAL<br/>COMMAND CENTER
          </h1>
          <p style={{ fontSize: '16px', fontWeight: 300, letterSpacing: '0.05em', color: '#ccc', maxWidth: '600px', margin: '0 auto', lineHeight: 1.8 }}>
            Securing critical utility infrastructure across Karnataka through robust Cybersecurity Frameworks, an integrated IT/OT SOC Center, and scalable architectures.
          </p>
        </div>
      </section>

      {/* 2. VISION SECTION (Dark Theme) */}
      <section style={{ background: '#0a0a0a', color: '#fff', padding: '120px 0' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div className="reveal-left" style={{ paddingLeft: '40px' }}>
              <div style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888', marginBottom: '40px', borderLeft: '1px solid #333', paddingLeft: '20px' }}>
                OUR EXPERTISE
              </div>
              <h2 style={{ fontSize: '32px', fontWeight: 300, lineHeight: 1.4, color: '#fff', marginBottom: '24px' }}>
                We establish mission-critical, highly secure digital foundations tailored for governments and large-scale enterprises.
              </h2>
              <p style={{ fontSize: '15px', color: '#999', lineHeight: 1.8, maxWidth: '400px' }}>
                By seamlessly merging advanced network topologies, resilient cloud platforms, and precision geospatial insights, Vishvin Technologies empowers modern infrastructure and smart city ecosystems with flawless operational capabilities.
              </p>
            </div>
            <div className="reveal-right">
              <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80" alt="Advanced Cyber Security and Smart City Infrastructure" style={{ width: '100%', height: 'auto', borderRadius: '4px', filter: 'brightness(0.8)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION (Alternating Rows) */}
      <section style={{ background: 'var(--bg-primary)', padding: '160px 0' }} id="services">
        <div className="wrap">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '120px' }}>
            <div style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px', display: 'inline-block', borderLeft: '1px solid var(--border-medium)', paddingLeft: '16px' }}>
              SERVICES
            </div>
            <h2 style={{ fontSize: '40px', fontWeight: 300, letterSpacing: '0.05em' }}>
              We deliver exceptional products and services around the state.
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '120px', maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
            {services.map((svc, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
                  {/* TEXT */}
                  <div className={isEven ? "reveal-left" : "reveal-right"} style={{ order: isEven ? 1 : 2 }}>
                    <h3 style={{ fontSize: '28px', fontWeight: 400, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '24px', lineHeight: 1.3 }}>
                      {svc.title}
                    </h3>
                    <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '40px', maxWidth: '500px' }}>
                      {svc.desc}
                    </p>
                    <Link to={`/services/${svc.id}`} style={{ 
                      display: 'inline-flex', alignItems: 'center', gap: '12px', 
                      fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', 
                      border: '1px solid var(--border-medium)', padding: '12px 24px', 
                      borderRadius: '40px', color: 'var(--text-main)', transition: 'all 0.3s'
                    }} onMouseOver={e => e.currentTarget.style.borderColor = 'var(--text-main)'} onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border-medium)'}>
                      Read More <ArrowRight size={14} />
                    </Link>
                  </div>
                  {/* IMAGE */}
                  <div className={isEven ? "reveal-right" : "reveal-left"} style={{ order: isEven ? 2 : 1, textAlign: isEven ? 'right' : 'left' }}>
                    <img src={svc.bg} alt={svc.title} style={{ width: '100%', maxWidth: '500px', aspectRatio: '4/3', objectFit: 'cover', borderRadius: '12px', boxShadow: 'var(--shadow-lg)' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. THE SYSTEM (Full width img + left card) */}
      <section style={{ 
        position: 'relative', height: '80vh', minHeight: '600px', 
        backgroundImage: 'url(https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2000&q=80)',
        backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed',
        display: 'flex', alignItems: 'center'
      }}>
        <div className="wrap" style={{ width: '100%' }}>
          <div style={{ 
            background: '#0a0a0a', color: '#fff', padding: '60px 50px', 
            maxWidth: '460px', borderRadius: '4px', borderLeft: '1px solid rgba(255,255,255,0.2)' 
          }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#888', marginBottom: '24px' }}>
              CERTIFIED EXCELLENCE
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: 300, lineHeight: 1.3, marginBottom: '24px', color: '#fff' }}>
              Setting the benchmark for secure digital infrastructure.
            </h2>
            <p style={{ fontSize: '14px', color: '#999', lineHeight: 1.8, marginBottom: '40px' }}>
              Operating at the highest levels of compliance and process-driven engineering, we leverage our ISO 9001, 27001, and CMMI Level 3 certifications to build robust and scalable systems for government domains.
            </p>
            <Link to="/about" style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '12px', 
              fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', 
              border: '1px solid #444', padding: '12px 24px', 
              borderRadius: '40px', color: '#fff', transition: 'all 0.3s'
            }} onMouseOver={e => e.currentTarget.style.borderColor = '#fff'} onMouseOut={e => e.currentTarget.style.borderColor = '#444'}>
              Read More <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. METRICS / NUMBERS SECTION */}
      <section style={{ background: 'var(--bg-primary)', padding: '120px 0' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div className="reveal-left">
              <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80" alt="Tech Engine" style={{ width: '100%', borderRadius: '4px' }} />
            </div>
            <div className="reveal-right" style={{ padding: '0 40px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 300, color: 'var(--text-secondary)', marginBottom: '60px' }}>
                Our Strength
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                {stats.map((stat, i) => (
                  <div key={i} style={{ borderBottom: '1px solid var(--border-medium)', paddingBottom: '20px' }}>
                    <div style={{ fontSize: '40px', fontWeight: 300, color: 'var(--text-main)', marginBottom: '8px' }}>
                      {stat.num}
                    </div>
                    <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INDUSTRY PARTNERS SECTION */}
      <section style={{ background: '#050505', padding: '120px 0', overflow: 'hidden' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '80px', alignItems: 'center' }}>
            <div className="reveal-left">
              <div style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#666', marginBottom: '24px', borderLeft: '1px solid #333', paddingLeft: '16px' }}>
                INDUSTRY
              </div>
              <h2 style={{ fontSize: '32px', fontWeight: 300, color: '#fff', marginBottom: '24px', lineHeight: 1.2 }}>
                Co-<br/>Partners
              </h2>
              <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.8, maxWidth: '280px' }}>
                Established as a preferred partner for bolstering digital growth across state utilities. See all the organizations who trust the "Vishvin" standard.
              </p>
            </div>
            
            <style>
              {`
                @keyframes marqueeScroll {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .marquee-track:hover {
                  animation-play-state: paused;
                }
              `}
            </style>
            
            <div style={{ 
              overflow: 'hidden', 
              width: '100%', 
              position: 'relative',
              maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
            }}>
              <div 
                className="marquee-track"
                style={{ 
                  display: 'flex', 
                  gap: '48px', 
                  width: 'max-content',
                  animation: 'marqueeScroll 40s linear infinite',
                  padding: '20px 0' // extra padding for hover scale
                }}
              >
                {[...clients, ...clients].map((c, i) => (
                  <div key={i} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '140px', flexShrink: 0 }}>
                    <div style={{ 
                      background: '#fff', borderRadius: '50%', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', 
                      width: '140px', height: '140px', transition: 'all 0.3s',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      overflow: 'hidden'
                    }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1) translateY(-8px)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1) translateY(0)'}>
                      <img src={c.src} alt={c.name} style={{ width: '85%', height: '85%', objectFit: 'contain' }} />
                    </div>
                    <div style={{ fontSize: '11px', color: '#aaa', marginTop: '20px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{c.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>



    </div>
  );
}
