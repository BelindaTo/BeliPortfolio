import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DressUpDarlingPage.css';
import EclipseFooter from './EclipseFooter';

import bodyImage from './images/body.png';
import pajamasImage from './images/pajamas.png';
import gardenerImage from './images/gardener.png';
import sundressImage from './images/sundress.png';
import casualImage from './images/casual.png';
import classyImage from './images/classy.png';
import fallImage from './images/fall.png';
import blackImage from './images/black.png';
import pigtailImage from './images/pigtail.png';
import blondImage from './images/blond.png';
import braidImage from './images/braid.png';
import purpleImage from './images/purple.png';
import pinkImage from './images/pink.png';
import greenImage from './images/green.png';
import dressUpMockup from './images/dress-up-mockup.png';
import blondBlack from './images/blond-black.png';

const ACCENTS = ['#ff5a52', '#f2b705', '#6f94ff'];
const sec = (n, i) => <span className={`sec-num sec-${['red', 'yellow', 'blue'][i % 3]}`}>{n}</span>;

// wardrobe rows, same grouping as the original page
const WARDROBE = [
  [
    { name: 'Gardener', src: gardenerImage },
    { name: 'Sundress', src: sundressImage },
    { name: 'Casual', src: casualImage }
  ],
  [
    { name: 'Classy', src: classyImage },
    { name: 'Fall', src: fallImage }
  ],
  [
    { name: 'Black', src: blackImage },
    { name: 'Pigtail', src: pigtailImage },
    { name: 'Blond', src: blondImage },
    { name: 'Braid', src: braidImage }
  ],
  [
    { name: 'Purple', src: purpleImage },
    { name: 'Pink', src: pinkImage },
    { name: 'Green', src: greenImage }
  ]
];

const BURST = Array.from({ length: 10 }, (_, i) => i);

export default function DressUpDarlingPage() {
  const navigate = useNavigate();
  const projectTab = 'interactive';
  const pageRef = useRef(null);
  const [picked, setPicked] = useState(WARDROBE[0][0]);
  const [pickCount, setPickCount] = useState(0);

  useEffect(() => {
    document.title = 'Dress-Up Darling — Belinda To';
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

  // chunky pixel sparkles for the intro, a nod to the 90s game
  const pixels = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        x: 4 + Math.random() * 92,
        y: 6 + Math.random() * 88,
        size: 6 + Math.floor(Math.random() * 3) * 3,
        delay: Math.random() * 3,
        c: ACCENTS[i % 3]
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
            en.target.classList.add('du-in');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    blocks.forEach((el) => {
      el.classList.add('du-reveal');
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const pick = (item) => {
    setPicked(item);
    setPickCount((n) => n + 1);
  };

  return (
    <div className="dress-up-page" ref={pageRef}>
      <div className="du-stars" aria-hidden="true">
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
        <i className="du-shoot du-shoot-a" />
        <i className="du-shoot du-shoot-b" />
      </div>

      {/* BACK ARROW */}
      <button className="back-arrow" onClick={() => navigate(`/projects?tab=${projectTab}`)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Project Info */}
      <section className="du-info-section">
        <div className="du-pixels" aria-hidden="true">
          {pixels.map((p, k) => (
            <span
              key={k}
              style={{
                left: p.x + '%',
                top: p.y + '%',
                width: p.size,
                height: p.size,
                background: p.c,
                animationDelay: p.delay + 's'
              }}
            />
          ))}
        </div>

        <div className="du-info-container">
          <div className="du-info-content">
            <h1 className="du-info-title">
              DRESS-UP<br />DARLING
            </h1>

            <div className="du-info-block">
              <h3 className="du-info-label">ROLE</h3>
              <p className="du-info-text">GRAPHIC DESIGNER (CHARACTER) / FRONT-END DEVELOPER</p>
            </div>

            <div className="du-info-block">
              <h3 className="du-info-label">SOFTWARE</h3>
              <p className="du-info-text">PROCREATE, VISUAL STUDIO CODE, GITHUB</p>
            </div>
          </div>

          <div className="du-info-image">
            <img src={dressUpMockup} alt="Dress-Up Darling Mockup" />
          </div>
        </div>
      </section>

      {/* About */}
      <section className="du-about-section">
        <div className="du-about-container">
          <div className="du-about-image">
            <img src={blondBlack} alt="Blond and Black hair girl" />
          </div>

          <div className="du-about-text-container">
            <p className="du-section-label">ABOUT DRESS-UP DARLING</p>
            <p className="du-about-text">
              Dress Up Darling is a 90s-inspired browser game designed to bring back the simple joy
              of classic dress-up games through a playful and nostalgic experience. The challenge
              was to create an interface that felt comforting and intuitive while still appealing
              to a modern audience. The final solution focuses on creative self-expression through
              soft visuals and gentle interactions.
            </p>
          </div>
        </div>
      </section>

      {/* Game */}
      <section className="du-game-section">
        <div className="du-game-container">
          <div className="du-game-header">
            <p className="du-section-label">{sec('02', 1)} – PLAY THE GAME</p>
            <p className="du-game-instructions">
              Please click the game screen once, use WASD or arrow keys to move around as the cat and dress up your darling! Once spawned, please click on the screen once more. Spawn as many variants as you like! Enjoy!
            </p>
          </div>

          <div className="du-game-embed">
            <div className="du-game-bar" aria-hidden="true">
              <span /><span /><span />
              <em>DRESS-UP DARLING.EXE</em>
            </div>
            <iframe
              src="https://dress-up-game-pi.vercel.app/"
              title="Dress-Up Darling Game"
              className="du-game-iframe"
            />
          </div>
        </div>
      </section>

      {/* Character */}
      <section className="du-character-section">
        <div className="du-character-container">
          <p className="du-section-label">{sec('03', 2)} – CHARACTER DESIGN</p>
          <p className="du-character-description">
            Inspired by 90s pixel games, Dress-Up Darling draws from the quiet joy of dressing characters on a shared screen. The character designs embrace soft proportions, expressive eyes, and simple silhouettes to evoke comfort and familiarity. Each character is designed to feel approachable and timeless—like a game remembered, not rediscovered.
          </p>

          <div className="du-character-images">
            <div className="du-character-item">
              <div className="du-pedestal">
                <img src={bodyImage} alt="Body" className="du-character-img" />
              </div>
              <p className="du-character-label">BODY</p>
            </div>

            <div className="du-character-item">
              <div className="du-pedestal">
                <img src={pajamasImage} alt="Default" className="du-character-img" />
              </div>
              <p className="du-character-label">DEFAULT</p>
            </div>
          </div>
        </div>
      </section>

      {/* Wardrobe */}
      <section className="du-clothing-section">
        <div className="du-clothing-container">
          <p className="du-section-label">{sec('04', 0)} – WARDROBE</p>

          {/* spotlight: click any piece below to put it on the stage */}
          <div className="du-spotlight">
            <div className="du-spotlight-stage">
              <span className="du-spotlight-ring" />
              <div key={pickCount} className="du-spotlight-item">
                {BURST.map((i) => (
                  <i key={i} className="du-burst" style={{ '--a': `${i * 36}deg`, '--c': ACCENTS[i % 3] }} />
                ))}
                <img src={picked.src} alt={picked.name} />
              </div>
            </div>
            <p className="du-spotlight-name">{picked.name}</p>
            <p className="du-spotlight-hint">CLICK ANY PIECE TO TRY IT ON THE STAGE</p>
          </div>

          <div className="du-wardrobe">
            {WARDROBE.map((row, r) => (
              <div className="du-clothing-row" key={r}>
                {row.map((item, i) => (
                  <button
                    key={item.name}
                    className={`du-clothing-btn ${picked.name === item.name ? 'on' : ''}`}
                    style={{ '--c': ACCENTS[(r + i) % 3] }}
                    onClick={() => pick(item)}
                    aria-label={`Show ${item.name}`}
                  >
                    <img src={item.src} className="du-clothing-img" alt="" />
                    <span className="du-clothing-tag">{item.name}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <EclipseFooter />
    </div>
  );
}