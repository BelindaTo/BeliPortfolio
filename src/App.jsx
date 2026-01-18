import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import logo from "./assets/Logo.svg";
import ProjectsPage from "./ProjectsPage";

import designerBear from "./assets/designer-bear.png";
import developerBear from "./assets/developer-bear.png";
import scaffoldImage from "./assets/Scaffold-image.png";

/* =========================
   CUSTOM CURSOR
========================= */

function CustomCursor() {
  const cursorRef = useRef(null);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;

    const onMouseMove = (e) => {
      if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      }
    };

    const onMouseDown = () => {
      setIsClicking(true);
    };

    const onMouseUp = () => {
      setIsClicking(false);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor">
      {isClicking ? (
        <svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.73 36.35">
          <defs>
            <style>
              {`.cls-1 { fill: #0a95e2; } .cls-2 { fill: #6db5e3; }`}
            </style>
          </defs>
          <g id="Layer_1-2" data-name="Layer 1">
            <g>
              <path className="cls-2" d="M35.74,24.1l-6.37-6.16,2.8-2.89c.82-.84,1.04-2.04.6-3.13-.45-1.09-1.46-1.78-2.63-1.8l-16.01-.33c-.81-.02-1.58.3-2.15.89-.57.59-.86,1.36-.81,2.18l.87,15.99c.06,1.17.79,2.16,1.89,2.57,1.1.41,2.29.14,3.11-.7l3.24-3.35,6.37,6.16c2.6,2.51,6.75,2.44,9.26-.16,2.51-2.6,2.44-6.75-.16-9.26Z"/>
              <path className="cls-1" d="M36.44,23.38l-5.65-5.46,2.1-2.17c1.1-1.13,1.4-2.75.8-4.21-.6-1.46-1.96-2.39-3.53-2.42l-16.01-.33c-1.13-.01-2.14.41-2.89,1.19-.75.78-1.15,1.85-1.09,2.93l.87,15.99c.09,1.58,1.06,2.9,2.54,3.45,1.48.55,3.08.19,4.17-.95l2.54-2.63,5.65,5.46c1.41,1.37,3.27,2.11,5.24,2.11.04,0,.09,0,.13,0,2.02-.03,3.9-.85,5.3-2.29,1.4-1.44,2.15-3.35,2.11-5.38s-.85-3.9-2.29-5.3ZM26.64,33.52l-6.37-6.16-3.24,3.35c-.82.84-2,1.11-3.11.7-1.1-.41-1.82-1.39-1.89-2.57l-.87-15.99c-.04-.82.25-1.59.81-2.18.57-.59,1.34-.91,2.15-.89l16.01.33c1.17.02,2.18.71,2.63,1.8.45,1.09.22,2.29-.6,3.13l-2.8,2.89,6.37,6.16c2.6,2.51,2.67,6.67.16,9.26-2.51,2.6-6.67,2.67-9.26.16Z"/>
              <path className="cls-1" d="M6.84,6.77c.1.1.23.15.36.15s.25-.05.35-.14c.2-.19.2-.51,0-.71L3.53,1.96c-.19-.2-.51-.2-.71,0-.2.19-.2.51,0,.71l4.02,4.1Z"/>
              <path className="cls-1" d="M11.14,5.48s.05,0,.08,0c.24,0,.45-.18.49-.42l.71-4.48c.04-.27-.14-.53-.42-.57-.28-.05-.53.14-.57.42l-.71,4.48c-.04.27.14.53.42.57Z"/>
              <path className="cls-1" d="M6.01,10.59c0-.28-.22-.5-.5-.5H.5c-.28,0-.5.22-.5.5s.22.5.5.5h5.01c.28,0,.5-.22.5-.5Z"/>
              <path className="cls-1" d="M7.64,13.2l-3.91,3.79c-.2.19-.2.51-.01.71.1.1.23.15.36.15s.25-.05.35-.14l3.91-3.79c.2-.19.2-.51.01-.71-.19-.2-.51-.2-.71-.01Z"/>
              <path className="cls-1" d="M15.02,7.62c.13,0,.26-.05.36-.16l3.65-3.85c.19-.2.18-.52-.02-.71-.2-.19-.52-.18-.71.02l-3.65,3.85c-.19.2-.18.52.02.71.1.09.22.14.34.14Z"/>
            </g>
          </g>
        </svg>
      ) : (
        <svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.57 27.56">
          <defs>
            <style>
              {`.cls-1 { fill: #6db5e3; stroke: #0a95e2; stroke-miterlimit: 10; }`}
            </style>
          </defs>
          <g id="Layer_1-2" data-name="Layer 1">
            <path className="cls-1" d="M25.93,14.95l-6.01-5.81,2.45-2.53c2.07-2.14.59-5.72-2.38-5.78L3.98.5c-1.98-.04-3.58,1.61-3.47,3.59l.87,15.99c.16,2.97,3.79,4.32,5.85,2.18l2.89-2.99,6.01,5.81c2.79,2.7,7.27,2.62,9.97-.17,2.7-2.79,2.62-7.27-.17-9.97Z"/>
          </g>
        </svg>
      )}
    </div>
  );
}

/* =========================
   SCROLL REVEAL TEXT (INTRO)
========================= */

function ScrollRevealText({ lines }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.35 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  let letterIndex = 0;

  return (
    <p ref={ref} className="intro-text">
      {lines.map((line, lineIdx) => (
        <span key={lineIdx} className="intro-line">
          {line.map((chunk, i) => {
            if (typeof chunk === "string") {
              return chunk.split(" ").map((word, wordIdx) => (
                <span
                  key={wordIdx}
                  style={{ display: "inline-block", whiteSpace: "nowrap" }}
                >
                  {word.split("").map((char) => {
                    const delay = letterIndex * 0.015;
                    letterIndex++;
                    return (
                      <span
                        key={letterIndex}
                        className={`intro-letter ${
                          visible ? "visible" : ""
                        }`}
                        style={{ transitionDelay: `${delay}s` }}
                      >
                        {char}
                      </span>
                    );
                  })}
                  <span>&nbsp;</span>
                </span>
              ));
            }

            const delay = letterIndex * 0.015;
            letterIndex += chunk.text.length;

            return (
              <span
                key={i}
                className={`highlight intro-letter-group ${
                  visible ? "visible" : ""
                }`}
                style={{
                  transitionDelay: `${delay}s`,
                  display: "inline-block",
                  whiteSpace: "nowrap",
                }}
              >
                {chunk.text}
                <span>&nbsp;</span>
              </span>
            );
          })}
          <br />
        </span>
      ))}
    </p>
  );
}

/* =========================
   LANDING PAGE
========================= */

function LandingPage() {
  const [loaded, setLoaded] = useState(false);
  const transitionStarRef = useRef(null);

  // 👇 LAST ITEM = TOP CARD ON LOAD
  const [cards, setCards] = useState([
    {
      id: "d",
      className: "card-d",
    },
    {
      id: "c",
      className: "card-c",
    },
    {
      id: "developer",
      className: "card-b",
      image: developerBear, // 👈 MUST EXIST
    },
    {
      id: "designer",
      className: "card-a",
      image: designerBear, // 👈 SHOWS FIRST
    },
  ]);

  useEffect(() => {
    document.title = "Belinda To — Portfolio";
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  /* =========================
     STAR PARALLAX
  ========================= */
  useEffect(() => {
    const onScroll = () => {
      if (!transitionStarRef.current) return;

      transitionStarRef.current.style.transform = `
        translateY(${window.scrollY * 0.15}px)
        rotate(-8deg)
      `;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleCardClick = (e) => {
    e.stopPropagation();
    setCards((prev) => {
      const top = prev[prev.length - 1];
      const rest = prev.slice(0, -1);
      return [top, ...rest];
    });
  };

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="hero-section">
        <div className="hero-inner">
          <h1 className="hero-name">
            {"BELINDA".split("").map((c, i) => (
              <span
                key={i}
                className="letter"
                style={{ animationDelay: `${i * 0.09}s` }}
              >
                {c}
              </span>
            ))}
          </h1>

          <div className={`card-stack ${loaded ? "loaded" : ""}`}>
            {cards.map((card, index) => {
              const isTop = index === cards.length - 1;

              return (
                <div
                  key={card.id}
                  className={`stack-card ${card.className}`}
                  style={{
                    zIndex: index + 10,
                    pointerEvents: isTop ? "auto" : "none",
                    cursor: isTop ? "pointer" : "default",
                  }}
                  onClick={isTop ? handleCardClick : undefined}
                >
                  {/* 👇 IMAGE FILLS CARD */}
                  {card.image && (
                    <div className="card-art">
                      <img
                        src={card.image}
                        alt=""
                        className="card-bear"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="section-spacer" />

      {/* ================= INTRO ================= */}
      <section className="intro-section">
        <div className="intro-content">
          <ScrollRevealText
            lines={[
              ["I'M A DIGITAL DESIGNER"],
              ["AND DEVELOPER. I"],
              ["BRIDGE ", { text: "IDEAS" }, " AND"],
              [{ text: "DESIGN" }, " TO BRING"],
              ["DIGITAL EXPERIENCES"],
              ["TO LIFE."],
            ]}
          />
        </div>

        <div className="intro-star" />
        <div className="intro-star-2" />
      </section>

      {/* ================= FEATURED WORK ================= */}
      <section className="featured-section">
        <div className="featured-inner">
          <div className="featured-text">
          <ScrollRevealText
  lines={[
    ["FEATURED WORK"],
  ]}
/>
            <h3 className="featured-title">SCAFFOLD</h3>
            <p className="featured-role">
              LEAD DESIGNER / FRONT-END DEVELOPER
            </p>
            <p className="featured-desc">
              An AI-powered grant app that checks eligibility and assists with
              applications for apprentices.
            </p>
            <button className="featured-btn">VIEW</button>
          </div>

          <div className="featured-image">
            <img src={scaffoldImage} alt="Scaffold App" />
          </div>
        </div>
      </section>

      {/* ================= TRANSITION ================= */}
      <section className="transition-section">
        <div className="transition-star" ref={transitionStarRef} />
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-links">
            <a href="/" className="footer-link">SITE MAP</a>
            <a href="/contact" className="footer-link">CONTACT</a>
          </div>
        </div>
      </footer>
    </>
  );
}

/* =========================
   NAVBAR
========================= */

function Navbar() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <img src={logo} alt="Belinda To Logo" />
        </Link>

        <div className={`nav-links ${loaded ? "nav-loaded" : ""}`}>
          <Link to="/projects" className="nav-link">PROJECTS</Link>
          <Link to="/about" className="nav-link">ABOUT ME</Link>
          <Link to="/contact" className="nav-link">CONTACT</Link>
        </div>
      </div>
    </nav>
  );
}

/* =========================
   APP ROOT
========================= */

export default function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route
          path="/about"
          element={<div style={{ paddingTop: 140 }}>About Page</div>}
        />
      </Routes>
    </>
  );
}