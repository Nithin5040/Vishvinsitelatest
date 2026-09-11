import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LogoIntro from './components/LogoIntro';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Career from './pages/Career';
import Contact from './pages/Contact';
import Apply from './pages/Apply';
import HrPortal from './pages/HrPortal';
import Gallery from './pages/Gallery';
import ServiceDetail from './pages/ServiceDetail';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force immediate jump to top, overriding CSS smooth scroll that conflicts with snapping
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = '';
    }, 50);
  }, [pathname]);

  return null;
}

function App() {
  const { pathname } = useLocation();
  const [showIntro, setShowIntro] = useState(() => {
    // Show intro on initial page load / session
    return true;
  });

  // Scroll reveal observer on route change
  useEffect(() => {
    const timer = setTimeout(() => {
      const revealEls = document.querySelectorAll(
        '.reveal, .reveal-stagger, .reveal-left, .reveal-right, .reveal-scale'
      );
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.02 }
      );

      revealEls.forEach((el) => {
        el.classList.remove('in');
        observer.observe(el);
      });

      return () => observer.disconnect();
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="app-container">
      {showIntro && <LogoIntro onComplete={() => setShowIntro(false)} />}
      <ScrollToTop />
      {pathname !== '/hr-portal' && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceId" element={<ServiceDetail />} />
          <Route path="/career" element={<Career />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/hr-portal" element={<HrPortal />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
