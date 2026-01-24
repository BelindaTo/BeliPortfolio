import React, { useEffect } from 'react';
import './AboutPage.css';
import Footer from './footer';
import licenseImage from './images/license.jpg';
import bikingImage from './images/biking.jpg';
import coachingImage from './images/coaching.jpg';
import blackpinkImage from './images/blackpink.jpg';

const AboutPage = () => {
  useEffect(() => {
    document.title = "About — Belinda To";
  }, []);

  return (
    <div className="about-page">
      {/* HERO SECTION - License Card */}
      <section className="license-section">
        {/* Decorative stars */}
        <div className="license-star license-star-1" />
        <div className="license-star license-star-2" />
        <div className="license-star license-star-3" />
        
        <div className="license-container">
          <img src={licenseImage} alt="Creative License - Belinda To" className="license-card" />
        </div>
      </section>

      {/* BIO SECTION - How I Design */}
      <section className="bio-section">
        <div className="bio-container">
          <h2 className="bio-title">HOW I DESIGN</h2>
          <p className="bio-text">
            I love design when it feels clear and easy to understand. That's why I enjoy taking ideas and turning them into digital experiences that make sense and feel good to use.
          </p>
          <p className="bio-text">
            I usually start by figuring out what's actually going on, what the problem is, who it's for, and what matters most. From there, I focus on structure and small details so the design feels intentional rather than overworked.
          </p>
          <p className="bio-text">
            At the end of the day, I care about making things that feel simple, thoughtful, and grounded in real use.
          </p>
        </div>
      </section>

      {/* BEYOND THE SCREEN SECTION */}
      <section className="beyond-section">
        <div className="beyond-container">
          <h2 className="beyond-title">BEYOND THE SCREEN</h2>
          <p className="beyond-text">
            Outside of design, I spend a lot of time doing things that keep me active and curious. I coach competitive volleyball, which has taught me a lot about communication, teamwork, and adapting in real time.
          </p>
          <p className="beyond-text">
            I also ride motorcycles and love getting out on the road, it's one of the ways I reset and clear my head. I enjoy going to concerts and live events, where I'm drawn to the energy, visuals, and experience of being part of something bigger.
          </p>

          {/* Image Grid */}
          <div className="beyond-grid">
            <div className="beyond-image beyond-image-large">
              <img src={bikingImage} alt="Motorcycle riding" />
              <div className="image-overlay">
                <p className="overlay-text">My current favourite hobby, I've just upgraded to a ZX6R!</p>
              </div>
            </div>
            <div className="beyond-image beyond-image-small">
              <img src={coachingImage} alt="Volleyball team coaching" />
              <div className="image-overlay">
                <p className="overlay-text">My 4th year as a head coach!</p>
              </div>
            </div>
            <div className="beyond-image beyond-image-small">
              <img src={blackpinkImage} alt="Concert experience" />
              <div className="image-overlay">
                <p className="overlay-text">My first time in LA at Blackpink!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSITION SECTION */}
      <section className="about-transition-section">
        <div className="transition-star transition-star-1" />
        <div className="transition-star transition-star-2" />
        <div className="transition-star transition-star-3" />
        <div className="transition-star transition-star-4" />
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default AboutPage;