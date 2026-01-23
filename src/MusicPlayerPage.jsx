import React from 'react';
import './MusicPlayerPage.css';
import Footer from './footer';

const MusicPlayerPage = () => {
  return (
    <div className="music-player-page">
      {/* INTRO SECTION */}
      <div className="music-intro-section">
        <div className="music-star music-star-1" />
        <div className="music-star music-star-2" />
        
        <div className="music-content">
          <div className="music-text">
            <h1 className="music-title">
              MUSIC<br />PLAYER
            </h1>
            <p className="music-software">SOFTWARE</p>
            <p className="music-tools">REACT, CSS, JAVASCRIPT</p>
          </div>
          
          <div className="music-image">
            <div className="image-placeholder">Image Placeholder</div>
          </div>
        </div>
      </div>

      {/* ABOUT SECTION */}
      <div className="music-about-section">
        <div className="about-content">
          <div className="about-image">
            <div className="about-image-placeholder">Image Placeholder</div>
          </div>
          
          <div className="about-text">
            <h2 className="about-title">ABOUT THE MUSIC PLAYER</h2>
            
            <p className="about-paragraph">
              Add your description about the music player project here. This section can 
              explain the concept, inspiration, and design approach behind your 
              interactive music player.
            </p>
            
            <p className="about-paragraph">
              You can add more details about the features, user experience, 
              or any other relevant information that helps tell the story of this 
              project. Include any special interactions or design decisions that make this 
              work unique.
            </p>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="music-features-section">
        {/* Floating stars behind the content */}
        <div className="features-star features-star-1" />
        <div className="features-star features-star-2" />
        <div className="features-star features-star-3" />
        <div className="features-star features-star-4" />
        
        <div className="features-container">
          <div className="feature-card">
            <div className="feature-image">
              <div className="feature-placeholder">Feature 1</div>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-image">
              <div className="feature-placeholder">Feature 2</div>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-image">
              <div className="feature-placeholder">Feature 3</div>
            </div>
          </div>
        </div>
      </div>

      {/* MOCKUPS SECTION */}
      <div className="music-mockups-section">
        <div className="mockups-grid">
          <div className="mockup-large">
            <div className="mockup-placeholder">Large Mockup</div>
          </div>
          
          <div className="mockup-small-container">
            <div className="mockup-small">
              <div className="mockup-placeholder">Small Mockup 1</div>
            </div>
            <div className="mockup-small">
              <div className="mockup-placeholder">Small Mockup 2</div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default MusicPlayerPage;