import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Shared eclipse contact footer. Styles live in App.css (.eclipse-*).
// As you scroll down, the moon slides across the sun until totality: the sun
// disappears, the corona flares, and the contact content fades in.
const footerLinks = [
  { label: 'LINKEDIN', href: 'https://www.linkedin.com/' },
  { label: 'PROJECTS', to: '/projects' },
  { label: 'ABOUT ME', to: '/about' },
  { label: 'CONTACT', to: '/contact' }
];

const smooth = (t) => t * t * (3 - 2 * t);

export default function EclipseFooter({ id }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let total = false;

    const apply = (p) => {
      el.style.setProperty('--p', p.toFixed(3));
      el.classList.toggle('eclipse-in', p > 0.55);
      const isTotal = p > 0.97;
      if (isTotal && !total) {
        el.classList.remove('eclipse-flash');
        void el.offsetWidth; // restart the flash animation
        el.classList.add('eclipse-flash');
      }
      total = isTotal;
    };

    if (reduce) {
      apply(1);
      return;
    }

    const update = () => {
      const vh = window.innerHeight;
      const top = el.getBoundingClientRect().top;
      let raw = (vh * 0.95 - top) / (vh * 0.7);
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) raw = 1;
      apply(smooth(Math.min(1, Math.max(0, raw))));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <section id={id} ref={ref} className="eclipse-section">
      <div className="eclipse-container">
        <div className="eclipse-corona">
          <div className="corona-ring" />
        </div>
        <div className="eclipse-sun" />
        <div className="eclipse-body">
          <span className="eclipse-label">ECLIPSE CORE</span>
        </div>
      </div>

      <div className="eclipse-content">
        <span className="eclipse-badge">ORBITAL CONTACT</span>

        <h2 className="eclipse-heading">
          LET'S CREATE SOMETHING OUT OF THIS WORLD.
        </h2>

        <a href="mailto:hello@belindato.com" className="eclipse-cta">
          SAY HELLO @ BELINDATO.COM
        </a>

        <div className="eclipse-socials">
          {footerLinks.map((l) =>
            l.to ? (
              <Link key={l.label} to={l.to}>
                {l.label}
              </Link>
            ) : (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer">
                {l.label}
              </a>
            )
          )}
        </div>
      </div>
    </section>
  );
}