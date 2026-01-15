import React, { useState } from 'react';
import './ProjectsPage.css';

const ProjectsPage = () => {  // ← Remove setCurrentPage prop
  const [activeFilter, setActiveFilter] = useState('FEATURED');

  const projects = [
    {
      id: 1,
      title: 'SCAFFOLD',
      role: 'LEAD DESIGNER / FRONT-END DEVELOPER',
      description: 'An AI-powered grant app that checks eligibility and assists with applications for apprentices.',
      imageAlign: 'right',
      category: ['FEATURED', 'UX / UI']
    },
    {
      id: 2,
      title: 'PICKI',
      role: 'LEAD DESIGNER / FRONT-END DEVELOPER',
      description: 'An event planning app designed for indecisiveness friend groups. Let PICKI decide so you don\'t have to.',
      imageAlign: 'left',
      category: ['FEATURED', 'UX / UI']
    },
    {
      id: 3,
      title: 'DRESS-UP DARLING',
      role: 'GRAPHIC DESIGNER',
      description: 'a 90s-inspired browser game where you dress up your avatar. Playful and nostalgic, it captures the charm of your favourite classic dress-up games.',
      imageAlign: 'right',
      category: ['FEATURED', 'GRAPHIC']
    }
  ];

  const filters = ['FEATURED', 'GRAPHIC', 'UX / UI'];

  // Filter projects based on active filter
  const filteredProjects = projects.filter(project => 
    project.category.includes(activeFilter)
  );

  return (
    <div className="portfolio" style={{ paddingTop: '100px' }}>
      {/* ← Removed Navbar component - it's already in App.jsx */}

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
              <button className="view-btn">VIEW</button>
            </div>
            <div className="project-image">
              {/* Placeholder for project image */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;