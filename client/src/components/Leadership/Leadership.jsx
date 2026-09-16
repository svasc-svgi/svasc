import React from 'react';
import styles from './Leadership.module.css';

const Leadership = ({ designation, name, qualification, image, quote, children }) => {
    return (
        <div className={styles.main}>
            {/* Circle Background */}
            <div className={`${styles.circle1} ${styles.circleOpacity}`}></div>
            <div className={`${styles.circle2_1} ${styles.circleOpacity}`}></div>
            <div className={styles.circle2_2}></div>
            <div className={`${styles.circle3} ${styles.circleOpacity}`}></div>
            <div className={`${styles.circle4} ${styles.circleOpacity}`}></div>
            <div className={`${styles.circle5_1} ${styles.circleOpacity}`}></div>
            <div className={styles.circle5_2}></div>
            <div className={`${styles.circle6} ${styles.circleOpacity}`}></div>
            <div className={`${styles.circle7} ${styles.circleOpacity}`}></div>

            {/* Content Section */}
            <div className={styles.contentWrapper}>
                <div className={styles.contentContainer}>
                    {/* Left Content - Text */}
                    <div className={styles.leftContent}>
                        <div className={styles.textContent}>
                            {children}
                        </div>
                    </div>

                    {/* Right Content - Profile */}
                    <div className={styles.rightContent}>
                        <div className={styles.headerInfo}>
                            <h3 className={styles.designation}>{designation}</h3>
                            <h2 className={styles.name}>{name}</h2>
                            <h3 className={styles.qualification}>{qualification}</h3>
                        </div>

                        <div className={styles.imageContainer}>
                            <img
                                src={image}
                                alt={name}
                                className={styles.principalImage}
                            />
                        </div>

                        <p className={styles.quote}>
                            {quote}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Leadership;

