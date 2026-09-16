import React, { useState, useEffect } from 'react';
import styles from './Alumni.module.css';
import { FaPlay, FaPause, FaEnvelope, FaPhone, FaGraduationCap, FaBook, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const fallbackHero = {
    image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/30256/jungleBG.jpg',
    title: 'Alumni',
    description: 'Invite alumni to share honest reflections, career advice, and lessons learned since graduation'
};

const fallbackRisingStars = [
    { name: "Arun Kumar", degree: "B.Sc Computer Science", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { name: "Priya Sharma", degree: "BCA", video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" },
    { name: "Rahul Das", degree: "B.Sc IT", video: "https://media.w3.org/2010/05/sintel/trailer.mp4" },
    { name: "Ananya Roy", degree: "B.Com", video: "https://media.w3.org/2010/05/bunny/trailer.mp4" },
    { name: "Karthik R", degree: "B.Sc Physics", video: "https://www.w3schools.com/html/movie.mp4" },
    { name: "Meena Lakshmi", degree: "B.Sc Mathematics", video: "https://media.w3.org/2010/05/video/movie_300.mp4" },
    { name: "Vignesh S", degree: "BCA", video: "https://media.w3.org/2010/05/sintel/trailer.mp4" },
    { name: "Divya R", degree: "B.Sc Chemistry", video: "https://media.w3.org/2010/05/bunny/trailer.mp4" }
];

const fallbackSuccessStories = [
    { type: 'text', content: '1', id: 1 },
    { type: 'img', src: 'http://farm9.staticflickr.com/8337/8234123289_2b23aeaf06.jpg', id: 2 },
    { type: 'img', src: 'http://farm9.staticflickr.com/8337/8234711202_831b23a2b7.jpg', id: 3 },
    { type: 'iframe', src: 'https://www.youtube.com/embed/szIEr2F61DU', id: 4 },
    { type: 'iframe', src: 'https://player.vimeo.com/video/19464611', id: 5 },
    { type: 'img', src: 'http://woofie2.pixiq.com/files/cache/20030323_img_7465_3072_x_2048_619x413.jpg', id: 6 },
    { type: 'img', src: 'http://www.mishes.com/wp-content/uploads/2011/12/FlickrMonday07.jpg', id: 7 }
];

const fallbackRankData = {
    2019: [
        { name: "KARTHIK R", degree: "B.Com", rank: "1st Rank Bharathiar University" },
        { name: "DIVYA S", degree: "B.Com", rank: "2nd Rank Bharathiar University" },
        { name: "ARUN P", degree: "B.Com", rank: "3rd Rank Bharathiar University" },
        { name: "MEENA K", degree: "B.Com", rank: "5th Rank Bharathiar University" },
        { name: "SANTHOSH V", degree: "B.Com", rank: "7th Rank Bharathiar University" }
    ],
    2020: [
        { name: "SNEHA M", degree: "B.Sc. Computer Science", rank: "1st Rank Bharathiar University" },
        { name: "RAJESH K", degree: "B.Sc. Computer Science", rank: "2nd Rank Bharathiar University" },
        { name: "POOJA R", degree: "B.Sc. Computer Science", rank: "4th Rank Bharathiar University" },
        { name: "NAVEEN S", degree: "B.Sc. Computer Science", rank: "6th Rank Bharathiar University" },
        { name: "AISWARYA P", degree: "B.Sc. Computer Science", rank: "8th Rank Bharathiar University" }
    ],
    2021: [
        { name: "RAHUL S", degree: "B.Sc. Mathematics", rank: "2nd Rank Bharathiar University" },
        { name: "KAVYA M", degree: "B.Sc. Mathematics", rank: "3rd Rank Bharathiar University" },
        { name: "MOHAN R", degree: "B.Sc. Mathematics", rank: "5th Rank Bharathiar University" },
        { name: "PRIYA S", degree: "B.Sc. Mathematics", rank: "6th Rank Bharathiar University" },
        { name: "BALAJI K", degree: "B.Sc. Mathematics", rank: "9th Rank Bharathiar University" }
    ],
    2022: [
        { name: "MEENA P", degree: "B.Sc. Physics", rank: "1st Rank Bharathiar University" },
        { name: "SURESH K", degree: "B.Sc. Physics", rank: "2nd Rank Bharathiar University" },
        { name: "LATHA R", degree: "B.Sc. Physics", rank: "4th Rank Bharathiar University" },
        { name: "ARJUN V", degree: "B.Sc. Physics", rank: "6th Rank Bharathiar University" },
        { name: "SWATHI S", degree: "B.Sc. Physics", rank: "10th Rank Bharathiar University" }
    ],
    2023: [
        { name: "ARAVIND K", degree: "B.Sc. Chemistry", rank: "3rd Rank Bharathiar University" },
        { name: "DEEPA M", degree: "B.Sc. Chemistry", rank: "4th Rank Bharathiar University" },
        { name: "PRAVEEN S", degree: "B.Sc. Chemistry", rank: "5th Rank Bharathiar University" },
        { name: "SOWMIYA R", degree: "B.Sc. Chemistry", rank: "7th Rank Bharathiar University" },
        { name: "HARISH V", degree: "B.Sc. Chemistry", rank: "9th Rank Bharathiar University" }
    ],
    2024: [
        { name: "PRIYANKA R", degree: "B.Sc. IT", rank: "1st Rank Bharathiar University" },
        { name: "MANOJ K", degree: "B.Sc. IT", rank: "2nd Rank Bharathiar University" },
        { name: "SANDHYA S", degree: "B.Sc. IT", rank: "3rd Rank Bharathiar University" },
        { name: "VINOTH P", degree: "B.Sc. IT", rank: "5th Rank Bharathiar University" },
        { name: "ANUJA M", degree: "B.Sc. IT", rank: "8th Rank Bharathiar University" }
    ],
    2025: [
        { name: "VISHNU A", degree: "B.Sc. Computer Science", rank: "2nd Rank Bharathiar University" },
        { name: "RITHIKA S", degree: "B.Sc. Computer Science", rank: "3rd Rank Bharathiar University" },
        { name: "KARAN M", degree: "B.Sc. Computer Science", rank: "4th Rank Bharathiar University" },
        { name: "SANGEETHA P", degree: "B.Sc. Computer Science", rank: "6th Rank Bharathiar University" },
        { name: "AJAY R", degree: "B.Sc. Computer Science", rank: "9th Rank Bharathiar University" }
    ]
};

const Alumni = () => {
    // ================= DYNAMIC DATA LOADING =================
    const [heroData, setHeroData] = useState(fallbackHero);
    const [risingStars, setRisingStars] = useState([]);
    const [successStories, setSuccessStories] = useState([]);
    const [rankData, setRankData] = useState({});
    const [yearsList, setYearsList] = useState([2019]);
    const [selectedYear, setSelectedYear] = useState(2019);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                // 1. Fetch Page Hero
                try {
                    const heroRes = await axios.get(`${BASE_URL}/api/page-heros/alumni`);
                    if (heroRes.data.success && heroRes.data.data) {
                        const hero = heroRes.data.data;
                        const cleanImg = hero.image.replace(/^\/+/, '');
                        setHeroData({
                            title: hero.title || fallbackHero.title,
                            description: hero.description || fallbackHero.description,
                            image: hero.image.startsWith('http') ? hero.image : `${BASE_URL}/${cleanImg}`
                        });
                    }
                } catch (e) {
                    console.log("Using fallback page hero for alumni");
                }

                // 2. Fetch Rising Stars
                try {
                    const starsRes = await axios.get(`${BASE_URL}/api/alumni/rising-stars`);
                    if (starsRes.data.success && starsRes.data.data.length > 0) {
                        const stars = starsRes.data.data.map(star => {
                            const cleanVid = star.video.replace(/^\/+/, '');
                            return {
                                ...star,
                                video: star.video.startsWith('http') ? star.video : `${BASE_URL}/${cleanVid}`
                            };
                        });
                        setRisingStars(stars);
                    } else {
                        setRisingStars(fallbackRisingStars);
                    }
                } catch (e) {
                    setRisingStars(fallbackRisingStars);
                }

                // 3. Fetch Success Stories
                try {
                    const storiesRes = await axios.get(`${BASE_URL}/api/alumni/success-stories`);
                    if (storiesRes.data.success && storiesRes.data.data && storiesRes.data.data.length > 0) {
                        const stories = storiesRes.data.data.map((item, idx) => {
                            if (item.image) {
                                const cleanImg = item.image.replace(/^\/+/, '');
                                return {
                                    type: 'img',
                                    src: item.image.startsWith('http') ? item.image : `${BASE_URL}/${cleanImg}`,
                                    name: item.name,
                                    role: item.role,
                                    description: item.description,
                                    id: item._id || idx
                                };
                            } else if (item.name || item.description) {
                                return {
                                    type: 'card',
                                    name: item.name,
                                    role: item.role,
                                    description: item.description,
                                    id: item._id || idx
                                };
                            } else {
                                return {
                                    type: 'text',
                                    content: item.name || `${idx + 1}`,
                                    id: item._id || idx
                                };
                            }
                        });
                        setSuccessStories(stories);
                    } else {
                        setSuccessStories(fallbackSuccessStories);
                    }
                } catch (e) {
                    setSuccessStories(fallbackSuccessStories);
                }

                // 4. Fetch Rank Holders
                try {
                    const ranksRes = await axios.get(`${BASE_URL}/api/alumni/rank-holders`);
                    if (ranksRes.data.success && ranksRes.data.data.length > 0) {
                        // Group by year
                        const grouped = {};
                        ranksRes.data.data.forEach(item => {
                            const yr = item.year;
                            if (!grouped[yr]) grouped[yr] = [];
                            grouped[yr].push(item);
                        });
                        setRankData(grouped);
                        const yrs = Object.keys(grouped).map(Number).sort((a, b) => b - a);
                        setYearsList(yrs);
                        if (yrs.length > 0) {
                            setSelectedYear(yrs[0]);
                        }
                    } else {
                        setRankData(fallbackRankData);
                        const yrs = Object.keys(fallbackRankData).map(Number).sort((a, b) => b - a);
                        setYearsList(yrs);
                        setSelectedYear(yrs[0]);
                    }
                } catch (e) {
                    setRankData(fallbackRankData);
                    const yrs = Object.keys(fallbackRankData).map(Number).sort((a, b) => b - a);
                    setYearsList(yrs);
                    setSelectedYear(yrs[0]);
                }

            } catch (err) {
                console.error("Error loading alumni page data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    // ================= HERO SCROLL EFFECT =================
    const [scrollState, setScrollState] = useState({
        shadeOpacity: 0,
        zoom: 1,
        titleMove: 0
    });

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const shadeOpacity = Math.min(scrollTop / 500, 0.8);
            const zoom = scrollTop * 0.0004 + 1;
            const titleMove = scrollTop * 0.2;

            setScrollState({
                shadeOpacity,
                zoom,
                titleMove
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // ================= VIDEO PLAY LOGIC =================
    const toggleVideo = (e, index) => {
        e.stopPropagation();
        const video = document.getElementById(`video-${index}`);
        const btn = document.getElementById(`btn-${index}`);

        if (video.paused) {
            video.play();
            btn.textContent = '⏸';
        } else {
            video.pause();
            btn.textContent = '▶';
        }
    };

    // ================= CAROUSEL LOGIC =================
    // State tracks the *index* of the item that is currently in the "main-pos"
    const [mainIndex, setMainIndex] = useState(0);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const totalItems = successStories.length;

    // Listen for iframe postMessages from YouTube & Vimeo to pause/resume autoSwap
    useEffect(() => {
        const handleMessage = (event) => {
            if (typeof event.data !== 'string') return;

            try {
                const data = JSON.parse(event.data);

                // --- YouTube Embed API Events ---
                if (data.event === 'initialDelivery' || data.event === 'onReady') {
                    if (event.source && typeof event.source.postMessage === 'function') {
                        event.source.postMessage(JSON.stringify({ event: 'listening' }), '*');
                    }
                }
                if (data.event === 'infoDelivery' && data.info && data.info.playerState !== undefined) {
                    const state = data.info.playerState;
                    if (state === 1) { // playing
                        setIsVideoPlaying(true);
                    } else if (state === 2 || state === 0) { // paused or ended
                        setIsVideoPlaying(false);
                    }
                }

                // --- Vimeo Embed API Events ---
                if (data.event === 'ready') {
                    if (event.source && typeof event.source.postMessage === 'function') {
                        event.source.postMessage(JSON.stringify({ method: 'addEventListener', value: 'play' }), '*');
                        event.source.postMessage(JSON.stringify({ method: 'addEventListener', value: 'pause' }), '*');
                        event.source.postMessage(JSON.stringify({ method: 'addEventListener', value: 'finish' }), '*');
                    }
                }
                if (data.event === 'play') {
                    setIsVideoPlaying(true);
                } else if (data.event === 'pause' || data.event === 'finish') {
                    setIsVideoPlaying(false);
                }
            } catch (e) {
                // Ignore parsing errors for other non-API messaging payloads
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    // Auto-swap effect
    useEffect(() => {
        if (isVideoPlaying) return;

        const autoSwap = setInterval(() => {
            moveCarousel('next');
        }, 3500);
        return () => clearInterval(autoSwap);
    }, [mainIndex, isVideoPlaying]); // Restart timer on interaction or play/pause state change

    const moveCarousel = (direction) => {
        setIsVideoPlaying(false); // reset if they manually skip slides
        if (direction === 'next') {
            setMainIndex((prev) => (prev + 1) % totalItems);
        } else {
            setMainIndex((prev) => (prev - 1 + totalItems) % totalItems);
        }
    };

    const getPositionClass = (index) => {
        if (totalItems === 0) return '';
        const diff = (index - mainIndex + totalItems) % totalItems;
        if (diff === 0) return styles.mainPos;
        if (diff === 1) return styles.rightPos;
        if (diff === totalItems - 1) return styles.leftPos;
        return styles.backPos;
    };



    // ================= NEW ALUMNI ASSOCIATION DATA =================
    const [activeRuleIndex, setActiveRuleIndex] = useState(null);

    const rulesAndRegulations = [
        {
            title: "1. Name and Establishment",
            points: [
                "The Alumni Association shall function under the guidance and support of Gobichettipalayam Othakuthirai Shree Venkateshwara Arts and Science (Co-Ed) College.",
                "The Association shall work towards maintaining a strong and lifelong relationship between the institution and its alumni.",
                "The Association shall promote mutual cooperation, professional networking, and institutional development through active participation of alumni members."
            ]
        },
        {
            title: "2. Membership",
            points: [
                "All graduates and former students of the institution shall be eligible to become members of the Alumni Association.",
                "Membership shall be granted after completing the prescribed registration process.",
                "Members shall provide updated personal, educational, and professional details to maintain alumni records.",
                "Membership shall be voluntary and subject to acceptance of the rules and regulations of the Association.",
                "Lifetime membership shall be provided to interested alumni as per the guidelines of the Association."
            ]
        },
        {
            title: "3. Objectives and Activities",
            points: [
                "The Association shall organize alumni meets, interaction programmes, seminars, workshops, and guest lectures.",
                "The Association shall encourage alumni participation in academic activities, career guidance, and mentoring programmes.",
                "Alumni members shall support students through knowledge sharing, internship opportunities, placement guidance, and professional development programmes.",
                "The Association shall contribute towards academic growth and institutional development activities.",
                "The Association shall promote networking and collaboration among alumni members."
            ]
        },
        {
            title: "4. Office Bearers and Committee",
            points: [
                "The Alumni Association shall have the following office bearers: President, Vice President, Secretary, Joint Secretary, Treasurer, Executive Committee Members.",
                "The office bearers shall be appointed/elected with the approval of the institution.",
                "The committee shall be responsible for planning, organizing, and monitoring alumni activities.",
                "The tenure and responsibilities of the office bearers shall be decided by the Alumni Association Committee."
            ]
        },
        {
            title: "5. Meetings",
            points: [
                "The Alumni Association shall conduct regular meetings to discuss and plan various activities.",
                "Notices regarding meetings shall be communicated to members in advance.",
                "The proceedings and decisions of the meetings shall be recorded and maintained.",
                "The Annual General Meeting shall be conducted to review activities and formulate future plans."
            ]
        },
        {
            title: "6. Code of Conduct",
            points: [
                "All members shall maintain discipline, professionalism, and respect towards the institution and fellow alumni.",
                "Members shall uphold the reputation, values, and traditions of the college.",
                "Alumni information shall be used only for the official purposes of the Association.",
                "Members shall cooperate in all activities organized by the Association."
            ]
        },
        {
            title: "7. Financial Management",
            points: [
                "The Alumni Association shall maintain proper records of income and expenditure.",
                "Funds received through membership fees, donations, or contributions shall be utilized only for approved Association activities.",
                "Financial transactions shall be monitored by the Treasurer and approved by the committee.",
                "Proper financial records shall be maintained to ensure transparency and accountability."
            ]
        },
        {
            title: "8. Amendments to Rules",
            points: [
                "Any changes or modifications to the rules and regulations shall be made with the approval of the Alumni Association Committee and the institutional authorities.",
                "The decisions of the Alumni Association Committee shall be final in matters related to the functioning of the Association."
            ]
        },
        {
            title: "9. Dissolution of the Association",
            points: [
                "In the event of dissolution of the Alumni Association, the assets and funds of the Association shall be transferred to the institution and utilized for academic and developmental purposes."
            ]
        }
    ];

    const committeeMembers = [
        {
            name: "Mrs. T. Ayeeshasumaiya",
            role: "Coordinator",
            designation: "Assistant Professor & Head",
            dept: "CDF",
            email: "ayeesha@svasc.org",
            mobile: "9087405678"
        },
        {
            name: "Mr. P. Raman",
            role: "Member",
            designation: "Assistant Professor",
            dept: "Tamil",
            email: "raman@svasc.org",
            mobile: "9524164752"
        },
        {
            name: "Mrs. P. S. Kavitha",
            role: "Member",
            designation: "Assistant Professor",
            dept: "Mathematics",
            email: "kavithaps@svasc.org",
            mobile: "9952102370"
        },
        {
            name: "Mr. M. Sanjai",
            role: "Member",
            designation: "Assistant Professor",
            dept: "English",
            email: "sanjai@svasc.org",
            mobile: "9659410190"
        }
    ];

    const officeBearers = [
        { sno: 1, designation: "President", name: "T. Karthikeyan", qualification: "B.Com (PA)" },
        { sno: 2, designation: "Vice President", name: "B. Deepak", qualification: "B.Sc. (Microbiology)" },
        { sno: 3, designation: "Secretary", name: "S. Manikandan", qualification: "B.Sc. (CS)" },
        { sno: 4, designation: "Joint Secretary", name: "J. Vinisha", qualification: "BBA" },
        { sno: 5, designation: "Treasurer", name: "Sushitra", qualification: "B.Com" },
        { sno: 6, designation: "Joint Treasurer", name: "Shalom Samvel", qualification: "B.A. (English)" },
        { sno: 7, designation: "Executive Member", name: "R. Gowtham", qualification: "BCA" },
        { sno: 8, designation: "Executive Member", name: "P. Monish", qualification: "B.Sc. (Mathematics)" },
        { sno: 9, designation: "Executive Member", name: "M. Abinesh", qualification: "B.Sc. (Chemistry)" },
        { sno: 10, designation: "Executive Member", name: "Naveen Prakash", qualification: "B.Sc. (CDF)" },
        { sno: 11, designation: "Executive Member", name: "G. Narmatha", qualification: "B.Com CA" }
    ];

    return (
        <div className={styles.alumniPage}>
            {/* ================= HERO SECTION ================= */}
            <div className={styles.heroEffects}>
                <div
                    className={styles.bg}
                    style={{
                        transform: `scale(${scrollState.zoom})`,
                        backgroundImage: `url(${heroData.image})`
                    }}
                >
                    <div className={`${styles.arrow} ${styles.bouncy}`}>
                        <svg height="25" width="50">
                            <polygon
                                points="0,0 25,10 50,0 25,25"
                                fill="rgba(255,255,255,.5)"
                                stroke="rgba(255,255,255,.3)"
                                strokeWidth="0"
                            />
                        </svg>
                    </div>

                    <div className={styles.title}>
                        <div className={styles.textWrapper}>
                            <div
                                className={styles.text}
                                style={{ marginTop: `-${scrollState.titleMove}px` }}
                            >
                                <h1>{heroData.title}</h1>
                                <p>{heroData.description}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={styles.shade}
                    style={{ opacity: scrollState.shadeOpacity }}
                ></div>
            </div>

            {/* ================= MAIN CONTENT ================= */}
            <div className={styles.content}>

                {/* ================= RISING STARS SECTION ================= */}
                <div className={styles.sectionTitle}>
                    <h1>Rising Stars of SVASC</h1>
                </div>

                <div className={styles.container}>
                    {risingStars.map((star, index) => (
                        <div key={star._id || index}>
                            <div className={styles.gameCard}>
                                <div className={styles.gameCardCover}>
                                    <video id={`video-${index}`} loop muted={false} key={star.video}>
                                        <source src={star.video} />
                                    </video>
                                    <div
                                        className={styles.playBtn}
                                        id={`btn-${index}`}
                                        onClick={(e) => toggleVideo(e, index)}
                                    >
                                        ▶
                                    </div>
                                </div>
                            </div>
                            <div className={styles.studentInfo}>
                                <h3>{star.name}</h3>
                                <p>{star.degree}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ================= SUCCESS STORY CAROUSEL SECTION ================= */}
                {successStories.length > 0 && (
                    <div className={styles.carouselSection}>
                        <div className={styles.carouselTitle}>
                            <h1>Success Story</h1>
                        </div>

                        <div className={styles.carouselWrapper}>
                            <ul className={styles.carousel}>
                                {successStories.map((item, index) => (
                                    <li
                                        key={item.id || index}
                                        className={getPositionClass(index)}
                                        onClick={() => {
                                            const posClass = getPositionClass(index);
                                            if (posClass === styles.leftPos) moveCarousel('prev');
                                            if (posClass === styles.rightPos) moveCarousel('next');
                                        }}
                                    >
                                        {item.type === 'text' && (
                                            <p style={{
                                                color: 'white',
                                                fontWeight: 'bold',
                                                fontSize: '5em',
                                                textAlign: 'center',
                                                marginTop: '1.15em'
                                            }}>{item.content}</p>
                                        )}
                                        {item.type === 'img' && (
                                            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                                <img src={item.src} alt={item.name || "Success Story"} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                {(item.name || item.role) && (
                                                    <div style={{
                                                        position: 'absolute',
                                                        bottom: 0,
                                                        left: 0,
                                                        right: 0,
                                                        padding: '1.5rem',
                                                        background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
                                                        color: '#fff',
                                                        textAlign: 'left'
                                                    }}>
                                                        <h4 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 'bold' }}>{item.name}</h4>
                                                        <p style={{ margin: '0.3rem 0 0 0', fontSize: '1.1rem', opacity: 0.9 }}>{item.role}</p>
                                                        {item.description && <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.95rem', opacity: 0.8, fontStyle: 'italic' }}>"{item.description}"</p>}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        {item.type === 'card' && (
                                            <div style={{
                                                width: '100%',
                                                height: '100%',
                                                background: 'linear-gradient(135deg, #0a1264, #1b357d)',
                                                color: '#fff',
                                                padding: '2.5rem',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                                borderRadius: '8px'
                                            }}>
                                                <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{item.name}</h3>
                                                <h5 style={{ fontSize: '1.2rem', color: '#ffb703', marginBottom: '1rem' }}>{item.role}</h5>
                                                {item.description && <p style={{ fontSize: '1.1rem', fontStyle: 'italic', opacity: 0.9 }}>"{item.description}"</p>}
                                            </div>
                                        )}
                                        {item.type === 'iframe' && (
                                            <iframe
                                                src={item.src}
                                                frameBorder="0"
                                                allowFullScreen
                                                title={`video-${index}`}
                                            ></iframe>
                                        )}
                                    </li>
                                ))}
                            </ul>

                            <div className={styles.carouselControls}>
                                <button onClick={() => moveCarousel('prev')}>Prev</button>
                                <button onClick={() => moveCarousel('next')}>Next</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ================= RANK HOLDERS SECTION ================= */}
                {yearsList.length > 0 && (
                    <div className={styles.rankHolderSection}>
                        <div className={styles.rankTitle}>Rank Holders</div>

                        <div className={styles.yearTabs}>
                            {yearsList.map((year) => (
                                <button
                                    key={year}
                                    className={year === selectedYear ? styles.active : ''}
                                    onClick={() => setSelectedYear(year)}
                                >
                                    {year}
                                </button>
                            ))}
                        </div>

                    <div className={styles.rankCards} id="cards">
                        {rankData[selectedYear] && rankData[selectedYear].map((student, idx) => (
                            <div className={styles.rankCard} key={idx}>
                                <h3>{student.name}</h3>
                                <p className={styles.degree}>{student.degree}</p>
                                <p className={styles.rank}>{student.rank}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

                {/* ================= ABOUT THE ASSOCIATION SECTION ================= */}
                <div className={styles.associationAboutSection}>
                    <div className={styles.sectionTitle}>
                        <h1>About Alumni Association</h1>
                    </div>
                    <div className={styles.aboutWrapper}>
                        <p className={styles.aboutText}>
                            The Alumni Association of Gobichettipalayam Othakuthirai Shree Venkateshwara Arts and Science (Co-Ed) College (NOONMUGAM) was registered under the Tamil Nadu Societies Registration Act, 1975 (Act 27 of 1975) on 13th September 2023. The Association serves as a bridge between the institution and its graduates by maintaining continuous communication and interaction. It provides a common platform for alumni to share their experiences, knowledge, and professional achievements. The Association aims to strengthen the bond between alumni and the college community. Regular meetings are conducted by the office bearers to plan and organize various developmental activities. The Alumni Association supports academic growth, career guidance, and student development initiatives. It encourages alumni participation in seminars, guest lectures, mentoring programmes, and institutional development activities. The Association organizes annual alumni reunions to reconnect with former students and celebrate their achievements. Alumni members provide valuable suggestions for the overall development of the institution. Former students can register as lifetime members of the Alumni Association to remain connected with the college. Through active alumni engagement, the Association promotes networking, collaboration, and lifelong relationships between alumni and the institution.
                        </p>
                    </div>
                </div>

                {/* ================= VISION & MISSION SECTION ================= */}
                <div className={styles.visionMissionSection}>
                    <div className={styles.visionMissionGrid}>
                        <div className={styles.visionCard}>
                            <div className={styles.cardHeader}>
                                <FaBook className={styles.cardIcon} />
                                <h2>Vision</h2>
                            </div>
                            <p className={styles.cardText}>
                                To build a strong and lifelong relationship between the institution and its alumni by creating a platform for mutual support, professional networking, knowledge sharing, and continuous development of students and graduates.
                            </p>
                        </div>
                        <div className={styles.missionCard}>
                            <div className={styles.cardHeader}>
                                <FaUsers className={styles.cardIcon} />
                                <h2>Mission</h2>
                            </div>
                            <ul className={styles.bulletList}>
                                <li>To establish and maintain effective communication between the institution and alumni.</li>
                                <li>To encourage alumni participation in academic, cultural, social, and professional activities of the institution.</li>
                                <li>To provide career guidance, mentoring, and placement support to current students through alumni interactions.</li>
                                <li>To promote networking opportunities among alumni for professional growth and collaboration.</li>
                                <li>To involve alumni in institutional development activities, research, innovation, and community services.</li>
                                <li>To preserve the values, traditions, and achievements of the institution through active alumni engagement.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* ================= OBJECTIVES & ACTIVITIES SECTION ================= */}
                <div className={styles.objectivesActivitiesSection}>
                    <div className={styles.objActGrid}>
                        <div className={styles.objectivesCard}>
                            <h2>Objectives of the Alumni Association</h2>
                            <ul className={styles.bulletList}>
                                <li>To create a platform for alumni to interact, share experiences, and exchange knowledge.</li>
                                <li>To provide scholarships and financial assistance to deserving students.</li>
                                <li>To contribute towards academic development and the improvement of institutional infrastructure.</li>
                                <li>To receive valuable suggestions and guidance from alumni for the overall development of the college.</li>
                                <li>To utilize the expertise of successful alumni by inviting them as resource persons for seminars, workshops, and guest lectures.</li>
                            </ul>
                        </div>
                        <div className={styles.activitiesCard}>
                            <h2>Activities of the Alumni Association</h2>
                            <ul className={styles.bulletList}>
                                <li>Organizing Annual Alumni Meets and reunion programmes.</li>
                                <li>Providing scholarships and financial assistance to deserving students.</li>
                                <li>Supporting academic and infrastructural development activities of the institution.</li>
                                <li>Conducting alumni interaction programmes with current students.</li>
                                <li>Inviting distinguished alumni as resource persons for seminars, workshops, and guest lectures.</li>
                                <li>Facilitating career guidance and professional development through alumni networking.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* ================= COMMITTEE & STAFF DETAILS SECTION ================= */}
                <div className={styles.committeeSection}>
                    <div className={styles.sectionTitle}>
                        <h1>Committee Members</h1>
                    </div>
                    <div className={styles.staffGrid}>
                        {committeeMembers.map((staff, idx) => (
                            <div className={styles.staffCard} key={idx}>
                                <div className={styles.staffHeader}>
                                    <div className={styles.staffBadge}>{staff.role}</div>
                                    <h3>{staff.name}</h3>
                                    <p className={styles.staffDesignation}>{staff.designation}</p>
                                    <p className={styles.staffDept}>Dept. of {staff.dept}</p>
                                </div>
                                <div className={styles.staffContact}>
                                    <a href={`mailto:${staff.email}`} className={styles.contactLink}>
                                        <FaEnvelope className={styles.contactIcon} /> {staff.email}
                                    </a>
                                    <a href={`tel:${staff.mobile}`} className={styles.contactLink}>
                                        <FaPhone className={styles.contactIcon} /> {staff.mobile}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ================= OFFICE BEARERS SECTION ================= */}
                <div className={styles.officeBearersSection}>
                    <div className={styles.sectionTitle}>
                        <h1>Office Bearers of the Alumni Association</h1>
                    </div>
                    <div className={styles.tableWrapper}>
                        <table className={styles.officeBearersTable}>
                            <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th>Designation</th>
                                    <th>Name and Qualification</th>
                                </tr>
                            </thead>
                            <tbody>
                                {officeBearers.map((bearer, idx) => (
                                    <tr key={idx}>
                                        <td>{bearer.sno}</td>
                                        <td className={styles.designationCell}>{bearer.designation}</td>
                                        <td className={styles.nameCell}>
                                            <FaGraduationCap className={styles.graduationIcon} />
                                            <span>{bearer.name} - <strong>{bearer.qualification}</strong></span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ================= RULES & REGULATIONS SECTION ================= */}
                <div className={styles.rulesSection}>
                    <div className={styles.sectionTitle}>
                        <h1>Rules & Regulations of the Alumni Association</h1>
                    </div>
                    <div className={styles.accordion}>
                        {rulesAndRegulations.map((rule, idx) => {
                            const isOpen = activeRuleIndex === idx;
                            return (
                                <div className={`${styles.accordionItem} ${isOpen ? styles.open : ''}`} key={idx}>
                                    <div
                                        className={styles.accordionHeader}
                                        onClick={() => setActiveRuleIndex(isOpen ? null : idx)}
                                    >
                                        <h3>{rule.title}</h3>
                                        <span className={styles.accordionChevron}>
                                            {isOpen ? '▲' : '▼'}
                                        </span>
                                    </div>
                                    <div
                                        className={styles.accordionContent}
                                        style={{ maxHeight: isOpen ? '500px' : '0px' }}
                                    >
                                        <ul className={styles.bulletList}>
                                            {rule.points.map((pt, pIdx) => (
                                                <li key={pIdx}>{pt}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Alumni;
