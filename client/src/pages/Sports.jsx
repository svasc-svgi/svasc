import React, { useState, useEffect } from 'react';
import Hero from '../components/Common/Hero';
import styles from './Sports.module.css';
import sportsHeroImage from '../assets/sporthero1.jpg';
import { getSportHouses, getSportsPageHero, getSportsDay } from '../services/sportsService';

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

const fallbackSportsDay = {
    title: "Sports Day",
    subtitle: "Annual Athletic Meet",
    description: "The Annual Sports Day at Shree Venkateshwara Arts and Science College is a grand celebration of athletic prowess, endurance, and team spirit. Students across all houses compete passionately in an inspiring array of track and field events, relay races, and championship tournaments. Fostering camaraderie, discipline, and healthy sportsmanship, the meet serves as a testament to our ongoing pursuit of physical well-being and collegiate excellence.",
    pdfTitle: "Sports Day Event Schedule & Guidelines",
    pdfUrl: ""
};

const SVASCSports = () => {
    const [heroData, setHeroData] = useState(() => {
        try {
            const cached = localStorage.getItem('svasc_cached_sports_hero');
            if (cached) return JSON.parse(cached);
        } catch (e) {}
        return fallbackHero;
    });
    const [sportHouses, setSportHouses] = useState(() => {
        try {
            const cached = localStorage.getItem('svasc_cached_sports_houses');
            if (cached) return JSON.parse(cached);
        } catch (e) {}
        return fallbackHouses;
    });
    const [sportsDayData, setSportsDayData] = useState(() => {
        try {
            const cached = localStorage.getItem('svasc_cached_sports_day');
            if (cached) return JSON.parse(cached);
        } catch (e) {}
        return fallbackSportsDay;
    });
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

                // Fetch Sports Day
                try {
                    const dayRes = await getSportsDay();
                    const dayData = dayRes?.data ?? dayRes;
                    if (dayData && (dayData.description || dayData.title || dayData.pdfUrl)) {
                        setSportsDayData({
                            title: dayData.title || fallbackSportsDay.title,
                            subtitle: dayData.subtitle || fallbackSportsDay.subtitle,
                            description: dayData.description || fallbackSportsDay.description,
                            pdfTitle: dayData.pdfTitle || fallbackSportsDay.pdfTitle,
                            pdfUrl: dayData.pdfUrl || ''
                        });
                        try {
                            localStorage.setItem('svasc_cached_sports_day', JSON.stringify(dayData));
                        } catch (e) {}
                    }
                } catch (e) {
                    console.log("Using fallback sports day data");
                }

            } catch (err) {
                console.error("Error fetching sports page data", err);
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

    const getSportsDayTitleParts = () => {
        const fullTitle = sportsDayData.title || 'Sports Day';
        const parts = fullTitle.trim().split(' ');
        if (parts.length === 1) {
            return { first: parts[0], second: '' };
        }
        return {
            first: parts[0],
            second: parts.slice(1).join(' ')
        };
    };

    const titleParts = getSportsDayTitleParts();

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

            {/* SPORTS DAY SECTION */}
            <section className={styles['svasc-sports-day']}>
                <div className={styles['svasc-sports-day-container']}>
                    <div className={styles['svasc-sports-day-row']}>

                        {/* LEFT SIDE: Paragraph Content */}
                        <div className={styles['svasc-sports-day-text']}>
                            <div className={styles['svasc-sports-day-label']}>
                                {sportsDayData.subtitle || 'Annual Athletic Meet'}
                            </div>

                            <h2 className={styles['svasc-sports-day-title']}>
                                {titleParts.first}{' '}
                                {titleParts.second ? (
                                    <span className={styles['svasc-sports-gold-text']}>
                                        {titleParts.second}
                                    </span>
                                ) : (
                                    <span className={styles['svasc-sports-gold-text']}>
                                        Day
                                    </span>
                                )}
                            </h2>

                            {sportsDayData.description ? (
                                sportsDayData.description.split('\n').filter(p => p.trim()).map((paragraph, idx) => (
                                    <p key={idx} className={styles['svasc-sports-day-description']}>
                                        {paragraph}
                                    </p>
                                ))
                            ) : (
                                <p className={styles['svasc-sports-day-description']}>
                                    {fallbackSportsDay.description}
                                </p>
                            )}
                        </div>

                        {/* RIGHT SIDE: PDF File Display */}
                        <div className={styles['svasc-sports-day-pdf-wrapper']}>
                            {sportsDayData.pdfUrl ? (
                                <div className={styles['svasc-sports-day-pdf-card']}>
                                    <div className={styles['svasc-sports-day-pdf-header']}>
                                        <div className={styles['svasc-sports-day-pdf-header-info']}>
                                            <span className={styles['svasc-sports-day-pdf-badge']}>PDF</span>
                                            <h3 className={styles['svasc-sports-day-pdf-title']}>
                                                {sportsDayData.pdfTitle || 'Sports Day Schedule & Guidelines'}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className={styles['svasc-sports-day-pdf-preview']}>
                                        <iframe
                                            src={
                                                sportsDayData.pdfUrl.startsWith('http')
                                                    ? `${sportsDayData.pdfUrl}#toolbar=0`
                                                    : `${BASE_URL}/${sportsDayData.pdfUrl.replace(/^\/+/, '')}#toolbar=0`
                                            }
                                            title={sportsDayData.pdfTitle || 'Sports Day PDF'}
                                            className={styles['svasc-sports-day-pdf-frame']}
                                        />
                                    </div>

                                    <div className={styles['svasc-sports-day-pdf-actions']}>
                                        <a
                                            href={
                                                sportsDayData.pdfUrl.startsWith('http')
                                                    ? sportsDayData.pdfUrl
                                                    : `${BASE_URL}/${sportsDayData.pdfUrl.replace(/^\/+/, '')}`
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles['svasc-sports-day-pdf-btn']}
                                        >
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                                <polyline points="14 2 14 8 20 8"></polyline>
                                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                                <polyline points="10 9 9 9 8 9"></polyline>
                                            </svg>
                                            View / Download PDF
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <div className={styles['svasc-sports-day-pdf-empty']}>
                                    <svg
                                        className={styles['svasc-sports-day-pdf-empty-icon']}
                                        width="56"
                                        height="56"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                        <polyline points="14 2 14 8 20 8"></polyline>
                                        <path d="M12 18v-6"></path>
                                        <path d="m9 15 3 3 3-3"></path>
                                    </svg>
                                    <h3 className={styles['svasc-sports-day-pdf-empty-title']}>
                                        {sportsDayData.pdfTitle || 'Sports Day Schedule & Circular'}
                                    </h3>
                                    <p className={styles['svasc-sports-day-pdf-empty-desc']}>
                                        The official schedule, rules, and event circular will be published here upon official announcement.
                                    </p>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default SVASCSports;
