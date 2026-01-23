import React, { useEffect } from 'react';
import './WispSodasPage.css';
import Footer from './footer';
import soda1 from './images/Soda1.png';
import soda2 from './images/Soda2.png';
import soda3 from './images/Soda3.png';
import canmockup from './images/canmockup.png';
import canmockup2 from './images/canmockup-2.png';
import stackedCans from './images/stacked-cans.png';
import canSky from './images/cansky.png';
import twoCans from './images/2cans.png';

const WispSodasPage = () => {
  useEffect(() => {
    document.title = "Wisp Sodas — Belinda To";
  }, []);

  return (
    <div className="wisp-sodas-page">
      {/* INTRO SECTION */}
      <div className="wisp-intro-section">
        <div className="wisp-star wisp-star-1" />
        <div className="wisp-star wisp-star-2" />
        
        <div className="wisp-content">
          <div className="wisp-text">
            <h1 className="wisp-title">
              WISP<br />SODAS
            </h1>
            <p className="wisp-software">SOFTWARE</p>
            <p className="wisp-tools">ADOBE ILLUSTRATOR, ADOBE PHOTOSHOP</p>
          </div>
          
          <div className="wisp-image">
            <img src={canmockup} alt="Wisp Sodas Cans" />
          </div>
        </div>
      </div>

      {/* ABOUT WISP SECTION */}
      <div className="wisp-about-section">
        <div className="about-content">
          <div className="about-image">
            <img src={canmockup2} alt="Wisp Sodas Cans Mockup" />
          </div>
          
          <div className="about-text">
            <h2 className="about-title">ABOUT WISP</h2>
            
            <p className="about-paragraph">
              Wisp explores how an emotional narrative can be translated into a 
              physical product within beverage branding, where storytelling is often 
              overlooked.
            </p>
            
            <p className="about-paragraph">
              Inspired by the world of <em>Studio Ghibli</em>, the brand expresses nostalgia and 
              comfort through soft gradients, nature inspired palettes, and gentle 
              character illustrations that feel warm and original. Wisp uses a consistent 
              layout system to create a sense of lightness and cohesion across 
              flavours. Together, these elements position Wisp as more than a just a 
              soda brand. Wisp is a small, comforting moment that celebrates 
              everyday magic.
            </p>
          </div>
        </div>
      </div>

      {/* LABELS SECTION */}
      <div className="wisp-labels-section">
        {/* Floating stars behind the labels */}
        <div className="labels-star labels-star-1" />
        <div className="labels-star labels-star-2" />
        <div className="labels-star labels-star-3" />
        <div className="labels-star labels-star-4" />
        
        <div className="labels-container">
          <div className="label-card">
            <div className="label-image">
              <img src={soda1} alt="Ember Peach Label" />
            </div>
          </div>
          
          <div className="label-card">
            <div className="label-image">
              <img src={soda2} alt="Lychee Tide Label" />
            </div>
          </div>
          
          <div className="label-card">
            <div className="label-image">
              <img src={soda3} alt="Pear Dew Label" />
            </div>
          </div>
        </div>
      </div>

      {/* MOCKUPS SECTION */}
      <div className="wisp-mockups-section">
        <div className="mockups-grid">
          <div className="mockup-large">
            <img src={stackedCans} alt="Stacked Wisp Soda Cans" />
          </div>
          
          <div className="mockup-small-container">
            <div className="mockup-small">
              <img src={twoCans} alt="Two Wisp Soda Cans" />
            </div>
            <div className="mockup-small">
              <img src={canSky} alt="Wisp Soda Can with Sky" />
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default WispSodasPage;