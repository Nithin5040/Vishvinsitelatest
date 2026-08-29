import { useState, useEffect } from 'react';
import { Calendar, Camera, ChevronLeft, ChevronRight, X } from 'lucide-react';

const DEFAULT_GALLERY = [
  {
    id: 'g1',
    title: 'ISO 27001 Certification Achieved',
    category: 'Achievement',
    date: 'Jan 2026',
    img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    desc: 'Audit successfully concluded under cybersecurity and data integrity framework standards.',
    images: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'g2',
    title: 'Smart Grid AMI Launch Event',
    category: 'Event',
    date: 'Mar 2026',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    desc: 'Officiated deployment of automated telemetry modules across regional hubs.',
    images: [
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'g3',
    title: 'Best Tech Partner Award',
    category: 'Achievement',
    date: 'May 2026',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    desc: 'Recognized for excellent service performance in scaling infrastructure assets.',
    images: [
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

export default function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('company_gallery');
    if (stored) {
      setGallery(JSON.parse(stored));
    } else {
      localStorage.setItem('company_gallery', JSON.stringify(DEFAULT_GALLERY));
      setGallery(DEFAULT_GALLERY);
    }
  }, []);

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>

      {/* ── HEADER ── */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)', padding: '160px 0' }}>
        <div className="wrap">
          <div className="reveal" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px', display: 'inline-block', borderLeft: '1px solid var(--border-medium)', paddingLeft: '16px' }}>
              VISUAL HIGHLIGHTS
            </div>
            <h1 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 200, lineHeight: 1.2, marginBottom: '24px', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-main)' }}>
              Gallery & <span style={{ color: 'var(--text-main)', fontWeight: 400 }}>Events.</span>
            </h1>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: '640px', margin: '0 auto', fontWeight: 300 }}>
              Visual records of our state utility projects, certification ceremonies, corporate events, and operational achievements.
            </p>
          </div>
        </div>
      </section>

      {/* ── GRID ── */}
      <section style={{ padding: '80px 0 160px', background: 'var(--bg-secondary)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
            {gallery.map((item, i) => (
              <div 
                key={item.id} 
                onClick={() => { setSelectedEvent(item); setActiveImgIdx(0); }}
                className="reveal-stagger"
                style={{ cursor: 'pointer', background: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-light)', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'all 0.3s' }}
                onMouseOver={e => e.currentTarget.style.borderColor = 'var(--text-main)'}
                onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border-light)'}
              >
                <div style={{ position: 'relative', height: '240px' }}>
                  <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {item.images && item.images.length > 1 && (
                    <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'var(--bg-primary)', border: '1px solid var(--border-light)', padding: '6px 12px', borderRadius: '4px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-main)' }}>
                      <Camera size={14} strokeWidth={1.5} /> {item.images.length}
                    </div>
                  )}
                </div>
                <div style={{ padding: '32px' }}>
                  <div style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>{item.category}</div>
                  <h3 style={{ fontSize: '20px', fontWeight: 300, marginBottom: '12px', color: 'var(--text-main)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{item.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '13px', fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    <Calendar size={14} strokeWidth={1.5} /> {item.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODAL ── */}
      {selectedEvent && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
        }} onClick={() => setSelectedEvent(null)}>
          
          <button onClick={() => setSelectedEvent(null)} className="btn btn-ghost" style={{ position: 'absolute', top: '24px', right: '24px', padding: '12px', borderRadius: '50%' }}>
            <X size={24} />
          </button>

          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: '1000px', height: '75vh' }} onClick={e => e.stopPropagation()}>
            <img src={selectedEvent.images && selectedEvent.images.length > 0 ? selectedEvent.images[activeImgIdx] : selectedEvent.img}
              alt=""
              style={{ maxWidth: '90vw', maxHeight: '75vh', objectFit: 'contain', borderRadius: '12px', boxShadow: 'var(--shadow-xl)' }} />

            {selectedEvent.images && selectedEvent.images.length > 1 && (
              <>
                <button onClick={() => setActiveImgIdx(prev => (prev === 0 ? selectedEvent.images.length - 1 : prev - 1))}
                  className="btn"
                  style={{ position: 'absolute', left: '20px', background: 'var(--bg-primary)', padding: '16px', borderRadius: '50%', boxShadow: 'var(--shadow-lg)' }}
                >
                  <ChevronLeft size={24} />
                </button>
                <button onClick={() => setActiveImgIdx(prev => (prev === selectedEvent.images.length - 1 ? 0 : prev + 1))}
                  className="btn"
                  style={{ position: 'absolute', right: '20px', background: 'var(--bg-primary)', padding: '16px', borderRadius: '50%', boxShadow: 'var(--shadow-lg)' }}
                >
                  <ChevronRight size={24} />
                </button>
                <div style={{ position: 'absolute', bottom: '-48px', background: 'var(--bg-secondary)', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, boxShadow: 'var(--shadow-sm)' }}>
                  {activeImgIdx + 1} / {selectedEvent.images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
