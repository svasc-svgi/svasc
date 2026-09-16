import React, { useState, useEffect } from 'react';
import Hero from '../components/Common/Hero';
import styles from './Sports.module.css';
import sportsHeroImage from '../assets/sporthero1.jpg';
import { getSportHouses, getSportsPageHero } from '../services/sportsService';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const fallbackHero = {
    image: sportsHeroImage,
    title: "SVASC Sports",
    description: "Excellence • Discipline • Sportsmanship"
};

const fallbackHouses = [
    {
        _id: '1',
        name: 'House 1',
        subtitle: 'Warriors',
        image: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg',
        description: 'Excellence in Athletics'
    },
    {
        _id: '2',
        name: 'House 2',
        subtitle: 'Champions',
        image: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg',
        description: 'Mastery in Sports',
        offset: true
    },
    {
        _id: '3',
        name: 'House 3',
        subtitle: 'Titans',
        image: 'https://images.pexels.com/photos/1432039/pexels-photo-1432039.jpeg',
        description: 'Victory & Pride'
    },
    {
        _id: '4',
        name: 'House 4',
        subtitle: 'Legacy',
        image: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/30104e3c-5eea-4b93-93e9-5313698a7156_1600w.webp',
        description: 'Tradition & Excellence',
        custom: true,
        offset: true
    }
];

const fallbackImages = [
    'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg',
    'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg',
    'https://images.pexels.com/photos/1432039/pexels-photo-1432039.jpeg'
];

const SVASCSports = () => {
    const [heroData, setHeroData] = useState(fallbackHero);
    const [sportHouses, setSportHouses] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSportsData = async () => {
            try {
                // Fetch Page Hero
                try {
                    const heroRes = await getSportsPageHero();
                    const data = heroRes?.data ?? heroRes;
                    if (data && data.title) {
                        const cleanImg = (data.image || '').replace(/^\/+/, '');
                        setHeroData({
                            title: data.title || fallbackHero.title,
                            description: data.description || fallbackHero.description,
                            image: data.image?.startsWith('http') ? data.image : `${BASE_URL}/${cleanImg}`
                        });
                    }
                } catch (e) {
                    console.log("Using fallback hero for sports page");
                }

                // Fetch Houses
                try {
                    const housesRes = await getSportHouses();
                    const housesList = housesRes?.data ?? (Array.isArray(housesRes) ? housesRes : []);
                    if (housesList.length > 0) {
                        const mapped = housesList.map(house => {
                            const cleanImg = (house.image || '').replace(/^\/+/, '');
                            return {
                                ...house,
                                image: house.image?.startsWith('http') ? house.image : `${BASE_URL}/${cleanImg}`
                            };
                        });
                        setSportHouses(mapped);
                    } else {
                        setSportHouses(fallbackHouses);
                    }
                } catch (e) {
                    setSportHouses(fallbackHouses);
                }

            } catch (err) {
                console.error("Error fetching sports page data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSportsData();
    }, []);

    // Image carousel effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % fallbackImages.length);
        }, 4200);

        return () => clearInterval(interval);
    }, []);

    const outdoorSports = [
        'Athletics',
        'Basketball',
        'Football',
        'Volleyball',
        'Cricket',
        'Kabaddi'
    ];

    const indoorSports = [
        'Table Tennis',
        'Badminton',
        'Chess',
        'Carrom'
    ];

    if (loading) {
        return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', color: '#111' }}>Loading Sports Page...</div>;
    }

    return (
        <div className={styles['svasc-sports-root']}>
            <Hero
                title={heroData.title}
                description={heroData.description}
                image={heroData.image}
                bgPosition="center 30%"
            />

            {/* ABOUT SECTION */}
            <section className={styles['svasc-sports-about']}>
                <div className={styles['svasc-sports-about-container']}>
                    <div className={styles['svasc-sports-about-row']}>

                        {/* TEXT CONTENT */}
                        <div className={styles['svasc-sports-about-text']}>
                            <div className={styles['svasc-sports-about-label']}>About SVASC Sports</div>

                            <h2 className={styles['svasc-sports-about-title']}>
                                Sports Excellence at <span className={styles['svasc-sports-gold-text']}>SVASC</span>
                            </h2>

                            <p className={styles['svasc-sports-about-description']}>
                                Shree Venkateshwara Arts and Science College is deeply committed to nurturing
                                sporting talent alongside academic excellence.
                            </p>

                            <p className={styles['svasc-sports-about-description']}>
                                With modern infrastructure, professional coaching, and continuous support
                                for university, state, and national competitions — SVASC empowers students
                                to become champions in sports and life.
                            </p>
                        </div>

                        {/* IMAGE WITH CAROUSEL */}
                        <div className={styles['svasc-sports-about-image']}>
                            <div className={styles['svasc-sports-image-container']}>
                                <img
                                    src={fallbackImages[currentImageIndex]}
                                    alt="SVASC Sports"
                                    className={styles['svasc-sports-carousel-image']}
                                    key={currentImageIndex}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* SPORTS CATEGORIES SECTION */}
            <section className={styles['svasc-sports-categories']}>
                <div className={styles['svasc-sports-categories-bg']}>
                    <img
                        src="https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg"
                        alt="Sports Background"
                    />
                </div>
                <div className={styles['svasc-sports-categories-overlay']}></div>

                <div className={styles['svasc-sports-categories-container']}>
                    <div className={styles['svasc-sports-categories-grid']}>

                        {/* OUTDOOR SPORTS */}
                        <div className={styles['svasc-sports-category-column']}>
                            <h2 className={styles['svasc-sports-category-title']}>Outdoor Sports</h2>
                            <div className={styles['svasc-sports-category-list']}>
                                {outdoorSports.map((sport, index) => (
                                    <div key={index} className={styles['svasc-sports-category-item']}>
                                        » {sport}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* INDOOR SPORTS */}
                        <div className={styles['svasc-sports-category-column']}>
                            <h2 className={styles['svasc-sports-category-title']}>Indoor Sports</h2>
                            <div className={styles['svasc-sports-category-list']}>
                                {indoorSports.map((sport, index) => (
                                    <div key={index} className={styles['svasc-sports-category-item']}>
                                        » {sport}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* SPORT HOUSES SECTION */}
            <section className={styles['svasc-sports-houses']}>
                <div className={styles['svasc-sports-houses-container']}>

                    <div className={styles['svasc-sports-houses-header']}>
                        <span className={styles['svasc-sports-houses-label']}>SVASC Sport Houses</span>
                        <h2 className={styles['svasc-sports-houses-title']}>The 4 houses of our College</h2>
                    </div>

                    <div className={styles['svasc-sports-houses-grid']}>
                        {sportHouses.map((house) => (
                            <div
                                key={house._id || house.id}
                                className={`${styles['svasc-sports-house-card']} ${house.offset ? styles['svasc-sports-house-offset'] : ''}`}
                            >
                                <div className={styles['svasc-sports-house-image-container']}>
                                    {house.custom && (
                                        <div className={styles['svasc-sports-house-custom-overlay']}>
                                            <span className={styles['svasc-sports-house-custom-badge']}>Custom Build</span>
                                        </div>
                                    )}
                                    <img
                                        src={house.image}
                                        alt={house.name}
                                        className={`${styles['svasc-sports-house-image']} ${house.custom ? styles['svasc-sports-house-image-grayscale'] : ''}`}
                                    />
                                </div>
                                <div className={styles['svasc-sports-house-info']}>
                                    <div className={styles['svasc-sports-house-header-row']}>
                                        <h3 className={styles['svasc-sports-house-name']}>{house.name}</h3>
                                        <span className={styles['svasc-sports-house-subtitle']}>{house.subtitle}</span>
                                    </div>
                                    <div className={styles['svasc-sports-house-footer-row']}>
                                        <span className={styles['svasc-sports-house-description']}>{house.description}</span>
                                        <span className={styles['svasc-sports-house-status']}>{house.custom ? 'Inquire' : 'Active'}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </div>
    );
};

export default SVASCSports;