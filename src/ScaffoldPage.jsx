import React, { useEffect } from 'react';
import './ScaffoldPage.css';
import Footer from './footer';
import scaffoldMain from './images/scaffold-main.png';
import constructionWorker from './images/construction-worker_1.png';
import moneyGrant from './images/money-grant_1.png';
import scaffoldPhone from './images/scaffold-phone.png';
import talia from './images/talia.png';
import lofi from './images/lofi.png';
import midfi from './images/midfi.png';
import hifi from './images/hi-fi.png';

const ScaffoldPage = () => {
  useEffect(() => {
    document.title = "Scaffold — Belinda To";
  }, []);

  return (
    <div className="scaffold-page">
      {/* INTRO SECTION */}
      <section className="scaffold-intro-section">
        <div className="scaffold-intro-content">
          <div className="scaffold-intro-text">
            <h1 className="scaffold-title">SCAFFOLD</h1>
            
            <div className="scaffold-info-group">
              <p className="scaffold-label">ROLES</p>
              <p className="scaffold-value">LEAD DESIGNER / GRAPHIC DESIGNER</p>
            </div>
            
            <div className="scaffold-info-group">
              <p className="scaffold-label">SKILLS</p>
              <p className="scaffold-value">UX/UI DESIGN, FRONT-END DEVELOPMENT, GRAPHIC DESIGN</p>
            </div>
            
            <div className="scaffold-info-group">
              <p className="scaffold-label">TIMELINE</p>
              <p className="scaffold-value">3 MONTHS</p>
            </div>
            
            <button className="scaffold-btn">Wireframe</button>
          </div>
          
          <div className="scaffold-intro-image">
            <img src={scaffoldMain} alt="Scaffold Main" />
          </div>
        </div>
      </section>

      {/* WHAT'S SCAFFOLD SECTION */}
      <section className="scaffold-whats-section">
        <div className="scaffold-whats-content">
          <div className="scaffold-whats-text">
            <p className="scaffold-section-label">01 – WHAT'S SCAFFOLD?</p>
            
            <h2 className="scaffold-whats-title">
              AN <span className="highlight-italic">AI-POWERED</span> GRANT APP THAT CHECKS ELIGIBILITY AND ASSISTS WITH APPLICATIONS FOR APPRENTICES
            </h2>
            
            <p className="scaffold-whats-paragraph">
              Scaffold helps apprentices and tradespeople discover grants they're actually eligible for and guides them through the application process step by step.
            </p>
            
            <p className="scaffold-whats-paragraph">
              Instead of navigating confusing government websites and paperwork, users receive personalized funding recommendations in one clear, accessible experience.
            </p>
          </div>
          
          <div className="scaffold-whats-images">
            <img src={constructionWorker} alt="Construction Worker" className="scaffold-worker-img" />
            <img src={moneyGrant} alt="Grant Document" className="scaffold-grant-img" />
          </div>
        </div>
      </section>

      {/* PROBLEM/SOLUTION SECTION */}
      <section className="scaffold-problem-section">
        <div className="scaffold-problem-content">
          <div className="scaffold-phone-container">
            <img src={scaffoldPhone} alt="Scaffold App" className="scaffold-phone-img" />
          </div>
          
          <div className="scaffold-problem-text">
            <div className="scaffold-problem-block">
              <h3 className="scaffold-problem-title">THE DECLINE IN TRADES WORKERS</h3>
              <p className="scaffold-problem-paragraph">
                Many apprentices struggle to access financial support due to confusing eligibility requirements and complex application systems. Limited time, long workdays, and unclear information cause many to miss out on funding entirely.
              </p>
            </div>
            
            <div className="scaffold-problem-block">
              <h3 className="scaffold-problem-title">HOW SCAFFOLD HELPS SOLVE THIS</h3>
              <p className="scaffold-problem-paragraph">
                Scaffold simplifies access to grants by checking eligibility upfront and guiding users through applications step by step. Clear language and structured flows reduce friction, making funding easier to understand and complete.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES SECTION */}
      <section className="scaffold-features-section">
        <div className="scaffold-features-header">
          <p className="scaffold-section-label">02 – CORE FEATURES</p>
          <h2 className="scaffold-features-title">
            TO ADDRESS THIS CHALLENGE, SCAFFOLD IS BUILT<br />
            AROUND <span className="highlight-italic">THREE CORE FEATURES.</span>
          </h2>
        </div>

        {/* Feature 01 */}
        <div className="scaffold-feature-row">
          <div className="scaffold-feature-phone">
            <div className="scaffold-phone-placeholder">Phone Mockup</div>
          </div>
          <div className="scaffold-feature-text">
            <p className="scaffold-feature-number">01</p>
            <h3 className="scaffold-feature-name">SMART PROFILE</h3>
            <p className="scaffold-feature-description">
              Users build a profile once with key details like trade, location, and training status. Scaffold uses this to match them with relevant grants automatically, saving time and reducing guesswork.
            </p>
          </div>
        </div>

        {/* Feature 02 */}
        <div className="scaffold-feature-row">
          <div className="scaffold-feature-text">
            <p className="scaffold-feature-number">02</p>
            <h3 className="scaffold-feature-name">ELIGIBILITY CHECKER</h3>
            <p className="scaffold-feature-description">
              Before users invest time in an application, Scaffold checks whether they qualify. Clear feedback helps users understand what they're eligible for and why, reducing frustration and wasted effort.
            </p>
          </div>
          <div className="scaffold-feature-phone">
            <div className="scaffold-phone-placeholder">Phone Mockup</div>
          </div>
        </div>

        {/* Feature 03 */}
        <div className="scaffold-feature-row">
          <div className="scaffold-feature-phone">
            <div className="scaffold-phone-placeholder">Phone Mockup</div>
          </div>
          <div className="scaffold-feature-text">
            <p className="scaffold-feature-number">03</p>
            <h3 className="scaffold-feature-name">AI APPLICATION ASSISTANT</h3>
            <p className="scaffold-feature-description">
              Scaffold's AI assistant helps users complete applications by suggesting answers, explaining requirements, and ensuring nothing is missed. It turns a complex process into a guided, step-by-step experience.
            </p>
          </div>
        </div>
      </section>

      {/* USER INSIGHTS SECTION */}
      <section className="scaffold-insights-section">
        <div className="scaffold-insights-content">
          {/* Left Column - Insights */}
          <div className="scaffold-insights-left">
            <p className="scaffold-section-label">03 – USER INSIGHTS</p>
            
            <h3 className="scaffold-insights-subtitle">WHO WE DESIGNED FOR</h3>
            <p className="scaffold-insights-paragraph">
              Scaffold was designed for apprentices and early-career tradespeople juggling work, training, and limited time often navigating funding systems not built for them.
            </p>
            
            <h3 className="scaffold-insights-subtitle highlight">KEY INSIGHTS</h3>
            
            <div className="scaffold-insight-block">
              <p className="scaffold-insight-title">Insight 01 — Time is the biggest constraint</p>
              <p className="scaffold-insight-text">
                Apprentices don't lack motivation they lack time and energy after long workdays.
              </p>
              <p className="scaffold-design-response">→ Design Response:</p>
              <p className="scaffold-design-response-text">
                Applications were broken into short, manageable steps with visible progress.
              </p>
            </div>
            
            <div className="scaffold-insight-block">
              <p className="scaffold-insight-title">Insight 02 — Eligibility uncertainty causes drop-off</p>
              <p className="scaffold-insight-text">
                Users abandon applications when they're unsure whether a grant applies to them.
              </p>
              <p className="scaffold-design-response">→ Design Response:</p>
              <p className="scaffold-design-response-text">
                Scaffold checks eligibility first before surfacing grants.
              </p>
            </div>
            
            <div className="scaffold-insight-block">
              <p className="scaffold-insight-title">Insight 03 — Language creates intimidation</p>
              <p className="scaffold-insight-text">
                Government terminology discourages users from even starting.
              </p>
              <p className="scaffold-design-response">→ Design Response:</p>
              <p className="scaffold-design-response-text">
                Plain language, friendly tone, and clear explanations were prioritized throughout the interface.
              </p>
            </div>
          </div>
          
          {/* Right Column - Persona */}
          <div className="scaffold-insights-right">
            <div className="scaffold-persona-card">
              <div className="scaffold-persona-header">
                <img src={talia} alt="Talia Redsky" className="scaffold-persona-img" />
                <div className="scaffold-persona-info">
                  <h3 className="scaffold-persona-name">TALIA REDSKY</h3>
                  <div className="scaffold-persona-details">
                    <p><span className="detail-label">Age:</span> 28</p>
                    <p><span className="detail-label">Occupation:</span> Carpentry Apprentice / Student</p>
                    <p><span className="detail-label">Location:</span> Williams Lake, British Columbia</p>
                    <p><span className="detail-label">Income:</span> $48,000</p>
                    <p><span className="detail-label">Relationship:</span> Married, supports family members</p>
                  </div>
                </div>
              </div>
              
              <div className="scaffold-persona-quote">
                <span className="quote-mark">"</span>
                <p>I want to keep learning and supporting my community, but the system makes it hard to get started.</p>
                <span className="quote-mark">"</span>
              </div>
              
              <div className="scaffold-persona-section">
                <h4 className="persona-section-title">PAIN POINTS</h4>
                <ul className="persona-list">
                  <li>Grant information is scattered across multiple government sites.</li>
                  <li>Applications are filled with confusing or repetitive questions.</li>
                  <li>Missed deadlines due to lack of reminders.</li>
                  <li>Limited awareness of what she actually qualifies for.</li>
                </ul>
              </div>
              
              <div className="scaffold-persona-section">
                <h4 className="persona-section-title">GOALS AND MOTIVATION</h4>
                <ul className="persona-list">
                  <li>Access funding programs for indigenous apprentices.</li>
                  <li>Save time by using a tool that explains eligibility in plain language.</li>
                  <li>Get reminders and track progress easily.</li>
                  <li>Build financial stability while staying focused on her work.</li>
                  <li>Use technology that respects and reflects her community values.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DESIGN PROCESSES SECTION */}
      <section className="scaffold-design-section">
        <div className="scaffold-design-content">
          <h2 className="scaffold-design-title">04 – DESIGN PROCESSES</h2>
          
          <p className="scaffold-design-paragraph">
            Based on user research and insights, Scaffold's design strategy focused on reducing cognitive load and guiding users through complex funding processes with clarity and confidence. The interface prioritizes simplicity, plain language, and a mobile-first approach to support apprentices balancing work, school, and limited time. By breaking applications into manageable steps and surfacing only relevant information, Scaffold helps users move forward without feeling overwhelmed.
          </p>
          
          <div className="scaffold-fidelity-container">
            <div className="scaffold-fidelity-item">
              <img src={lofi} alt="Low-Fi Wireframe" className="scaffold-fidelity-img" />
              <p className="scaffold-fidelity-label">Low-Fi</p>
            </div>
            
            <div className="scaffold-fidelity-item">
              <img src={midfi} alt="Mid-Fi Wireframe" className="scaffold-fidelity-img" />
              <p className="scaffold-fidelity-label">Mid-Fi</p>
            </div>
            
            <div className="scaffold-fidelity-item">
              <img src={hifi} alt="Hi-Fi Design" className="scaffold-fidelity-img" />
              <p className="scaffold-fidelity-label">Hi-Fi</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default ScaffoldPage;