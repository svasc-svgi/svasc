import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { getValueSlides } from '../../services/homeService';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const defaultSlides = [
    {
        backgroundImage: 'https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg',
        field1: 'Academic Excellence',
        field2: 'Interactive Learning',
        field3: 'Expert Faculty Members',
        field4: 'Skill Based Curriculum',
        field5: 'A-Grade Certification'
    },
    {
        backgroundImage: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg',
        field1: '100% Placement Support',
        field2: 'Mock Interview Sessions',
        field3: 'Industry Collaboration',
        field4: 'Top Recruiters Network',
        field5: 'Career Guidance Cells'
    },
    {
        backgroundImage: 'https://images.pexels.com/photos/5212336/pexels-photo-5212336.jpeg',
        field1: 'Vibrant Campus Life',
        field2: 'Rising Stars Club',
        field3: 'Annual Cultural Diwas',
        field4: 'Elite Infrastructure',
        field5: 'Sports & Arts Clubs'
    },
    {
        backgroundImage: 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg',
        field1: 'Modern Laboratory Facilities',
        field2: 'Hi-Tech Research Centers',
        field3: 'Advanced Smart Classrooms',
        field4: 'Digitalized Library Access',
        field5: 'Practical Skills First'
    }
];

const ValuesCarousel = () => {
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const response = await getValueSlides();
                const rawSlides = response?.data || (Array.isArray(response) ? response : []);

                if (rawSlides.length > 0) {
                    const mapped = rawSlides.map(slide => {
                        const cleanImg = (slide.backgroundImage || '').replace(/^\/+/, '');
                        const imgUrl = slide.backgroundImage?.startsWith('http') ? slide.backgroundImage : `${BASE_URL}/${cleanImg}`;
                        return {
                            ...slide,
                            backgroundImage: imgUrl
                        };
                    });
                    setSlides(mapped);
                } else {
                    setSlides(defaultSlides);
                }
            } catch (error) {
                console.error('Error fetching value slides:', error.message || error);
                setSlides(defaultSlides);
            } finally {
                setLoading(false);
            }
        };
        fetchSlides();
    }, []);

    if (loading) {
        return <div style={{ padding: '60px 0', textAlign: 'center', background: '#fff', color: '#333' }}>Loading Values...</div>;
    }

    return (
        <div className="values-carousel-scope">
            <style>{`
        .values-carousel-scope {
          --tst: bottom 0.5s ease 0s;
          --dark: #E6E6E6EE;
          font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
          font-size: 14px;
          color: #000;
          overflow-x: hidden;
          background: #ffffff;
          width: 100%;
        }

        .values-carousel-scope * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        /* Reduced top padding from 60px to 20px to reduce space */
        .values-carousel-scope .values-carousel-header {
            text-align: center;
            padding: 0 20px 10px;
            position: relative;
            z-index: 1;
        }

        .values-carousel-scope .values-carousel-header h1 {
            font-size: 3em;
            margin: 0 0 15px;
            color: #003366;
            font-weight: 700;
            letter-spacing: -0.5px;
        }

        .values-carousel-scope .values-carousel-header h2 {
            font-size: 1.5em;
            margin: 0;
            color: #555;
            font-weight: 400;
            line-height: 1.5;
            max-width: 800px;
            margin: 0 auto;
        }

        .values-carousel-scope .swiper {
            width: 100%;
            padding-top: 20px; /* Reduced from 30px */
            padding-bottom: 50px; /* Reduced from 70px */
        }

        .values-carousel-scope .swiper-slide {
            background-position: center;
            background-size: cover;
            width: 400px;
            height: 500px;
            border-radius: 10px;
            overflow: hidden;
            position: relative;
            /* Ensure shadow is visible */
            box-shadow: 0 15px 50px rgba(0,0,0,0.2);
        }

        .values-carousel-scope .swiper-slide-shadow-left {
            background-image: linear-gradient(to left, #000, #fff0);
            border-right: 1px solid #000;
            border-radius: 10px;
        }

        .values-carousel-scope .swiper-slide-shadow-right {
            background-image: linear-gradient(to right, #000, #fff0);
            box-shadow: 0 0 0 1px #000;
            border-radius: 10px;
        }

        .values-carousel-scope .swiper-pagination-bullet {
            background: #696969;
            transition: all 0.5s ease 0s;
            border-radius: 8px;
            width: 8px;
            height: 8px;
            display: inline-block;
            opacity: 1;
        }

        .values-carousel-scope .swiper-pagination-bullet-active {
            background: #ffc107;
            width: 30px;
        }

        .values-carousel-scope .info {
            position: absolute;
            width: 100%;
            height: auto;
            max-height: 80%;
            background: linear-gradient(0deg, #000000 0%, #000000dd 60%, #00000000 100%);
            padding: 15px;
            padding-top: 70px;
            left: 0;
            bottom: -100%; /* Force hidden initially */
            box-sizing: border-box;
            transition: var(--tst);
            z-index: 10;
        }

        /* Ensure specificity for active slide */
        .values-carousel-scope .swiper-slide-active .info {
            bottom: 0 !important;
            transition: var(--tst);
        }
        
        /* Fix for swiper wrapper layout to ensure coverflow 3d works */
        .swiper-wrapper {
             z-index: 1;
        }

        .values-carousel-scope .info span {
            width: 100%;
            margin: 0.25em 0 0.25em 0;
            display: inline-block;
            padding: 0.55em 0.5em 0.55em 4em;
            box-sizing: border-box;
            color: var(--dark);
            text-align: left;
            position: relative;
            text-transform: uppercase;
            font-size: 12px;
            border-radius: 2em;
        }

        .values-carousel-scope .info span:hover {
            background: #0008;
            filter: invert(1);
        }

        .values-carousel-scope .info span:before {
            content: "";
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            width: 8px;
            height: 8px;
            background: var(--dark);
            border-radius: 50%;
        }

        /* Responsive adjustments for mobile */
        @media (max-width: 768px) {
            .values-carousel-scope .values-carousel-header h1 {
                font-size: 2em;
            }
            .values-carousel-scope .values-carousel-header h2 {
                font-size: 1.1em;
            }
            .values-carousel-scope .swiper-slide {
                width: 280px;
                height: 350px;
            }
            .values-carousel-scope .swiper {
                padding-bottom: 40px;
            }
        }

        @media (max-width: 480px) {
             .values-carousel-scope .values-carousel-header h1 {
                font-size: 1.6em;
            }
            .values-carousel-scope .swiper-slide {
                width: 240px;
                height: 300px;
            }
        }
      `}</style>

            <div className="values-carousel-header">
                <h1>Our Unique Values</h1>
                <h2>What makes SVASC the Best College of Arts and Science in Erode</h2>
            </div>

            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={slides.length > 2}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={{ clickable: true }}
                breakpoints={{
                    320: {
                        slidesPerView: 1.5
                    },
                    600: {
                        slidesPerView: 2
                    },
                    992: {
                        slidesPerView: 3
                    }
                }}
                modules={[EffectCoverflow, Pagination]}
                className="swiper"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={slide._id || index} style={{ backgroundImage: `url(${slide.backgroundImage})` }}>
                        <div className="info">
                            <span title="Value 1">{slide.field1}</span>
                            <span title="Value 2">{slide.field2}</span>
                            <span title="Value 3">{slide.field3}</span>
                            <span title="Value 4">{slide.field4}</span>
                            <span title="Value 5">{slide.field5}</span>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ValuesCarousel;
