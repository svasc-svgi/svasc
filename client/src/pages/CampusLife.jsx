import React, { useState, useEffect, useRef } from 'react';
import styles from './CampusLife.module.css';
import { useOutletContext } from 'react-router-dom';
import Hero from '../components/Common/Hero';
import { Sparkles, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import {
    getCampusLifePageHero,
    getCampusLifeGallery,
    getCampusLifeScrollItems
} from '../services/campusLifeService';
import heroImage from '../assets/DJI_0595.JPG';
import campusImage from '../assets/campus.jpg';
import campusHeroImage from '../assets/campushero.jpg';
import computerLabImg from '../assets/computerlab.JPG';
import libraryImg from '../assets/library.JPG';
import clubImg from '../assets/why4.jpg';
import sportsImg from '../assets/sports1.jpg';
import campusDroneImg from '../assets/DJI_0589.JPG';
import danceImg from '../assets/dance.jpg';
import drawingImg from '../assets/drawing.jpg';
import hostelImg from '../assets/hostel.jpg';
import committeeImg from '../assets/commities.JPG';
import teachingImg from '../assets/teaching.jpg';
import sportsHeroImg from '../assets/sporthero1.jpg';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const fallbackHero = {
    image: heroImage,
    title: "CAMPUS LIFE",
    description: "Experience the vibrant student life, culture, sports and activities on campus."
};

const fallbackGallery = [
    { _id: 1, img: danceImg, title: "Cultural Celebrations", category: "Fine Arts & Dance" },
    { _id: 2, img: computerLabImg, title: "High-Tech Computing Labs", category: "Practical Training" },
    { _id: 3, img: sportsHeroImg, title: "Sports & Athletics", category: "Physical Fitness" },
    { _id: 4, img: libraryImg, title: "Central Library", category: "Knowledge Repository" },
    { _id: 5, img: committeeImg, title: "Student Committees & Clubs", category: "Leadership & Teamwork" },
    { _id: 6, img: hostelImg, title: "Campus Hostel", category: "Community Living" }
];

const fallbackScroll = [
    {
        img: computerLabImg,
        title: 'Modern High-Tech Laboratories',
        text: 'Equipped with cutting-edge computing systems, advanced network infrastructure and modern lab facilities providing hands-on technical skill development and practical exposure.',
    },
    {
        img: libraryImg,
        title: 'Central Library & Knowledge Hub',
        text: 'A comprehensive repository featuring thousands of academic texts, national and international journals, periodicals and e-learning resources fostering research and intellectual curiosity.',
    },
    {
        img: clubImg,
        title: 'Vibrant Clubs & Cultural Fests',
        text: 'From SVASC Diwas and Star Night to Freshers Day and festival celebrations, providing dynamic platforms for students to showcase artistic talents, creativity and leadership.',
    },
    {
        img: sportsImg,
        title: 'Sports, Fitness & Athletics',
        text: 'Sprawling grounds for cricket, football, volleyball, track and field and indoor facilities nurturing athletic spirit, discipline, teamwork and healthy lifestyle habits.',
    },
    {
        img: campusDroneImg,
        title: 'Eco-Friendly Green Campus',
        text: 'Nestled amidst lush coconut groves and scenic greenery at Othakuthirai, Gobichettipalayam, offering a serene, inspiring and eco-conscious atmosphere for holistic education.',
    }
];

const CampusLife = () => {
    const outletContext = useOutletContext();
    const setIsNavbarVisible = outletContext?.setIsNavbarVisible;
    const [galleryHoverPos, setGalleryHoverPos] = useState({ x: 0, y: 0 });

    const [heroData, setHeroData] = useState(() => {
        try {
            const cached = localStorage.getItem('svasc_cached_campus_hero');
            if (cached) return JSON.parse(cached);
        } catch (e) {}
        return fallbackHero;
    });

    const [galleryItems, setGalleryItems] = useState(() => {
        try {
            const cached = localStorage.getItem('svasc_cached_campus_gallery');
            if (cached) return JSON.parse(cached);
        } catch (e) {}
        return fallbackGallery;
    });

    const [scrollItems, setScrollItems] = useState(() => {
        try {
            const cached = localStorage.getItem('svasc_cached_campus_scroll');
            if (cached) return JSON.parse(cached);
        } catch (e) {}
        return fallbackScroll;
    });

    const scrollRef = useRef(null);
    const trackRef = useRef(null);
    const isPausedRef = useRef(false);
    const animationFrameId = useRef(null);
    const resumeTimeoutRef = useRef(null);

    const pauseScroll = () => {
        isPausedRef.current = true;
        if (resumeTimeoutRef.current) {
            clearTimeout(resumeTimeoutRef.current);
        }
    };

    const resumeScrollWithDelay = (delay = 1200) => {
        if (resumeTimeoutRef.current) {
            clearTimeout(resumeTimeoutRef.current);
        }
        resumeTimeoutRef.current = setTimeout(() => {
            isPausedRef.current = false;
        }, delay);
    };

    const handleScroll = (direction) => {
        pauseScroll();
        const container = trackRef.current;
        if (!container) return;
        const scrollAmount = 390;
        container.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
        resumeScrollWithDelay(2500);
    };

    // Continuous smooth horizontal auto-scroll loop (60fps)
    useEffect(() => {
        const container = trackRef.current;
        if (!container || !scrollItems || scrollItems.length === 0) return;

        let lastTime = performance.now();
        const speed = 0.65; // pixels per 16.6ms frame for calm, readable flow

        const step = (time) => {
            const delta = Math.min(time - lastTime, 50); // cap delta at 50ms to prevent jumping on tab switch
            lastTime = time;

            if (!isPausedRef.current && container) {
                container.scrollLeft += speed * (delta / 16.67);

                // Seamless loop reset: 3 cloned copies, wrap after 1/3 of total scroll width
                const oneThirdWidth = container.scrollWidth / 3;
                if (oneThirdWidth > 0 && container.scrollLeft >= oneThirdWidth * 2) {
                    container.scrollLeft -= oneThirdWidth;
                } else if (oneThirdWidth > 0 && container.scrollLeft <= 5) {
                    container.scrollLeft += oneThirdWidth;
                }
            }

            animationFrameId.current = requestAnimationFrame(step);
        };

        animationFrameId.current = requestAnimationFrame(step);

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            if (resumeTimeoutRef.current) {
                clearTimeout(resumeTimeoutRef.current);
            }
        };
    }, [scrollItems]);

    useEffect(() => {
        const fetchCampusLifeData = async () => {
            try {
                // Fetch Hero Config
                try {
                    const heroRes = await getCampusLifePageHero();
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
                    console.log("Using fallback page hero for campus-life");
                }

                // Fetch Gallery Items
                try {
                    const galleryRes = await getCampusLifeGallery();
                    const galleryList = galleryRes?.data ?? (Array.isArray(galleryRes) ? galleryRes : []);
                    if (galleryList.length > 0) {
                        const mapped = galleryList.map(item => {
                            const cleanImg = (item.image || '').replace(/^\/+/, '');
                            return {
                                _id: item._id,
                                img: item.image?.startsWith('http') ? item.image : `${BASE_URL}/${cleanImg}`,
                                title: item.name,
                                category: item.description
                            };
                        });
                        setGalleryItems(mapped);
                    } else {
                        setGalleryItems(fallbackGallery);
                    }
                } catch (e) {
                    setGalleryItems(fallbackGallery);
                }

                // Fetch Scroll Items
                try {
                    const scrollRes = await getCampusLifeScrollItems();
                    const scrollList = scrollRes?.data ?? (Array.isArray(scrollRes) ? scrollRes : []);
                    if (scrollList.length > 0) {
                        const mapped = scrollList.map(item => {
                            const cleanImg = (item.image || '').replace(/^\/+/, '');
                            return {
                                img: item.image?.startsWith('http') ? item.image : `${BASE_URL}/${cleanImg}`,
                                title: item.title,
                                text: item.description || item.text || '',
                                link: item.link || ''
                            };
                        });
                        setScrollItems(mapped);
                    } else {
                        setScrollItems(fallbackScroll);
                    }
                } catch (e) {
                    setScrollItems(fallbackScroll);
                }

            } catch (err) {
                console.error("Error fetching campus-life page data", err);
            }
        };

        fetchCampusLifeData();
    }, []);

    // Ensure fixed navbar stays visible on Campus Life page
    useEffect(() => {
        if (setIsNavbarVisible) {
            setIsNavbarVisible(true);
        }
    }, [setIsNavbarVisible]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setGalleryHoverPos({ x: e.clientX, y: e.clientY });
        };
        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className={styles.campusLifePage}>
            <Hero
                title={heroData.title}
                description={heroData.description}
                image={heroData.image}
            />

            {/* INTRO SECTION */}
            <section className={styles.section}>
                <h1>
                    <span className={styles.blue}>Campus Life</span>{' '}
                    <span className={styles.green}>at SVASC College of Arts and Science, Erode</span>
                </h1>

                <div className={styles.content}>
                    <div className={styles.text}>
                        <p>
                            Nestled amidst lush coconut groves, Shree Venkateshwara Arts and Science (Co-Education) College (SVASC), Erode,
                            is an eco-friendly campus that offers a vibrant and enriching experience for students.
                            The college remains lively throughout the year, seamlessly blending academic and cultural
                            programs that provide students with hands-on learning experiences while sharpening their skills.
                        </p>

                        <p>
                            At SVASC, celebrations go hand in hand with academics. The various clubs, committees,
                            and cells play a crucial role in shaping students' learning curves, offering them
                            a platform to showcase their talents, leadership, and organizational skills.
                            The Rising Star Cultural Club is particularly active, organizing inter-departmental
                            and intercollegiate events that bring together a diverse mix of talent and creativity.
                        </p>
                    </div>

                    <div className={styles.imageBox}>
                        <img src={campusImage} alt="Campus Life" className={styles.mainImage} />
                        <img src={campusHeroImage} alt="Campus Activities" className={styles.overlayImage} />
                    </div>
                </div>

                <div className={styles.extraContent}>
                    <p>
                        The academic year begins with a warm welcome to freshers through Freshers' Day,
                        setting the stage for a year filled with excitement and engagement. Traditional
                        festivals like Onam and Pongal are celebrated with great enthusiasm, fostering
                        a deep-rooted sense of cultural belonging.
                    </p>

                    <p>
                        Adding to the grandeur of campus life, SVASC Diwas, an interdepartmental fest,
                        and Miracle, a prestigious intercollegiate competition, attract participants
                        from over 350+ colleges, turning the campus into a hub of creativity and energy.
                        These events culminate in the much-anticipated Star Night.
                    </p>
                </div>

                <div className={styles.bigNumber}>1</div>
            </section>

            {/* GALLERY SECTION */}
            <nav className={styles.galleryNav}>
                <div className={styles.container}>
                    <h1 className={styles.mainHeading}>SVASC GALLERY</h1>
                </div>
            </nav>

            <section className={styles.gallery}>
                <div className={styles.container}>
                    <div className={styles.grid}>
                        {galleryItems.map((item) => (
                            <div key={item._id} className={`${styles.columnXs12} ${styles.columnMd4}`}>
                                <figure className={styles.imgContainer}>
                                    <img src={item.img} alt={item.title} />
                                    <figcaption className={styles.imgContent}>
                                        <h2 className={styles.title}>{item.title}</h2>
                                        <h3 className={styles.category}>{item.category}</h3>
                                    </figcaption>
                                    <span
                                        className={styles.imgContentHover}
                                        style={{
                                            transform: `translate3d(${galleryHoverPos.x}px, ${galleryHoverPos.y}px, 0)`
                                        }}
                                    >
                                        <h2 className={styles.title}>{item.title}</h2>
                                        <h3 className={styles.category}>{item.category}</h3>
                                    </span>
                                </figure>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* PHOTO SCROLL SECTION (CONTINUOUS SMOOTH HORIZONTAL FLOW) */}
            <section
                className={styles.photoScrollSection}
                ref={scrollRef}
                onMouseEnter={pauseScroll}
                onMouseLeave={() => resumeScrollWithDelay(1000)}
                onTouchStart={pauseScroll}
                onTouchEnd={() => resumeScrollWithDelay(1500)}
            >
                <div className={styles.photoScrollHeaderContainer}>
                    <div className={styles.scrollHeaderLeft}>
                        <div className={styles.scrollHeaderBadge}>
                            <Sparkles size={14} className={styles.sparkleIcon} />
                            <span>CAMPUS HIGHLIGHTS & INFRASTRUCTURE</span>
                        </div>
                        <h2 className={styles.scrollMainHeading}>Life, Learning & Excellence in Motion</h2>
                        <p className={styles.scrollSubHeading}>
                            Explore the state-of-the-art facilities, cutting-edge laboratories, sports arenas and vibrant collegiate forums across SVASC.
                        </p>
                    </div>

                    {/* Manual Navigation Controls */}
                    <div className={styles.scrollNavActions}>
                        <button
                            type="button"
                            className={styles.scrollNavBtn}
                            onClick={() => handleScroll('left')}
                            aria-label="Scroll highlights left"
                            title="Previous Highlight"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            type="button"
                            className={styles.scrollNavBtn}
                            onClick={() => handleScroll('right')}
                            aria-label="Scroll highlights right"
                            title="Next Highlight"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                <div className={styles.marqueeOuter}>
                    <div
                        className={styles.marqueeTrackContainer}
                        ref={trackRef}
                    >
                        <div className={styles.marqueeTrack}>
                            {[...scrollItems, ...scrollItems, ...scrollItems].map((item, idx) => {
                                const originalIndex = idx % (scrollItems.length || 1);
                                return (
                                    <article
                                        key={`photo-scroll-${idx}`}
                                        className={styles.photoScrollCard}
                                    >
                                        <div className={styles.cardThumbFrame}>
                                            <img
                                                src={item.img}
                                                alt={item.title}
                                                loading="lazy"
                                                className={styles.cardThumbImg}
                                            />
                                            <div className={styles.cardGradientOverlay} />
                                            <span className={styles.cardIndexBadge}>
                                                0{originalIndex + 1}
                                            </span>
                                        </div>

                                        <div className={styles.cardContentBox}>
                                            <div className={styles.cardTextContent}>
                                                <h3 className={styles.cardItemTitle}>{item.title}</h3>
                                                <p className={styles.cardItemDesc}>{item.text}</p>
                                            </div>

                                            {item.link ? (
                                                <a
                                                    href={item.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={styles.cardExploreLink}
                                                >
                                                    <span>Explore Facility</span>
                                                    <ArrowUpRight size={15} />
                                                </a>
                                            ) : (
                                                <div className={styles.cardAccentBar} />
                                            )}
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CampusLife;
