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
import { getHomeEvents } from '../services/homeService';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const Events = () => {
    const [heroData, setHeroData] = useState(null);
    const [gridEvents, setGridEvents] = useState([]);
    const [marqueeEvents, setMarqueeEvents] = useState([]);

    useEffect(() => {
        const fetchEventsData = async () => {
            try {
                const [heroRes, gridRes, homeEventsRes, marqueeRes] = await Promise.allSettled([
                    getEventsPageHero(),
                    getEventsGrid(),
                    getHomeEvents(),
                    getEventsMarquee()
                ]);

                if (heroRes.status === 'fulfilled') {
                    const data = heroRes.value?.data ?? heroRes.value;
                    if (data && data.title) {
                        const cleanImg = (data.image || '').replace(/^\/+/, '');
                        setHeroData({
                            title: data.title,
                            description: data.description || '',
                            image: data.image?.startsWith('http') ? data.image : `${BASE_URL}/${cleanImg}`
                        });
                    }
                }

                if (gridRes.status === 'fulfilled') {
                    const rawVal = gridRes.value;
                    let gridList = [];
                    if (Array.isArray(rawVal)) {
                        gridList = rawVal;
                    } else if (Array.isArray(rawVal?.data)) {
                        gridList = rawVal.data;
                    } else if (Array.isArray(rawVal?.data?.data)) {
                        gridList = rawVal.data.data;
                    }

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

                let mergedMarquee = [];

                if (homeEventsRes.status === 'fulfilled') {
                    const rawHome = homeEventsRes.value;
                    let homeEventsList = [];
                    if (Array.isArray(rawHome)) {
                        homeEventsList = rawHome;
                    } else if (Array.isArray(rawHome?.data)) {
                        homeEventsList = rawHome.data;
                    } else if (Array.isArray(rawHome?.data?.data)) {
                        homeEventsList = rawHome.data.data;
                    }

                    if (homeEventsList.length > 0) {
                        const mappedHomeEvents = homeEventsList.map(item => {
                            const cleanImg = (item.image || '').replace(/^\/+/, '');
                            
                            let day = '01';
                            let month = 'Jan';
                            if (item.date) {
                                // Try parsing "Sep. 24, 2026" or regular date string
                                const parsedDate = new Date(item.date.replace('.', '')); 
                                if (!isNaN(parsedDate.getTime())) {
                                    day = String(parsedDate.getDate()).padStart(2, '0');
                                    month = parsedDate.toLocaleString('default', { month: 'short' });
                                } else {
                                    // Fallback text split if parsing fails
                                    const parts = item.date.split(' ');
                                    if (parts.length >= 2) {
                                        month = parts[0].substring(0, 3);
                                        day = parts[1].replace(',', '').padStart(2, '0');
                                    }
                                }
                            }

                            return {
                                ...item,
                                day: day,
                                month: month,
                                title: item.title || "Event",
                                desc: item.description || "",
                                image: item.image?.startsWith('http') ? item.image : `${BASE_URL}/${cleanImg}`,
                                url: item.link || "#"
                            };
                        });
                        mergedMarquee = [...mergedMarquee, ...mappedHomeEvents];
                    }
                }

                if (marqueeRes.status === 'fulfilled') {
                    const rawMarquee = marqueeRes.value;
                    let marqueeList = [];
                    if (Array.isArray(rawMarquee)) {
                        marqueeList = rawMarquee;
                    } else if (Array.isArray(rawMarquee?.data)) {
                        marqueeList = rawMarquee.data;
                    } else if (Array.isArray(rawMarquee?.data?.data)) {
                        marqueeList = rawMarquee.data.data;
                    }

                    if (marqueeList.length > 0) {
                        const mappedMarquee = marqueeList.map(item => {
                            const cleanImg = (item.image || '').replace(/^\/+/, '');
                            return {
                                ...item,
                                day: item.day || "01",
                                month: item.month || "Jan",
                                title: item.title || "Event",
                                desc: item.description || "",
                                image: item.image?.startsWith('http') ? item.image : `${BASE_URL}/${cleanImg}`,
                                url: item.url || "#"
                            };
                        });
                        mergedMarquee = [...mergedMarquee, ...mappedMarquee];
                    }
                }

                if (mergedMarquee.length > 0) {
                    setMarqueeEvents(mergedMarquee);
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
            threshold: 0.05,
            rootMargin: '0px 0px -20px 0px'
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

        // Safety fallback: ensure dynamically loaded items smoothly become visible
        const timer = setTimeout(() => {
            const currentElements = document.querySelectorAll(`.${styles.revealOnScroll}`);
            currentElements.forEach(el => el.classList.add(styles.visible));
        }, 300);

        return () => {
            elements.forEach(el => observer.unobserve(el));
            observer.disconnect();
            clearTimeout(timer);
        };
    }, [gridEvents, marqueeEvents, heroData]);

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
            {heroData && (
                <Hero
                    title={heroData.title}
                    description={heroData.description}
                    image={heroData.image}
                />
            )}
            <Eventhero />

            {/* Events Grid Section */}
            {gridEvents.length > 0 && (
                <section id="events" className={styles.eventsGridSection}>
                    <span id="upcoming" style={{ display: 'block', position: 'relative', top: '-100px', visibility: 'hidden' }} />
                    <div className={styles.gridWrapper}>
                        <div className={`${styles.gridHeader} ${styles.revealOnScroll}`}>
                            <div className=''>
                                <span className={styles.upcomingLabel}>Upcoming Events</span>
                                <h2 className={styles.gridTitle}>Campus Events</h2>
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
                                        <div className={styles.dateTag}>
                                            {event.date?.split(',').map((part, i) => (
                                                <span key={i} style={{ display: 'block', marginTop: i > 0 ? '4px' : '0' }}>
                                                    {part.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <h3 className={styles.eventTitle}>{event.title}</h3>
                                    <p className={styles.eventDesc}>{event.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Marquee Events Section */}
            {marqueeEvents.length > 0 && (
                <section className={styles.eventsSection}>
                    <div className={styles.eventsHeading}>Events at SVASC</div>

                    <div className={styles.marquee}>
                        <div className={styles.marqueeTrack}>
                            {/* Render Marquee Items duplicated for seamless infinite scrolling */}
                            {[...marqueeEvents, ...marqueeEvents].map((item, index) => (
                                <figure key={index} className={styles.snip1529} onClick={(e) => handleMarqueeClick(e, item.url)}>
                                    <div className={styles.cardImageWrapper}>
                                        <img src={item.image} alt={item.title} />
                                        <div className={styles.date}>
                                            <span>{item.day}</span>
                                            <span className={styles.month}>{item.month}</span>
                                        </div>
                                        <div className={styles.hover}>
                                            <ExternalLink color="white" size={28} />
                                        </div>
                                    </div>
                                    <figcaption>
                                        <h3>{item.title}</h3>
                                        <p>{item.desc || item.description}</p>
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default Events;
