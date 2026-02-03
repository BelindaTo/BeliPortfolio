import React, { useEffect } from 'react';
import './PickiPage.css';
import Footer from './footer';
import pickiCharacter from './images/picki-character.png';
import pickiPhones from './images/pickiphones.png';
import blobs from './images/blobs.png';
import phone2 from './images/phone2.png';
import pickiMain from "./images/picki-main.png";

const PickiPage = () => {
  useEffect(() => {
    document.title = "Picki — Belinda To";
  }, []);

  return (
    <div className="picki-page">
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
            <img src={blobs} alt="Picki Characters" className="picki-blobs-img" />
          </div>
        </div>
      </section>

      {/* DEMO SECTION */}
      <section className="picki-demo-section">
        <div className="picki-demo-content">
          <p className="picki-section-label">05 – DEMO</p>
          
          <h2 className="picki-demo-title">
            SEE PICKI <span className="highlight-italic">IN ACTION</span>
          </h2>
          
          <p className="picki-demo-paragraph">
            Watch how Picki transforms group decision-making from a frustrating experience into a fun, seamless process.
          </p>
          
          <div className="picki-demo-video">
            {/* Add your demo video or GIF here */}
            <div className="picki-demo-placeholder">
              Demo Video
            </div>
          </div>
        </div>
      </section>

      {/* DESIGN PROCESS SECTION */}
      <section className="picki-design-section">
        <div className="picki-design-content">
          <p className="picki-section-label">06 – DESIGN PROCESS</p>
          
          <p className="picki-design-paragraph">
            The design strategy focused on creating an interface that feels approachable and playful without sacrificing clarity. The visual language needed to communicate that decisions are low-stakes while still being functional and intuitive. Typography, color, and interactions were all crafted to reduce cognitive load and encourage quick, confident use.
          </p>
          
          <div className="picki-fidelity-container">
            <div className="picki-fidelity-item">
              <div className="picki-fidelity-placeholder">Low-Fi</div>
              <p className="picki-fidelity-label">Low-Fi</p>
            </div>
            
            <div className="picki-fidelity-item">
              <div className="picki-fidelity-placeholder">Mid-Fi</div>
              <p className="picki-fidelity-label">Mid-Fi</p>
            </div>
            
            <div className="picki-fidelity-item">
              <div className="picki-fidelity-placeholder">Hi-Fi</div>
              <p className="picki-fidelity-label">Hi-Fi</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default PickiPage;