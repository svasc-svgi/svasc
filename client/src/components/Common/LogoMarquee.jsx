import React from 'react';
import styles from './LogoMarquee.module.css';

const LogoMarquee = ({ logos, speed = '30s', direction = 'left' }) => {
    // Double the logos for a seamless loop
    const displayLogos = [...logos, ...logos];

    return (
        <div className={styles.marqueeContainer}>
            <div
                className={styles.marqueeContent}
                style={{
                    animationDuration: speed,
                    animationDirection: direction === 'right' ? 'reverse' : 'normal'
                }}
            >
                {displayLogos.map((logo, index) => (
                    <div key={`${logo.name}-${index}`} className={styles.logoItem}>
                        <div className={styles.logoBox} style={{ color: logo.color }}>
                            {logo.src ? (
                                <img src={logo.src} alt={logo.name} className={styles.logoImage} />
                            ) : (
                                logo.name
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LogoMarquee;
