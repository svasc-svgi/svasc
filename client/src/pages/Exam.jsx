import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, MoreHorizontal, ArrowUpRight, X } from 'lucide-react';
import './Exam.css';
import Hero from '../components/Common/Hero';
import { getExamPageHero, getExamPortalConfig, getExamTimeTables } from '../services/examService';
import examHeroImage from '../assets/exam hero.JPG';
import exam1Image from '../assets/exam1.jpg';
import exam3Image from '../assets/exam3.jpg';
import exam4Image from '../assets/exam4.jpg';
import buLogo from '../assets/bu_logo_icon.png';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const fallbackHero = {
    image: examHeroImage,
    title: "SVASC Examination",
    description: "Stay updated with examination schedules, notifications, and important announcements."
};

const fallbackConfig = {
    image1: exam1Image,
    image2: exam3Image,
    image3: exam4Image,
    floatingTitle: "Semester Exams",
    floatingDateRange: "Jan 20 - Feb 05",
    floatingSubjects: "6 Papers",
    floatingStatus: "Scheduled",
    schedules: [
        { examType: "Semester Exam", department: "Computer Science", startDate: "2026-11-20", endDate: "2026-12-05", details: "Morning Sessions (10:00 AM - 1:00 PM)" },
        { examType: "Continuous Internal Assessment", department: "Commerce", startDate: "2026-10-15", endDate: "2026-10-22", details: "All major and allied subjects." },
        { examType: "Model Exam", department: "Information Technology", startDate: "2026-10-01", endDate: "2026-10-08", details: "Syllabus coverage: Units 1 to 5." }
    ]
};

const fallbackBuExams = [
    { id: 1, icon: '📄', title: 'Model Examination – October 2025', file: 'files/model_exam_october_2025.pdf' },
    { id: 2, icon: '📄', title: 'Seating Arrangement – 28-10-2025', file: 'files/seating_28_10_2025.pdf' },
    { id: 3, icon: '📄', title: 'Seating Arrangement – 29-10-2025', file: 'files/seating_29_10_2025.pdf' }
];

const fallbackCiaExams = [
    { id: 1, icon: '📄', title: 'CIA Test – I (September 2025)', file: 'files/cia_test1_sep_2025.pdf' },
    { id: 2, icon: '📄', title: 'PG CIA Schedule – October 2025', file: 'files/pg_cia_oct_2025.pdf' }
];

const SVASCExamination = () => {
    const [activeSection, setActiveSection] = useState('bu');
    const [typedText, setTypedText] = useState('');
    const [heroData, setHeroData] = useState(fallbackHero);
    const [portalConfig, setPortalConfig] = useState(fallbackConfig);
    const [buExams, setBuExams] = useState([]);
    const [ciaExams, setCiaExams] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExamPageData = async () => {
            try {
                // 1. Fetch Page Hero
                try {
                    const heroRes = await getExamPageHero();
                    const data = heroRes?.data ?? heroRes;
                    if (data && data.title) {
                        const cleanImg = (data.image || '').replace(/^\/+/, '');
                        setHeroData({
                            title: data.title || fallbackHero.title,
                            description: data.description || fallbackHero.description,
                            image: data.image?.startsWith('http') ? data.image : `${BASE_URL}/${cleanImg}`
                        });
                    }
                } catch (e) {
                    console.log("Using fallback page hero for exam page");
                }

                // 2. Fetch Portal Config
                try {
                    const configRes = await getExamPortalConfig();
                    const data = configRes?.data ?? configRes;
                    if (data) {
                        const resolveImg = (img, fallback) => {
                            if (!img) return fallback;
                            const clean = img.replace(/^\/+/, '');
                            return img.startsWith('http') ? img : `${BASE_URL}/${clean}`;
                        };
                        setPortalConfig({
                            image1: resolveImg(data.image1, fallbackConfig.image1),
                            image2: resolveImg(data.image2, fallbackConfig.image2),
                            image3: resolveImg(data.image3, fallbackConfig.image3),
                            floatingTitle: data.floatingTitle || fallbackConfig.floatingTitle,
                            floatingDateRange: data.floatingDateRange || fallbackConfig.floatingDateRange,
                            floatingSubjects: data.floatingSubjects || fallbackConfig.floatingSubjects,
                            floatingStatus: data.floatingStatus || fallbackConfig.floatingStatus,
                            schedules: data.schedules && data.schedules.length > 0 ? data.schedules : fallbackConfig.schedules
                        });
                    }
                } catch (e) {
                    setPortalConfig(fallbackConfig);
                }

                // 3. Fetch Time Tables
                try {
                    const timetableRes = await getExamTimeTables();
                    const timetables = timetableRes?.data ?? (Array.isArray(timetableRes) ? timetableRes : []);
                    if (timetables.length > 0) {
                        const allExams = timetables.map(exam => {
                            const cleanFile = (exam.file || '').replace(/^\/+/, '');
                            return {
                                id: exam._id,
                                icon: '📄',
                                title: exam.title,
                                file: exam.file?.startsWith('http') ? exam.file : `${BASE_URL}/${cleanFile}`,
                                category: exam.examType
                            };
                        });
                        setBuExams(allExams.filter(e => e.category === 'Bharathiyar University'));
                        setCiaExams(allExams.filter(e => e.category === 'Continuous Internal Assessment'));
                    } else {
                        setBuExams(fallbackBuExams);
                        setCiaExams(fallbackCiaExams);
                    }
                } catch (e) {
                    setBuExams(fallbackBuExams);
                    setCiaExams(fallbackCiaExams);
                }

            } catch (err) {
                console.error("Error fetching exam page data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchExamPageData();
    }, []);

    // Typing animation effect
    useEffect(() => {
        const text = 'SVASC Examination';
        let index = 0;
        const speed = 120;

        const typeEffect = () => {
            if (index < text.length) {
                setTypedText(text.substring(0, index + 1));
                index++;
                setTimeout(typeEffect, speed);
            }
        };

        typeEffect();
    }, []);

    // Lucide icons initialization
    useEffect(() => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }, [loading]);

    const handleCardClick = (filePath) => {
        window.open(filePath, '_blank');
    };

    const handleSectionChange = (sectionId) => {
        setActiveSection(sectionId);
    };

    if (loading) {
        return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', color: '#111' }}>Loading Exam Portal...</div>;
    }

    return (
        <div className="svasc-root">
            {/* Jumbotron Section */}
            <Hero
                title={heroData.title}
                description={heroData.description}
                image={heroData.image}
            />

            {/* Hero Section */}
            <section className="svasc-hero-section">
                <div className="svasc-hero-container">
                    {/* Left Content */}
                    <div className="svasc-hero-left">
                        {/* Pill Badge */}
                        <div className="svasc-pill-badge">
                            <span className="svasc-badge-dot"></span>
                            Academic Year 2024-25
                        </div>

                        {/* Headline */}
                        <h1 className="svasc-hero-title ">
                            SVASC College <br />
                            <span className="svasc-hero-subtitle">Examination Portal.</span>
                        </h1>

                        {/* Description */}
                        <p className="svasc-hero-description">
                            Access your examination schedules, results, and academic resources all in one place.
                            Streamlined examination management for students and faculty.
                        </p>
                    </div>

                    {/* Right Visuals Grid */}
                    <div className="svasc-hero-right">
                        <div className="svasc-image-grid">
                            {/* Tall Image Left */}
                            <div className="svasc-image-container svasc-image-tall">
                                <img
                                    src={portalConfig.image1}
                                    alt="Students in Classroom"
                                    className="svasc-image"
                                />
                                <div className="svasc-image-overlay"></div>
                                <div className="svasc-image-label">
                                    <span className="svasc-image-label-tag">Academic</span>
                                    <p className="svasc-image-label-text">Examination Hall</p>
                                </div>
                            </div>

                            {/* Top Right Image */}
                            <div className="svasc-image-container">
                                <div className="svasc-image-badge">
                                    <div className="svasc-image-badge-dot"></div>
                                    <span>Active</span>
                                </div>
                                <img
                                    src={portalConfig.image2}
                                    alt="Study Materials"
                                    className="svasc-image"
                                />
                            </div>

                            {/* Bottom Right Image */}
                            <div className="svasc-image-container">
                                <img
                                    src={portalConfig.image3}
                                    alt="Library"
                                    className="svasc-image"
                                />
                            </div>
                        </div>

                        {/* Floating Exam Info Card */}
                        <div className="svasc-floating-card" onClick={() => setIsModalOpen(true)} style={{ cursor: 'pointer' }}>
                            <div className="svasc-floating-card-header">
                                <span className="svasc-floating-card-label">Exam Schedule</span>
                                <MoreHorizontal size={16} />
                            </div>

                            <div className="svasc-floating-card-content">
                                <div className="svasc-floating-card-item">
                                    <div className="svasc-floating-card-icon">
                                        <Calendar size={20} color="white" />
                                    </div>
                                    <div>
                                        <h4 className="svasc-floating-card-title">{portalConfig.floatingTitle}</h4>
                                        <span className="svasc-floating-card-date">{portalConfig.floatingDateRange}</span>
                                    </div>
                                </div>

                                <div className="svasc-floating-card-box ">
                                    <span className="svasc-floating-card-label-text">Total Subjects</span>
                                    <span className="svasc-floating-card-value">{portalConfig.floatingSubjects}</span>
                                </div>

                                <div className="svasc-floating-card-status">
                                    <CheckCircle2 size={14} />
                                    <span>{portalConfig.floatingStatus}</span>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Circle */}
                        <div className="svasc-decorative-circle">
                            <svg viewBox="0 0 100 100" className="svasc-circle-svg">
                                <path
                                    id="circlePath"
                                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                                    fill="transparent"
                                ></path>
                                <text>
                                    <textPath href="#circlePath" className="svasc-circle-text">
                                        • Excellence • Education
                                    </textPath>
                                </text>
                            </svg>
                            <div className="svasc-circle-center">
                                <ArrowUpRight size={20} color="white" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Header Section */}
            <div className="svasc-header">
                <div className="svasc-header-container">
                    <img
                        src="/SVCAS-Logo.png"
                        alt="SVASC Logo"
                        className="svasc-header-logo"
                    />

                    <div className="svasc-header-content">
                        <h1 className="svasc-header-title">SVASC Examination</h1>
                        <h2 className="svasc-header-subtitle">Bharathiyar University – Coimbatore</h2>
                        <a href="#" className="svasc-header-link">
                            https://svasc.ac.in/examinations
                        </a>
                        <p className="svasc-header-description">
                            Official examination portal for Bharathiyar University and Autonomous examinations
                            including Continuous Internal Assessment, model examinations, schedules and seating arrangements.
                        </p>
                    </div>

                    <img
                        src={buLogo}
                        alt="BU Logo"
                        className="svasc-header-logo"
                    />
                </div>

                {/* Button Bar */}
                <div className="svasc-buttons-container">
                    <button
                        className={`svasc-button ${activeSection === 'bu' ? 'svasc-button-active' : ''}`}
                        onClick={() => handleSectionChange('bu')}
                    >
                        Bharathiyar University
                    </button>
                    <button
                        className={`svasc-button ${activeSection === 'cia' ? 'svasc-button-active' : ''}`}
                        onClick={() => handleSectionChange('cia')}
                    >
                        Continuous Internal Assessment
                    </button>
                </div>
            </div>

            {/* Time Table Heading */}
            <h1 className="svasc-time-table-heading">Time Table</h1>

            {/* Exam Sections */}
            <div className="svasc-sections-wrapper">
                {/* Bharathiyar University Section */}
                <div
                    className={`svasc-section ${activeSection === 'bu' ? 'svasc-section-active' : ''}`}
                    id="bu"
                >
                    {buExams.map((exam) => (
                        <div
                            key={exam.id}
                            className="svasc-card"
                            onClick={() => handleCardClick(exam.file)}
                        >
                            <div className="svasc-card-icon">{exam.icon}</div>
                            <div className="svasc-card-title">{exam.title}</div>
                        </div>
                    ))}
                    {buExams.length === 0 && <p className="svasc-no-data">No schedules uploaded</p>}
                </div>

                {/* CIA Section */}
                <div
                    className={`svasc-section ${activeSection === 'cia' ? 'svasc-section-active' : ''}`}
                    id="cia"
                >
                    {ciaExams.map((exam) => (
                        <div
                            key={exam.id}
                            className="svasc-card"
                            onClick={() => handleCardClick(exam.file)}
                        >
                            <div className="svasc-card-icon">{exam.icon}</div>
                            <div className="svasc-card-title">{exam.title}</div>
                        </div>
                    ))}
                    {ciaExams.length === 0 && <p className="svasc-no-data">No schedules uploaded</p>}
                </div>
            </div>

            {/* DETAILED SCHEDULES MODAL POPUP */}
            {isModalOpen && (
                <div className="schedule-modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="schedule-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="schedule-modal-header">
                            <h2>Department Exam Schedules</h2>
                            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        <div className="schedule-modal-body">
                            {portalConfig.schedules.length === 0 ? (
                                <p className="no-schedules-p">No detailed schedules uploaded yet.</p>
                            ) : (
                                <div className="schedules-grid-list">
                                    {portalConfig.schedules.map((sch, idx) => (
                                        <div className="schedule-item-card" key={idx}>
                                            <div className="sch-type-badge">{sch.examType}</div>
                                            <h3>{sch.department}</h3>
                                            <div className="sch-dates">
                                                <span><strong>Start:</strong> {new Date(sch.startDate).toLocaleDateString()}</span>
                                                <span><strong>End:</strong> {new Date(sch.endDate).toLocaleDateString()}</span>
                                            </div>
                                            {sch.details && <p className="sch-details">{sch.details}</p>}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <style>{`
                        .schedule-modal-overlay {
                            position: fixed;
                            top: 0;
                            left: 0;
                            width: 100vw;
                            height: 100vh;
                            background: rgba(0, 0, 0, 0.7);
                            z-index: 99999;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            backdrop-filter: blur(5px);
                        }
                        .schedule-modal-content {
                            background: #1a1a1a;
                            color: #fff;
                            width: 90%;
                            max-width: 700px;
                            border-radius: 12px;
                            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                            overflow: hidden;
                            display: flex;
                            flex-direction: column;
                            max-height: 85vh;
                            border: 1px solid #ffd500;
                        }
                        .schedule-modal-header {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding: 20px;
                            border-bottom: 1px solid #333;
                        }
                        .schedule-modal-header h2 {
                            font-size: 1.8rem;
                            color: #ffd500;
                            margin: 0;
                        }
                        .close-btn {
                            background: transparent;
                            border: none;
                            color: #888;
                            cursor: pointer;
                            transition: color 0.3s;
                        }
                        .close-btn:hover {
                            color: #fff;
                        }
                        .schedule-modal-body {
                            padding: 20px;
                            overflow-y: auto;
                            flex: 1;
                        }
                        .no-schedules-p {
                            color: #888;
                            text-align: center;
                            padding: 40px;
                        }
                        .schedules-grid-list {
                            display: flex;
                            flex-direction: column;
                            gap: 15px;
                        }
                        .schedule-item-card {
                            background: #252525;
                            padding: 15px;
                            border-radius: 8px;
                            border-left: 4px solid #ffd500;
                        }
                        .sch-type-badge {
                            display: inline-block;
                            background: #ffd500;
                            color: #000;
                            font-weight: bold;
                            font-size: 0.8rem;
                            padding: 3px 8px;
                            border-radius: 4px;
                            text-transform: uppercase;
                            margin-bottom: 8px;
                        }
                        .schedule-item-card h3 {
                            margin: 0 0 10px 0;
                            font-size: 1.4rem;
                            color: #fff;
                        }
                        .sch-dates {
                            display: flex;
                            gap: 20px;
                            font-size: 0.95rem;
                            color: #ccc;
                            margin-bottom: 10px;
                        }
                        .sch-details {
                            margin: 10px 0 0 0;
                            font-size: 0.95rem;
                            color: #aaa;
                            line-height: 1.4;
                            border-top: 1px solid #333;
                            padding-top: 8px;
                        }
                        .svasc-no-data {
                            grid-column: 1 / -1;
                            text-align: center;
                            color: #888;
                            padding: 30px;
                            font-size: 1.1rem;
                        }
                    `}</style>
                </div>
            )}
        </div>
    );
};

export default SVASCExamination;