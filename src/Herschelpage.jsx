import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HerschelPage.css';
import Footer from './footer';
import heroLogo from './images/HSC_WHITEWOVEN-ON-BLACK.jpg';
import stickerDieCut from './images/MINECRAFTSTICKER_V3.png';
import stickerHolo from './images/sticker-1.jpeg';
import stickerHoloStack from './images/sticker-2.jpeg';
import cardFront from './images/card-2.jpeg';
import cardBack from './images/card-1.jpeg';
import patches from './images/mc-patches.png';
import golfBrochure from './images/golf.png';
import certificates from './images/Herschel-certificate.png';
import herschelTree from './images/herschel-tree.JPG';


const HerschelPage = () => {
  const navigate = useNavigate();
  const projectTab = 'internship';

  useEffect(() => {
    document.title = "Herschel — Belinda To";
  }, []);

  return (
    <div className="herschel-page">
      {/* BACK ARROW */}
      <button className="back-arrow" onClick={() => navigate(`/projects?tab=${projectTab}`)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* INTRO SECTION */}
      <div className="herschel-intro-section">
        <div className="herschel-star herschel-star-1" />
        <div className="herschel-star herschel-star-2" />

        <div className="herschel-content">
          <div className="herschel-text">
            <h1 className="herschel-title">
              HERSCHEL<br />SUPPLY CO.
            </h1>
            <div className="herschel-info-group">
              <p className="herschel-label">ROLE</p>
              <p className="herschel-detail">GRAPHIC DESIGN INTERNSHIP</p>
            </div>

            <div className="herschel-info-group">
              <p className="herschel-label">DATE</p>
              <p className="herschel-detail">APRIL – OCTOBER</p>
            </div>
            {/* Add a SOFTWARE label + tools line here to match your other pages */}
          </div>

          <div className="herschel-image herschel-image-logo">
            <img src={heroLogo} alt="Herschel Supply Co. woven label logo" />
          </div>
        </div>
      </div>

      {/* ABOUT SECTION */}
      <div className="herschel-about-section">
        <div className="herschel-about-content">
          <div className="herschel-about-image">
            <img src={herschelTree} alt="Photo mural of a Herschel road sign beside a plant and a leather armchair" />
          </div>

          <div className="herschel-about-text">
            <h2 className="herschel-about-title">MY EXPERIENCE!</h2>

            <p className="herschel-about-paragraph">
I had the wonderful opportunity this spring to join Herschel Supply Co. as a Graphic Design Intern. There, I learned what a professional working in corporate would be like as a junior designer. I was fortunate enough to join at a time where I was allowed to work on such large projects such as Minecraft, Lego, Golf and Peanuts! I was even more fortunate that my team trusted my design capabilities and allowed me to lead the design for some projects.</p>
            <p className="herschel-about-paragraph">
My Team Lead assigned me jobs for print, digital and even let me help out on set for photography shoots and promotional videos! It is so cool to see the work I designed being advertised in stores. Thanks to Herschel, I developed my skills and design thinking and am now confident in my skills as a designer. Here is a small snippet of the work I've done.</p>
          </div>
        </div>
      </div>

      {/* MINECRAFT SECTION */}
      <div className="herschel-project-section herschel-minecraft-section">
        <div className="herschel-star herschel-bg-star-1" />
        <div className="herschel-star herschel-bg-star-2" />
        <div className="herschel-star herschel-bg-star-3" />
        <div className="herschel-star herschel-bg-star-4" />
        <div className="herschel-star herschel-bg-star-5" />

        <div className="herschel-project-inner">
          <div className="herschel-project-head">
            <h2 className="herschel-project-title">01 – MINECRAFT</h2>
            <p className="herschel-project-headline">
              BLENDING <span className="highlight-italic">BOTH WORLDS</span> THROUGH PRINT
            </p>
            <p className="herschel-project-paragraph">
The largest project I worked on during my time at Herschel. I was tasked with designing patches to be sold along with their brand new backpacks, stickers for Twitchcon, packaging for online orders and the minecraft seeding card you get when you receive a backpack! This was by far, my favorite project.</p>
          </div>

          <div className="herschel-subsection">
            <h3 className="herschel-sub-title">STICKERS</h3>
            <p className="herschel-sub-text">Stickers I made for TwitchCon 2026! Minecraft requested something that would catch the attention of regular people. I went through multiple variations before Herschel and Minecraft agreed that this was the best one.</p>
            <div className="herschel-row herschel-row-3">
              <figure className="herschel-item">
                <div className="herschel-item-image">
                  <img src={stickerDieCut} alt="Die-cut Leave Nothing Behind sticker" />
                </div>
                <figcaption className="herschel-caption">Die-cut sticker V1.</figcaption>
              </figure>
              <figure className="herschel-item">
                <div className="herschel-item-image">
                  <img src={stickerHolo} alt="Holographic Leave Nothing Behind sticker" />
                </div>
                <figcaption className="herschel-caption">Holographic finish, Final version!</figcaption>
              </figure>
              <figure className="herschel-item">
                <div className="herschel-item-image">
                  <img className="herschel-crop-stack" src={stickerHoloStack} alt="A hand holding holographic Minecraft x Herschel stickers" />
                </div>
                <figcaption className="herschel-caption">3000 made and handed out!</figcaption>
              </figure>
            </div>
          </div>

          <div className="herschel-subsection">
            <h3 className="herschel-sub-title">SEEDING CARD</h3>
            <p className="herschel-sub-text">Seeding cards designed to accompany every item in the Minecraft x Herschel collection. The collaboration was driven by the concept of 'blending both worlds,' seamlessly bringing the infinite exploration of Minecraft’s digital realm into real-world everyday life. Herschel requested that I play into this concept for the seeding card.</p>
            <div className="herschel-row herschel-row-2">
              <figure className="herschel-item">
                <div className="herschel-item-image">
                  <img className="herschel-crop-card" src={cardFront} alt="Minecraft x Herschel postcard front" />
                </div>
                <figcaption className="herschel-caption">Card front.</figcaption>
              </figure>
              <figure className="herschel-item">
                <div className="herschel-item-image">
                  <img className="herschel-crop-card" src={cardBack} alt="Minecraft x Herschel postcard back styled as an in-game dialogue" />
                </div>
                <figcaption className="herschel-caption">Card back.</figcaption>
              </figure>
            </div>
          </div>

          <div className="herschel-subsection">
            <h3 className="herschel-sub-title">PATCHES</h3>
            <p className="herschel-sub-text herschel-sub-text-tight">I was assigned the job of creating patches, these patches would be limited edition items customers could buy to add to their backpacks. Herschel requested that I design a patch that blends both brands, not a patch that is just an in-game item or a word mark that says ‘HSC x Minecraft.’ This patch was pitched directly to Minecraft’s team and they loved it!</p>
            <p className="herschel-sub-text">Herschel’s motto is “Travel Anywhere, Travel Often.” so I felt like creating a post stamp would perfectly convey this message. The destinations are minecraft realms themselves so this also blends into the collaboration concept of ‘blending both worlds.’ The tag in the corner is designed to look like a player nametag.</p>
            <div className="herschel-row herschel-row-1">
              <figure className="herschel-item">
                <div className="herschel-item-image">
                  <img src={patches} alt="Embroidered Overworld, Nether and End stamp patches" />
                </div>
                <figcaption className="herschel-caption">Overworld, Nether and End patches.</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>

      {/* GOLF & AWARDS SECTION */}
      <div className="herschel-project-section herschel-golf-section">
        <div className="herschel-project-inner">
          <div className="herschel-project-head">
            <h2 className="herschel-project-title">02 – GOLF & AWARDS</h2>
          </div>

          {/* Row 1: image left, text right */}
          <div className="herschel-zig-row">
            <div className="herschel-zig-image">
              <div className="herschel-item-image">
                <img src={golfBrochure} alt="Herschel Watt Stand Bag folded brochure" />
              </div>
            </div>
            <div className="herschel-zig-text">
              <h3 className="herschel-sub-title">GOLF</h3>
              <p className="herschel-sub-text">I designed a PK tag for in-store retail signage. This sits on Herschel’s golf bags with information about each type of bag and their benefits. I designed the pk tags in the form of a golf scoring sheet that opens up.</p>
            </div>
          </div>

          {/* Row 2: text left, image right */}
          <div className="herschel-zig-row herschel-zig-row-reverse">
            <div className="herschel-zig-text">
              <h3 className="herschel-sub-title">APAC COMPETITION AWARDS</h3>
              <p className="herschel-sub-text">I designed a Gold, Silver and Bronze variation for 3 awards. This is for Herschel’s retail competition that is held throughout Asia. It was requested that the award didn’t look like a highschool honour roll award but one that would scream ‘Herschel’ but also lay subtle. I designed the awards as postcards with custom made stamps that follow the new Herschel brand guidelines.</p>
            </div>
            <div className="herschel-zig-image">
              <div className="herschel-item-image">
                <img src={certificates} alt="Gold Award certificates designed as vintage postcards" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default HerschelPage;