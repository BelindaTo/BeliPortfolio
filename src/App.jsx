import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import logo from "./assets/Logo.svg";
import ProjectsPage from "./ProjectsPage";

import designerBear from "./assets/designer-bear.png";
import developerBear from "./assets/developer-bear.png";

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

          <div className="featured-image" />
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
        <div className="logo">
          <img src={logo} alt="Belinda To Logo" />
        </div>

        <div className={`nav-links ${loaded ? "nav-loaded" : ""}`}>
          <Link to="/" className="nav-link">HOME</Link>
          <Link to="/projects" className="nav-link">PROJECTS</Link>
          <Link to="/about" className="nav-link">ABOUT ME</Link>
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
