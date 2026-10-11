import React from 'react';
import { ExternalLink, Github, FolderGit2 } from 'lucide-react';
import { projectsData } from '../data/portfolioData';

export default function Projects() {
  return (
    <section id="projects" className="section-wrapper alternate">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Featured Work</span>
          <h2 className="section-title">Selected Projects</h2>
          <p className="section-subtitle">
            A showcase of recent web applications, systems, and open-source contributions.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {projectsData.map((project) => (
            <div key={project.id} className="card project-card">
              <div>
                <div className="project-card-header">
                  <span className="project-category">{project.category}</span>
                  <FolderGit2 size={20} color="var(--accent-primary)" />
                </div>

                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>

                <div className="project-tags">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="pill">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="project-links">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  <ExternalLink size={14} />
                  <span>Live Demo</span>
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary btn-sm"
                >
                  <Github size={14} />
                  <span>Source Code</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
