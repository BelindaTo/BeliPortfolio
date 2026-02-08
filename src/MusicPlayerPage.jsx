import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MusicPlayerPage.css';
import Footer from './footer';
import playlistMockup from './images/playlist-mockup.png';
import darkMode from './images/dark-mode.png';
import lightMode from './images/light-mode.png';
import lightModeMockup from './images/light-mode-mockup.png';

const MusicPlayerPage = () => {
  const navigate = useNavigate();
  const projectTab = 'interactive';

  useEffect(() => {
    document.title = "Music Player — Belinda To";
  }, []);

  return (
    <div className="music-player-page">
    {/* BACK ARROW */}
    <button className="back-arrow" onClick={() => navigate(`/projects?tab=${projectTab}`)}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
      
      {/* INTRO SECTION */}
      <div className="music-intro-section">
        <div className="music-star music-star-1" />
        <div className="music-star music-star-2" />
        
        <div className="music-content">
          <div className="music-text">
            <h1 className="music-title">
              MUSIC<br />PLAYER
            </h1>
            
            <div className="music-info-group">
              <p className="music-label">ROLE</p>
              <p className="music-value">DESIGNER / FRONT-END DEVELOPER</p>
            </div>
            
            <div className="music-info-group">
              <p className="music-label">SOFTWARE</p>
              <p className="music-value">REACT, CSS, JAVASCRIPT</p>
            </div>
            
            <a href="https://comp3170-project-45pa.vercel.app/" target="_blank" rel="noopener noreferrer" className="music-btn">
              Try Music Player
            </a>
          </div>
          
          <div className="music-image">
            <img src={playlistMockup} alt="Playlist Mockup" />
          </div>
        </div>
      </div>

      {/* ABOUT SECTION */}
      <div className="music-about-section">
        <div className="about-content">
          <div className="about-image">
            <img src={lightModeMockup} alt="Light Mode Mockup" />
          </div>
          
          <div className="about-text">
            <h2 className="about-title">ABOUT THE MUSIC PLAYER</h2>
            
            <p className="about-paragraph">
This interactive music player was built to make studying feel calmer and more focused, using soft visuals and a clean layout that students can comfortably keep open while working.            </p>
            
            <p className="about-paragraph">
Powered by the YouTube API, the player allows access to almost any song, including live performances and unreleased tracks, while supporting easy playlist creation and switching for free. It acts as a flexible study companion that keeps sessions flowing.            </p>
          </div>
        </div>
      </div>

      {/* VIDEO SECTION */}
      <div className="music-video-section">
        <div className="video-container">
          <iframe
            src="https://www.youtube.com/embed/gKTwX7GvwJ8"
            title="Music Player Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* DESIGN SECTION */}
<div className="music-design-section">
  <div className="music-design-star music-design-star-1" />
  <div className="music-design-star music-design-star-2" />
  <div className="music-design-star music-design-star-3" />
  <div className="music-design-star music-design-star-4" />
  
  <div className="music-design-content">
    <h2 className="music-design-title">DESIGN</h2>
    
    <p className="music-design-paragraph">
      The interface was inspired by Spotify's use of gradients to create atmosphere and mood, rather than relying on heavy visual elements. Building on this idea, the design uses soft gradient transitions to give the playlist a sense of depth and focus without becoming distracting.
    </p>
    
    <p className="music-design-paragraph">
      The playlist is visualized as a single, centered space that can be comfortably looked at for long periods of time, making it suitable for studying or background listening. By keeping the layout minimal and the colours smooth and ambient, the design encourages focus while still maintaining a sense of movement and life through subtle visual shifts.
    </p>
    
    <div className="music-design-images">
      <img src={darkMode} alt="Dark Mode" />
      <img src={lightMode} alt="Light Mode" />
    </div>
  </div>
</div>

      {/* GRID SECTION */}
      <div className="music-grid-section" />

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default MusicPlayerPage;