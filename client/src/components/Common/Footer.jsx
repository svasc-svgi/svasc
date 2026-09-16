import React from 'react';
import {
    FaFacebookF,
    FaTwitter,
    FaGoogle,
    FaChevronRight,
    FaTelegramPlane,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import Logo from '../Home/SVCAS-Logo.jpg';

const Footer = () => {
    return (
        <>
            <footer className={styles.footerSection}>
                {/* SVG Gradient Definition */}
                <svg width="0" height="0" style={{ position: 'absolute' }}>
                    <defs>
                        <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#FFA500', stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Wave Decoration */}
                <div className={styles.footerWave}>
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className={styles.shapeFill}></path>
                    </svg>
                </div>

                <div className={styles.container}>
                    {/* CTA Section */}
                    <div className={styles.footerCta}>
                        <div className={styles.ctaRow}>
                            <div className={styles.singleCta}>
                                <div className={styles.ctaIcon}>
                                    <FaMapMarkerAlt size={42} fill="url(#gold-gradient)" />
                                </div>
                                <div className={styles.ctaText}>
                                    <h4>Find Us</h4>
                                    <span>Erode – Gobi Main Road, Othakuthirai, K.Mettupalayam (Post) – 638 455 Gobichettipalayam, Erode Dt, Tamil Nadu.</span>
                                </div>
                            </div>
                            <div className={styles.singleCta}>
                                <div className={styles.ctaIcon}>
                                    <FaPhoneAlt size={42} fill="url(#gold-gradient)" />
                                </div>
                                <div className={styles.ctaText}>
                                    <h4>Call Us</h4>
                                    <span>
                                        <a href="tel:+914285266188">+91-4285-266188</a><br />
                                        <a href="tel:+919942945555">+91-99429-45555</a><br />
                                        <a href="tel:+914285266133">+91-4285-266133</a>
                                    </span>
                                </div>
                            </div>
                            <div className={styles.singleCta}>
                                <div className={styles.ctaIcon}>
                                    <FaEnvelope size={42} fill="url(#gold-gradient)" />
                                </div>
                                <div className={styles.ctaText}>
                                    <h4>Mail Us</h4>
                                    <span><a href="mailto:info@svacollege.com">info@svacollege.com</a></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Content */}
                    <div className={styles.footerContent}>
                        <div className={styles.contentRow}>
                            {/* Widget 1: Logo & About */}
                            <div className={`${styles.footerWidget} ${styles.aboutWidget}`}>
                                <div className={styles.footerLogo}>
                                    <Link to="/">
                                        <img src={Logo} alt="SVASC College Logo" />
                                    </Link>
                                </div>
                                <div className={styles.footerText}>
                                    <p style={{ marginBottom: '6px' }}>
                                        <strong style={{ display: 'block', fontSize: '15px', color: '#0a1f44', fontWeight: '800', letterSpacing: '0.3px', lineHeight: '1.5' }}>
                                            SHREE VENKATESHWARA<br />
                                            ARTS &amp; SCIENCE (Co-Education) COLLEGE
                                        </strong>
                                    </p>
                                    <p style={{ marginBottom: '4px', fontSize: '13px', color: '#c8860a', fontWeight: '600', fontStyle: 'italic', lineHeight: '1.6' }}>
                                        Recognized u/s 2(f) of the UGC Act, 1956
                                    </p>
                                    <p style={{ marginBottom: '16px', fontSize: '12.5px', color: '#c8860a', fontWeight: '500', fontStyle: 'italic' }}>
                                        Affiliated to the Bharathiar University, Coimbatore.
                                    </p>
                                    <p style={{ fontSize: '14px', color: '#6c757d', lineHeight: '1.8' }}>
                                        Othakuthirai, Gobichettipalayam – 638455,<br />
                                        Erode Dt, Tamilnadu.
                                    </p>
                                </div>
                                <div className={styles.footerSocialIcon}>
                                    <span className={styles.socialTitle}>Follow Us</span>
                                    <div className={styles.socialIcons}>
                                        <a href="#" className={styles.socialIconLink} aria-label="Facebook">
                                            <div className={`${styles.iconCircle} ${styles.facebookBg}`}>
                                                <FaFacebookF size={18} />
                                            </div>
                                        </a>
                                        <a href="#" className={styles.socialIconLink} aria-label="Twitter">
                                            <div className={`${styles.iconCircle} ${styles.twitterBg}`}>
                                                <FaTwitter size={18} />
                                            </div>
                                        </a>
                                        <a href="#" className={styles.socialIconLink} aria-label="Google">
                                            <div className={`${styles.iconCircle} ${styles.googleBg}`}>
                                                <FaGoogle size={18} />
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Widget 2: Useful Links */}
                            <div className={styles.footerWidget}>
                                <div className={styles.widgetHeading}>
                                    <h3>Useful Links</h3>
                                </div>
                                <ul className={styles.footerLinks}>
                                    <li><Link to="/"><FaChevronRight size={14} /> Home</Link></li>
                                    <li><Link to="/about"><FaChevronRight size={14} /> About</Link></li>
                                    <li><Link to="/academics"><FaChevronRight size={14} /> Academics</Link></li>
                                    <li><Link to="/admission"><FaChevronRight size={14} /> Admission</Link></li>
                                    <li><Link to="/placement"><FaChevronRight size={14} /> Placement</Link></li>
                                    <li><Link to="/facilities"><FaChevronRight size={14} /> Facilities</Link></li>
                                    <li><Link to="/activities"><FaChevronRight size={14} /> Activities</Link></li>
                                    <li><Link to="/contact"><FaChevronRight size={14} /> Contact Us</Link></li>
                                </ul>
                            </div>

                            {/* Widget 3: Subscribe */}
                            <div className={styles.footerWidget}>
                                <div className={styles.widgetHeading}>
                                    <h3>Subscribe</h3>
                                </div>
                                <div className={styles.footerText}>
                                    <p>Don't miss to subscribe to our new feeds, kindly fill the form below.</p>
                                </div>
                                <div className={styles.subscribeForm}>
                                    <form onSubmit={(e) => e.preventDefault()}>
                                        <input type="email" placeholder="Email Address" required />
                                        <button type="submit" aria-label="Subscribe">
                                            <FaTelegramPlane size={24} color="white" />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </footer>

            {/* Copyright Area */}
            <div className={styles.copyrightArea}>
                <div className={styles.container}>
                    <div className={styles.copyrightRow}>
                        <div className={styles.copyrightText}>
                            <p>Copyright &copy; 2026, Developed By <a href="#">Procols</a></p>
                        </div>
                        <div className={styles.footerMenu}>
                            <ul>
                                <li><a href="#">Last Update Jan 2026</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;
