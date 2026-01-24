import React, { useEffect } from 'react';
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
  useEffect(() => {
    document.title = "Posters — Belinda To";
  }, []);

  return (
    <div className="posters-page">
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
            <h2 className="about-title">ABOUT THE POSTERS</h2>
            
            <p className="about-paragraph">
This project explores how a single set of visual assets can be applied across multiple designs for <em>Fluff & Flour</em> while maintaining a cohesive brand identity. The challenge was to create three distinct poster designs using different imagery, each highlighting a different offering, without losing visual consistency.</p>        
            <p className="about-paragraph">
Cohesion is maintained through a shared layout structure, typographic hierarchy, and recurring graphic elements, while variation is introduced through changes in colour, imagery, and visual emphasis. This balance allows each poster to stand on its own while still feeling connected as part of <em>Fluff & Flour's</em> overall visual system.</p>
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