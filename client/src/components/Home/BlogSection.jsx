import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import { getHomeBlogs } from '../../services/homeService';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './BlogSection.css';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const fallbackBlogs = [
    {
        day: 24,
        month: 'May',
        title: 'Campus Life & Student Growth',
        description: 'Insights into student achievements, campus culture, and the vibrant academic excellence that defines us.',
        image: 'https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        day: 25,
        month: 'May',
        title: 'Innovative Learning',
        description: 'Exploring modern teaching methods and technology that are shaping the future of education at SVASC.',
        image: 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        day: 26,
        month: 'May',
        title: 'Student Activities',
        description: 'From cultural fests to leadership camps, see how we encourage creativity and teamwork on campus.',
        image: 'https://images.pexels.com/photos/5212336/pexels-photo-5212336.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        day: 27,
        month: 'May',
        title: 'Career Pathways',
        description: 'Expert guidance on internships, placements, and building a strong professional portfolio for the future.',
        image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600'
    },
    {
        day: 28,
        month: 'May',
        title: 'Alumni Success',
        description: 'Celebrating the remarkable journeys of our graduations who are making waves in their industries.',
        image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
];

const BlogSection = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await getHomeBlogs();
                const blogList = response?.data ?? (Array.isArray(response) ? response : []);
                if (blogList && blogList.length > 0) {
                    const allItems = blogList.map(blog => {
                        const cleanImg = (blog.image || '').replace(/^\/+/, '');
                        const imgUrl = blog.image?.startsWith('http') ? blog.image : `${BASE_URL}/${cleanImg}`;
                        return {
                            _id: blog._id,
                            day: blog.day || 25,
                            month: blog.month || 'May',
                            title: blog.title || 'Insightful Blog',
                            description: blog.description || '',
                            image: imgUrl
                        };
                    });
                    setBlogs(allItems.length > 0 ? allItems : fallbackBlogs);
                } else {
                    setBlogs(fallbackBlogs);
                }
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setBlogs(fallbackBlogs);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    if (loading) {
        return <div style={{ padding: '60px 0', textAlign: 'center', color: '#fff', background: '#111' }}>Loading Blogs...</div>;
    }

    return (
        <section className="blog-section-wrapper">
            {/* Decorative Background */}
            <div className="blog-background">
                <img src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Background Texture" loading="lazy" />
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
                                <Link to="/blogs" className="news__item-link" style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                                    <div className="news__item">
                                        <div className="news-date">
                                            <span className="news-date__title">{blog.day}</span>
                                            <span>{blog.month}</span>
                                        </div>
                                        <div className="news__title">{blog.title}</div>
                                        <p className="news__txt">{blog.description}</p>
                                        <div className="news-readmore" style={{ color: '#0E2A5A', fontWeight: '600', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            Read More <span style={{ transition: 'transform 0.2s' }} className="readmore-arrow">→</span>
                                        </div>
                                        <div className="news__img">
                                            <img src={blog.image} alt={blog.title} loading="lazy" />
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
