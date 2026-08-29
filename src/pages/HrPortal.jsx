import { Lock, Folder, MapPin, Zap, Calendar, Trash2, Plus, Check, X, Edit3, Eye, ExternalLink, ArrowRight, Briefcase } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DEFAULT_GALLERY = [
  {
    id: 'g1',
    title: 'ISO 27001 Certification Achieved',
    category: 'Achievement',
    date: 'Jan 2026',
    img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    desc: 'Audit successfully concluded under cybersecurity and data integrity framework standards.'
  },
  {
    id: 'g2',
    title: 'Smart Grid AMI Launch Event',
    category: 'Event',
    date: 'Mar 2026',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    desc: 'Officiated deployment of automated telemetry modules across regional hubs.'
  },
  {
    id: 'g3',
    title: 'Best Tech Partner Award',
    category: 'Achievement',
    date: 'May 2026',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    desc: 'Recognized for excellent service performance in scaling infrastructure assets.'
  }
];

const DEFAULT_JOBS = [
  {
    id: '1',
    title: 'Associate Cybersecurity Analyst',
    department: 'Cybersecurity',
    location: 'Bengaluru',
    pathway: 'graduate',
    description: 'Monitor network systems, analyze firewall logs, and perform threat-vulnerability testing.',
    requirements: 'B.E./B.Tech in Computer Science or Information Security; familiarity with TCP/IP, Wireshark, and Linux environment.',
  },
  {
    id: '2',
    title: 'Senior IoT Systems Architect',
    department: 'IoT Systems',
    location: 'Hybrid',
    pathway: 'professional',
    description: 'Design and deploy end-to-end telemetry solutions for smart streetlights, power grids, and utilities.',
    requirements: '5+ years experience in IoT protocol architecture (MQTT, CoAP); deep knowledge of RTOS and cloud gateway interfaces.',
  },
  {
    id: '3',
    title: 'Drone Software Engineer Intern',
    department: 'Drone Systems & AI',
    location: 'Bengaluru',
    pathway: 'internship',
    description: 'Assist in programming autonomous flight controllers and integrating AI object-detection vision pipelines.',
    requirements: 'Currently pursuing Bachelor or Master degree in Robotics/Aviation/CS; solid Python/C++ skills and OpenCV experience.',
  },
];

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  background: 'var(--bg-primary)',
  border: '1px solid var(--border-medium)',
  borderRadius: '8px',
  color: 'var(--text-main)',
  fontSize: '14px',
  fontFamily: 'inherit',
  outline: 'none',
  transition: 'border-color 0.2s',
};

const labelStyle = {
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'var(--text-secondary)',
  fontWeight: 600,
  marginBottom: '6px',
  display: 'block'
};

export default function HrPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  
  // Job CMS states
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({ title: '', department: 'Cybersecurity', location: 'Bengaluru', pathway: 'graduate', description: '', requirements: '' });
  const [editingJobId, setEditingJobId] = useState(null);
  
  // Gallery CMS states
  const [gallery, setGallery] = useState([]);
  const [galleryFormData, setGalleryFormData] = useState({ title: '', category: 'Event', date: '', img: '', desc: '' });
  const [editingGalleryId, setEditingGalleryId] = useState(null);
  
  // Preview Modal state
  const [previewModal, setPreviewModal] = useState({ show: false, type: 'job', data: null });
  
  const [popup, setPopup] = useState({ show: false, type: 'success', message: '' });
  const [loginFormErrors, setLoginFormErrors] = useState({});
  const [jobFormErrors, setJobFormErrors] = useState({});
  const [highlightFormErrors, setHighlightFormErrors] = useState({});

  useEffect(() => {
    const auth = sessionStorage.getItem('hr_authenticated');
    if (auth === 'true') setIsLoggedIn(true);
    
    const storedJobs = localStorage.getItem('posted_jobs');
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
    } else {
      localStorage.setItem('posted_jobs', JSON.stringify(DEFAULT_JOBS));
      setJobs(DEFAULT_JOBS);
    }

    const storedGallery = localStorage.getItem('company_gallery');
    if (storedGallery) {
      setGallery(JSON.parse(storedGallery));
    } else {
      localStorage.setItem('company_gallery', JSON.stringify(DEFAULT_GALLERY));
      setGallery(DEFAULT_GALLERY);
    }
  }, []);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const { username, password } = loginForm;
    const errors = {};
    if (!username.trim()) errors.username = 'Username is required.';
    if (!password.trim()) errors.password = 'Password is required.';
    if (Object.keys(errors).length > 0) {
      setLoginFormErrors(errors);
      return;
    }
    setLoginFormErrors({});

    const validUsernames = ['admin', 'admin@vishvin.com', 'hr@vishvin.com'];
    const validPasswords = ['vishvin@2026', 'admin123'];
    if (validUsernames.includes(username.toLowerCase()) && validPasswords.includes(password)) {
      sessionStorage.setItem('hr_authenticated', 'true');
      setIsLoggedIn(true);
      setLoginForm({ username: '', password: '' });
    } else {
      setPopup({ show: true, type: 'error', message: 'Authentication failed. Please check credentials and try again.' });
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('hr_authenticated');
    setIsLoggedIn(false);
  };

  /* ──────── JOB ACTIONS ──────── */
  const handleJobSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Job title is required.';
    if (!formData.description.trim()) errors.description = 'Job description is required.';
    if (!formData.requirements.trim()) errors.requirements = 'Requirements details are required.';
    if (Object.keys(errors).length > 0) {
      setJobFormErrors(errors);
      return;
    }
    setJobFormErrors({});

    if (editingJobId) {
      const updated = jobs.map(j => j.id === editingJobId ? { ...formData, id: editingJobId } : j);
      setJobs(updated);
      localStorage.setItem('posted_jobs', JSON.stringify(updated));
      setPopup({ show: true, type: 'success', message: `Job role "${formData.title}" updated successfully!` });
      setEditingJobId(null);
    } else {
      const newJob = { id: Date.now().toString(), ...formData };
      const updated = [newJob, ...jobs];
      setJobs(updated);
      localStorage.setItem('posted_jobs', JSON.stringify(updated));
      setPopup({ show: true, type: 'success', message: `Vacancy published! "${formData.title}" has been added.` });
    }

    setFormData({ title: '', department: 'Cybersecurity', location: 'Bengaluru', pathway: 'graduate', description: '', requirements: '' });
  };

  const handleEditJob = (job) => {
    setEditingJobId(job.id);
    setFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      pathway: job.pathway || 'graduate',
      description: job.description,
      requirements: job.requirements || ''
    });
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  const handleCancelJobEdit = () => {
    setEditingJobId(null);
    setFormData({ title: '', department: 'Cybersecurity', location: 'Bengaluru', pathway: 'graduate', description: '', requirements: '' });
  };

  const handleDeleteJob = (id) => {
    const updated = jobs.filter(j => j.id !== id);
    setJobs(updated);
    localStorage.setItem('posted_jobs', JSON.stringify(updated));
    if (editingJobId === id) handleCancelJobEdit();
  };

  /* ──────── GALLERY ACTIONS ──────── */
  const handleGallerySubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!galleryFormData.title.trim()) errors.title = 'Title is required.';
    if (!galleryFormData.date.trim()) errors.date = 'Date is required.';
    if (!galleryFormData.desc.trim()) errors.desc = 'Description is required.';
    if (Object.keys(errors).length > 0) {
      setHighlightFormErrors(errors);
      return;
    }
    setHighlightFormErrors({});

    const imgUrl = galleryFormData.img || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80';

    if (editingGalleryId) {
      const updated = gallery.map(item => item.id === editingGalleryId ? { ...galleryFormData, id: editingGalleryId, img: imgUrl } : item);
      setGallery(updated);
      localStorage.setItem('company_gallery', JSON.stringify(updated));
      setPopup({ show: true, type: 'success', message: `Highlight "${galleryFormData.title}" updated successfully!` });
      setEditingGalleryId(null);
    } else {
      const newHighlight = { id: Date.now().toString(), ...galleryFormData, img: imgUrl, images: [imgUrl] };
      const updated = [newHighlight, ...gallery];
      setGallery(updated);
      localStorage.setItem('company_gallery', JSON.stringify(updated));
      setPopup({ show: true, type: 'success', message: `Highlight published! "${galleryFormData.title}" has been added.` });
    }

    setGalleryFormData({ title: '', category: 'Event', date: '', img: '', desc: '' });
  };

  const handleEditGallery = (item) => {
    setEditingGalleryId(item.id);
    setGalleryFormData({
      title: item.title,
      category: item.category,
      date: item.date,
      img: item.img || '',
      desc: item.desc
    });
    window.scrollTo({ top: 900, behavior: 'smooth' });
  };

  const handleCancelGalleryEdit = () => {
    setEditingGalleryId(null);
    setGalleryFormData({ title: '', category: 'Event', date: '', img: '', desc: '' });
  };

  const handleDeleteGallery = (id) => {
    const updated = gallery.filter(item => item.id !== id);
    setGallery(updated);
    localStorage.setItem('company_gallery', JSON.stringify(updated));
    if (editingGalleryId === id) handleCancelGalleryEdit();
  };

  const renderPopupModal = () => {
    if (!popup.show) return null;
    const isSuccess = popup.type === 'success';
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ background: 'var(--bg-primary)', maxWidth: '420px', width: '100%', padding: '40px', textAlign: 'center', borderRadius: '8px', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: isSuccess ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: isSuccess ? '#10b981' : '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${isSuccess ? '#10b981' : '#ef4444'}` }}>
            {isSuccess ? <Check size={28} /> : <X size={28} />}
          </div>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 300, textTransform: 'uppercase', marginBottom: '8px', color: 'var(--text-main)' }}>{isSuccess ? 'Success' : 'Error'}</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0, fontWeight: 300 }}>{popup.message}</p>
          </div>
          <button onClick={() => setPopup({ ...popup, show: false })} style={{ width: '100%', padding: '12px 24px', borderRadius: '40px', background: 'var(--text-main)', color: 'var(--bg-primary)', border: 'none', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', cursor: 'pointer' }}>
            {isSuccess ? 'Continue' : 'Dismiss'}
          </button>
        </div>
      </div>
    );
  };

  /* ──────── LIVE PREVIEW MODAL ──────── */
  const renderPreviewModal = () => {
    if (!previewModal.show || !previewModal.data) return null;
    const isJob = previewModal.type === 'job';
    const data = previewModal.data;

    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }} onClick={() => setPreviewModal({ show: false, type: 'job', data: null })}>
        <div style={{ background: 'var(--bg-primary)', maxWidth: '680px', width: '100%', padding: '48px', borderRadius: '8px', border: '1px solid var(--border-medium)', position: 'relative', maxHeight: '85vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              LIVE PREVIEW • {isJob ? 'CAREERS PAGE VIEW' : 'GALLERY PAGE VIEW'}
            </div>
            <button onClick={() => setPreviewModal({ show: false, type: 'job', data: null })} style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', cursor: 'pointer', padding: '4px' }}>
              <X size={20} />
            </button>
          </div>

          {isJob ? (
            <div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                <span style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', border: '1px solid var(--border-light)', padding: '4px 10px', borderRadius: '4px' }}>{data.department || 'Department'}</span>
                <span style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', border: '1px solid var(--border-light)', padding: '4px 10px', borderRadius: '4px' }}>{data.location || 'Location'}</span>
                <span style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-main)', border: '1px solid var(--border-medium)', padding: '4px 10px', borderRadius: '4px' }}>{data.pathway || 'graduate'}</span>
              </div>
              <h2 style={{ fontSize: '28px', fontWeight: 300, marginBottom: '20px', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{data.title || 'Untitled Job Position'}</h2>
              
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Description</h4>
                <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.8, fontWeight: 300 }}>{data.description || 'No description provided.'}</p>
              </div>

              {data.requirements && (
                <div style={{ marginBottom: '32px' }}>
                  <h4 style={{ fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Requirements</h4>
                  <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.8, fontWeight: 300 }}>{data.requirements}</p>
                </div>
              )}

              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', border: '1px solid var(--text-main)', padding: '12px 28px', borderRadius: '40px', color: 'var(--bg-primary)', background: 'var(--text-main)' }}>
                  Apply For This Role <ArrowRight size={14} />
                </span>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ height: '320px', borderRadius: '8px', overflow: 'hidden', marginBottom: '24px', border: '1px solid var(--border-light)' }}>
                <img src={data.img || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{data.category || 'Event'}</span>
                <span style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{data.date || 'Date'}</span>
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 300, marginBottom: '16px', color: 'var(--text-main)', textTransform: 'uppercase' }}>{data.title || 'Untitled Event'}</h2>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.8, fontWeight: 300 }}>{data.desc || 'No description provided.'}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (!isLoggedIn) {
    return (
      <div style={{ background: 'var(--bg-secondary)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        {renderPopupModal()}
        <div style={{ background: 'var(--bg-primary)', maxWidth: '440px', width: '100%', padding: '48px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ margin: '0 auto 16px', width: '64px', height: '64px', borderRadius: '50%', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)', border: '1px solid var(--border-light)' }}>
              <Lock size={32} strokeWidth={1.5} />
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 300, marginBottom: '8px', color: 'var(--text-main)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>ADMINISTRATOR ACCESS</h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 300 }}>HR Management Portal — restricted access only.</p>
          </div>
          <form onSubmit={handleLoginSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={labelStyle}>Username / Email</label>
              <input required type="text" name="username" value={loginForm.username} onChange={e => { setLoginForm({ ...loginForm, username: e.target.value }); if (e.target.value.trim()) setLoginFormErrors(prev => ({ ...prev, username: null })); }} placeholder="admin@vishvin.com" style={{ ...inputStyle, borderColor: loginFormErrors.username ? 'var(--status-error)' : 'var(--border-medium)' }} />
              {loginFormErrors.username && <span style={{ color: 'var(--status-error)', fontSize: '12px' }}>{loginFormErrors.username}</span>}
            </div>
            <div>
              <label style={labelStyle}>Security Password</label>
              <input required type="password" name="password" value={loginForm.password} onChange={e => { setLoginForm({ ...loginForm, password: e.target.value }); if (e.target.value.trim()) setLoginFormErrors(prev => ({ ...prev, password: null })); }} placeholder="Enter passcode" style={{ ...inputStyle, borderColor: loginFormErrors.password ? 'var(--status-error)' : 'var(--border-medium)' }} />
              {loginFormErrors.password && <span style={{ color: 'var(--status-error)', fontSize: '12px' }}>{loginFormErrors.password}</span>}
            </div>
            <button type="submit" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '12px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', border: '1px solid var(--text-main)', padding: '12px 24px', borderRadius: '40px', color: 'var(--bg-primary)', background: 'var(--text-main)', transition: 'all 0.3s', marginTop: '8px', width: '100%', cursor: 'pointer' }}>Verify Identity</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: '100px' }}>
      
      {/* ── USER MENU & SITE QUICK NAVIGATION BAR ── */}
      <section style={{ background: '#0a0a0a', color: '#fff', borderBottom: '1px solid #222', padding: '16px 0', position: 'sticky', top: 0, zIndex: 40, backdropFilter: 'blur(10px)' }}>
        <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888' }}>
              SITE NAVIGATION:
            </span>
            {[
              { to: '/', label: 'Home' },
              { to: '/about', label: 'About' },
              { to: '/services', label: 'Services' },
              { to: '/career', label: 'Career' },
              { to: '/gallery', label: 'Gallery' },
              { to: '/contact', label: 'Contact' },
            ].map(link => (
              <Link 
                key={link.to} 
                to={link.to} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ fontSize: '12px', color: '#ccc', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'inline-flex', alignItems: 'center', gap: '4px', transition: 'color 0.2s' }}
                onMouseOver={e => e.currentTarget.style.color = '#fff'}
                onMouseOut={e => e.currentTarget.style.color = '#ccc'}
              >
                {link.label} <ExternalLink size={10} style={{ opacity: 0.6 }} />
              </Link>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} /> HR Authenticated
            </span>
            <button onClick={handleLogout} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', border: '1px solid #444', padding: '6px 16px', borderRadius: '20px', color: '#fff', background: 'transparent', cursor: 'pointer', transition: 'all 0.3s' }} onMouseOver={e => e.currentTarget.style.borderColor = '#fff'} onMouseOut={e => e.currentTarget.style.borderColor = '#444'}>
              Sign Out
            </button>
          </div>
        </div>
      </section>

      {/* ── HEADER ── */}
      <header style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-light)', padding: '80px 0 40px' }}>
        <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px', display: 'inline-block', borderLeft: '1px solid var(--border-medium)', paddingLeft: '14px' }}>
              CONTROL CENTER
            </div>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 200, marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-main)' }}>HR Management & CMS</h1>
            <p style={{ color: 'var(--text-secondary)', fontWeight: 300, margin: 0, fontSize: '15px' }}>Full controls to publish, edit, preview, and manage job openings and company achievements.</p>
          </div>
        </div>
      </header>

      <section style={{ padding: '60px 0' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '48px', alignItems: 'start' }}>
            
            {/* ── POST / EDIT JOB FORM ── */}
            <div style={{ background: 'var(--bg-primary)', padding: '40px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 400, color: 'var(--text-main)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  {editingJobId ? 'Edit Active Job Position' : 'Post a New Job Role'}
                </h3>
                {editingJobId && (
                  <span style={{ fontSize: '10px', background: '#3b82f6', color: '#fff', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Editing Mode</span>
                )}
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '28px', fontWeight: 300 }}>
                {editingJobId ? 'Modify the details below and save your changes.' : 'Publish a new opening to public career listings.'}
              </p>
              
              <form onSubmit={handleJobSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Job Title</label>
                  <input required type="text" value={formData.title} onChange={e => { setFormData({ ...formData, title: e.target.value }); if (e.target.value.trim()) setJobFormErrors(prev => ({ ...prev, title: null })); }} placeholder="e.g. Cybersecurity Specialist" style={{ ...inputStyle, borderColor: jobFormErrors.title ? 'var(--status-error)' : 'var(--border-medium)' }} />
                  {jobFormErrors.title && <span style={{ color: 'var(--status-error)', fontSize: '12px' }}>{jobFormErrors.title}</span>}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={labelStyle}>Department</label>
                    <select value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} style={inputStyle}>
                      <option>Cybersecurity</option><option>Software Engineering</option><option>IoT Systems</option><option>Drone Systems & AI</option><option>IT Infrastructure</option><option>HR & Administrative</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Location</label>
                    <select value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} style={inputStyle}>
                      <option>Bengaluru</option><option>Remote</option><option>Hybrid</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Pathway Level</label>
                  <select value={formData.pathway} onChange={e => setFormData({ ...formData, pathway: e.target.value })} style={inputStyle}>
                    <option value="internship">Students / Internship</option><option value="graduate">Graduate</option><option value="professional">Experienced Professional</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Job Description</label>
                  <textarea required value={formData.description} onChange={e => { setFormData({ ...formData, description: e.target.value }); if (e.target.value.trim()) setJobFormErrors(prev => ({ ...prev, description: null })); }} rows="3" placeholder="Overview of the responsibilities and team role..." style={{ ...inputStyle, borderColor: jobFormErrors.description ? 'var(--status-error)' : 'var(--border-medium)' }} />
                  {jobFormErrors.description && <span style={{ color: 'var(--status-error)', fontSize: '12px' }}>{jobFormErrors.description}</span>}
                </div>
                <div>
                  <label style={labelStyle}>Requirements</label>
                  <textarea required value={formData.requirements} onChange={e => { setFormData({ ...formData, requirements: e.target.value }); if (e.target.value.trim()) setJobFormErrors(prev => ({ ...prev, requirements: null })); }} rows="3" placeholder="Qualifications, education, skills, and tools..." style={{ ...inputStyle, borderColor: jobFormErrors.requirements ? 'var(--status-error)' : 'var(--border-medium)' }} />
                  {jobFormErrors.requirements && <span style={{ color: 'var(--status-error)', fontSize: '12px' }}>{jobFormErrors.requirements}</span>}
                </div>
                
                <div style={{ display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap' }}>
                  <button type="submit" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', border: '1px solid var(--text-main)', padding: '12px 24px', borderRadius: '40px', color: 'var(--bg-primary)', background: 'var(--text-main)', cursor: 'pointer', transition: 'all 0.3s' }}>
                    {editingJobId ? 'Save Changes' : 'Publish Role'}
                  </button>
                  
                  <button type="button" onClick={() => setPreviewModal({ show: true, type: 'job', data: formData })} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', border: '1px solid var(--border-medium)', padding: '12px 20px', borderRadius: '40px', color: 'var(--text-main)', background: 'transparent', cursor: 'pointer', transition: 'all 0.3s' }}>
                    <Eye size={14} /> Preview
                  </button>

                  {editingJobId && (
                    <button type="button" onClick={handleCancelJobEdit} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', border: '1px solid var(--border-medium)', padding: '12px 20px', borderRadius: '40px', color: 'var(--text-muted)', background: 'transparent', cursor: 'pointer' }}>
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* ── ACTIVE JOB LISTINGS ── */}
            <div>
              <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 400, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-main)' }}>
                  Active Job Positions <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>({jobs.length})</span>
                </h3>
                <Link to="/career" target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  View Live <ExternalLink size={12} />
                </Link>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {jobs.length === 0 ? (
                  <div style={{ background: 'var(--bg-primary)', padding: '32px', textAlign: 'center', borderRadius: '8px', border: '1px solid var(--border-light)' }}><p style={{ color: 'var(--text-secondary)', margin: 0, fontWeight: 300 }}>No active listings.</p></div>
                ) : (
                  jobs.map(job => (
                    <div key={job.id} style={{ background: 'var(--bg-primary)', padding: '28px', borderRadius: '8px', border: editingJobId === job.id ? '1px solid #3b82f6' : '1px solid var(--border-light)', transition: 'all 0.2s' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                        <div>
                          <h4 style={{ fontSize: '17px', fontWeight: 400, marginBottom: '12px', color: 'var(--text-main)', letterSpacing: '0.02em', textTransform: 'uppercase' }}>{job.title}</h4>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                            <span style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}><Folder size={12} /> {job.department}</span>
                            <span style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={12} /> {job.location}</span>
                            <span style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-main)', border: '1px solid var(--border-medium)', padding: '2px 8px', borderRadius: '4px' }}>{job.pathway || 'graduate'}</span>
                          </div>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => setPreviewModal({ show: true, type: 'job', data: job })} title="Preview" style={{ background: 'transparent', border: '1px solid var(--border-medium)', color: 'var(--text-main)', padding: '6px', borderRadius: '4px', cursor: 'pointer' }}>
                            <Eye size={14} />
                          </button>
                          <button onClick={() => handleEditJob(job)} title="Edit Job" style={{ background: 'transparent', border: '1px solid var(--border-medium)', color: 'var(--text-main)', padding: '6px', borderRadius: '4px', cursor: 'pointer' }}>
                            <Edit3 size={14} />
                          </button>
                          <button onClick={() => handleDeleteJob(job.id)} title="Delete Job" style={{ background: 'transparent', border: '1px solid var(--border-medium)', color: '#ef4444', padding: '6px', borderRadius: '4px', cursor: 'pointer' }}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6, fontWeight: 300 }}>{job.description}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div style={{ height: '1px', background: 'var(--border-light)', margin: '80px 0' }} />

          {/* ── GALLERY CMS ── */}
          <div style={{ marginBottom: '48px', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px', display: 'inline-block', borderLeft: '1px solid var(--border-medium)', paddingLeft: '14px' }}>
              GALLERY & EVENTS CMS
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: 300, color: 'var(--text-main)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Manage Visual Records & Achievements</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '48px', alignItems: 'start' }}>
            
            {/* ── POST / EDIT EVENT FORM ── */}
            <div style={{ background: 'var(--bg-primary)', padding: '40px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 400, color: 'var(--text-main)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  {editingGalleryId ? 'Edit Event / Highlight' : 'Post Event / Achievement'}
                </h3>
                {editingGalleryId && (
                  <span style={{ fontSize: '10px', background: '#3b82f6', color: '#fff', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Editing Mode</span>
                )}
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '28px', fontWeight: 300 }}>
                {editingGalleryId ? 'Update the highlight data and publish updates.' : 'Add new photos and records to the public Gallery.'}
              </p>

              <form onSubmit={handleGallerySubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Highlight Title</label>
                  <input required type="text" value={galleryFormData.title} onChange={e => { setGalleryFormData({ ...galleryFormData, title: e.target.value }); if (e.target.value.trim()) setHighlightFormErrors(prev => ({ ...prev, title: null })); }} placeholder="e.g. ISO 27001 Certification Achieved" style={{ ...inputStyle, borderColor: highlightFormErrors.title ? 'var(--status-error)' : 'var(--border-medium)' }} />
                  {highlightFormErrors.title && <span style={{ color: 'var(--status-error)', fontSize: '12px' }}>{highlightFormErrors.title}</span>}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={labelStyle}>Category</label>
                    <select value={galleryFormData.category} onChange={e => setGalleryFormData({ ...galleryFormData, category: e.target.value })} style={inputStyle}>
                      <option>Event</option><option>Achievement</option><option>Operations</option><option>Field Work</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Date / Month</label>
                    <input required type="text" value={galleryFormData.date} onChange={e => { setGalleryFormData({ ...galleryFormData, date: e.target.value }); if (e.target.value.trim()) setHighlightFormErrors(prev => ({ ...prev, date: null })); }} placeholder="e.g. Mar 2026" style={{ ...inputStyle, borderColor: highlightFormErrors.date ? 'var(--status-error)' : 'var(--border-medium)' }} />
                    {highlightFormErrors.date && <span style={{ color: 'var(--status-error)', fontSize: '12px' }}>{highlightFormErrors.date}</span>}
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Cover Image URL</label>
                  <input type="url" value={galleryFormData.img} onChange={e => setGalleryFormData({ ...galleryFormData, img: e.target.value })} placeholder="https://images.unsplash.com/..." style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Brief Description</label>
                  <textarea required value={galleryFormData.desc} onChange={e => { setGalleryFormData({ ...galleryFormData, desc: e.target.value }); if (e.target.value.trim()) setHighlightFormErrors(prev => ({ ...prev, desc: null })); }} rows="3" placeholder="Brief summary of the occasion or milestone..." style={{ ...inputStyle, borderColor: highlightFormErrors.desc ? 'var(--status-error)' : 'var(--border-medium)' }} />
                  {highlightFormErrors.desc && <span style={{ color: 'var(--status-error)', fontSize: '12px' }}>{highlightFormErrors.desc}</span>}
                </div>
                
                <div style={{ display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap' }}>
                  <button type="submit" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', border: '1px solid var(--text-main)', padding: '12px 24px', borderRadius: '40px', color: 'var(--bg-primary)', background: 'var(--text-main)', cursor: 'pointer', transition: 'all 0.3s' }}>
                    {editingGalleryId ? 'Save Highlight' : 'Publish Highlight'}
                  </button>

                  <button type="button" onClick={() => setPreviewModal({ show: true, type: 'gallery', data: galleryFormData })} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', border: '1px solid var(--border-medium)', padding: '12px 20px', borderRadius: '40px', color: 'var(--text-main)', background: 'transparent', cursor: 'pointer', transition: 'all 0.3s' }}>
                    <Eye size={14} /> Preview
                  </button>

                  {editingGalleryId && (
                    <button type="button" onClick={handleCancelGalleryEdit} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', border: '1px solid var(--border-medium)', padding: '12px 20px', borderRadius: '40px', color: 'var(--text-muted)', background: 'transparent', cursor: 'pointer' }}>
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* ── ACTIVE GALLERY HIGHLIGHTS ── */}
            <div>
              <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 400, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-main)' }}>
                  Active Highlights <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>({gallery.length})</span>
                </h3>
                <Link to="/gallery" target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  View Live <ExternalLink size={12} />
                </Link>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {gallery.length === 0 ? (
                  <div style={{ background: 'var(--bg-primary)', padding: '32px', textAlign: 'center', borderRadius: '8px', border: '1px solid var(--border-light)' }}><p style={{ color: 'var(--text-secondary)', margin: 0, fontWeight: 300 }}>No active highlights.</p></div>
                ) : (
                  gallery.map(item => (
                    <div key={item.id} style={{ background: 'var(--bg-primary)', padding: '24px', borderRadius: '8px', border: editingGalleryId === item.id ? '1px solid #3b82f6' : '1px solid var(--border-light)', transition: 'all 0.2s' }}>
                      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <img src={item.img} alt={item.title} style={{ width: '80px', height: '60px', borderRadius: '4px', objectFit: 'cover' }} />
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: '15px', fontWeight: 400, margin: '0 0 6px', color: 'var(--text-main)', textTransform: 'uppercase' }}>{item.title}</h4>
                          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                            <span style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{item.category}</span>
                            <span style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={12} strokeWidth={1.5} /> {item.date}</span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => setPreviewModal({ show: true, type: 'gallery', data: item })} title="Preview" style={{ background: 'transparent', border: '1px solid var(--border-medium)', color: 'var(--text-main)', padding: '6px', borderRadius: '4px', cursor: 'pointer' }}>
                            <Eye size={14} />
                          </button>
                          <button onClick={() => handleEditGallery(item)} title="Edit Highlight" style={{ background: 'transparent', border: '1px solid var(--border-medium)', color: 'var(--text-main)', padding: '6px', borderRadius: '4px', cursor: 'pointer' }}>
                            <Edit3 size={14} />
                          </button>
                          <button onClick={() => handleDeleteGallery(item.id)} title="Delete Highlight" style={{ background: 'transparent', border: '1px solid var(--border-medium)', color: '#ef4444', padding: '6px', borderRadius: '4px', cursor: 'pointer' }}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {renderPopupModal()}
      {renderPreviewModal()}
    </div>
  );
}
