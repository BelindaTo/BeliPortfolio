import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './ProjectsPage.css';
import canMockup from './images/canmockup.png';
import scaffoldMain from "./images/scaffold-main.png";
import pickiMain from "./images/picki-main.png";
import posterMain from './images/poster-main.png';
import playlistMockup from './images/playlist-mockup.png';
import dressUpMockup from "./images/dress-up-mockup.png";
import herschelMain from './images/HSC_WHITEWOVEN-ON-BLACK.jpg';
import certificates from './images/Herschel-certificate.png';

// Defined outside the component so it isn't rebuilt on every render
const projects = [
  {
    id: 1,
    title: 'SCAFFOLD',
    role: 'LEAD DESIGNER / FRONT-END DEVELOPER',
    description: 'An AI-powered grant app that checks eligibility and assists with applications for apprentices.',
    imageAlign: 'right',
    category: ['APPS'],
    link: '/scaffold',
    image: scaffoldMain,
    embedUrl: null,
    buttonText: 'VIEW CASE STUDY'
  },
  {
    id: 2,
    title: 'PICKI',
    role: 'LEAD DESIGNER / FRONT-END DEVELOPER',
    description: 'An event planning app designed for indecisiveness friend groups. Let PICKI decide so you don\'t have to.',
    imageAlign: 'left',
    category: ['APPS'],
    link: '/picki',
    image: pickiMain,
    embedUrl: null,
    buttonText: 'VIEW'
  },
  {
    id: 3,
    title: 'MUSIC PLAYER',
    role: 'DESIGNER / FRONT-END DEVELOPER',
    description: 'An interactive music player with custom controls and playlist management.',
    imageAlign: 'left',
    category: ['INTERACTIVE'],
    link: '/music-player',
    image: playlistMockup,
    embedUrl: null,
    buttonText: 'VIEW'
  },
  {
    id: 4,
    title: 'DRESS-UP DARLING',
    role: 'GRAPHIC DESIGNER',
    description: 'a 90s-inspired browser game where you dress up your avatar. Playful and nostalgic, it captures the charm of your favourite classic dress-up games.',
    imageAlign: 'right',
    category: ['INTERACTIVE'],
    link: '/dress-up-darling',
    image: dressUpMockup,
    embedUrl: null,
    buttonText: 'VIEW'
  },
  {
    id: 5,
    title: 'WISP SODAS',
    role: 'GRAPHIC DESIGNER',
    description: 'A vibrant soda brand identity featuring playful illustrations and bold typography for a refreshing beverage line.',
    imageAlign: 'left',
    category: ['GRAPHIC'],
    link: '/wisp-sodas',
    image: canMockup,
    embedUrl: null,
    buttonText: 'VIEW'
  },
  {
    id: 6,
    title: 'FLUFF & FLOUR',
    role: 'GRAPHIC DESIGNER',
    description: 'A collection of poster designs showcasing creative concepts and visual storytelling.',
    imageAlign: 'right',
    category: ['GRAPHIC'],
    link: '/posters',
    image: posterMain,
    embedUrl: null,
    buttonText: 'VIEW'
  },
  {
    id: 7,
    title: 'HERSCHEL SUPPLY CO.',
    role: 'GRAPHIC DESIGN INTERN',
    description: 'Print, packaging and retail design for Minecraft, Golf and more during my graphic design internship at Herschel Supply Co.',
    imageAlign: 'right',
    category: ['INTERNSHIP'],
    link: '/herschel',
    image: certificates,
    embedUrl: null,
    buttonText: 'VIEW'
  }
];

const filters = [
  { name: 'APPS', c: '#d4161c', t: '#fbf9f1' },        // red
  { name: 'INTERACTIVE', c: '#f2b705', t: '#121316' },  // yellow
  { name: 'GRAPHIC', c: '#1747c9', t: '#fbf9f1' },      // blue
  { name: 'INTERNSHIP', c: '#f8fafc', t: '#0a0b0e' }    // white
];

const cardColors = [
  { c: '#d4161c', t: '#fbf9f1', cl: '#ff5a52' },
  { c: '#1747c9', t: '#fbf9f1', cl: '#6f94ff' },
  { c: '#f2b705', t: '#121316', cl: '#f2b705' }
];

const ProjectsPage = () => {
  const [searchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState(searchParams.get('tab')?.toUpperCase() || 'APPS');
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  const [view, setView] = useState('cards'); // 'cards' | 'index'
  const [hovered, setHovered] = useState(null);
  const previewRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0, px: 0, py: 0 });

  // Index view: the preview image eases after the cursor
  useEffect(() => {
    if (view !== 'index') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener('mousemove', onMove);

    let raf;
    const tick = () => {
      const m = mouse.current;
      const ease = reduce ? 1 : 0.14;
      const dx = m.x - m.px;
      m.px += dx * ease;
      m.py += (m.y - m.py) * ease;
      if (previewRef.current) {
        const tilt = Math.max(-8, Math.min(8, dx * 0.08));
        previewRef.current.style.transform =
          `translate3d(${m.px}px, ${m.py}px, 0) translate(-50%, -50%) rotate(${tilt}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [view]);

  useEffect(() => {
    document.title = "Projects — Belinda To";
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

  // Preload every project image once so tab switches don't wait on loading/decoding
  useEffect(() => {
    projects.forEach(project => {
      if (!project.image) return;
      const img = new Image();
      img.src = project.image;
    });
  }, []);

  const filteredProjects = projects.filter(project =>
    project.category.includes(activeFilter)
  );

  const handleFilterChange = (filter) => {
    // Ignore clicks on the active tab or while a switch is already animating
    if (filter === activeFilter || isAnimating) return;

    setIsAnimating(true);

    // Wait for the (short) fade out animation
    setTimeout(() => {
      setActiveFilter(filter);
      setIsAnimating(false);
    }, 150);
  };

  return (
    <div className="portfolio">
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

      {/* line-art planet + sparkles, kept small and quiet */}
      <svg className="pp-planet" viewBox="0 0 160 120" aria-hidden="true">
        <path d="M8 60 A72 19 0 0 1 152 60" className="pp-line pp-blue" transform="rotate(-18 80 60)" />
        <circle cx="80" cy="60" r="34" className="pp-line pp-fill" />
        <path d="M52 50 Q80 60 108 48" className="pp-line pp-thin" />
        <path d="M48 66 Q80 78 112 64" className="pp-line pp-thin" />
        <path d="M8 60 A72 19 0 0 0 152 60" className="pp-line pp-blue" transform="rotate(-18 80 60)" />
      </svg>
      <svg className="pp-sparkle pp-sparkle-a" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" />
      </svg>
      <svg className="pp-sparkle pp-sparkle-b" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" />
      </svg>

      <header className="pp-header">
        <span className="pp-label">02 / Mission Log</span>
        <h1 className="pp-title">PROJECTS</h1>
      </header>

      <div className="filter-container">
        {filters.map(filter => (
          <button
            key={filter.name}
            className={`filter-btn ${activeFilter === filter.name ? 'active' : ''}`}
            style={{ '--c': filter.c, '--ct': filter.t }}
            onClick={() => handleFilterChange(filter.name)}
          >
            {filter.name}
          </button>
        ))}
      </div>

      <div className="view-toggle" role="group" aria-label="Project view">
        <button
          className={view === 'cards' ? 'active' : ''}
          onClick={() => setView('cards')}
        >
          CARDS
        </button>
        <button
          className={view === 'index' ? 'active' : ''}
          onClick={() => setView('index')}
        >
          INDEX
        </button>
      </div>

      {view === 'index' && (
        <>
          <div className={`index-list ${isAnimating ? 'fade-out' : 'fade-in'}`}>
            {filteredProjects.map((project, i) => (
              <div
                key={project.id}
                className="index-row"
                style={{ '--c': cardColors[i % 3].c, '--ct': cardColors[i % 3].t, '--cl': cardColors[i % 3].cl }}
                onMouseEnter={() => setHovered(project)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => project.link && navigate(project.link)}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && project.link && navigate(project.link)}
              >
                <span className="index-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="index-title">{project.title}</span>
                <span className="index-role">{project.role}</span>
                <span className="index-arrow" aria-hidden="true">→</span>
              </div>
            ))}
          </div>

          <div
            ref={previewRef}
            className={`index-preview ${hovered ? 'show' : ''}`}
            style={hovered ? { '--c': cardColors[filteredProjects.indexOf(hovered) % 3].c } : undefined}
            aria-hidden="true"
          >
            {hovered && hovered.image && <img src={hovered.image} alt="" />}
          </div>
        </>
      )}

      <div
        className={`projects-container ${isAnimating ? 'fade-out' : 'fade-in'}`}
        style={view === 'index' ? { display: 'none' } : undefined}
      >
        {filteredProjects.map((project, i) => (
          <div
            key={project.id}
            className={`project-card ${project.imageAlign === 'left' ? 'reverse' : ''}`}
            style={{ '--c': cardColors[i % 3].c, '--ct': cardColors[i % 3].t, '--cl': cardColors[i % 3].cl }}
          >
            <div className="project-content">
              <span className="project-num">
                <svg className="pp-spark" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" />
                </svg>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h2 className="project-title">{project.title}</h2>
              <p className="project-role">{project.role}</p>
              <p className="project-description">{project.description}</p>
              <button
                className="view-btn"
                onClick={() => {
                  if (project.link) {
                    navigate(project.link);
                  }
                }}
              >
                {project.buttonText || 'VIEW'}
              </button>
            </div>
            <div className="project-image">
              {project.image && (
                <img src={project.image} alt={project.title} decoding="async" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;