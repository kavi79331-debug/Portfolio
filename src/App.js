import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import ParticleBackground from './components/ParticleBackground';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const openResume = () => setIsResumeOpen(true);
  const closeResume = () => setIsResumeOpen(false);

  return (
    <div className="app-container">
      {/* Global Interactive Constellation Animation */}
      <ParticleBackground />

      {/* 1. Navbar */}
      <Navbar onOpenResume={openResume} />

      <main className="main-content">
        {/* 2. Hero */}
        <Hero onOpenResume={openResume} />

        {/* 3. About */}
        <About />

        {/* 4. Skills */}
        <Skills />

        {/* 5. Projects */}
        <Projects />

        {/* 6. Education */}
        <Education />

        {/* 7. Certificates */}
        <Certificates />

        {/* 8. Contact */}
        <Contact />
      </main>

      {/* 9. Footer */}
      <Footer />

      {/* 10. Resume Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={closeResume} />
    </div>
  );
}
