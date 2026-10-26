import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PickiPage.css';
import EclipseFooter from './EclipseFooter';
import pickiPhones from './images/pickiphones.png';
import blobs from './images/blobs.png';
import phone2 from './images/phone2.png';
import pickiMain from './images/picki-main.png';
import pickiCore from './images/picki-core.png';
import pickiColour from './images/picki-colour.png';
import pickiLogo from './images/Picki-Logo.png';
import pickiTypography from './images/picki-typography.png';
import animation from './images/animation.mp4';

const ACCENTS = ['#ff5a52', '#f2b705', '#6f94ff'];

/* ---------- side nav: a little flight path that tracks where you are ---------- */
const NAV_SECTIONS = [
  ['picki-intro-section', 'Intro'],
  ['picki-overview-section', 'Overview'],
  ['picki-challenge-section', 'Why Picki'],
  ['picki-concept-section', 'Concept'],
  ['picki-features-section', 'How it works'],
  ['picki-userflow-section', 'User flow'],
  ['picki-design-section', 'Design process'],
  ['picki-demo-section', 'Challenges']
];

const SectionNav = () => {
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const els = NAV_SECTIONS.map(([cls]) => document.querySelector(`.${cls}`));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          const i = els.indexOf(en.target);
          if (i !== -1 && en.isIntersecting) setActive(i);
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
    <nav className="pk-nav" aria-label="Case study sections">
      {NAV_SECTIONS.map(([, label], i) => (
        <button
          key={label}
          className={`pk-nav-item ${i === active ? 'active' : ''} ${i < active ? 'passed' : ''}`}
          style={{ '--c': ACCENTS[i % 3] }}
          onClick={() => go(i)}
          aria-label={label}
        >
          <span className="pk-nav-label">{label}</span>
          <span className="pk-nav-dot" />
        </button>
      ))}
    </nav>
  );
};

/* ---------- interactive: let Picki decide ----------
   Same idea as the app: everyone drops in a pick, nobody has to choose. */
const PickerDemo = () => {
  const [opts, setOpts] = useState(['Ramen night', 'Bowling', 'Movie marathon', 'Sunset hike', 'Karaoke']);
  const [draft, setDraft] = useState('');
  const [hi, setHi] = useState(-1);
  const [winner, setWinner] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [round, setRound] = useState(0);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const add = (e) => {
    e.preventDefault();
    const v = draft.trim().slice(0, 22);
    if (!v || spinning || opts.length >= 8) return;
    if (opts.some((o) => o.toLowerCase() === v.toLowerCase())) return;
    setOpts([...opts, v]);
    setDraft('');
    setWinner(null);
    setHi(-1);
  };

  const remove = (i) => {
    if (spinning) return;
    setOpts(opts.filter((_, k) => k !== i));
    setWinner(null);
    setHi(-1);
  };

  const pick = () => {
    if (spinning || opts.length < 2) return;
    const n = opts.length;
    const target = Math.floor(Math.random() * n);
    setWinner(null);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setHi(target);
      setWinner(target);
      setRound((r) => r + 1);
      return;
    }

    setSpinning(true);
    // start at -1, so after T steps the highlight sits on `target`
    const total = n * 2 + target + 1;
    let step = 0;
    const tick = () => {
      step += 1;
      setHi((step - 1) % n);
      if (step >= total) {
        setSpinning(false);
        setWinner(target);
        setRound((r) => r + 1);
        return;
      }
      timer.current = setTimeout(tick, 60 + Math.pow(step / total, 3) * 380);
    };
    tick();
  };

  const win = winner !== null ? opts[winner] : null;

  return (
    <div className="pk-picker">
      <div className="pk-picker-head">
        <span className="pk-picker-tag">TRY IT</span>
        <p className="pk-picker-sub">Drop in a few picks and let Picki make the call.</p>
      </div>

      <div className="pk-picker-chips">
        {opts.map((o, i) => (
          <span
            key={o}
            className={`pk-chip ${i === hi ? 'lit' : ''} ${i === winner ? 'won' : ''}`}
            style={{ '--c': ACCENTS[i % 3] }}
          >
            {o}
            <button
              type="button"
              className="pk-chip-x"
              onClick={() => remove(i)}
              aria-label={`Remove ${o}`}
              disabled={spinning}
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <form className="pk-picker-add" onSubmit={add}>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={opts.length >= 8 ? 'That’s plenty of picks' : 'Add a pick…'}
          maxLength={22}
          disabled={spinning || opts.length >= 8}
          aria-label="Add a pick"
        />
        <button type="submit" disabled={spinning || !draft.trim() || opts.length >= 8}>
          ADD
        </button>
      </form>

      <button className="pk-picker-go" onClick={pick} disabled={spinning || opts.length < 2}>
        {spinning ? 'PICKING…' : win ? 'PICK AGAIN' : 'PICK FOR US'}
      </button>

      <div className="pk-picker-result" aria-live="polite">
        {win ? (
          <div key={round} className="pk-picker-win">
            <span className="pk-picker-ring" />
            <span className="pk-picker-ring pk-picker-ring-b" />
            <span className="pk-picker-says">PICKI SAYS</span>
            <span className="pk-picker-name" style={{ color: ACCENTS[winner % 3] }}>
              {win}
            </span>
          </div>
        ) : (
          <span className="pk-picker-idle">{spinning ? '' : opts.length < 2 ? 'Add at least two picks.' : 'No pressure. Nobody has to decide.'}</span>
        )}
      </div>
    </div>
  );
};

const sec = (n, i) => <span className={`sec-num sec-${['red', 'yellow', 'blue'][i % 3]}`}>{n}</span>;

const PickiPage = () => {
  const navigate = useNavigate();
  const projectTab = 'apps';
  const pageRef = useRef(null);

  useEffect(() => {
    document.title = 'Picki — Belinda To';
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
      'section > div > *, section > .picki-features-header, section > .picki-features-layout'
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('pk-in');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    blocks.forEach((el) => {
      el.classList.add('pk-reveal');
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

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

  return (
    <div className="picki-page" ref={pageRef}>
      <SectionNav />

      <div className="pk-stars" aria-hidden="true">
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
        <i className="pk-shoot pk-shoot-a" />
        <i className="pk-shoot pk-shoot-b" />
      </div>

      {/* BACK ARROW */}
      <button className="back-arrow" onClick={() => navigate(`/projects?tab=${projectTab}`)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* INTRO SECTION */}
      <section className="picki-intro-section">
        <div className="picki-intro-content">
          <div className="picki-intro-text">
            <h1 className="picki-title">PICKI</h1>

            <div className="picki-info-group">
              <p className="picki-label">ROLES</p>
              <p className="picki-value">DESIGNER / FRONT-END DEVELOPER</p>
            </div>

            <div className="picki-info-group">
              <p className="picki-label">SKILLS</p>
              <p className="picki-value">UX/UI DESIGN, FRONT-END DEVELOPMENT, GRAPHIC DESIGN</p>
            </div>

            <div className="picki-info-group">
              <p className="picki-label">TIMELINE</p>
              <p className="picki-value">5 MONTHS</p>
            </div>

            <div className="picki-btn-group">
              <button
                className="picki-btn"
                onClick={() =>
                  window.open(
                    'https://www.figma.com/proto/Ph43MP7u4CTx9Kkd3imj1U/PICKI-A4-Mockup?node-id=1210-1363&t=2ddgigaxMLN05OBY-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A57',
                    '_blank'
                  )
                }
              >
                View Prototype
              </button>
            </div>
          </div>

          <div className="picki-intro-image">
            <img src={pickiMain} alt="Picki Main App View" />
          </div>
        </div>
      </section>

      {/* OVERVIEW SECTION */}
      <section className="picki-overview-section">
        <div className="picki-overview-content">
          <div className="picki-overview-text">
            <p className="picki-section-label">{sec('01', 0)} – OVERVIEW</p>

            <h2 className="picki-overview-title">
              FOR THE INDECISIVE FRIEND GROUPS, <span className="highlight-italic">LET PICKI DECIDE</span> SO YOU DON'T HAVE TO.
            </h2>

            <p className="picki-overview-paragraph">
              Picki is an event planning app designed for indecisive friend groups and couples who struggle to settle on plans.
            </p>
          </div>

          <div className="picki-overview-image pk-phone" onMouseMove={tilt} onMouseLeave={untilt}>
            <img src={pickiPhones} alt="Picki App Screens" />
          </div>
        </div>
      </section>

      {/* THE CHALLENGE SECTION */}
      <section className="picki-challenge-section">
        <div className="picki-challenge-content">
          <p className="picki-section-label">{sec('02', 1)} – WHY PICKI EXISTS</p>

          <div className="picki-challenge-layout">
            <div className="picki-challenge-visual pk-phone" onMouseMove={tilt} onMouseLeave={untilt}>
              <img src={phone2} alt="Picki App Screens" className="picki-character-img" />
            </div>

            <div className="picki-challenge-text">
              <div className="picki-challenge-block">
                <h3 className="picki-challenge-subtitle">THE STRUGGLE OF DECISION MAKING</h3>
                <p className="picki-challenge-paragraph">
                  Planning events with friends or partners often becomes frustrating when everyone has different preferences. Conversations go in circles, decisions get delayed, and the excitement of making plans fades into indecision. What should be a simple process can quickly turn into decision fatigue, especially in group settings where no one wants to be the final decision-maker.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE CONCEPT SECTION */}
      <section className="picki-concept-section">
        <div className="picki-concept-content">
          <p className="picki-section-label">{sec('03', 2)} – THE CONCEPT</p>

          <h2 className="picki-concept-title">
            MAKING INDECISION <span className="highlight-italic">PLAYFUL</span> INSTEAD OF STRESSFUL
          </h2>

          <p className="picki-concept-paragraph">
            Picki reframes group decision-making as a lighthearted, collaborative experience. By leaning into randomness and removing the weight of personal responsibility, the app turns "What should we do?" into a moment of anticipation rather than anxiety.
          </p>

          <div className="picki-concept-points">
            <div className="picki-concept-point">
              <h4 className="picki-point-title">Everyone Contributes</h4>
              <p className="picki-point-text">Every voice matters—no one person calls the shots.</p>
            </div>

            <div className="picki-concept-point">
              <h4 className="picki-point-title">No One Decides</h4>
              <p className="picki-point-text">The app makes the final call, removing pressure and blame.</p>
            </div>

            <div className="picki-concept-point">
              <h4 className="picki-point-title">Fast & Fair</h4>
              <p className="picki-point-text">Decisions happen quickly without endless discussion.</p>
            </div>
          </div>

          <PickerDemo />
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="picki-features-section">
        <div className="picki-features-header">
          <p className="picki-section-label">{sec('04', 0)} – HOW IT WORKS</p>
          <h2 className="picki-features-title">
            TO REMOVE THE PRESSURE OF DECISION-MAKING, PICKI IS BUILT AROUND <span className="highlight-italic">THREE CORE FEATURES.</span>
          </h2>
        </div>

        <div className="picki-features-layout">
          <div className="picki-features-left">
            <div className="picki-features-list">
              <div className="picki-feature-item">
                <p className="picki-feature-number">01</p>
                <h3 className="picki-feature-name">HOST-LED PLANNING</h3>
                <p className="picki-feature-description">One person sets the event details and invites participants.</p>
              </div>

              <div className="picki-feature-item">
                <p className="picki-feature-number">02</p>
                <h3 className="picki-feature-name">SHARED PICKS</h3>
                <p className="picki-feature-description">Each participant submits one pick they're happy with.</p>
              </div>

              <div className="picki-feature-item">
                <p className="picki-feature-number">03</p>
                <h3 className="picki-feature-name">RANDOMIZED OUTCOME</h3>
                <p className="picki-feature-description">Picki selects one option and finalizes the plan.</p>
              </div>
            </div>
          </div>

          <div className="picki-features-right">
            <div className="picki-features-media">
              <img src={blobs} alt="Picki Characters" className="picki-blobs-img" />
              <div className="pk-phone pk-video-wrap" onMouseMove={tilt} onMouseLeave={untilt}>
                <video className="picki-demo-video" autoPlay loop muted playsInline src={animation} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USER FLOW SECTION */}
      <section className="picki-userflow-section">
        <div className="picki-userflow-content">
          <p className="picki-section-label">{sec('05', 1)} – USER FLOW</p>

          <h2 className="picki-userflow-title">
            MAPPING THE <span className="highlight-italic">JOURNEY</span> FROM INDECISION TO PLAN
          </h2>

          <p className="picki-userflow-paragraph">
            The user flow was designed to minimize friction at every step. From creating an event to receiving the final decision, each interaction was mapped to ensure clarity and maintain the playful tone that defines Picki's experience.
          </p>

          <div className="picki-userflow-embed">
            <iframe
              title="Picki user flows"
              src="https://embed.figma.com/board/77uCMus34bkrrxgC85gOn9/Picki-user-flows?node-id=0-1&embed-host=share"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* DESIGN PROCESS SECTION */}
      <section className="picki-design-section">
        <div className="picki-design-content">
          <p className="picki-section-label">{sec('06', 2)} – DESIGN PROCESS</p>

          <p className="picki-design-paragraph">
            The design strategy focused on creating an interface that feels approachable and playful without sacrificing clarity. The visual language needed to communicate that decisions are low-stakes while still being functional and intuitive. Typography, color, and interactions were all crafted to reduce cognitive load and encourage quick, confident use.
          </p>

          {/* STYLEGUIDE SUBSECTION */}
          <div className="picki-styleguide-section">
            <h2 className="picki-styleguide-header">STYLEGUIDE</h2>

            <div className="picki-styleguide-grid">
              <div className="picki-styleguide-left">
                <div className="picki-styleguide-block">
                  <h3 className="picki-styleguide-subtitle">COLOURS</h3>
                  <p className="picki-styleguide-description">
                    PICKI’s palette combines playful, vibrant colours that feel warm and modern. Soft pink creates friendliness, green adds a fresh and calming balance, deep purple brings contrast and depth, and yellow adds a sense of energy and brightness. Together, they create an approachable and lively look.
                  </p>
                  <div className="picki-panel">
                    <img src={pickiColour} alt="Picki Color Palette" className="picki-styleguide-img" />
                  </div>
                </div>

                <div className="picki-styleguide-block">
                  <h3 className="picki-styleguide-subtitle">LOGO</h3>
                  <p className="picki-styleguide-description">
                    The primary PICKI logo features an arrow in place of the first ‘I’. This arrow signifies a cursor or selector, incorporating the main idea of the PICKI app which is to collaborate among friends and group members to select an event. The typeface for the logo is Inter, a strong and clear typeface that allows the use of numerous fonts and sizes without the loss of readability and function.
                  </p>
                  <div className="picki-panel">
                    <img src={pickiLogo} alt="Picki Logo" className="picki-styleguide-img" />
                  </div>
                </div>
              </div>

              <div className="picki-styleguide-right">
                <div className="picki-styleguide-block">
                  <h3 className="picki-styleguide-subtitle">TYPOGRAPHY</h3>
                  <p className="picki-styleguide-description">
                    PICKI uses the Inter typeface for its versatility and readability across both digital and print. Its extensive Latin character set supports multiple languages, while the sharp letterforms create a nice contrast with the app’s rounded visual style.
                  </p>
                  <div className="picki-panel">
                    <img src={pickiTypography} alt="Picki Typography" className="picki-styleguide-img" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* WIREFRAMES SUBSECTION */}
          <div className="picki-wireframes-section">
            <h2 className="picki-wireframes-header">WIREFRAMES</h2>

            <div className="picki-design-screens">
              <div className="picki-panel picki-screens-panel">
                <img src={pickiCore} alt="Picki App Screens" className="picki-design-image" />
                <div className="picki-design-labels">
                  <p className="picki-design-label">Host-Led Planning</p>
                  <p className="picki-design-label">Shared Picks</p>
                  <p className="picki-design-label">Randomized Outcome</p>
                </div>
              </div>
            </div>

            <div className="picki-figma-embed">
              <iframe
                title="Picki design file"
                src="https://embed.figma.com/design/Ph43MP7u4CTx9Kkd3imj1U/PICKI-A4-Mockup?node-id=0-1&embed-host=share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* CHALLENGES SECTION */}
      <section className="picki-demo-section">
        <div className="picki-demo-content">
          <p className="picki-section-label">{sec('07', 0)} – CHALLENGES</p>

          <h2 className="picki-demo-title">
            NAVIGATING <span className="highlight-italic">DESIGN CHALLENGES</span>
          </h2>

          <p className="picki-demo-paragraph">
            Throughout the development of Picki, several challenges emerged that required creative problem-solving and iterative refinement.
          </p>

          <div className="picki-challenges-grid">
            <div className="picki-challenge-card" style={{ '--c': ACCENTS[0] }}>
              <span className="picki-challenge-card-num">01</span>
              <h3 className="picki-challenge-card-title">Balancing Randomness with Control</h3>
              <p className="picki-challenge-card-text">
                Users wanted the app to feel spontaneous but also needed enough control to ensure suggestions matched their preferences. The solution involved implementing filters for event type, location radius, and budget before randomization occurs.
              </p>
            </div>

            <div className="picki-challenge-card" style={{ '--c': ACCENTS[1] }}>
              <span className="picki-challenge-card-num">02</span>
              <h3 className="picki-challenge-card-title">Supporting Indecisive Users</h3>
              <p className="picki-challenge-card-text">
                Some users struggled with submitting their own pick, unsure of what to choose. To address this, Picki offers a quiz feature that asks questions about preferences and mood, then generates personalized suggestions to help users make their selection.
              </p>
            </div>

            <div className="picki-challenge-card" style={{ '--c': ACCENTS[2] }}>
              <span className="picki-challenge-card-num">03</span>
              <h3 className="picki-challenge-card-title">Maintaining Playful Tone</h3>
              <p className="picki-challenge-card-text">
                The app needed to feel fun without seeming childish. Through iterative testing, the blob characters, typography, and interactions were refined to strike a balance between playful and polished.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <EclipseFooter />
    </div>
  );
};

export default PickiPage;