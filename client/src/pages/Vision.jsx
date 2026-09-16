import React, { useEffect, useRef } from 'react';
import styles from './Vision.module.css';
import exam4Img from '../assets/exam4.jpg';
import heroCampusImg from '../assets/home5.jpg';
import drawing from '../assets/drawing.jpg'
import teaching from '../assets/teaching.jpg'
import lab3 from '../assets/lab3.jpg'

const Vision = () => {
    const contentRef = useRef(null);
    const blocksRef = useRef([]);

    useEffect(() => {
        const handleScroll = () => {
            if (!contentRef.current) return;

            blocksRef.current.forEach((block, i) => {
                if (!block) return;
                const rect = block.getBoundingClientRect();
                const contentNode = block.querySelector(`.${styles.itemParallaxContent}`);
                const imgNode = block.querySelector('img');

                // Calculate parallax value based on position relative to viewport
                const yPos = rect.top;

                // Only animate if somewhat visible to save resources
                if (yPos > -window.innerHeight && yPos < window.innerHeight * 2) {
                    if (contentNode) {
                        // Different speed for content
                        contentNode.style.transform = `translateY(${yPos * 0.5}px)`;
                    }
                    if (imgNode) {
                        // Different speed for image
                        imgNode.style.transform = `translateY(${yPos * 0.1}px)`;
                    }
                }
            });
        };

        // Add global scroll listener for the parallax effect if the page scrolls naturally
        // Or if we want to mimic the logic from the HTML which seemed to use a loop

        window.addEventListener('scroll', handleScroll);
        // Trigger once on mount
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const addToBlocks = (el) => {
        if (el && !blocksRef.current.includes(el)) {
            blocksRef.current.push(el);
        }
    };

    return (
        <div className={styles.visionPageWrapper}>
            <div className={styles.visionContent} ref={contentRef}>

                {/* 1. VISION LANDING */}
                <section className={`${styles.visionBlock} ${styles.sectionLanding}`} ref={addToBlocks}>
                    <figure className={styles.itemParallaxMedia}>
                        <img src={exam4Img} alt="Vision Hero" />
                    </figure>
                    <div className={`${styles.itemParallaxContent} ${styles.flexContainer}`}>
                        <div className={`${styles.landingContent} ${styles.centeredContent}`}>
                            <h1 className={styles.headLarge}>VISION</h1>
                        </div>
                    </div>
                </section>

                {/* 2. VISION TEXT */}
                <section className={`${styles.visionBlock} ${styles.sectionIntro}`} ref={addToBlocks}>
                    <div className={`${styles.itemParallaxContent} ${styles.flexContainer}`}>
                        <div className={styles.centeredContent}>
                            <h2 className={`${styles.headSmall} ${styles.headCentered}`}>Our Aspiration</h2>
                            <p className={styles.copy}>
                                To inspire creativity, nurture artistic talent and promote cultural appreciation by providing a vibrant platform where students can explore, express and excel in diverse forms of art, contributing to personal growth and the enrichment of the college community.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 3. MISSION */}
                <section className={styles.visionBlock} ref={addToBlocks}>
                    <figure className={styles.itemParallaxMedia}>
                        <img src={heroCampusImg} alt="SVASC Mission" />
                    </figure>
                    <div className={`${styles.itemParallaxContent} ${styles.flexContainer}`}>
                        <div className={styles.centeredContent}>
                            <h1 className={`${styles.headLarge} ${styles.headCentered}`} style={{ fontSize: '7vw' }}>MISSION</h1>
                            <div className={`${styles.copy} ${styles.missionText}`} style={{ color: 'white', background: 'rgba(0,0,0,0.5)', padding: '30px', borderRadius: '12px', maxWidth: '700px' }}>
                                <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'left', margin: 0 }}>
                                    <li style={{ marginBottom: '15px', fontSize: '1.25rem', display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#ffc100', marginRight: '10px' }}>✦</span> To Identify and nurture students' artistic talents.</li>
                                    <li style={{ marginBottom: '15px', fontSize: '1.25rem', display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#ffc100', marginRight: '10px' }}>✦</span> To Encourage participation in intercollegiate and national-level art competitions.</li>
                                    <li style={{ marginBottom: '15px', fontSize: '1.25rem', display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#ffc100', marginRight: '10px' }}>✦</span> To Promote creativity, innovation and aesthetic appreciation.</li>
                                    <li style={{ marginBottom: '15px', fontSize: '1.25rem', display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#ffc100', marginRight: '10px' }}>✦</span> To Provide opportunities for artistic expression through visual and performing arts.</li>
                                    <li style={{ marginBottom: 0, fontSize: '1.25rem', display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#ffc100', marginRight: '10px' }}>✦</span> To Foster teamwork, leadership and communication skills through club activities.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. OBJECTIVES GRID */}
                <section className={styles.visionBlock} ref={addToBlocks}>
                    <div className={`${styles.itemParallaxContent} ${styles.flexContainer} ${styles.imgGrid}`}>

                        <figure className={`${styles.imgGridItem} ${styles.typeRight}`}>
                            <img src={teaching} alt="Performing Arts" />
                            <figcaption className={styles.imgCaption}>
                                <h2 className={styles.headSmall}>Integrity & Ethics</h2>
                                <p className={styles.captionText}>
                                    We identify, nurture and develop student talents across visual, literary, and performing arts.
                                </p>
                            </figcaption>
                        </figure>

                        <figure className={`${styles.imgGridItem} ${styles.typeLeft}`}>
                            <img src={lab3} />
                            <figcaption className={styles.imgCaption}>
                                <h2 className={styles.headSmall}>Excellence & Inclusion</h2>
                                <p className={styles.captionText}>
                                    Providing creative outlets for students to express ideas, emotions, and personal viewpoints.
                                </p>
                            </figcaption>
                        </figure>

                    </div>
                </section>

                {/* 5. END SECTION */}
                <section className={`${styles.visionBlock} ${styles.sectionEnd}`} ref={addToBlocks}>
                    <figure className={styles.itemParallaxMedia}>
                        <img src={drawing} alt="Objectives Landing" />
                    </figure>
                    <div className={`${styles.itemParallaxContent} ${styles.flexContainer}`}>
                        <div className={`${styles.landingContent} ${styles.centeredContent}`}>
                            <h1 className={styles.headLarge}>SVASC <br /> Core Values</h1>
                        </div>
                    </div>
                </section>

                {/* 6. DETAILED CLUB OBJECTIVES */}
                <section className={styles.coreSection}>
                    <div className={styles.smallHeading}>Our Core Values</div>
                    <div className={styles.mainHeading}>Core Values & Beliefs</div>

                    <div className={styles.valuesWrapper}>
                        <div className={styles.valueCircle}>
                            <div className={styles.icon}>
                                <svg viewBox="0 0 24 24">
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#000" strokeWidth="2"/>
                                    <path d="M12 8V16" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
                                    <path d="M8 12H16" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </div>
                            <p>Identify & Nurture<br />Artistic Talents</p>
                        </div>

                        <div className={styles.valueCircle}>
                            <div className={styles.icon}>
                                <svg viewBox="0 0 24 24">
                                    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M20 12h-1M4 12H3m3.343-5.657l.707.707m2.818 10.865a6.002 6.002 0 0011.664-2.222c0-3.313-2.686-6-6-6s-6 2.687-6 6c0 1.34.44 2.576 1.182 3.585z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <p>Creative Platform<br />for Student Ideas</p>
                        </div>

                        <div className={styles.valueCircle}>
                            <div className={styles.icon}>
                                <svg viewBox="0 0 24 24">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="#000" strokeWidth="2"/>
                                </svg>
                            </div>
                            <p>Promote Art &<br />Culture Appreciation</p>
                        </div>

                        <div className={styles.valueCircle}>
                            <div className={styles.icon}>
                                <svg viewBox="0 0 24 24">
                                    <path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" stroke="#000" strokeWidth="2"/>
                                    <path d="M16 2v4M8 2v4M3 10h18" stroke="#000" strokeWidth="2"/>
                                </svg>
                            </div>
                            <p>Workshops, Rallies<br />& Competitions</p>
                        </div>

                        <div className={styles.valueCircle}>
                            <div className={styles.icon}>
                                <svg viewBox="0 0 24 24">
                                    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="#000" strokeWidth="2"/>
                                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="#000" strokeWidth="2"/>
                                </svg>
                            </div>
                            <p>State & National<br />Level Showcases</p>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default Vision;
