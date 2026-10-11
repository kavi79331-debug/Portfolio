import React, { useState } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import { navLinks, personalData } from '../data/portfolioData';

export default function Navbar({ onOpenResume }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const handleResumeClick = (e) => {
    e.preventDefault();
    closeMenu();
    if (onOpenResume) {
      onOpenResume();
    }
  };

  return (
    <header className="navbar">
      <div className="section-container nav-container">
        <a href="#hero" className="nav-brand" onClick={closeMenu}>
          <span className="brand-dot"></span>
          <span>{personalData.name.split(' ')[0]}</span>
          <span style={{ color: 'var(--accent-primary)' }}>.dev</span>
        </a>

        {/* Desktop Navigation */}
        <nav>
          <ul className="nav-menu">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="nav-link">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Resume Button & Mobile Toggle */}
        <div className="nav-actions">
          <button
            type="button"
            className="btn btn-primary btn-sm resume-nav-btn"
            onClick={handleResumeClick}
            aria-label="View resume"
          >
            <FileText size={15} />
            <span>Resume</span>
          </button>

          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${isOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-list">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="mobile-nav-link"
                onClick={closeMenu}
              >
                {link.name}
              </a>
            </li>
          ))}
          <li>
            <button
              type="button"
              className="btn btn-primary btn-sm resume-nav-btn"
              style={{ marginTop: '0.5rem', width: '100%', justifyContent: 'center' }}
              onClick={handleResumeClick}
            >
              <FileText size={15} />
              <span>Resume</span>
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
