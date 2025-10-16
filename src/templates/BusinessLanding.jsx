import React from 'react'
import './templates.css'

export default function BusinessLanding({ data }) {
  return (
    <div className="template business-landing">
      {/* Hero Section */}
      <section className="hero gradient-blue">
        <div className="container">
          <h1 className="hero-title">{data.hero_heading}</h1>
          <p className="hero-subtitle">{data.hero_paragraph}</p>
          <button className="cta-button">Get Started</button>
        </div>
      </section>

      {/* About Section */}
      <section className="section about-section">
        <div className="container">
          <h2 className="section-title">{data.about_heading}</h2>
          <p className="section-text">{data.about_paragraph}</p>
        </div>
      </section>

      {/* Services Section */}
      <section className="section services-section bg-light">
        <div className="container">
          <h2 className="section-title">{data.services_heading}</h2>
          <p className="section-text">{data.services_paragraph}</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section contact-section">
        <div className="container">
          <h2 className="section-title">{data.contact_heading}</h2>
          <p className="section-text">{data.contact_paragraph}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>{data.footer_text}</p>
          <p className="powered-by">Powered by Website Builder</p>
        </div>
      </footer>
    </div>
  )
}
