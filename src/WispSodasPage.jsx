import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WispSodasPage.css';
import EclipseFooter from './EclipseFooter';
import soda1 from './images/Soda1.png';
import soda2 from './images/Soda2.png';
import soda3 from './images/Soda3.png';
import canmockup from './images/canmockup.png';
import canmockup2 from './images/canmockup-2.png';
import stackedCans from './images/stacked-cans.png';
import canSky from './images/cansky.png';
import twoCans from './images/2cans.png';

const sec = (n, i) => <span className={`sec-num sec-${['red', 'yellow', 'blue'][i % 3]}`}>{n}</span>;

const FLAVOURS = [
  { name: 'Ember Peach', src: soda1, c: '#ff5a52' },
  { name: 'Lychee Tide', src: soda2, c: '#6f94ff' },
  { name: 'Pear Dew', src: soda3, c: '#f2b705' }
];

const WispSodasPage = () => {
  const navigate = useNavigate();
  const projectTab = 'graphic'; // This project belongs to GRAPHIC tab
  const pageRef = useRef(null);
  const [flavour, setFlavour] = useState(0);

  useEffect(() => {
    document.title = 'Wisp Sodas — Belinda To';
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

  // fizz: line-art bubbles drifting up through the intro
  const bubbles = useMemo(
    () =>
      Array.from({ length: 16 }, () => ({
        x: Math.random() * 100,
        size: 10 + Math.random() * 34,
        delay: -Math.random() * 14,
        dur: 9 + Math.random() * 9,
        sway: (Math.random() > 0.5 ? 1 : -1) * (14 + Math.random() * 26)
      })),
    []
  );

  // scroll-in reveal
  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const blocks = root.querySelectorAll('section > div > *');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('ws-in');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    blocks.forEach((el) => {
      el.classList.add('ws-reveal');
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // intro mockup tilts toward the cursor
  const tilt = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--rx', `${(-py * 8).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${(px * 10).toFixed(2)}deg`);
  };
  const untilt = (e) => {
    e.currentTarget.style.setProperty('--rx', '0deg');
    e.currentTarget.style.setProperty('--ry', '0deg');
  };

  const current = FLAVOURS[flavour];

  return (
    <div className="wisp-sodas-page" ref={pageRef}>
      <div className="ws-stars" aria-hidden="true">
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
        <i className="ws-shoot ws-shoot-a" />
        <i className="ws-shoot ws-shoot-b" />
      </div>

      {/* BACK ARROW */}
      <button className="back-arrow" onClick={() => navigate(`/projects?tab=${projectTab}`)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* INTRO SECTION */}
      <section className="wisp-intro-section">
        <div className="ws-bubbles" aria-hidden="true">
          {bubbles.map((b, k) => (
            <span
              key={k}
              style={{
                left: b.x + '%',
                width: b.size,
                height: b.size,
                animationDelay: b.delay + 's',
                animationDuration: b.dur + 's',
                '--sway': b.sway + 'px'
              }}
            />
          ))}
        </div>

        <div className="wisp-content">
          <div className="wisp-text">
            <h1 className="wisp-title">
              WISP<br />SODAS
            </h1>
            <div className="wisp-info-group">
              <p className="wisp-software">SOFTWARE</p>
              <p className="wisp-tools">ADOBE ILLUSTRATOR, ADOBE PHOTOSHOP</p>
            </div>
          </div>

          <div className="wisp-image-wrap" onMouseMove={tilt} onMouseLeave={untilt}>
            <div className="wisp-image">
              <img src={canmockup} alt="Wisp Sodas Cans" />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT WISP SECTION */}
      <section className="wisp-about-section">
        <div className="ws-about-content">
          <div className="ws-about-image">
            <img src={canmockup2} alt="Wisp Sodas Cans Mockup" />
          </div>

          <div className="ws-about-text">
            <p className="ws-section-label">ABOUT WISP</p>

            <p className="ws-about-paragraph">
              Wisp is a soda brand created to bring a little magic back into everyday life. With so many drinks starting to feel the same, Wisp leans into nostalgia, comfort, and small moments of joy. Built as a sub-brand within the world of Studio Ghibli, it focuses on warmth and wonder rather than trends.
            </p>

            <p className="ws-about-paragraph">
              The brand uses light gradients and nature-inspired colours to give each flavour its own personality while still feeling like part of the same family. Everything is designed to feel gentle, cozy, and a bit whimsical. Wisp is meant to feel like more than just a drink. It is a small, comforting pause in the middle of a busy day.
            </p>
          </div>
        </div>
      </section>

      {/* LABELS SECTION */}
      <section className="wisp-labels-section">
        <div className="ws-labels-container">
          <p className="ws-section-label">{sec('02', 1)} – THE FLAVOURS</p>

          <div className="ws-flavours" style={{ '--c': current.c }}>
            <div className="ws-flavour-tabs" role="tablist" aria-label="Flavour">
              {FLAVOURS.map((f, i) => (
                <button
                  key={f.name}
                  role="tab"
                  aria-selected={i === flavour}
                  className={`ws-flavour-tab ${i === flavour ? 'on' : ''}`}
                  style={{ '--tc': f.c }}
                  onClick={() => setFlavour(i)}
                >
                  <span className="ws-flavour-dot" />
                  {f.name}
                </button>
              ))}
            </div>

            <div className="ws-flavour-stage">
              {FLAVOURS.map((f, i) => (
                <img
                  key={f.name}
                  src={f.src}
                  alt={`${f.name} Label`}
                  className={i === flavour ? 'show' : ''}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MOCKUPS SECTION */}
      <section className="wisp-mockups-section">
        <div className="ws-mockups-container">
          <p className="ws-section-label">{sec('03', 2)} – MOCKUPS</p>

          <div className="ws-mockups-grid">
            <div className="ws-mockup-large">
              <img src={stackedCans} alt="Stacked Wisp Soda Cans" />
            </div>

            <div className="ws-mockup-small-container">
              <div className="ws-mockup-small ws-mockup-wide">
                <img src={twoCans} alt="Two Wisp Soda Cans" />
              </div>
              <div className="ws-mockup-small ws-mockup-fill">
                <img src={canSky} alt="Wisp Soda Can with Sky" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <EclipseFooter />
    </div>
  );
};

export default WispSodasPage;