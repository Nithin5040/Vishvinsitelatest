import React, { useState, useEffect } from 'react';
import { ArrowRight, Folder, MapPin, Zap, Briefcase, Users, GraduationCap, Rocket, Globe, TrendingUp, Handshake, ShieldCheck, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const PATHWAY_COLOR = { internship: 'var(--accent-blue)', graduate: '#3b82f6', professional: '#1d4ed8' };
const PATHWAY_LABEL = { internship: 'Internship', graduate: 'Graduate', professional: 'Professional' };

const DEFAULT_JOBS = [
  { id: '1', title: 'Associate Cybersecurity Analyst', department: 'Cybersecurity', location: 'Bengaluru', pathway: 'graduate', description: 'Monitor network systems, analyze firewall logs, and perform threat-vulnerability testing across utility grid environments.', requirements: 'B.E./B.Tech in Computer Science or Information Security; familiarity with TCP/IP, Wireshark, and Linux environment.' },
  { id: '2', title: 'Senior IoT Systems Architect',    department: 'IoT Systems',    location: 'Hybrid',     pathway: 'professional', description: 'Design and deploy end-to-end telemetry solutions for smart streetlights, power grids, and utilities.', requirements: '5+ years experience in IoT protocol architecture (MQTT, CoAP); deep knowledge of RTOS and cloud gateway interfaces.' },
  { id: '3', title: 'Drone Software Engineer Intern',  department: 'Drone Systems & AI', location: 'Bengaluru', pathway: 'internship', description: 'Assist in programming autonomous flight controllers and integrating AI object-detection vision pipelines.', requirements: 'Currently pursuing Bachelor or Master degree in Robotics/Aviation/CS; solid Python/C++ skills and OpenCV experience.' },
];

const pathwayTracks = [
  { tag: 'INTERNSHIPS', title: 'Students', type: 'internship', icon: <GraduationCap size={28} />, bg: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=1000&q=80', desc: 'Gain hands-on experience in cloud environments, network engineering, and autonomous drone systems.' },
  { tag: 'GRADUATES',   title: 'Graduates', type: 'graduate', icon: <Briefcase size={28} />,   bg: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80', desc: 'Launch structured engineering careers within specialized utility infrastructure divisions.' },
  { tag: 'PROFESSIONALS', title: 'Experienced', type: 'professional', icon: <Users size={28} />, bg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80', desc: 'Lead engineering and operations for state-wide smart grids and telemetry infrastructure.' },
];

export default function Career() {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 2;

  useEffect(() => {
    const stored = localStorage.getItem('posted_jobs');
    if (stored) setJobs(JSON.parse(stored));
    else { localStorage.setItem('posted_jobs', JSON.stringify(DEFAULT_JOBS)); setJobs(DEFAULT_JOBS); }
  }, []);

  return (
    <div style={{ background: 'var(--bg-primary)' }}>

      {/* ════ HERO ════ */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)', overflow: 'hidden', padding: '160px 0' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div className="reveal">
              <div style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '40px', borderLeft: '1px solid var(--border-medium)', paddingLeft: '20px' }}>
                CAREERS
              </div>
              <h1 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 200, lineHeight: 1.2, marginBottom: '24px', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-main)' }}>
                Build Your <br/><span style={{ color: 'var(--text-main)', fontWeight: 400 }}>Future With Us.</span>
              </h1>
              <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '40px', fontWeight: 300, maxWidth: '500px' }}>
                Bring your talent to collaborative utility projects, cloud systems integrations, and precision flight controller engineering.
              </p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <a href="#vacancies" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', border: '1px solid var(--text-main)', padding: '12px 24px', borderRadius: '40px', color: 'var(--bg-primary)', background: 'var(--text-main)', transition: 'all 0.3s' }}>
                  View Open Roles <ArrowRight size={14} />
                </a>
                <Link to="/apply" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', border: '1px solid var(--border-medium)', padding: '12px 24px', borderRadius: '40px', color: 'var(--text-main)', transition: 'all 0.3s' }} onMouseOver={e => e.currentTarget.style.borderColor = 'var(--text-main)'} onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border-medium)'}>
                  Submit Application
                </Link>
              </div>
            </div>
            <div className="reveal-stagger">
              <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80" alt="Tech Workplace" style={{ borderRadius: '8px', width: '100%', height: 'auto' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ════ PATHWAY CARDS ════ */}
      <section style={{ padding: '120px 0', background: 'var(--bg-secondary)' }}>
        <div className="wrap">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px', display: 'inline-block', borderLeft: '1px solid var(--border-medium)', paddingLeft: '16px' }}>
              CAREER TRACKS
            </div>
            <h2 style={{ fontSize: '32px', fontWeight: 300, letterSpacing: '0.05em', color: 'var(--text-main)' }}>
              Choose Your Track
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', fontWeight: 300, maxWidth: '600px', margin: '16px auto 0' }}>Select a path that fits your current operational skill level.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            {pathwayTracks.map((p, i) => (
              <div key={i} className="reveal-stagger" style={{ background: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-light)', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'all 0.3s' }} onMouseOver={e => e.currentTarget.style.borderColor = 'var(--text-main)'} onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border-light)'}>
                <div style={{ height: '240px', overflow: 'hidden' }}>
                  <img src={p.bg} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '40px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '24px' }}>{p.tag}</div>
                  <div style={{ color: 'var(--text-main)', marginBottom: '24px' }}>{React.cloneElement(p.icon, { strokeWidth: 1.5 })}</div>
                  <h3 style={{ fontSize: '24px', fontWeight: 300, marginBottom: '16px', color: 'var(--text-main)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{p.title}</h3>
                  <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '32px', flex: 1 }}>{p.desc}</p>
                  <Link to={`/apply?type=${p.type}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)', fontWeight: 300, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    View Roles <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ VACANCIES ════ */}
      <section id="vacancies" style={{ padding: '120px 0', background: 'var(--bg-primary)' }}>
        <div className="wrap">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px', display: 'inline-block', borderLeft: '1px solid var(--border-medium)', paddingLeft: '16px' }}>
              ACTIVE VACANCIES
            </div>
            <h2 style={{ fontSize: '32px', fontWeight: 300, letterSpacing: '0.05em', color: 'var(--text-main)' }}>
              Current Opportunities
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', fontWeight: 300, maxWidth: '600px', margin: '16px auto 0' }}>Join our active technical squads based in Bengaluru.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {jobs.length === 0 ? (
              <div style={{ padding: '64px', textAlign: 'center', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '16px', fontWeight: 300 }}>No current vacancies. Submit a pathway application above for future openings.</p>
              </div>
            ) : (
              (() => {
                const totalPages = Math.ceil(jobs.length / jobsPerPage);
                const currentJobs = jobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);
                return (
                  <>
                    {currentJobs.map((job) => (
                      <div key={job.id} className="reveal-stagger" style={{ background: 'var(--bg-secondary)', padding: '40px', borderRadius: '8px', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '32px' }}>
                        <div style={{ flex: 1, minWidth: '300px' }}>
                          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
                            <span style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <Folder size={12} /> {job.department}
                            </span>
                            <span style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <MapPin size={12} /> {job.location}
                            </span>
                            <span style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <Zap size={12} /> {PATHWAY_LABEL[job.pathway]}
                            </span>
                          </div>
                          <h3 style={{ fontSize: '24px', fontWeight: 300, marginBottom: '16px', color: 'var(--text-main)', letterSpacing: '0.05em' }}>{job.title}</h3>
                          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.8 }}>{job.description}</p>
                          <div style={{ fontSize: '14px', padding: '24px', background: 'var(--bg-primary)', borderRadius: '4px', border: '1px solid var(--border-light)', lineHeight: 1.6 }}>
                            <strong style={{ color: 'var(--text-main)', fontWeight: 600 }}>Requirements: </strong><span style={{ color: 'var(--text-secondary)' }}>{job.requirements}</span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignSelf: 'center' }}>
                          <Link to={`/apply?type=${job.pathway}&jobTitle=${encodeURIComponent(job.title)}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', border: '1px solid var(--text-main)', padding: '12px 24px', borderRadius: '40px', color: 'var(--bg-primary)', background: 'var(--text-main)', transition: 'all 0.3s' }}>
                            Apply Now <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    ))}
                    {totalPages > 1 && (
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', marginTop: '48px', width: '100%' }}>
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          style={{ padding: '12px 24px', border: '1px solid var(--border-medium)', borderRadius: '40px', background: 'transparent', color: 'var(--text-main)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: currentPage === 1 ? 0.3 : 1, pointerEvents: currentPage === 1 ? 'none' : 'auto', cursor: 'pointer', transition: 'all 0.3s' }}
                          onMouseOver={e => e.currentTarget.style.borderColor = 'var(--text-main)'} onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border-medium)'}
                        >
                          Previous
                        </button>
                        <div style={{ fontSize: '13px', fontWeight: 300, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                          Page {currentPage} of {totalPages}
                        </div>
                        <button
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          style={{ padding: '12px 24px', border: '1px solid var(--border-medium)', borderRadius: '40px', background: 'transparent', color: 'var(--text-main)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: currentPage === totalPages ? 0.3 : 1, pointerEvents: currentPage === totalPages ? 'none' : 'auto', cursor: 'pointer', transition: 'all 0.3s' }}
                          onMouseOver={e => e.currentTarget.style.borderColor = 'var(--text-main)'} onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border-medium)'}
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </>
                );
              })()
            )}
          </div>
        </div>
      </section>

      {/* ════ WHY JOIN US ════ */}
      <section style={{ padding: '100px 0', background: '#050505', color: '#fff' }}>
        <div className="wrap">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#666', marginBottom: '12px', display: 'inline-block', borderLeft: '1px solid #333', paddingLeft: '12px' }}>
              WHY JOIN US
            </div>
            <h2 style={{ fontSize: '32px', fontWeight: 300, letterSpacing: '0.1em', color: '#fff', textTransform: 'uppercase' }}>
              Perks & Benefits
            </h2>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', 
            borderTop: '1px solid #222', 
            borderLeft: '1px solid #222',
            borderBottom: '1px solid #222'
          }}>
            {[
              { icon: <Rocket size={18} />, title: 'Cutting-Edge Projects', desc: 'Work on state-wide smart grid deployments, drone systems, and Azure IoT platforms.' },
              { icon: <Globe size={18} />, title: 'Real Impact', desc: 'Your work directly modernizes Karnataka\'s critical utility infrastructure for millions.' },
              { icon: <TrendingUp size={18} />, title: 'Career Growth', desc: 'Structured pathways from intern to lead engineer with certified training programs.' },
              { icon: <Handshake size={18} />, title: 'Collaborative Culture', desc: '500+ professionals working across IoT, cloud, cybersecurity, and drone divisions.' },
              { icon: <ShieldCheck size={18} />, title: 'Job Security', desc: 'Government and enterprise contracts providing stable, long-term engagements.' },
              { icon: <Trophy size={18} />, title: 'Recognition', desc: 'CMMI Level 3 and ISO-certified environment with industry-recognized engineering practices.' },
            ].map((b, i) => (
              <div 
                key={i} 
                className="reveal-stagger" 
                style={{ 
                  padding: '36px 20px', 
                  background: 'transparent', 
                  borderRight: '1px solid #222', 
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'background 0.3s ease'
                }}
                onMouseOver={e => e.currentTarget.style.background = '#0d0d0d'}
                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ color: '#fff', marginBottom: '24px', display: 'inline-flex' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #333' }}>
                    {React.cloneElement(b.icon, { strokeWidth: 1.5 })}
                  </div>
                </div>
                <h3 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#fff', lineHeight: 1.4 }}>{b.title}</h3>
                <p style={{ fontSize: '12px', color: '#777', lineHeight: 1.6, margin: 0, fontWeight: 300 }}>{b.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '60px', padding: '50px 30px', border: '1px solid #222', borderRadius: '8px', background: '#0a0a0a', maxWidth: '560px', margin: '60px auto 0' }} className="reveal">
            <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#666', marginBottom: '12px' }}>
              OPEN APPLICATION
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 300, letterSpacing: '0.05em', marginBottom: '12px', textTransform: 'uppercase', color: '#fff' }}>
              Don't see the right fit?
            </h3>
            <p style={{ fontSize: '13px', color: '#888', marginBottom: '28px', fontWeight: 300, maxWidth: '420px', margin: '0 auto 28px', lineHeight: 1.6 }}>We're always looking for talented engineers, developers, and drone specialists.</p>
            <Link to="/apply" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', border: '1px solid #fff', padding: '12px 28px', borderRadius: '40px', color: '#050505', background: '#fff', transition: 'all 0.3s' }}>
              Submit Open Application <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
