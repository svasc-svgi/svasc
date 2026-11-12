import React, { useState, useEffect } from 'react';
import Hero from '../components/Common/Hero';
import { getNewsletters } from '../services/newsletterService';
import hero from '../assets/newsletter hero.png';
import './NewsLetter.css';
import {
  FileText,
  Download,
  ExternalLink,
  ArrowUpRight,
  Search,
  Calendar,
  Eye,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  BookOpen
} from 'lucide-react';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const DEFAULT_NEWSLETTERS = [
  {
    _id: "newsletter-2026-nov",
    title: "SVASC Campus Newsletter – Official Release",
    description: "Discover the comprehensive highlights, academic dispatches, student milestones, department symposiums, and key institutional achievements published in this official SVASC bulletin.",
    byline: "CAMPUS EDITORIAL DESK",
    date: "NOVEMBER 7, 2026",
    pdf: "https://res.cloudinary.com/kfaxaxag/image/upload/v1794059795/svasc/newsletters/qq3papptgwl8lgbk68ha.pdf",
    fallbackPdf: "/newsletter/newsletter_2026.pdf",
    coverImage: "/newsletter/newsletter_cover.jpg",
    isFeatured: true
  }
];

const NewsLetter = () => {
  const [newsletters, setNewsletters] = useState(DEFAULT_NEWSLETTERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPdfItem, setSelectedPdfItem] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        setLoading(true);
        const response = await getNewsletters();
        const list = response?.data ?? (Array.isArray(response) ? response : []);

        if (Array.isArray(list) && list.length > 0) {
          // Exclude the event items that were moved to blogs, keeping real newsletter PDFs
          const validNewsletters = list.filter((item) => {
            const title = (item.title || '').toLowerCase();
            const pdf = (item.pdf || '').toLowerCase();
            const isEvent =
              title.includes('mathematics department') ||
              title.includes('math "o" mania') ||
              title.includes('math o mania') ||
              title.includes('mou signing') ||
              title.includes('nss') ||
              title.includes('blood donation') ||
              title.includes('drug abuse') ||
              title.includes('tamil department');

            return !isEvent && (pdf.endsWith('.pdf') || title.includes('news'));
          });

          if (validNewsletters.length > 0) {
            const mapped = validNewsletters.map((item, idx) => {
              const cleanPdf = (item.pdf || '').replace(/^\/+/, '');
              const fileSrc = item.pdf?.startsWith('http')
                ? item.pdf
                : `${BASE_URL}/${cleanPdf}`;

              const d = item.createdAt ? new Date(item.createdAt) : null;
              const dateFormatted = d && !isNaN(d.getTime())
                ? d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()
                : 'NOVEMBER 7, 2026';

              return {
                _id: item._id || `db-news-${idx}`,
                title: item.title === 'NEWS LETTER' ? 'SVASC Campus Newsletter – Official Release' : item.title,
                description: item.description || "Discover the comprehensive highlights, academic dispatches, student milestones, department symposiums, and key institutional achievements published in this official SVASC bulletin.",
                byline: "CAMPUS EDITORIAL DESK",
                date: dateFormatted,
                pdf: fileSrc,
                fallbackPdf: "/newsletter/newsletter_2026.pdf",
                coverImage: "/newsletter/newsletter_cover.jpg",
                isFeatured: true
              };
            });

            setNewsletters(mapped);
          }
        }
      } catch (error) {
        console.warn('Could not fetch dynamic newsletters, using default publication:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsletters();
  }, []);

  const filteredNewsletters = newsletters.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    const t = (item.title || '').toLowerCase();
    const d = (item.description || '').toLowerCase();
    const dt = (item.date || '').toLowerCase();
    return t.includes(q) || d.includes(q) || dt.includes(q);
  });

  const handleOpenPdf = (pdfUrl, e) => {
    if (e) e.stopPropagation();
    if (!pdfUrl) return;
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  const openLightboxModal = (item) => {
    setSelectedPdfItem(item);
    setZoomLevel(1);
  };

  const closeLightboxModal = () => {
    setSelectedPdfItem(null);
    setZoomLevel(1);
  };

  return (
    <div className="newsletter-page">
      {/* Page Hero */}
      <Hero
        title="Campus NewsLetter"
        description="Official Bulletins, Academic Dispatches & Student Chronicles of SVASC"
        image={hero}
      />

      <div className="newsletter-main-container">
        {/* Section Header */}
        <div className="newsletter-header-bar">
          <div className="newsletter-header-info">
            <span className="newsletter-section-pill">
              <Sparkles size={14} /> Institutional Publications
            </span>
            <h2 className="newsletter-section-title">Official Campus Newsletters</h2>
            <p className="newsletter-section-desc">
              Explore official digital editions of our institutional gazette, highlighting academic milestones, student laurels, and departmental achievements.
            </p>
          </div>

          {newsletters.length > 1 && (
            <div className="newsletter-search-wrapper">
              <Search size={18} className="newsletter-search-icon" />
              <input
                type="text"
                placeholder="Search newsletter editions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="newsletter-search-input"
              />
            </div>
          )}
        </div>

        {/* NEWSLETTER CARDS GRID (3 Cards Per Row on Desktop, Left-Aligned) */}
        {filteredNewsletters.length === 0 ? (
          <div className="newsletter-empty-card">
            <FileText size={48} color="#94a3b8" />
            <h4>No Newsletter Publications Found</h4>
            <p>Try searching with another keyword or clear the search field to view the official release.</p>
          </div>
        ) : (
          <div className="newsletter-cards-grid">
            {filteredNewsletters.map((item, idx) => (
              <div
                key={item._id}
                className="newsletter-card"
                onClick={() => handleOpenPdf(item.pdf)}
              >
                {/* Card Thumbnail Frame */}
                <div className="card-thumb-frame">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="card-thumb-img"
                    onError={(e) => {
                      e.currentTarget.src = '/newsletter/newsletter_cover.jpg';
                    }}
                  />

                  {/* Corner Status Badge for Latest/Featured */}
                  {idx === 0 && (
                    <span className="card-status-badge">
                      <span className="status-dot" /> Latest Official Release
                    </span>
                  )}

                  <div className="card-thumb-overlay">
                    <span className="card-open-pill">
                      <Eye size={14} /> Open Official PDF
                    </span>
                  </div>

                  {/* Corner Arrow Icon Circle Button */}
                  <button
                    type="button"
                    className="card-corner-arrow-btn"
                    onClick={(e) => handleOpenPdf(item.pdf, e)}
                    title="Open PDF Document"
                    aria-label="Open PDF Document"
                  >
                    <ArrowUpRight size={18} />
                  </button>
                </div>

                {/* Card Body */}
                <div className="card-body-content">
                  <div className="card-byline-row">
                    <span className="card-desk-tag">
                      {item.byline || 'CAMPUS EDITORIAL DESK'}
                    </span>
                    <span className="card-date-tag">
                      <Calendar size={13} style={{ display: 'inline', marginRight: 5, verticalAlign: -1 }} />
                      {item.date}
                    </span>
                  </div>

                  <h3 className="card-headline">{item.title}</h3>

                  <p className="card-excerpt">{item.description}</p>

                  <div className="card-action-bar">
                    <button
                      type="button"
                      className="card-action-open-link"
                      onClick={(e) => handleOpenPdf(item.pdf, e)}
                    >
                      <span>Read Official PDF</span>
                      <span className="action-arrow-bubble">
                        <ArrowUpRight size={14} />
                      </span>
                    </button>

                    <div className="card-secondary-actions">
                      <button
                        type="button"
                        className="card-action-icon-link"
                        onClick={(e) => {
                          e.stopPropagation();
                          openLightboxModal(item);
                        }}
                        title="Quick Preview"
                        aria-label="Quick Preview"
                      >
                        <BookOpen size={15} />
                      </button>

                      <a
                        href={item.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card-action-icon-link"
                        onClick={(e) => e.stopPropagation()}
                        download
                        title="Download PDF"
                        aria-label="Download PDF"
                      >
                        <Download size={15} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* QUICK PREVIEW / EMBEDDED MODAL */}
      {selectedPdfItem && (
        <div className="newsletter-pdf-modal-overlay" onClick={closeLightboxModal}>
          <div className="newsletter-pdf-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-bar">
              <div className="modal-title-area">
                <span className="modal-desk-pill">
                  {selectedPdfItem.byline || 'CAMPUS EDITORIAL DESK'} · {selectedPdfItem.date}
                </span>
                <h4 className="modal-heading">{selectedPdfItem.title}</h4>
              </div>

              <div className="modal-controls-area">
                <button
                  type="button"
                  className="modal-ctrl-btn primary"
                  onClick={() => handleOpenPdf(selectedPdfItem.pdf)}
                  title="Open full PDF in new tab"
                >
                  <span>Open in Full Tab</span>
                  <ExternalLink size={15} />
                </button>
                <a
                  href={selectedPdfItem.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-ctrl-btn"
                  download
                  title="Download PDF document"
                >
                  <Download size={15} />
                  <span>Download</span>
                </a>
                <button
                  type="button"
                  className="modal-close-icon-btn"
                  onClick={closeLightboxModal}
                  aria-label="Close Preview"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="modal-viewer-body">
              {selectedPdfItem.pdf?.toLowerCase().endsWith('.pdf') ? (
                <iframe
                  src={`${selectedPdfItem.pdf}#toolbar=1&navpanes=0`}
                  title={selectedPdfItem.title}
                  className="modal-pdf-iframe"
                />
              ) : (
                <div className="modal-img-container">
                  <img
                    src={selectedPdfItem.pdf}
                    alt={selectedPdfItem.title}
                    className="modal-preview-img"
                    style={{ transform: `scale(${zoomLevel})` }}
                  />
                  <div className="modal-zoom-bar">
                    <button type="button" onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 2.5))}>
                      <ZoomIn size={16} />
                    </button>
                    <button type="button" onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.75))}>
                      <ZoomOut size={16} />
                    </button>
                    <button type="button" onClick={() => setZoomLevel(1)}>
                      <RotateCcw size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsLetter;
