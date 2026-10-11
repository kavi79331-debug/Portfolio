import React from 'react';
import { Layers, Zap, Heart } from 'lucide-react';
import { aboutData } from '../data/portfolioData';

const highlightIcons = [
  <Layers size={22} key="layers" />,
  <Zap size={22} key="zap" />,
  <Heart size={22} key="heart" />
];

export default function About() {
  return (
    <section id="about" className="section-wrapper alternate">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">About Me</span>
          <h2 className="section-title">Passion for Technology & Engineering</h2>
          <p className="section-subtitle">
            A quick overview of my professional background, philosophy, and experience.
          </p>
        </div>

        {/* Bio & Key Metrics */}
        <div className="about-grid">
          <div className="about-text">
            {aboutData.summary.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="about-stats">
            {aboutData.stats.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Engineering Highlights */}
        <div className="highlights-grid">
          {aboutData.highlights.map((highlight, idx) => (
            <div key={idx} className="card highlight-card">
              <div className="highlight-icon">
                {highlightIcons[idx] || <Zap size={22} />}
              </div>
              <h4>{highlight.title}</h4>
              <p>{highlight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
