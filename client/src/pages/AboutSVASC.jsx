import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowRightCircle } from 'lucide-react';
import { getCertifications, getGroupedTeacherAwards } from '../services/aboutService';
import styles from './AboutSVASC.module.css';
import Hero from '../components/Common/Hero';
import aboutHeroImg from '../assets/Abouthero.jpg';
import aboutUsImg from '../assets/aboutus.jpg';
import about2Img from '../assets/about2.png';
import home5 from '../assets/home5.jpg';
import dji0587 from '../assets/DJI_0587.JPG';
import about3 from '../assets/about3.jpg';
import about4 from '../assets/about4.jpg';
import about5 from '../assets/about5.jpg';
import svgiLogo from '../assets/svgi_logo.jpeg';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

// ================= HERO SECTION COMPONENT =================
const HeroSection = () => (

    <>
        <Hero
            title="About SVASC"
            description="Skill-based education and holistic student development through high-quality programs supported by experienced faculty, modern infrastructure, industry-aligned curriculum, and a strong focus on practical learning, research, innovation, and ethical values."
            image={aboutHeroImg}
        />
        <section className={`${styles.heroContainer} max-w-[170rem] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 relative`}>

            <div className={styles.heroBlob}></div>

            {/* Left Content */}
            <div className={styles.heroContent}>
                <h3 className={styles.heroSubtitle}>About SVASC</h3>

                <h1 className={styles.heroTitle}>
                    Welcome to  &nbsp;
                    <span className={styles.heroTitleSpan}>
                        SVASC
                        <svg className={styles.heroTitleUnderline} viewBox="0 0 100 10" preserveAspectRatio="none" height="12">
                            <path d="M0 5 Q 50 10 100 5" stroke="#181E4B" strokeWidth="4" fill="none"></path>
                        </svg>
                    </span>
                </h1>

                <p className={styles.heroDescription}>
                    Skill-based education and holistic student development through high-quality programs supported by experienced faculty, modern infrastructure, industry-aligned curriculum, and a strong focus on practical learning, research, innovation, and ethical values. We empower students with career-oriented training, placements, certifications, internships, workshops, and co-curricular activities to meet global challenges with confidence and leadership.
                </p>

                <button className={styles.heroButton}>Find out more</button>
            </div>

            {/* Right Image */}
            <div className={styles.heroImageWrapper}>
                <img
                    src={aboutUsImg}
                    alt="Welcome to SVASC"
                />
                <div className={styles.heroImageGradient}></div>
            </div>
        </section>
    </>
);

// ================= EMPOWERING LEADERS SECTION COMPONENT =================
const EmpoweringLeadersSection = () => (
    <header className={styles.empoweringHeader}>
        {/* Background Text */}
        <div className={styles.empoweringBackgroundText}>
            <h1>SVASC</h1>
        </div>

        {/* Main Content Grid */}
        <div className={`${styles.empoweringMainContent} max-w-[120rem] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center lg:items-end`}>
            {/* Left Column */}
            <div className="lg:col-span-5 mb-10">
                <h2 className={styles.empoweringTitle}>
                    Empowering <br /> Future Leaders <br />
                    <span className={styles.empoweringSubtitle}>Through Education</span>
                </h2>
            </div>

            {/* Center/Right Column */}
            <div className="lg:col-span-4 lg:mb-[-20rem] relative w-full flex justify-center">
                <div className={styles.empoweringImageContainer}>
                    <div className={styles.empoweringImageWrapper}>
                        <img
                            src={about2Img}
                            alt="SVASC Campus"
                        />
                        <div className={styles.empoweringImageOverlay}></div>
                    </div>
                </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-3 mb-12 lg:mb-24 flex flex-col items-center lg:items-start text-center lg:text-left">
                <p className={styles.empoweringDescription}>
                    SVASC is dedicated to academic excellence, innovation, and holistic student development, empowering students through quality education, practical learning, and industry-oriented training.
                </p>
                <button className={styles.empoweringCtaButton}>
                    <span className={styles.empoweringCtaButtonText}>Explore Programs</span>
                    <span className={styles.empoweringCtaButtonIcon}>
                        <ArrowRight className="w-6 h-6" />
                    </span>
                </button>
            </div>
        </div>
    </header>
);

// ================= ABOUT SECTION COMPONENT =================
const AboutSection = () => (
    <section className={`${styles.aboutSection} py-20 lg:py-[15rem] max-w-[100rem] px-6 lg:px-10`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-3 items-start ">
            <div>
                <h2 className={`${styles.aboutTitle} lg:text-[7.5rem] `}>
                    Shaping Bright <br />
                    <span className="text-gray-500">Futures & Careers</span> <br />
                    Through Knowledge <br />
                    <span className={styles.aboutGradientText}>With Excellence</span>
                </h2>
            </div>

            <div className="space-y-10 lg:space-y-16 px-0 lg:px-10">
                <p className={styles.empoweringDescription}>
                    SVASC provides a dynamic academic environment with experienced faculty, modern infrastructure, research-driven programs, and career-focused learning to prepare students for global opportunities.
                </p>

                <div className="grid grid-cols-2 gap-12">
                    <div className="space-y-4">
                        <div className="h-0.5 w-full bg-gray-200 mb-8"></div>
                        <h3 className="text-gray-900 font-bold text-4xl">Academics</h3>
                        <p className="text-gray-500 text-4xl font-medium">UG & PG Programs</p>
                    </div>
                    <div className="space-y-4">
                        <div className="h-0.5 w-full bg-gray-200 mb-8"></div>
                        <h3 className="text-gray-900 font-bold text-4xl">Placements</h3>
                        <p className="text-gray-500 text-4xl font-medium">Industry Partnerships</p>
                    </div>
                </div>

                <div className="flex justify-center lg:justify-start lg:relative lg:left-0 lg:top-0 mt-8 lg:mt-10">
                    <button className={`${styles.heroButton} flex gap-2 items-center`}>
                        <ArrowRightCircle className="w-6 h-6 lg:w-8 lg:h-8" />
                        View Departments
                    </button>
                </div>
            </div>
        </div>
    </section>
);

// ================= CAMPUS LIFE SECTION COMPONENT =================
const CampusLifeSection = () => {
    const images = [
        home5,
        about3,
        dji0587,
        about4,
        about5
    ];

    return (
        <section className={styles.campusLifeSection}>
            <div className={styles.campusLifeBackdrop}></div>

            <div className="max-w-[130rem] mx-auto px-6 lg:px-10 text-center mb-12 lg:mb-24 relative z-10">
                <h2 className={styles.campusLifeTitle}>Discover SVASC <br /> Campus Life</h2>
                <p className={styles.campusLifeDescription}>Explore our programs, infrastructure, and student activities that nurture growth and talent.</p>

                <button className={styles.campusLifeButton}>
                    <span className={styles.campusLifeButtonIcon}>
                        <ArrowRight className="w-4 h-4" />
                    </span>
                    <span>Apply Now</span>
                </button>
            </div>

            {/* Fan Effect Images */}
            <div className={styles.campusLifeImagesContainer}>
                {images.map((id, i) => {
                    const rotations = [-12, -6, 0, 6, 12];
                    const translates = [48, 16, 0, 16, 48];
                    return (
                        <div key={i}
                            className={styles.campusLifeImage}
                            style={{ transform: `rotate(${rotations[i]}deg) translateY(${translates[i]}px)`, zIndex: i === 2 ? 30 : (i === 1 || i === 3 ? 20 : 10) }}
                        >
                            <img src={id} alt="Campus" />
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

// ================= TESTIMONIALS SECTION COMPONENT =================
const TestimonialsSection = () => {
    const testimonials = [
        {
            name: "Mike Taylor",
            location: "Lahore, Pakistan",
            text: "On the Windows talking painted pasture yet its express parties use.",
            image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=200&q=80"
        },
        {
            name: "Chris Thomas",
            location: "CEO of Red Button",
            text: "Fantastic experience and great customer support.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
        },
        {
            name: "Sarah Jenkins",
            location: "Travel Blogger",
            text: "Jadoo made my Europe trip unforgettable.",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
        }
    ];

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonials.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    const cur = testimonials[current];
    const next = testimonials[(current + 1) % testimonials.length];

    return (
        <section className={`${styles.testimonialsSection} max-w-[120rem] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-1 px-6 lg:px-10`}>
            {/* Left */}
            <div className={` w-full lg:w-1/2 ${styles.leftcontent}`}>
                <h3 className={styles.testimonialsLabel}>Testimonials</h3>
                <h2 className={styles.testimonialsTitle}>What People Say <br /> About Us.</h2>

                <div className={styles.testimonialsDots}>
                    {testimonials.map((_, i) => (
                        <div
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`${styles.dotButton} ${i === current ? styles.dotButtonActive : styles.dotButtonInactive}`}
                        ></div>
                    ))}
                </div>
            </div>

            {/* Right Cards */}
            <div className="w-full lg:w-1/2 relative min-h-[20rem]">
                {/* Back Card */}
                {/* <div className={`${styles.testimonialCard} ${styles.testimonialBackCard}`}>
                    <p className={styles.testimonialText}>"{next.text}"</p>
                    <div className={styles.testimonialName}>{next.name}</div>
                    <div className={styles.testimonialRole}>{next.location}</div>
                </div> */}

                {/* Front Card */}
                <div className={`${styles.testimonialCard} ${styles.testimonialFrontCard}`}>
                    <div className={styles.testimonialImage}>
                        <img src={cur.image} alt={cur.name} />
                    </div>
                    <p className={styles.testimonialText}>"{cur.text}"</p>
                    <h5 className={styles.testimonialName}>{cur.name}</h5>
                    <p className={styles.testimonialRole}>{cur.location}</p>
                </div>
            </div>
        </section>
    );
};

// ================= AWARDS SECTION COMPONENT =================
const AwardsSection = () => {
    const [certifications, setCertifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCertifications = async () => {
            try {
                const response = await getCertifications();
                const certList = response?.data ?? (Array.isArray(response) ? response : []);
                setCertifications(certList);
            } catch (error) {
                console.error('Error fetching certifications:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCertifications();
    }, []);

    const displayData = certifications.length > 0 ? certifications : [1, 2, 3, 4, 5, 6, 7];

    return (
        <section className={styles.awardsSection}>
            <div className={styles.awardsLogoContainer}>
                <div className={styles.awardsLogo}>
                    <span>S</span>
                    <span>V</span>
                    <div className={styles.awardsLogoTriangleWrapper}>
                        <div className={styles.awardsLogoTriangleInner} style={{ backgroundImage: `url(${svgiLogo})` }}></div>
                    </div>
                    <span>S</span>
                    <span>C</span>
                </div>
            </div>

            <h2 className={styles.awardsTitle}>AWARDS AND CERTIFICATION</h2>
            <div className={styles.awardsScrollContainer}>
                <div className={styles.awardsCardsScroll}>
                    {displayData.map((item, i) => (
                        <div key={i} className={styles.awardCard}>
                            <img 
                                src={typeof item === 'number' ? `https://dummyimage.com/800x600/ffffff/000000&text=Certificate+0${item}` : `${BASE_URL}/${item.image.replace(/^\/+/, '')}`} 
                                alt={`Certificate ${i + 1}`} 
                            />
                        </div>
                    ))}
                    {/* Duplicate for infinite scroll effect */}
                    {displayData.map((item, i) => (
                        <div key={`dup-${i}`} className={styles.awardCard}>
                            <img 
                                src={typeof item === 'number' ? `https://dummyimage.com/800x600/ffffff/000000&text=Certificate+0${item}` : `${BASE_URL}/${item.image.replace(/^\/+/, '')}`} 
                                alt={`Certificate ${i + 1}`} 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ================= TEACHER AWARDS COMPONENT =================
const TeacherAwardsSection = () => {
    const defaultAwardData = {
        '2010': [
            ["Sevai Kalappani Selvar Virudhu", "Dr. M. Jasmine Priya"],
            ["Chithirai kavi", "Dr. M. Jasmine Priya"],
            ["Dr. Sarvepalli Radhakrishnan Education Excellence", "Dr. V. Princy Metildah"],
            ["Nari Ratna Award", "Mrs. A. Devika"]
        ],
        '2017': [["Best Librarian Award", "Dr. M. Sethuramasamy"]],
        '2018': [["Best Educationist Award", "Dr. Ajeet Kumar Lal Mohan"]],
        '2019': [
            ["Kalvi Maamani Award", "Dr. Ajeet Kumar Lal Mohan"],
            ["Kongu Thalaimagan Award", "Dr. Ajeet Kumar Lal Mohan"]
        ],
        '2020': [["Best NSS Programme Officer Award", "Dr. M. Jasmine Priya"]],
        '2021': [["Azadi Ka Amrit Award", "Dr. M. Jasmine Priya"]]
    };

    const [awardData, setAwardData] = useState({});
    const [selectedYear, setSelectedYear] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeacherAwards = async () => {
            try {
                const response = await getGroupedTeacherAwards();
                const grouped = response?.data ?? response;
                if (grouped && Object.keys(grouped).length > 0) {
                    setAwardData(grouped);
                    setSelectedYear(parseInt(Object.keys(grouped)[0]));
                } else {
                    setAwardData(defaultAwardData);
                    setSelectedYear(2010);
                }
            } catch (error) {
                console.error('Error fetching teacher awards:', error);
                setAwardData(defaultAwardData);
                setSelectedYear(2010);
            } finally {
                setLoading(false);
            }
        };
        fetchTeacherAwards();
    }, []);

    if (loading) return <div className="text-center py-10">Loading Teacher Awards...</div>;

    const currentAwards = awardData[selectedYear] || [];

    return (
        <section className={styles.teacherAwardsSection}>
            <div className="max-w-[120rem] mx-auto px-2 lg:px-10">
                <h2 className={styles.teacherAwardsTitle}>Awards Received By Teachers</h2>

                {/* Year Tabs */}
                <div className={styles.yearTabs}>
                    {Object.keys(awardData).sort((a, b) => b - a).map((year) => (
                        <button
                            key={year}
                            onClick={() => setSelectedYear(parseInt(year))}
                            className={parseInt(year) === selectedYear ? styles.active : ''}
                        >
                            {year}
                        </button>
                    ))}
                </div>

                {/* Table */}
                <div className={styles.tableContainer}>
                    <table className={styles.awardsTable}>
                        <thead>
                            <tr>
                                <th className={`${styles.tableHeaderCell} ${styles.tableHeaderSerial}`}>S.No</th>
                                <th className={`${styles.tableHeaderCell} ${styles.tableHeaderAward}`}>Name of the Award</th>
                                <th className={styles.tableHeaderCell}>Name of the Faculty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentAwards.map((row, index) => (
                                <tr key={index} className={index % 2 === 1 ? styles.tableBodyRowEven : ''}>
                                    <td className={styles.tableBodyCell}>{index + 1}</td>
                                    <td className={styles.tableBodyCell}>{Array.isArray(row) ? row[0] : row.awardName}</td>
                                    <td className={styles.tableBodyCell}>{Array.isArray(row) ? row[1] : row.facultyName}</td>
                                </tr>
                            ))}
                            {currentAwards.length === 0 && (
                                <tr>
                                    <td colSpan="3" className="text-center py-4">No awards found for this year.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

// ================= MAIN APP COMPONENT =================
export default function AboutSVASC() {
    return (
        <div className={styles.aboutSvascContainer}>
            <HeroSection />
            <EmpoweringLeadersSection />
            <AboutSection />
            <CampusLifeSection />
            <TestimonialsSection />
            <AwardsSection />
            <TeacherAwardsSection />
        </div>
    );
}