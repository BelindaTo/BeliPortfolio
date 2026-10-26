import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Herschelpage.css';
import EclipseFooter from './EclipseFooter';
import heroLogo from './images/HSC_WHITEWOVEN-ON-BLACK.jpg';
import stickerDieCut from './images/MINECRAFTSTICKER_V3.png';
import stickerHolo from './images/sticker-1.jpeg';
import stickerHoloStack from './images/sticker-2.jpeg';
import cardFront from './images/card-2.jpeg';
import cardBack from './images/card-1.jpeg';
import patches from './images/mc-patches.png';
import golfBrochure from './images/golf.png';
import certificates from './images/Herschel-certificate.png';
import herschelTree from './images/herschel-tree.JPG';

const sec = (n, i) => <span className={`sec-num sec-${['red', 'yellow', 'blue'][i % 3]}`}>{n}</span>;

const MONTHS = ['APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'NOW'];
const ACCENTS = ['#ff5a52', '#f2b705', '#6f94ff'];

/* ---------- flight path: a vertical route down the right edge, APR to OCT.
   The little plane tracks how far through the page you are. ---------- */
const FlightPath = () => {
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setP(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const idx = Math.min(MONTHS.length - 1, Math.floor(p * MONTHS.length));

  return (
    <div className="hs-flight" aria-hidden="true">
      <div className="hs-flight-track">
        <span className="hs-flight-done" style={{ height: `${p * 100}%` }} />
        {MONTHS.map((m, i) => (
          <span
            key={m}
            className={`hs-flight-tick ${i <= idx ? 'passed' : ''} ${i === idx ? 'active' : ''}`}
            style={{ top: `${(i / (MONTHS.length - 1)) * 100}%`, '--c': ACCENTS[i % 3] }}
          >
            <em>{m}</em>
          </span>
        ))}
        <span className="hs-flight-plane" style={{ top: `${p * 100}%` }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 3L3 10.5l6.5 2.5L12 20z" />
          </svg>
        </span>
      </div>
    </div>
  );
};

/* ---------- count-up stat ---------- */
const StatTile = ({ value, label, sub, color }) => {
  const ref = useRef(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        if (reduce) { setN(value); return; }
        const start = performance.now();
        const DURATION = 1600;
        const tick = (now) => {
          const t = Math.min(1, (now - start) / DURATION);
          setN(Math.round((1 - Math.pow(1 - t, 3)) * value));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <div ref={ref} className="hs-stat" style={{ '--c': color }}>
      <span className="hs-stat-num">{n.toLocaleString('en-US')}</span>
      <span className="hs-stat-label">{label}</span>
      <span className="hs-stat-sub">{sub}</span>
    </div>
  );
};

/* ---------- tilt toward the cursor + a glare / holo shimmer that follows it ---------- */
const tilt = (e, strength = 1) => {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width;
  const py = (e.clientY - r.top) / r.height;
  el.style.setProperty('--rx', `${(-(py - 0.5) * 10 * strength).toFixed(2)}deg`);
  el.style.setProperty('--ry', `${((px - 0.5) * 12 * strength).toFixed(2)}deg`);
  el.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`);
  el.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`);
};
const untilt = (e) => {
  e.currentTarget.style.setProperty('--rx', '0deg');
  e.currentTarget.style.setProperty('--ry', '0deg');
};

// an image in a tilting frame
const Shot = ({ src, alt, imgClass, holo, foil }) => (
  <div className={`hs-shot ${holo ? 'hs-holo' : ''} ${foil ? 'hs-foil' : ''}`} onMouseMove={tilt} onMouseLeave={untilt}>
    <img className={imgClass} src={src} alt={alt} />
    <span className="hs-shot-glare" />
  </div>
);

/* ---------- passport: stamp each Minecraft realm, like the post-stamp patches ---------- */
const REALMS = [
  { name: 'OVERWORLD', c: '#6f94ff', rot: -9 },
  { name: 'NETHER', c: '#ff5a52', rot: 6 },
  { name: 'THE END', c: '#f2b705', rot: -4 }
];

const Passport = () => {
  const [stamped, setStamped] = useState([false, false, false]);
  const count = stamped.filter(Boolean).length;

  const toggle = (i) => setStamped((s) => s.map((v, k) => (k === i ? true : v)));

  return (
    <div className="hs-passport">
      <div className="hs-passport-head">
        <span>PASSPORT</span>
        <span>{count} / 3 REALMS STAMPED</span>
      </div>

      <div className="hs-passport-slots">
        {REALMS.map((r, i) => (
          <button
            key={r.name}
            className={`hs-slot ${stamped[i] ? 'stamped' : ''}`}
            style={{ '--c': r.c, '--r': `${r.rot}deg` }}
            onClick={() => toggle(i)}
            aria-label={`Stamp ${r.name}`}
          >
            <span className="hs-slot-ring" />
            <svg className="hs-stamp" viewBox="0 0 120 120" aria-hidden="true">
              <defs>
                <path id={`hs-arc-${i}`} d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0" />
              </defs>
              <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="3" />
              <circle cx="60" cy="60" r="51" fill="none" stroke="currentColor" strokeWidth="1" />
              <text fontSize="10.5" fontWeight="700" letterSpacing="2" fill="currentColor" fontFamily="JetBrains Mono, monospace">
                <textPath href={`#hs-arc-${i}`} textLength="262" lengthAdjust="spacing">
                  {`${r.name} · HSC × MC · ${r.name} ·`}
                </textPath>
              </text>
              <path d="M60 36 L67 55 L86 60 L67 65 L60 84 L53 65 L34 60 L53 55 Z" fill="currentColor" />
            </svg>
            <span className="hs-slot-name">{r.name}</span>
          </button>
        ))}
      </div>

      <p className={`hs-passport-msg ${count === 3 ? 'done' : ''}`}>
        {count === 3 ? 'Travel Anywhere, Travel Often.' : 'TAP A REALM TO STAMP YOUR PASSPORT'}
      </p>
      {count > 0 && (
        <button className="hs-passport-reset" onClick={() => setStamped([false, false, false])}>
          CLEAR STAMPS
        </button>
      )}
    </div>
  );
};

/* ---------- foil medals for the APAC awards ---------- */
const MEDALS = [
  { name: 'GOLD', n: 1, a: '#f9e08a', b: '#c9961a' },
  { name: 'SILVER', n: 2, a: '#f1f4f8', b: '#8d97a6' },
  { name: 'BRONZE', n: 3, a: '#e8ab72', b: '#8a4f1f' }
];

const Medals = () => (
  <div className="hs-medals">
    {MEDALS.map((m) => (
      <div className="hs-medal" key={m.name}>
        <svg viewBox="0 0 80 100" aria-hidden="true">
          <defs>
            <linearGradient id={`hs-m-${m.n}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor={m.a} />
              <stop offset="1" stopColor={m.b} />
            </linearGradient>
          </defs>
          <path d="M22 0 L40 34 L30 38 L10 4 Z" fill="#ff5a52" />
          <path d="M58 0 L40 34 L50 38 L70 4 Z" fill="#6f94ff" />
          <circle cx="40" cy="64" r="30" fill={`url(#hs-m-${m.n})`} />
          <circle cx="40" cy="64" r="24" fill="none" stroke="rgba(10,11,14,0.35)" strokeWidth="1.5" />
          <text x="40" y="74" textAnchor="middle" fontSize="28" fontWeight="700" fill="rgba(10,11,14,0.75)" fontFamily="Fredoka, sans-serif">
            {m.n}
          </text>
        </svg>
        <span>{m.name}</span>
      </div>
    ))}
  </div>
);

const HerschelPage = () => {
  const navigate = useNavigate();
  const projectTab = 'internship';
  const pageRef = useRef(null);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    document.title = 'Herschel — Belinda To';
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
            en.target.classList.add('hs-in');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    blocks.forEach((el) => {
      el.classList.add('hs-reveal');
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <div className="herschel-page" ref={pageRef}>
      <FlightPath />

      <div className="hs-stars" aria-hidden="true">
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
        <i className="hs-shoot hs-shoot-a" />
        <i className="hs-shoot hs-shoot-b" />
      </div>

      {/* BACK ARROW */}
      <button className="back-arrow" onClick={() => navigate(`/projects?tab=${projectTab}`)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* INTRO SECTION */}
      <section className="herschel-intro-section">
        <div className="herschel-content">
          <div className="herschel-text">
            <h1 className="herschel-title">
              HERSCHEL<br />SUPPLY CO.
            </h1>

            {/* boarding pass: the Herschel motto is "Travel Anywhere, Travel Often." */}
            <div className="hs-pass">
              <div className="hs-pass-main">
                <span className="hs-pass-tag">BOARDING PASS</span>
                <p className="hs-pass-motto">Travel Anywhere, Travel Often.</p>

                <div className="hs-legs">
                  <div className="hs-leg">
                    <span className="hs-leg-num">01</span>
                    <div className="herschel-info-group">
                      <p className="herschel-detail">GRAPHIC DESIGN INTERN</p>
                      <p className="herschel-label">APRIL – JUNE</p>
                    </div>
                  </div>
                  <div className="hs-leg">
                    <span className="hs-leg-num">02</span>
                    <div className="herschel-info-group">
                      <p className="herschel-detail">GRAPHIC DESIGN CONTRACTOR</p>
                      <p className="herschel-label">JUNE – PRESENT</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hs-pass-stub">
                <div className="herschel-info-group">
                  <p className="herschel-label">NOW</p>
                  <p className="herschel-detail">CONTRACTOR</p>
                </div>
                <div className="hs-barcode" aria-hidden="true">
                  {Array.from({ length: 26 }, (_, i) => (
                    <span key={i} style={{ width: 1 + ((i * 7) % 4) }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="herschel-image-wrap" onMouseMove={(e) => tilt(e, 0.6)} onMouseLeave={untilt}>
            <div className="herschel-image herschel-image-logo">
              <img src={heroLogo} alt="Herschel Supply Co. woven label logo" />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="herschel-about-section">
        <div className="herschel-about-content">
          <div className="herschel-about-image">
            <img src={herschelTree} alt="Photo mural of a Herschel road sign beside a plant and a leather armchair" />
          </div>

          <div className="herschel-about-text">
            <p className="hs-section-label">MY EXPERIENCE!</p>

            <p className="herschel-about-paragraph">
              I had the wonderful opportunity this spring to join Herschel Supply Co. as a Graphic Design Intern. There, I learned what a professional working in corporate would be like as a junior designer. I was fortunate enough to join at a time where I was allowed to work on such large projects such as Minecraft, Lego, Golf and Peanuts! I was even more fortunate that my team trusted my design capabilities and allowed me to lead the design for some projects.
            </p>
            <p className="herschel-about-paragraph">
              My Team Lead assigned me jobs for print, digital and even let me help out on set for photography shoots and promotional videos! It is so cool to see the work I designed being advertised in stores. Thanks to Herschel, I developed my skills and design thinking and am now confident in my skills as a designer. Here is a small snippet of the work I've done.
            </p>
          </div>
        </div>
      </section>

      {/* BY THE NUMBERS */}
      <section className="hs-stats-section">
        <div className="hs-stats">
          <StatTile value={3000} label="STICKERS" sub="made and handed out" color="#f2b705" />
          <StatTile value={4} label="BIG PROJECTS" sub="Minecraft, Lego, Golf, Peanuts" color="#ff5a52" />
          <StatTile value={3} label="PATCHES" sub="Overworld, Nether, End" color="#6f94ff" />
          <StatTile value={3} label="AWARD TIERS" sub="Gold, Silver, Bronze" color="#ff5a52" />
        </div>
      </section>

      {/* MINECRAFT SECTION */}
      <section className="herschel-project-section herschel-minecraft-section">
        <div className="herschel-project-inner">
          <div className="herschel-project-head">
            <p className="hs-section-label">{sec('01', 0)} – MINECRAFT</p>
            <h2 className="herschel-project-headline">
              BLENDING <span className="highlight-italic">BOTH WORLDS</span> THROUGH PRINT
            </h2>
            <p className="herschel-project-paragraph">
              The largest project I worked on during my time at Herschel. I was tasked with designing patches to be sold along with their brand new backpacks, stickers for Twitchcon, packaging for online orders and the minecraft seeding card you get when you receive a backpack! This was by far, my favorite project.
            </p>
          </div>

          <div className="herschel-subsection">
            <h3 className="herschel-sub-title">STICKERS</h3>
            <p className="herschel-sub-text">
              Stickers I made for TwitchCon 2026! Minecraft requested something that would catch the attention of regular people without spoiling too much. I went through multiple variations before Herschel and Minecraft agreed that this was the best one.
            </p>
            <div className="herschel-row herschel-row-3">
              <figure className="herschel-item">
                <Shot src={stickerDieCut} alt="Die-cut Leave Nothing Behind sticker" />
                <figcaption className="herschel-caption">Die-cut sticker V1.</figcaption>
              </figure>
              <figure className="herschel-item">
                <Shot src={stickerHolo} alt="Holographic Leave Nothing Behind sticker" holo />
                <figcaption className="herschel-caption">Holographic finish, Final version!</figcaption>
              </figure>
              <figure className="herschel-item">
                <Shot
                  src={stickerHoloStack}
                  alt="A hand holding holographic Minecraft x Herschel stickers"
                  imgClass="herschel-crop-stack"
                  holo
                />
                <figcaption className="herschel-caption">3000 made and handed out!</figcaption>
              </figure>
            </div>
            <p className="hs-hint">MOVE YOUR CURSOR OVER THE HOLOGRAPHIC ONES</p>
          </div>

          <div className="herschel-subsection">
            <h3 className="herschel-sub-title">SEEDING CARD</h3>
            <p className="herschel-sub-text">
              Seeding cards designed to accompany every item in the Minecraft x Herschel collection. The collaboration was driven by the concept of 'blending both worlds,' seamlessly bringing the infinite exploration of Minecraft’s digital realm into real-world everyday life. Herschel requested that I play into this concept for the seeding card.
            </p>

            {/* click to flip the postcard */}
            <div className="hs-flip-wrap">
              <button
                className={`hs-flip ${flipped ? 'flipped' : ''}`}
                onClick={() => setFlipped((f) => !f)}
                aria-label={flipped ? 'Show card front' : 'Show card back'}
              >
                <span className="hs-flip-inner">
                  <span className="hs-flip-face hs-flip-front">
                    <img className="herschel-crop-card" src={cardFront} alt="Minecraft x Herschel postcard front" />
                  </span>
                  <span className="hs-flip-face hs-flip-back">
                    <img className="herschel-crop-card" src={cardBack} alt="Minecraft x Herschel postcard back styled as an in-game dialogue" />
                  </span>
                </span>
              </button>
              <p className="herschel-caption hs-flip-caption">{flipped ? 'Card back.' : 'Card front.'}</p>
              <p className="hs-hint">CLICK THE CARD TO FLIP IT</p>
            </div>
          </div>

          <div className="herschel-subsection">
            <h3 className="herschel-sub-title">PATCHES</h3>
            <p className="herschel-sub-text herschel-sub-text-tight">
              I was assigned the job of creating patches, these patches would be limited edition items customers could buy to add to their backpacks. Herschel requested that I design a patch that blends both brands, not a patch that is just an in-game item or a word mark that says ‘HSC x Minecraft.’ This patch was pitched directly to Minecraft’s team and they loved it!
            </p>
            <p className="herschel-sub-text">
              Herschel’s motto is “Travel Anywhere, Travel Often.” so I felt like creating a post stamp would perfectly convey this message. The destinations are minecraft realms themselves so this also blends into the collaboration concept of ‘blending both worlds.’ The tag in the corner is designed to look like a player nametag.
            </p>
            <div className="herschel-row herschel-row-1">
              <figure className="herschel-item">
                <Shot src={patches} alt="Embroidered Overworld, Nether and End stamp patches" />
                <figcaption className="herschel-caption">Overworld, Nether and End patches.</figcaption>
              </figure>
            </div>

            <Passport />
          </div>
        </div>
      </section>

      {/* GOLF & AWARDS SECTION */}
      <section className="herschel-project-section herschel-golf-section">
        <div className="herschel-project-inner">
          <div className="herschel-project-head">
            <p className="hs-section-label">{sec('02', 1)} – GOLF &amp; AWARDS</p>
          </div>

          {/* Row 1: image left, text right */}
          <div className="herschel-zig-row">
            <div className="herschel-zig-image">
              <Shot src={golfBrochure} alt="Herschel Watt Stand Bag folded brochure" />
            </div>
            <div className="herschel-zig-text">
              <h3 className="herschel-sub-title">GOLF</h3>
              <p className="herschel-sub-text">
                I designed a PK tag for in-store retail signage. This sits on Herschel’s golf bags with information about each type of bag and their benefits. I designed the pk tags in the form of a golf scoring sheet that opens up.
              </p>
            </div>
          </div>

          {/* Row 2: text left, image right */}
          <div className="herschel-zig-row herschel-zig-row-reverse">
            <div className="herschel-zig-text">
              <h3 className="herschel-sub-title">APAC COMPETITION AWARDS</h3>
              <p className="herschel-sub-text">
                I designed a Gold, Silver and Bronze variation for 3 awards. This is for Herschel’s retail competition that is held throughout Asia. It was requested that the award didn’t look like a highschool honour roll award but one that would scream ‘Herschel’ but also lay subtle. I designed the awards as postcards with custom made stamps that follow the new Herschel brand guidelines.
              </p>
              <Medals />
            </div>
            <div className="herschel-zig-image">
              <Shot src={certificates} alt="Gold Award certificates designed as vintage postcards" foil />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <EclipseFooter />
    </div>
  );
};

export default HerschelPage;