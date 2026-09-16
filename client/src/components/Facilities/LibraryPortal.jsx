import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowRight, ChevronRight, BookOpen, Clock, Award, ShieldAlert, Users, Image as ImageIcon } from 'lucide-react';
import styles from './LibraryPortal.module.css';
import Hero from '../Common/Hero';
import { getLibraryActivities, getLibraryAwards } from '../../services/libraryService';
import libraryImg from '../../assets/library.JPG';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const LibraryPortal = () => {
    const [activeBook, setActiveBook] = useState(null);

    const books = [
        { id: 0, src: "/library_images/image28.jpeg", rotation: "-rotate-6", translateY: "translate-y-4" },
        { id: 1, src: "/library_images/image29.jpeg", rotation: "rotate-3", translateY: "translate-y-8" },
        { id: 2, src: "/library_images/image30.jpeg", rotation: "-rotate-2", translateY: "-translate-y-2" },
        { id: 3, src: "/library_images/image31.jpeg", rotation: "rotate-6", translateY: "translate-y-3" },
        { id: 4, src: "/library_images/image33.jpeg", rotation: "-rotate-3", translateY: "translate-y-6" },
        { id: 5, src: "/library_images/image34.jpeg", rotation: "rotate-2", translateY: "-translate-y-1" },
    ];

    const [activities, setActivities] = useState([]);
    const [students, setStudents] = useState([]);
    const [staff, setStaff] = useState([]);
    const [nonStaff, setNonStaff] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const activitiesRes = await getLibraryActivities();
                const actList = activitiesRes?.data ?? (Array.isArray(activitiesRes) ? activitiesRes : []);
                if (actList.length > 0) {
                    setActivities(actList.map(a => ({
                        ...a,
                        images: [
                            a.image1 && (a.image1.startsWith('http') ? a.image1 : `${BASE_URL}/${a.image1?.replace(/^\/+/, '')}`),
                            a.image2 && (a.image2.startsWith('http') ? a.image2 : `${BASE_URL}/${a.image2?.replace(/^\/+/, '')}`)
                        ].filter(Boolean)
                    })));
                }

                const awardsRes = await getLibraryAwards();
                const awardsList = awardsRes?.data ?? (Array.isArray(awardsRes) ? awardsRes : []);
                if (awardsList.length > 0) {
                    const awards = awardsList.map(a => ({
                        ...a,
                        src: a.image && (a.image.startsWith('http') ? a.image : `${BASE_URL}/${a.image?.replace(/^\/+/, '')}`)
                    }));
                    
                    setStudents(awards.filter(a => a.category === 'Student').map(a => ({ ...a, class: a.designation })));
                    setStaff(awards.filter(a => a.category === 'Faculty').map(a => ({ ...a, role: a.designation, dept: a.department })));
                    setNonStaff(awards.filter(a => a.category === 'NonTeaching').map(a => ({ ...a, role: a.designation })));
                }
            } catch (error) {
                console.error("Error fetching library data:", error);
            }
        };
        fetchData();
    }, []);

    const newsClippings = [
        "/library_images/image18.png",
        "/library_images/image19.jpeg",
        "/library_images/image20.jpeg",
        "/library_images/image21.jpeg",
        "/library_images/image22.jpeg",
        "/library_images/image23.jpeg",
        "/library_images/image24.jpeg",
        "/library_images/image25.jpeg",
        "/library_images/image26.jpeg",
        "/library_images/image27.jpeg"
    ];

    const galleryImages = [
        "/library_images/image28.jpeg",
        "/library_images/image29.jpeg",
        "/library_images/image30.jpeg",
        "/library_images/image31.jpeg",
        "/library_images/image33.jpeg",
        "/library_images/image34.jpeg",
        "/library_images/image35.jpeg",
        "/library_images/image36.jpeg",
        "/library_images/image37.jpeg",
        "/library_images/image38.jpeg",
        "/library_images/image39.jpeg",
        "/library_images/image40.jpeg",
        "/library_images/image41.jpeg",
        "/library_images/image42.jpeg"
    ];

    return (
        <>
            <Hero
                title="SVASC Library Portal"
                description="Your gateway to a world of knowledge and intellectual growth"
                image={libraryImg}
            />
            <div className={styles.pageWrapper}>
                {/* Global Background Texture */}
                <div className={styles.bgNoise}></div>

                {/* Hero section */}
                <section className={styles.heroSection}>
                    <div className={styles.bgGrid}></div>

                    <div className={styles.meshBg}>
                        <div className={styles.meshOrange}></div>
                        <div className={styles.meshStone}></div>
                    </div>

                    <div className={styles.heroContentContainer}>
                        <div className={styles.heroTextCenter}>
                            <h1 className={styles.heroHeadline}>
                                Curate your mental library
                            </h1>
                            <p className={styles.heroSubDescription}>
                                Access thousands of books, journals, and digital resources designed to empower your academic journey.
                            </p>
                        </div>

                        {/* Interactive Book Rail */}
                        <div className={styles.libraryRail}>
                            <div className={`${styles.floatingTag} ${styles.tagFiction}`}>
                                <div className={styles.tagBadge}>
                                    <div className={styles.dotBlue}></div>
                                    <span>Sci & Tech</span>
                                </div>
                            </div>
                            <div className={`${styles.floatingTag} ${styles.tagPhilosophy}`}>
                                <div className={styles.tagBadge}>
                                    <div className={styles.dotOrange}></div>
                                    <span>E-journals</span>
                                </div>
                            </div>

                            <div className={styles.bookGridContainer}>
                                <div className={styles.bookGrid}>
                                    {books.map((book) => (
                                        <div
                                            key={book.id}
                                            className={`${styles.bookCard} ${activeBook !== null && activeBook !== book.id ? styles.cardBlur : ''} ${activeBook === book.id ? styles.cardFocus : ''} ${book.rotation} ${book.translateY}`}
                                            onMouseEnter={() => setActiveBook(book.id)}
                                            onMouseLeave={() => setActiveBook(null)}
                                        >
                                            <div className={styles.bookAspect}>
                                                <img src={book.src} alt="Library Scene" className={styles.bookImg} />
                                                <div className={styles.bookOverlay}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className={styles.heroActions}>
                            <a href="#about-library" className={styles.ctaPrimary} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                                <div className={styles.ctaContent}>
                                    <span>Explore More</span>
                                    <ArrowRight className={styles.ctaIcon} size={20} />
                                </div>
                            </a>
                            <a href="#working-hours" className={styles.ctaSecondary}>
                                <span>Library Rules</span>
                                <ChevronRight size={20} />
                            </a>
                        </div>
                    </div>
                </section>

                {/* About Library Section */}
                <section id="about-library" className={styles.cafeSection}>
                    <div className={styles.container}>
                        <div className={styles.cafeGrid}>
                            <div className={styles.cafeImages}>
                                <div className={styles.imageColumn}>
                                    <div className={`${styles.imageWrapper} ${styles.aspect34}`}>
                                        <img src="/library_images/image28.jpeg" alt="Library Seating Area" />
                                    </div>
                                    <div className={`${styles.imageWrapper} ${styles.aspectSquare}`}>
                                        <img src="/library_images/image29.jpeg" alt="Library Book Racks" />
                                    </div>
                                </div>
                                <div className={`${styles.imageColumn} ${styles.pt8}`}>
                                    <div className={`${styles.imageWrapper} ${styles.aspectSquare}`}>
                                        <img src="/library_images/image30.jpeg" alt="Librarian Desk" />
                                    </div>
                                    <div className={`${styles.imageWrapper} ${styles.aspect34}`}>
                                        <img src="/library_images/image31.jpeg" alt="Student Reading Desk" />
                                    </div>
                                </div>
                            </div>

                            <div className={styles.cafeInfo}>
                                <span className={styles.sectionLabel}>Established in 2019</span>
                                <h2 className={styles.sectionTitle}>
                                    The Academic Info Hub
                                </h2>
                                <div className={styles.sectionCms}>
                                    <p>
                                        The knowledge centre of <span className={styles.textHighlight}>Shree Venkateshwara Arts and Science (co-edu.) College (SVCAS)</span>, established in 2019, serves as the academic information hub of the institution. Spread across <span className={styles.textHighlight}>4,000 sq. ft.</span> with a seating capacity of <span className={styles.textHighlight}>80 students</span>, it provides a learner-friendly environment that supports teaching, learning, research, and self-study.
                                    </p>
                                    <p>
                                        The centre maintains a collection of <span className={styles.textHighlight}>6,644 volumes with 2,272 titles</span>, covering science, arts, commerce, management, and allied disciplines. The collection is regularly updated to meet curriculum requirements and support academic excellence.
                                    </p>
                                    <p>
                                        The centre is automated using <span className={styles.textHighlight}>Campusilib library management software</span>, offering barcode-based circulation and OPAC (online public access catalogue) facilities for efficient access to library resources.
                                    </p>
                                </div>

                                <div className={styles.statsGrid}>
                                    <div>
                                        <p className={styles.statValue}>6,644</p>
                                        <p className={styles.statLabel}>Total Volumes</p>
                                    </div>
                                    <div>
                                        <p className={styles.statValue}>2,272</p>
                                        <p className={styles.statLabel}>Total Titles</p>
                                    </div>
                                    <div>
                                        <p className={styles.statValue}>15+</p>
                                        <p className={styles.statLabel}>Digital Terminals</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Computer Infrastructure Section */}
                <section className={styles.facilitiesSection} style={{ background: '#f5f5f4' }}>
                    <div className={styles.container}>
                        <h2 className={styles.facilitiesTitle}>Computer Infrastructure</h2>
                        <p className={{ textAlign: 'center', marginBottom: '40px', fontSize: '1.8rem', color: '#666' }} style={{ textAlign: 'center', marginBottom: '30px' }}>
                            The knowledge centre is equipped with ICT-enabled facilities to support library operations and promote digital learning.
                        </p>
                        <div className={styles.facilitiesGrid}>
                            <div className={styles.facilityCard}>
                                <p className={styles.facilityText}><strong>Circulation Section:</strong> Two computer systems are available for circulation services.</p>
                            </div>
                            <div className={styles.facilityCard}>
                                <p className={styles.facilityText}><strong>OPAC (Online Public Access Catalogue):</strong> One dedicated computer system is available for users to search the library catalogue.</p>
                            </div>
                            <div className={styles.facilityCard}>
                                <p className={styles.facilityText}><strong>Digital Library:</strong> Fifteen computer systems with internet connectivity provide access to DELNET, e-books, e-journals, and other online academic resources.</p>
                            </div>
                            <div className={styles.facilityCard}>
                                <p className={styles.facilityText}><strong>Server Terminal:</strong> One server system supports library automation and digital services.</p>
                            </div>
                            <div className={styles.facilityCard}>
                                <p className={styles.facilityText}><strong>Scanning Facilities:</strong> Barcode scanners are available for library operations.</p>
                            </div>
                            <div className={styles.facilityCard}>
                                <p className={styles.facilityText}><strong>DELNET Resources:</strong> Access to e-books, e-journals, theses, dissertations, and online databases.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Working Hours & Membership Limits Table Section */}
                <section id="working-hours" className={styles.resourcesSection}>
                    <div className={styles.container}>
                        <div className={styles.ajcasContainer} style={{ padding: 0, marginTop: 0 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>
                                
                                {/* Working Hours Card */}
                                <div className={styles.facilityCard} style={{ padding: '30px', height: 'fit-content' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                                        <Clock size={28} color="#2b3990" />
                                        <h2 className={styles.ajcasH2} style={{ margin: 0, borderBottom: 'none' }}>Library Timing</h2>
                                    </div>
                                    <div style={{ fontSize: '1.6rem', color: '#444' }}>
                                        <p><strong>Monday – Friday:</strong> 9:10 AM to 4:30 PM</p>
                                        <p><strong>Saturday:</strong> Library is open (College Working Day Only)</p>
                                        <p><strong>Sundays & Holidays:</strong> Closed</p>
                                        <p style={{ marginTop: '20px', fontSize: '1.4rem', color: '#666', fontStyle: 'italic' }}>
                                            Membership is extended to all students, faculty members, and non-teaching staff of the institution for academic and professional development.
                                        </p>
                                    </div>
                                </div>

                                {/* Membership Limits Table */}
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                                        <BookOpen size={28} color="#2b3990" />
                                        <h2 className={styles.ajcasH2} style={{ margin: 0, borderBottom: 'none' }}>Borrowing Eligibility Limits</h2>
                                    </div>
                                    <div className={styles.tableCard}>
                                        <table className={styles.ajcasTable}>
                                            <thead>
                                                <tr>
                                                    <th>Category</th>
                                                    <th>Book Limit</th>
                                                    <th>Return Period (Days)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr><td>UG Students</td><td>3 Books</td><td>30 Days</td></tr>
                                                <tr><td>PG Students</td><td>5 Books</td><td>30 Days</td></tr>
                                                <tr><td>M.Phil & Ph.D. Scholars</td><td>7 Books</td><td>30 Days</td></tr>
                                                <tr><td>Teaching Staff</td><td>10 Books</td><td>30 Days</td></tr>
                                                <tr><td>Non-Teaching Staff</td><td>3 Books</td><td>30 Days</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Library Usage Guidelines Section */}
                <section className={styles.rulesContainer} style={{ background: '#fafaf9' }}>
                    <h2 className={styles.rulesTitle}>Library Usage Guidelines</h2>
                    <div className={styles.rulesGrid}>
                        {[
                            "Library membership is available to all students, faculty members, research scholars, and staff.",
                            "A valid college identity card is mandatory for library entry and borrowing privileges.",
                            "Users shall maintain silence, discipline, and a study-friendly environment within the library.",
                            "Mobile phones must be kept in silent mode while inside the library.",
                            "Food and beverages are not permitted in the library premises.",
                            "Library resources shall be handled with care. Users are responsible for any loss or damage to borrowed materials.",
                            "Books must be returned or renewed on or before the due date to ensure equitable access.",
                            "Reference Books, journals, newspapers, and other non-circulating resources are for in-library use only."
                        ].map((rule, i) => (
                            <div key={i} className={styles.ruleCard} style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                <ShieldAlert size={20} color="#fb923c" style={{ flexShrink: 0, marginTop: '4px' }} />
                                <p style={{ margin: 0 }}>{rule}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Library Activities Section (Events) */}
                <section className={styles.howItWorksSection} style={{ padding: '80px 0' }}>
                    <div className={styles.tornEdge}></div>
                    <div className={styles.container} style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                        <h2 className={styles.howItWorksTitle} style={{ marginBottom: '50px' }}>Department of Library Activities</h2>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
                            {activities.map((activity, index) => (
                                <div key={index} style={{
                                    background: 'white',
                                    borderRadius: '16px',
                                    padding: '30px',
                                    border: '1px solid #e7e5e4',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '15px' }}>
                                        <h3 style={{ fontSize: '2.2rem', color: '#1c1917', fontWeight: '600', margin: 0 }}>{activity.title}</h3>
                                        <span style={{ fontSize: '1.4rem', background: '#e7e5e4', padding: '4px 12px', borderRadius: '9999px', color: '#44403c', fontWeight: '500' }}>{activity.date}</span>
                                    </div>
                                    <p style={{ fontSize: '1.6rem', color: '#57534e', lineHeight: '1.7', marginBottom: '20px' }}>{activity.desc}</p>
                                    
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                        {activity.images.map((imgSrc, imgIndex) => (
                                            <div key={imgIndex} style={{ borderRadius: '12px', overflow: 'hidden', height: '220px', border: '1px solid #e7e5e4' }}>
                                                <img src={imgSrc} alt="Activity documentation" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Best User Awards Section */}
                <section className={styles.valuesSection}>
                    <div className={styles.container}>
                        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                            <Award size={48} color="#fb923c" style={{ margin: '0 auto 15px' }} />
                            <h2 className={styles.valuesTitle}>Best Library User Awards</h2>
                            <p className={styles.valuesSubtitle}>
                                Recognizing and honoring outstanding dedication to reading and library research during the academic year 2025–2026
                            </p>
                        </div>

                        {/* Students Section */}
                        <h3 className={styles.sectionsTitle} style={{ textAlign: 'center', marginBottom: '30px' }}>Student Recipients</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginBottom: '60px' }}>
                            {students.map((student, i) => (
                                <div key={i} className={styles.valueCard} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '25px', textAlign: 'center', gap: '15px' }}>
                                    <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', border: '3px solid #fb923c', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                                        <img src={student.src} alt={student.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '1.8rem', fontWeight: '600', color: '#1c1917', margin: '0 0 5px' }}>{student.name}</h4>
                                        <span style={{ fontSize: '1.4rem', color: '#78716c' }}>{student.class}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Staff Section */}
                        <h3 className={styles.sectionsTitle} style={{ textAlign: 'center', marginBottom: '30px' }}>Faculty Recipients</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginBottom: '60px' }}>
                            {staff.map((staff, i) => (
                                <div key={i} className={styles.valueCard} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '25px', textAlign: 'center', gap: '15px' }}>
                                    <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', border: '3px solid #2b3990', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                                        <img src={staff.src} alt={staff.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '1.8rem', fontWeight: '600', color: '#1c1917', margin: '0 0 5px' }}>{staff.name}</h4>
                                        <span style={{ fontSize: '1.4rem', color: '#78716c', display: 'block' }}>{staff.role}</span>
                                        <span style={{ fontSize: '1.3rem', color: '#fb923c', fontWeight: '600' }}>Dept of {staff.dept}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Non-Staff Section */}
                        <h3 className={styles.sectionsTitle} style={{ textAlign: 'center', marginBottom: '30px' }}>Non-Teaching Staff Recipient</h3>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            {nonStaff.map((staff, i) => (
                                <div key={i} className={styles.valueCard} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '25px', textAlign: 'center', gap: '15px', maxWidth: '350px', width: '100%' }}>
                                    <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', border: '3px solid #2b3990', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                                        <img src={staff.src} alt={staff.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '1.8rem', fontWeight: '600', color: '#1c1917', margin: '0 0 5px' }}>{staff.name}</h4>
                                        <span style={{ fontSize: '1.4rem', color: '#78716c' }}>{staff.role}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>

                {/* Newspaper Clippings & Photo Gallery */}
                <section className={styles.resourcesSection} style={{ background: '#f5f5f4' }}>
                    <div className={styles.container}>
                        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                            <ImageIcon size={40} color="#2b3990" style={{ margin: '0 auto 15px' }} />
                            <h2 className={styles.resourcesTitle}>Newspaper Clippings & Gallery</h2>
                            <p style={{ fontSize: '1.6rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                                Media publications, event celebrations, and snapshots highlighting college achievements.
                            </p>
                        </div>

                        {/* Newspaper Grid */}
                        <h3 className={styles.sectionsTitle} style={{ marginBottom: '25px' }}>Newspaper Clippings</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px', marginBottom: '60px' }}>
                            {newsClippings.map((img, i) => (
                                <div key={i} style={{ borderRadius: '8px', overflow: 'hidden', height: '180px', border: '1px solid #ddd', background: 'white' }}>
                                    <img src={img} alt="Newspaper clipping" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                </div>
                            ))}
                        </div>

                        {/* Gallery Grid */}
                        <h3 className={styles.sectionsTitle} style={{ marginBottom: '25px' }}>Library Gallery</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
                            {galleryImages.map((img, i) => (
                                <div key={i} style={{ borderRadius: '12px', overflow: 'hidden', height: '200px', border: '1px solid #e7e5e4', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                                    <img src={img} alt="Library activities" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Staff Profiles Section */}
                <section className={styles.resourcesSection} style={{ background: '#ffffff', paddingBottom: '100px' }}>
                    <div className={styles.container}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '35px' }}>
                            <Users size={28} color="#2b3990" />
                            <h2 className={styles.ajcasH2} style={{ margin: 0, borderBottom: 'none' }}>Library Staff Profile</h2>
                        </div>

                        <div className={styles.ajcasContainer} style={{ padding: 0, marginTop: 0 }}>
                            <div className={styles.tableCard}>
                                <table className={styles.ajcasTable}>
                                    <thead>
                                        <tr>
                                            <th>S. No</th>
                                            <th>Staff Photo</th>
                                            <th>Name & Designation</th>
                                            <th>Year of Joining</th>
                                            <th>Email ID</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>
                                                <div style={{ width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', margin: '0 auto', border: '1px solid #ddd' }}>
                                                    <img src="/library_images/image45.jpeg" alt="Dr. P. Krishnakumari" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </div>
                                            </td>
                                            <td className={styles.textLeft}>
                                                <strong>Dr. P. Krishnakumari</strong><br />
                                                <span style={{ fontSize: '1.3rem', color: '#666' }}>MLIS., M.Phil., Ph.D.</span><br />
                                                <span style={{ fontSize: '1.4rem', color: '#fb923c', fontWeight: '500' }}>Librarian & Head</span>
                                            </td>
                                            <td>2024</td>
                                            <td><a href="mailto:krishna.phdlib13@gmail.com">krishna.phdlib13@gmail.com</a></td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>
                                                <div style={{ width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', margin: '0 auto', border: '1px solid #ddd' }}>
                                                    <img src="/library_images/image46.png" alt="Karthi P" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </div>
                                            </td>
                                            <td className={styles.textLeft}>
                                                <strong>Karthi P</strong><br />
                                                <span style={{ fontSize: '1.3rem', color: '#666' }}>B.Com., BLIS.</span><br />
                                                <span style={{ fontSize: '1.4rem', color: '#fb923c', fontWeight: '500' }}>Library Assistant</span>
                                            </td>
                                            <td>2022</td>
                                            <td><a href="mailto:karthideva2311@gmail.com">karthideva2311@gmail.com</a></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </>
    );
};

export default LibraryPortal;
