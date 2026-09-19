import React, { useState, useEffect, useRef } from 'react';
import styles from './CampusLife.module.css';
import { useOutletContext } from 'react-router-dom';
import Hero from '../components/Common/Hero';
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
import clubImg from '../assets/club.jpg';
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
    description: "Experience the vibrant student life, culture, sports, and activities on campus."
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
        text: 'Equipped with cutting-edge computing systems, advanced network infrastructure, and modern lab facilities providing hands-on technical skill development and practical exposure.',
    },
    {
        img: libraryImg,
        title: 'Central Library & Knowledge Hub',
        text: 'A comprehensive repository featuring thousands of academic texts, national and international journals, periodicals, and e-learning resources fostering research and intellectual curiosity.',
    },
    {
        img: clubImg,
        title: 'Vibrant Clubs & Cultural Fests',
        text: 'From SVASC Diwas and Star Night to Freshers Day and festival celebrations, providing dynamic platforms for students to showcase artistic talents, creativity, and leadership.',
    },
    {
        img: sportsImg,
        title: 'Sports, Fitness & Athletics',
        text: 'Sprawling grounds for cricket, football, volleyball, track and field, and indoor facilities nurturing athletic spirit, discipline, teamwork, and healthy lifestyle habits.',
    },
    {
        img: campusDroneImg,
        title: 'Eco-Friendly Green Campus',
        text: 'Nestled amidst lush coconut groves and scenic greenery at Othakuthirai, Gobichettipalayam, offering a serene, inspiring, and eco-conscious atmosphere for holistic education.',
    }
];

const CampusLife = () => {
    const { setIsNavbarVisible } = useOutletContext();
    const [galleryHoverPos, setGalleryHoverPos] = useState({ x: 0, y: 0 });
    const observerRef = useRef(null);
    const scrollRef = useRef(null);

    const [heroData, setHeroData] = useState(fallbackHero);
    const [galleryItems, setGalleryItems] = useState([]);
    const [scrollItems, setScrollItems] = useState([]);
    const [loading, setLoading] = useState(true);

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
            } finally {
                setLoading(false);
            }
        };

        fetchCampusLifeData();
    }, []);

    useEffect(() => {
        const observerOptions = {
            threshold: 0,
            rootMargin: '-10% 0px 0px 0px'
        };

        const handleIntersect = (entries) => {
            const isMobile = window.innerWidth <= 768;
            entries.forEach((entry) => {
                if (isMobile) {
                    setIsNavbarVisible(true);
                    return;
                }
                if (entry.isIntersecting) {
                    setIsNavbarVisible(false);
                } else if (entry.boundingClientRect.top > 0) {
                    setIsNavbarVisible(true);
                }
            });
        };

        observerRef.current = new IntersectionObserver(handleIntersect, observerOptions);
        const target = scrollRef.current;
        if (target) observerRef.current.observe(target);

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
            setIsNavbarVisible(true);
        };
    }, [setIsNavbarVisible, loading]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setGalleryHoverPos({ x: e.clientX, y: e.clientY });
        };
        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    if (loading) {
        return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', color: '#111' }}>Loading Campus Life...</div>;
    }

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
            <article className={styles.scrollArticle} ref={scrollRef}>
                {scrollItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <figure className={styles.scrollFigure}>
                            <img src={item.img} alt={item.title} />
                        </figure>
                        <section className={styles.scrollSection}>
                            <div>
                                {item.link ? (
                                    <h2><a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a></h2>
                                ) : (
                                    <h1>{item.title}</h1>
                                )}
                                <p>{item.text}</p>
                            </div>
                        </section>
                    </React.Fragment>
                ))}
            </article>
        </div>
    );
};

export default CampusLife;
