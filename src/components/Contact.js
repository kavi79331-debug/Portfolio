import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { personalData } from '../data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${personalData.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: formData.subject ? `[Portfolio] ${formData.subject}` : `[Portfolio] New message from ${formData.name}`,
          message: formData.message,
          _template: 'table'
        })
      });

      const data = await response.json();

      if (response.ok && (data.success === 'true' || data.success === true || response.status === 200)) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 8000);
      } else {
        throw new Error(data.message || 'Failed to deliver message.');
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setErrorMessage(
        'Unable to send automatically right now. You can email directly at ' + personalData.email
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-wrapper">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title">Let's Build Something Together</h2>
          <p className="section-subtitle">
            Have a project in mind, a question, or an exciting opportunity? Feel free to reach out.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="contact-grid">
          {/* Contact Details */}
          <div className="card">
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Contact Information
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              I'm always open to discussing new engineering projects, internships, or collaboration opportunities.
            </p>

            <div className="contact-info-list">
              <div className="contact-info-item">
                <div className="contact-icon-box">
                  <Mail size={20} />
                </div>
                <div className="contact-info-text">
                  <h4>Email</h4>
                  <a href={`mailto:${personalData.email}`}>{personalData.email}</a>
                </div>
              </div>

              {personalData.phone && (
                <div className="contact-info-item">
                  <div className="contact-icon-box">
                    <Phone size={20} />
                  </div>
                  <div className="contact-info-text">
                    <h4>Phone</h4>
                    <a href={`tel:${personalData.phone.replace(/\s+/g, '')}`}>{personalData.phone}</a>
                  </div>
                </div>
              )}

              <div className="contact-info-item">
                <div className="contact-icon-box">
                  <MapPin size={20} />
                </div>
                <div className="contact-info-text">
                  <h4>Location</h4>
                  <p>{personalData.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card">
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1.25rem' }}>
              Send a Message
            </h3>

            {submitted && (
              <div className="form-success-banner" style={{ marginBottom: '1.25rem' }}>
                <CheckCircle2 size={18} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
                Thank you! Your message has been sent to {personalData.email}. I'll get back to you shortly.
              </div>
            )}

            {errorMessage && (
              <div className="form-error-banner" style={{ marginBottom: '1.25rem' }}>
                <AlertCircle size={18} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
                {errorMessage}{' '}
                <a
                  href={`mailto:${personalData.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(formData.message)}`}
                  style={{ textDecoration: 'underline', color: 'inherit', fontWeight: 600 }}
                >
                  Click to email directly
                </a>
              </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="contact-name">Your Name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email">Email Address</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  placeholder="your.email@example.com"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  placeholder="Project Collaboration"
                  className="form-input"
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  placeholder="Tell me about your project, query, or opportunity..."
                  className="form-textarea"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ alignSelf: 'flex-start' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="btn-spinner" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
