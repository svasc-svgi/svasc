import React from 'react';
import './CollegeAboutSection.css';
import home4Img from '../../assets/home4.JPG';
import djiImg from '../../assets/DJI_0589.JPG';

const CollegeAboutSection = () => {
    return (
        <section className="svasc-about-wrapper">
            <div className="container-fluid">

                <div className="svasc-about-flex">

                    {/* LEFT CONTENT */}
                    <div className="col-lg-6">
                        <h2 className="svasc-about-heading">
                            Best UG College in Erode With<br />
                            Excellence in Education & Innovation
                        </h2>

                        <p className="svasc-about-description">
                            Shree Venkateshwara Arts and Science (Co-Education) College (SVASC) is dedicated to shaping future-ready graduates through quality education, practical learning, skill development, and holistic growth. College provides a dynamic and supportive learning environment that encourages academic excellence, innovation, critical thinking, and personal development.
                        </p>

                        {/* FEATURE 1 */}
                        <div className="svasc-feature-box">
                            <svg fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
                            </svg>
                            <p>
                                Affiliated to Bharathiar University and recognized by UGC under Section 2(f), offering quality UG programmes in Erode district.
                            </p>
                        </div>

                        {/* FEATURE 2 */}
                        <div className="svasc-feature-box">
                            <svg fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2a5 5 0 015 5v1a5 5 0 01-10 0V7a5 5 0 015-5zm-7 20v-2a7 7 0 0114 0v2" />
                            </svg>
                            <p>
                                Located at Othakuthirai, Gobichettipalayam, Erode — committed to empowering rural students with career-focused education and essential life skills.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT IMAGES COMPOSITION */}
                    <div className="col-lg-6 mt-4 mt-lg-0 svasc-about-images-wrapper">
                        <div className="svasc-image-composition">
                            {/* Decorative background shape */}
                            <div className="svasc-decorative-shape"></div>
                            
                            <img
                                src={djiImg}
                                className="svasc-about-image-main"
                                alt="College Campus" />
                                
                            <img
                                src={home4Img}
                                className="svasc-about-image-overlay"
                                alt="Excellence in Education" />
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default CollegeAboutSection;
