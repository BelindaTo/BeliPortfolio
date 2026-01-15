import React, { useState } from 'react';
import Logo from "./assets/Logo.svg";

const Navbar = ({ setCurrentPage, loaded = true }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo" onClick={() => handleNavClick('home')}>
          <img src={Logo} alt="Belinda To logo" className="logo-img" />
        </div>

        {/* Hamburger Icon */}
        <button 
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links */}
        <div className={`nav-links ${loaded ? "nav-loaded" : ""} ${menuOpen ? "mobile-menu-open" : ""}`}>
          <button className="nav-link" onClick={() => handleNavClick('home')}>HOME</button>
          <button className="nav-link" onClick={() => handleNavClick('projects')}>PROJECTS</button>
          <button className="nav-link">ABOUT ME</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;