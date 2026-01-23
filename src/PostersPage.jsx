import React, { useEffect } from 'react';
import './PostersPage.css';
import Footer from './footer';
import posterMain from './images/poster-main.png';

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
              FLUFF & FLOUR
            </h1>
            <p className="posters-software">SOFTWARE</p>
            <p className="posters-tools">ADOBE ILLUSTRATOR, ADOBE PHOTOSHOP</p>
          </div>
          
          <div className="posters-image">
            <div className="image-placeholder">
            <img src={posterMain} alt="Poster images" />
            </div>
          </div>
        </div>
      </div>

      {/* ABOUT POSTERS SECTION */}
      <div className="posters-about-section">
        <div className="about-content">
          <div className="about-image">
            <div className="about-image-placeholder">Image Placeholder</div>
          </div>
          
          <div className="about-text">
            <h2 className="about-title">ABOUT THE POSTERS</h2>
            
            <p className="about-paragraph">
              Add your description about the poster project here. This section can 
              explain the concept, inspiration, and design approach behind your 
              poster series.
            </p>
            
            <p className="about-paragraph">
              You can add more details about the design process, target audience, 
              or any other relevant information that helps tell the story of this 
              project. Include any special techniques or themes that make this 
              work unique.
            </p>
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
              <div className="poster-placeholder">Poster 1</div>
            </div>
          </div>
          
          <div className="poster-card">
            <div className="poster-image">
              <div className="poster-placeholder">Poster 2</div>
            </div>
          </div>
          
          <div className="poster-card">
            <div className="poster-image">
              <div className="poster-placeholder">Poster 3</div>
            </div>
          </div>
        </div>
      </div>

      {/* MOCKUPS SECTION */}
      <div className="posters-mockups-section">
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

export default PostersPage;