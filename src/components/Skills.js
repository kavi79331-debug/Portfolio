import React from 'react';
import { Code, Server, Wrench } from 'lucide-react';
import { skillsData } from '../data/portfolioData';

const categoryIcons = {
  "Frontend Development": <Code size={22} />,
  "Backend & APIs": <Server size={22} />,
  "DevOps, Tools & Testing": <Wrench size={22} />
};

export default function Skills() {
  return (
    <section id="skills" className="section-wrapper">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Skills & Tooling</span>
          <h2 className="section-title">Technical Expertise</h2>
          <p className="section-subtitle">
            Languages, frameworks, libraries, and developer tools I leverage to build digital products.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid">
          {skillsData.categories.map((category) => (
            <div key={category.name} className="card skill-category-card">
              <div className="category-header">
                <span style={{ color: 'var(--accent-primary)' }}>
                  {categoryIcons[category.name] || <Code size={22} />}
                </span>
                <h3 className="category-title">{category.name}</h3>
              </div>

              <div className="skill-list">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="skill-item">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-level">{skill.level}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
