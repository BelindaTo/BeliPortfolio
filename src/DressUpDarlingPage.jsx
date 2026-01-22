import React from "react";
import "./DressUpDarlingPage.css";

import bodyImage from "./images/body.png";
import pajamasImage from "./images/pajamas.PNG";
import gardenerImage from "./images/gardener.png";
import sundressImage from "./images/sundress.png";
import casualImage from "./images/casual.png";
import classyImage from "./images/classy.png";
import fallImage from "./images/fall.png";
import blackImage from "./images/black.png";
import pigtailImage from "./images/pigtail.png";
import blondImage from "./images/blond.png";
import braidImage from "./images/braid.png";
import purpleImage from "./images/purple.png";
import pinkImage from "./images/pink.png";
import greenImage from "./images/green.png";

export default function DressUpDarlingPage() {
  return (
    <div className="dress-up-page">

      {/* Project Info */}
      <section className="project-info-section pink-bg">
        <div className="project-info-container">
          <div className="project-info-content">
            <h1 className="project-info-title">DRESS-UP DARLING</h1>

            <div className="project-info-block">
              <h3 className="project-info-label">ROLE</h3>
              <p className="project-info-text">
                GRAPHIC DESIGNER (CHARACTER) / FRONT-END DEVELOPER
              </p>
            </div>

            <div className="project-info-block">
              <h3 className="project-info-label">SOFTWARE</h3>
              <p className="project-info-text">
                PROCREATE, VISUAL STUDIO CODE, GITHUB
              </p>
            </div>
          </div>

          <div className="project-info-image" />
        </div>
      </section>

      {/* About */}
      <section className="about-section pink-bg">
        <div className="about-container">
          <h2 className="about-title">ABOUT DRESS-UP DARLING</h2>
          <p className="about-text">
            Dress Up Darling is a 90s-inspired browser game designed to bring back the simple joy
            of classic dress-up games through a playful and nostalgic experience. The challenge
            was to create an interface that felt comforting and intuitive while still appealing
            to a modern audience. The final solution focuses on creative self-expression through
            soft visuals and gentle interactions.
          </p>
        </div>
      </section>

      {/* Game */}
      <section className="game-section">
        <div className="game-container">
          <div className="game-header">
            <h2 className="game-section-title">PLAY THE GAME</h2>
            <p className="game-instructions">
            Please click the game screen once, use WASD to move around as the cat and dress up your darling! Once spawned, please click on the screen once more. Spawn as many variants as you like! Enjoy!            </p>
          </div>

          <div className="game-embed">
            <iframe
              src="https://dress-up-game-pi.vercel.app/"
              title="Dress-Up Darling Game"
              className="game-iframe"
            />
          </div>
        </div>
      </section>

      {/* Character */}
      <section className="character-section pink-bg">
        <div className="character-container">
          <h2 className="character-title">CHARACTER DESIGN</h2>
          <p className="character-description">
          Inspired by 90s pixel games, Dress-Up Darling was designed with the goal to bring nostalgia and familiarity. Built for those who adored playing games with your older sister.           </p>

          <div className="character-images">
            <div className="character-item">
              <img src={bodyImage} alt="Body" className="character-img" />
              <p className="character-label">BODY</p>
            </div>

            <div className="character-item">
              <img src={pajamasImage} alt="Default" className="character-img" />
              <p className="character-label">DEFAULT</p>
            </div>
          </div>
        </div>
      </section>

      {/* Clothing */}
      <section className="clothing-section pink-bg">
        <div className="clothing-container">

          <div className="clothing-row">
            <img src={gardenerImage} className="clothing-img" alt="" />
            <img src={sundressImage} className="clothing-img" alt="" />
            <img src={casualImage} className="clothing-img" alt="" />
          </div>

          <div className="clothing-row">
            <img src={classyImage} className="clothing-img" alt="" />
            <img src={fallImage} className="clothing-img" alt="" />
          </div>

          <div className="clothing-row">
            <img src={blackImage} className="clothing-img" alt="" />
            <img src={pigtailImage} className="clothing-img" alt="" />
            <img src={blondImage} className="clothing-img" alt="" />
            <img src={braidImage} className="clothing-img" alt="" />
          </div>

          <div className="clothing-row">
            <img src={purpleImage} className="clothing-img" alt="" />
            <img src={pinkImage} className="clothing-img" alt="" />
            <img src={greenImage} className="clothing-img" alt="" />
          </div>

        </div>
      </section>

      {/* Grid */}
      <section className="grid-section" />
    </div>
  );
}
