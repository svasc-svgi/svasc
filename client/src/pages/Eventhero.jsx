import React, { useEffect, useRef } from 'react';
import './Eventhero.css';

const HeroSection = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    // Add fonts to head
    const link1 = document.createElement('link');
    link1.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Great+Vibes&display=swap';
    link1.rel = 'stylesheet';
    document.head.appendChild(link1);

    // Reveal animation on scroll
    const observerOptions = {
      threshold: 0.05, // Lower threshold for mobile
      rootMargin: '0px 0px -20px 0px',
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observerRef.current.observe(el));

    // Force visible if it stays hidden (backup for mobile browsers)
    const timer = setTimeout(() => {
      elements.forEach(el => el.classList.add('visible'));
    }, 2000);

    return () => {
      elements.forEach((el) => observerRef.current?.unobserve(el));
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="hero-section">
      {/* Background Blurs */}
      <div className="hero-blur-top"></div>
      <div className="hero-blur-bottom"></div>

      <div className="hero-container">
        <div className="hero-grid">
          {/* Main Content Area */}
          <div className="hero-content">
            {/* Title Section - Always on top */}
            <div className="hero-text-top reveal-on-scroll">
              <div className="hero-badge">
                <span className="hero-badge-dot"></span>
                <span className="hero-badge-text">Shree Venkateswara Arts & Science College</span>
              </div>

              <h1 className="hero-title">
                <span>Campus Events</span> <br />
                <span className="hero-title-accent">That Inspire</span>
              </h1>
            </div>

            {/* Mobile & Tablet View Images - Sits between title and content on mobile */}
            <div className="hero-mobile-images reveal-on-scroll">
              <div className="hero-images-wrapper">
                <div className="hero-image-lg">
                  <img
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80"
                    alt="Cultural Event"
                  />
                </div>

                <div className="hero-center-circle">
                  <div className="hero-center-circle-inner"></div>
                  <span className="hero-center-text font-script">SVASC</span>
                </div>

                <div className="hero-image-md">
                  <img
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80"
                    alt="Tech Fest"
                  />
                </div>

                <div className="hero-image-sm">
                  <img
                    src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=300&q=80"
                    alt="Sports Event"
                  />
                </div>
              </div>
            </div>

            {/* Content Section - Description and Buttons */}
            <div className="hero-text-bottom reveal-on-scroll">
              <p className="hero-description">
                Join us for unforgettable experiences at SVASC! From tech fests and cultural
                celebrations to seminars and sports tournaments - be part of our vibrant campus
                life.
              </p>

              <div className="hero-button-group">
                <a href="#events" className="hero-button hero-button-primary">
                  <span>Explore Events</span>
                  <svg
                    className="hero-button-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <polyline points="19 12 12 19 5 12"></polyline>
                  </svg>
                </a>
                <a href="#upcoming" className="hero-button hero-button-secondary">
                  Upcoming Events
                </a>
              </div>

              <div className="hero-stats">
                <div className="hero-avatars">
                  <img
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=100&h=100"
                    alt="Student"
                    className="hero-avatar"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=100&h=100"
                    alt="Student"
                    className="hero-avatar"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=100&h=100"
                    alt="Student"
                    className="hero-avatar"
                  />
                </div>
                <div>
                  <div className="hero-rating">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="hero-star"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <polygon points="12 2 15.09 10.26 24 10.26 17.55 15.92 19.64 24 12 18.35 4.36 24 6.45 15.92 0 10.26 8.91 10.26 12 2"></polygon>
                      </svg>
                    ))}
                  </div>
                  <p className="hero-stat-text">25+ Annual Events & 5000+ Student Participation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop View Images */}
          <div className="hero-desktop-images reveal-on-scroll">
            <div className="hero-image-desktop-lg">
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80"
                alt="Cultural Event"
              />
            </div>

            <div className="hero-center-circle-desktop">
              <div className="hero-center-circle-desktop-inner"></div>
              <span className="hero-center-text-desktop font-script">SVASC</span>
            </div>

            <div className="hero-image-desktop-md">
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80"
                alt="Tech Fest"
              />
            </div>

            <div className="hero-image-desktop-sm">
              <img
                src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=300&q=80"
                alt="Sports Event"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;