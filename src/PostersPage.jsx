import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostersPage.css';
import EclipseFooter from './EclipseFooter';
import posterMain from './images/poster-main.png';
import original from './images/original.png';
import poster1 from './images/Concept 1.png';
import poster2 from './images/Concept 2.png';
import poster3 from './images/Concept 3.png';
import strawberryPoster from './images/strawberry-poster.png';
import matchaPoster from './images/matcha-poster.png';
import originalPoster from './images/original-poster.png';

const sec = (n, i) => <span className={`sec-num sec-${['red', 'yellow', 'blue'][i % 3]}`}>{n}</span>;

const POSTERS = [
  { name: 'Croissant', src: poster1, alt: 'Fluff & Flour Croissant Poster', c: '#f2b705' },
  { name: 'Matcha', src: poster2, alt: 'Fluff & Flour Matcha Poster', c: '#6f94ff' },
  { name: 'Strawberry', src: poster3, alt: 'Fluff & Flour Strawberry Poster', c: '#ff5a52' }
];

const PostersPage = () => {
  const navigate = useNavigate();
  const projectTab = 'graphic';
  const pageRef = useRef(null);
  const [open, setOpen] = useState(null); // index of poster in the lightbox
  const [puffs, setPuffs] = useState([]); // flour puffs from clicking the intro
  const puffId = useRef(0);

  const makePuff = (e) => {
    if (e.target.closest('button, a')) return;
    const r = e.currentTarget.getBoundingClientRect();
    const id = ++puffId.current;
    const bits = Array.from({ length: 16 }, (_, k) => {
      const a = (k / 16) * Math.PI * 2 + Math.random() * 0.4;
      const d = 40 + Math.random() * 70;
      return { dx: Math.cos(a) * d, dy: Math.sin(a) * d - 20, s: 3 + Math.random() * 6 };
    });
    setPuffs((p) => [...p.slice(-5), { id, x: e.clientX - r.left, y: e.clientY - r.top, bits }]);
    setTimeout(() => setPuffs((p) => p.filter((q) => q.id !== id)), 1300);
  };

  useEffect(() => {
    document.title = 'Posters — Belinda To';
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

  // flour dust drifting down through the intro
  const flour = useMemo(
    () =>
      Array.from({ length: 28 }, () => ({
        x: Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: -Math.random() * 20,
        dur: 12 + Math.random() * 14,
        sway: (Math.random() > 0.5 ? 1 : -1) * (10 + Math.random() * 30)
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
            en.target.classList.add('pp-in');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    blocks.forEach((el) => {
      el.classList.add('pp-reveal');
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // lightbox: Escape closes, arrows flip between posters
  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') setOpen((i) => (i + 1) % POSTERS.length);
      if (e.key === 'ArrowLeft') setOpen((i) => (i - 1 + POSTERS.length) % POSTERS.length);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // posters tilt toward the cursor, with a soft glare that follows it
  const tilt = (e, strength = 1) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--rx', `${(-(py - 0.5) * 12 * strength).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${((px - 0.5) * 14 * strength).toFixed(2)}deg`);
    el.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`);
    el.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`);
  };
  const untilt = (e) => {
    e.currentTarget.style.setProperty('--rx', '0deg');
    e.currentTarget.style.setProperty('--ry', '0deg');
  };

  return (
    <div className="posters-page" ref={pageRef}>
      <div className="pp-stars" aria-hidden="true">
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
        <i className="pp-shoot pp-shoot-a" />
        <i className="pp-shoot pp-shoot-b" />
      </div>

      {/* BACK ARROW */}
      <button className="back-arrow" onClick={() => navigate(`/projects?tab=${projectTab}`)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* INTRO SECTION */}
      <section className="posters-intro-section" onClick={makePuff}>
        {puffs.map((pf) => (
          <span key={pf.id} className="pp-puff" style={{ left: pf.x, top: pf.y }} aria-hidden="true">
            {pf.bits.map((b, k) => (
              <i key={k} style={{ '--dx': b.dx + 'px', '--dy': b.dy + 'px', width: b.s, height: b.s }} />
            ))}
          </span>
        ))}
        <div className="pp-flour" aria-hidden="true">
          {flour.map((f, k) => (
            <span
              key={k}
              style={{
                left: f.x + '%',
                width: f.size,
                height: f.size,
                animationDelay: f.delay + 's',
                animationDuration: f.dur + 's',
                '--sway': f.sway + 'px'
              }}
            />
          ))}
        </div>

        <div className="posters-content">
          <div className="posters-text">
            <h1 className="posters-title">
              FLUFF &amp;<br />FLOUR
            </h1>
            <div className="posters-info-group">
              <p className="posters-software">SOFTWARE</p>
              <p className="posters-tools">ADOBE ILLUSTRATOR, ADOBE PHOTOSHOP</p>
            </div>
          </div>

          <div className="posters-image-wrap" onMouseMove={(e) => tilt(e, 0.6)} onMouseLeave={untilt}>
            <div className="posters-image">
              <img src={posterMain} alt="Poster images" />
            </div>
            <p className="pp-poof-hint">CLICK ANYWHERE FOR A POOF OF FLOUR</p>
          </div>
        </div>
      </section>

      {/* ABOUT POSTERS SECTION */}
      <section className="posters-about-section">
        <div className="pp-about-content">
          <div className="pp-about-image">
            <img src={original} alt="Original image" />
          </div>

          <div className="pp-about-text">
            <p className="pp-section-label">ABOUT FLUFF &amp; FLOUR</p>

            <p className="pp-about-paragraph">
              Fluff &amp; Flour is a bakery and café made for people who want something soft, sweet, and easy to grab on the go. The menu focuses on light pastries that feel airy and comforting without being heavy, perfect for busy mornings or a small treat between errands. In a market filled with pastry shops that feel old and predictable, Fluff &amp; Flour brings a fresh, modern energy that feels bright, playful, and inviting.
            </p>
            <p className="pp-about-paragraph">
              The posters help introduce the range of offerings while keeping the look recognizable across each design. Together, they support the idea that Fluff &amp; Flour is not just about pastries, but about making everyday moments feel a little lighter and more enjoyable.
            </p>
          </div>
        </div>
      </section>

      {/* POSTERS GALLERY SECTION */}
      <section className="posters-gallery-section">
        <div className="pp-gallery-container">
          <p className="pp-section-label">{sec('02', 1)} – THE POSTERS</p>

          <div className="pp-gallery">
            {POSTERS.map((p, i) => (
              <div className="pp-poster-card" key={p.name} style={{ '--c': p.c }}>
                <button
                  className="pp-poster"
                  onMouseMove={tilt}
                  onMouseLeave={untilt}
                  onClick={() => setOpen(i)}
                  aria-label={`View ${p.name} poster larger`}
                >
                  <img src={p.src} alt={p.alt} />
                  <span className="pp-poster-glare" />
                </button>
                <p className="pp-poster-name">
                  <span>0{i + 1}</span> {p.name}
                </p>
              </div>
            ))}
          </div>
          <p className="pp-gallery-hint">CLICK A POSTER TO VIEW IT LARGER</p>
        </div>
      </section>

      {/* MOCKUPS SECTION */}
      <section className="posters-mockups-section">
        <div className="pp-mockups-container">
          <p className="pp-section-label">{sec('03', 2)} – MOCKUPS</p>

          <div className="pp-mockups-grid">
            <div className="pp-mockup-large">
              <img src={originalPoster} alt="Original Poster image" />
            </div>

            <div className="pp-mockup-small-container">
              <div className="pp-mockup-small pp-mockup-wide">
                <img src={strawberryPoster} alt="Strawberry Poster" />
              </div>
              <div className="pp-mockup-small pp-mockup-fill">
                <img src={matchaPoster} alt="Matcha Poster" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {open !== null && (
        <div className="pp-lightbox" onClick={() => setOpen(null)} role="dialog" aria-modal="true">
          <button className="pp-lightbox-close" onClick={() => setOpen(null)} aria-label="Close">×</button>
          <button
            className="pp-lightbox-nav pp-prev"
            onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + POSTERS.length) % POSTERS.length); }}
            aria-label="Previous poster"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <img
            key={open}
            src={POSTERS[open].src}
            alt={POSTERS[open].alt}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="pp-lightbox-nav pp-next"
            onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % POSTERS.length); }}
            aria-label="Next poster"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      )}

      {/* FOOTER */}
      <EclipseFooter />
    </div>
  );
};

export default PostersPage;