import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import logo from "./assets/Logo.svg";
import ProjectsPage from "./ProjectsPage";

/* =========================
   LANDING PAGE
========================= */

function LandingPage() {
  const [loaded, setLoaded] = useState(false);

  const [cards, setCards] = useState([
    { id: "a", className: "card-a" },
    { id: "b", className: "card-b" },
    { id: "c", className: "card-c" },
    { id: "d", className: "card-d" },
  ]);

  useEffect(() => {
    document.title = "Belinda To — Portfolio";
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
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
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== SPACER BETWEEN HERO & INTRO ===== */}
      <div className="section-spacer" />

      {/* ================= INTRO STATEMENT ================= */}
      <section className="intro-section">
        <div className="intro-content">
          <p className="intro-text">
            I'M A DIGITAL DESIGNER <br />
            AND DEVELOPER. I <br />
            BRIDGE <span className="highlight">IDEAS</span> AND <br />
            <span className="highlight">DESIGN</span> TO BRING <br />
            DIGITAL EXPERIENCES <br />
            TO LIFE.
          </p>
        </div>

        <div className="intro-star" />
      </section>

      {/* ================= PROJECTS ================= */}
      <section className="projects-section">
        <div className="projects-container">
          <div className="projects-header">
            <h2 className="projects-label">02 — FEATURED WORK</h2>
            <Link to="/projects" className="view-more-btn">
              VIEW MORE
            </Link>
          </div>

          <div className="projects-grid">
            <div className="project-card">
              <div className="project-image"></div>
              <h3 className="project-title">SCAFFOLD</h3>
            </div>

            <div className="project-card">
              <div className="project-image"></div>
              <h3 className="project-title">PICKI</h3>
            </div>

            <div className="project-card">
              <div className="project-image"></div>
              <h3 className="project-title">DRESS-UP DARLING</h3>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="contact-section">
        <h2>CONTACT</h2>
      </section>
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
          element={<div style={{ paddingTop: "140px" }}>About Page</div>}
        />
      </Routes>
    </>
  );
}
