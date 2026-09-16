import React, { useState, useEffect } from 'react';
import styles from './AwardsGallery.module.css';
import { ChevronsDown } from 'lucide-react';
import Hero from '../components/Common/Hero';
import { getAwards } from '../services/awardService';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const categoryTitles = {
    academic: "Academic Certificates",
    professional: "Professional/Staff Certificates",
    achievement: "Achievement Certificates",
    industry: "Industry/Professional Certificates",
    special: "Special Purpose Certificates",
    research: "Research Certificates"
};

const AwardsGallery = () => {
    const [activeCategory, setActiveCategory] = useState('academic');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [imageCollections, setImageCollections] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAwards();
    }, []);

    const fetchAwards = async () => {
        try {
            setLoading(true);
            const response = await getAwards();
            const list = response?.data ?? (Array.isArray(response) ? response : []);
            const groupedData = groupAwards(list);
            setImageCollections(groupedData);
        } catch (error) {
            console.error('Error fetching awards:', error);
        } finally {
            setLoading(false);
        }
    };

    const groupAwards = (awards) => {
        const initial = Object.keys(categoryTitles).reduce((acc, cat) => {
            acc[cat] = { title: categoryTitles[cat], column1: [], column2: [] };
            return acc;
        }, {});

        // Use a counter per category for even column distribution
        const catCounters = {};

        return awards.reduce((acc, award) => {
            const cat = award.category;
            if (!acc[cat]) {
                acc[cat] = {
                    title: categoryTitles[cat] || (cat.charAt(0).toUpperCase() + cat.slice(1) + " Certificates"),
                    column1: [],
                    column2: []
                };
            }

            if (!catCounters[cat]) catCounters[cat] = 0;
            const colKey = catCounters[cat] % 2 === 0 ? 'column1' : 'column2';
            catCounters[cat]++;

            const cleanImage = award.image.replace(/^\/+/, '');
            const imageUrl = award.image.startsWith('http') ? award.image : `${BASE_URL}/${cleanImage}`;

            acc[cat][colKey].push({
                src: imageUrl,
                alt: award.alt || award.category
            });
            return acc;
        }, initial);
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setIsMenuOpen(false);
    };

    const currentData = imageCollections[activeCategory] || { title: categoryTitles[activeCategory], column1: [], column2: [] };

    if (loading && Object.keys(imageCollections).length === 0) {
        return <div className={styles.loading}>Loading Awards...</div>;
    }

    return (
        <>
            <Hero
                title="Awards & Recognition"
                description="Celebrating Excellence, Achievement, and Innovation"
                image="https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=1600"
            />
            <div className={styles.wrapper}>
                <aside className={styles.sideContent}>
                    <div className={styles.sideHeader}>
                        <h2 className={styles.logo}>SVASC</h2>
                        <div className={styles.toggleBtn} onClick={toggleMenu}>
                            <ChevronsDown size={30} />
                        </div>
                    </div>

                    <nav className={styles.navMenu}>
                        <span className={styles.navLink}>Certificate Categories</span>
                    </nav>

                    <div className={`${styles.categories} ${isMenuOpen ? styles.categoriesOpen : ''}`}>
                        {Object.keys(imageCollections).map((key) => (
                            <h2
                                key={key}
                                className={`${styles.category} ${activeCategory === key ? styles.categoryActive : ''}`}
                                onClick={() => handleCategoryChange(key)}
                            >
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </h2>
                        ))}
                    </div>
                </aside>

                <main className={styles.mainContent}>
                    <h2 className={styles.categoryTitle}>{currentData.title}</h2>
                    <div className={styles.galleryColumns}>
                        <div className={styles.column}>
                            {currentData.column1.map((img, idx) => (
                                <img key={idx} src={img.src} alt={img.alt} className={styles.image} loading="lazy" />
                            ))}
                        </div>
                        <div className={styles.column}>
                            {currentData.column2.map((img, idx) => (
                                <img key={idx} src={img.src} alt={img.alt} className={styles.image} loading="lazy" />
                            ))}
                        </div>
                    </div>
                    {currentData.column1.length === 0 && currentData.column2.length === 0 && !loading && (
                        <p className={styles.empty}>No certificates available in this category.</p>
                    )}
                </main>
            </div>
        </>
    );
};

export default AwardsGallery;
