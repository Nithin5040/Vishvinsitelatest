import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Import local assets
import heroVideo from '../assets/Video Project 2.mp4';
import datacenterImg from '../assets/datacenter-server.jpg';
import homeItInfraImg from '../assets/services/home-it-infra.jpg';
import homeCloudIotImg from '../assets/services/home-cloud-iot.jpg';
import amiNewImg from '../assets/services/ami-new.jpg';
import droneGeospatialImg from '../assets/services/drone-geospatial.png';
import meteringBillingHomeImg from '../assets/services/metering-billing-home.jpg';
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
      desc: (
        <>
          We design, implement, and integrate <strong style={{ color: 'var(--text-main)', fontWeight: 600 }}>secure and resilient LAN/WAN, optical fiber, structured cabling, virtualization, and data centre infrastructure</strong> for government and enterprise environments. Our solutions are designed to deliver <strong style={{ color: 'var(--text-main)', fontWeight: 600 }}>high availability, scalability, network segmentation, and secure connectivity</strong>, while supporting the evolving operational and business requirements of our clients. We integrate network infrastructure with appropriate security controls and monitoring capabilities to provide a reliable foundation for <strong style={{ color: 'var(--text-main)', fontWeight: 600 }}>mission-critical applications and services</strong>.
        </>
      ),
      bg: homeItInfraImg
    },
    {
      id: 'smart-poles',
      title: 'Cloud-Based IoT Solutions',
      desc: 'Harnessing the power of Azure IoT and cloud technologies to securely connect field assets, SCADA systems, and enterprise applications. We convert real-time operational data into intelligent dashboards, advanced analytics, asset-performance insights, and predictive maintenance alerts. Our scalable architecture helps utilities enhance visibility across distributed infrastructure, optimize asset utilization, reduce operational costs, and enable proactive decision-making.',
      bg: homeCloudIotImg
    },
    {
      id: 'metering-billing',
      title: 'IT-Enabled Metering & Billing Systems',
      desc: 'Implementing end-to-end IT-enabled metering solutions for efficient and accurate energy management. Our services include the replacement of existing Electromagnetic, DC and MNR energy meters (1-Phase & 3-Phase) with new-generation Static Energy Meters, followed by systematic meter reading, data capture, validation, and processing. We enable accurate and timely energy bill generation and distribution, supported by digital workflows and centralized data management. This integrated approach improves metering accuracy, minimizes billing discrepancies, enhances revenue assurance, and provides utilities with reliable consumption data for effective energy management and customer service.',
      bg: meteringBillingHomeImg
    },
    {
      id: 'drone',
      title: 'Drone & Geospatial Analytics',
      desc: 'Delivering advanced aerial inspection, utility mapping, LiDAR-based surveys, and geospatial analytics using state-of-the-art Unmanned Aerial Systems (UAS). Our solutions enable high-resolution assessment of transmission lines, towers, substations, and other critical utility assets, supported by automated image processing and AI-enabled anomaly detection. By transforming aerial survey data into actionable insights and digital asset models, we help utilities identify structural defects, vegetation encroachments, and potential asset vulnerabilities, improving safety, reducing inspection time, and enabling proactive maintenance and informed asset management.',
      bg: droneGeospatialImg
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

  const [introDone, setIntroDone] = useState(false);
  const introCanvasRef = useRef(null);

  // ─── FORMAL & PROFESSIONAL ENTERPRISE BINARY INTRO ───────────────────────────
  useEffect(() => {
    const canvas = introCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const resize = () => {
      if (!canvas) return;
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    const startTime = performance.now();
    const TOTAL_INTRO_MS = 1150; // Clean, formal, fast 1.15s intro
    let isSkipped = false;

    const handleSkip = () => {
      if (!isSkipped && !introDone) {
        isSkipped = true;
        setIntroDone(true);
      }
    };
    window.addEventListener('click', handleSkip);
    window.addEventListener('keydown', handleSkip);

    // Setup Clean Binary Columns
    const FONT_SIZE = 13;
    const colSpacing = 28;
    const numCols = Math.floor(W / colSpacing);

    const cols = Array.from({ length: numCols }, (_, i) => ({
      x: i * colSpacing + colSpacing / 2,
      y: Math.random() * H,
      speed: 8 + Math.random() * 8, // Smooth, moderate data flow
      len: Math.floor(12 + Math.random() * 16),
      chars: Array.from({ length: 30 }, () => (Math.random() > 0.5 ? '1' : '0')),
      alpha: 0.12 + Math.random() * 0.22,
    }));

    const render = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / TOTAL_INTRO_MS, 1);
      const CX = W / 2;
      const CY = H / 2;

      // ── Clean Deep Obsidian Background ──
      ctx.fillStyle = '#060a12';
      ctx.fillRect(0, 0, W, H);

      // ── Subtle Binary Rain Columns ──
      ctx.font = `500 ${FONT_SIZE}px 'JetBrains Mono', monospace`;
      ctx.textAlign = 'center';

      cols.forEach((col) => {
        col.y += col.speed;
        if (col.y > H + col.len * FONT_SIZE) {
          col.y = -col.len * FONT_SIZE;
        }

        if (Math.random() < 0.05) {
          const idx = Math.floor(Math.random() * col.chars.length);
          col.chars[idx] = Math.random() > 0.5 ? '1' : '0';
        }

        for (let i = 0; i < col.len; i++) {
          const charY = col.y - i * FONT_SIZE;
          if (charY < -FONT_SIZE || charY > H + FONT_SIZE) continue;

          const t = i / col.len;
          const char = col.chars[i % col.chars.length];

          if (i === 0) {
            // Crisp lead digit
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.shadowColor = '#38bdf8';
            ctx.shadowBlur = 6;
          } else {
            ctx.shadowBlur = 0;
            const fade = (1 - t) * col.alpha;
            ctx.fillStyle = `rgba(147, 197, 253, ${fade})`;
          }

          ctx.fillText(char, col.x, charY);
        }
      });
      ctx.shadowBlur = 0;

      // ── Minimalist Corporate Identity in Center ──
      const brandFade = Math.min(elapsed / 400, 1);
      ctx.save();
      ctx.globalAlpha = brandFade;

      // Subtle center ambient glow
      const glowR = Math.min(W, H) * 0.28;
      const radGrd = ctx.createRadialGradient(CX, CY, 0, CX, CY, glowR);
      radGrd.addColorStop(0, 'rgba(37, 99, 235, 0.14)');
      radGrd.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radGrd;
      ctx.beginPath();
      ctx.arc(CX, CY, glowR, 0, Math.PI * 2);
      ctx.fill();

      // Brand Title
      ctx.font = `600 22px 'Plus Jakarta Sans', sans-serif`;
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '6px';
      ctx.fillText('V I S H V I N', CX, CY - 12);

      // Elegant Expanding Divider
      const lineLen = Math.min((elapsed / 600) * 160, 160);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(CX - lineLen / 2, CY + 4);
      ctx.lineTo(CX + lineLen / 2, CY + 4);
      ctx.stroke();

      // Sub-label
      ctx.font = `600 10px 'JetBrains Mono', monospace`;
      ctx.fillStyle = 'rgba(147, 197, 253, 0.85)';
      ctx.letterSpacing = '3px';
      ctx.fillText('SECURE DIGITAL INFRASTRUCTURE', CX, CY + 24);

      ctx.restore();

      // ── Clean Optical Scanline Sweep ──
      const scanY = (progress * (H + 100)) - 50;
      const scanGrd = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 2);
      scanGrd.addColorStop(0, 'rgba(56, 189, 248, 0)');
      scanGrd.addColorStop(1, 'rgba(56, 189, 248, 0.22)');
      ctx.fillStyle = scanGrd;
      ctx.fillRect(0, scanY - 30, W, 32);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(W, scanY);
      ctx.stroke();

      // Check Completion
      if (elapsed < TOTAL_INTRO_MS && !isSkipped) {
        animId = requestAnimationFrame(render);
      } else {
        setIntroDone(true);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', handleSkip);
      window.removeEventListener('keydown', handleSkip);
    };
  }, [introDone]);

  return (
    <div style={{ background: 'var(--bg-primary)' }}>

      {/* 1. HERO SECTION */}
      <section style={{
        position: 'relative', height: '90vh', minHeight: '620px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', overflow: 'hidden', background: '#020617'
      }}>
        {/* Formal Binary Intro Canvas — Fades out smoothly after 1.1s to reveal video */}
        <canvas
          ref={introCanvasRef}
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            zIndex: 4, pointerEvents: introDone ? 'none' : 'auto',
            opacity: introDone ? 0 : 1,
            transition: 'opacity 0.7s ease',
            cursor: introDone ? 'default' : 'pointer'
          }}
          title={!introDone ? 'Click to Skip' : undefined}
        />

        {/* Hero Video — Plays smoothly under the intro and reveals when binary completes */}
        <video
          autoPlay loop muted playsInline
          src={heroVideo}
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            objectFit: 'cover', zIndex: 0,
            opacity: introDone ? 0.85 : 0,
            transform: introDone ? 'scale(1)' : 'scale(1.04)',
            transition: 'opacity 1.0s ease, transform 1.2s ease',
          }}
        />

        {/* Cinematic Contrast Overlay */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          background: 'radial-gradient(ellipse at center, rgba(2,6,23,0.3) 0%, rgba(2,6,23,0.88) 100%)',
          zIndex: 1,
          opacity: introDone ? 1 : 0,
          transition: 'opacity 1.0s ease',
        }} />

        {/* Hero Content — Smoothly emerges after binary intro */}
        <div className="wrap" style={{
          position: 'relative', zIndex: 3, textAlign: 'center', maxWidth: '1100px', margin: '0 auto',
          padding: '0 24px',
          opacity: introDone ? 1 : 0,
          transform: introDone ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s'
        }}>
          {/* Formal Executive Status Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.07)',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            padding: '7px 20px', borderRadius: '9999px', marginBottom: '28px',
            backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)'
          }}>
            <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em',
              color: '#f1f5f9', textTransform: 'uppercase'
            }}>
              SECURE CRITICAL INFRASTRUCTURE
            </span>
          </div>

          {/* Grand Heading */}
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15,
            color: '#fff', textTransform: 'uppercase', marginBottom: '24px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            textShadow: '0 4px 30px rgba(0, 0, 0, 0.8)'
          }}>
            YOUR SECURE DIGITAL<br />
            <span style={{
              background: 'linear-gradient(135deg, #ffffff 20%, #93c5fd 65%, #38bdf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>
              INFRASTRUCTURE PARTNER
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="hero-subtitle"
            style={{
              fontSize: 'clamp(12px, 1.12vw, 15px)', fontWeight: 400, letterSpacing: '0.03em',
              color: '#cbd5e1', width: '100%', maxWidth: '1100px', margin: '0 auto 36px', lineHeight: 1.6,
              fontFamily: "'Inter', sans-serif", textAlign: 'center'
            }}
          >
            IT/OT Cybersecurity &nbsp;|&nbsp; Security Operations Center (SOC) &nbsp;|&nbsp; Zero Trust Architecture &nbsp;|&nbsp; Resilient Network Infrastructure
          </p>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a
              href="#services"
              className="btn btn-primary btn-lg"
              style={{
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                boxShadow: '0 4px 25px rgba(37, 99, 235, 0.45)',
                border: '1px solid rgba(255,255,255,0.15)',
                fontWeight: 600, letterSpacing: '0.02em',
                padding: '16px 36px'
              }}
            >
              Explore Solutions <ArrowRight size={16} />
            </a>
            <Link
              to="/contact"
              className="btn btn-ghost btn-lg"
              style={{
                color: '#fff', borderColor: 'rgba(255,255,255,0.25)',
                background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)',
                padding: '16px 36px'
              }}
              onMouseOver={e => {
                e.currentTarget.style.borderColor = '#fff';
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
              }}
            >
              Contact Operations
            </Link>
          </div>
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
                We build secure, resilient, and mission-critical digital infrastructure for governments, power utilities, and large enterprises.
              </h2>
              <p style={{ fontSize: '15px', color: '#a1a1aa', lineHeight: 1.85, maxWidth: '540px', textAlign: 'justify', textJustify: 'inter-word' }}>
                Vishvin Technologies delivers end-to-end solutions across <span style={{ color: '#fff', fontWeight: 500 }}>IT infrastructure, cybersecurity, IT/OT security, resilient network architecture, and digital infrastructure services</span>, enabling organizations to securely operate, connect, and protect their critical systems. With proven experience across the <span style={{ color: '#fff', fontWeight: 500 }}>power and critical infrastructure sectors</span>, we help our clients strengthen operational resilience, enhance cybersecurity, and build future-ready digital environments.
              </p>
            </div>
            <div className="reveal-right">
              <img src={datacenterImg} alt="Mission-Critical Secure Digital Infrastructure and Power Utilities" style={{ width: '100%', height: 'auto', maxHeight: '520px', objectFit: 'cover', borderRadius: '8px', filter: 'brightness(0.95)', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.5)' }} />
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
                    <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '40px', maxWidth: '520px', textAlign: 'justify', textJustify: 'inter-word' }}>
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
            <p style={{ fontSize: '14px', color: '#999', lineHeight: 1.8, marginBottom: '40px', textAlign: 'justify', textJustify: 'inter-word' }}>
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
                Co-<br />Partners
              </h2>
              <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.8, maxWidth: '280px', textAlign: 'justify', textJustify: 'inter-word' }}>
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
