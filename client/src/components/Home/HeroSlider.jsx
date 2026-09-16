import { useEffect, useRef, useState } from 'react';
import Swiper from 'swiper';
import { EffectFade, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/bundle'; // Import all swiper styles
import './HeroSlider.css';
import { getHeroSlides } from '../../services/homeService';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

// Custom Icons as components or strings
const playSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`;
const pauseSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="0 0 24 24"><path d="M6 19h4V5H6zm8-14v14h4V5h-4z"/></svg>`;

const fallbackSlides = [
    {
        type: 'video',
        src: '/hero.mp4',
        title: 'Welcome to SVASC <br />Arts and Science College',
        description: 'Transforming knowledge into real-world impact, Shree Vengadeshwara empowers you with skills for a thriving career. Your future-ready education starts here..',
        link: '#',
        linkLabel: 'Explore'
    },
    {
        type: 'video',
        src: '/College Dron.mp4',
        title: 'Empowering Minds Through Quality Education',
        description: 'Providing world-class learning experiences and state-of-the-art campus infrastructure.',
        link: '#',
        linkLabel: 'Explore'
    },

];

const HeroSlider = () => {
    const sliderRef = useRef(null);
    const paginationRef = useRef(null);
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const response = await getHeroSlides();
                const rawSlides = response?.data || (Array.isArray(response) ? response : []);

                if (rawSlides.length > 0) {
                    const mapped = rawSlides.map(slide => {
                        let slideSrc = slide.src || '';
                        if (slideSrc && !slideSrc.startsWith('http') && !slideSrc.startsWith('./') && !slideSrc.startsWith('/')) {
                            slideSrc = `${BASE_URL}/${slideSrc.replace(/^\/+/, '')}`;
                        } else if (slideSrc && slideSrc.startsWith('/uploads/')) {
                            slideSrc = `${BASE_URL}/${slideSrc.replace(/^\/+/, '')}`;
                        }
                        return {
                            ...slide,
                            src: slideSrc || '/hero.mp4',
                            type: slide.type || (slideSrc.match(/\.(mp4|webm|ogg|mov)$/i) ? 'video' : 'image')
                        };
                    });
                    setSlides(mapped);
                } else {
                    setSlides(fallbackSlides);
                }
            } catch (error) {
                console.error('Error fetching hero slides:', error.message || error);
                setSlides(fallbackSlides);
            } finally {
                setLoading(false);
            }
        };
        fetchSlides();
    }, []);

    useEffect(() => {
        if (loading || slides.length === 0) return;

        let swiperInstance = null;
        let rafId = null;
        let lastTime = 0;
        const duration = 10000; // 10 seconds per slide

        const updateLoader = (index, percent) => {
            const paginationEl = paginationRef.current;
            if (!paginationEl) return;
            const bullets = paginationEl.querySelectorAll('.swiper-pagination-bullet');
            const bullet = bullets[index];
            const percentage = bullet?.querySelector('.percentage');
            if (percentage) {
                percentage.style.setProperty('--p', `${percent}%`);
            }
        };

        const loop = (now) => {
            if (!lastTime) lastTime = now;
            if (swiperInstance && swiperInstance.autoplay && !swiperInstance.autoplay.paused) {
                const elapsed = (duration - swiperInstance.autoplay.timeLeft);
                const progress = (elapsed / duration) * 100;
                updateLoader(swiperInstance.activeIndex, Math.round(progress));
            }
            rafId = requestAnimationFrame(loop);
        };

        const startCustomAutoplay = () => {
            rafId = requestAnimationFrame(loop);
        };

        const pauseAutoplay = () => {
            if (swiperInstance && swiperInstance.autoplay) swiperInstance.autoplay.pause();
        };

        const resumeAutoplay = () => {
            if (swiperInstance && swiperInstance.autoplay) swiperInstance.autoplay.resume();
        };

        const resetLoaders = (s) => {
            const swiper = s || swiperInstance;
            if (!swiper || !swiper.autoplay) return;

            const paginationEl = paginationRef.current;
            if (!paginationEl) return;

            const bullets = paginationEl.querySelectorAll('.swiper-pagination-bullet');
            bullets.forEach((bullet, idx) => {
                const isActive = bullet.classList.contains('swiper-pagination-bullet-active');

                if (isActive) {
                    bullet.innerHTML = `
                        <div class="bullet-content">
                            <button class="icon playpause-btn">${swiper.autoplay.paused ? playSVG : pauseSVG}</button>
                            <div class="percentage" style="--p: 0%"><div class="number">${idx + 1}</div></div>
                        </div>
                    `;

                    setTimeout(() => {
                        const pct = bullet.querySelector('.percentage');
                        if (pct) pct.classList.add('show');
                    }, 50);

                    const btn = bullet.querySelector('.playpause-btn');
                    if (btn) {
                        btn.onclick = (e) => {
                            e.stopPropagation();
                            if (swiper.autoplay.paused) {
                                resumeAutoplay();
                                btn.innerHTML = pauseSVG;
                            } else {
                                pauseAutoplay();
                                btn.innerHTML = playSVG;
                            }
                        };
                    }
                } else {
                    bullet.innerHTML = `<span class="number">${idx + 1}</span>`;
                }
            });
        };

        swiperInstance = new Swiper(sliderRef.current, {
            modules: [EffectFade, Pagination, Autoplay],
            effect: 'fade',
            speed: 1000,
            loop: true,
            autoplay: {
                delay: duration,
                disableOnInteraction: false,
            },
            pagination: {
                el: paginationRef.current,
                clickable: true,
                renderBullet: (index, className) => {
                    return `<span class="${className}"><span class="number">${index + 1}</span></span>`;
                },
            },
            on: {
                init: (s) => {
                    startCustomAutoplay();
                    resetLoaders(s);
                },
                slideChangeTransitionStart: (s) => {
                    resetLoaders(s);
                },
                slideChangeTransitionEnd: (s) => {
                    const slidesList = s.slides;
                    if (slidesList) {
                        slidesList.forEach((slide) => {
                            const video = slide.querySelector('video');
                            if (video) {
                                video.playbackRate = slide.classList.contains('swiper-slide-active') ? 0.5 : 1.0;
                            }
                        });
                    }
                    resetLoaders(s);
                },
            },
        });

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
            if (swiperInstance) swiperInstance.destroy();
        };
    }, [loading, slides]);

    if (loading) {
        return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', color: '#fff' }}>Loading Hero Section...</div>;
    }

    return (
        <div className="wrapper-slider">
            {/* Animated Butterfly Text Overlay */}
            <div className="butterfly-text-container">
                <h1 className="hero-main-title">Welcome to <span className="svasc-yellow">SVASC Erode</span></h1>
                <p className="hero-sub-title">Empowering Minds Through Quality Education</p>
            </div>

            <div className="swiper main-slider" ref={sliderRef}>
                <div className="swiper-wrapper">
                    {slides.map((slide, index) => (
                        <div className="swiper-slide" key={index}>
                            <div className="item">
                                {slide.type === 'video' ? (
                                    <div className="video">
                                        <video autoPlay loop muted playsInline key={slide.src}>
                                            <source src={slide.src} type="video/mp4" />
                                        </video>
                                    </div>
                                ) : (
                                    <picture>
                                        <img src={slide.src} alt={slide.title} />
                                    </picture>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="swiper-pagination" ref={paginationRef}></div>
            </div>
        </div>
    );
};

export default HeroSlider;
