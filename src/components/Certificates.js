import React from 'react';
import { Award, CheckCircle2, Globe, Cpu, Briefcase } from 'lucide-react';
import { certificatesData } from '../data/portfolioData';

export default function Certificates() {
  const getCertIcon = (id) => {
    switch (id) {
      case 1:
        return <Globe size={24} />;
      case 2:
        return <Cpu size={24} />;
      case 3:
        return <Briefcase size={24} />;
      default:
        return <Award size={24} />;
    }
  };

  return (
    <section id="certificates" className="section-wrapper alternate">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Certifications & Training</span>
          <h2 className="section-title">Certifications & Internships</h2>
          <p className="section-subtitle">
            Industry training, specialized technical certifications, and practical internship experiences.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="certificates-grid">
          {certificatesData.map((cert) => (
            <div key={cert.id} className="card certificate-card">
              <div className="cert-top-row">
                <div className="cert-icon">
                  {getCertIcon(cert.id)}
                </div>
                {cert.category && <span className="cert-category-badge">{cert.category}</span>}
              </div>

              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-issuer">{cert.issuer}</p>

              {cert.description && (
                <p className="cert-description">{cert.description}</p>
              )}

              {cert.skills && cert.skills.length > 0 && (
                <div className="cert-skills-block">
                  <span className="cert-skills-title">Key Learnings & Topics:</span>
                  <div className="cert-skills-tags">
                    {cert.skills.map((skill, idx) => (
                      <span key={idx} className="cert-skill-pill">
                        <CheckCircle2 size={12} className="pill-icon" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
