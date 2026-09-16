import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { programDetailsData } from '../data/programDetailsData';
import styles from './ProgramDetails.module.css';
import { ChevronRight, MessageSquare, ChevronsRight, X, ChevronLeft, Calendar, Tag, Maximize2 } from 'lucide-react';

const ProgramDetails = () => {
    const { id } = useParams();
    const program = programDetailsData[id];

    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        setActiveCategory('All');
        setSelectedImageIndex(null);
    }, [id]);

    if (!program) {
        return (
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.notFound}>
                        <h1>Program Not Found</h1>
                        <Link to="/programms" className={styles.backButton}>Back to Programs</Link>
                    </div>
                </div>
            </div>
        );
    }

    const galleryItems = program.gallery || [];
    const categories = ['All', ...Array.from(new Set(galleryItems.map(item => item.category).filter(Boolean)))];

    const filteredGallery = activeCategory === 'All'
        ? galleryItems
        : galleryItems.filter(item => item.category === activeCategory);

    const openLightbox = (index) => setSelectedImageIndex(index);
    const closeLightbox = () => setSelectedImageIndex(null);
    const prevImage = () => setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : filteredGallery.length - 1));
    const nextImage = () => setSelectedImageIndex((prev) => (prev < filteredGallery.length - 1 ? prev + 1 : 0));

    return (
        <div className={styles.wrapper}>
            {/* HERO SECTION */}
            <header className={styles.hero} style={{ backgroundImage: `url("${program.heroImage}")` }}>
                <div className={styles.heroOverlay}>
                    <div className={styles.heroContent}>
                        <h1>{program.title}</h1>
                        <div className={styles.breadcrumbs}>
                            <Link to="/">Home</Link> <ChevronRight size={14} />
                            <Link to="/programms">Programmes</Link> <ChevronRight size={14} />
                            <span>{program.title}</span>
                        </div>
                    </div>
                </div>
                {/* TICKER */}
                <div className={styles.ticker}>
                    <div className={styles.tickerContent}>
                        <span>Admissions Open for {new Date().getFullYear()} - {new Date().getFullYear() + 1}</span>
                        <span>•</span>
                        <span>Apply Online Today!</span>
                        <span>•</span>
                        <span>Latest results announced</span>
                    </div>
                </div>
            </header>

            <div className={styles.mainContent}>
                {/* ABOUT SECTION (Card Style) */}
                <section className={styles.aboutWrapper}>
                    <div className={styles.container}>
                        <div className={styles.aboutCard}>
                            <div className={styles.aboutGrid}>
                                <div className={styles.aboutText}>
                                    <p>{program.about}</p>
                                </div>
                                <div className={styles.aboutImage}>
                                    <img src={program.aboutImage} alt="Program Intro" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* VISION & MISSION */}
                <section className={styles.visionMissionSection}>
                    <div className={styles.container}>
                        <div className={styles.gridTwo}>
                            <div className={styles.vmCard}>
                                <h2>Vision</h2>
                                <p>{program.vision}</p>
                            </div>
                            <div className={styles.vmCard}>
                                <h2>Mission</h2>
                                {Array.isArray(program.mission) ? (
                                    <ul className={styles.vmList}>
                                        {program.mission.map((item, idx) => (
                                            <li key={idx}>
                                                <ChevronsRight className={styles.doubleArrow} size={18} />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>{program.mission}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* OBJECTIVES */}
                {program.objectives && (
                    <section className={styles.objectivesSection}>
                        <div className={styles.container}>
                            <div className={styles.sectionCard}>
                                <h2>Objectives</h2>
                                <ul className={styles.bulletList}>
                                    {program.objectives.map((obj, idx) => (
                                        <li key={idx}>
                                            <ChevronsRight className={styles.doubleArrow} size={20} />
                                            <span>{obj}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>
                )}

                {/* ROLES AND RESPONSIBILITIES */}
                {program.rolesAndResponsibilities && (
                    <section className={styles.rolesSection}>
                        <div className={styles.container}>
                            <div className={styles.sectionCard}>
                                <h2>Roles and Responsibilities of the Department</h2>
                                <ul className={styles.bulletList}>
                                    {program.rolesAndResponsibilities.map((role, idx) => (
                                        <li key={idx}>
                                            <ChevronsRight className={styles.doubleArrow} size={20} />
                                            <span>{role}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>
                )}

                {/* FACILITIES SECTION (Split Color) */}
                {program.facilities && (
                    <section className={styles.facilitiesSection}>
                        <div className={styles.facilitiesFlex}>
                            <div className={styles.facilitiesContent}>
                                <h2>Department Facilities</h2>
                                <ul className={styles.facilitiesList}>
                                    {program.facilities.map((item, idx) => (
                                        <li key={idx}>
                                            <ChevronsRight className={styles.doubleArrow} size={20} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className={styles.facilitiesImage}>
                                <img src={program.facilitiesImage} alt="Facilities" />
                            </div>
                        </div>
                    </section>
                )}

                {/* CAREER OPPORTUNITIES */}
                {program.careerOpportunities && (
                    <section className={styles.careerSection}>
                        <div className={styles.container}>
                            <h2 className={styles.sectionTitle}>Career Opportunities</h2>
                            <div className={styles.careerGrid}>
                                {program.careerOpportunities.map((career, idx) => (
                                    <div key={idx} className={styles.careerBox}>
                                        {career.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* STAFF DETAILS */}
                {program.staffDetails && (
                    <section className={styles.staffSection}>
                        <div className={styles.container}>
                            <h2 className={styles.sectionTitle}>Staff Details</h2>
                            <div className={styles.tableWrapper}>
                                <table className={styles.staffTable}>
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Name of the Faculty</th>
                                            <th>Qualification</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {program.staffDetails.map((staff, idx) => (
                                            <tr key={idx}>
                                                <td>{staff.sNo || idx + 1}</td>
                                                <td className={styles.facultyName}>{staff.name}</td>
                                                <td>{staff.qualification}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                )}

                {/* DEPARTMENT ACTIVITIES & PHOTO GALLERY */}
                {galleryItems.length > 0 && (
                    <section className={styles.gallerySection}>
                        <div className={styles.container}>
                            <div className={styles.galleryHeader}>
                                <h2>Department Activities & Photo Gallery</h2>
                                <p>Highlights of Workshops, Seminars, Industrial Visits, Guest Lectures & Celebrations</p>
                            </div>

                            {/* Category Filter Tabs */}
                            {categories.length > 2 && (
                                <div className={styles.filterTabs}>
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            className={`${styles.filterTab} ${activeCategory === cat ? styles.activeFilterTab : ''}`}
                                            onClick={() => setActiveCategory(cat)}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Gallery Grid */}
                            <div className={styles.galleryGrid}>
                                {filteredGallery.map((item, idx) => (
                                    <div key={idx} className={styles.galleryCard} onClick={() => openLightbox(idx)}>
                                        <div className={styles.galleryImageWrapper}>
                                            <img src={item.image} alt={item.title} />
                                            <div className={styles.galleryOverlay}>
                                                <Maximize2 size={24} className={styles.zoomIcon} />
                                            </div>
                                            {item.category && (
                                                <span className={styles.categoryBadge}>
                                                    <Tag size={12} /> {item.category}
                                                </span>
                                            )}
                                        </div>
                                        <div className={styles.galleryCardContent}>
                                            {item.date && (
                                                <span className={styles.eventDate}>
                                                    <Calendar size={13} /> {item.date}
                                                </span>
                                            )}
                                            <h3>{item.title}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* LIGHTBOX MODAL */}
                {selectedImageIndex !== null && filteredGallery[selectedImageIndex] && (
                    <div className={styles.lightboxModal} onClick={closeLightbox}>
                        <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
                            <button className={styles.closeBtn} onClick={closeLightbox} aria-label="Close modal">
                                <X size={28} />
                            </button>
                            <button className={styles.prevBtn} onClick={prevImage} aria-label="Previous photo">
                                <ChevronLeft size={36} />
                            </button>
                            <div className={styles.lightboxImageContainer}>
                                <img
                                    src={filteredGallery[selectedImageIndex].image}
                                    alt={filteredGallery[selectedImageIndex].title}
                                />
                                <div className={styles.lightboxCaption}>
                                    <h3>{filteredGallery[selectedImageIndex].title}</h3>
                                    {(filteredGallery[selectedImageIndex].category || filteredGallery[selectedImageIndex].date) && (
                                        <div className={styles.lightboxMeta}>
                                            {filteredGallery[selectedImageIndex].category && (
                                                <span><Tag size={14} /> {filteredGallery[selectedImageIndex].category}</span>
                                            )}
                                            {filteredGallery[selectedImageIndex].date && (
                                                <span><Calendar size={14} /> {filteredGallery[selectedImageIndex].date}</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button className={styles.nextBtn} onClick={nextImage} aria-label="Next photo">
                                <ChevronRight size={36} />
                            </button>
                        </div>
                    </div>
                )}

                {/* FAQ SECTION */}
                {program.faqs && program.faqs.length > 0 && (
                    <section className={styles.faqSection}>
                        <div className={styles.container}>
                            <div className={styles.faqFlex}>
                                <div className={styles.faqLeftImage}>
                                    <img src="https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?q=80&w=800" alt="FAQ Illustration" />
                                </div>
                                <div className={styles.faqRight}>
                                    <h2>FAQ</h2>
                                    <div className={styles.faqList}>
                                        {program.faqs.map((faq, index) => (
                                            <details key={index} className={styles.faqItem}>
                                                <summary>
                                                    {faq.question}
                                                    <MessageSquare size={18} className={styles.faqIcon} />
                                                </summary>
                                                <div className={styles.faqAnswer}>{faq.answer}</div>
                                            </details>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </div>

            {/* STICKY ADMISSION SIDEBAR */}
            <Link to="https://docs.google.com/forms/d/1D8p8FqQc3wgbY7PkNJxsJAl87X0yQ3tUiAKosXWVUCY/viewform?ts=5e7b2d33&edit_requested=true" className={styles.admissionSticky}>
                Admission Enquiry <span></span>
            </Link>
        </div>
    );
};

export default ProgramDetails;
