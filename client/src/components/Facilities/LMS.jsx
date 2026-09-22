import React from 'react';
import styles from './LMS.module.css';
import Hero from '../Common/Hero';

import learningImg from '../../assets/learning.jpg';
import learn1Img from '../../assets/learn1.jpg';
import libImg from '../../assets/lib.jpg';

const LMS = () => {
    const images = [
        learn1Img,
        libImg
    ];

    return (
        <>
            <Hero
                title="Learning Management System"
                description="Streamlining Communication and Academic Excellence"
                image={learningImg}
            />
            <section className={styles.section}>

                <div className={styles.container}>
                    {/* LEFT: MOVING IMAGES */}
                    <div className={styles.leftColumn}>
                        <div className={styles.carouselWrapper}>
                            <div className={styles.carousel}>
                                {/* Render images twice for seamless infinite loop */}
                                {[...images, ...images].map((src, index) => (
                                    <div key={index} className={styles.slide}>
                                        <img
                                            src={src}
                                            className={styles.image}
                                            alt={`Learning Management System ${(index % images.length) + 1}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: CONTENT */}
                    <div className={styles.rightColumn}>
                        <h2 className={styles.heading}>
                            Learning Management Systems
                        </h2>

                        {/* YELLOW LINE */}
                        <div className={styles.yellowLine}></div>

                        <p className={styles.description}>
                            We utilize the CAMU software as part of our Learning Management System
                            to streamline communication and monitor student activities.
                        </p>

                        {/* POINTS */}
                        <ul className={styles.pointsList}>
                            <li className={styles.point}>
                                <span className={styles.bullet}>»</span>
                                <span>Each student is registered on the platform during admission.</span>
                            </li>

                            <li className={styles.point}>
                                <span className={styles.bullet}>»</span>
                                <span>
                                    The app provides updates on assignments, homework, events,
                                    holidays, and department activities.
                                </span>
                            </li>

                            <li className={styles.point}>
                                <span className={styles.bullet}>»</span>
                                <span>
                                    Parents are also connected to this platform, allowing them to
                                    monitor their child's attendance in real time. Attendance is
                                    recorded for every period and shared instantly, fostering
                                    transparency and accountability.
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
};

export default LMS;
