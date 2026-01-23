import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './ContactPage.css';
import Footer from './footer';
import emailIcon from './assets/email-logo.svg';
import linkedinIcon from './assets/linkedin-logo.svg';

const ContactPage = () => {
    
  const formRef = useRef();
  const [status, setStatus] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.title = "Contact — Belinda To";
    // Trigger animations after a short delay
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    emailjs.sendForm(
      'service_ohrijej',
      'template_frntw0d',
      formRef.current,
      'AYjvBG1LmnSGFYhq-'
    )
    .then(() => {
      setStatus('success');
      setShowPopup(true);
      formRef.current.reset();
    })
    .catch(() => {
      setStatus('error');
    });
  };

  const closePopup = () => {
    setShowPopup(false);
    setStatus('');
  };

  return (
    <div className="contact-page">
      {/* Success Popup */}
      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-icon">✓</div>
            <h3 className="popup-title">Message Sent!</h3>
            <p className="popup-text">Thanks for reaching out! I'll get back to you soon.</p>
            <button className="popup-btn" onClick={closePopup}>Got it!</button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="contact-hero">
        <h1 className={`contact-title ${loaded ? 'animate-in' : ''}`}>CONTACT ME</h1>
        <p className={`contact-subtitle ${loaded ? 'animate-in' : ''}`}>I'd love to hear from you!</p>
      </section>

      {/* Main Content */}
      <section className="contact-content">
        <div className="contact-container">
          {/* Left Side - Form */}
          <div className={`contact-form-section ${loaded ? 'animate-in-left' : ''}`}>
            <h2 className="form-heading">SEND A MESSAGE</h2>
            <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">NAME</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">EMAIL</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">SUBJECT</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">MESSAGE</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  rows="6"
                  required
                />
              </div>

              <button type="submit" className="form-submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Send'}
              </button>

              {status === 'error' && (
                <p className="form-status error">Oops! Something went wrong. Please try again.</p>
              )}
            </form>
          </div>

          {/* Divider */}
          <div className={`contact-divider ${loaded ? 'animate-in' : ''}`}>
            <span className="divider-text">OR</span>
            <div className="divider-line"></div>
          </div>

          {/* Right Side - Direct Contact */}
          <div className={`contact-direct-section ${loaded ? 'animate-in-right' : ''}`}>
            <div className="contact-links">
              <a href="mailto:Belindato05@gmail.com" className="contact-link">
                <img src={emailIcon} alt="Email" className="contact-icon" />
                <span>Belindato05@gmail.com</span>
              </a>
              <a href="https://www.linkedin.com/in/belinda-to1" target="_blank" rel="noopener noreferrer" className="contact-link">
                <img src={linkedinIcon} alt="LinkedIn" className="contact-icon" />
                <span>LinkedIn</span>
              </a>
            </div>

            {/* Placeholder for image/illustration */}
            <div className="contact-image-placeholder">
              {/* You can add an image here later */}
            </div>
          </div>
        </div>
      </section>

      {/* Transition Section */}
      <section className="contact-transition-section">
        <div className="transition-star transition-star-1" />
        <div className="transition-star transition-star-2" />
        <div className="transition-star transition-star-3" />
        <div className="transition-star transition-star-4" />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;