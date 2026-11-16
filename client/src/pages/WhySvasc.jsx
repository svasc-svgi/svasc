import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { CheckCircle, Layout, Users, BookOpen, Clock, Box, ChevronLeft, ChevronRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from './WhySvasc.module.css';
import Hero from '../components/Common/Hero';
import { getWhySvascTestimonials } from '../services/whySvascService';

import whyImg from '../assets/why.jpg';
import why1Img from '../assets/why1.jpg';
import why2Img from '../assets/why2.JPG';
import why3Img from '../assets/why3.jpg';
import bus2Img from '../assets/bus2.jpg';

const DEFAULT_TESTIMONIALS = [
    {
        name: "E.Pooja - Bsc computer science 2023 batch",
        text: "I am truly grateful for my transformative time at Shree Venkateshwara Arts and Science College.\nBeyond classroom academics, the college taught me professionalism, discipline, and strong confidence.\nOrganizing various campus events enhanced my leadership, public communication, and management abilities.\nThe practical exposure and values gained here have proven invaluable in my ongoing professional career.\nI will always remain deeply thankful to the encouraging faculty and visionary management for their support.\nThank you, SVASC, for inspiring my growth and shaping me into a competent and capable person!",
        image: "/testimonials/pooja.jpg"
    },
    {
        name: "B.Logitha - Bsc computer science 2023 batch",
        text: "As a proud alumna of Shree Venkateshwara Arts and Science College, my college days remain unforgettable.\nIt was an enriching environment where I gained deep knowledge, valuable life lessons, and lasting friendships.\nDedicated professors constantly encouraged us to excel in our academic pursuits and personal development.\nEvery moment spent across the vibrant campus provided me with meaningful guidance and bright opportunities.\nNo matter where my career leads, the values, memories, and inspiration gained here stay close to my heart.\nThank you, Shree Venkateshwara Arts and Science College, for memories and lessons I will cherish forever!",
        image: "/testimonials/logitha.jpg"
    },
    {
        name: "P. SOBIYA - 2022 class:B.Sc(CS)",
        text: "My overall experience at Shree Venkateshwara Arts and Science College was immensely positive.\nThe academic atmosphere is vibrant, with enthusiastic students who are genuinely eager to learn.\nThe faculty members and staff are consistently welcoming, supportive, and exceptionally well-coordinated.\nI truly appreciate the warm institutional hospitality and thoughtful encouragement extended at all times.\nIt was a remarkable opportunity to interact with talented peers, share knowledge, and grow together.\nThank you, SVASC, for creating such an inspiring and empowering environment for all learners!",
        image: "/testimonials/sobiya.jpg"
    },
    {
        name: "S.manikandan - B Sc CS 2019 batch",
        text: "My journey at Shree Venkateshwara Arts and Science College (2019–2022) was a deeply valuable experience.\nThe institution provided a positive learning environment paired with exceptional academic support.\nApproachable faculty members offered dedicated guidance and shared immense knowledge with us.\nThe comprehensive B.Sc. Computer Science curriculum significantly strengthened my technical skills.\nThis rigorous training built my self-confidence and thoroughly prepared me for future industry avenues.\nI remain sincerely grateful to SVASC for the knowledge, opportunities, and foundation gifted to my career.",
        image: "/testimonials/manikandan.jpg"
    }
];

const WhySvasc = () => {
    const [prevEl, setPrevEl] = React.useState(null);
    const [nextEl, setNextEl] = React.useState(null);
    const [testimonials, setTestimonials] = React.useState(DEFAULT_TESTIMONIALS);

    React.useEffect(() => {
        let isMounted = true;
        getWhySvascTestimonials()
            .then((res) => {
                if (!isMounted) return;
                const list = res?.data ?? (Array.isArray(res) ? res : []);
                if (Array.isArray(list) && list.length > 0) {
                    setTestimonials(list);
                }
            })
            .catch((err) => {
                console.warn('Could not load remote testimonials, using defaults:', err.message);
            });
        return () => { isMounted = false; };
    }, []);

    const hiringPartners = [
        { name: 'TCS', logo: '/comapanies/tcs.jpg' },
        { name: 'MRF Tyres', logo: '/comapanies/mrf.jpg' },
        { name: 'Nokia Networks', logo: '/comapanies/nokia.png' },
        { name: 'Tata Electronics', logo: '/comapanies/tata elctornics.jpg' },
        { name: 'Muthoot Finance', logo: '/comapanies/muthoot finance.png' },
        { name: 'Foxconn', logo: '/comapanies/foxconn.png' },
        { name: 'Motherson Group', logo: '/comapanies/motherson.png' },
        { name: 'KGIS', logo: '/comapanies/kgis.png' },
        { name: 'Smartail', logo: '/comapanies/smarttail.png' },
        { name: 'Jilaba Technologies', logo: '/comapanies/jilaba.png' },
        { name: 'SCM Garments', logo: '/comapanies/scm.png' },
        { name: 'Clarus', logo: '/comapanies/clarus.jpg' },
        { name: 'Cognizant', logo: '/comapanies/cognicent.jpg' },
        { name: 'Rinex', logo: '/comapanies/rinex.png' },
        { name: 'Sakthi Auto', logo: '/comapanies/sakthiauto.png' },
        { name: 'SP Apparels', logo: '/comapanies/spaperals.jpg' }
    ];

    return (
        <div className={styles.aboutDetailContainer}>
            <Hero
                title="Why SVASC?"
                description="Located in ERODE, SVASC College of Arts and Science is a NAAC-accredited institution known for its industry-aligned programs and student-centric approach."
                image={whyImg}
            />
            {/* ================= HERO SECTION ================= */}
            <section className={styles.hero}>
                <div className={styles.container}>
                    <div className={styles.heroContent}>
                        <div className={styles.heroImages}>
                            <div className={`${styles.imageWrapper} ${styles.fadeInUp}`} style={{ animationDelay: '0.1s' }}>
                                <img src={why3Img} alt="Students studying" />
                            </div>
                            <div className={`${styles.imageWrapper} ${styles.fadeInUp}`} style={{ animationDelay: '0.3s' }}>
                                <img src={why2Img} alt="Student working" />
                            </div>
                            <div className={`${styles.imageWrapper} ${styles.fadeInUp}`} style={{ animationDelay: '0.5s' }}>
                                <img src={why1Img} alt="Students collaborating" />
                            </div>
                        </div>

                        <div className={`${styles.heroText} ${styles.fadeInUp}`} style={{ animationDelay: '0.2s' }}>
                            <h2>
                                <span>About Us</span>
                                More than a college, a launchpad for your dreams.
                            </h2>
                            <p>
                                SVASC - Located in ERODE, SVASC College of Arts and Science is a NAAC-accredited institution
                                known for its industry-aligned programs, modern infrastructure, and outcome-based education.
                                With a strong focus on placements, innovation, and global exposure, SVASC empowers students to
                                lead with confidence in their careers and beyond.
                            </p>
                            <button className={styles.ctaButton}>Call for Admissions</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= WHY SVASC SECTION ================= */}
            <section className={styles.whySection}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Why SVASC? Where your passion meets purpose</h2>

                    <div className={styles.cardsGrid}>
                        <div className={`${styles.infoCard} ${styles.fadeInUp}`} style={{ animationDelay: '0.1s' }}>
                            <div className={styles.cardHeader}>
                                <div className={styles.cardIcon}>
                                    <CheckCircle />
                                </div>
                                <h3 className={styles.cardTitle}>NAAC Accreditation</h3>
                            </div>
                            <p className={styles.cardDescription}>Recognized for academic excellence and quality education standards.</p>
                        </div>

                        <div className={`${styles.infoCard} ${styles.fadeInUp}`} style={{ animationDelay: '0.2s' }}>
                            <div className={styles.cardPercentage}>94%</div>
                            <h3 className={styles.cardTitle}>Placement Assistance</h3>
                            <p className={styles.cardDescription}>Graduates secure positions in top MNCs like Infosys, TCS, Wipro & Zoho.</p>
                        </div>

                        <div className={`${styles.infoCard} ${styles.fadeInUp}`} style={{ animationDelay: '0.3s' }}>
                            <div className={styles.cardHeader}>
                                <div className={styles.cardIcon}>
                                    <Layout />
                                </div>
                                <h3 className={styles.cardTitle}>Modern Campus</h3>
                            </div>
                            <p className={styles.cardDescription}>Smart classrooms, hi-tech labs, seminar halls, Wi-Fi campus & digital library.</p>
                        </div>

                        <div className={`${styles.infoCard} ${styles.fadeInUp}`} style={{ animationDelay: '0.4s' }}>
                            <div className={styles.cardHeader}>
                                <div className={styles.cardIcon}>
                                    <Users />
                                </div>
                                <h3 className={styles.cardTitle}>Industry-Driven</h3>
                            </div>
                            <p className={styles.cardDescription}>Courses designed to meet current industry requirements and future skills.</p>
                        </div>

                        <div className={`${styles.infoCard} ${styles.fadeInUp}`} style={{ animationDelay: '0.5s' }}>
                            <div className={styles.cardHeader}>
                                <div className={styles.cardIcon}>
                                    <BookOpen />
                                </div>
                                <h3 className={styles.cardTitle}>Experienced Faculty</h3>
                            </div>
                            <p className={styles.cardDescription}>Ph.D. holders, industry professionals & student-focused mentors.</p>
                        </div>

                        <div className={`${styles.infoCard} ${styles.fadeInUp}`} style={{ animationDelay: '0.6s' }}>
                            <div className={styles.cardHeader}>
                                <div className={styles.cardIcon}>
                                    <Box />
                                </div>
                                <h3 className={styles.cardTitle}>Skill Certifications</h3>
                            </div>
                            <p className={styles.cardDescription}>Value-added certifications in AI, Data Science, Python, Tally & more.</p>
                        </div>

                        <div className={`${styles.infoCard} ${styles.fadeInUp}`} style={{ animationDelay: '0.7s' }}>
                            <div className={styles.cardHeader}>
                                <div className={styles.cardIcon}>
                                    <Clock />
                                </div>
                                <h3 className={styles.cardTitle}>Student-Centric</h3>
                            </div>
                            <p className={styles.cardDescription}>Personalized mentoring, clubs, fests, and hands-on projects.</p>
                        </div>

                        <div className={`${styles.infoCard} ${styles.fadeInUp}`} style={{ animationDelay: '0.8s' }}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>Ready to turn your passion into a profession</h3>
                            </div>
                            <button className={styles.ctaButton}>Get a Free Quote</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= TESTIMONIALS SECTION ================= */}
            <div className={styles.curveMask}>
                <div className={styles.curveDown} id={styles.curve1}>
                    <section className={styles.curveContentWrap}>
                        <div className={styles.curveContent}>
                            <h1 className={styles.curveTitle}>Student Testimonials</h1>
                        </div>
                    </section>
                </div>
            </div>

            <div className={styles.descSection}>
                <div className={styles.quoteCarousel}>
                    <Swiper
                        modules={[Pagination, Autoplay, Navigation]}
                        pagination={{
                            clickable: true,
                            renderBullet: (index, className) => {
                                const img = testimonials[index]?.image || '/testimonials/pooja.jpg';
                                return `<span class="${className}" style="background-image: url(${img})"></span>`;
                            }
                        }}
                        autoplay={{ delay: 3500 }}
                        navigation={{
                            prevEl,
                            nextEl,
                        }}
                        loop={testimonials.length > 1}
                        className={styles.testimonialSwiper}
                    >
                        {testimonials.map((t, i) => (
                            <SwiperSlide key={t._id || i} className={styles.testimonialItem}>
                                <blockquote>
                                    <p style={{ whiteSpace: 'pre-line' }}>{t.text}</p>
                                    <small>{t.name}</small>
                                </blockquote>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Manual Navigation Buttons */}
                    <button ref={(node) => setPrevEl(node)} className={styles.prevBtn}>
                        <ChevronLeft />
                    </button>
                    <button ref={(node) => setNextEl(node)} className={styles.nextBtn}>
                        <ChevronRight />
                    </button>
                </div>
            </div>

            {/* ================= STATISTICS SECTION ================= */}
            <div className={styles.curveMask}>
                <div className={styles.curveUp} id={styles.curve2}>
                    <section className={styles.curveContentWrap}>
                        <div className={styles.curveContent}>
                            <div className={styles.statsContainer}>
                                <div className={styles.statItem}>
                                    <div className={styles.statNumber}>100%</div>
                                    <div className={styles.statLabel}>Placement Assistance</div>
                                </div>
                                <div className={styles.statItem}>
                                    <div className={styles.statNumber}>25 +</div>
                                    <div className={styles.statLabel}>Academic Programme</div>
                                </div>
                                <div className={styles.statItem}>
                                    <div className={styles.statNumber}>40 +</div>
                                    <div className={styles.statLabel}>Prestigious Awards</div>
                                </div>
                                <div className={styles.statItem}>
                                    <div className={styles.statNumber}>25 +</div>
                                    <div className={styles.statLabel}>Advanced Labs</div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* ================= HIRING PARTNERS ================= */}
            <div className={styles.descSection}>
                <section className={styles.hiringSection}>
                    <h2>Our Prestigious Hiring Partners</h2>
                    <div className={styles.logoSlider}>
                        <div className={styles.logoTrack}>
                            {/* Original Set */}
                            {hiringPartners.map((partner, i) => (
                                <div key={i} className={styles.logo}>
                                    <img src={partner.logo} alt={partner.name} />
                                </div>
                            ))}
                            {/* Cloned Set for seamless loop */}
                            {hiringPartners.map((partner, i) => (
                                <div key={`clone-${i}`} className={styles.logo}>
                                    <img src={partner.logo} alt={partner.name} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            {/* ================= PROGRAMS SECTION ================= */}
            <main className={styles.wrapper}>


                <section className={styles.programsHero} style={{ background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${bus2Img}) center / cover` }}>
                    <h1>Ready to start?</h1>
                    <article>
                        <p>
                            Explore our programs with just one click and join a community dedicated to your success and excellence.
                        </p>
                        <button className={styles.programLink}>Browse Programs</button>
                    </article>
                </section>
            </main>
        </div>
    );
};

export default WhySvasc;
