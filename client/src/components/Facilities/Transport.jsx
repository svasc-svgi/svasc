import React from 'react';
import { MapPin } from 'lucide-react';
import styles from './Transport.module.css';
import Hero from '../Common/Hero';
import busVideo from '../../assets/bus.mp4';
import bus1Img from '../../assets/bus1.jpg';
import bus2Img from '../../assets/bus2.jpg';
import bus3Img from '../../assets/bus3.jpg';

const Transport = () => {
    const routes = [
        ['Palakkad', 'Perungottukurussi', 'Vadakenchery', 'Chelakkara', 'Cherplasserry'],
        ['Shoranur', 'Mannarkad', 'Mannarkad', 'Mangalamdam', 'Meenkara via Kollengode', 'Coimbatore'],
        ['Tiruvillamala', 'Malampuzha', 'Nemmara', 'Vandithavalam', 'Tiruppur']
    ];

    return (
        <>
            <Hero
                title="Free Bus Transport"
                description="Safe and comfortable commuting for all students"
                video={busVideo}
            />
            <div className={styles.transportContainer}>
                <div className={styles.container}>
                    <h1 className={styles.mainTitle}>Free Bus Transport</h1>

                    <p className={styles.description}>
                        SVASC offers free bus transport facilities to ensure students travel safely and comfortably to and from the campus.
                        The transport system is designed to cover major routes, nearby towns, and surrounding rural areas, making daily commuting easy and reliable.

                        The bus service operates on a fixed schedule to support punctuality and regular attendance.
                        This initiative reduces travel expenses for students, promotes safety, and provides a stress-free commuting experience throughout the academic year.

                        Well-maintained buses, experienced drivers, and organized routes make the transport facility a dependable service for all students.
                    </p>

                    {/* Gallery */}
                    <div className={styles.galleryGrid}>
                        <figure className={styles.galleryFrame}>
                            <img
                                className={styles.galleryImg}
                                src={bus1Img}
                                alt="SVASC college bus"
                            />
                        </figure>

                        <figure className={styles.galleryFrame}>
                            <img
                                className={styles.galleryImg}
                                src={bus2Img}
                                alt="College transport facility"
                            />
                            <div className={styles.bigText}>
                                234<br />Bus<br />Facilities
                            </div>
                        </figure>

                        <figure className={styles.galleryFrame}>
                            <img
                                className={styles.galleryImg}
                                src={bus3Img}
                                alt="Student bus service"
                            />
                        </figure>
                    </div>

                    {/* Bus Routes Section */}
                    <div className={styles.routesContainer}>
                        <div className={styles.sectionTitle}>Bus Routes</div>

                        <div className={styles.routesGrid}>
                            {routes.map((column, colIndex) => (
                                <ul key={colIndex} className={styles.routeList}>
                                    {column.map((route, index) => (
                                        <li key={index}>
                                            <MapPin className={styles.routeIcon} />
                                            <span>{route}</span>
                                        </li>
                                    ))}
                                </ul>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Transport;
