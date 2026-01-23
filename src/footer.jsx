import React from 'react';
import './footer.css';
import footerImage from './images/footer.png';

const Footer = () => {
  return (
    <footer className="site-footer">
      <img src={footerImage} alt="Footer" className="footer-background" />
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-heading">SITE MAP</h3>
          <a href="/" className="footer-link">Home</a>
          <a href="/about" className="footer-link">About me</a>
          <a href="/projects" className="footer-link">Projects</a>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-heading">CONTACT</h3>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-link">Linkedin</a>
          <a href="mailto:your.email@example.com" className="footer-link">Email</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;