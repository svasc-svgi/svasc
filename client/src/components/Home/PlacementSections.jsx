import React from 'react';
import './PlacementSections.css';
import hero6Image from '../../assets/HERO6.jpg';

const PlacementSections = () => {
    const logos = [
        "/comapanies/tcs.jpg",
        "/comapanies/mrf.jpg",
        "/comapanies/nokia.png",
        "/comapanies/tata elctornics.jpg",
        "/comapanies/muthoot finance.png",
        "/comapanies/foxconn.png",
        "/comapanies/motherson.png",
        "/comapanies/kgis.png",
        "/comapanies/smarttail.png",
        "/comapanies/jilaba.png",
        "/comapanies/scm.png",
        "/comapanies/clarus.jpg",
        "/comapanies/cognicent.jpg",
        "/comapanies/rinex.png",
        "/comapanies/sakthiauto.png",
        "/comapanies/spaperals.jpg"
    ];

    return (
        <div id="placement-sections-wrapper">
            {/* Banner Section */}
            <section className="placement-banner-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 placement-banner-info">
                            <h6 className='text-center'>Our Prestigious Hiring Partners</h6>
                            <h1 className='text-center'>Empowering Students for Successful Careers</h1>
                            <p className='text-center'>At SVASC Erode, we bridge the gap between education and employment. Our dedicated placement cell works tirelessly to connect talented students with leading companies across various industries, ensuring bright career prospects and professional growth.</p>
                            <div className="placement-header-btn text-center">
                                <a className="btn btn-primary btn-lg" href="#">View more</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Logo Slider Section */}
            <section className="placement-logo-section">
                <div className="container-fluid">
                    <div className="placement-logo-slider">
                        {[...logos, ...logos].map((src, index) => (
                            <div className="placement-logo-item" key={index}>
                                <img src={src} alt={`Company ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="placement-about-section py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="placement-about-img">
                                <img src="/svgi image.png" alt="Campus" />
                                <div className="placement-about-text">
                                    <div className="placement-about-text-inner">
                                        <h1>20</h1>
                                        <p>Years Of Experience</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="placement-finix-text">
                                <h6 className='text-center'>SVASC Erode</h6>
                                <h1 className='text-center'>Experience campus life at the Best college of Arts and Science in Erode</h1>
                                <p className='text-center'>At SVASC College of Arts & Science, Erode, campus life is a vibrant mix of academics, innovation, and celebration. From cultural festivals and student clubs to leadership programs and sports, we create opportunities for students to explore, grow, and thrive.</p>
                                <p className='text-center'>Our green, modern campus offers inspiring spaces to learn and connect. Whether it's participating in hackathons, workshops, or intercollegiate events, students at SVASC enjoy a supportive environment that nurtures talent and lifelong friendships.</p>
                                <p className='text-center'><strong>SVASC is not just an institution—it's a community that makes every moment on campus meaningful and unforgettable.</strong></p>
                                <ul className="placement-finix-menu">
                                    <li>Useful info</li>
                                    <li>Reliability</li>
                                    <li>Innovation</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="placement-why-choose-us-section bg-white py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="placement-choose-us-text">
                                <div className="placement-finix-text">
                                    <h6 className='text-center'>Why SVASC College Stands Out in Erode</h6>
                                    <h1 className='text-center'>Why people choose us</h1>
                                    <p className='text-center'>SVASC College is a Best arts and science college Erode offers dynamic programs in arts and science, including specialized courses in computer applications, catering science, and augmented reality (AR).</p>
                                </div>
                                <div className="placement-choose-us-img">
                                    <img src={hero6Image} alt="Why choose us" />
                                    <div className="placement-choose-icon">
                                        <a href="#"><span><i className="fas fa-play-circle"></i></span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="placement-choose-us-items text-center">
                                        <div className="placement-choose-us-item">
                                            <span><i className="fas fa-graduation-cap"></i></span>
                                            <h1>Academic Excellence</h1>
                                            <p>SVASC College is a Best arts and science college Erode offers dynamic programs in arts and science, including specialized courses in computer applications, catering science, and augmented reality (AR).</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="placement-choose-us-items text-center">
                                        <div className="placement-choose-us-item">
                                            <span><i className="fas fa-lightbulb"></i></span>
                                            <h1>Innovation-Driven Curriculum</h1>
                                            <p>We stay ahead of the curve with a flexible, tech-integrated curriculum that prepares students for modern career paths through practical learning and cutting-edge tools. Top UG college in Erode</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="placement-choose-us-items text-center">
                                        <div className="placement-choose-us-item">
                                            <span><i className="fas fa-briefcase"></i></span>
                                            <h1>Placement Powerhouse</h1>
                                            <p>Our strong placement cell connects students with top companies through campus drives, internships, and career mentoring—making SVASC a leading college for career readiness in Erode.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="placement-choose-us-items text-center">
                                        <div className="placement-choose-us-item">
                                            <span><i className="fas fa-users"></i></span>
                                            <h1>Beyond the Classroom</h1>
                                            <p>Life at SVASC is vibrant and engaging—with leadership programs, clubs, sports, and cultural events shaping confident, well-rounded graduates.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PlacementSections;
