import React from 'react';
import styles from './Cafeteria.module.css';
import Hero from '../Common/Hero';

const Cafeteria = () => {
    return (
        <>
            <Hero
                title="SVASC Cafeteria"
                description="Quality, Hygiene, and Affordability"
                image="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80"
            />
            <main className={styles.container}>
                {/* LEFT CONTENT */}
                <div className={styles.leftContent}>
                    <h1 className={styles.title}>Cafeteria</h1>
                    <p className={styles.description}>
                        Our cafeteria operates from <b>8:00 AM to 6:00 PM</b>, catering to both day scholars
                        and hostel students. The SVASC canteen maintains high standards of hygiene, quality,
                        and affordability to meet student needs.
                        <br /><br />
                        Nutritious meals, snacks, and beverages are prepared in a clean and student-friendly
                        environment. The canteen also promotes experiential learning by supporting
                        student-run food stalls under faculty supervision, making it both a dining and
                        learning space.
                    </p>
                </div>

                {/* RIGHT GRID */}
                <div className={styles.rightGrid}>
                    {/* COLUMN 1 */}
                    <div className={styles.column1}>
                        <div className={styles.imageCard}>
                            <img
                                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"
                                className={styles.image}
                                alt="Cafeteria"
                            />
                        </div>

                        {/* LUNCH */}
                        <div className={styles.lunchCard}>
                            <h3 className={styles.cardTitle}>Lunch</h3>
                            <p className={styles.cardText}>
                                Both vegetarian and non-vegetarian meals are prepared fresh and served to
                                students, ensuring balanced nutrition, taste, and quality.
                            </p>
                        </div>
                    </div>

                    {/* COLUMN 2 */}
                    <div className={styles.column2}>
                        {/* MORNING */}
                        <div className={styles.morningCard}>
                            <h3 className={styles.cardTitle}>Morning</h3>
                            <p className={styles.cardText}>
                                Breakfast is available along with hot or cold drinks according to students'
                                preferences, providing a healthy and energetic start to the day.
                            </p>
                        </div>

                        <div className={styles.imageCard}>
                            <img
                                src="https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=600&q=80"
                                className={styles.image}
                                alt="Dining"
                            />
                        </div>
                    </div>

                    {/* COLUMN 3 */}
                    <div className={styles.column3}>
                        <div className={`${styles.imageCard} ${styles.imageCardSmall}`}>
                            <img
                                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
                                className={styles.image}
                                alt="Snacks"
                            />
                        </div>

                        {/* EVENING */}
                        <div className={styles.eveningCard}>
                            <div className={styles.circleDecor1}></div>
                            <div className={styles.circleDecor2}></div>

                            <div className={styles.eveningContent}>
                                <p className={styles.eveningText}>
                                    Evening snacks, hot &amp; cold drinks, and packed eatables are available.
                                    CSHM students run a "Kappa Chakka" stall under faculty supervision, offering
                                    international cuisines. Vending machines are installed for quick access.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Cafeteria;
