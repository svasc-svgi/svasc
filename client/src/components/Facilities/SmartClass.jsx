import React, { useState, useEffect } from 'react';
import styles from './SmartClass.module.css';
import Hero from '../Common/Hero';

const SmartClass = () => {
    const images = [
        "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=800&q=80"
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <>
            <Hero
                title="Smart Wall Class Rooms"
                description="Technology-enabled learning spaces for futuristic education"
                image="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1600&q=80"
            />
            <section className={styles.section}>
                <div className={styles.container}>
                    <h1 className={styles.mainHeading}>Smart Wall Class Rooms</h1>
                    <p className={styles.subText}>
                        Technology-enabled learning spaces designed to enhance understanding, engagement, and academic excellence.
                    </p>

                    <div className={styles.contentGrid}>
                        {/* LEFT CONTENT */}
                        <div className={styles.leftColumn}>
                            <h2 className={styles.sideHeading}>
                                Futuristic Smart Learning Environment
                            </h2>

                            <p className={styles.description}>
                                Our Smart Wall Classrooms are equipped with interactive digital boards,
                                advanced audio-visual systems, and multimedia learning tools that make
                                teaching more effective and student-centric. These classrooms promote
                                better concept visualization, collaborative learning, and an immersive
                                academic experience across the campus.
                            </p>

                            <a href="#" className={styles.ctaButton}>
                                Explore Facilities
                            </a>
                        </div>

                        {/* RIGHT IMAGE CAROUSEL */}
                        <div className={styles.rightColumn}>
                            <div className={styles.carouselContainer}>
                                <div
                                    className={styles.carouselTrack}
                                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                >
                                    {images.map((src, index) => (
                                        <div key={index} className={styles.slide}>
                                            <img src={src} alt={`Smart Classroom ${index + 1}`} className={styles.slideImage} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* FLOATING BOX 1 */}
                            <div className={styles.floatingBox1}>
                                <img src="https://randomuser.me/api/portraits/men/22.jpg" alt="User" className={styles.floatingAvatar} />
                                <div>
                                    <h3 className={styles.floatingName}>antone heller</h3>
                                    <span className={styles.floatingRating}>⭐ 4.8</span>
                                </div>
                            </div>

                            {/* FLOATING BOX 2 */}
                            <div className={styles.floatingBox2}>
                                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80" alt="User" className={styles.floatingAvatar} />
                                <div>
                                    <h3 className={styles.floatingName}>chaya bradtke</h3>
                                    <span className={styles.floatingRating}>⭐ 5.0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* The original code had an extra closing parenthesis and semicolon here, which is incorrect.
                The instruction implies the closing fragment should be after the return statement's content.
                I'm correcting the syntax here to make the code valid. */}
        </>
    );
};

export default SmartClass;
