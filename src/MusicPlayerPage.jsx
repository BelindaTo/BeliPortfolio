import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MusicPlayerPage.css';
import EclipseFooter from './EclipseFooter';
import playlistMockup from './images/playlist-mockup.png';
import darkMode from './images/dark-mode.png';
import lightMode from './images/light-mode.png';
import lightModeMockup from './images/light-mode-mockup.png';

const sec = (n, i) => <span className={`sec-num sec-${['red', 'yellow', 'blue'][i % 3]}`}>{n}</span>;

const MusicPlayerPage = () => {
  const navigate = useNavigate();
  const projectTab = 'interactive';
  const pageRef = useRef(null);
  const [mode, setMode] = useState('dark');

  useEffect(() => {
    document.title = 'Music Player — Belinda To';
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
            en.target.classList.add('mp-in');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    blocks.forEach((el) => {
      el.classList.add('mp-reveal');
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

  return (
    <div className="music-player-page" ref={pageRef}>
      <div className="mp-stars" aria-hidden="true">
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
        <i className="mp-shoot mp-shoot-a" />
        <i className="mp-shoot mp-shoot-b" />
      </div>

      {/* BACK ARROW */}
      <button className="back-arrow" onClick={() => navigate(`/projects?tab=${projectTab}`)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* INTRO SECTION */}
      <section className="music-intro-section">
        <div className="music-content">
          <div className="music-text">
            <h1 className="music-title">
              MUSIC<br />PLAYER
            </h1>

            <div className="music-info-group">
              <p className="music-label">ROLE</p>
              <p className="music-value">DESIGNER / FRONT-END DEVELOPER</p>
            </div>

            <div className="music-info-group">
              <p className="music-label">SOFTWARE</p>
              <p className="music-value">REACT, CSS, JAVASCRIPT</p>
            </div>

            <div className="mp-eq" aria-hidden="true">
              <span /><span /><span /><span /><span /><span /><span />
              <em>NOW PLAYING</em>
            </div>

            <a
              href="https://comp3170-project-45pa.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="music-btn"
            >
              Try Music Player
            </a>
          </div>

          <div className="music-image-wrap" onMouseMove={tilt} onMouseLeave={untilt}>
            <div className="music-image">
              <img src={playlistMockup} alt="Playlist Mockup" />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="music-about-section">
        <div className="mp-about-content">
          <div className="mp-about-image">
            <img src={lightModeMockup} alt="Light Mode Mockup" />
          </div>

          <div className="mp-about-text">
            <p className="mp-section-label">ABOUT THE MUSIC PLAYER</p>

            <p className="mp-about-paragraph">
              This interactive music player was built to make studying feel calmer and more focused, using soft visuals and a clean layout that students can comfortably keep open while working.
            </p>

            <p className="mp-about-paragraph">
              Powered by the YouTube API, the player allows access to almost any song, including live performances and unreleased tracks, while supporting easy playlist creation and switching for free. It acts as a flexible study companion that keeps sessions flowing.
            </p>
          </div>
        </div>
      </section>

      {/* VIDEO SECTION */}
      <section className="music-video-section">
        <div className="mp-video-content">
          <p className="mp-section-label">{sec('02', 1)} – DEMO</p>
          <div className="mp-video-container">
            <iframe
              src="https://www.youtube.com/embed/gKTwX7GvwJ8"
              title="Music Player Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* DESIGN SECTION */}
      <section className="music-design-section">
        <div className="music-design-content">
          <p className="mp-section-label">{sec('03', 2)} – DESIGN</p>

          <p className="music-design-paragraph">
            The interface was inspired by Spotify's use of gradients to create atmosphere and mood, rather than relying on heavy visual elements. Building on this idea, the design uses soft gradient transitions to give the playlist a sense of depth and focus without becoming distracting.
          </p>

          <p className="music-design-paragraph">
            The playlist is visualized as a single, centered space that can be comfortably looked at for long periods of time, making it suitable for studying or background listening. By keeping the layout minimal and the colours smooth and ambient, the design encourages focus while still maintaining a sense of movement and life through subtle visual shifts.
          </p>

          {/* dark / light switch */}
          <div className="mp-mode">
            <div className="mp-mode-toggle" role="tablist" aria-label="Colour mode">
              <span className={`mp-mode-thumb ${mode}`} />
              <button
                role="tab"
                aria-selected={mode === 'dark'}
                className={mode === 'dark' ? 'on' : ''}
                onClick={() => setMode('dark')}
              >
                ☾ DARK
              </button>
              <button
                role="tab"
                aria-selected={mode === 'light'}
                className={mode === 'light' ? 'on' : ''}
                onClick={() => setMode('light')}
              >
                ☀ LIGHT
              </button>
            </div>

            <div className={`mp-mode-stage ${mode}`}>
              <img src={darkMode} alt="Dark Mode" className={mode === 'dark' ? 'show' : ''} />
              <img src={lightMode} alt="Light Mode" className={mode === 'light' ? 'show' : ''} />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <EclipseFooter />
    </div>
  );
};

export default MusicPlayerPage;