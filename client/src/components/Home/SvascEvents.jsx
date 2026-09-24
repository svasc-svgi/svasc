import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getHomeEvents } from '../../services/homeService';
import './SvascEvents.css';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const fallbackEvents = [
    {
        author: "John Doe",
        date: "Aug. 24, 2015",
        title: "Learning to Code",
        subtitle: "Opening a door",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci culpa debitis distinctio ducimus eligendi est.",
        image: "https://storage.googleapis.com/chydlx/codepen/blog-cards/image-1.jpg",
        link: "#"
    },
    {
        author: "John Doe",
        date: "Aug. 24, 2015",
        title: "Learning to Code",
        subtitle: "Opening a door",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci culpa debitis distinctio ducimus eligendi est.",
        image: "https://storage.googleapis.com/chydlx/codepen/blog-cards/image-1.jpg",
        link: "#"
    },
    {
        author: "Jane Doe",
        date: "July. 15, 2015",
        title: "Mastering JS",
        subtitle: "Not Java",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci culpa debitis distinctio ducimus eligendi est.",
        image: "https://storage.googleapis.com/chydlx/codepen/blog-cards/image-2.jpg",
        link: "#",
        alt: true
    },
    {
        author: "Jane Doe",
        date: "July. 15, 2015",
        title: "Mastering JS",
        subtitle: "Not Java",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci culpa debitis distinctio ducimus eligendi est.",
        image: "https://storage.googleapis.com/chydlx/codepen/blog-cards/image-2.jpg",
        link: "#",
        alt: true
    }
];

const SvascEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await getHomeEvents();
                const list = response?.data ?? (Array.isArray(response) ? response : []);
                if (list && list.length > 0) {
                    // Take the latest 4 events
                    const latest4 = list.slice(0, 4).map((event, idx) => {
                        const cleanImg = (event.image || '').replace(/^\/+/, '');
                        const imgUrl = event.image?.startsWith('http') ? event.image : `${BASE_URL}/${cleanImg}`;
                        return {
                            _id: event._id,
                            title: event.title,
                            subtitle: event.subtitle || event.date || 'Campus Event',
                            date: event.date,
                            description: event.description,
                            image: imgUrl,
                            author: event.author || "SVASC",
                            link: event.link || "/events",
                            alt: idx >= 2 // follow alternative layout for cards 3 & 4
                        };
                    });
                    setEvents(latest4);
                } else {
                    setEvents(fallbackEvents);
                }
            } catch (error) {
                console.error('Error fetching events:', error);
                setEvents(fallbackEvents);
            } finally {
                setLoading(false);
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

    if (loading) {
        return <div style={{ padding: '60px 0', textAlign: 'center', color: '#333' }}>Loading Svasc Events...</div>;
    }

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
