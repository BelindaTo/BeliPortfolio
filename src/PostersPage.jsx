import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostersPage.css';
import Footer from './footer';
import posterMain from './images/poster-main.png';
import original from './images/original.png';
import poster1 from './images/Concept 1.png';
import poster2 from './images/Concept 2.png';
import poster3 from './images/Concept 3.png';
import strawberryPoster from './images/strawberry-poster.png';
import matchaPoster from './images/matcha-poster.png';
import originalPoster from './images/original-poster.png';


const PostersPage = () => {
  const navigate = useNavigate();
  const projectTab = 'graphic';
  
  useEffect(() => {
    document.title = "Posters — Belinda To";
  }, []);

  return (
    <div className="posters-page">
      {/* BACK ARROW */}
      <button className="back-arrow" onClick={() => navigate(`/projects?tab=${projectTab}`)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {/* INTRO SECTION */}
      <div className="posters-intro-section">
        <div className="posters-star posters-star-1" />
        <div className="posters-star posters-star-2" />
        
        <div className="posters-content">
          <div className="posters-text">
            <h1 className="posters-title">
              FLUFF &<br />FLOUR
            </h1>
            <p className="posters-software">SOFTWARE</p>
            <p className="posters-tools">ADOBE ILLUSTRATOR, ADOBE PHOTOSHOP</p>
          </div>
          
          <div className="posters-image">
            <img src={posterMain} alt="Poster images" />
          </div>
        </div>
      </div>

      {/* ABOUT POSTERS SECTION */}
      <div className="posters-about-section">
        <div className="about-content">
          <div className="about-image">
            <img src={original} alt="Original image" />
          </div>
          
          <div className="about-text">
            <h2 className="about-title">ABOUT FLUFF & FLOUR</h2>
            
            <p className="about-paragraph">
Fluff & Flour is a bakery and café made for people who want something soft, sweet, and easy to grab on the go. The menu focuses on light pastries that feel airy and comforting without being heavy, perfect for busy mornings or a small treat between errands. In a market filled with pastry shops that feel old and predictable, Fluff & Flour brings a fresh, modern energy that feels bright, playful, and inviting.</p>        
            <p className="about-paragraph">
The posters help introduce the range of offerings while keeping the look recognizable across each design. Together, they support the idea that Fluff & Flour is not just about pastries, but about making everyday moments feel a little lighter and more enjoyable.</p>
          </div>
        </div>
      </div>

      {/* POSTERS GALLERY SECTION */}
      <div className="posters-gallery-section">
        {/* Floating stars behind the posters */}
        <div className="gallery-star gallery-star-1" />
        <div className="gallery-star gallery-star-2" />
        <div className="gallery-star gallery-star-3" />
        <div className="gallery-star gallery-star-4" />
        
        <div className="gallery-container">
          <div className="poster-card">
            <div className="poster-image">
              <img src={poster1} alt="Fluff & Flour Croissant Poster" />
            </div>
          </div>
          
          <div className="poster-card">
            <div className="poster-image">
              <img src={poster2} alt="Fluff & Flour Strawberry Poster" />
            </div>
          </div>
          
          <div className="poster-card">
            <div className="poster-image">
              <img src={poster3} alt="Fluff & Flour Matcha Poster" />
            </div>
          </div>
        </div>
      </div>

      {/* MOCKUPS SECTION */}
      <div className="posters-mockups-section">
        <div className="mockups-grid">
          <div className="mockup-large">
            <div className="mockup-large">
              <img src={originalPoster} alt="Original Poster image" />
            </div>
          </div>
          
          <div className="mockup-small-container">
            <div className="mockup-small">
               <img src={strawberryPoster} alt="Strawberry Poster" />
            </div>
            <div className="mockup-small">
              <img src={matchaPoster} alt="Matcha Poster" />
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default PostersPage;