import React from "react";
import { Link } from "react-router-dom";

export default function AcademicProgramsHero() {
  return (
    <section className="academic-programs-section">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        .academic-programs-section {
          position: relative;
          /* Removed min-height: 100vh to reduce height */
          padding: 8rem 2rem; /* Adjusted padding */
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background-color: #fafaf9;
          color: #1c1917;
          font-family: 'Inter', sans-serif;
          text-align: center;
          width: 100%;
        }

        /* Background Blobs */
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.6;
          z-index: 0;
          mix-blend-mode: multiply;
        }
        .blob-1 {
          top: -20%; /* Moved up */
          right: -10%;
          width: 600px; /* Reduced size */
          height: 600px;
          background-color: rgba(253, 224, 71, 0.4);
        }
        .blob-2 {
          bottom: -20%; /* Moved down */
          left: -10%;
          width: 500px; /* Reduced size */
          height: 500px;
          background-color: rgba(253, 230, 138, 0.5);
        }

        .content-container {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 120rem; /* Increased width to matches other sections */
          margin: 0 auto;
        }

        .sub-heading {
          font-size: 1.8rem; /* Increased from 1.5rem */
          font-weight: 600;
          color: #1e3a8a;
          margin-bottom: 2rem;
          opacity: 0;
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .main-heading {
          font-size: 3.5rem; 
          line-height: 1.1;
          font-weight: 600;
          letter-spacing: -0.025em;
          margin-bottom: 2rem;
          color: #1c1917;
          opacity: 0;
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.1s;
        }

        @media (min-width: 768px) {
          .main-heading { font-size: 5rem; } 
        }
        @media (min-width: 1024px) {
          .main-heading { font-size: 7rem; } /* Increased from 6rem */
        }

        .description {
          font-size: 1.4rem; 
          line-height: 1.625;
          color: #57534e;
          max-width: 70rem; 
          margin: 0 auto 5rem auto;
          opacity: 0;
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.2s;
        }
        @media (min-width: 768px) {
          .description { font-size: 1.8rem; } /* Increased from 1.6rem */
        }

        .links-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 3rem;
          font-size: 1.8rem; /* Increased from 1.6rem */
          font-weight: 600;
          opacity: 0;
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.3s;
        }
        @media (min-width: 768px) {
          .links-container { flex-direction: row; font-size: 2rem; } /* Increased from 1.8rem */
        }

        .program-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #292524; /* stone-800 */
          text-decoration: none;
          transition: color 0.2s;
        }
        .program-link:hover {
          color: #1e3a8a; /* blue-900 */
        }
        .arrow {
          transition: transform 0.2s;
        }
        .program-link:hover .arrow {
          transform: translateX(4px);
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Background Blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <div className="content-container">
        <p className="sub-heading">
          Shaping Bright Futures
        </p>

        <h1 className="main-heading">
          Academic Programs at SVASC
        </h1>

        <p className="description">
          Explore our UGC-approved UG & PG programme that prepare students for careers
          in industry, research, and entrepreneurship
        </p>

        <div className="links-container">
          <Link to="/programms?type=ug" className="program-link">
            Undergraduate Programmes <span className="arrow">→</span>
          </Link>
          <Link to="/programms?type=pg" className="program-link">
            Postgraduate Programmes <span className="arrow">→</span>
          </Link>
          <Link to="/programms?type=phd" className="program-link">
            Ph.D Programmes <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
