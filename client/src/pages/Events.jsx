import React, { useState, useEffect } from 'react';
import styles from './Events.module.css';
import { ArrowDown, Star, ExternalLink } from 'lucide-react';
import Eventhero from './Eventhero'
import Hero from '../components/Common/Hero';
import {
    getEventsPageHero,
    getEventsGrid,
    getEventsMarquee
} from '../services/eventService';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const fallbackHero = {
    title: "Events",
    description: "Stay updated with the latest events and activities at SVASC.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800"
};

const fallbackGridEvents = [
    { title: 'TechVortex 2024', date: 'Mar 15-17', description: 'CS Department - Annual Tech Fest', image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=600&q=80', spanTwoCols: false },
    { title: 'Rhythm & Raga', date: 'Apr 5-7', description: 'Arts Department - Cultural Fest', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80', spanTwoCols: false },
    { title: 'Champions League', date: 'Feb 20-25', description: 'Sports Department - Tournament', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80', spanTwoCols: false },
    { title: 'AI in Education', date: 'Mar 10', description: 'Seminar - CS Department', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80', spanTwoCols: false },
    { title: 'Homecoming 2024', date: 'Apr 15', description: 'Alumni Meet - All Departments', image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=600&q=80', spanTwoCols: true }
];

const fallbackMarqueeItems = [
    { image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/pr-sample13.jpg", day: "28", month: "Apr", title: "Abstract Heading", desc: "Which is worse, that everyone has his price.", url: "#" },
    { image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/pr-sample21.jpg", day: "17", month: "May", title: "Down with this sort", desc: "I'm killing time while I wait for life.", url: "#" },
    { image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/pr-sample23.jpg", day: "08", month: "Jun", title: "The World Ended", desc: "The only skills I have patience to learn.", url: "#" },
    { image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800", day: "21", month: "Jul", title: "Creative Thoughts", desc: "Ideas are the currency of the future.", url: "#" },
    { image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800", day: "02", month: "Aug", title: "Dream Bigger", desc: "Every journey starts with a single step.", url: "#" }
];

const Events = () => {
    const [heroData, setHeroData] = useState(fallbackHero);
    const [gridEvents, setGridEvents] = useState(fallbackGridEvents);
    const [marqueeEvents, setMarqueeEvents] = useState(fallbackMarqueeItems);

    useEffect(() => {
        const fetchEventsData = async () => {
            try {
                const [heroRes, gridRes, marqueeRes] = await Promise.allSettled([
                    getEventsPageHero(),
                    getEventsGrid(),
                    getEventsMarquee()
                ]);

                if (heroRes.status === 'fulfilled') {
                    const data = heroRes.value?.data ?? heroRes.value;
                    if (data && data.title) {
                        const cleanImg = (data.image || '').replace(/^\/+/, '');
                        setHeroData({
                            title: data.title || fallbackHero.title,
                            description: data.description || fallbackHero.description,
                            image: data.image?.startsWith('http') ? data.image : `${BASE_URL}/${cleanImg}`
                        });
                    }
                }

                if (gridRes.status === 'fulfilled') {
                    const gridList = gridRes.value?.data ?? (Array.isArray(gridRes.value) ? gridRes.value : []);
                    if (gridList.length > 0) {
                        setGridEvents(gridList.map(item => {
                            const cleanImg = (item.image || '').replace(/^\/+/, '');
                            return {
                                ...item,
                                image: item.image?.startsWith('http') ? item.image : `${BASE_URL}/${cleanImg}`
                            };
                        }));
                    }
                }

                if (marqueeRes.status === 'fulfilled') {
                    const marqueeList = marqueeRes.value?.data ?? (Array.isArray(marqueeRes.value) ? marqueeRes.value : []);
                    if (marqueeList.length > 0) {
                        setMarqueeEvents(marqueeList.map(item => {
                            const cleanImg = (item.image || '').replace(/^\/+/, '');
                            return {
                                ...item,
                                desc: item.description,
                                image: item.image?.startsWith('http') ? item.image : `${BASE_URL}/${cleanImg}`
                            };
                        }));
                    }
                }
            } catch (err) {
                console.error("Error fetching events data:", err);
            }
        };
        fetchEventsData();
    }, []);

    // Intersection Observer for Reveal Animation
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(styles.visible);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const elements = document.querySelectorAll(`.${styles.revealOnScroll}`);
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const handleEventClick = (title, date, desc) => {
        alert(`Event: ${title}\nDate: ${date}\nDescription: ${desc}\n\nRegistration details will be announced soon!`);
    };

    const handleMarqueeClick = (e, url) => {
        e.preventDefault();
        if (url && url !== "#") {
            window.open(url, '_blank');
        }
    };

    return (
        <div className={`${styles.wrapper} text-[18px] leading-relaxed text-stone-800`}>
            {/* Hero Section */}
            <Hero
                title={heroData.title}
                description={heroData.description}
                image={heroData.image} />
            <Eventhero />

            {/* Events Grid Section */}
            <section id="events" className={styles.eventsGridSection}>
                <div className={styles.gridWrapper}>
                    <div className={`${styles.gridHeader} ${styles.revealOnScroll}`}>
                        <div className=''>
                            <span className={styles.upcomingLabel}>Upcoming Events</span>
                            <h2 className={styles.gridTitle}>5 Major Campus Events</h2>
                        </div>
                        <a href="#" className={styles.viewAllLink}>View All Events</a>
                    </div>

                    <div className={`${styles.eventsGrid} ${styles.revealOnScroll}`}>
                        {gridEvents.map((event, index) => (
                            <div 
                                key={index} 
                                className={`${styles.eventCard} ${event.spanTwoCols ? styles.span2Cols : ''}`} 
                                style={{ transitionDelay: `${index * 50}ms` }} 
                                onClick={() => handleEventClick(event.title, event.date, event.description)}
                            >
                                <div className={styles.cardImageContainer}>
                                    <img src={event.image} className={styles.cardImage} alt={event.title} />
                                    <div className={styles.cardOverlay}></div>
                                    <div className={styles.dateTag}>{event.date}</div>
                                </div>
                                <h3 className={styles.eventTitle}>{event.title}</h3>
                                <p className={styles.eventDesc}>{event.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Marquee Events Section */}
            <section className={styles.eventsSection}>
                <div className={styles.eventsHeading}>Events at SVASC</div>

                <div className={styles.marquee}>
                    <div className={styles.marqueeTrack}>
                        {/* Render Marquee Items */}
                        {marqueeEvents.map((item, index) => (
                            <figure key={index} className={styles.snip1529} onClick={(e) => handleMarqueeClick(e, item.url)}>
                                <img src={item.image} alt={item.title} />
                                <div className={styles.date}><span>{item.day}</span><span className={styles.month}>{item.month}</span></div>
                                <figcaption><h3>{item.title}</h3><p>{item.desc}</p></figcaption>
                                <div className={styles.hover}><ExternalLink color="white" size={32} /></div>
                            </figure>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Events;
