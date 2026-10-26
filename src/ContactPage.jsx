import React, { useState, useEffect, useRef, useMemo } from 'react';
import emailjs from '@emailjs/browser';
import './ContactPage.css';
import EclipseFooter from './EclipseFooter';
import linkedinIcon from './assets/linkedin-logo.svg';

const ContactPage = () => {
    
  const formRef = useRef();
  const [status, setStatus] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [signal, setSignal] = useState(0);      // 0-4 fields filled
  const [capsule, setCapsule] = useState(null); // message flying to the moon
  const [hit, setHit] = useState(false);        // moon flash on arrival
  const moonRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    document.title = "Contact — Belinda To";
    // deep-space theme: also flips the docked orbit nav + logo to their dark styles
    document.body.classList.add('space-page', 'space-dark');
    // Trigger animations after a short delay
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => {
      clearTimeout(timer);
      document.body.classList.remove('space-page', 'space-dark');
    };
  }, []);

  // the moon's lit side turns to face your cursor
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onMove = (e) => {
      const svg = moonRef.current;
      if (!svg) return;
      const r = svg.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const len = Math.hypot(dx, dy) || 1;
      // shadow sits on the side away from the cursor
      svg.style.setProperty('--sx', `${(-dx / len) * 70}px`);
      svg.style.setProperty('--sy', `${(-dy / len) * 70}px`);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // signal strength = how many fields are filled in
  const updateSignal = () => {
    const f = formRef.current;
    if (!f) return;
    const filled = ['name', 'email', 'subject', 'message'].filter(
      (n) => f.elements[n] && f.elements[n].value.trim() !== ''
    ).length;
    setSignal(filled);
  };

  // fire a little message capsule from the Send button to the moon
  const launchCapsule = () => {
    const b = btnRef.current;
    const m = moonRef.current;
    if (!b || !m) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setHit(true);
      setTimeout(() => setHit(false), 900);
      return;
    }
    const br = b.getBoundingClientRect();
    const mr = m.getBoundingClientRect();
    const sx = br.left + br.width / 2;
    const sy = br.top + br.height / 2;
    setCapsule({
      left: sx,
      top: sy,
      dx: mr.left + mr.width / 2 - sx,
      dy: mr.top + mr.height / 2 - sy
    });
  };

  const onCapsuleDone = () => {
    setCapsule(null);
    setHit(true);
    setTimeout(() => setHit(false), 900);
  };

  // static twinkling stars (no lines)
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    launchCapsule();

    emailjs.sendForm(
      'service_ohrijej',
      'template_frntw0d',
      formRef.current,
      'AYjvBG1LmnSGFYhq-'
    )
    .then(() => {
      setStatus('success');
      setShowPopup(true);
      formRef.current.reset();
      setSignal(0);
    })
    .catch(() => {
      setStatus('error');
    });
  };

  const closePopup = () => {
    setShowPopup(false);
    setStatus('');
  };

  return (
    <div className="contact-page">
      <div className="ct-stars" aria-hidden="true">
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
        <i className="ct-shoot ct-shoot-a" />
        <i className="ct-shoot ct-shoot-b" />
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-icon">✓</div>
            <h3 className="popup-title">Transmission Received!</h3>
            <p className="popup-text">Thanks for reaching out! I'll get back to you soon.</p>
            <button className="popup-btn" onClick={closePopup}>Got it!</button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="contact-hero">
        <span className={`ct-label contact-subtitle ${loaded ? 'animate-in' : ''}`}>03 / Contact</span>
        <h1 className={`contact-title ${loaded ? 'animate-in' : ''}`}>CONTACT ME</h1>
        <p className={`contact-subtitle ${loaded ? 'animate-in' : ''}`}>I'd love to hear from you!</p>
      </section>

      {/* Main Content */}
      <section className="contact-content">
        <div className="contact-container">
          {/* Left Side - Form */}
          <div className={`contact-form-section ${loaded ? 'animate-in-left' : ''}`}>
            <h2 className="form-heading">SEND A MESSAGE</h2>
            <form ref={formRef} onSubmit={handleSubmit} onInput={updateSignal} className="contact-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">NAME</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">EMAIL</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">SUBJECT</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">MESSAGE</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  rows="6"
                  required
                />
              </div>

              <button ref={btnRef} type="submit" className="form-submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Send'}
              </button>

              {status === 'error' && (
                <p className="form-status error">Oops! Something went wrong. Please try again.</p>
              )}
            </form>
          </div>

          {/* Divider */}
          <div className={`contact-divider ${loaded ? 'animate-in' : ''}`}>
            <span className="divider-text">OR</span>
            <div className="divider-line"></div>
          </div>

          {/* Right Side - Direct Contact */}
          <div className={`contact-direct-section ${loaded ? 'animate-in-right' : ''}`}>
            <div className="contact-links">
              <a href="https://www.linkedin.com/in/belinda-to1" target="_blank" rel="noopener noreferrer" className="contact-link contact-link-linkedin">
                <span className="contact-icon-wrap"><img src={linkedinIcon} alt="LinkedIn" className="contact-icon" /></span>
                <span className="contact-link-text">LinkedIn</span>
                <span className="contact-arrow" aria-hidden="true">→</span>
              </a>
            </div>

            {/* Line-art moon, "transmitting" to you */}
            <div className="contact-image-placeholder">
              <svg
                ref={moonRef}
                className={`ct-moon ct-lvl-${signal} ${hit ? 'ct-hit' : ''}`}
                viewBox="0 0 400 400"
                aria-hidden="true"
              >
                <defs>
                  <clipPath id="ct-moon-clip">
                    <circle cx="200" cy="200" r="105" />
                  </clipPath>
                </defs>
                {/* signal rings */}
                <circle cx="200" cy="200" r="120" className="ct-ping ct-ping-1" />
                <circle cx="200" cy="200" r="120" className="ct-ping ct-ping-2" />
                <circle cx="200" cy="200" r="120" className="ct-ping ct-ping-3" />

                {/* dashed orbit + satellites */}
                <circle cx="200" cy="200" r="175" className="ct-orbit" />
                <g className="ct-spin ct-spin-a">
                  <circle cx="200" cy="25" r="10" className="ct-sat ct-sat-yellow" />
                </g>
                <g className="ct-spin ct-spin-b">
                  <circle cx="375" cy="200" r="7" className="ct-sat ct-sat-red" />
                </g>
                <g className="ct-spin ct-spin-c">
                  <circle cx="75" cy="323" r="6" className="ct-sat ct-sat-blue" />
                </g>

                {/* the moon */}
                <g className="ct-moon-body">
                  <circle cx="200" cy="200" r="105" className="ct-moon-disc" />
                  <g clipPath="url(#ct-moon-clip)">
                    <circle cx="200" cy="200" r="105" className="ct-shade" />
                  </g>
                  <circle cx="160" cy="165" r="22" className="ct-crater" />
                  <circle cx="238" cy="150" r="12" className="ct-crater" />
                  <circle cx="245" cy="225" r="28" className="ct-crater" />
                  <circle cx="175" cy="248" r="14" className="ct-crater" />
                  <circle cx="210" cy="108" r="7" className="ct-crater" />
                  <circle cx="132" cy="215" r="8" className="ct-crater" />
                  <circle cx="245" cy="225" r="9" className="ct-crater-dot" />
                </g>
              </svg>
            </div>

            <div className="ct-signal" aria-live="polite">
              <div className="ct-bars" aria-hidden="true">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className={`ct-bar ct-bar-${i} ${signal > i ? 'on' : ''}`} />
                ))}
              </div>
              <span className="ct-signal-text">
                {signal === 0 && 'AWAITING TRANSMISSION'}
                {signal > 0 && signal < 4 && `LOCKING ON... ${signal}/4`}
                {signal === 4 && 'SIGNAL LOCKED. READY TO SEND'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {capsule && (
        <div
          className="ct-capsule-x"
          style={{ left: capsule.left, top: capsule.top, '--dx': capsule.dx + 'px', '--dy': capsule.dy + 'px' }}
          onAnimationEnd={onCapsuleDone}
        >
          <div className="ct-capsule-y">
            <span className="ct-capsule" />
          </div>
        </div>
      )}

      {/* Footer */}
      <EclipseFooter />
    </div>
  );
};

export default ContactPage;