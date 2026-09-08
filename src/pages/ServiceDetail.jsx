import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Activity, Shield, Zap, Server, Database, Layers, Target, CheckCircle2, Cpu, Globe, Check, Radio, Signal, Radar, Library, ShieldAlert, Wrench } from 'lucide-react';

import smartPolesNew1Img from '../assets/services/smart-poles-new-1.jpg';
import amiBlueImg from '../assets/services/ami-blue.jpg';
import amiNewImg from '../assets/services/ami-new.jpg';
import amrNewImg from '../assets/services/amr-new.jpg';
import damVideo from '../assets/dam-footage.mp4';
import dronePowerlineImg from '../assets/services/drone-powerline.jpg';
import droneDamImg from '../assets/services/drone-geospatial.png';
import droneWindmillImg from '../assets/services/drone-windmill.jpg';
import droneSolarImg from '../assets/services/drone-solar.jpg';
import itInfraImg from '../assets/services/it-infra.jpg';
import digitalLibraryNewImg from '../assets/services/digital-library-new.jpg';
import vmsImg from '../assets/services/vms.jpg';
import meterInstallationImg from '../assets/services/meter-installation.jpg';
import amiDiagramImg from '../assets/services/ami-diagram.jpg';

const serviceOrder = [
  { id: 'smart-poles', name: 'Smart Street Poles', tag: 'Smart City / IoT' },
  { id: 'ami', name: 'AMI (Advanced Metering)', tag: 'Metering Systems' },
  { id: 'amr', name: 'AMR (Automatic Meter Read)', tag: 'Automation' },
  { id: 'metering-billing', name: 'IT-Enabled Metering & Billing Systems', tag: 'Metering & Billing' },
  { id: 'drone', name: 'Drone-Based Inspection', tag: 'Aerial Analytics' },
  { id: 'it-infra', name: 'IT Infrastructure Integration', tag: 'Systems & Networks' },
  { id: 'digital-library', name: 'Digital Library Solutions', tag: 'Cloud Content' },
  { id: 'vms', name: 'Vigilance Metering (VMS)', tag: 'Audit & Monitoring' },
  { id: 'meter-installation', name: 'Meter Supply & Installation', tag: 'Field Operations' },
];

const DashboardLayout = ({ title, tag, image, video, children, rightTitle, rightSubtitle, currentId, specs = [] }) => {
  const navigate = useNavigate();
  const currentIndex = serviceOrder.findIndex(s => s.id === currentId);
  const nextService = serviceOrder[(currentIndex + 1) % serviceOrder.length];

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* ── HERO HEADER ── */}
      <section style={{ position: 'relative', height: '65vh', minHeight: '520px', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
        {video ? (
          <video src={video} autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <img src={image} alt={title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
        {/* Focused Gradient Overlays (Top for back button, Bottom for title text, center completely clear for video) */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '180px', background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '260px', background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)', pointerEvents: 'none' }} />
        
        {/* Navigation Bar / Back */}
        <div style={{ position: 'absolute', top: '100px', left: 0, width: '100%', zIndex: 10 }}>
          <div className="wrap">
            <button 
              onClick={() => navigate('/services')} 
              style={{ 
                display: 'inline-flex', alignItems: 'center', gap: '10px', 
                background: 'rgba(0,0,0,0.6)', color: '#fff', 
                border: '1px solid rgba(255,255,255,0.25)', padding: '10px 20px', 
                borderRadius: '40px', cursor: 'pointer', transition: 'all 0.3s',
                fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
              }}
              onMouseOver={e => { e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.background = 'rgba(0,0,0,0.6)'; e.currentTarget.style.color = '#fff'; }}
            >
              <ArrowLeft size={14} /> Back to Services
            </button>
          </div>
        </div>

        {/* Hero Title */}
        <div className="wrap" style={{ position: 'relative', zIndex: 5, paddingBottom: '70px', width: '100%' }}>
          <div className="reveal" style={{ fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)', marginBottom: '16px', borderLeft: '1px solid rgba(255,255,255,0.5)', paddingLeft: '16px', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
            {tag}
          </div>
          <h1 className="reveal" style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 200, color: '#fff', lineHeight: 1.15, letterSpacing: '0.05em', textTransform: 'uppercase', maxWidth: '900px', textShadow: '0 4px 24px rgba(0,0,0,0.8)' }}>
            {title}
          </h1>
        </div>
      </section>

      {/* ── MAIN CONTENT (Split Layout) ── */}
      <section style={{ flex: 1, padding: '120px 0', background: 'var(--bg-secondary)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: '80px', alignItems: 'start' }}>
            
            {/* LEFT SIDEBAR: Specs & Quick Action */}
            <div style={{ position: 'sticky', top: '120px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div style={{ background: 'var(--bg-primary)', padding: '36px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '24px', borderLeft: '1px solid var(--border-medium)', paddingLeft: '12px' }}>
                  SPECIFICATIONS
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {[
                    { label: 'Category', value: tag },
                    { label: 'Standards', value: 'ISO 9001 / 27001 / CMMI' },
                    { label: 'Deployment', value: 'Enterprise & State Grids' },
                    ...specs
                  ].map((s, idx) => (
                    <div key={idx} style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '14px' }}>
                      <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: '4px' }}>{s.label}</div>
                      <div style={{ fontSize: '13px', color: 'var(--text-main)', fontWeight: 400 }}>{s.value}</div>
                    </div>
                  ))}
                </div>

                <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', marginTop: '32px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', border: '1px solid var(--text-main)', padding: '14px 20px', borderRadius: '40px', color: 'var(--bg-primary)', background: 'var(--text-main)', transition: 'all 0.3s' }}>
                  Request Consultation <ArrowRight size={14} />
                </Link>
              </div>

              <div style={{ padding: '24px 32px', border: '1px solid var(--border-light)', borderRadius: '8px', background: 'var(--bg-primary)' }}>
                <div style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>SUPPORT SLA</div>
                <div style={{ fontSize: '20px', fontWeight: 300, color: 'var(--text-main)' }}>24 / 7 Monitoring</div>
              </div>
            </div>

            {/* RIGHT SIDE: Main Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
              <div className="reveal">
                <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 200, marginBottom: '20px', color: 'var(--text-main)', letterSpacing: '0.05em', textTransform: 'uppercase', lineHeight: 1.25 }}>
                  {rightTitle}
                </h2>
                <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.8, fontWeight: 300, maxWidth: '800px', margin: 0 }}>
                  {rightSubtitle}
                </p>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                {children}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── BOTTOM NEXT SERVICE FOOTER ── */}
      <section style={{ padding: '80px 0', background: '#050505', color: '#fff', borderTop: '1px solid #1a1a1a' }}>
        <div className="wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '32px' }}>
            <div>
              <div style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#666', marginBottom: '8px' }}>
                NEXT SERVICE VERTICAL
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 300, letterSpacing: '0.05em', textTransform: 'uppercase', margin: 0 }}>
                {nextService.name}
              </h3>
            </div>
            
            <Link 
              to={`/services/${nextService.id}`} 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', border: '1px solid #fff', padding: '14px 32px', borderRadius: '40px', color: '#050505', background: '#fff', transition: 'all 0.3s' }}
            >
              Explore Next <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

const SpecGrid = ({ title, items }) => (
  <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '40px' }}>
    <h4 style={{ margin: '0 0 24px', fontSize: '14px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--text-main)' }}>{title}</h4>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '16px', border: '1px solid var(--border-light)', borderRadius: '6px' }}>
          <div style={{ color: 'var(--text-main)', marginTop: '2px' }}><Check size={16} strokeWidth={2} /></div>
          <span style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5, fontWeight: 300 }}>{item}</span>
        </div>
      ))}
    </div>
  </div>
);

// 1. Smart Poles
const SmartPoles = () => (
  <DashboardLayout 
    currentId="smart-poles"
    title="Smart Poles" 
    tag="SMART CITY / IOT" 
    image={smartPolesNew1Img}
    rightTitle="Integrated Urban Lighting & IoT Nodes"
    rightSubtitle="Smart poles are multi-functional civic assets that modernize public lighting while serving as unified connectivity backbones for municipal WiFi, CCTV cameras, EV chargers, and automated environmental sensors."
    specs={[
      { label: 'Protocols', value: 'MQTT, LoRaWAN, Cellular 4G/5G' },
      { label: 'Enclosure', value: 'IP66 Weather-Proof Die Cast' }
    ]}
  >
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
      <div style={{ background: 'var(--bg-primary)', padding: '36px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
        <div style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>ARRAY 01</div>
        <h4 style={{ fontSize: '18px', fontWeight: 400, textTransform: 'uppercase', marginBottom: '16px', color: 'var(--text-main)' }}>Sensory Array</h4>
        <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 300 }}>
          <li>• Environmental Noise Sensor</li>
          <li>• Particulate Air Pollution Detector</li>
          <li>• Ambient Temp & Humidity Sensor</li>
          <li>• Dual-drive Brightness Calibrator</li>
        </ul>
      </div>
      <div style={{ background: 'var(--bg-primary)', padding: '36px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
        <div style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>ARRAY 02</div>
        <h4 style={{ fontSize: '18px', fontWeight: 400, textTransform: 'uppercase', marginBottom: '16px', color: 'var(--text-main)' }}>Surveillance & Security</h4>
        <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 300 }}>
          <li>• 360° Panoramic Security Monitoring</li>
          <li>• High-definition Vehicle ANPR</li>
          <li>• Pedestrian Flow Density Analytics</li>
          <li>• One-touch Emergency SOS Intercom</li>
        </ul>
      </div>
      <div style={{ background: 'var(--bg-primary)', padding: '36px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
        <div style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>ARRAY 03</div>
        <h4 style={{ fontSize: '18px', fontWeight: 400, textTransform: 'uppercase', marginBottom: '16px', color: 'var(--text-main)' }}>Connectivity & EV</h4>
        <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 300 }}>
          <li>• 5G Micro-Cell Base Station Ready</li>
          <li>• Public Dual-band WiFi Access Point</li>
          <li>• Programmable Digital LED Displays</li>
          <li>• Integrated Base EV Fast Charging</li>
        </ul>
      </div>
    </div>
    
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      <div style={{ background: 'var(--bg-primary)', padding: '40px', borderRadius: '8px', border: '1px solid var(--border-light)', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid var(--border-medium)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)', flexShrink: 0 }}>
          <Zap size={22} strokeWidth={1.5} />
        </div>
        <div>
          <h4 style={{ fontSize: '18px', fontWeight: 400, marginBottom: '12px', color: 'var(--text-main)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Adaptive Illumination</h4>
          <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.8, fontSize: '14px', fontWeight: 300 }}>Intelligent dimming profiles adjust lighting in real-time based on pedestrian presence, reducing municipal grid power consumption by up to 60%.</p>
        </div>
      </div>
      <div style={{ background: 'var(--bg-primary)', padding: '40px', borderRadius: '8px', border: '1px solid var(--border-light)', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid var(--border-medium)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)', flexShrink: 0 }}>
          <Shield size={22} strokeWidth={1.5} />
        </div>
        <div>
          <h4 style={{ fontSize: '18px', fontWeight: 400, marginBottom: '12px', color: 'var(--text-main)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Tamper-Proof & Resilient</h4>
          <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.8, fontSize: '14px', fontWeight: 300 }}>Constructed with anti-corrosive aerospace alloys requiring minimal physical maintenance, backed by centralized remote diagnostics.</p>
        </div>
      </div>
    </div>
  </DashboardLayout>
);

// 2. AMI
const AMI = () => (
  <DashboardLayout 
    currentId="ami"
    title="Advanced Metering Infrastructure" 
    tag="METERING SYSTEMS" 
    image={amiBlueImg}
    rightTitle="HES (MDAS) & Centralized MDM Systems"
    rightSubtitle="End-to-end AMI solutions designed to suit high-density Energy, Water, and Gas distributions. Optimize utility demand-side planning and outage remediation through systemic hardware integration."
    specs={[
      { label: 'Architecture', value: 'Bi-directional RF Mesh / Cellular' },
      { label: 'Compatibility', value: 'DLMS/COSEM, ANSI C12.19' }
    ]}
  >
    <div style={{ background: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-light)', overflow: 'hidden' }}>
      <img src={amiNewImg} alt="Smart Meters" style={{ width: '100%', height: '360px', objectFit: 'cover' }} />
      <div style={{ padding: '40px' }}>
        <div style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>CORE PLATFORM</div>
        <h4 style={{ fontSize: '20px', fontWeight: 300, marginBottom: '16px', color: 'var(--text-main)', textTransform: 'uppercase' }}>Head End System (HES) Automation</h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', margin: 0, lineHeight: 1.8, fontWeight: 300 }}>Our Head End System acquires meter telemetries automatically without human dispatch. It enforces data authenticity via CRC checksums, time-synchronization checks, and pulse overflow validations.</p>
      </div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      <div style={{ background: 'var(--bg-primary)', padding: '40px', borderRadius: '8px', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid var(--border-medium)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)' }}>
          <Activity size={22} strokeWidth={1.5} />
        </div>
        <h4 style={{ fontSize: '18px', fontWeight: 400, margin: 0, color: 'var(--text-main)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Real-Time Data Harvest</h4>
        <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.8, fontSize: '14px', fontWeight: 300 }}>Periodically acquires telemetry from all consumer endpoints, processing instant tamper alarms and execution of remote connect/disconnect commands.</p>
      </div>
      <div style={{ background: 'var(--bg-primary)', padding: '40px', borderRadius: '8px', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid var(--border-medium)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)' }}>
          <Database size={22} strokeWidth={1.5} />
        </div>
        <h4 style={{ fontSize: '18px', fontWeight: 400, margin: 0, color: 'var(--text-main)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Meter Data Management</h4>
        <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.8, fontSize: '14px', fontWeight: 300 }}>Enterprise central repository supporting high-throughput storage, historical archiving, and automated bill-determinant validation algorithms.</p>
      </div>
    </div>
  </DashboardLayout>
);

// 3. AMR
const AMR = () => (
  <DashboardLayout 
    currentId="amr"
    title="Automatic Meter Reading" 
    tag="AUTOMATION SYSTEMS" 
    image={amrNewImg}
    rightTitle="Automated Log Collection & Revenue Optimization"
    rightSubtitle="Securely collect consumption metrics, diagnostics, and status signals from utility devices across entire districts, synchronizing telemetry straight to billing databases."
  >
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
      <div style={{ background: 'var(--bg-primary)', padding: '40px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
        <div style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>MANAGEMENT BENEFITS</div>
        <h4 style={{ fontSize: '18px', fontWeight: 400, textTransform: 'uppercase', marginBottom: '24px', color: 'var(--text-main)' }}>Operational Value</h4>
        <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 300 }}>
          <li style={{ display: 'flex', gap: '12px' }}><Check size={16} color="var(--text-main)" style={{ flexShrink: 0, marginTop: '3px' }} /> Minimizes physical field dispatches, ensuring staff safety in hazardous environments.</li>
          <li style={{ display: 'flex', gap: '12px' }}><Check size={16} color="var(--text-main)" style={{ flexShrink: 0, marginTop: '3px' }} /> Actively monitors for line bypasses, magnetic tampering, and energy theft.</li>
          <li style={{ display: 'flex', gap: '12px' }}><Check size={16} color="var(--text-main)" style={{ flexShrink: 0, marginTop: '3px' }} /> Lowers recurring operational overhead and eliminates manual transcription errors.</li>
          <li style={{ display: 'flex', gap: '12px' }}><Check size={16} color="var(--text-main)" style={{ flexShrink: 0, marginTop: '3px' }} /> Increases monthly cash flow through automated on-time billing cycles.</li>
        </ul>
      </div>
      
      <div style={{ background: 'var(--bg-primary)', padding: '40px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
        <div style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>CONSUMER BENEFITS</div>
        <h4 style={{ fontSize: '18px', fontWeight: 400, textTransform: 'uppercase', marginBottom: '24px', color: 'var(--text-main)' }}>Consumer Experience</h4>
        <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 300 }}>
          <li style={{ display: 'flex', gap: '12px' }}><Check size={16} color="var(--text-main)" style={{ flexShrink: 0, marginTop: '3px' }} /> Eliminates estimated bills and subsequent billing dispute delays.</li>
          <li style={{ display: 'flex', gap: '12px' }}><Check size={16} color="var(--text-main)" style={{ flexShrink: 0, marginTop: '3px' }} /> Fosters confidence through transparent, timestamped consumption logs.</li>
          <li style={{ display: 'flex', gap: '12px' }}><Check size={16} color="var(--text-main)" style={{ flexShrink: 0, marginTop: '3px' }} /> Empowers consumers with historical analytics to plan power efficiency.</li>
        </ul>
      </div>
    </div>
  </DashboardLayout>
);

// 4. Drone
const Drone = () => (
  <DashboardLayout 
    currentId="drone"
    title="Drone Based Services" 
    tag="AERIAL ANALYTICS" 
    video={damVideo}
    rightTitle="UAV Aerial Inspection & LiDAR Modeling"
    rightSubtitle="Deploying high-payload Unmanned Aerial Systems (UAS) to conduct precision surveys across transmission lines, state hydro dams, solar farms, and mountainous terrains."
    specs={[
      { label: 'Sensors', value: 'LiDAR, 4K RGB, Radiometric Thermal' },
      { label: 'Accuracy', value: 'Sub-centimeter GSD Georeferenced' }
    ]}
  >
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      <div style={{ background: 'var(--bg-primary)', padding: '40px', borderRadius: '8px', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid var(--border-medium)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)' }}>
          <Target size={22} strokeWidth={1.5} />
        </div>
        <h4 style={{ fontSize: '18px', fontWeight: 400, margin: 0, color: 'var(--text-main)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Aerial Survey & Inspection</h4>
        <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.8, fontSize: '14px', fontWeight: 300 }}>High-resolution diagnostic flights over EHV lines, hydro dams, wind turbines, and bridges without shutting down live power conduits.</p>
      </div>
      <div style={{ background: 'var(--bg-primary)', padding: '40px', borderRadius: '8px', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid var(--border-medium)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)' }}>
          <Cpu size={22} strokeWidth={1.5} />
        </div>
        <h4 style={{ fontSize: '18px', fontWeight: 400, margin: 0, color: 'var(--text-main)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>AI Thermal & Defect Detection</h4>
        <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.8, fontSize: '14px', fontWeight: 300 }}>Neural network processing models detect insulator hot-spots, micro-fractures, vegetation encroachment, and compute 3D volumetric earthworks.</p>
      </div>
    </div>

    <div>
      <div style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>DEPLOYMENT SECTORS</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {[ { name: 'EHV Powerline', img: dronePowerlineImg }, { name: 'Hydro Dams', img: droneDamImg }, { name: 'Wind Turbines', img: droneWindmillImg }, { name: 'Solar Arrays', img: droneSolarImg } ].map((card, i) => (
          <div key={i} style={{ height: '220px', position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-light)' }}>
            <img src={card.img} alt={card.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)', display: 'flex', alignItems: 'flex-end', padding: '20px' }}>
              <span style={{ fontSize: '14px', fontWeight: 400, color: '#fff', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{card.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </DashboardLayout>
);

// 5. IT Infra
const ITInfra = () => (
  <DashboardLayout 
    currentId="it-infra"
    title="IT Infrastructure Specialism" 
    tag="SYSTEMS & NETWORKS" 
    image={itInfraImg}
    rightTitle="Enterprise Networks & High-Availability Server Clusters"
    rightSubtitle="Architectural consulting, hardware procurement, and commissioning services modernizing mission-critical government infrastructure and data centers."
  >
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ background: 'var(--bg-primary)', padding: '40px', borderRadius: '8px', border: '1px solid var(--border-light)', display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid var(--border-medium)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)', flexShrink: 0 }}>
          <Layers size={22} strokeWidth={1.5} />
        </div>
        <div>
          <h4 style={{ fontSize: '18px', fontWeight: 400, marginBottom: '12px', color: 'var(--text-main)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Enterprise Network Architecture</h4>
          <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.8, fontSize: '14px', fontWeight: 300 }}>Structured cabling, core switching, optical fiber backbones, and software-defined WAN rollouts ensuring low latency.</p>
        </div>
      </div>
      
      <div style={{ background: 'var(--bg-primary)', padding: '40px', borderRadius: '8px', border: '1px solid var(--border-light)', display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid var(--border-medium)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)', flexShrink: 0 }}>
          <Server size={22} strokeWidth={1.5} />
        </div>
        <div>
          <h4 style={{ fontSize: '18px', fontWeight: 400, marginBottom: '12px', color: 'var(--text-main)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Virtualization & Cloud Clusters</h4>
          <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.8, fontSize: '14px', fontWeight: 300 }}>Deployment of hyper-converged compute nodes, cloud migrations, and automated enterprise storage replication for maximum uptime.</p>
        </div>
      </div>

      <div style={{ background: 'var(--bg-primary)', padding: '40px', borderRadius: '8px', border: '1px solid var(--border-light)', display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid var(--border-medium)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)', flexShrink: 0 }}>
          <Shield size={22} strokeWidth={1.5} />
        </div>
        <div>
          <h4 style={{ fontSize: '18px', fontWeight: 400, marginBottom: '12px', color: 'var(--text-main)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Facility Management Services (FMS)</h4>
          <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.8, fontSize: '14px', fontWeight: 300 }}>Dedicated engineering personnel on-premise managing ticketing queues, preventative hardware cycles, and round-the-clock uptime SLAs.</p>
        </div>
      </div>
    </div>
  </DashboardLayout>
);

// 6. Digital Library
const DigitalLibrary = () => (
  <DashboardLayout 
    currentId="digital-library"
    title="Digital Library" 
    tag="CLOUD CONTENT" 
    image={digitalLibraryNewImg}
    rightTitle="Enterprise e-Content & Archive System"
    rightSubtitle="Secure cloud-native digital repository solution engineered to index, preserve, and distribute institutional knowledge, research publications, and legal records."
  >
    <SpecGrid 
      title="Core System Capabilities" 
      items={[
        "Granular metadata indexing and full-text document search",
        "Supports multi-format preservation (PDF, Word, OCR text, Video)",
        "Role-based permission architecture with IP access control",
        "Integrated online payment gateways for fee-based articles",
        "Self-service digital submission and peer-review workflows",
        "Automated digital watermarking and document copyright protection"
      ]} 
    />
  </DashboardLayout>
);

// 7. VMS
const VMS = () => (
  <DashboardLayout 
    currentId="vms"
    title="Vigilance Metering System" 
    tag="AUDIT & MONITORING" 
    image={vmsImg}
    rightTitle="Zero-Defect Revenue Assurance"
    rightSubtitle="Web portal deployment and field inspection management guaranteeing spot verification, photographic audit records, and leak elimination in distribution zones."
  >
    <div style={{ background: 'var(--bg-primary)', padding: '40px', borderRadius: '8px', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <p style={{ color: 'var(--text-secondary)', fontSize: '15px', margin: 0, lineHeight: 1.8, fontWeight: 300 }}>
        Electricity distribution companies require strict vigilance checks to safeguard revenue. By pairing trained field inspectors with automated image-verification mobile software, utilities achieve verified spot audits and eliminate legacy billing loopholes.
      </p>
      <div style={{ padding: '24px 32px', background: 'var(--bg-secondary)', borderLeft: '1px solid var(--text-main)', borderRadius: '4px' }}>
        <div style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>REVENUE INTEGRATION</div>
        <p style={{ color: 'var(--text-main)', fontSize: '14px', margin: 0, lineHeight: 1.8, fontWeight: 300 }}>
          Direct native reconciliation with Revenue Management Systems (RMS) ensuring that inspection discrepancies are corrected before next bill cycles.
        </p>
      </div>
    </div>
  </DashboardLayout>
);

// 8. Meter Installation
const MeterInstallation = () => (
  <DashboardLayout 
    currentId="meter-installation"
    title="Meter Supply & Installation" 
    tag="FIELD OPERATIONS" 
    image={meterInstallationImg}
    rightTitle="Certified Field Replacement Task Force"
    rightSubtitle="State-wide deployment of certified engineers executing mass replacements of electromechanical meters with advanced electronic and static smart meters."
  >
    <div style={{ background: 'var(--bg-primary)', padding: '40px', borderRadius: '8px', border: '1px solid var(--border-light)', marginBottom: '40px' }}>
      <p style={{ color: 'var(--text-secondary)', fontSize: '15px', margin: 0, lineHeight: 1.8, fontWeight: 300 }}>
        Our field workforce handles turnkey physical migrations—from initial site survey and safe decommissioning of older induction meters to precision mounting, live testing, and digital provisioning.
      </p>
    </div>

    <div>
      <div style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '20px' }}>DEPLOYMENT PIPELINE</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {[
          { step: '01', title: 'Site Inspection', desc: 'Pre-replacement auditing of electrical panels and load verification.' },
          { step: '02', title: 'Smart Swap & Handshake', desc: 'Decommissioning old unit and executing digital serial-key binding.' },
          { step: '03', title: 'Telemetry Activation', desc: 'Confirming bi-directional live link with central utility HES/MDM.' }
        ].map((s, idx) => (
          <div key={idx} style={{ padding: '32px 24px', background: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '24px', fontWeight: 100, color: 'var(--border-medium)', marginBottom: '16px' }}>{s.step}</div>
            <h4 style={{ fontSize: '16px', fontWeight: 400, textTransform: 'uppercase', color: 'var(--text-main)', marginBottom: '12px' }}>{s.title}</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0, fontWeight: 300 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </DashboardLayout>
);

// 9. IT-Enabled Metering & Billing Systems
const MeteringBilling = () => (
  <DashboardLayout 
    currentId="metering-billing"
    title="IT-Enabled Metering & Billing Systems" 
    tag="METERING & BILLING" 
    image={amiDiagramImg}
    rightTitle="End-to-End Meter Replacement, Validation & Automated Revenue Assurance"
    rightSubtitle="Implementing end-to-end IT-enabled metering solutions for efficient and accurate energy management. From replacing legacy meters with new-generation Static Energy Meters to digital bill distribution."
    specs={[
      { label: 'Meter Compatibility', value: '1-Phase & 3-Phase Static Meters' },
      { label: 'Decommissioning', value: 'Electromagnetic, DC & MNR Units' },
      { label: 'Validation Engine', value: 'Automated Multi-Stage Auditing' },
      { label: 'Billing Model', value: 'Centralized Digital Generation & Dispatch' }
    ]}
  >
    <div style={{ background: 'var(--bg-primary)', padding: '40px', borderRadius: '8px', border: '1px solid var(--border-light)', marginBottom: '40px' }}>
      <div style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>SERVICE OVERVIEW</div>
      <h4 style={{ fontSize: '20px', fontWeight: 300, marginBottom: '16px', color: 'var(--text-main)', textTransform: 'uppercase' }}>Integrated Energy Metering & Revenue Cycle Architecture</h4>
      <p style={{ color: 'var(--text-secondary)', fontSize: '15px', margin: 0, lineHeight: 1.8, fontWeight: 300 }}>
        Implementing end-to-end IT-enabled metering solutions for efficient and accurate energy management. Our services include the replacement of existing Electromagnetic, DC and MNR energy meters (1-Phase & 3-Phase) with new-generation Static Energy Meters, followed by systematic meter reading, data capture, validation, and processing. We enable accurate and timely energy bill generation and distribution, supported by digital workflows and centralized data management. This integrated approach improves metering accuracy, minimizes billing discrepancies, enhances revenue assurance, and provides utilities with reliable consumption data for effective energy management and customer service.
      </p>
    </div>

    {/* 4 Pillars Grid */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '40px' }}>
      <div style={{ background: 'var(--bg-primary)', padding: '36px', borderRadius: '8px', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid var(--border-medium)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)' }}>
          <Zap size={22} strokeWidth={1.5} />
        </div>
        <h4 style={{ fontSize: '18px', fontWeight: 400, margin: 0, color: 'var(--text-main)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Static Meter Retrofitting</h4>
        <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.8, fontSize: '14px', fontWeight: 300 }}>
          Systematic replacement of legacy Electromagnetic, DC, and MNR meters with high-precision 1-Phase and 3-Phase Static Energy Meters.
        </p>
      </div>

      <div style={{ background: 'var(--bg-primary)', padding: '36px', borderRadius: '8px', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid var(--border-medium)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)' }}>
          <Database size={22} strokeWidth={1.5} />
        </div>
        <h4 style={{ fontSize: '18px', fontWeight: 400, margin: 0, color: 'var(--text-main)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Data Capture & Validation</h4>
        <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.8, fontSize: '14px', fontWeight: 300 }}>
          Standardized optical and digital reading, rigorous algorithmic validation checks, and consumption anomaly detection to ensure 100% data integrity.
        </p>
      </div>

      <div style={{ background: 'var(--bg-primary)', padding: '36px', borderRadius: '8px', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid var(--border-medium)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)' }}>
          <Server size={22} strokeWidth={1.5} />
        </div>
        <h4 style={{ fontSize: '18px', fontWeight: 400, margin: 0, color: 'var(--text-main)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Automated Billing Engines</h4>
        <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.8, fontSize: '14px', fontWeight: 300 }}>
          Centralized tariff calculation, digital bill generation, and automated omnichannel dispatch with real-time delivery tracking.
        </p>
      </div>

      <div style={{ background: 'var(--bg-primary)', padding: '36px', borderRadius: '8px', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid var(--border-medium)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)' }}>
          <Shield size={22} strokeWidth={1.5} />
        </div>
        <h4 style={{ fontSize: '18px', fontWeight: 400, margin: 0, color: 'var(--text-main)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Revenue Assurance & Analytics</h4>
        <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.8, fontSize: '14px', fontWeight: 300 }}>
          Minimizing billing discrepancies, plug revenue leaks, and provide utility leaders with granular consumption intelligence and audit trails.
        </p>
      </div>
    </div>

    {/* Spec Grid */}
    <SpecGrid 
      title="Key Capabilities & Deliverables" 
      items={[
        "1-Phase & 3-Phase Static Meter Swaps",
        "Electromagnetic, DC & MNR Decommissioning",
        "Automated Field Meter Reading Workflows",
        "Multi-Stage Consumption Data Validation",
        "Automated Energy Bill Generation",
        "Digital Distribution & Omnichannel Dispatch",
        "Revenue Leakage Mitigation & Assurance",
        "Centralized Utility Management Dashboards"
      ]} 
    />
  </DashboardLayout>
);

const ServiceDetail = () => {
  const { serviceId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  switch (serviceId) {
    case 'smart-poles': return <SmartPoles />;
    case 'ami': return <AMI />;
    case 'amr': return <AMR />;
    case 'metering-billing': return <MeteringBilling />;
    case 'drone': return <Drone />;
    case 'it-infra': return <ITInfra />;
    case 'digital-library': return <DigitalLibrary />;
    case 'vms': return <VMS />;
    case 'meter-installation': return <MeterInstallation />;
    default:
      return (
        <DashboardLayout title="Coming Soon" tag="TBD" image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80">
          <p style={{ color: 'var(--text-secondary)' }}>The detailed page for this service is currently being updated.</p>
        </DashboardLayout>
      );
  }
};

export default ServiceDetail;
