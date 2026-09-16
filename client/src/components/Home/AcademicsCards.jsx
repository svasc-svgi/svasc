import React from 'react';
import './AcademicsCards.css';

const AcademicsCards = () => {
    return (
        <React.Fragment>
            {/* ================= ACADEMICS SECTION ================= */}
            <div className="academics-section-container">
                <section className="academics-section">
                    <div className="academics-wrapper">

                        <div className="academics-left">
                            <div className="shape-bg"></div>
                            <div className="academics-content">
                                <div className="academics-tag">Academics</div>
                                <h2 className="academics-title">
                                    Shree Venkateshwara
                                    <span>ARTS AND SCIENCE</span>
                                    College
                                </h2>
                            </div>
                        </div>

                        <div className="academics-right">
                            <p className="academics-text">
                                Shree Venkateshwara Arts and Science (Co-Education) College (SVASC) is a growing institution dedicated to providing quality higher education in a supportive and inclusive learning environment. SVASC is committed to maintaining academic standards and nurturing the potential of every student.
                                With a strong focus on practical learning, critical thinking, ethical values, leadership, and holistic development, we empower students to build knowledge, confidence, and essential skills for their future careers. Our student-centred approach encourages learners to explore their interests, develop their talents, and become responsible contributors to society.
                            </p>
                        </div>

                    </div>
                </section>
            </div>

            {/* ================= CREATIVE CARDS SECTION ================= */}
            <div className="creative-cards-wrapper">
                <section className="creative-cards style-one">
                    <div className="container">
                        <div className="cc-row">

                            {/* Card 1 — Skill-Focused Learning */}
                            <div className="card-column">
                                <div className="card-details">
                                    <div className="card-icons">
                                        {/* Graduation Cap — Skill-Focused Learning */}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#0f1c6f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="64" height="64">
                                            <path d="M8 24l24-12 24 12-24 12L8 24z" fill="#0f1c6f" fillOpacity="0.15" stroke="#0f1c6f"/>
                                            <path d="M20 30v10c0 5 5.4 9 12 9s12-4 12-9V30" stroke="#0f1c6f" strokeWidth="2.5"/>
                                            <path d="M56 24v12" stroke="#b8860b" strokeWidth="2.5"/>
                                            <circle cx="56" cy="38" r="2" fill="#b8860b"/>
                                        </svg>
                                    </div>
                                    <h3><a href="/academics">Skill-Focused Learning</a></h3>
                                    <p>Industry-aligned curriculum, hands-on training, and expert mentorship help students build real-world skills that make them job-ready from day one of graduation.</p>
                                    <a className="read-more-btn" href="/academics"><i className="fa-solid fa-angles-right"></i></a>
                                </div>
                            </div>

                            {/* Card 2 — Hi-Tech Laboratories */}
                            <div className="card-column">
                                <div className="card-details">
                                    <div className="card-icons">
                                        {/* Computer / Lab Monitor — Hi-Tech Laboratories */}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#0f1c6f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="64" height="64">
                                            <rect x="6" y="8" width="52" height="34" rx="3" fill="#0f1c6f" fillOpacity="0.1" stroke="#0f1c6f"/>
                                            <line x1="6" y1="34" x2="58" y2="34" stroke="#0f1c6f"/>
                                            <line x1="32" y1="42" x2="32" y2="54" stroke="#b8860b" strokeWidth="2.5"/>
                                            <line x1="20" y1="54" x2="44" y2="54" stroke="#b8860b" strokeWidth="2.5"/>
                                            <polyline points="16,20 22,26 16,32" stroke="#b8860b" strokeWidth="2"/>
                                            <line x1="26" y1="32" x2="36" y2="32" stroke="#0f1c6f" strokeWidth="2"/>
                                        </svg>
                                    </div>
                                    <h3><a href="/facilities">Hi-Tech Laboratories</a></h3>
                                    <p>State-of-the-art computer labs, science labs, and a fully automated digital library give students access to the latest tools and technology for practical, research-driven education.</p>
                                    <a className="read-more-btn" href="/facilities"><i className="fa-solid fa-angles-right"></i></a>
                                </div>
                            </div>

                            {/* Card 3 — Campus Life & Placements */}
                            <div className="card-column">
                                <div className="card-details">
                                    <div className="card-icons">
                                        {/* Campus Building — Vibrant Campus & Placements */}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#0f1c6f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="64" height="64">
                                            <rect x="8" y="22" width="20" height="34" fill="#0f1c6f" fillOpacity="0.1" stroke="#0f1c6f"/>
                                            <rect x="28" y="10" width="28" height="46" fill="#0f1c6f" fillOpacity="0.07" stroke="#0f1c6f"/>
                                            <line x1="8" y1="56" x2="56" y2="56" stroke="#0f1c6f"/>
                                            <rect x="33" y="28" width="8" height="8" fill="#b8860b" fillOpacity="0.5" stroke="#b8860b" strokeWidth="1.5"/>
                                            <rect x="45" y="28" width="8" height="8" fill="#b8860b" fillOpacity="0.5" stroke="#b8860b" strokeWidth="1.5"/>
                                            <rect x="33" y="40" width="8" height="8" fill="#b8860b" fillOpacity="0.5" stroke="#b8860b" strokeWidth="1.5"/>
                                            <rect x="45" y="40" width="8" height="8" fill="#b8860b" fillOpacity="0.5" stroke="#b8860b" strokeWidth="1.5"/>
                                            <rect x="12" y="30" width="7" height="7" stroke="#b8860b" strokeWidth="1.5"/>
                                            <rect x="12" y="42" width="7" height="7" stroke="#b8860b" strokeWidth="1.5"/>
                                        </svg>
                                    </div>
                                    <h3><a href="/placement">Vibrant Campus & Placements</a></h3>
                                    <p>A lively campus with sports, cultural clubs, and annual events — combined with a dedicated Placement Cell that actively connects students with top companies across Tamil Nadu and beyond.</p>
                                    <a className="read-more-btn" href="/placement"><i className="fa-solid fa-angles-right"></i></a>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </React.Fragment>

    );
}

export default AcademicsCards;
