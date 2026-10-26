import React, { useEffect, useMemo, useRef, useState } from 'react';
import './AboutPage.css';
import EclipseFooter from './EclipseFooter';
import babyPhoto from './images/baby.jpg';
import bikingImage from './images/biking.jpg';
import coachingImage from './images/coaching.jpg';
import blackpinkImage from './images/blackpink.jpg';

// Fades/slides a block in the first time it scrolls into view
const Reveal = ({ as: Tag = 'div', className = '', delay = 0, children }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`ab-reveal ${visible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </Tag>
  );
};

const Sparkle = ({ className = '' }) => (
  <svg className={`ab-sparkle ${className}`} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" />
  </svg>
);

const LinePlanet = ({ className = '' }) => (
  <svg className={`ab-planet ${className}`} viewBox="0 0 160 120" aria-hidden="true">
    <path d="M8 60 A72 19 0 0 1 152 60" className="ab-line ab-blue" transform="rotate(-18 80 60)" />
    <circle cx="80" cy="60" r="34" className="ab-line ab-fill" />
    <path d="M52 50 Q80 60 108 48" className="ab-line ab-thin" />
    <path d="M48 66 Q80 78 112 64" className="ab-line ab-thin" />
    <path d="M8 60 A72 19 0 0 0 152 60" className="ab-line ab-blue" transform="rotate(-18 80 60)" />
  </svg>
);

// Hyperspace jump on arrival: stars streak out from the centre, then settle
const WarpIn = () => {
  const canvasRef = useRef(null);
  const [done, setDone] = useState(
    () => typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (done) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const palette = ['255,255,255', '255,255,255', '255,255,255', '255,90,82', '242,183,5', '111,148,255'];
    const maxR = Math.hypot(w, h) / 2;
    const stars = Array.from({ length: 260 }, () => ({
      a: Math.random() * Math.PI * 2,
      r: Math.random() * maxR * 0.25,
      v: 0.4 + Math.random() * 0.9,
      c: palette[Math.floor(Math.random() * palette.length)]
    }));

    const DURATION = 2000;
    const t0 = performance.now();
    let raf;

    const frame = (now) => {
      const t = Math.min(1, (now - t0) / DURATION);
      // fast burst that decelerates to nothing
      const speed = Math.pow(1 - t, 2.2) * 38 + 0.5;
      const fade = t < 0.7 ? 1 : 1 - (t - 0.7) / 0.3;

      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = 'round';
      stars.forEach((s) => {
        const prev = s.r;
        s.r += speed * s.v * (0.4 + s.r / maxR * 2);
        if (s.r > maxR) {
          s.r = Math.random() * maxR * 0.1;
          s.a = Math.random() * Math.PI * 2;
          return;
        }
        const cx = w / 2;
        const cy = h / 2;
        const x1 = cx + Math.cos(s.a) * prev;
        const y1 = cy + Math.sin(s.a) * prev;
        const x2 = cx + Math.cos(s.a) * s.r;
        const y2 = cy + Math.sin(s.a) * s.r;
        ctx.strokeStyle = `rgba(${s.c}, ${fade * Math.min(1, s.r / 120)})`;
        ctx.lineWidth = 0.8 + (s.r / maxR) * 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });

      if (t < 1) raf = requestAnimationFrame(frame);
      else setDone(true);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [done]);

  if (done) return null;
  return <canvas ref={canvasRef} className="ab-warp" aria-hidden="true" />;
};

// Gentle decode: a soft wave of letters briefly flickers, then settles
const Scramble = ({ text, delay = 0 }) => {
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const STAGGER = 35;   // ms between letters
    const FLICKER = 160;  // ms each letter flickers
    const STEP = 80;      // ms between random swaps (slow = calmer)
    const start = performance.now() + delay;
    const end = text.length * STAGGER + FLICKER;
    let raf;
    let lastStep = -1;
    let cache = text.split('');

    const tick = (now) => {
      const el = now - start;
      const step = Math.floor(el / STEP);
      if (step !== lastStep) {
        lastStep = step;
        cache = text.split('').map((ch, i) => {
          const from = i * STAGGER;
          if (!/[a-z]/i.test(ch) || el < from || el > from + FLICKER) return ch;
          const pool = ch === ch.toUpperCase() ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : 'abcdefghijklmnopqrstuvwxyz';
          return pool[Math.floor(Math.random() * pool.length)];
        });
        setOut(cache.join(''));
      }
      if (el < end) raf = requestAnimationFrame(tick);
      else setOut(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, delay]);

  return (
    <span aria-label={text}>
      <span aria-hidden="true">{out}</span>
    </span>
  );
};

// Scroll-drawn flight path: Understand -> Structure -> Details
const PROCESS_STEPS = [
  {
    id: 'understand',
    title: 'UNDERSTAND',
    color: '#d4161c',
    glow: '#ff5a52',
    text: "What's actually going on, who it's for, and what matters most."
  },
  {
    id: 'structure',
    title: 'STRUCTURE',
    color: '#f2b705',
    glow: '#f2b705',
    text: 'Getting the structure right first, so everything has a clear place.'
  },
  {
    id: 'details',
    title: 'DETAILS',
    color: '#1747c9',
    glow: '#6f94ff',
    text: 'The small details that make it feel intentional rather than overworked.'
  }
];

const PATH_D =
  'M50 0 C50 8, 22 6, 22 17 C22 32, 78 34, 78 50 C78 66, 22 68, 22 83 C22 92, 50 92, 50 100';

const ProcessPath = () => {
  const wrapRef = useRef(null);
  const pathRef = useRef(null);
  const progressRef = useRef(null);
  const headRef = useRef(null);
  const [stage, setStage] = useState(0); // how many steps have been reached

  useEffect(() => {
    const wrap = wrapRef.current;
    const path = pathRef.current;
    const prog = progressRef.current;
    const head = headRef.current;
    if (!wrap || !path || !prog || !head) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const total = path.getTotalLength();
    const thresholds = [0.14, 0.47, 0.8];
    let current = -1;
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const r = wrap.getBoundingClientRect();
      let p = reduce ? 1 : (vh * 0.7 - r.top) / (r.height * 0.9);
      p = Math.min(1, Math.max(0, p));

      prog.style.strokeDashoffset = String(1 - p);
      const pt = path.getPointAtLength(p * total);
      head.style.left = `${pt.x}%`;
      head.style.top = `${pt.y}%`;
      head.style.opacity = p > 0.005 && p < 0.995 ? '1' : '0';

      const reached = thresholds.filter((t) => p >= t).length;
      if (reached !== current) {
        current = reached;
        setStage(reached);
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="process">
      <Reveal as="span" className="ab-label process-label">The flight plan</Reveal>

      <div className="process-track" ref={wrapRef}>
        <svg className="process-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d={PATH_D} className="process-base" />
          <path ref={pathRef} d={PATH_D} className="process-hidden" />
          <path
            ref={progressRef}
            d={PATH_D}
            pathLength="1"
            className="process-progress"
          />
        </svg>

        <span ref={headRef} className="process-head" aria-hidden="true" />

        {PROCESS_STEPS.map((s, i) => (
          <div
            key={s.id}
            className={`process-step process-step-${i + 1} ${stage > i ? 'reached' : ''}`}
            style={{ '--c': s.color, '--g': s.glow }}
          >
            <span className="process-node">{i + 1}</span>
            <div className="process-card">
              <span className="process-kicker">0{i + 1} / {s.title}</span>
              <p>{s.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Interactive "solar system of me": hover (or tap) a planet to explore it
const ORBIT_ITEMS = [
  {
    id: 'riding',
    label: 'RIDING',
    color: '#d4161c',
    glow: '#ff5a52',
    img: bikingImage,
    alt: 'Motorcycle riding',
    caption: "My current favourite hobby, 2025 ZX6R! Mom I'm safe I swear...",
    radius: 24,
    speed: 14,
    start: 200
  },
  {
    id: 'coaching',
    label: 'COACHING',
    color: '#1747c9',
    glow: '#6f94ff',
    img: coachingImage,
    alt: 'Volleyball team coaching',
    caption: 'My 4th year as a head coach and my 12th year playing volleyball!',
    radius: 35,
    speed: -10,
    start: 40
  },
  {
    id: 'concerts',
    label: 'CONCERTS',
    color: '#f2b705',
    glow: '#f2b705',
    img: blackpinkImage,
    alt: 'Concert experience',
    caption: 'My first time in LA at Blackpink! I love California...',
    radius: 45,
    speed: 7,
    start: 305
  }
];

const OrbitExplorer = () => {
  const [active, setActive] = useState(0);
  const planetRefs = useRef([]);
  const paused = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const angles = ORBIT_ITEMS.map((it) => it.start);

    const place = () => {
      ORBIT_ITEMS.forEach((it, i) => {
        const el = planetRefs.current[i];
        if (!el) return;
        const rad = (angles[i] * Math.PI) / 180;
        el.style.left = `${50 + it.radius * Math.cos(rad)}%`;
        el.style.top = `${50 + it.radius * Math.sin(rad)}%`;
      });
    };

    place();
    if (reduce) return;

    let last = performance.now();
    let raf;
    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!paused.current) {
        ORBIT_ITEMS.forEach((it, i) => {
          angles[i] += it.speed * dt;
        });
        place();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const current = ORBIT_ITEMS[active];

  return (
    <Reveal className="orbit-explorer">
      <div className="oe-stage">
        <svg className="oe-rings" viewBox="0 0 100 100" aria-hidden="true">
          {ORBIT_ITEMS.map((it) => (
            <circle
              key={it.id}
              cx="50"
              cy="50"
              r={it.radius}
              className={`oe-ring ${it.id === current.id ? 'active' : ''}`}
              style={{ '--c': it.glow }}
            />
          ))}
        </svg>

        <div className="oe-sun" aria-hidden="true">
          <span>ME</span>
        </div>

        {ORBIT_ITEMS.map((it, i) => (
          <button
            key={it.id}
            ref={(el) => { planetRefs.current[i] = el; }}
            className={`oe-planet ${i === active ? 'active' : ''}`}
            style={{ '--c': it.color, '--g': it.glow }}
            onMouseEnter={() => { paused.current = true; setActive(i); }}
            onMouseLeave={() => { paused.current = false; }}
            onFocus={() => { paused.current = true; setActive(i); }}
            onBlur={() => { paused.current = false; }}
            onClick={() => setActive(i)}
            aria-label={it.label}
          >
            <span className="oe-planet-body" />
            <span className="oe-planet-label">{it.label}</span>
          </button>
        ))}

        <p className="oe-hint">Hover a planet to explore</p>
      </div>

      <figure className="oe-panel" key={current.id} style={{ '--c': current.color, '--g': current.glow }}>
        <div className="oe-photo">
          <img src={current.img} alt={current.alt} />
        </div>
        <figcaption>
          <span className="oe-kicker">
            {String(active + 1).padStart(2, '0')} / {current.label}
          </span>
          <p>{current.caption}</p>
        </figcaption>
      </figure>
    </Reveal>
  );
};

const AboutPage = () => {
  useEffect(() => {
    document.title = "About — Belinda To";
    // deep-space theme: also flips the docked orbit nav + logo to their dark styles
    document.body.classList.add('space-page', 'space-dark');
    return () => document.body.classList.remove('space-page', 'space-dark');
  }, []);

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

  // porthole tilts toward the cursor, with a glass glare
  const tiltRef = useRef(null);
  const onTilt = (e) => {
    const el = tiltRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--rx', `${(-py * 14).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${(px * 14).toFixed(2)}deg`);
    el.style.setProperty('--gx', `${(px + 0.5) * 100}%`);
    el.style.setProperty('--gy', `${(py + 0.5) * 100}%`);
  };
  const onTiltEnd = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--gx', '30%');
    el.style.setProperty('--gy', '25%');
  };

  return (
    <div className="about-page">
      <div className="ab-stars" aria-hidden="true">
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
        <i className="ab-shoot ab-shoot-a" />
        <i className="ab-shoot ab-shoot-b" />
      </div>

      <WarpIn />

      {/* HERO SECTION - About me */}
      <section className="about-hero">
        <Sparkle className="ab-sparkle-1" />
        <Sparkle className="ab-sparkle-2" />

        <div className="about-hero-text">
          <Reveal as="span" className="ab-label">About me</Reveal>
          <Reveal as="h1" className="about-hero-title" delay={0.05}>
            <Scramble text="Designer, coach and rider." delay={600} />
          </Reveal>
          <Reveal as="p" className="about-hero-sub" delay={0.12}>
            I turn ideas into digital experiences that feel clear and easy to use.
            When I'm not designing, I'm coaching volleyball or out on my bike.
          </Reveal>
        </div>

        <Reveal className="about-hero-art" delay={0.1}>
          <div
            className="about-hero-tilt"
            onMouseMove={onTilt}
            onMouseLeave={onTiltEnd}
            ref={tiltRef}
          >
          <svg className="about-hero-orbits" viewBox="0 0 400 400" aria-hidden="true">
            <circle cx="200" cy="200" r="190" className="ab-orbit-line" />
            <circle cx="200" cy="200" r="150" className="ab-orbit-line" />
            <g className="ab-spin ab-spin-a">
              <circle cx="200" cy="10" r="11" className="ab-line ab-moon-yellow" />
            </g>
            <g className="ab-spin ab-spin-b">
              <circle cx="200" cy="50" r="8" className="ab-line ab-moon-red" />
            </g>
            <g className="ab-spin ab-spin-c">
              <circle cx="10" cy="200" r="7" className="ab-line ab-moon-blue" />
            </g>
          </svg>

          <figure className="about-porthole">
            <div className="porthole-frame">
              <span className="porthole-glare" />
              <img src={babyPhoto} alt="Baby Belinda" />
            </div>
            <figcaption>Day one of the mission.</figcaption>
          </figure>
          </div>
        </Reveal>
      </section>

      {/* BIO SECTION - How I Design */}
      <section className="bio-section">
        <LinePlanet className="ab-planet-bio" />
        <div className="bio-container">
          <Reveal as="span" className="ab-label">01 / Mission Brief</Reveal>
          <Reveal as="h2" className="bio-title" delay={0.05}>HOW I DESIGN</Reveal>
          <Reveal as="p" className="bio-text" delay={0.1}>
            I love design when it feels clear and easy to understand. That's why I enjoy taking ideas and turning them into digital experiences that make sense and feel good to use.
          </Reveal>
          <Reveal as="p" className="bio-text" delay={0.15}>
            I usually start by figuring out what's actually going on, what the problem is, who it's for, and what matters most. From there, I focus on structure and small details so the design feels intentional rather than overworked.
          </Reveal>
          <Reveal as="p" className="bio-text" delay={0.2}>
            At the end of the day, I care about making things that feel simple, thoughtful, and grounded in real use.
          </Reveal>
          <ProcessPath />
        </div>
      </section>

      {/* BEYOND THE SCREEN SECTION */}
      <section className="beyond-section">
        <div className="beyond-container">
          <Reveal as="span" className="ab-label">02 / Off Duty</Reveal>
          <Reveal as="h2" className="beyond-title" delay={0.05}>BEYOND THE SCREEN</Reveal>
          <Reveal as="p" className="beyond-text" delay={0.1}>
            Outside of design, I spend a lot of time doing things that keep me active and curious. I coach competitive volleyball, which has taught me a lot about communication, teamwork, and adapting in real time.
          </Reveal>
          <Reveal as="p" className="beyond-text" delay={0.15}>
            I also ride motorcycles and love getting out on the road, it's one of the ways I reset and clear my head. I enjoy going to concerts and live events, where I'm drawn to the energy, visuals, and experience of being part of something bigger.
          </Reveal>

          {/* Interactive solar system */}
          <OrbitExplorer />
        </div>
      </section>

      {/* TRANSITION SECTION */}
      <section className="about-transition-section">
        <Sparkle className="ab-t-1" />
        <Sparkle className="ab-t-2" />
        <Sparkle className="ab-t-3" />
        <Sparkle className="ab-t-4" />
      </section>

      {/* FOOTER */}
      <EclipseFooter />
    </div>
  );
};

export default AboutPage;