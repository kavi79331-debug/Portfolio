import React from 'react';
import { ArrowRight, FileText, Github, Linkedin, Sparkles } from 'lucide-react';
import { personalData } from '../data/portfolioData';

export default function Hero({ onOpenResume }) {
  const heroTags = [
    { name: 'React', icon: '⚛️' },
    { name: 'JavaScript ES6+', icon: '🟨' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'SQL', icon: '🗄️' },
    { name: 'Python', icon: '🐍' }
  ];

  return (
    <section id="hero" className="hero-section">
      <div className="section-container">
        <div className="hero-content-wrapper">
          {/* Availability Status Badge */}
          <div className="hero-status-pill">
            <span className="status-dot"></span>
            <span>{personalData.availability}</span>
          </div>

          {/* Main Title */}
          <h1 className="hero-title">
            Hi, I'm <span className="text-gradient">{personalData.name}</span>
          </h1>

          {/* Subtitle & Bio */}
          <p className="hero-subtitle">{personalData.title}</p>
          <p className="hero-bio">{personalData.tagline}</p>

          {/* Primary Action Buttons */}
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              <span>View My Work</span>
              <ArrowRight size={18} />
            </a>
            {onOpenResume && (
              <button
                type="button"
                onClick={onOpenResume}
                className="btn btn-secondary"
                aria-label="View Resume"
              >
                <FileText size={18} />
                <span>Resume</span>
              </button>
            )}
            <a href="#contact" className="btn btn-ghost">
              <span>Get In Touch</span>
            </a>
          </div>

          {/* Quick Floating Tech Tags (Open layout, no box) */}
          <div className="hero-tech-tags">
            <span className="hero-tech-label">
              <Sparkles size={14} className="text-accent" />
              <span>Core Stack:</span>
            </span>
            <div className="hero-tags-list">
              {heroTags.map((t) => (
                <span key={t.name} className="hero-tag-pill">
                  <span>{t.icon}</span>
                  <span>{t.name}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="hero-socials">
            <a
              href={personalData.socialLinks.github}
              target="_blank"
              rel="noreferrer"
              className="social-icon-btn"
              aria-label="GitHub Profile"
            >
              <Github size={20} />
            </a>
            <a
              href={personalData.socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              className="social-icon-btn"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
