import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Lenis from "lenis";
import EclipseFooter from "./EclipseFooter";
import "./App.css";
import logo from "./assets/Logo.svg";
import ProjectsPage from "./ProjectsPage";
import WispSodasPage from "./WispSodasPage";
import DressUpDarlingPage from "./DressUpDarlingPage";
import PostersPage from "./PostersPage";
import MusicPlayerPage from "./MusicPlayerPage";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";
import PickiPage from "./PIckiPage";
import HerschelPage from "./Herschelpage";
import ScaffoldPage from "./ScaffoldPage";
import GolfLauncher from "./GolfGame";

import scaffoldMain from "./images/scaffold-main.png";
import herschelFeatured from "./images/Herschel-certificate.png";


/* =========================
   FEATURED PROJECTS
   (add or reorder cards here)
========================= */

const featuredProjects = [
  {
    id: "herschel",
    title: "HERSCHEL SUPPLY CO.",
    role: "GRAPHIC DESIGN INTERN",
    desc: "Print, packaging and retail design for Minecraft, Golf and more during my graphic design internship at Herschel Supply Co.",
    link: "/herschel",
    image: herschelFeatured,
    alt: "Herschel APAC retail competition award certificates designed as vintage postcards",
    buttonText: "VIEW WORK",
  },
  {
    id: "scaffold",
    title: "SCAFFOLD",
    role: "LEAD DESIGNER / FRONT-END DEVELOPER",
    desc: "An AI-powered grant app that checks eligibility and assists with applications for apprentices.",
    link: "/scaffold",
    image: scaffoldMain,
    alt: "Scaffold App",
    buttonText: "VIEW CASE STUDY",
  },
];

/* Links shown under the eclipse. Use `to` for pages on this site, `href` for outside links. */
const footerLinks = [
  { label: "LINKEDIN", href: "https://www.linkedin.com/" },
  { label: "PROJECTS", to: "/projects" },
  { label: "ABOUT ME", to: "/about" },
  { label: "CONTACT", to: "/contact" },
];


/* =========================
   SMOOTH SCROLL (LENIS)
========================= */

function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Scroll to top on route change
  useLayoutEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [location.pathname]);

  return children;
}


/* =========================
   LAYOUT WRAPPER
========================= */

function Layout({ children }) {
  return <SmoothScroll>{children}</SmoothScroll>;
}


/* =========================
   CUSTOM CURSOR
========================= */

function CustomCursor() {
  const wrapRef = useRef(null);
  const rocketRef = useRef(null);
  const flameRef = useRef(null);
  const trailRefs = useRef([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [down, setDown] = useState(false);
  const [hot, setHot] = useState(false);
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    const touch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0;
    setIsTouchDevice(touch);
    if (touch) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const m = { x: -100, y: -100 }; // where the mouse is
    const p = { x: -100, y: -100 }; // where the rocket is
    const trail = Array.from({ length: 6 }, () => ({ x: -100, y: -100 }));
    let seen = false;
    let angle = -45; // rocket points up-left when parked, like a normal pointer
    let target = -45;
    let speed = 0;
    let lastMove = 0;
    let raf;

    const onMove = (e) => {
      m.x = e.clientX;
      m.y = e.clientY;
      lastMove = performance.now();
      if (!seen) {
        seen = true;
        p.x = m.x;
        p.y = m.y;
        trail.forEach((t) => { t.x = m.x; t.y = m.y; });
      }
    };

    const onDown = () => {
      setDown(true);
      setClicks((c) => c + 1);
    };
    const onUp = () => setDown(false);
    const onOver = (e) => {
      const el = e.target;
      setHot(
        !!(el && el.closest && el.closest('a, button, [role="button"], input, textarea, select, summary, label, .orbit-node'))
      );
    };

    const tick = (now) => {
      const dx = m.x - p.x;
      const dy = m.y - p.y;
      const v = Math.hypot(dx, dy);
      p.x = m.x;
      p.y = m.y;
      speed += (v - speed) * 0.2;

      // the nose points the way you're travelling
      if (v > 1.2) target = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
      else if (now - lastMove > 700) target = -45;
      const d = ((target - angle + 540) % 360) - 180;
      angle += d * 0.18;

      const wrap = wrapRef.current;
      const rocket = rocketRef.current;
      const flame = flameRef.current;
      if (wrap) wrap.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
      if (rocket) rocket.style.transform = `rotate(${angle.toFixed(2)}deg)`;
      if (flame) {
        flame.style.transform = `scaleY(${(0.45 + Math.min(speed / 12, 1.3)).toFixed(2)})`;
      }

      // stardust trail
      let prev = p;
      trail.forEach((t, i) => {
        t.x += (prev.x - t.x) * 0.34;
        t.y += (prev.y - t.y) * 0.34;
        prev = t;
        const el = trailRefs.current[i];
        if (el) {
          el.style.transform = `translate3d(${t.x}px, ${t.y}px, 0) scale(${(1 - i * 0.14).toFixed(2)})`;
          el.style.opacity = reduce ? 0 : (Math.min(speed / 9, 1) * (0.9 - i * 0.13)).toFixed(2);
        }
      });

      raf = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  // Don't render cursor on touch devices
  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      <div className="rc-trail" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span key={i} ref={(el) => { trailRefs.current[i] = el; }} />
        ))}
      </div>

      <div ref={wrapRef} className="custom-cursor" aria-hidden="true">
        {/* click burst, centred on the nose */}
        <div key={clicks} className={`rc-burst ${clicks ? "go" : ""}`}>
          <i /><i />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <b key={i} style={{ "--a": `${i * 45}deg` }} />
          ))}
        </div>

        <div ref={rocketRef} className={`rc-rocket ${hot ? "hot" : ""} ${down ? "down" : ""}`}>
          <span ref={flameRef} className="rc-flame-wrap">
            <svg className="rc-flame" viewBox="0 0 14 18" aria-hidden="true">
              <path d="M0 0 L7 18 L14 0 Z" fill="#f2b705" />
              <path d="M3.5 0 L7 10 L10.5 0 Z" fill="#d4161c" />
            </svg>
          </span>
          <svg className="rc-body" viewBox="0 0 28 34" aria-hidden="true">
            {/* fins */}
            <path d="M8 22 L1.5 32 L8.5 29 Z" fill="#d4161c" stroke="var(--rc-stroke)" strokeWidth="1.2" strokeLinejoin="round" />
            <path d="M20 22 L26.5 32 L19.5 29 Z" fill="#d4161c" stroke="var(--rc-stroke)" strokeWidth="1.2" strokeLinejoin="round" />
            {/* hull */}
            <path
              d="M14 0.6 C19.6 8 20.6 17 19.8 30 L8.2 30 C7.4 17 8.4 8 14 0.6 Z"
              fill="var(--rc-fill)"
              stroke="var(--rc-stroke)"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            {/* window */}
            <circle cx="14" cy="14.5" r="3.2" fill="#1747c9" stroke="var(--rc-stroke)" strokeWidth="1.1" />
          </svg>
        </div>
      </div>
    </>
  );
}


/* =========================
   SPACE EFFECTS
   - starfield of drifting, twinkling stars joined into constellations (canvas)
   - light -> dark "eclipse" switch near the bottom of the page
   Only mounted on the landing page, and cleans up after itself so
   the other pages keep their normal cream background.
========================= */

function SpaceEffects() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.body.classList.add("space-page");

    let width = 0;
    let height = 0;
    let stars = [];
    let isDark = false;
    let rafId;

    const LINK_DISTANCE = 150;
    const CURSOR_DISTANCE = 180;

    // cursor + shooting star state
    const mouse = { x: 0, y: 0, active: false };
    let shoot = null;
    let nextShoot = performance.now() + 5000;

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onMouseLeave = () => {
      mouse.active = false;
    };

    /* ---------- starfield ---------- */

    function initStars() {
      const count = Math.round((width * height) / 14000);
      stars = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: reduceMotion ? 0 : (Math.random() - 0.5) * 0.3,
          vy: reduceMotion ? 0 : (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.5 + 1.5,
          depth: 0.5 + Math.random() * 0.5,
          alpha: Math.random() * 0.3 + 0.6,
          twinkleSpeed: Math.random() * 1.5 + 0.5,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    }

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initStars();
    }

    /* ---------- scroll: eclipse transition ---------- */

    function onScroll() {
      const section = document.querySelector(".eclipse-section");
      if (!section) return;

      // dark mode kicks in once the eclipse section is half way up the screen
      const trigger = window.innerHeight * 0.5;
      const top = section.getBoundingClientRect().top;

      const shouldBeDark = top < trigger;
      if (shouldBeDark !== isDark) {
        isDark = shouldBeDark;
        document.body.classList.toggle("space-dark", isDark);
      }

    }

    /* ---------- animation loop ---------- */

    function animate(now) {
      ctx.clearRect(0, 0, width, height);

      const t = now / 1000;
      const color = isDark ? "255, 255, 255" : "128, 132, 142"; // mid grey on cream

      // move stars
      stars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;
      });

      // depth parallax: far stars drift slower than near ones as you scroll,
      // and stars near the cursor lean gently toward it
      const scrollY = window.scrollY;
      const pts = stars.map((star) => {
        const off = (scrollY * 0.22 * star.depth) % height;
        let y = (star.y - off) % height;
        if (y < 0) y += height;
        let x = star.x;
        if (mouse.active && !reduceMotion) {
          const mdx = mouse.x - x;
          const mdy = mouse.y - y;
          const md = Math.hypot(mdx, mdy);
          if (md < CURSOR_DISTANCE && md > 0.1) {
            const pull = (1 - md / CURSOR_DISTANCE) * 0.12;
            x += mdx * pull;
            y += mdy * pull;
          }
        }
        return { x, y, d: star.depth };
      });

      // constellation lines between nearby stars
      ctx.lineWidth = 1.2;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < LINK_DISTANCE) {
            const lineAlpha = (1 - dist / LINK_DISTANCE) * 0.6;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(${color}, ${lineAlpha})`;
            ctx.stroke();
          }
        }
      }

      // the cursor joins the constellation
      if (mouse.active && !reduceMotion) {
        for (let i = 0; i < pts.length; i++) {
          const dist = Math.hypot(pts[i].x - mouse.x, pts[i].y - mouse.y);
          if (dist < CURSOR_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${color}, ${(1 - dist / CURSOR_DISTANCE) * 0.75})`;
            ctx.lineWidth = 1.4;
            ctx.stroke();
          }
        }
        ctx.lineWidth = 1.2;
      }

      // the stars themselves (with a gentle twinkle)
      stars.forEach((star, i) => {
        const twinkle = reduceMotion
          ? 1
          : 0.75 + 0.25 * Math.sin(t * star.twinkleSpeed + star.twinklePhase);

        ctx.beginPath();
        ctx.arc(pts[i].x, pts[i].y, star.radius, 0, Math.PI * 2);
        // dots are a touch lighter than the lines in light mode
        const dotColor = isDark ? color : "118, 122, 132";
        ctx.fillStyle = `rgba(${dotColor}, ${star.alpha * twinkle})`;
        ctx.fill();
      });

      // an occasional shooting star
      if (!reduceMotion) {
        if (!shoot && now > nextShoot) {
          shoot = {
            x: width * (0.45 + Math.random() * 0.55),
            y: -20,
            vx: -(9 + Math.random() * 4),
            vy: 5 + Math.random() * 2,
          };
        }
        if (shoot) {
          const tail = 9;
          const grad = ctx.createLinearGradient(
            shoot.x, shoot.y, shoot.x - shoot.vx * tail, shoot.y - shoot.vy * tail
          );
          const sc = isDark ? "255, 255, 255" : "90, 94, 104";
          grad.addColorStop(0, `rgba(${sc}, 0.9)`);
          grad.addColorStop(1, `rgba(${sc}, 0)`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 2;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(shoot.x, shoot.y);
          ctx.lineTo(shoot.x - shoot.vx * tail, shoot.y - shoot.vy * tail);
          ctx.stroke();
          ctx.lineWidth = 1.2;
          shoot.x += shoot.vx;
          shoot.y += shoot.vy;
          if (shoot.y > height + 60 || shoot.x < -120) {
            shoot = null;
            nextShoot = now + 7000 + Math.random() * 8000;
          }
        }
      }

      rafId = requestAnimationFrame(animate);
    }

    resize();
    onScroll();
    rafId = requestAnimationFrame(animate);

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.body.classList.remove("space-page", "space-dark");
    };
  }, []);

  return <canvas ref={canvasRef} className="space-canvas" />;
}


/* =========================
   HERO DECORATIONS
   - floating planets that drift around the edges of the hero
   - a slowly spinning "DIGITAL DESIGNER" badge
========================= */

function Planets() {
  return (
    <div className="planet-layer" aria-hidden="true">
      {/* ringed planet */}
      <div className="planet planet-a">
        <svg viewBox="0 0 160 120">
          <g transform="rotate(-18 80 60)">
            <path d="M8 60 A72 19 0 0 1 152 60" className="line line-blue" />
          </g>
          <circle cx="80" cy="60" r="34" className="line fill-cream" />
          <path d="M52 50 Q80 60 108 48" className="line thin" />
          <path d="M48 66 Q80 78 112 64" className="line thin" />
          <g transform="rotate(-18 80 60)">
            <path d="M8 60 A72 19 0 0 0 152 60" className="line line-blue" />
          </g>
        </svg>
      </div>

      {/* small planet with a red crater */}
      <div className="planet planet-b">
        <svg viewBox="0 0 70 70">
          <circle cx="35" cy="35" r="24" className="line fill-cream" />
          <circle cx="42" cy="28" r="5" className="line thin" />
          <circle cx="27" cy="43" r="3.5" className="line thin" />
          <circle cx="44" cy="44" r="2.5" className="dot-red" />
        </svg>
      </div>

      {/* banded planet */}
      <div className="planet planet-c">
        <svg viewBox="0 0 100 100">
          <defs>
            <clipPath id="planet-c-clip">
              <circle cx="50" cy="50" r="40" />
            </clipPath>
          </defs>
          <circle cx="50" cy="50" r="40" className="line fill-cream" />
          <g clipPath="url(#planet-c-clip)">
            <path d="M6 38 Q50 50 94 38" className="line thin" />
            <path d="M4 52 Q50 66 96 52" className="line thin" />
            <path d="M6 66 Q50 80 94 66" className="line thin" />
          </g>
        </svg>
      </div>

      {/* big planet half off the corner, with a yellow moon on its orbit */}
      <div className="planet planet-d">
        <svg viewBox="0 0 300 300">
          <circle cx="150" cy="150" r="130" className="line fill-cream faint" />
          <path d="M30 120 Q150 170 270 120" className="line thin faint" />
          <path d="M22 160 Q150 220 278 160" className="line thin faint" />
          <circle cx="150" cy="150" r="148" className="orbit-line" />
          <circle cx="38" cy="56" r="8" className="line fill-yellow" />
        </svg>
      </div>

      {/* crescent moon */}
      <div className="planet planet-e">
        <svg viewBox="0 0 40 40">
          <path d="M24 5 A16 16 0 1 0 35 27 A12.5 12.5 0 1 1 24 5 Z" className="line fill-yellow" />
        </svg>
      </div>

      {/* sparkles */}
      <div className="planet planet-s1">
        <svg viewBox="0 0 24 24">
          <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" className="line thin" />
        </svg>
      </div>
      <div className="planet planet-s2">
        <svg viewBox="0 0 24 24">
          <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" className="line thin line-red" />
        </svg>
      </div>
    </div>
  );
}

function DesignerBadge() {
  return (
    <div className="designer-badge" role="img" aria-label="Digital Designer">
      <svg viewBox="0 0 140 140" aria-hidden="true">
        <defs>
          <path
            id="designer-circle"
            d="M 70,70 m -52,0 a 52,52 0 1,1 104,0 a 52,52 0 1,1 -104,0"
          />
        </defs>
        <g className="designer-badge-ring">
          <text>
            <textPath href="#designer-circle" textLength="320" lengthAdjust="spacing">
              DIGITAL DESIGNER • DIGITAL DESIGNER •
            </textPath>
          </text>
        </g>
        <path
          className="designer-badge-star"
          d="M70 54 L74 66 L86 70 L74 74 L70 86 L66 74 L54 70 L66 66 Z"
        />
      </svg>
    </div>
  );
}


/* =========================
   ORBITING NAVIGATION
   The three main links live in one fixed layer that sits above everything.
   - Home page, top of the page: they slowly orbit the name. Hover the name
     area and the orbit pauses while the links glide into a row to click.
   - Scroll down (or visit any other page): they fly up and dock in the
     middle of the top bar and stay there as the site navigation.
   On phones the docked links sit to the right of the logo, and the home
   page shows them as a row under the name.
========================= */

const ORBIT_LINKS = [
  { label: "PROJECTS", to: "/projects", color: "#d4161c", textColor: "#fbf9f1" }, // red
  { label: "ABOUT ME", to: "/about", color: "#f2b705", textColor: "#121316" },    // yellow
  { label: "CONTACT", to: "/contact", color: "#1747c9", textColor: "#fbf9f1" },   // blue
];

function OrbitNav() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isHomeRef = useRef(isHome);
  isHomeRef.current = isHome;

  const layerRef = useRef(null);
  const ringRef = useRef(null);
  const nodeRefs = useRef([]);
  const nodeHoverRef = useRef(false);

  useEffect(() => {
    const layer = layerRef.current;
    const ring = ringRef.current;
    if (!layer || !ring) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(hover: none)").matches;

    const SPEED = 0.22; // radians per second: slow drift
    const smooth = (v) => v * v * (3 - 2 * v);

    let angle = -Math.PI / 2;
    let snap = 0; // 0 = orbiting, 1 = hover row
    let dock = isHomeRef.current ? 0 : 1; // 0 = near the name, 1 = docked in the top bar
    const mouse = { x: -1000, y: -1000 };
    let last = performance.now();
    let rafId;

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const mobile = vw <= 768;
      const home = isHomeRef.current;

      const stage = home ? document.querySelector(".orbit-stage") : null;
      const rect = stage ? stage.getBoundingClientRect() : null;

      /* ---- dock: orbit -> top bar ---- */
      const dockTarget = !home || !rect || window.scrollY > vh * 0.25 ? 1 : 0;
      dock += (dockTarget - dock) * Math.min(1, dt * 6);
      if (Math.abs(dockTarget - dock) < 0.001) dock = dockTarget;
      const D = smooth(dock);

      /* ---- hover: orbit -> row ---- */
      const alwaysRow = reduce || coarse || mobile;
      let hoverTarget = 0;
      if (rect) {
        const inside =
          mouse.x >= rect.left - 60 && mouse.x <= rect.right + 60 &&
          mouse.y >= rect.top - 60 && mouse.y <= rect.bottom + 120;
        hoverTarget = inside || nodeHoverRef.current ? 1 : 0;
      }
      const target = alwaysRow ? 1 : hoverTarget;
      snap += (target - snap) * Math.min(1, dt * 7);
      if (Math.abs(target - snap) < 0.001) snap = target;
      const e = smooth(snap);

      // orbit slows to a stop on hover and while docked
      angle += dt * SPEED * (1 - e) * (1 - D);

      /* ---- geometry (viewport coordinates) ---- */
      const W = rect ? rect.width : 300;
      const H = rect ? rect.height : 200;
      const cx = rect ? rect.left + rect.width / 2 : vw / 2;
      const cy = rect ? rect.top + rect.height / 2 : vh / 2;
      const rx = Math.max(120, Math.min(W / 2 + 50, vw / 2 - 70));
      const ry = H / 2 + 60;
      const gap = Math.min(190, (vw - 80) / 3);
      // top bar: centred on desktop, to the right of the logo on phones
      const dockGap = mobile ? Math.max(70, (vw - 106) / 3) : 150;
      const dockCx = mobile ? (vw + 74) / 2 : vw / 2;
      const dockY = mobile ? 35 : 48; // middle of the top bar

      ring.style.width = `${rx * 2}px`;
      ring.style.height = `${ry * 2}px`;
      ring.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      ring.style.opacity = rect ? String((1 - e) * (1 - D)) : "0";

      nodeRefs.current.forEach((node, i) => {
        if (!node) return;
        const a = angle + (i * Math.PI * 2) / ORBIT_LINKS.length;
        const ox = rx * Math.cos(a);
        const oy = ry * Math.sin(a);
        const depth = (Math.sin(a) + 1) / 2; // 0 = back of the orbit, 1 = front

        // near the name: blend orbit <-> row
        const rowX = (i - (ORBIT_LINKS.length - 1) / 2) * gap;
        const rowY = ry;
        const px = cx + ox + (rowX - ox) * e;
        const py = cy + oy + (rowY - oy) * e;
        const scaleO = (0.82 + 0.18 * depth) * (1 - e) + e;
        const opacityO = (0.6 + 0.4 * depth) * (1 - e) + e;

        // top bar position
        const dx = dockCx + (i - (ORBIT_LINKS.length - 1) / 2) * dockGap;
        const dy = dockY;

        const x = px + (dx - px) * D;
        const y = py + (dy - py) * D;
        const scale = scaleO + (1 - scaleO) * D;
        const opacity = opacityO + (1 - opacityO) * D;

        node.style.transform =
          `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
        node.style.opacity = String(opacity);
        node.style.zIndex = String(5 + Math.round(depth * 10));
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div ref={layerRef} className="orbit-layer">
      <div ref={ringRef} className="orbit-ring" />

      {ORBIT_LINKS.map((link, i) => (
        <Link
          key={link.to}
          to={link.to}
          className={`orbit-node ${location.pathname === link.to ? "active" : ""}`}
          style={{ "--c": link.color, "--ct": link.textColor }}
          ref={(el) => { nodeRefs.current[i] = el; }}
          onMouseEnter={() => { nodeHoverRef.current = true; }}
          onMouseLeave={() => { nodeHoverRef.current = false; }}
        >
          <span className="orbit-dot" />
          {link.label}
        </Link>
      ))}
    </div>
  );
}


/* =========================
   FEATURED CARDS
   - reveal on scroll (cards drift in from the sides, image unwipes)
   - slight tilt toward the cursor on hover
========================= */

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

// red / blue / yellow, in rotation
const CARD_COLORS = [
  { c: "#d4161c", t: "#fbf9f1" },
  { c: "#1747c9", t: "#fbf9f1" },
  { c: "#f2b705", t: "#121316" },
];

function FeaturedCard({ project, index }) {
  const [ref, inView] = useInView(0.2);
  const innerRef = useRef(null);

  const handleMove = (e) => {
    const el = innerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--tilt-x", `${-py * 4}deg`);
    el.style.setProperty("--tilt-y", `${px * 6}deg`);
  };

  const handleLeave = () => {
    const el = innerRef.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <div
      ref={ref}
      className={`spf-card ${index % 2 === 0 ? "spf-from-left" : "spf-from-right"} ${inView ? "in-view" : ""}`}
      style={{ transitionDelay: `${index * 0.18}s` }}
    >
      {/* the whole card is one big link */}
      <Link
        ref={innerRef}
        to={project.link}
        className="spf-card-inner"
        style={{ "--c": CARD_COLORS[index % 3].c, "--ct": CARD_COLORS[index % 3].t }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <div className="spf-media">
          <img src={project.image} alt={project.alt} loading="lazy" decoding="async" />
        </div>

        <div className="spf-text">
          <span className="spf-tag spf-reveal" style={{ "--i": 1 }}>
            {String(index + 1).padStart(2, "0")} / {project.role}
          </span>
          <h3 className="spf-title spf-reveal" style={{ "--i": 2 }}>{project.title}</h3>
          <p className="spf-desc spf-reveal" style={{ "--i": 3 }}>{project.desc}</p>
          <span className="spf-link spf-reveal" style={{ "--i": 4 }}>
            {project.buttonText} <span>&rarr;</span>
          </span>
        </div>
      </Link>
    </div>
  );
}


/* =========================
   LANDING PAGE
========================= */

function IntroSection() {
  const [ref, inView] = useInView(0.25);

  return (
    <section ref={ref} className={`space-intro ${inView ? "in-view" : ""}`}>
      <div className="intro-text">
        <span className="intro-label intro-reveal" style={{ "--i": 0 }}>
          01 / Transmission
        </span>

        <h2 className="intro-statement intro-reveal" style={{ "--i": 1 }}>
          Hi, I'm Belinda{" "}
          <span className="intro-aside">(if you couldn't already tell)</span>.
          I'm a digital designer who loves exploring new ideas and bringing my
          own to life.
        </h2>

        <p className="intro-body intro-reveal" style={{ "--i": 2 }}>
          My skills? I can make it happen.
        </p>
      </div>

      <div className="intro-art intro-reveal" style={{ "--i": 2 }} aria-hidden="true">
        <svg viewBox="0 0 400 400">
          {/* orbit paths */}
          <circle cx="200" cy="200" r="170" className="orbit-line" />
          <circle cx="200" cy="200" r="118" className="orbit-line" />

          {/* planet with ring */}
          <path d="M70 200 A130 34 0 0 1 330 200" className="line line-blue" transform="rotate(-18 200 200)" />
          <circle cx="200" cy="200" r="62" className="line fill-cream" />
          <path d="M152 184 Q200 204 248 182" className="line thin" />
          <path d="M146 214 Q200 236 254 212" className="line thin" />
          <path d="M70 200 A130 34 0 0 0 330 200" className="line line-blue" transform="rotate(-18 200 200)" />

          {/* orbiting moons */}
          <g className="intro-spin intro-spin-a">
            <circle cx="200" cy="30" r="11" className="line fill-yellow" />
          </g>
          <g className="intro-spin intro-spin-b">
            <circle cx="200" cy="82" r="8" className="line fill-red" />
          </g>
          <g className="intro-spin intro-spin-c">
            <circle cx="30" cy="200" r="6" className="line fill-blue" />
          </g>
        </svg>
      </div>
    </section>
  );
}

function LandingPage() {
  useEffect(() => {
    document.title = "Belinda To — Digital Designer";
  }, []);

  const [headerRef, headerInView] = useInView(0.3);

  // letters of the name lean away from the cursor, like it has gravity
  const letterRefs = useRef([]);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !fine) return;

    const state = letterRefs.current.map(() => ({ x: 0, y: 0, r: 0 }));
    const mouse = { x: -9999, y: -9999 };
    const RADIUS = 320;

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    let raf;
    const tick = () => {
      letterRefs.current.forEach((el, i) => {
        if (!el || !el.parentElement) return;
        const rect = el.parentElement.getBoundingClientRect();
        const dx = rect.left + rect.width / 2 - mouse.x;
        const dy = rect.top + rect.height / 2 - mouse.y;
        const d = Math.hypot(dx, dy) || 1;

        let tx = 0;
        let ty = 0;
        let tr = 0;
        if (d < RADIUS) {
          const f = Math.pow(1 - d / RADIUS, 2);
          tx = (dx / d) * f * 46;
          ty = (dy / d) * f * 46;
          tr = (dx / d) * f * 14;
        }
        const st = state[i];
        st.x += (tx - st.x) * 0.1;
        st.y += (ty - st.y) * 0.1;
        st.r += (tr - st.r) * 0.1;
        el.style.transform = `translate(${st.x.toFixed(2)}px, ${st.y.toFixed(2)}px) rotate(${st.r.toFixed(2)}deg)`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <SpaceEffects />

      {/* ================= HERO ================= */}
      <section className="space-hero">
                <DesignerBadge />
        <GolfLauncher />

        <div className="orbit-stage">
        <h1 className="hero-name">
          {"BELINDA".split("").map((c, i) => (
            <span
              key={i}
              className="letter"
              style={{ animationDelay: `${i * 0.09}s, ${1.2 + i * 0.25}s` }}
            >
              <span
                className="letter-inner"
                ref={(el) => { letterRefs.current[i] = el; }}
              >
                {c}
              </span>
            </span>
          ))}
        </h1>
        </div>
      </section>

      {/* ================= INTRO ================= */}
      <IntroSection />

      {/* ================= FEATURED ================= */}
      <section id="projects" className="space-projects">
        <div ref={headerRef} className={`spfh-header ${headerInView ? "in-view" : ""}`}>
          <div>
            <span className="spfh-label">Selected Work</span>
            <h2 className="spfh-title">FEATURED</h2>
          </div>
          <p className="spfh-hint">
            Hover over cards to observe gravitational node pull.
          </p>
        </div>

        <div className="spfh-grid">
          {featuredProjects.map((project, i) => (
            <FeaturedCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* ================= ECLIPSE CONTACT ================= */}
      <EclipseFooter id="contact" />
    </>
  );
}


/* =========================
   NAVBAR
========================= */

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <img src={logo} alt="Belinda To Logo" />
        </Link>
      </div>
    </nav>
  );
}


/* =========================
   APP ROOT
========================= */

/* Draws the logo onto a small cream tile and uses it as the browser-tab icon.
   The tile keeps it readable on dark tab bars, where a black logo would vanish. */
function useLogoFavicon() {
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const size = 64;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");

      // cream rounded tile
      const r = 14;
      ctx.fillStyle = "#fbf9f1";
      ctx.beginPath();
      ctx.moveTo(r, 0);
      ctx.arcTo(size, 0, size, size, r);
      ctx.arcTo(size, size, 0, size, r);
      ctx.arcTo(0, size, 0, 0, r);
      ctx.arcTo(0, 0, size, 0, r);
      ctx.closePath();
      ctx.fill();

      // logo, centred and scaled to fit
      const w = img.naturalWidth || 100;
      const h = img.naturalHeight || 100;
      const pad = 9;
      const k = Math.min((size - pad * 2) / w, (size - pad * 2) / h);
      ctx.drawImage(img, (size - w * k) / 2, (size - h * k) / 2, w * k, h * k);

      document.querySelectorAll('link[rel~="icon"]').forEach((el) => el.remove());
      const link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/png";
      link.href = canvas.toDataURL("image/png");
      document.head.appendChild(link);
    };
    img.src = logo;
  }, []);
}

export default function App() {
  useLogoFavicon();
  return (
    <Layout>
      <CustomCursor />
      <Navbar />
      <OrbitNav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/wisp-sodas" element={<WispSodasPage />} />
        <Route path="/dress-up-darling" element={<DressUpDarlingPage />} />
        <Route path="/posters" element={<PostersPage />} />
        <Route path="/music-player" element={<MusicPlayerPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/scaffold" element={<ScaffoldPage />} />
        <Route path="/picki" element={<PickiPage />} />
        <Route path="/herschel" element={<HerschelPage />} />
      </Routes>
    </Layout>
  );
}