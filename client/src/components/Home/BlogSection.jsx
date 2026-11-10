import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import { getHomeBlogs } from '../../services/homeService';
import { getBlogs } from '../../services/blogService';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './BlogSection.css';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const resolveImageUrl = (img) => {
    if (!img) return 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800';
    if (img.startsWith('http') || img.startsWith('/') || img.startsWith('data:')) return img;
    const cleanImg = img.replace(/^\/+/, '');
    return `${BASE_URL}/${cleanImg}`;
};

const fallbackBlogs = [
    {
        day: 24,
        month: 'May',
        title: 'Academic Events',
        description: 'Scholarly activities, guest lectures, seminars, research findings, and departmental workshops empowering student intellect.',
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800'
    },
    {
        day: 25,
        month: 'May',
        title: 'Cultural Activities & Arts',
        description: 'Celebrating diversity, creativity, and artistic expression through annual festival recaps, music, dance, and cultural shows.',
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800'
    },
    {
        day: 26,
        month: 'May',
        title: 'Innovation in Education and Tech',
        description: 'Hands-on project showcases, hackathons, coding contests, tech fests, startup journeys, and emerging AI technologies.',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800'
    },
    {
        day: 27,
        month: 'May',
        title: 'Student Achievements & Activities',
        description: 'Celebrating students excelling in university rank honors, sports championships, national research, and community service.',
        image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800'
    },
    {
        day: 28,
        month: 'May',
        title: 'SVASC News & Announcements',
        description: 'Official announcements, accreditation milestones, academic calendar updates, and institutional progress across SVASC.',
        image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800'
    }
];

const BlogSection = () => {
    const [blogs, setBlogs] = useState(() => {
        try {
            const cached = localStorage.getItem('svasc_cached_home_blogs');
            if (cached) {
                const parsed = JSON.parse(cached);
                if (Array.isArray(parsed) && parsed.length > 0) return parsed;
            }
        } catch (e) {
            // Fall back
        }
        return fallbackBlogs;
    });

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const [homeRes, mainRes] = await Promise.allSettled([
                    getHomeBlogs(),
                    getBlogs()
                ]);

                const merged = [];
                const seenTitles = new Set();

                // 1. Add blogs from main Blogs page (includes newly created/updated blogs)
                if (mainRes.status === 'fulfilled') {
                    const list = mainRes.value?.data ?? (Array.isArray(mainRes.value) ? mainRes.value : []);
                    list.forEach(item => {
                        const title = item.title || item.category || '';
                        const norm = title.trim().toLowerCase();
                        if (norm && !seenTitles.has(norm)) {
                            seenTitles.add(norm);
                            const rawImg = item.image || item.bannerImage || (item.cards && item.cards[0] ? item.cards[0].image : '') || '';
                            const imgUrl = resolveImageUrl(rawImg);
                            const plainDesc = (item.description || item.copy || '')
                                .replace(/<[^>]+>/g, '')
                                .replace(/\s+/g, ' ')
                                .trim()
                                .slice(0, 140);
                            const date = new Date(item.createdAt || Date.now());
                            merged.push({
                                _id: item._id || item.ID,
                                day: date.getDate() || 25,
                                month: date.toLocaleString('en-US', { month: 'short' }) || 'May',
                                title: title,
                                description: plainDesc || 'Discover insightful articles and updates from SVASC.',
                                image: imgUrl
                            });
                        }
                    });
                }

                // 2. Also incorporate items from Home blogs
                if (homeRes.status === 'fulfilled') {
                    const list = homeRes.value?.data ?? (Array.isArray(homeRes.value) ? homeRes.value : []);
                    list.forEach(item => {
                        const title = item.title || item.category || '';
                        const norm = title.trim().toLowerCase();
                        if (norm && !seenTitles.has(norm)) {
                            seenTitles.add(norm);
                            const imgUrl = resolveImageUrl(item.image);
                            const plainDesc = (item.description || '')
                                .replace(/<[^>]+>/g, '')
                                .replace(/\s+/g, ' ')
                                .trim()
                                .slice(0, 140);
                            merged.push({
                                _id: item._id,
                                day: item.day || 25,
                                month: item.month || 'May',
                                title: title || 'Insightful Blog',
                                description: plainDesc || 'Discover insightful articles and updates from SVASC.',
                                image: imgUrl
                            });
                        }
                    });
                }

                if (merged.length > 0) {
                    setBlogs(merged);
                    try {
                        localStorage.setItem('svasc_cached_home_blogs', JSON.stringify(merged));
                    } catch (e) {}
                }
            } catch (error) {
                console.error('Error fetching blogs for home section:', error);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <section className="blog-section-wrapper">
            {/* Decorative Background */}
            <div className="blog-background">
                <img src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Background Texture" loading="lazy" decoding="async" />
            </div>

            <div className="blog-content-container">
                {/* Header */}
                <div className="blog-header">
                    <h2>
                        SVASC <br />
                        <span>Insightful Blogs</span>
                    </h2>
                    <Link to="/blogs">View All Stories</Link>
                </div>

                {/* Slider */}
                <div className="news-slider">
                    <Swiper
                        modules={[EffectCoverflow, Pagination, Autoplay]}
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={'auto'}
                        loop={blogs.length > 2}
                        loopedSlides={blogs.length}
                        speed={800}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2.5,
                            slideShadows: false,
                        }}
                        pagination={{
                            el: '.news-slider__pagination',
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        spaceBetween={30}
                        className="swiper-container"
                    >
                        {blogs.map((blog, idx) => (
                            <SwiperSlide key={blog._id || idx} className="news-slider__item">
                                <Link to="/blogs" className="news__item-link" style={{ textDecoration: 'none', display: 'block' }}>
                                    <div className="news__item">
                                        <div className="news-date">
                                            <span className="news-date__title">{blog.day}</span>
                                            <span>{blog.month}</span>
                                        </div>
                                        <div className="news__title">{blog.title}</div>
                                        <p className="news__txt">{blog.description}</p>
                                        <div className="news-readmore">
                                            Read More <span className="readmore-arrow">→</span>
                                        </div>
                                        <div className="news__img">
                                            <img src={blog.image} alt={blog.title} loading="lazy" decoding="async" />
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="news-slider__pagination"></div>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
