import React, { useEffect } from 'react';
import {
  X,
  Printer,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  GraduationCap,
  Briefcase,
  Code2,
  Award,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import {
  personalData,
  aboutData,
  skillsData,
  projectsData,
  educationData,
  certificatesData
} from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose }) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="resume-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="resume-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Toolbar */}
        <div className="resume-modal-header no-print">
          <div className="resume-header-info">
            <div className="resume-badge">
              <Sparkles size={14} />
              <span>Official Resume</span>
            </div>
            <h3>{personalData.name} - Resume / CV</h3>
          </div>

          <div className="resume-modal-actions">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handlePrint}
              title="Print or Save as PDF"
            >
              <Printer size={15} />
              <span>Print / Download PDF</span>
            </button>

            <a
              href="/resume.html"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              title="Open full standalone page"
            >
              <ExternalLink size={15} />
              <span>Full Page</span>
            </a>

            <button
              type="button"
              className="resume-close-btn"
              onClick={onClose}
              aria-label="Close resume modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="resume-modal-body">
          <div className="resume-paper" id="printable-resume">
            {/* Resume Header */}
            <header className="resume-doc-header">
              <div className="resume-main-title">
                <h1>{personalData.name}</h1>
                <p className="resume-role">{personalData.title} &bull; Computer Science Engineering</p>
              </div>

              <div className="resume-contact-bar">
                <a href={`mailto:${personalData.email}`} className="contact-item">
                  <Mail size={13} />
                  <span>{personalData.email}</span>
                </a>
                <a href={`tel:${personalData.phone}`} className="contact-item">
                  <Phone size={13} />
                  <span>{personalData.phone}</span>
                </a>
                <span className="contact-item">
                  <MapPin size={13} />
                  <span>{personalData.location}</span>
                </span>
                <a
                  href={personalData.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-item"
                >
                  <Github size={13} />
                  <span>github.com/kavi79331-debug</span>
                </a>
                <a
                  href={personalData.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-item"
                >
                  <Linkedin size={13} />
                  <span>linkedin.com/in/kavinila-vijayaragavan</span>
                </a>
              </div>
            </header>

            {/* Summary Section */}
            <section className="resume-section">
              <div className="resume-section-title">
                <Briefcase size={16} />
                <h2>Professional Summary</h2>
              </div>
              <div className="resume-section-content">
                <p className="resume-summary-text">
                  Passionate third-year Computer Science Engineering student with a strong foundation in full-stack web development, artificial intelligence, and modern web architectures. Experienced in building responsive, scalable, and user-centric web applications utilizing React, JavaScript, Node.js, Python, and SQL. Proactive problem solver dedicated to clean code, performance optimization, and continuous learning in software engineering.
                </p>
              </div>
            </section>

            {/* Technical Skills Section */}
            <section className="resume-section">
              <div className="resume-section-title">
                <Code2 size={16} />
                <h2>Technical Skills</h2>
              </div>
              <div className="resume-section-content resume-skills-grid">
                {skillsData.categories.map((cat, idx) => (
                  <div key={idx} className="resume-skill-group">
                    <strong className="skill-group-title">{cat.name}:</strong>
                    <span className="skill-group-items">
                      {cat.skills.map((s) => s.name).join(', ')}
                    </span>
                  </div>
                ))}
                <div className="resume-skill-group">
                  <strong className="skill-group-title">Programming Languages:</strong>
                  <span className="skill-group-items">JavaScript (ES6+), Python, Java, SQL, HTML5, CSS3</span>
                </div>
              </div>
            </section>

            {/* Projects Section */}
            <section className="resume-section">
              <div className="resume-section-title">
                <Code2 size={16} />
                <h2>Key Projects</h2>
              </div>
              <div className="resume-section-content resume-projects-list">
                {projectsData.map((project) => (
                  <div key={project.id} className="resume-project-item">
                    <div className="resume-project-header">
                      <div className="project-title-area">
                        <h3 className="project-name">{project.title}</h3>
                        <span className="project-category">| {project.category}</span>
                      </div>
                      <div className="project-links-area">
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="resume-link">
                            Live Demo
                          </a>
                        )}
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="resume-link">
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="resume-project-desc">{project.description}</p>
                    <div className="resume-tech-tags">
                      <span className="tech-label">Tech Stack:</span>
                      {project.technologies.map((t, idx) => (
                        <span key={idx} className="resume-tech-pill">{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Education Section */}
            <section className="resume-section">
              <div className="resume-section-title">
                <GraduationCap size={16} />
                <h2>Education</h2>
              </div>
              <div className="resume-section-content resume-education-list">
                {educationData.map((edu) => (
                  <div key={edu.id} className="resume-edu-item">
                    <div className="edu-item-header">
                      <h3 className="edu-degree">{edu.degree}</h3>
                      <span className="edu-period">{edu.period}</span>
                    </div>
                    <div className="edu-item-sub">
                      <span className="edu-institution">{edu.institution}</span>
                      <span className="edu-location">&bull; {edu.location}</span>
                    </div>
                    {edu.details && <p className="edu-details">{edu.details}</p>}
                  </div>
                ))}
              </div>
            </section>

            {/* Certifications Section */}
            <section className="resume-section">
              <div className="resume-section-title">
                <Award size={16} />
                <h2>Certifications & Internships</h2>
              </div>
              <div className="resume-section-content resume-cert-list">
                {certificatesData.map((cert) => (
                  <div key={cert.id} className="resume-cert-item">
                    <div className="cert-header">
                      <h3 className="cert-title">{cert.title}</h3>
                      <span className="cert-date">{cert.issuer}</span>
                    </div>
                    {cert.description && (
                      <p className="cert-desc" style={{ fontSize: '0.88rem', color: '#475569', marginTop: '0.25rem', lineHeight: '1.45' }}>
                        {cert.description}
                      </p>
                    )}
                    {cert.skills && (
                      <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.25rem' }}>
                        <strong style={{ color: '#334155' }}>Topics:</strong> {cert.skills.join(', ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Strengths / Highlights */}
            <section className="resume-section">
              <div className="resume-section-title">
                <CheckCircle2 size={16} />
                <h2>Key Competencies & Highlights</h2>
              </div>
              <div className="resume-section-content">
                <ul className="resume-bullet-list">
                  {aboutData.highlights.map((h, idx) => (
                    <li key={idx}>
                      <strong>{h.title}:</strong> {h.description}
                    </li>
                  ))}
                  <li>
                    <strong>Continuous Learning:</strong> Dedicated to building practical applications in Web Development, Machine Learning, and IoT.
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
