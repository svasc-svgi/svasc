import React, { useState, useEffect } from 'react';
import Hero from '../components/Common/Hero';
import { getNewsletters } from '../services/newsletterService';
import hero from '../assets/newsletter hero.png';
import './NewsLetter.css';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const NewsLetter = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        setLoading(true);
        const response = await getNewsletters();
        const list = response?.data ?? (Array.isArray(response) ? response : []);
        setNewsletters(list);
      } catch (error) {
        console.error('Error fetching newsletters:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsletters();
  }, []);

  const filteredNewsletters = newsletters.filter((item) =>
    (item.title || '').toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const getCardLayoutClass = (index) => {
    const pattern = ['layout-lead', 'layout-column', 'layout-halffold', 'layout-bulletin', 'layout-feature'];
    return pattern[index % pattern.length];
  };

  const getCardStamp = (index) => {
    const stamps = [
      { text: 'Front Page Exclusive', className: 'stamp-frontpage' },
      { text: 'Campus Dispatch', className: 'stamp-column' },
      { text: 'Academic Feature', className: 'stamp-halffold' },
      { text: 'Gazette Notice', className: 'stamp-bulletin' },
      { text: 'Special Report', className: 'stamp-halffold' },
    ];
    return stamps[index % stamps.length];
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Latest Release';
    const d = new Date(dateStr);
    return isNaN(d.getTime())
      ? 'Latest Release'
      : d.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }).toUpperCase();
  };

  const openLightbox = (item) => {
    setSelectedItem(item);
    setZoomLevel(1);
  };

  const closeLightbox = () => {
    setSelectedItem(null);
    setZoomLevel(1);
  };

  return (
    <div className="newspaper-page-wrapper">
      {/* Standard Common Hero */}
      <Hero
        title="Campus NewsLetter"
        description="Official Bulletins, Academic Dispatches & Student Chronicles of SVASC"
        image={hero}
      />

      <div className="newspaper-container">
        {/* ================================================================
            AUTHENTIC NEWSPAPER MASTHEAD (Broadsheet Header)
            ================================================================ */}
        <header className="newspaper-masthead">
          {/* Top Ears Bar */}
          <div className="newspaper-ears-bar">
            <div className="newspaper-ear-left">
              <span>ESTD. 2007 · ERODE, TAMIL NADU</span>
              <span style={{ color: 'var(--np-ink-muted)', fontSize: '10px' }}>
                Affiliated to Bharathiar University
              </span>
            </div>
            <div className="newspaper-ear-center">
              ✦ "Truth, Discipline & Academic Excellence" ✦
            </div>
            <div className="newspaper-ear-right">
              <span>CAMPUS BROADSHEET EDITION</span>
              <span style={{ color: 'var(--np-ink-muted)', fontSize: '10px' }}>
                Circulation: All Departments & Scholars
              </span>
            </div>
          </div>

          {/* Grand Masthead Title */}
          <div className="newspaper-title-block">
            <h1 className="newspaper-gothic-title">The SVASC Chronicle</h1>
            <div className="newspaper-subtitle">
              Official Campus Newsletter · Student Welfare & Institutional Gazette
            </div>
          </div>

          {/* Dateline Bar (Classic Double Rule) */}
          <div className="newspaper-dateline-bar">
            <div className="newspaper-dateline-vol">
              VOL. XXIV · NO. 104
            </div>
            <div className="newspaper-dateline-center">
              ERODE EDITION · {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()}
            </div>
            <div className="newspaper-dateline-edition">
              ARCHIVE REPOSITORY · FREE DIGITAL ISSUE
            </div>
          </div>

          {/* Editorial Ticker / Quote */}
          <div className="newspaper-editorial-ticker">
            "All the authentic news, student milestones, department symposiums, and institutional achievements fit to print."
          </div>
        </header>

        {/* ================================================================
            EDITORIAL TOOLBAR (Search & Archive Count)
            ================================================================ */}
        <div className="newspaper-toolbar">
          <div className="newspaper-search-box">
            <i className="fa fa-search newspaper-search-icon" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search newsletter headlines or releases..."
              className="newspaper-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="newspaper-edition-counter">
            <span>Preserved Editions:</span>
            <span className="newspaper-stamp-pill">
              {filteredNewsletters.length} {filteredNewsletters.length === 1 ? 'Dispatch' : 'Dispatches'}
            </span>
          </div>
        </div>

        {/* ================================================================
            UNEVEN BROADSHEET EDITORIAL GRID
            ================================================================ */}
        {loading ? (
          <div className="newspaper-loading-state">
            <p>Gathering Today's Broadside Dispatches...</p>
            <div className="newspaper-empty-subtext">Printing presses are running. Please stand by.</div>
          </div>
        ) : filteredNewsletters.length === 0 ? (
          <div className="newspaper-empty-state">
            <p>No Dispatches Found Matching Your Query.</p>
            <div className="newspaper-empty-subtext">
              Try searching with another term or view all published archives.
            </div>
          </div>
        ) : (
          <div className="newspaper-broadsheet-grid">
            {filteredNewsletters.map((item, index) => {
              const cleanPdf = (item.pdf || '').replace(/^\/+/, '');
              const fileSrc = item.pdf?.startsWith('http')
                ? item.pdf
                : `${BASE_URL}/${cleanPdf}`;
              const layoutClass = getCardLayoutClass(index);
              const stamp = getCardStamp(index);
              const pubDate = formatDate(item.createdAt);

              // FORMAT 1: FRONT PAGE LEAD STORY (Asymmetric Grand Broadside)
              if (layoutClass === 'layout-lead') {
                return (
                  <article key={item._id} className={`newspaper-card ${layoutClass}`}>
                    <div className="newspaper-lead-inner">
                      <div
                        className="newspaper-clipping-frame"
                        onClick={() => openLightbox(item)}
                      >
                        <img
                          src={fileSrc}
                          alt={item.title}
                          className="newspaper-clipping-img"
                        />
                        <div className="newspaper-clipping-overlay">
                          <div className="newspaper-overlay-icon">
                            <i className="fa fa-search-plus" aria-hidden="true" />
                          </div>
                          <span>Inspect Broadside</span>
                        </div>
                      </div>

                      <div className="newspaper-lead-content">
                        <span className={`newspaper-card-stamp ${stamp.className}`}>
                          {stamp.text}
                        </span>
                        <div className="newspaper-byline">
                          <span>CAMPUS EDITORIAL DESK</span>
                          <span className="newspaper-byline-dot" />
                          <span>{pubDate}</span>
                        </div>
                        <h2 className="newspaper-headline">{item.title}</h2>
                        <div className="newspaper-lead-excerpt">
                          Discover the comprehensive highlights, academic dispatches, and key campus developments published in this official SVASC bulletin. Click below to inspect the complete full-page broadsheet edition.
                        </div>

                        <div className="newspaper-card-actions" style={{ margin: 'auto -28px -24px', padding: '12px 28px' }}>
                          <button
                            type="button"
                            className="newspaper-btn-read"
                            onClick={() => openLightbox(item)}
                          >
                            <i className="fa fa-expand" aria-hidden="true" /> Read Edition
                          </button>
                          <a
                            href={fileSrc}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="newspaper-btn-download"
                            download
                          >
                            <i className="fa fa-download" aria-hidden="true" /> View Clipping
                          </a>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              }

              // FORMAT 3: HALF-FOLD WIDE FEATURE (Landscape 2-Column Split)
              if (layoutClass === 'layout-halffold') {
                return (
                  <article key={item._id} className={`newspaper-card ${layoutClass}`}>
                    <div className="newspaper-halffold-inner">
                      <div
                        className="newspaper-clipping-frame"
                        onClick={() => openLightbox(item)}
                      >
                        <img
                          src={fileSrc}
                          alt={item.title}
                          className="newspaper-clipping-img"
                        />
                        <div className="newspaper-clipping-overlay">
                          <div className="newspaper-overlay-icon">
                            <i className="fa fa-search-plus" aria-hidden="true" />
                          </div>
                          <span>Inspect Broadside</span>
                        </div>
                      </div>

                      <div className="newspaper-halffold-content">
                        <span className={`newspaper-card-stamp ${stamp.className}`}>
                          {stamp.text}
                        </span>
                        <div className="newspaper-byline">
                          <span>DISPATCH ARCHIVE</span>
                          <span className="newspaper-byline-dot" />
                          <span>{pubDate}</span>
                        </div>
                        <h2 className="newspaper-headline">{item.title}</h2>
                        <p style={{ fontFamily: 'var(--np-font-serif)', fontSize: '14px', color: 'var(--np-ink-soft)', lineHeight: 1.5, margin: '0 0 16px' }}>
                          Official institutional dispatch recording co-curricular and departmental achievements.
                        </p>

                        <div className="newspaper-card-actions" style={{ margin: 'auto -22px -20px', padding: '12px 22px' }}>
                          <button
                            type="button"
                            className="newspaper-btn-read"
                            onClick={() => openLightbox(item)}
                          >
                            <i className="fa fa-expand" aria-hidden="true" /> Inspect
                          </button>
                          <a
                            href={fileSrc}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="newspaper-btn-download"
                            download
                          >
                            <i className="fa fa-external-link" aria-hidden="true" /> View
                          </a>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              }

              // FORMAT 2, 4, 5: COLUMNIST, BULLETIN & BROADSIDE FEATURES (Uneven Vertical Proportions)
              return (
                <article key={item._id} className={`newspaper-card ${layoutClass}`}>
                  <div className="newspaper-card-body">
                    <span className={`newspaper-card-stamp ${stamp.className}`}>
                      {stamp.text}
                    </span>
                    <div className="newspaper-byline">
                      <span>SVASC GAZETTE</span>
                      <span className="newspaper-byline-dot" />
                      <span>{pubDate}</span>
                    </div>

                    <div
                      className="newspaper-clipping-frame"
                      onClick={() => openLightbox(item)}
                    >
                      <img
                        src={fileSrc}
                        alt={item.title}
                        className="newspaper-clipping-img"
                      />
                      <div className="newspaper-clipping-overlay">
                        <div className="newspaper-overlay-icon">
                          <i className="fa fa-search-plus" aria-hidden="true" />
                        </div>
                        <span>Inspect Broadside</span>
                      </div>
                    </div>

                    <h2 className="newspaper-headline">{item.title}</h2>
                  </div>

                  <div className="newspaper-card-actions">
                    <button
                      type="button"
                      className="newspaper-btn-read"
                      onClick={() => openLightbox(item)}
                    >
                      <i className="fa fa-expand" aria-hidden="true" /> Inspect Broadside
                    </button>
                    <a
                      href={fileSrc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="newspaper-btn-download"
                      download
                    >
                      <i className="fa fa-download" aria-hidden="true" /> Download
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* ================================================================
          NEWSPAPER LIGHTBOX / MODAL READER
          ================================================================ */}
      {selectedItem && (
        <div
          className="newspaper-modal-overlay"
          onClick={closeLightbox}
        >
          <div
            className="newspaper-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="newspaper-modal-header">
              <div className="newspaper-modal-title-group">
                <h3>{selectedItem.title}</h3>
                <div className="newspaper-modal-meta">
                  THE SVASC CHRONICLE · PUBLISHED {formatDate(selectedItem.createdAt)}
                </div>
              </div>

              <div className="newspaper-modal-controls">
                <button
                  type="button"
                  className="newspaper-modal-btn"
                  onClick={() => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5))}
                  title="Zoom In"
                >
                  <i className="fa fa-plus" aria-hidden="true" /> Zoom
                </button>
                <button
                  type="button"
                  className="newspaper-modal-btn"
                  onClick={() => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75))}
                  title="Zoom Out"
                >
                  <i className="fa fa-minus" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="newspaper-modal-btn"
                  onClick={() => setZoomLevel(1)}
                  title="Reset Zoom"
                >
                  Reset
                </button>
                <a
                  href={selectedItem.pdf?.startsWith('http') ? selectedItem.pdf : `${BASE_URL}/${selectedItem.pdf.replace(/^\/+/, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="newspaper-modal-btn"
                  download
                >
                  <i className="fa fa-download" aria-hidden="true" /> Download
                </a>
                <button
                  type="button"
                  className="newspaper-modal-close"
                  onClick={closeLightbox}
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="newspaper-modal-body">
              <img
                src={
                  selectedItem.pdf?.startsWith('http')
                    ? selectedItem.pdf
                    : `${BASE_URL}/${selectedItem.pdf.replace(/^\/+/, '')}`
                }
                alt={selectedItem.title}
                className="newspaper-modal-image"
                style={{ transform: `scale(${zoomLevel})` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsLetter;