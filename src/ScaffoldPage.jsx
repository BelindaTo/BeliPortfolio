import React, { useEffect, useMemo, useRef, useState } from 'react';
import './ScaffoldPage.css';
import EclipseFooter from './EclipseFooter';
import constructionWorker from './images/construction-worker_1.png';
import moneyGrant from './images/money-grant_1.png';
import scaffoldPhone from './images/scaffold-phone.png';
import scaffoldMain from './images/scaffold-main.png';
import talia from './images/talia.png';
import lofi from './images/lofi.png';
import midfi from './images/midfi.png';
import hifi from './images/hi-fi.png';
import styleguide from './images/styleguide.png';
import userFlow from './images/user-flow.png';
import logo1 from './images/logo1.png';
import logo2 from './images/logo2.png';
import scaffold1 from './images/Scaffold-1.jpg';
import scaffold2 from './images/Scaffold-2.jpg';
import scaffold3 from './images/Scaffold-3.jpg';
import smartProfile from './images/smart-profile.png';
import checker from './images/checker.png';
import aiAssist from './images/ai-assist.png';
import scaffoldApplication from './images/scaffold-application.mp4';
import scaffoldLaptop from './images/scaffold-laptop.mp4';
import coloursImg from './images/Colours.png';
import typographyImg from './images/Typography.png';
import banner from './images/banner.png';
import stickers from './images/stickers.png';
import scaffoldBrochure from './images/scaffold-brochure.png';
import tableSign from './images/table-sign.png';
import businessCard from './images/business-card.png';
import per1 from './images/per1.png';
import per2 from './images/per2.png';



// Stat card: ring draws itself and the number counts up when scrolled into view
const StatCard = ({ value, label, className }) => {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setOn(true);
        if (reduce) { setN(value); return; }
        const start = performance.now();
        const DURATION = 1500;
        const tick = (now) => {
          const t = Math.min(1, (now - start) / DURATION);
          setN(Math.round((1 - Math.pow(1 - t, 3)) * value));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <div ref={ref} className={`scaffold-stat-card ${className}`}>
      <div className="stat-ring-wrap">
        <svg className="stat-ring" viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="54" className="stat-ring-bg" />
          <circle
            cx="60"
            cy="60"
            r="54"
            pathLength="1"
            className="stat-ring-fg"
            style={{ strokeDashoffset: on ? 1 - value / 100 : 1 }}
          />
        </svg>
        <span className="stat-number">{n}%</span>
      </div>
      <span className="stat-label">{label}</span>
    </div>
  );
};

// Side navigation: a little flight path of dots that tracks where you are
const NAV_SECTIONS = [
  ['scaffold-intro-section', 'Intro'],
  ['scaffold-whats-section', "What's Scaffold"],
  ['scaffold-problem-section', 'Problem'],
  ['scaffold-features-section', 'Core features'],
  ['scaffold-research-section', 'Research'],
  ['scaffold-insights-section', 'User insights'],
  ['scaffold-userflow-section', 'User flow'],
  ['scaffold-design-section', 'Design process'],
  ['scaffold-wireframes-section', 'Wireframes'],
  ['scaffold-howitworks-section', 'How it works'],
  ['scaffold-promo-section', 'Promo material'],
  ['scaffold-outcome-section', 'Outcome']
];
const NAV_COLORS = ['#ff5a52', '#f2b705', '#6f94ff'];

const SectionNav = () => {
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const els = NAV_SECTIONS.map(([cls]) => document.querySelector(`.${cls}`));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          const i = els.indexOf(en.target);
          if (i === -1) return;
          if (en.isIntersecting) setActive(i);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (i) => {
    const el = document.querySelector(`.${NAV_SECTIONS[i][0]}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="sp-nav" aria-label="Case study sections">
      {NAV_SECTIONS.map(([, label], i) => (
        <button
          key={label}
          className={`sp-nav-item ${i === active ? 'active' : ''} ${i < active ? 'passed' : ''}`}
          style={{ '--c': NAV_COLORS[i % 3] }}
          onClick={() => go(i)}
          aria-label={label}
        >
          <span className="sp-nav-label">{label}</span>
          <span className="sp-nav-dot" />
        </button>
      ))}
    </nav>
  );
};

const ScaffoldPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [activePersona, setActivePersona] = useState(0);

  const personas = [per1, per2];

  const pageRef = useRef(null);

  // phones tilt toward the cursor
  const tilt = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--rx', `${(-py * 12).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${(px * 14).toFixed(2)}deg`);
  };
  const untilt = (e) => {
    e.currentTarget.style.setProperty('--rx', '0deg');
    e.currentTarget.style.setProperty('--ry', '0deg');
  };

  useEffect(() => {
    document.title = "Scaffold — Belinda To";
    // deep-space theme: also flips the docked orbit nav + logo to their dark styles
    document.body.classList.add('space-page', 'space-dark');
    return () => document.body.classList.remove('space-page', 'space-dark');
  }, []);

  // twinkling stars (no lines)
  const stars = useMemo(
    () =>
      Array.from({ length: 90 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 5,
        dur: 2.5 + Math.random() * 3.5
      })),
    []
  );

  // scroll-in reveal for the main blocks of every section
  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const blocks = root.querySelectorAll(
      'section > div > *, section > .scaffold-feature-row, section > .scaffold-features-header'
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('sp-in');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    blocks.forEach((el) => {
      el.classList.add('sp-reveal');
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage('');
  };

  const handleModalClick = (e) => {
    if (e.target.className === 'persona-modal') {
      closeModal();
    }
  };

  // Close modal with Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && modalOpen) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [modalOpen]);

  return (
    <div className="scaffold-page" ref={pageRef}>
      <SectionNav />

      <div className="sp-stars" aria-hidden="true">
        {stars.map((st, k) => (
          <span
            key={k}
            style={{
              left: st.x + '%',
              top: st.y + '%',
              width: st.size,
              height: st.size,
              animationDelay: st.delay + 's',
              animationDuration: st.dur + 's'
            }}
          />
        ))}
        <i className="sp-shoot sp-shoot-a" />
        <i className="sp-shoot sp-shoot-b" />
      </div>

      {/* BACK ARROW */}
      <button className="back-arrow" onClick={() => window.history.back()}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* INTRO SECTION */}
      <section className="scaffold-intro-section">
        <div className="scaffold-intro-content">
          <div className="scaffold-intro-text">
            <h1 className="scaffold-title">SCAFFOLD</h1>
            
            <div className="scaffold-info-group">
              <p className="scaffold-label">ROLES</p>
              <p className="scaffold-value">LEAD DESIGNER / GRAPHIC DESIGNER</p>
            </div>
            
            <div className="scaffold-info-group">
              <p className="scaffold-label">SKILLS</p>
              <p className="scaffold-value">UX/UI DESIGN, FRONT-END DEVELOPMENT, GRAPHIC DESIGN</p>
            </div>
            
            <div className="scaffold-info-group">
              <p className="scaffold-label">TIMELINE</p>
              <p className="scaffold-value">3 MONTHS</p>
            </div>
            
            <div className="scaffold-btn-group">
  <button 
    className="scaffold-btn" 
    onClick={() => window.open('https://www.figma.com/proto/Hkbo33gLzuQ4EbrgS5urfF/UI-design?node-id=1878-6366&t=SCeP6zD7s9SX9six-1&scaling=scale-down&content-scaling=fixed&page-id=1878%3A3978&starting-point-node-id=1878%3A6387', '_blank')}
  >
    View Prototype
  </button>
  
  <button 
    className="scaffold-btn scaffold-btn-secondary" 
    onClick={() => window.open('https://scaffold-self-eta.vercel.app/', '_blank')}
  >
    View App
  </button>
</div>
          </div>
          
          <div className="scaffold-intro-image">
            <img src={scaffoldMain} alt="Scaffold App" />
          </div>
        </div>
      </section>

      {/* 01 - WHAT'S SCAFFOLD SECTION */}
      <section className="scaffold-whats-section">
        <div className="scaffold-whats-content">
          <div className="scaffold-whats-text">
            <p className="scaffold-section-label"><span className="sec-num sec-red">01</span> – WHAT'S SCAFFOLD?</p>
            
            <h2 className="scaffold-whats-title">
              AN <span className="highlight-italic">AI-POWERED</span> GRANT APP THAT CHECKS ELIGIBILITY AND ASSISTS WITH APPLICATIONS FOR APPRENTICES
            </h2>
            
            <p className="scaffold-whats-paragraph">
              Scaffold helps apprentices and tradespeople discover grants they're actually eligible for and guides them through the application process step by step.
            </p>
            
            <p className="scaffold-whats-paragraph">
              Instead of navigating confusing government websites and paperwork, users receive personalized funding recommendations in one clear, accessible experience.
            </p>
          </div>
          
          <div className="scaffold-whats-images">
            <img src={constructionWorker} alt="Construction Worker" className="scaffold-worker-img" />
            <img src={moneyGrant} alt="Grant Document" className="scaffold-grant-img" />
          </div>
        </div>
      </section>

      {/* 02 - PROBLEM SECTION */}
      <section className="scaffold-problem-section">
        <div className="scaffold-problem-content">
          <p className="scaffold-section-label"><span className="sec-num sec-yellow">02</span> – PROBLEM</p>
          
          <div className="scaffold-problem-layout">
            <div className="scaffold-stats-container">
              <StatCard className="stat-blue" value={33} label="of eligible apprentices apply" />
              <StatCard className="stat-navy" value={66} label="gain awareness post deadline" />
            </div>
            
            <div className="scaffold-problem-text">
              <div className="scaffold-problem-block">
                <h3 className="scaffold-problem-title">THE DECLINE IN TRADES WORKERS</h3>
                <p className="scaffold-problem-paragraph">
                  Many apprentices struggle to access financial support due to confusing eligibility requirements and complex application systems. Limited time, long workdays, and unclear information cause many to miss out on funding entirely.
                </p>
              </div>
              
              <div className="scaffold-problem-block">
                <h3 className="scaffold-problem-title solution">HOW SCAFFOLD HELPS SOLVE THIS</h3>
                <p className="scaffold-problem-paragraph">
                  Scaffold simplifies access to grants by checking eligibility upfront and guiding users through applications step by step. Clear language and structured flows reduce friction, making funding easier to understand and complete.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 - CORE FEATURES SECTION */}
      <section className="scaffold-features-section">
        <div className="scaffold-features-header">
          <p className="scaffold-section-label"><span className="sec-num sec-blue">03</span> – CORE FEATURES</p>
          <h2 className="scaffold-features-title">
            TO ADDRESS THIS CHALLENGE, SCAFFOLD IS BUILT<br />
            AROUND <span className="highlight-italic">THREE CORE FEATURES.</span>
          </h2>
        </div>

        {/* Feature 01 */}
        <div className="scaffold-feature-row">
          <div className="scaffold-feature-phone" onMouseMove={tilt} onMouseLeave={untilt}>
            <img src={smartProfile} alt="Smart Profile Feature" />
          </div>
          <div className="scaffold-feature-text">
            <p className="scaffold-feature-number">01</p>
            <h3 className="scaffold-feature-name">SMART PROFILE</h3>
            <p className="scaffold-feature-description">
Smart Profile gathers the key information required for most trade grants in one place.
Users can upload a document to automatically fill their profile, then easily edit or update details using manual or voice input.<br />
Once complete, the profile enables faster eligibility checks and pre-filled applications.</p>
          </div>
        </div>

        {/* Feature 02 */}
        <div className="scaffold-feature-row">
          <div className="scaffold-feature-text">
            <p className="scaffold-feature-number">02</p>
            <h3 className="scaffold-feature-name">ELIGIBILITY CHECKER</h3>
            <p className="scaffold-feature-description">
              Before users invest time in an application, Scaffold checks whether they qualify. Clear feedback helps users understand what they're eligible for and why, reducing frustration and wasted effort.
            </p>
          </div>
          <div className="scaffold-feature-phone" onMouseMove={tilt} onMouseLeave={untilt}>
            <img src={checker} alt="Eligibility Checker Feature" />
          </div>
        </div>

        {/* Feature 03 */}
        <div className="scaffold-feature-row">
          <div className="scaffold-feature-phone" onMouseMove={tilt} onMouseLeave={untilt}>
            <img src={aiAssist} alt="AI Application Assistant Feature" />
          </div>
          <div className="scaffold-feature-text">
            <p className="scaffold-feature-number">03</p>
            <h3 className="scaffold-feature-name">AI APPLICATION ASSISTANT</h3>
            <p className="scaffold-feature-description">
Application Generator cross-checks your profile with grant requirements to automatically create a tailored application.
A built-in progress tracker guides users step by step, outlining required documents and next actions.<br />
Once eligible, Scaffold generates a complete application template and can assist with longer written responses when needed.            </p>
          </div>
        </div>
      </section>

      {/* 03 - RESEARCH AND ANALYSIS SECTION */}
      <section className="scaffold-research-section">
        <div className="scaffold-research-content">
          <p className="scaffold-section-label"><span className="sec-num sec-red">03</span> – RESEARCH AND ANALYSIS</p>
          
          <div className="scaffold-research-block">
            <h3 className="scaffold-research-subtitle">BARRIERS TO ENTRY AND PARTICIPATION</h3>
            <p className="scaffold-research-paragraph">
              Research from SkilledTradesBC's 2023/24 and 2024/25 service plans shows that women and gender-diverse people still face major barriers when trying to enter the skilled trades. Women make up only 5% of the workforce, and many report a lack of mentors, role models, networks, and clear access to resources throughout the apprenticeship journey. Recent data also revealed a 36.98% drop in new women apprenticeship registrations in under-represented trades and a slight decline in overall representation. This decrease is partly connected to the end of the Canadian Apprenticeship Service grant, which had encouraged employers to hire apprentices from equity-deserving groups.
            </p>
          </div>
          
          <div className="scaffold-research-block">
            <h3 className="scaffold-research-subtitle highlight">TRAINING EXPERIENCE AND OPPORTUNITY</h3>
            <p className="scaffold-research-paragraph">
While classroom training environments are improving, workplace experiences are not always consistent. More women report that technical training feels free from discrimination, but confidence in on-the-job training has slightly declined. This suggests that support often fades once apprentices enter the workforce. These findings highlighted a clear need for better access to information, simpler application processes, and ongoing support across the entire apprenticeship journey, which directly informed the development of Scaffold.            </p>
          </div>
        </div>
      </section>

      {/* 04 - USER INSIGHTS SECTION */}
      <section className="scaffold-insights-section">
        <div className="scaffold-insights-content">
          <p className="scaffold-section-label"><span className="sec-num sec-yellow">04</span> – USER INSIGHTS</p>
          {/* Left Column - Insights */}
          <div className="scaffold-insights-left">
            <h3 className="scaffold-insights-subtitle">WHO SCAFFOLD DESIGNED FOR</h3>
            <p className="scaffold-insights-paragraph">
              Scaffold was designed for apprentices and early-career tradespeople juggling work, training, and limited time often navigating funding systems not built for them.
            </p>
            
            <h3 className="scaffold-insights-subtitle highlight">KEY INSIGHTS</h3>
            
            <div className="scaffold-insight-block">
              <p className="scaffold-insight-title">Insight 01 — Time is the biggest constraint</p>
              <p className="scaffold-insight-text">
                Apprentices don't lack motivation they lack time and energy after long workdays.
              </p>
              <p className="scaffold-design-response">→ Design Response:</p>
              <p className="scaffold-design-response-text">
                Applications were broken into short, manageable steps with visible progress.
              </p>
            </div>
            
            <div className="scaffold-insight-block">
              <p className="scaffold-insight-title">Insight 02 — Eligibility uncertainty causes drop-off</p>
              <p className="scaffold-insight-text">
                Users abandon applications when they're unsure whether a grant applies to them.
              </p>
              <p className="scaffold-design-response">→ Design Response:</p>
              <p className="scaffold-design-response-text">
                Scaffold checks eligibility first before surfacing grants.
              </p>
            </div>
            
            <div className="scaffold-insight-block">
              <p className="scaffold-insight-title">Insight 03 — Language creates intimidation</p>
              <p className="scaffold-insight-text">
                Government terminology discourages users from even starting.
              </p>
              <p className="scaffold-design-response">→ Design Response:</p>
              <p className="scaffold-design-response-text">
                Plain language, friendly tone, and clear explanations were prioritized throughout the interface.
              </p>
            </div>
          </div>
          
          {/* Right Column - Personas Carousel */}
          <div className="scaffold-insights-right">
            <div className="scaffold-personas-container">
              <div className="persona-carousel">
                <img
                  src={personas[activePersona]}
                  alt={`Persona ${activePersona + 1}`}
                  className="scaffold-persona-image"
                  onClick={() => handleImageClick(personas[activePersona])}
                />
                <div className="persona-carousel-controls">
                  <button
                    className="persona-carousel-btn"
                    onClick={() => setActivePersona((prev) => (prev - 1 + personas.length) % personas.length)}
                    aria-label="Previous persona"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <div className="persona-carousel-dots">
                    {personas.map((_, i) => (
                      <button
                        key={i}
                        className={`persona-dot ${activePersona === i ? 'active' : ''}`}
                        onClick={() => setActivePersona(i)}
                        aria-label={`Go to persona ${i + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    className="persona-carousel-btn"
                    onClick={() => setActivePersona((prev) => (prev + 1) % personas.length)}
                    aria-label="Next persona"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for zoomed persona images */}
      {modalOpen && (
        <div 
          className="persona-modal"
          style={{ display: 'flex' }}
          onClick={handleModalClick}
        >
          <span className="persona-modal-close" onClick={closeModal}>&times;</span>
          <img 
            className="persona-modal-content" 
            src={selectedImage} 
            alt="Zoomed persona" 
          />
        </div>
      )}

      {/* USER FLOW SECTION */}
      <section className="scaffold-userflow-section">
        <div className="scaffold-userflow-content">
          <h2 className="scaffold-userflow-title">USER FLOW</h2>
          <div className="scaffold-userflow-image">
            <img 
              src={userFlow} 
              alt="Scaffold User Flow"
              onClick={() => handleImageClick(userFlow)}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>
      </section>


      {/* 05 - DESIGN PROCESSES SECTION */}
      <section className="scaffold-design-section">
        <div className="scaffold-design-content">
          <h2 className="scaffold-design-title"><span className="sec-num sec-blue">05</span> – DESIGN PROCESSES</h2>
          
          <p className="scaffold-design-paragraph">
            Scaffold's design reduces cognitive load by guiding users through complex funding processes with simple language and a mobile-first experience. Applications are broken into manageable steps and only relevant information is shown, helping busy apprentices move forward with confidence.
          </p>
          
          {/* STYLEGUIDE */}
          <h3 className="scaffold-styleguide-header">STYLEGUIDE</h3>
          
          <div className="scaffold-styleguide-grid">
            {/* Colours Column */}
            <div className="scaffold-styleguide-column">
              <h4 className="scaffold-styleguide-subtitle">COLOURS</h4>
              <p className="scaffold-styleguide-text">
                Bright purple and safety orange balance approachability with energy, combining trust and creativity with the universally recognizable colour of trades and construction.
              </p>
              <div className="scaffold-colours-image">
                <img src={coloursImg} alt="Scaffold Colour Palette" />
              </div>
            </div>
            
            {/* Typography Column */}
            <div className="scaffold-styleguide-column">
              <h4 className="scaffold-styleguide-subtitle">TYPOGRAPHY</h4>
              <p className="scaffold-styleguide-text">
                Akira Expanded communicates strength and structure for headlines, while Montserrat keeps body text clean, modern, and easy to read across screens.
              </p>
              <div className="scaffold-typography-image">
                <img src={typographyImg} alt="Scaffold Typography" />
              </div>
            </div>
          </div>
          
          {/* LOGO */}
          <h3 className="scaffold-styleguide-header logo-header">LOGO</h3>
          
          <div className="scaffold-logo-grid">
            <div className="scaffold-logo-description">
              <p className="scaffold-logo-paragraph">
                The Scaffold logo combines a stylized "S" made of interlocking bars, representing the layered structure of scaffolding and the step-by-step support the app provides. The rounded container shape keeps the mark approachable and app-friendly, while the orange and purple color scheme ties it back to the brand identity.
              </p>
              <p className="scaffold-logo-paragraph">
                Two versions were developed: a standalone icon for app use and compact spaces, and a lockup with the wordmark for broader brand applications.
              </p>
            </div>
            
            <div className="scaffold-logo-display">
              <div className="scaffold-logo-item">
                <img src={logo1} alt="Scaffold Logo Icon" className="scaffold-logo-icon" />
              </div>
              <div className="scaffold-logo-item">
                <img src={logo2} alt="Scaffold Logo with Wordmark" className="scaffold-logo-wordmark" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WIREFRAMES ================= */}
      <section className="scaffold-wireframes-section">
        <div className="scaffold-wireframes-content">
          <h2 className="scaffold-section-title">WIREFRAMES</h2>

          {/* fidelity row */}
          <div className="scaffold-fidelity-container">
            <div className="scaffold-fidelity-item">
              <img src={lofi} alt="Low-Fi Wireframe" className="scaffold-fidelity-img" />
              <p className="scaffold-fidelity-label">Low-Fi</p>
            </div>
            
            <div className="scaffold-fidelity-item">
              <img src={midfi} alt="Mid-Fi Wireframe" className="scaffold-fidelity-img" />
              <p className="scaffold-fidelity-label">Mid-Fi</p>
            </div>
            
            <div className="scaffold-fidelity-item">
              <img src={hifi} alt="Hi-Fi Design" className="scaffold-fidelity-img" />
              <p className="scaffold-fidelity-label">Hi-Fi</p>
            </div>
          </div>

          {/* figma embed */}
          <div className="scaffold-figma-embed">
            <iframe
              src="https://embed.figma.com/design/Hkbo33gLzuQ4EbrgS5urfF/UI-design?node-id=1878-3978&embed-host=share"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* 06 - HOW IT WORKS SECTION */}
      <section className="scaffold-howitworks-section">
        <div className="scaffold-howitworks-content">
          <p className="scaffold-section-label"><span className="sec-num sec-red">06</span> – HOW IT WORKS</p>
          
          <p className="scaffold-howitworks-paragraph">
Scaffold is designed as a mobile-first experience, with a focused web supplement for applications.
Users complete their profile, eligibility checks, and grant discovery directly in the mobile app. When it's time to apply, they can seamlessly switch to desktop if preferred. The web supplement is intentionally limited to the application stage only, allowing users to copy and paste their pre-filled information from the app into grant forms. This flexible setup supports both on-the-go use and longer, more detailed application workflows without duplicating features or disrupting the user experience.    </p>
          
          <div className="scaffold-howitworks-demos">
            <div className="scaffold-demo-block">
              <h3 className="scaffold-demo-title">MOBILE APP</h3>
              <div className="scaffold-demo-phone">
                <video 
                  className="scaffold-demo-video"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                >
                  <source src={scaffoldApplication} type="video/mp4" />
                </video>
              </div>
            </div>
            
            <div className="scaffold-demo-block">
              <h3 className="scaffold-demo-title">WEB SUPPLEMENT</h3>
              <div className="scaffold-demo-web">
                <video 
                  className="scaffold-demo-laptop-video"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                >
                  <source src={scaffoldLaptop} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* 07 - PROMOTIONAL MATERIAL SECTION */}
      <section className="scaffold-promo-section">
        <div className="scaffold-promo-content">
          <p className="scaffold-section-label"><span className="sec-num sec-yellow">07</span> – PROMOTIONAL MATERIAL</p>
           <div className="scaffold-promo-full">
            <img src={banner} alt="Scaffold Promotional Banner" />
            <span className="promo-label">Promotional Banner</span>
          </div>
          <div className="scaffold-promo-grid">
            <div className="scaffold-promo-item promo-large">
              <img src={stickers} alt="Scaffold Stickers" />
              <span className="promo-label">Stickers</span>
            </div>
            <div className="scaffold-promo-item promo-small">
              <img src={tableSign} alt="Scaffold Table Sign" />
              <span className="promo-label">Table Sign</span>
            </div>
            <div className="scaffold-promo-item promo-tall">
              <img src={businessCard} alt="Scaffold Business Card" />
              <span className="promo-label">Business Card</span>
            </div>
            <div className="scaffold-promo-item promo-medium">
              <img src={scaffoldBrochure} alt="Scaffold Brochure" />
              <span className="promo-label">Brochure</span>
            </div>
          </div>
          
          <div className="scaffold-promo-video">
            <h3 className="scaffold-promo-video-title">PROMOTIONAL VIDEO</h3>
            <div className="scaffold-promo-video-container">
              <iframe
                src="https://www.youtube.com/embed/gHZ8CcOKJxo"
                title="Scaffold Promotional Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* 08 - OUTCOME SECTION */}
      <section className="scaffold-outcome-section">
        <div className="scaffold-outcome-content">
          <p className="scaffold-section-label"><span className="sec-num sec-blue">08</span> – OUTCOME</p>
          
          <div className="scaffold-outcome-header">
            <h2 className="scaffold-outcome-title">TEAM SCAFFOLD PLACED</h2>
            <p className="scaffold-outcome-place">3RD</p>
            <p className="scaffold-outcome-event">at BCIT's D3 and FSWD x ConnectHer Technology Showcase</p>
          </div>
          
          <p className="scaffold-outcome-paragraph">
            With over 100+ attendees, with 260+ votes, Team Scaffold placed 3rd out of 10 teams at the showcase! What a true pleasure to be working with such wonderful people.
          </p>
          
          <div className="scaffold-outcome-grid">
            <div className="scaffold-outcome-img outcome-large">
              <img src={scaffold1} alt="Scaffold Image 1" />
            </div>
            <div className="scaffold-outcome-img outcome-small">
              <img src={scaffold2} alt="Scaffold Image 2" />
            </div>
            <div className="scaffold-outcome-img outcome-tall">
              <img src={scaffold3} alt="Scaffold Image 3" />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <EclipseFooter />
    </div>
  );
};

export default ScaffoldPage;