import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const projectTab = 'graphic'; // This project belongs to GRAPHIC tab

  useEffect(() => {
    document.title = "Wisp Sodas — Belinda To";
  }, []);

  return (
    <div className="wisp-sodas-page">
      {/* BACK ARROW */}
      <button className="back-arrow" onClick={() => navigate(`/projects?tab=${projectTab}`)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      {/* rest of your page stays the same */}
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
            Wisp explores how emotion and storytelling can show up in a physical product, especially in a space like beverage branding where story is often missing. Created as a conceptual sub-brand within the world of Studio Ghibli, Wisp imagines what a soda brand from the studio might feel like.
            </p>
            
            <p className="about-paragraph">
              Using Ghibli’s existing characters and visual language, the brand leans into nostalgia and comfort through soft gradients, nature-inspired colours, and gentle illustrations that feel warm and familiar. A consistent layout ties the flavours together and keeps everything feeling light and cohesive. The goal is for Wisp to feel like more than just soda. It is meant to capture a small, comforting moment of everyday magic.
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