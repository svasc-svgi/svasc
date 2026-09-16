import React, { useState, useEffect, useRef } from 'react';
import styles from './Programms.module.css';
import { ArrowRight, ChevronRight, GraduationCap, BookOpen, BadgeCheck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Hero from '../components/Common/Hero';
import ugpgHeroImg from '../assets/ugpghero.jpg';
import ugImg from '../assets/ug.jpg';
import ugpgImg from '../assets/ugpg.jpg';
import cdfImg from '../assets/cdf.jpg';
import lab1Img from '../assets/lab1.jpg';
import lab2Img from '../assets/lab2.jpg';
import lab4Img from '../assets/lab4.jpg';
import sportsImg from '../assets/sports1.jpg';
import teachingImg from '../assets/teaching.jpg';

const slugify = (text) => {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w-]+/g, '')       // Remove all non-word chars
        .replace(/--+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')               // Trim - from start of text
        .replace(/-+$/, '');              // Trim - from end of text
};

const Schools = () => {
    const schoolSectionRef = useRef(null);
    const location = useLocation();

    const [activeTab, setActiveTab] = useState(() => {
        return sessionStorage.getItem('activeTab') || "UG Programmes";
    });
    const [activeSchoolIndex, setActiveSchoolIndex] = useState(() => {
        const savedIndex = sessionStorage.getItem('activeSchoolIndex');
        return savedIndex !== null ? parseInt(savedIndex) : 0;
    });

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const typeParam = searchParams.get('type') || searchParams.get('tab');

        if (typeParam) {
            const lower = typeParam.toLowerCase();
            let matchedTab = null;
            if (lower.includes('pg') || lower.includes('post')) {
                matchedTab = "PG Programmes";
            } else if (lower.includes('phd') || lower.includes('ph.d')) {
                matchedTab = "Ph.D";
            } else if (lower.includes('ug') || lower.includes('under')) {
                matchedTab = "UG Programmes";
            }

            if (matchedTab) {
                setActiveTab(matchedTab);
                setActiveSchoolIndex(0);
                if (schoolSectionRef.current) {
                    setTimeout(() => {
                        schoolSectionRef.current.scrollIntoView({ behavior: 'smooth' });
                    }, 150);
                }
            }
        } else {
            // Scroll to the school section if we are returning from a detail page
            const savedTab = sessionStorage.getItem('activeTab');
            if (savedTab && schoolSectionRef.current) {
                setTimeout(() => {
                    schoolSectionRef.current.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location.search]);

    useEffect(() => {
        sessionStorage.setItem('activeTab', activeTab);
    }, [activeTab]);

    useEffect(() => {
        sessionStorage.setItem('activeSchoolIndex', activeSchoolIndex.toString());
    }, [activeSchoolIndex]);

    // Mock Data Structure
    const programsData = {
        "UG Programmes": [
            {
                name: "School of Computer Science & IT",
                acronym: "SCSIT",
                programs: [
                    { title: "B.Sc. Computer Science", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
                    { title: "B.Sc.Computer AI & DS", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
                    { title: "Bachelor of Computer Applications (BCA)", image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },

                    { title: "B.Sc.Information Technology", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },

                    { title: "B.Sc.Cyber Security", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" }
                ]
            },
            {
                name: "School of Commerce",
                acronym: "SOC",
                programs: [
                    { title: "B. Com – Bachelor of Commerce", image: "https://images.unsplash.com/photo-1454165833762-02ad50c748e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },

                    { title: "B. Com(B&I) – Bachelor of Commerce with Banking & Insurance", image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },

                    { title: "B.Com (IT) – Bachelor of Information Technology", image: "https://images.unsplash.com/photo-1554224155-1696413565d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },

                    { title: "B.Com(CA) - Computer Applications", image: "https://images.unsplash.com/photo-1554224155-1696413565d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
                    { title: "B.Com (PA) - Professional Accounting", image: "https://images.unsplash.com/photo-1554224155-1696413565d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
                ]
            },
            {
                name: "School of Management",
                acronym: "SOM",
                programs: [
                    { title: "Management", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
                ]
            },
            {
                name: "School of Sciences",
                acronym: "SOHS",
                programs: [
                    { title: "B.Sc. Physics", image: lab1Img },
                    { title: "B.Sc. Chemistry", image: lab2Img },
                    { title: "B.Sc. Mathematics", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
                    { title: "B.Sc. Microbiology", image: lab4Img },

                ]
            },
            {
                name: "School of Arts & Languages",
                acronym: "SOAL",
                programs: [
                    { title: "B.A. Tamil", image: teachingImg },
                    { title: "B.A. English", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" }
                ]
            },
            {
                name: "School of Design & Fashion",
                acronym: "SODF",
                programs: [
                    { title: "B.Sc Costume Design & Fashion", image: cdfImg }
                ]
            },
            {
                name: "School of Physical Education",
                acronym: "SOPE",
                programs: [
                    { title: "Department of Physical Education", image: sportsImg }
                ]
            }
        ],
        "PG Programmes": [
            {
                name: "School of Computer Science",
                acronym: "SCS",
                programs: [
                    { title: "M.Sc. Computer Science", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
                    { title: "M.Sc Microbiology", image: lab4Img },

                ]
            },
            {
                name: "School of Arts & Languages",
                acronym: "SCS",
                programs: [
                    { title: "M.A English", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
                    { title: "M.A Tamil", image: teachingImg },

                ]
            },
            {
                name: "School of Commerce & Management",
                acronym: "SCM",
                programs: [
                    { title: "M.Com", image: "https://images.unsplash.com/photo-1454165833762-02ad50c748e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
                ]
            }
        ],
        "Ph.D": [
            {
                name: "Research & Development",
                acronym: "R&D",
                programs: [
                    { title: "Ph.D. Tamil", image: teachingImg },
                    { title: "Ph.D. English", image: "https://images.unsplash.com/photo-1454165833762-02ad50c748e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },

                ]
            }
        ]
    };

    const currentSchools = programsData[activeTab] || [];
    const activeSchoolData = currentSchools[activeSchoolIndex] || {};

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setActiveSchoolIndex(0); // Reset to first school when tab changes
    };

    return (
        <div className={styles.wrapper}>

            {/* HERO SECTION */}
            <Hero
                title="ACADEMIC PROGRAMS"
                description="Discover world-class education and gain the skills to shape the future."
                image={ugpgHeroImg}
            />

            {/* NEW PROGRAM SECTION */}
            <section className={styles.programSection}>
                <div className={styles.container}>
                    <div className={styles.gridContainer}>
                        {/* Images */}
                        <div className={styles.imagesOrder}>
                            <div className={styles.imageGrid}>
                                <div className={`${styles.imageWrapper} ${styles.staggerUp}`}>
                                    <img
                                        src={ugImg}
                                        alt="SVASC Campus"
                                        className={styles.sectionImage}
                                    />
                                </div>
                                <div className={`${styles.imageWrapper} ${styles.staggerDown}`}>
                                    <img
                                        src={ugpgImg}
                                        alt="SVASC Students"
                                        className={styles.sectionImage}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Content */}
                        <div className={styles.contentOrder}>
                            <h2 className={styles.sectionTitle}>
                                SVASC Academic Programs & Learning Opportunities
                            </h2>
                            <p className={styles.sectionDescription}>
                                SVASC offers a wide range of career-focused academic programs designed to prepare students for higher education, research, and professional success through quality teaching and modern infrastructure.
                            </p>
                            <p className={styles.sectionSubDescription}>
                                Undergraduate, Postgraduate, and Doctoral programs are delivered by experienced faculty with a strong emphasis on skill development, research, and industry relevance.
                            </p>
                            {/* Highlights */}
                            <div className={styles.highlights}>
                                <div className={styles.iconGroup}>
                                    <div className={styles.iconCircle}>
                                        <GraduationCap size={20} className="text-slate-500" color="#64748b" />
                                    </div>
                                    <div className={styles.iconCircle}>
                                        <BookOpen size={20} className="text-slate-500" color="#64748b" />
                                    </div>
                                    <div className={styles.iconCircle}>
                                        <BadgeCheck size={20} className="text-slate-500" color="#64748b" />
                                    </div>
                                </div>
                                <span className={styles.highlightText}>
                                    UG • PG • PhD Programs with Academic Excellence
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <div className={styles.headerSection} ref={schoolSectionRef}>
                {/* Tabs */}
                <div className={styles.tabContainer}>
                    {Object.keys(programsData).map((tab) => (
                        <button
                            key={tab}
                            className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : ''}`}
                            onClick={() => handleTabClick(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.splitLayout}>
                {/* Left Side: School List */}
                <div className={styles.listSide}>
                    <ul className={styles.schoolList}>
                        {currentSchools.map((school, index) => (
                            <li
                                key={index}
                                className={`${styles.listItem} ${index === activeSchoolIndex ? styles.activeItem : ''}`}
                                onClick={() => setActiveSchoolIndex(index)}
                            >
                                <span className={styles.schoolName}>{school.name}</span>
                                {index === activeSchoolIndex && <ArrowRight className={styles.activeArrow} size={18} />}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right Side: Program Cards Grid */}
                <div className={styles.contentSide}>
                    <div className={styles.programsGrid}>
                        {activeSchoolData.programs && activeSchoolData.programs.map((program, idx) => (
                            <Link to={`/program/${slugify(program.title)}`} key={idx} className={styles.programCard}>
                                <img src={program.image} alt={program.title} className={styles.cardImage} />
                                <div className={styles.cardOverlay}>
                                    <h3 className={styles.cardTitle}>{program.title}</h3>
                                    <div className={styles.cardFooter}>
                                        <div className={styles.arrowCircle}>
                                            <ArrowRight size={20} color="white" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                        {/* Fallback if no programs */}
                        {(!activeSchoolData.programs || activeSchoolData.programs.length === 0) && (
                            <div className={styles.noData}>No programs listed for this school.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Schools;