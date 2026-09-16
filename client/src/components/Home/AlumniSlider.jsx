import React, { useEffect, useState } from 'react';
import { getRisingStars, getSuccessStories } from '../../services/alumniService';
import './AlumniSlider.css';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const fallbackAlumni = [
    {
        subTitle: "Successful Alumni",
        name: "Dr. Anish Kumar",
        content: "A pioneer in the tech industry, Dr. Anish has led multiple global projects and is now a mentor at SVASC, helping students achieve their dreams in software engineering.",
        image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=800",
        link: "#"
    },
    {
        subTitle: "Industry Leader",
        name: "Ms. Sneha Reddy",
        content: "Sneha's journey from SVASC to becoming a CEO of a leading fintech firm is an inspiration. She frequently visits campus to share insights on financial technology.",
        image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=800",
        link: "#"
    },
    {
        subTitle: "Creative Visionary",
        name: "Mr. Rahul Verma",
        content: "Rahul has redefined digital marketing with his innovative strategies. As an SVASC alumnus, he continues to support our media department with workshops.",
        image: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=800",
        link: "#"
    },
    {
        subTitle: "Academic Excellence",
        name: "Dr. Priya Sharma",
        content: "Having published over 50 research papers, Priya is a leading voice in scientific research. She credits SVASC for building her strong academic foundation.",
        image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800",
        link: "#"
    }
];

const AlumniSlider = () => {
    const [scriptsLoaded, setScriptsLoaded] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [alumniData, setAlumniData] = useState([]);
    const [loading, setLoading] = useState(true);

    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    useEffect(() => {
        const fetchAlumni = async () => {
            try {
                const [starsRes, storiesRes] = await Promise.allSettled([
                    getRisingStars(),
                    getSuccessStories()
                ]);

                const stars = starsRes.status === 'fulfilled' ? (starsRes.value?.data ?? (Array.isArray(starsRes.value) ? starsRes.value : [])) : [];
                const stories = storiesRes.status === 'fulfilled' ? (storiesRes.value?.data ?? (Array.isArray(storiesRes.value) ? storiesRes.value : [])) : [];

                const combined = [];
                stars.forEach(item => {
                    const cleanImg = (item.image || '').replace(/^\/+/, '');
                    const imgUrl = item.image?.startsWith('http') ? item.image : `${BASE_URL}/${cleanImg}`;
                    combined.push({
                        _id: item._id,
                        subTitle: item.profession || item.batch || "Rising Star",
                        name: item.name,
                        content: item.quote || item.achievement || "An inspiring journey of excellence and achievement.",
                        image: imgUrl,
                        link: "/alumni"
                    });
                });

                stories.forEach(item => {
                    const cleanImg = (item.image || '').replace(/^\/+/, '');
                    const imgUrl = item.image?.startsWith('http') ? item.image : `${BASE_URL}/${cleanImg}`;
                    combined.push({
                        _id: item._id,
                        subTitle: item.title || item.batch || "Success Story",
                        name: item.name,
                        content: item.story || "A proud graduate making an impact in their field.",
                        image: imgUrl,
                        link: "/alumni"
                    });
                });

                if (combined.length > 0) {
                    setAlumniData(combined);
                } else {
                    setAlumniData(fallbackAlumni);
                }
            } catch (error) {
                console.error('Error fetching alumni slider data:', error);
                setAlumniData(fallbackAlumni);
            } finally {
                setLoading(false);
            }
        };

        fetchAlumni();

        // Load fonts
        const fontLink = document.createElement('link');
        fontLink.href = 'https://fonts.googleapis.com/css?family=Rubik:300,400,500,700,900';
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);

        // Load Swiper 3.4.2 CSS
        const swiperCss = document.createElement('link');
        swiperCss.href = 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.4.2/css/swiper.min.css';
        swiperCss.rel = 'stylesheet';
        document.head.appendChild(swiperCss);

        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                const existingScript = document.querySelector(`script[src="${src}"]`);
                if (existingScript) {
                    resolve();
                    return;
                }
                const script = document.createElement('script');
                script.src = src;
                script.onload = resolve;
                script.onerror = reject;
                document.body.appendChild(script);
            });
        };

        // Load jQuery then Swiper
        loadScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js")
            .then(() => loadScript("https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.4.2/js/swiper.jquery.min.js"))
            .then(() => {
                setScriptsLoaded(true);
            })
            .catch(err => console.error("Failed to load slider scripts", err));
    }, []);

    useEffect(() => {
        if (!scriptsLoaded || loading || alumniData.length === 0) return;

        if (window.$ && window.Swiper) {
            const $ = window.$;

            $(document).ready(function () {
                "use strict";

                var mySwiper = new window.Swiper("#alumni-slider-root .swiper-container", {
                    nextButton: "#alumni-slider-root .swiper-button-next",
                    prevButton: "#alumni-slider-root .swiper-button-prev",
                    slidesPerView: alumniData.length < 3 ? alumniData.length : 2.7,
                    centeredSlides: true,
                    grabCursor: true,
                    simulateTouch: true,
                    touchEventsTarget: 'container',
                    longSwipes: true,
                    shortSwipes: true,
                    followFinger: true,
                    touchRatio: 1,
                    threshold: 5,
                    preventClicks: true,
                    preventClicksPropagation: true,
                    iOSEdgeSwipeDetection: true,
                    breakpoints: {
                        1440: { slidesPerView: alumniData.length < 3 ? alumniData.length : 2.6 },
                        1439: { slidesPerView: 1.45 },
                        1024: { slidesPerView: 1.45 },
                        1023: { slidesPerView: 2 },
                        768: { slidesPerView: 2 },
                        568: { slidesPerView: 1.5, spaceBetween: 10 },
                        414: { slidesPerView: 1.09, spaceBetween: 3 },
                        320: { slidesPerView: 1.09, spaceBetween: 3 }
                    }
                });

                mySwiper.on("onSlideChangeStart", function () {
                    setExpandedIndex(null);
                });
            });
        }
    }, [scriptsLoaded, loading, alumniData]);

    if (loading) {
        return <div style={{ padding: '60px 0', textAlign: 'center', background: '#0f0f0f', color: '#fff' }}>Loading Alumni Stories...</div>;
    }

    return (
        <div id="alumni-slider-root">
            <div className="main-wrapper">
                <div className="sl-main-container">
                    <div className="sl-header-wrapper">
                        <h4>SVASC ALUMNI</h4>

                        <h3>
                            Their<br />
                            Journey,<br />
                            Their<br />
                            Story
                        </h3>

                        <p>
                            Far from being damsels in distress, these warrior women are often the ones doing the rescuing,
                            and kicking butt in the process.
                        </p>

                        <div className="sl-nav">
                            <div className="swiper-button-next">
                                <svg id="nextBtn" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 65 65">
                                    <path d="M32.5 0A32.5 32.5 0 1 0 65 32.5 32.5 32.5 0 0 0 32.5 0zm0 62A29.5 29.5 0 1 1 62 32.5 29.53 29.53 0 0 1 32.5 62zm-5.22-40.28L38.06 32.5 27.28 43.28l2.12 2.12 12.9-12.9-12.9-12.9z" style={{ fill: '#ffd700' }} />
                                </svg>
                            </div>
                            <div className="swiper-button-prev">
                                <svg xmlns="http://www.w3.org/2000/svg" id="prevBtn" data-name="Layer 1" viewBox="0 0 65 65">
                                    <path d="M0 32.5A32.5 32.5 0 1 0 32.5 0 32.5 32.5 0 0 0 0 32.5zm3 0A29.5 29.5 0 1 1 32.5 62 29.53 29.53 0 0 1 3 32.5zm32.6-12.9L22.7 32.5l12.9 12.9 2.12-2.12L26.94 32.5l10.78-10.78z" style={{ fill: '#ffd700' }} />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="sl-wrapper">
                        <div className="swiper-container">
                            <div className="swiper-wrapper">
                                {alumniData.map((alumnus, index) => (
                                    <div className="swiper-slide sl--slide" key={alumnus._id || index}>
                                        <div className="slide-cover"></div>
                                        <div className="sl-card-wrapper">
                                            <div className="sl-gradient"></div>
                                            <div
                                                className="sl-bkg-img"
                                                style={{ backgroundImage: `url(${alumnus.image})` }}
                                            ></div>
                                            <div className={`sl--content-wrapper ${expandedIndex === index ? 'sl--content-wrapper-active' : 'sl--content-wrapper-inactive'}`}>
                                                <div className={`sl--content-container ${expandedIndex === index ? 'sl--card-reveal' : 'sl--card-hide'}`}>
                                                    <p className="sl--sub-text">{alumnus.subTitle}</p>
                                                    <h2>{alumnus.name}</h2>
                                                    <p className="sl--card-content">{alumnus.content}</p>
                                                    <div className="sl--link">STORY</div>
                                                </div>
                                                <div className="sl--card-nav-container" onClick={() => toggleExpand(index)}>
                                                    <div className="sl--content-btn content-reveal-btn">
                                                        <svg className={`card-nav-gfx ${expandedIndex === index ? 'sl--close-card-info' : 'sl--show-card-info'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 113.63 113.63">
                                                            <path d="M105.56 48.75H64.88V8.06a8.06 8.06 0 0 0-16.12 0v40.69H8.06a8.06 8.06 0 0 0 0 16.13h40.69v40.69a8.06 8.06 0 0 0 16.13 0V64.88h40.69a8.06 8.06 0 0 0 0-16.12z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlumniSlider;
