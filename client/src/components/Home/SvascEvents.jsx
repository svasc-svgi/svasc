import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getHomeEvents } from '../../services/homeService';
import { getEventsGrid, getEventsMarquee } from '../../services/eventService';
import './SvascEvents.css';
import eventImg1 from '../../assets/learning.jpg';
import eventImg2 from '../../assets/dance.jpg';
import eventImg3 from '../../assets/campus1.jpg';
import eventImg4 from '../../assets/sports1.jpg';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const fallbackEvents = [
    {
        author: "SVASC",
        date: "Oct. 15, 2026",
        title: "National Tech Seminar",
        subtitle: "Innovation & AI",
        description: "Exploring future technologies, artificial intelligence innovations, and career pathways in modern computer science.",
        image: eventImg1,
        link: "/events"
    },
    {
        author: "SVASC",
        date: "Nov. 02, 2026",
        title: "Annual Cultural Fest",
        subtitle: "Art & Harmony",
        description: "A vibrant multi-day festival celebrating student creativity, dance performances, fine arts, and musical talents.",
        image: eventImg2,
        link: "/events"
    },
    {
        author: "SVASC",
        date: "Nov. 18, 2026",
        title: "Campus Placement Drive",
        subtitle: "Career Pathways",
        description: "Top corporate partners visit SVASC to recruit talented graduates across arts, science, and commerce streams.",
        image: eventImg3,
        link: "/events",
        alt: true
    },
    {
        author: "SVASC",
        date: "Dec. 05, 2026",
        title: "Inter-College Sports Meet",
        subtitle: "Athletic Excellence",
        description: "High-energy athletic competitions fostering teamwork, physical fitness, and true sportsmanship among participants.",
        image: eventImg4,
        link: "/events",
        alt: true
    }
];

// Helper: normalize a raw event item into the card shape
const normalizeEvent = (item, idx) => {
    const cleanImg = (item.image || '').replace(/^\/+/, '');
    const imgUrl = item.image?.startsWith('http') ? item.image : `${BASE_URL}/${cleanImg}`;
    return {
        _id: item._id || `event-${idx}`,
        title: item.title || 'Event',
        subtitle: item.subtitle || item.date || 'Campus Event',
        date: item.date || '',
        description: item.description || item.desc || '',
        image: imgUrl,
        author: item.author || 'SVASC',
        link: item.link || item.url || '/events',
        alt: false // will be re-assigned after slicing
    };
};

// Helper: extract array safely from various API response shapes
const extractList = (raw) => {
    if (Array.isArray(raw)) return raw;
    if (Array.isArray(raw?.data)) return raw.data;
    if (Array.isArray(raw?.data?.data)) return raw.data.data;
    return [];
};

const SvascEvents = () => {
    const [events, setEvents] = useState(() => {
        try {
            const cached = localStorage.getItem('svasc_cached_home_events');
            if (cached) {
                const parsed = JSON.parse(cached);
                if (Array.isArray(parsed) && parsed.length > 0) return parsed;
            }
        } catch (e) {
            // Fall back
        }
        return fallbackEvents;
    });

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // Fetch from all 3 sources in parallel — same as Events.jsx
                const [homeRes, gridRes, marqueeRes] = await Promise.allSettled([
                    getHomeEvents(),
                    getEventsGrid(),
                    getEventsMarquee()
                ]);

                // Collect events from each source (deduplicate by title)
                const seen = new Set();
                const merged = [];

                const addAll = (raw) => {
                    extractList(raw).forEach((item, idx) => {
                        const key = (item.title || '').trim().toLowerCase();
                        if (key && !seen.has(key)) {
                            seen.add(key);
                            merged.push(normalizeEvent(item, merged.length));
                        }
                    });
                };

                if (homeRes.status === 'fulfilled') addAll(homeRes.value);
                if (gridRes.status === 'fulfilled') addAll(gridRes.value);
                if (marqueeRes.status === 'fulfilled') addAll(marqueeRes.value);

                if (merged.length > 0) {
                    // Take the latest 4 and assign alt layout to cards 3 & 4
                    const latest4 = merged.slice(0, 4).map((ev, idx) => ({
                        ...ev,
                        alt: idx >= 2
                    }));
                    setEvents(latest4);
                    try {
                        localStorage.setItem('svasc_cached_home_events', JSON.stringify(latest4));
                    } catch (e) {}
                }
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();

        // Load Google Font: Poppins
        const loadFont = () => {
            const link = document.createElement('link');
            link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap';
            link.rel = 'stylesheet';
            if (!document.querySelector(`link[href="${link.href}"]`)) {
                document.head.appendChild(link);
            }
        };

        // Load Font Awesome 4.7.0
        const loadIcons = () => {
            const link = document.createElement('link');
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
            link.rel = 'stylesheet';
            if (!document.querySelector(`link[href="${link.href}"]`)) {
                document.head.appendChild(link);
            }
        };

        loadFont();
        loadIcons();
    }, []);

    return (
        <div id="svasc-events-section">
            <div className="section-header">
                <h1>SVASC Events</h1>
                <h2>Expert Insights and Success Celebrations</h2>
            </div>

            <div className="blog-card-grid">
                {events.map((event, index) => (
                    <div className={`blog-card ${event.alt ? 'alt' : ''}`} key={event._id || index}>
                        <div className="meta">
                            <div className="photo" style={{ backgroundImage: `url(${event.image})` }}></div>
                            <div className="details">
                                <ul>
                                    <li className="author"><a href={event.link || '#'}>{event.author}</a></li>
                                    <li className="date">{event.date}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="description">
                            <h1>{event.title}</h1>
                            <h2>{event.subtitle}</h2>
                            <p>{event.description}</p>
                            <p className="read-more"><Link to="/events">Read More</Link></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SvascEvents;
