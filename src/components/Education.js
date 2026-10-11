import { GraduationCap, Calendar } from 'lucide-react';
import { educationData } from '../data/portfolioData';

export default function Education() {
  return (
    <section id="education" className="section-wrapper">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Academic Background</span>
          <h2 className="section-title">Education & Qualifications</h2>
          <p className="section-subtitle">
            Formal degrees, academic accomplishments, and foundational learning.
          </p>
        </div>

        {/* Education Timeline */}
        <div className="education-timeline">
          {educationData.map((edu) => (
            <div key={edu.id} className="card education-card">
              <div className="education-card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <GraduationCap size={22} color="var(--accent-primary)" />
                  <h3 className="education-degree">{edu.degree}</h3>
                </div>
                <div className="education-period">
                  <Calendar size={13} style={{ display: 'inline', marginRight: '4px' }} />
                  {edu.period}
                </div>
              </div>

              <div className="education-institution">
                <span>{edu.institution}</span> &bull; <span style={{ color: 'var(--text-muted)' }}>{edu.location}</span>
              </div>

              <p className="education-details">{edu.details}</p>

              {edu.highlights && edu.highlights.length > 0 && (
                <ul className="education-highlights-list">
                  {edu.highlights.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
