import { Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

export default function Apply() {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') || 'graduate';
  const jobTitle = searchParams.get('jobTitle') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    roleType: initialType,
    qualification: '',
    experience: '',
    resumeFile: null,
    coverLetter: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    setFormData((prev) => ({ ...prev, roleType: searchParams.get('type') || 'graduate' }));
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resumeFile') {
      const file = files[0] || null;
      setFormData((prev) => ({ ...prev, resumeFile: file }));
      if (file) {
        setFormErrors(prev => ({ ...prev, resumeFile: null }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (value.trim()) {
        setFormErrors(prev => ({ ...prev, [name]: null }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required.';
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required.';
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.qualification.trim()) {
      newErrors.qualification = 'Qualification is required.';
    }

    if (formData.roleType === 'professional' && !formData.experience.trim()) {
      newErrors.experience = 'Years of experience is required.';
    }

    if (!formData.resumeFile) {
      newErrors.resumeFile = 'Please upload your resume in PDF format.';
    }

    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = 'Cover Letter content is required.';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorsList = validateForm();
    if (Object.keys(errorsList).length > 0) {
      setFormErrors(errorsList);
      return;
    }
    setFormErrors({});
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    background: 'var(--bg-primary)',
    border: '1px solid var(--border-medium)',
    borderRadius: '12px',
    color: 'var(--text-main)',
    fontSize: '15px',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  };

  const labelStyle = {
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--text-secondary)',
    fontWeight: 600,
  };

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: '80px' }}>

      {/* ── HEADER ── */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)', padding: '160px 0' }}>
        <div className="wrap">
          <div className="reveal" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px', display: 'inline-block', borderLeft: '1px solid var(--border-medium)', paddingLeft: '16px' }}>
              SUBMIT YOUR APPLICATION
            </div>
            <h1 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 200, lineHeight: 1.2, marginBottom: '24px', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-main)' }}>
              Start Your <br/><span style={{ color: 'var(--text-main)', fontWeight: 400 }}>Journey Here.</span>
            </h1>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: '640px', margin: '0 auto', fontWeight: 300 }}>
              Please complete the application form below. Submitting your details directly connects you with our operations and engineering leads.
            </p>
          </div>
        </div>
      </section>

      {/* ── APPLICATION FORM ── */}
      <section style={{ padding: '80px 0 160px', background: 'var(--bg-secondary)' }}>
        <div className="wrap">
          <div className="reveal" style={{ padding: '48px', background: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-light)' }}>

            <div style={{ marginBottom: '40px' }}>
              <div style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>{formData.roleType.toUpperCase()}</div>
              <h2 style={{ fontSize: '28px', fontWeight: 300, marginBottom: '8px', color: 'var(--text-main)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {jobTitle ? `Apply for ${jobTitle}` : 'Application Form'}
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', fontWeight: 300 }}>
                {jobTitle ? `You are applying for: ${jobTitle}.` : 'Complete the form to submit your details.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={labelStyle}>Full Name</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange}
                    placeholder="e.g. Rahul Sharma" 
                    style={{ ...inputStyle, borderColor: formErrors.name ? 'var(--status-error)' : 'var(--border-medium)' }} />
                  {formErrors.name && <span style={{ color: 'var(--status-error)', fontSize: '12px' }}>{formErrors.name}</span>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={labelStyle}>Phone Number</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange}
                    placeholder="+91 9876543210" 
                    style={{ ...inputStyle, borderColor: formErrors.phone ? 'var(--status-error)' : 'var(--border-medium)' }} />
                  {formErrors.phone && <span style={{ color: 'var(--status-error)', fontSize: '12px' }}>{formErrors.phone}</span>}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={labelStyle}>Email Address</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange}
                    placeholder="rahul@example.com" 
                    style={{ ...inputStyle, borderColor: formErrors.email ? 'var(--status-error)' : 'var(--border-medium)' }} />
                  {formErrors.email && <span style={{ color: 'var(--status-error)', fontSize: '12px' }}>{formErrors.email}</span>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={labelStyle}>Application Pathway</label>
                  <select name="roleType" value={formData.roleType} onChange={handleChange} style={{ ...inputStyle, WebkitAppearance: 'none', background: 'var(--bg-secondary)' }}>
                    <option value="internship">Students / Internships</option>
                    <option value="graduate">Graduates</option>
                    <option value="professional">Experienced Professionals</option>
                  </select>
                </div>
              </div>

              {formData.roleType === 'internship' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={labelStyle}>College & Year of Study</label>
                  <input required type="text" name="qualification" value={formData.qualification} onChange={handleChange}
                    placeholder="e.g. RV College of Engineering, 3rd Year" 
                    style={{ ...inputStyle, borderColor: formErrors.qualification ? 'var(--status-error)' : 'var(--border-medium)' }} />
                  {formErrors.qualification && <span style={{ color: 'var(--status-error)', fontSize: '12px' }}>{formErrors.qualification}</span>}
                </div>
              ) : formData.roleType === 'graduate' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={labelStyle}>Degree & Graduation Year</label>
                  <input required type="text" name="qualification" value={formData.qualification} onChange={handleChange}
                    placeholder="e.g. B.E. Computer Science, Class of 2025" 
                    style={{ ...inputStyle, borderColor: formErrors.qualification ? 'var(--status-error)' : 'var(--border-medium)' }} />
                  {formErrors.qualification && <span style={{ color: 'var(--status-error)', fontSize: '12px' }}>{formErrors.qualification}</span>}
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={labelStyle}>Current / Last Job Title</label>
                    <input required type="text" name="qualification" value={formData.qualification} onChange={handleChange}
                      placeholder="e.g. Senior Network Engineer" 
                      style={{ ...inputStyle, borderColor: formErrors.qualification ? 'var(--status-error)' : 'var(--border-medium)' }} />
                    {formErrors.qualification && <span style={{ color: 'var(--status-error)', fontSize: '12px' }}>{formErrors.qualification}</span>}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={labelStyle}>Years of Experience</label>
                    <input required type="number" name="experience" value={formData.experience} onChange={handleChange}
                      placeholder="e.g. 5" min="0" 
                      style={{ ...inputStyle, borderColor: formErrors.experience ? 'var(--status-error)' : 'var(--border-medium)' }} />
                    {formErrors.experience && <span style={{ color: 'var(--status-error)', fontSize: '12px' }}>{formErrors.experience}</span>}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={labelStyle}>Upload Resume (PDF format)</label>
                <input required type="file" name="resumeFile" onChange={handleChange} accept=".pdf"
                  style={{ ...inputStyle, borderColor: formErrors.resumeFile ? 'var(--status-error)' : 'var(--border-medium)', background: 'var(--bg-secondary)', padding: '12px' }} />
                {formErrors.resumeFile && <span style={{ color: 'var(--status-error)', fontSize: '12px' }}>{formErrors.resumeFile}</span>}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={labelStyle}>Write your CV / Cover Letter</label>
                <textarea required name="coverLetter" value={formData.coverLetter} onChange={handleChange}
                  placeholder="Paste your complete CV details or write your cover letter statement here..."
                  rows="6" 
                  style={{ ...inputStyle, resize: 'vertical', borderColor: formErrors.coverLetter ? 'var(--status-error)' : 'var(--border-medium)' }} />
                {formErrors.coverLetter && <span style={{ color: 'var(--status-error)', fontSize: '12px' }}>{formErrors.coverLetter}</span>}
              </div>

              <button type="submit" style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '12px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', border: '1px solid var(--text-main)', padding: '12px 24px', borderRadius: '40px', color: 'var(--bg-primary)', background: 'var(--text-main)', transition: 'all 0.3s', marginTop: '24px', opacity: submitting ? 0.7 : 1, cursor: submitting ? 'wait' : 'pointer' }} disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>

          </div>
        </div>
      </section>

      {/* Success Modal */}
      {submitted && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(255,255,255,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ maxWidth: '400px', width: '100%', padding: '48px 32px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', background: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--bg-secondary)', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-light)' }}>
              <Check size={32} strokeWidth={1.5} />
            </div>
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: 300, marginBottom: '12px', color: 'var(--text-main)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Application Submitted</h3>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.8, fontWeight: 300 }}>Your details have been successfully logged in our recruiting database. Our talent team will evaluate your profile and reach out shortly.</p>
            </div>
            <button onClick={() => {
              setSubmitted(false);
              setFormData({ name: '', email: '', phone: '', roleType: initialType, qualification: '', experience: '', resumeFile: null, coverLetter: '' });
            }} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '12px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', border: '1px solid var(--text-main)', padding: '12px 24px', borderRadius: '40px', color: 'var(--bg-primary)', background: 'var(--text-main)', transition: 'all 0.3s', width: '100%' }}>
              Acknowledge
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
