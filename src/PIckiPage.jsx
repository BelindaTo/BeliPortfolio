import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PickiPage.css';
import Footer from './footer';
import pickiCharacter from './images/picki-character.png';
import pickiPhones from './images/pickiphones.png';
import blobs from './images/blobs.png';
import phone2 from './images/phone2.png';
import pickiMain from "./images/picki-main.png";
import pickiCore from "./images/picki-core.png";
import pickiColour from './images/picki-colour.png';
import pickiLogo from './images/Picki-Logo.png';
import pickiTypography from './images/picki-typography.png';
import animation from './images/animation.mp4';

const PickiPage = () => {
  const navigate = useNavigate();
  const projectTab = 'apps';
  
  useEffect(() => {
    document.title = "Picki — Belinda To";
  }, []);

  return (
    <div className="picki-page">
      {/* BACK ARROW */}
      <button className="back-arrow" onClick={() => navigate(`/projects?tab=${projectTab}`)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {/* INTRO SECTION */}
      <section className="picki-intro-section">
        <div className="picki-intro-content">
          <div className="picki-intro-text">
            <h1 className="picki-title">PICKI</h1>
            
            <div className="picki-info-group">
              <p className="picki-label">ROLES</p>
              <p className="picki-value">DESIGNER / FRONT-END DEVELOPER</p>
            </div>
            
            <div className="picki-info-group">
              <p className="picki-label">SKILLS</p>
              <p className="picki-value">UX/UI DESIGN, FRONT-END DEVELOPMENT, GRAPHIC DESIGN</p>
            </div>
            
            <div className="picki-info-group">
              <p className="picki-label">TIMELINE</p>
              <p className="picki-value">5 MONTHS</p>
            </div>
            
            <button className="picki-btn">View Prototype</button>
          </div>
          
          <div className="picki-intro-image">
            <img src={pickiMain} alt="Picki Main App View" />
          </div>
        </div>
      </section>

      {/* OVERVIEW SECTION */}
      <section className="picki-overview-section">
        <div className="picki-overview-content">
          <div className="picki-overview-text">
            <p className="picki-section-label">01 – OVERVIEW</p>
            
            <h2 className="picki-overview-title">
              FOR THE INDECISIVE FRIEND GROUPS, <span className="highlight-italic">LET PICKI DECIDE</span> SO YOU DON'T HAVE TO.
            </h2>
            
            <p className="picki-overview-paragraph">
              Picki is an event planning app designed for indecisive friend groups and couples who struggle to settle on plans.
            </p>
          </div>
          
          <div className="picki-overview-image">
            <img src={pickiPhones} alt="Picki App Screens" />
          </div>
        </div>
      </section>

      {/* THE CHALLENGE SECTION */}
      <section className="picki-challenge-section">
        <div className="picki-challenge-content">
          <p className="picki-section-label">02 – WHY PICKI EXISTS</p>
          
          <div className="picki-challenge-layout">
            <div className="picki-challenge-visual">
              <img src={phone2} alt="Picki App Screens" className="picki-character-img" />
            </div>
            
            <div className="picki-challenge-text">
              <div className="picki-challenge-block">
                <h3 className="picki-challenge-subtitle">THE STRUGGLE OF DECISION MAKING</h3>
                <p className="picki-challenge-paragraph">
                  Planning events with friends or partners often becomes frustrating when everyone has different preferences. Conversations go in circles, decisions get delayed, and the excitement of making plans fades into indecision. What should be a simple process can quickly turn into decision fatigue, especially in group settings where no one wants to be the final decision-maker.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE CONCEPT SECTION */}
      <section className="picki-concept-section">
        <div className="picki-concept-content">
          <p className="picki-section-label">03 – THE CONCEPT</p>
          
          <h2 className="picki-concept-title">
            MAKING INDECISION <span className="highlight-italic">PLAYFUL</span> INSTEAD OF STRESSFUL
          </h2>
          
          <p className="picki-concept-paragraph">
            Picki reframes group decision-making as a lighthearted, collaborative experience. By leaning into randomness and removing the weight of personal responsibility, the app turns "What should we do?" into a moment of anticipation rather than anxiety.
          </p>
          
          <div className="picki-concept-points">
            <div className="picki-concept-point">
              <h4 className="picki-point-title">Everyone Contributes</h4>
              <p className="picki-point-text">Every voice matters—no one person calls the shots.</p>
            </div>
            
            <div className="picki-concept-point">
              <h4 className="picki-point-title">No One Decides</h4>
              <p className="picki-point-text">The app makes the final call, removing pressure and blame.</p>
            </div>
            
            <div className="picki-concept-point">
              <h4 className="picki-point-title">Fast & Fair</h4>
              <p className="picki-point-text">Decisions happen quickly without endless discussion.</p>
            </div>
          </div>
        </div>
      </section>

 {/* HOW IT WORKS SECTION */}
<section className="picki-features-section">
  <div className="picki-features-header">
    <p className="picki-section-label">04 – HOW IT WORKS</p>
    <h2 className="picki-features-title">
      TO REMOVE THE PRESSURE OF DECISION-MAKING, PICKI IS BUILT AROUND <span className="highlight-italic">THREE CORE FEATURES.</span>
    </h2>
  </div>
  
  <div className="picki-features-layout">
    <div className="picki-features-left">
      <div className="picki-features-list">
        <div className="picki-feature-item">
          <p className="picki-feature-number">01</p>
          <h3 className="picki-feature-name">HOST-LED PLANNING</h3>
          <p className="picki-feature-description">
            One person sets the event details and invites participants.
          </p>
        </div>
        
        <div className="picki-feature-item">
          <p className="picki-feature-number">02</p>
          <h3 className="picki-feature-name">SHARED PICKS</h3>
          <p className="picki-feature-description">
            Each participant submits one pick they're happy with.
          </p>
        </div>
        
        <div className="picki-feature-item">
          <p className="picki-feature-number">03</p>
          <h3 className="picki-feature-name">RANDOMIZED OUTCOME</h3>
          <p className="picki-feature-description">
            Picki selects one option and finalizes the plan.
          </p>
        </div>
      </div>
    </div>
    
    <div className="picki-features-right">
  <div className="picki-features-media">
    <img src={blobs} alt="Picki Characters" className="picki-blobs-img" />
    <video 
  className="picki-demo-video" 
  autoPlay 
  loop 
  muted 
  playsInline
  src={animation}
>
</video>
  </div>
</div>
  </div>
</section>
{/* USER FLOW SECTION */}
<section className="picki-userflow-section">
  <div className="picki-userflow-content">
    <p className="picki-section-label">05 – USER FLOW</p>
    
    <h2 className="picki-userflow-title">
      MAPPING THE <span className="highlight-italic">JOURNEY</span> FROM INDECISION TO PLAN
    </h2>
    
    <p className="picki-userflow-paragraph">
      The user flow was designed to minimize friction at every step. From creating an event to receiving the final decision, each interaction was mapped to ensure clarity and maintain the playful tone that defines Picki's experience.
    </p>
    
    <div className="picki-userflow-embed">
      <iframe 
        style={{border: '1px solid rgba(0, 0, 0, 0.1)'}} 
        width="800" 
        height="450" 
        src="https://embed.figma.com/board/77uCMus34bkrrxgC85gOn9/Picki-user-flows?node-id=0-1&embed-host=share" 
        allowFullScreen
      />
    </div>
  </div>
</section>

{/* DESIGN PROCESS SECTION */}
<section className="picki-design-section">
  <div className="picki-design-content">
    <p className="picki-section-label">07 – DESIGN PROCESS</p>
    
    <p className="picki-design-paragraph">
      The design strategy focused on creating an interface that feels approachable and playful without sacrificing clarity. The visual language needed to communicate that decisions are low-stakes while still being functional and intuitive. Typography, color, and interactions were all crafted to reduce cognitive load and encourage quick, confident use.
    </p>
    
    {/* STYLEGUIDE SUBSECTION */}
    <div className="picki-styleguide-section">
      <h2 className="picki-styleguide-header">STYLEGUIDE</h2>
      
      <div className="picki-styleguide-grid">
        {/* LEFT COLUMN */}
        <div className="picki-styleguide-left">
          <div className="picki-styleguide-block">
            <h3 className="picki-styleguide-subtitle">COLOURS</h3>
            <p className="picki-styleguide-description">
PICKI’s palette combines playful, vibrant colours that feel warm and modern. Soft pink creates friendliness, green adds a fresh and calming balance, deep purple brings contrast and depth, and yellow adds a sense of energy and brightness. Together, they create an approachable and lively look. </p>           
<img src={pickiColour} alt="Picki Color Palette" className="picki-styleguide-img" />
          </div>
          
          <div className="picki-styleguide-block">
            <h3 className="picki-styleguide-subtitle">LOGO</h3>
            <p className="picki-styleguide-description">
The primary PICKI logo features an arrow in place of the first ‘I’. 
This arrow signifies a cursor or selector, incorporating the main idea of the PICKI app which is to collaborate among friends and group members to select an event. The typeface for the logo is Inter, a strong and clear typeface that allows the use of numerous fonts and sizes without the loss of readability and function.            </p>
          </div>
        </div>
        
        {/* RIGHT COLUMN */}
        <div className="picki-styleguide-right">
          <div className="picki-styleguide-block">
            <h3 className="picki-styleguide-subtitle">TYPOGRAPHY</h3>
            <p className="picki-styleguide-description">
PICKI uses the Inter typeface for its versatility and readability across both digital and print. Its extensive Latin character set supports multiple languages, while the sharp letterforms create a nice contrast with the app’s rounded visual style.</p>
            <img src={pickiTypography} alt="Picki Typography" className="picki-styleguide-img" />
          </div>
          
          <div className="picki-styleguide-block">
            <img src={pickiLogo} alt="Picki Logo" className="picki-styleguide-img" />
          </div>
        </div>
      </div>
    </div>
    
    {/* WIREFRAMES SUBSECTION */}
    <div className="picki-wireframes-section">
      <h2 className="picki-wireframes-header">WIREFRAMES</h2>
      
      <div className="picki-design-screens">
        <img src={pickiCore} alt="Picki App Screens" className="picki-design-image" />
        
        <div className="picki-design-labels">
          <p className="picki-design-label">Host-Led Planning</p>
          <p className="picki-design-label">Shared Picks</p>
          <p className="picki-design-label">Randomized Outcome</p>
        </div>
      </div>
      
      <div className="picki-figma-embed">
        <iframe 
          style={{border: '1px solid rgba(0, 0, 0, 0.1)'}} 
          width="800" 
          height="450" 
        src="https://embed.figma.com/design/Ph43MP7u4CTx9Kkd3imj1U/PICKI-A4-Mockup?node-id=0-1&embed-host=share"
          allowFullScreen
        />
      </div>
    </div>
  </div>
</section>
  {/* DEMO SECTION */}
<section className="picki-demo-section">
  <div className="picki-demo-content">
    <p className="picki-section-label">08 – DEMO</p>
    
    <h2 className="picki-demo-title">
      SEE PICKI <span className="highlight-italic">IN ACTION</span>
    </h2>
    
    <p className="picki-demo-paragraph">
      Watch how Picki transforms group decision-making from a frustrating experience into a fun, seamless process.
    </p>
    
    <div className="picki-demo-container">
      {/* Add your demo video or GIF here */}
      <div className="picki-demo-placeholder">
        Demo Video
      </div>
    </div>
  </div>
</section>
        {/* GRID SECTION */}
      <div className="picki-grid-section" />

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default PickiPage;