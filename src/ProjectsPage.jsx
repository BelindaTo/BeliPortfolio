import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectsPage.css';
import canMockup from './images/canmockup.png';

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState('APPS');
  const navigate = useNavigate();

  const projects = [
    {
      id: 1,
      title: 'SCAFFOLD',
      role: 'LEAD DESIGNER / FRONT-END DEVELOPER',
      description: 'An AI-powered grant app that checks eligibility and assists with applications for apprentices.',
      imageAlign: 'right',
      category: ['APPS'],
      link: null,
      image: null,
      embedUrl: null
    },
    {
      id: 2,
      title: 'PICKI',
      role: 'LEAD DESIGNER / FRONT-END DEVELOPER',
      description: 'An event planning app designed for indecisiveness friend groups. Let PICKI decide so you don\'t have to.',
      imageAlign: 'left',
      category: ['APPS'],
      link: null,
      image: null,
      embedUrl: null
    },
    {
      id: 3,
      title: 'DRESS-UP DARLING',
      role: 'GRAPHIC DESIGNER',
      description: 'a 90s-inspired browser game where you dress up your avatar. Playful and nostalgic, it captures the charm of your favourite classic dress-up games.',
      imageAlign: 'right',
      category: ['INTERACTIVE'],
      link: '/dress-up-darling',
      image: null,
      embedUrl: null
    },
    {
      id: 4,
      title: 'WISP SODAS',
      role: 'GRAPHIC DESIGNER',
      description: 'A vibrant soda brand identity featuring playful illustrations and bold typography for a refreshing beverage line.',
      imageAlign: 'left',
      category: ['GRAPHIC'],
      link: '/wisp-sodas',
      image: canMockup,
      embedUrl: null
    }
  ];

  const filters = ['APPS', 'INTERACTIVE', 'GRAPHIC'];

  const filteredProjects = projects.filter(project => 
    project.category.includes(activeFilter)
  );

  const handleViewClick = (link) => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <div className="portfolio" style={{ paddingTop: '100px' }}>
      <div className="filter-container">
        {filters.map(filter => (
          <button
            key={filter}
            className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="projects-container">
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
                onClick={() => handleViewClick(project.link)}
              >
                VIEW
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