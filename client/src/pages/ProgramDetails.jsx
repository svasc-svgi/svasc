import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { programDetailsData } from '../data/programDetailsData';
import styles from './ProgramDetails.module.css';
import { ChevronRight, MessageSquare, ChevronsRight, X, ChevronLeft, Calendar, Tag, Maximize2, Target, Compass } from 'lucide-react';
import { useStaffPhotos } from '../hooks/useStaffPhotos';
import { getStaffInitials } from '../utils/staffParser';
import { getAllStaff } from '../services/staffService';

const PROGRAM_DEPT_MAP = {
    'bsc-computer-science': 'B.Sc. Computer Science',
    'bsccomputer-ai-ds': 'B.Sc. Computer Science (AI & DS)',
    'bachelor-of-computer-applications-bca': 'Bachelor of Computer Applications (BCA)',
    'bscinformation-technology': 'B.Sc. Information Technology',
    'bsccyber-security': 'B.Sc. Cyber Security',
    'b-com-bachelor-of-commerce': 'B. Com – Bachelor of Commerce',
    'b-combi-bachelor-of-commerce-with-banking-insurance': 'B.Com (Banking & Insurance)',
    'bcom-it-bachelor-of-information-technology': 'B.Com (Information Technology)',
    'bcomca-computer-applications': 'B.Com (Computer Applications)',
    'bcom-pa-professional-accounting': 'B.Com (Professional Accounting)',
    'management': 'BBA - Management Studies',
    'managementbba': 'BBA - Management Studies',
    'bba': 'BBA - Management Studies',
    'bsc-chemistry': 'B.Sc. Chemistry',
    'bsc-mathematics': 'B.Sc. Mathematics',
    'bsc-microbiology': 'B.Sc. Microbiology',
    'ba-english': 'B.A. English',
    'bsc-costume-design-fashion': 'B.Sc. Costume Design & Fashion',
    'msc-computer-science': 'M.Sc. Computer Science',
    'mcom': 'Master of Commerce (M.Com)',
    'msc-microbiology': 'M.Sc. Microbiology',
    'phd-commerce': 'Ph.D. Commerce',
    'phd-english': 'Ph.D. English',
    'ma-english': 'M.A. English',
    'physical-education': 'Department of Physical Education',
    'department-of-physical-education': 'Department of Physical Education'
};

const resolveDeptName = (progId, progTitle) => {
    if (PROGRAM_DEPT_MAP[progId]) return PROGRAM_DEPT_MAP[progId];
    if (progTitle) {
        for (const [slug, dept] of Object.entries(PROGRAM_DEPT_MAP)) {
            if (progTitle.toLowerCase().includes(dept.toLowerCase()) || dept.toLowerCase().includes(progTitle.toLowerCase())) {
                return dept;
            }
        }
        return progTitle;
    }
    return progId;
};

const ProgramDetails = () => {
    const { id } = useParams();
    const cleanId = (id || '').toLowerCase();
    let program = programDetailsData[id] || programDetailsData[cleanId];
    if (!program) {
        if (cleanId.includes('bba') || cleanId.includes('management')) {
            program = programDetailsData['management'] || programDetailsData['managementbba'] || programDetailsData['bba'];
        }
    }
    const { getStaffPhoto } = useStaffPhotos();

    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [dbStaff, setDbStaff] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        setActiveCategory('All');
        setSelectedImageIndex(null);
    }, [id]);

    useEffect(() => {
        let isMounted = true;
        const targetDept = resolveDeptName(cleanId, program?.title);

        getAllStaff({ department: targetDept })
            .then((staff) => {
                if (!isMounted) return;
                if (Array.isArray(staff) && staff.length > 0) {
                    const sorted = [...staff].sort((a, b) => (a.sNo || 0) - (b.sNo || 0) || (new Date(a.createdAt || 0) - new Date(b.createdAt || 0)));
                    setDbStaff(sorted);
                } else {
                    setDbStaff([]);
                }
            })
            .catch((err) => {
                console.warn('Could not load dynamic staff for', targetDept, err.message);
                if (isMounted) setDbStaff([]);
            });

        return () => { isMounted = false; };
    }, [id, cleanId, program?.title]);

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
                {(program.vision || program.mission) && (
                    <section className={styles.visionMissionSection}>
                        <div className={styles.container}>
                            <div className={styles.vmStack}>
                                {program.vision && (
                                    <div className={styles.visionCard}>
                                        <div className={styles.vmHeader}>
                                            <div className={styles.vmIconBadge}>
                                                <Target size={24} />
                                            </div>
                                            <h2>Vision</h2>
                                        </div>
                                        <p className={styles.visionText}>"{program.vision}"</p>
                                    </div>
                                )}
                                {program.mission && (
                                    <div className={styles.missionCard}>
                                        <div className={styles.vmHeader}>
                                            <div className={styles.missionIconBadge}>
                                                <Compass size={24} />
                                            </div>
                                            <h2>Mission</h2>
                                        </div>
                                        {Array.isArray(program.mission) ? (
                                            <ul className={styles.missionGrid}>
                                                {program.mission.map((item, idx) => (
                                                    <li key={idx} className={styles.missionItem}>
                                                        <div className={styles.missionBullet}>
                                                            <ChevronsRight size={16} />
                                                        </div>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className={styles.missionText}>{program.mission}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}

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

                {/* FUNCTIONS OF THE DEPARTMENT */}
                {program.functions && (
                    <section className={styles.objectivesSection}>
                        <div className={styles.container}>
                            <div className={styles.sectionCard}>
                                <h2>Functions of the Department</h2>
                                {program.functionsDescription && (
                                    <p className={styles.sectionLeadText}>{program.functionsDescription}</p>
                                )}
                                <ul className={styles.bulletList}>
                                    {program.functions.map((func, idx) => (
                                        <li key={idx}>
                                            <ChevronsRight className={styles.doubleArrow} size={20} />
                                            <span>{func}</span>
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
                                {Array.isArray(program.rolesAndResponsibilities) &&
                                program.rolesAndResponsibilities.length > 0 &&
                                typeof program.rolesAndResponsibilities[0] === 'object' ? (
                                    <div className={styles.rolesGroupContainer}>
                                        {program.rolesAndResponsibilities.map((group, gIdx) => (
                                            <div key={gIdx} className={styles.roleSubGroup}>
                                                <h3 className={styles.roleSubGroupTitle}>{group.category}</h3>
                                                <ul className={styles.bulletList}>
                                                    {group.items && group.items.map((role, idx) => (
                                                        <li key={idx}>
                                                            <ChevronsRight className={styles.doubleArrow} size={20} />
                                                            <span>{role}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <ul className={styles.bulletList}>
                                        {program.rolesAndResponsibilities.map((role, idx) => (
                                            <li key={idx}>
                                                <ChevronsRight className={styles.doubleArrow} size={20} />
                                                <span>{role}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
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

                {/* OPPORTUNITIES (CATEGORIZED OR FLAT LIST) */}
                {program.opportunities ? (
                    <section className={styles.careerSection}>
                        <div className={styles.container}>
                            <h2 className={styles.sectionTitle}>Academic & Professional Opportunities</h2>
                            {program.opportunitiesLead && (
                                <p className={styles.sectionLeadCentered}>{program.opportunitiesLead}</p>
                            )}
                            <div className={styles.opportunitiesStack}>
                                {program.opportunities.map((oppGroup, gIdx) => (
                                    <div key={gIdx} className={styles.oppGroup}>
                                        <div className={styles.oppGroupHeader}>
                                            <span className={styles.oppGroupBadge}>{oppGroup.category}</span>
                                        </div>
                                        <div className={styles.careerGrid}>
                                            {oppGroup.items.map((item, idx) => (
                                                <div key={idx} className={styles.careerBox}>
                                                    {typeof item === 'string' ? item : item.title}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                ) : program.careerOpportunities ? (
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
                ) : null}

                {/* STAFF DETAILS */}
                {((dbStaff && dbStaff.length > 0) || (program && program.staffDetails && program.staffDetails.length > 0)) && (
                    <section className={styles.staffSection}>
                        <div className={styles.container}>
                            <h2 className={styles.sectionTitle}>Staff Details</h2>
                            <div className={styles.tableWrapper}>
                                <table className={styles.staffTable}>
                                    <thead>
                                        <tr>
                                            <th className={styles.sNoCol}>S.No</th>
                                            <th className={styles.photoCol}>Staff Photo</th>
                                            <th>Name of the Faculty</th>
                                            <th>Qualification</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {((dbStaff && dbStaff.length > 0) ? dbStaff : program.staffDetails).map((staff, idx) => {
                                            const facultyName = staff.fullName || staff.name || '';
                                            const photoUrl = staff.photo || staff.image || getStaffPhoto(facultyName);
                                            const initials = staff.initial || getStaffInitials(facultyName);
                                            const qualification = staff.qualification || '-';

                                            return (
                                                <tr key={staff._id || staff.id || idx}>
                                                    <td className={styles.sNoCell}>{staff.sNo || idx + 1}</td>
                                                    <td className={styles.photoCell}>
                                                        <div className={styles.avatarWrapper}>
                                                            {photoUrl ? (
                                                                <img
                                                                    src={photoUrl}
                                                                    alt={facultyName}
                                                                    className={styles.staffAvatar}
                                                                    loading="lazy"
                                                                    onError={(e) => {
                                                                        e.currentTarget.style.display = 'none';
                                                                        const fallback = e.currentTarget.parentElement?.querySelector(`.${styles.staffPlaceholder}`);
                                                                        if (fallback) fallback.style.display = 'flex';
                                                                    }}
                                                                />
                                                            ) : null}
                                                            <div
                                                                className={styles.staffPlaceholder}
                                                                style={{ display: photoUrl ? 'none' : 'flex' }}
                                                            >
                                                                {initials}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className={styles.facultyName}>{facultyName}</td>
                                                    <td>{qualification}</td>
                                                </tr>
                                            );
                                        })}
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
