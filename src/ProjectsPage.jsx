import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './ProjectsPage.css';
import canMockup from './images/canmockup.png';
import scaffoldMain from "./images/scaffold-main.png";
import pickiMain from "./images/picki-main.png";
import posterMain from './images/poster-main.png';
import playlistMockup from './images/playlist-mockup.png';
import dressUpMockup from "./images/dress-up-mockup.png";

const ProjectsPage = () => {
  const [searchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState(searchParams.get('tab')?.toUpperCase() || 'APPS');
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Projects — Belinda To";
  }, []);

  const projects = [
    {
      id: 1,
      title: 'SCAFFOLD',
      role: 'LEAD DESIGNER / FRONT-END DEVELOPER',
      description: 'An AI-powered grant app that checks eligibility and assists with applications for apprentices.',
      imageAlign: 'right',
      category: ['APPS'],
      link: '/scaffold',
      image: scaffoldMain,
      embedUrl: null,
      buttonText: 'VIEW CASE STUDY'
    },
    {
      id: 2,
      title: 'PICKI',
      role: 'LEAD DESIGNER / FRONT-END DEVELOPER',
      description: 'An event planning app designed for indecisiveness friend groups. Let PICKI decide so you don\'t have to.',
      imageAlign: 'left',
      category: ['APPS'],
      link: '/picki',
      image: pickiMain,
      embedUrl: null,
      buttonText: 'VIEW'
    },
    {
      id: 3,
      title: 'MUSIC PLAYER',
      role: 'DESIGNER / FRONT-END DEVELOPER',
      description: 'An interactive music player with custom controls and playlist management.',
      imageAlign: 'left',
      category: ['INTERACTIVE'],
      link: '/music-player',
      image: playlistMockup,
      embedUrl: null,
      buttonText: 'VIEW'
    },
    {
      id: 4,
      title: 'DRESS-UP DARLING',
      role: 'GRAPHIC DESIGNER',
      description: 'a 90s-inspired browser game where you dress up your avatar. Playful and nostalgic, it captures the charm of your favourite classic dress-up games.',
      imageAlign: 'right',
      category: ['INTERACTIVE'],
      link: '/dress-up-darling',
      image: dressUpMockup,
      embedUrl: null,
      buttonText: 'VIEW'
    },
    {
      id: 5,
      title: 'WISP SODAS',
      role: 'GRAPHIC DESIGNER',
      description: 'A vibrant soda brand identity featuring playful illustrations and bold typography for a refreshing beverage line.',
      imageAlign: 'left',
      category: ['GRAPHIC'],
      link: '/wisp-sodas',
      image: canMockup,
      embedUrl: null,
      buttonText: 'VIEW'
    },
    {
      id: 6,
      title: 'FLUFF & FLOUR',
      role: 'GRAPHIC DESIGNER',
      description: 'A collection of poster designs showcasing creative concepts and visual storytelling.',
      imageAlign: 'right',
      category: ['GRAPHIC'],
      link: '/posters',
      image: posterMain,
      embedUrl: null,
      buttonText: 'VIEW'
    }
  ];

  const filters = ['APPS', 'INTERACTIVE', 'GRAPHIC'];

  const filteredProjects = projects.filter(project => 
    project.category.includes(activeFilter)
  );

  const handleFilterChange = (filter) => {
    if (filter === activeFilter) return;
    
    setIsAnimating(true);
    
    // Wait for fade out animation
    setTimeout(() => {
      setActiveFilter(filter);
      setIsAnimating(false);
    }, 300);
  };

  const handleViewClick = (link) => {
    console.log('View clicked, link:', link);
    if (link) {
      navigate(link);
    } else {
      console.log('No link provided');
    }
  };

  return (
    <div className="portfolio" style={{ paddingTop: '100px' }}>
      <div className="filter-container">
        {filters.map(filter => (
          <button
            key={filter}
            className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => handleFilterChange(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className={`projects-container ${isAnimating ? 'fade-out' : 'fade-in'}`}>
        {filteredProjects.map(project => (
          <div 
            key={project.id} 
            className={`project-card ${project.imageAlign === 'left' ? 'reverse' : ''}`}
          >
            <div className="project-content">
              <h2 className="project-title">{project.title}</h2>
              <p className="project-role">{project.role}</p>
              <p className="project-description">{project.description}</p>
              <button 
                className="view-btn"
                onClick={() => {
                  console.log('Button clicked for:', project.title, 'Link:', project.link);
                  if (project.link) {
                    console.log('Navigating to:', project.link);
                    navigate(project.link);
                  } else {
                    console.log('No link available');
                  }
                }}
              >
                {project.buttonText || 'VIEW'}
              </button>
            </div>
            <div className="project-image">
              {project.image && (
                <img src={project.image} alt={project.title} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;