import React from 'react';
import { ArrowUp } from 'lucide-react';
import { navLinks, personalData } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="section-container">
        <div className="footer-top">
          <div className="footer-brand">
            <h3>{personalData.name}</h3>
            <p>{personalData.title}</p>
          </div>

          <ul className="footer-nav">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} {personalData.name}. All rights reserved.</p>

          <button
            type="button"
            className="back-to-top-btn"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
