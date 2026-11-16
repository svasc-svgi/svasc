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
        text: "I am truly grateful for my time at Shree Venkateshwara Arts and Science College.\n\nBeyond academics, this college taught me how to be professional, disciplined, and confident. I got many opportunities to stand in front of people and organize various functions and events, which greatly improved my leadership, communication, and management skills.\n\nThe experience I gained here been extremely useful to me after completing my college life, especially in my professional journey. I will always be thankful to the faculty and management for their guidance and support.\n\nThank you for shaping me into a better person.",
        image: "/testimonials/pooja.jpg"
    },
    {
        name: "B.Logitha - Bsc computer science 2023 batch",
        text: "Being a pass-out student of Shree Venkateshwara Arts and Science College, I can proudly say that my college days were one of the most beautiful phases of my life. It was not just a place where I gained knowledge, but also a place where I learned valuable life lessons, built beautiful friendships, and created memories that will always stay close to my heart.\n\nThe teachers were always supportive and encouraged us to do better in our studies and personal growth. Every moment spent on campus, from attending classes to spending time with friends, has become a special memory.\n\nI am truly thankful for all the experiences, guidance, and opportunities I received during my time here. No matter where life takes me, a part of my journey will always belong to this college. ❤️\n\nThank you, Shree Venkateshwara Arts and Science College, for giving me beautiful memories, valuable lessons, and experiences that I will cherish forever!",
        image: "/testimonials/logitha.jpg"
    },
    {
        name: "P. SOBIYA - 2022 class:B.Sc(CS)",
        text: "My experience at your college was very positive. The students were enthusiastic and eager to learn. The faculty and staff were friendly, supportive, and well-coordinated. I truly appreciate their warm hospitality. It was a wonderful opportunity to interact with students and guide them as a mentor.\n\n**Thank You!**",
        image: "/testimonials/sobiya.jpg"
    },
    {
        name: "S.manikandan - B Sc CS 2019 batch",
        text: "My journey at Shree Venkateshwara Arts and Science College, Othakuthira, Gobichettipalayam (2019–2022) was a meaningful and valuable experience. The college provided a positive learning environment, excellent academic support, and opportunities to enhance both knowledge and personal skills. The faculty members were knowledgeable, approachable, and supportive, offering proper guidance and encouragement throughout the academic journey. Their dedication to teaching and willingness to share their knowledge played an important role in my learning and development. Overall, my B.Sc. Computer Science experience helped me build confidence, improve my skills, and prepare for future opportunities. I am grateful for the knowledge and experiences gained during my time at this institution.",
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
