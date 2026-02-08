import React from 'react';
import './footer.css';
import footerImage from './images/footer.png';

const Footer = () => {
  return (
    <footer className="site-footer">
      <img src={footerImage} alt="Footer" className="footer-background" />
      
      <div className="footer-tagline">
        <h2 className="tagline-text">"Designing with purpose,<br />building with care."</h2>
      </div>
      
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-heading">SITE MAP</h3>
          <a href="/projects" className="footer-link">Projects</a>
          <a href="/about" className="footer-link">About me</a>
          <a href="/contact" className="footer-link">Contact</a>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-heading">CONTACT</h3>
          <a href="https://www.linkedin.com/in/belinda-to1" target="_blank" rel="noopener noreferrer" className="footer-link">Linkedin</a>
          <a href="mailto:belindato05@gmail.com" className="footer-link">Email</a>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p className="copyright">© 2026 Belinda To. Designed and hand-coded using React.</p>
      </div>
    </footer>
  );
};

export default Footer;