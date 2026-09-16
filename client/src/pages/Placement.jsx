import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Placement.module.css';
import { ArrowRight, Users, TrendingUp, Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Quote, Mic2, MessageSquare, LineChart, Network, FileText, CheckSquare, Award, Clock } from 'lucide-react';
import Hero from '../components/Common/Hero';
import LogoSpinning from './LogoSpinning';
import LogoMarquee from '../components/Common/LogoMarquee';

const RECRUITERS = [
    { name: "TCS", fullName: "Tata Consultancy Services", color: "#2563eb", src: "/comapanies/tcs.jpg" },
    { name: "MRF Tyres", fullName: "MRF Tyres Pvt Ltd", color: "#ea580c", src: "/comapanies/mrf.jpg" },
    { name: "Nokia Networks", fullName: "Nokia Network Pvt Ltd", color: "#0a1264", src: "/comapanies/nokia.png" },
    { name: "Tata Electronics", fullName: "Tata Electronics", color: "#000000", src: "/comapanies/tata elctornics.jpg" },
    { name: "Muthoot Finance", fullName: "Muthoot Finance Pvt Ltd", color: "#dc2626", src: "/comapanies/muthoot finance.png" },
    { name: "Foxconn", fullName: "Foxconn India", color: "#0f766e", src: "/comapanies/foxconn.png" },
    { name: "Motherson Group", fullName: "Motherson Group", color: "#4f46e5", src: "/comapanies/motherson.png" },
    { name: "KGIS", fullName: "KGISL", color: "#0891b2", src: "/comapanies/kgis.png" },
    { name: "Smartail", fullName: "Smartail Pvt Ltd", color: "#16a34a", src: "/comapanies/smarttail.png" },
    { name: "Jilaba Technologies", fullName: "Jilaba Technologies", color: "#7c3aed", src: "/comapanies/jilaba.png" },
    { name: "SCM Garments", fullName: "SCM Garments", color: "#db2777", src: "/comapanies/scm.png" },
    { name: "Clarus", fullName: "Clarus", color: "#0284c7", src: "/comapanies/clarus.jpg" },
    { name: "Cognizant", fullName: "Cognizant", color: "#1a365d", src: "/comapanies/cognicent.jpg" },
    { name: "Rinex", fullName: "Rinex", color: "#4f46e5", src: "/comapanies/rinex.png" },
    { name: "Sakthi Auto", fullName: "Sakthi Auto", color: "#ea580c", src: "/comapanies/sakthiauto.png" },
    { name: "SP Apparels", fullName: "SP Apparels", color: "#16a34a", src: "/comapanies/spaperals.jpg" }
];

const PlacementCell = () => {
    return (
        <div className={styles.placementApp}>
            {/* Hero Section */}
            <Hero
                title="Placement and Training Cell"
                description="Enhancing students' employability by providing comprehensive career guidance, industry-oriented training, and placement opportunities at Shree Venkateshwara Arts and Science College."
                image="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1200"
            />
            <header className={styles.heroSection}>
                <div className={styles.heroBackground}></div>
                <div className={styles.heroContainer}>
                    <div className={styles.heroContent}>
                        <div className={styles.heroBadge}>
                            <span className={styles.badgePulse}></span>
                            Empowering Career Excellence
                        </div>
                        <h1 className={styles.heroTitle}>
                            Training & Placement
                            <span className={styles.heroHighlight}>Connecting Potential</span>
                            with Professional Opportunities
                        </h1>
                        <p className={styles.heroDescription}>
                            The Training & Placement Cell of Shree Venkateshwara Arts and Science (Co-Education) College, Gobichettipalayam, is committed to enhancing students' employability by providing comprehensive career guidance, industry-oriented training, and placement opportunities.
                        </p>
                        <div className={styles.heroButtons}>
                            <Link to="/statistics" className={`${styles.btn} ${styles.btnPrimary}`}>
                                View Statistics
                                <ArrowRight size={18} />
                            </Link>
                            <a href="#recruiters" className={`${styles.btn} ${styles.partner}`}>
                                Our Recruiters
                            </a>
                        </div>
                    </div>

                    {/* Hero Visuals Grid */}
                    <div className={`${styles.heroVisuals} ${styles.delay200}`}>
                        <div className={styles.heroGridLeft}>
                            <div className={styles.heroImageLarge}>
                                <img
                                    src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=600"
                                    alt="Student Interview Prep"
                                />
                            </div>
                            <div className={styles.heroStatCard}>
                                <div className={styles.statIcon}>
                                    <Users size={20} />
                                </div>
                                <span className={styles.statLabel}>83% Placement</span>
                                <p className={styles.statDescription}>In Academic Year 2025–2026</p>
                            </div>
                        </div>
                        <div className={styles.heroGridRight}>
                            <div className={`${styles.heroStatCard} ${styles.heroStatCardPrimary}`}>
                                <div className={styles.statIcon}>
                                    <TrendingUp size={20} />
                                </div>
                                <span className={styles.statLabel}>550+ Offers</span>
                                <p className={styles.statDescription}>Total Placement Offers Received</p>
                            </div>
                            <div className={styles.heroImageLarge}>
                                <img
                                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600"
                                    alt="Professional Career Seminar"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* About Section */}
            <section id="about" className={styles.aboutSection}>
                <div className={styles.aboutContainer}>
                    <h2 className={styles.sectionTitle}>About The Placement Cell</h2>
                    <p className={styles.aboutMainText}>
                        The Training & Placement Cell serves as a vital link between academia and industry by equipping students with technical knowledge, communication skills, aptitude, and professional competencies required to meet evolving industry expectations.
                    </p>
                    <div className={styles.divider}></div>
                    <p className={styles.aboutSecondaryText}>
                        Through structured training programmes, industry interactions, internships, and campus recruitment drives, the Cell prepares students for successful careers across diverse sectors. During the academic year 2025–2026, the Cell conducted continuous employability enhancement programmes and facilitated campus recruitment drives with leading multinational companies and reputed organizations, resulting in significant placement opportunities for students.
                    </p>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className={styles.aboutSection} style={{ background: '#f8fafc' }}>
                <div className={styles.aboutContainer} style={{ textAlign: 'left', maxWidth: '100rem' }}>
                    <h2 className={styles.sectionTitle} style={{ textAlign: 'center' }}>Vision</h2>
                    <p className={styles.aboutMainText} style={{ textAlign: 'center', fontSize: '1.8rem', fontStyle: 'italic', marginBottom: '40px' }}>
                        "To empower students with the knowledge, skills, values, and confidence required to become globally competent professionals by providing quality training, career guidance, and excellent placement opportunities."
                    </p>
                    
                    <div className={styles.divider} style={{ margin: '30px auto' }}></div>
                    
                    <h2 className={styles.sectionTitle} style={{ textAlign: 'center', marginTop: '40px' }}>Mission</h2>
                    <ul style={{ paddingLeft: '20px', fontSize: '1.6rem', lineHeight: '1.8', color: '#4b5563', listStyleType: 'disc' }}>
                        <li style={{ marginBottom: '12px' }}>To enhance students' employability through continuous training in aptitude, technical, communication, and soft skills.</li>
                        <li style={{ marginBottom: '12px' }}>To establish strong partnerships with leading industries and organizations for internships, training, and campus recruitment.</li>
                        <li style={{ marginBottom: '12px' }}>To prepare students for competitive recruitment processes through mock interviews, group discussions, resume-building, and career counseling.</li>
                        <li style={{ marginBottom: '12px' }}>To promote industry-oriented learning, innovation, and lifelong professional development.</li>
                        <li style={{ marginBottom: 0 }}>To achieve maximum placement opportunities while supporting students in building successful and ethical careers.</li>
                    </ul>
                </div>
            </section>

            {/* Objectives of the Placement & Training Cell */}
            <section className={styles.servicesSection}>
                <div className={styles.servicesContainer} style={{ maxWidth: '120rem', margin: '0 auto' }}>
                    <div className={styles.sectionHeader} style={{ textAlign: 'center' }}>
                        <h2 className={styles.sectionTitle}>Objectives of the Placement & Training Cell</h2>
                        <p className={styles.sectionSubtitle}>Key goals that guide our student career initiatives</p>
                    </div>
                    <div className={styles.servicesGrid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(28rem, 1fr))' }}>
                        <div className={styles.serviceCard}>
                            <div className={styles.cardIcon}>
                                <Award size={24} />
                            </div>
                            <h3 className={styles.cardTitle}>Employability Skills</h3>
                            <p className={styles.cardDescription}>To provide comprehensive training in aptitude, technical, communication, and soft skills to improve students' employability.</p>
                        </div>
                        <div className={styles.serviceCard}>
                            <div className={styles.cardIcon}>
                                <Users size={24} />
                            </div>
                            <h3 className={styles.cardTitle}>Recruitment Prep</h3>
                            <p className={styles.cardDescription}>To prepare students for campus recruitment through mock interviews, group discussions, coding assessments, and resume-building sessions.</p>
                        </div>
                        <div className={styles.serviceCard}>
                            <div className={styles.cardIcon}>
                                <Network size={24} />
                            </div>
                            <h3 className={styles.cardTitle}>Industry Partnerships</h3>
                            <p className={styles.cardDescription}>To establish and strengthen partnerships with leading industries, corporate organizations, and recruiters for internships and placement opportunities.</p>
                        </div>
                        <div className={styles.serviceCard}>
                            <div className={styles.cardIcon}>
                                <Mic2 size={24} />
                            </div>
                            <h3 className={styles.cardTitle}>Expert Seminars</h3>
                            <p className={styles.cardDescription}>To organize career guidance programs, industry interactions, seminars, workshops, and guest lectures by experts.</p>
                        </div>
                        <div className={styles.serviceCard}>
                            <div className={styles.cardIcon}>
                                <TrendingUp size={24} />
                            </div>
                            <h3 className={styles.cardTitle}>Curriculum Alignment</h3>
                            <p className={styles.cardDescription}>To bridge the gap between academic learning and industry requirements through skill development initiatives.</p>
                        </div>
                        <div className={styles.serviceCard}>
                            <div className={styles.cardIcon}>
                                <MessageSquare size={24} />
                            </div>
                            <h3 className={styles.cardTitle}>Ethics & Leadership</h3>
                            <p className={styles.cardDescription}>To encourage students to develop professional ethics, leadership qualities, teamwork, and problem-solving abilities.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Training Programmes */}
            <section className={styles.servicesSection} style={{ background: '#f8fafc' }}>
                <div className={styles.servicesContainer} style={{ maxWidth: '120rem', margin: '0 auto' }}>
                    <div className={styles.sectionHeader} style={{ textAlign: 'center' }}>
                        <h2 className={styles.sectionTitle}>Employability Training Programmes</h2>
                        <p className={styles.sectionSubtitle}>Focused guidance modules designed to make students industry-ready</p>
                    </div>
                    <div className={styles.servicesGrid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(26rem, 1fr))' }}>
                        <div className={styles.serviceCard}>
                            <div className={styles.cardIcon}>
                                <TrendingUp size={24} />
                            </div>
                            <h3 className={styles.cardTitle}>Aptitude Development</h3>
                            <p className={styles.cardDescription}>Quantitative Ability, Logical Reasoning & Verbal Ability</p>
                        </div>
                        <div className={styles.serviceCard}>
                            <div className={styles.cardIcon}>
                                <Mic2 size={24} />
                            </div>
                            <h3 className={styles.cardTitle}>Communication Skills</h3>
                            <p className={styles.cardDescription}>Spoken English, listening capabilities, and written communication</p>
                        </div>
                        <div className={styles.serviceCard}>
                            <div className={styles.cardIcon}>
                                <Users size={24} />
                            </div>
                            <h3 className={styles.cardTitle}>Soft Skills</h3>
                            <p className={styles.cardDescription}>Personality development, positive attitude, and behavioral dynamics</p>
                        </div>
                        <div className={styles.serviceCard}>
                            <div className={styles.cardIcon}>
                                <MessageSquare size={24} />
                            </div>
                            <h3 className={styles.cardTitle}>Group Discussions</h3>
                            <p className={styles.cardDescription}>Formulating structured arguments, presentation skills, and public speaking</p>
                        </div>
                        <div className={styles.serviceCard}>
                            <div className={styles.cardIcon}>
                                <FileText size={24} />
                            </div>
                            <h3 className={styles.cardTitle}>Resume & Profile Writing</h3>
                            <p className={styles.cardDescription}>Resume engineering, cover letters, and corporate profile building</p>
                        </div>
                        <div className={styles.serviceCard}>
                            <div className={styles.cardIcon}>
                                <Network size={24} />
                            </div>
                            <h3 className={styles.cardTitle}>Technical Skill Training</h3>
                            <p className={styles.cardDescription}>Department-specific technical workshops and coding assessments</p>
                        </div>
                        <div className={styles.serviceCard}>
                            <div className={styles.cardIcon}>
                                <CheckSquare size={24} />
                            </div>
                            <h3 className={styles.cardTitle}>Mock HR & Technical Rounds</h3>
                            <p className={styles.cardDescription}>One-on-one simulations replicating industry hiring processes</p>
                        </div>
                        <div className={styles.serviceCard}>
                            <div className={styles.cardIcon}>
                                <Award size={24} />
                            </div>
                            <h3 className={styles.cardTitle}>Professional Etiquette</h3>
                            <p className={styles.cardDescription}>Corporate protocols, leadership mindset, and workplace communication</p>
                        </div>
                        <div className={styles.serviceCard}>
                            <div className={styles.cardIcon}>
                                <Clock size={24} />
                            </div>
                            <h3 className={styles.cardTitle}>Workplace Readiness</h3>
                            <p className={styles.cardDescription}>Time management, stress handling, and team collaboration</p>
                        </div>
                    </div>
                </div>
            </section>

            <LogoSpinning />

            {/* Impact Section */}
            <section className={styles.impactSection}>
                <div className={styles.impactContainer}>
                    <div className={styles.impactContent}>
                        <h2 className={`${styles.sectionTitle} ${styles.sectionTitleLight}`}>Placement Highlights 2025–2026</h2>
                        <p className={styles.impactDescription}>
                            SVASC takes pride in its strong placement ecosystem that connects talented students with the world's leading companies. Through industry-driven training, continuous skill development, and career-focused mentoring, our students are prepared to meet global professional standards.
                        </p>
                        <div className={styles.impactDivider}></div>
                        <div className={styles.impactHighlight}>
                            <div className={styles.highlightDot}></div>
                            <p>500+ Students successfully placed in the current academic year.</p>
                        </div>
                    </div>

                    <div className={styles.impactStats}>
                        <div className={styles.statBox}>
                            <p className={styles.statNumber}>500+</p>
                            <p className={styles.statText}>Students Placed</p>
                        </div>
                        <div className={styles.statBox}>
                            <p className={`${styles.statNumber} ${styles.statNumberHighlight}`}>553</p>
                            <p className={styles.statText}>Total Placement Offers Received</p>
                        </div>
                        <div className={styles.statBox}>
                            <p className={styles.statNumber}>₹3.16 LPA</p>
                            <p className={styles.statText}>LPA Highest Package</p>
                        </div>
                        <div className={styles.statBox}>
                            <p className={`${styles.statNumber} ${styles.statNumberHighlight}`}>₹2.40 LPA</p>
                            <p className={styles.statText}>LPA Average Package</p>
                        </div>
                    </div>
                </div>
            </section>



            {/* Partners Section */}
            <section id="recruiters" className={styles.partnersSection}>
                <div className={styles.partnersContainer}>
                    <h3 className={styles.partnersTitle}>Organizations We Work With</h3>
                    <LogoMarquee logos={RECRUITERS} speed="40s" />
                </div>
            </section>

            {/* Testimonial */}
            <section className={styles.testimonialSection}>
                <div className={styles.testimonialContainer}>
                    <Quote size={48} className={styles.quoteIcon} />
                    <blockquote className={styles.testimonialText}>
                        "Industry-Ready Students with certifications in AR/VR, Cybersecurity, and Naan Mudhalvan Skill training programs. Excellent placement support with mock interviews, aptitude coaching, and international recruitment access."
                    </blockquote>
                    <div className={styles.testimonialAuthor}>Why Recruiters Choose SVASC</div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className={styles.contactSection}>
                <div className={styles.contactWrapper}>
                    <div className={styles.contactCard}>
                        <div className={styles.contactBackground}></div>
                        <div className={styles.contactContent}>
                            <div className={styles.contactLeft}>
                                <h2 className={styles.contactTitle}>Partner With Us</h2>
                                <p className={styles.contactDescription}>
                                    Let's explore opportunities to collaborate, coordinate placement drives, or offer internships to SVASC students.
                                </p>
                            </div>

                            <div className={styles.contactInfoCard}>
                                <h4 className={styles.contactInfoTitle}>Contact Information</h4>
                                <div className={styles.contactDetails}>
                                    <div className={styles.contactItem}>
                                        <Mail size={18} />
                                        <a href="mailto:principal@svasc.org">principal@svasc.org</a>
                                    </div>
                                    <div className={styles.contactItem}>
                                        <Phone size={18} />
                                        <span>+91 9600966086</span>
                                    </div>
                                    <div className={styles.contactItem}>
                                        <MapPin size={18} />
                                        <span>Gobichettipalayam, Tamil Nadu, India</span>
                                    </div>
                                </div>
                                <div className={styles.socialLinks}>
                                    <a href="#" className={styles.socialIcon}>
                                        <Linkedin size={18} />
                                    </a>
                                    <a href="#" className={styles.socialIcon}>
                                        <Twitter size={18} />
                                    </a>
                                    <a href="#" className={styles.socialIcon}>
                                        <Instagram size={18} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PlacementCell;