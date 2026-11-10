import React, { useState, useEffect } from 'react';
import styles from './Blogs.module.css';
import Hero from '../components/Common/Hero';
import { getBlogsPageHero, getBlogs } from '../services/blogService';
import { defaultBlogs } from '../data/blogsData';
import { Calendar, User, ArrowRight, Search, X, Layers, ExternalLink } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const Blogs = () => {
    const [blogs, setBlogs] = useState(defaultBlogs);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [readingBlog, setReadingBlog] = useState(null);
    const [zoomedCard, setZoomedCard] = useState(null);

    const [heroData, setHeroData] = useState({
        title: 'SVASC College Blogs',
        description: 'Discover vibrant student life, academic excellence, innovation, and campus celebrations at Shree Venkateshwara Arts and Science College.',
        image: 'https://images.unsplash.com/photo-1438109491414-7198515b166b?q=80&fm=jpg&s=cbdabf7a79c087a0b060670a6d79726c'
    });

    useEffect(() => {
        getBlogsPageHero().then(res => {
            const d = res?.data ?? res;
            if (d && d.title) {
                const cleanImg = d.image ? d.image.replace(/^\/+/, '') : '';
                setHeroData({
                    title: d.title || heroData.title,
                    description: d.description || heroData.description,
                    image: d.image ? (d.image.startsWith('http') ? d.image : `${BASE_URL}/${cleanImg}`) : heroData.image
                });
            }
        }).catch(() => {});
    }, []);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await getBlogs();
                const data = res?.data ?? (Array.isArray(res) ? res : []);
                if (data.length > 0) {
                    const mappedDbBlogs = data.map(item => {
                        const cleanImg = (item.bannerImage || '').replace(/^\/+/, '');
                        return {
                            ID: item._id,
                            category: item.category,
                            title: item.title || item.category,
                            author: item.author || 'SVASC Editorial',
                            date: item.date || '25 May, 2026',
                            readTime: item.readTime || '4 min read',
                            bImage: item.bannerImage?.startsWith('http') ? item.bannerImage : `${BASE_URL}/${cleanImg}`,
                            copy: item.description,
                            cards: (item.cards || []).map(card => {
                                const cardClean = (card.image || '').replace(/^\/+/, '');
                                return {
                                    title: card.title,
                                    description: card.description || 'No description provided.',
                                    image: card.image?.startsWith('http') ? card.image : `${BASE_URL}/${cardClean}`
                                };
                            })
                        };
                    });

                    // Merge dynamic DB blogs with defaultBlogs without losing existing content
                    const existingCategories = new Set(mappedDbBlogs.map(b => b.category.toLowerCase().trim()));
                    const remainingDefaults = defaultBlogs.filter(d => !existingCategories.has(d.category.toLowerCase().trim()));
                    setBlogs([...mappedDbBlogs, ...remainingDefaults]);
                }
            } catch (err) {
                console.error('Error fetching blogs', err);
            }
        };
        fetchBlogs();
    }, []);

    // Extract dynamic category tabs matching the AJKCAS smart-filter tabs
    const categoryTabs = ['All', ...Array.from(new Set(blogs.map(b => b.category).filter(Boolean)))];

    // Filter posts
    const filteredBlogs = blogs.filter(blog => {
        const matchesCategory = selectedCategory === 'All' || blog.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim();
        const q = searchQuery.toLowerCase().trim();
        const plainDesc = (blog.copy || blog.description || '').replace(/<[^>]+>/g, '').toLowerCase();
        const matchesSearch = !q ||
            blog.category.toLowerCase().includes(q) ||
            plainDesc.includes(q) ||
            (blog.cards && blog.cards.some(c => (c.title || '').toLowerCase().includes(q) || (c.description || '').toLowerCase().includes(q)));
        return matchesCategory && matchesSearch;
    });

    const getCleanExcerpt = (htmlOrText) => {
        if (!htmlOrText) return '';
        const plain = htmlOrText.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
        return plain.length > 175 ? plain.slice(0, 175) + '...' : plain;
    };

    return (
        <div className={styles.blogsPageWrapper}>
            {/* Top Hero Section */}
            <Hero
                title={heroData.title}
                description={heroData.description}
                image={heroData.image}
            />

            <main className={styles.blogsMainContainer}>
                {/* Header Title & Tagline */}
                <div className={styles.blogsHeader}>
                    <span className={styles.blogsMainLabel}>SVASC Articles & News</span>
                    <h1 className={styles.blogsMainTitle}>SVASC Insightful Blogs</h1>
                    <p className={styles.blogsMainSubtitle}>
                        Explore in-depth articles on academics, cultural festivals, student innovations, campus achievements, and college news.
                    </p>
                </div>

                {/* Category Smart Filter Tabs (AJKCAS Reference Style) */}
                <div className={styles.filterBarWrapper}>
                    <ul className={styles.filterTabsList}>
                        {categoryTabs.map((cat, idx) => {
                            const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
                            return (
                                <li key={idx}>
                                    <button
                                        type="button"
                                        className={`${styles.filterTabBtn} ${isActive ? styles.filterTabActive : ''}`}
                                        onClick={() => setSelectedCategory(cat)}
                                    >
                                        <span>{cat}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Filter Controls Row: Count & Search */}
                    <div className={styles.filterControlsRow}>
                        <div className={styles.resultsCount}>
                            Showing <strong>{filteredBlogs.length}</strong> {filteredBlogs.length === 1 ? 'article' : 'articles'}
                            {selectedCategory !== 'All' && <span> in <em>{selectedCategory}</em></span>}
                        </div>

                        <div className={styles.searchBox}>
                            <Search size={16} color="#9ca3af" />
                            <input
                                type="text"
                                placeholder="Search articles or topics..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={styles.searchInput}
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                    aria-label="Clear search"
                                >
                                    <X size={14} color="#9ca3af" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* 3-Column Posts Grid (AJKCAS Post Layout 1) */}
                <div className={styles.postsGrid}>
                    {filteredBlogs.map((blog, idx) => (
                        <article
                            key={blog.ID || idx}
                            className={styles.blogCard}
                            onClick={() => setReadingBlog(blog)}
                        >
                            {/* Card Media */}
                            <div className={styles.cardMedia}>
                                <img
                                    src={blog.bImage}
                                    alt={blog.category}
                                    className={styles.cardImage}
                                    loading="lazy"
                                />
                                <span className={styles.categoryBadge}>{blog.category}</span>
                            </div>

                            {/* Card Body */}
                            <div className={styles.cardBody}>
                                <div className={styles.cardMetaRow}>
                                    <span className={styles.metaItem}>
                                        <Calendar size={14} color="#f4b706" />
                                        <span>{blog.date || '25 May, 2026'}</span>
                                    </span>
                                    <span className={styles.metaItem}>
                                        <User size={14} color="#f4b706" />
                                        <span>{blog.author || 'SVASC Editorial'}</span>
                                    </span>
                                </div>

                                <h2 className={styles.cardTitle}>{blog.title || blog.category}</h2>

                                <p className={styles.cardExcerpt}>
                                    {getCleanExcerpt(blog.copy || blog.description)}
                                </p>

                                {/* Child Card Highlights Preview */}
                                {blog.cards && blog.cards.length > 0 && (
                                    <div className={styles.subtopicsRow}>
                                        {blog.cards.slice(0, 3).map((card, cIdx) => (
                                            <span key={cIdx} className={styles.subtopicChip}>
                                                • {card.title}
                                            </span>
                                        ))}
                                        {blog.cards.length > 3 && (
                                            <span className={styles.subtopicChip}>
                                                +{blog.cards.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                )}

                                <div className={styles.cardFooter}>
                                    <button
                                        type="button"
                                        className={styles.readMoreBtn}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setReadingBlog(blog);
                                        }}
                                    >
                                        Read Article <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}

                    {filteredBlogs.length === 0 && (
                        <div className={styles.emptyState}>
                            <Layers size={48} color="#d1d5db" />
                            <h3 className={styles.emptyStateTitle}>No blogs found</h3>
                            <p className={styles.emptyStateText}>
                                {searchQuery
                                    ? `No articles match "${searchQuery}". Try different keywords or clear the filter.`
                                    : 'There are currently no articles published under this category.'}
                            </p>
                        </div>
                    )}
                </div>
            </main>

            {/* Rich Article Reader Modal (Full Story View with all Data & Sub-cards) */}
            {readingBlog && (
                <div
                    className={styles.readerModalOverlay}
                    onClick={() => setReadingBlog(null)}
                >
                    <div
                        className={styles.readerModalBox}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className={styles.readerModalHeader}>
                            <div className={styles.readerModalHeaderMeta}>
                                <span className={styles.categoryBadge} style={{ position: 'static' }}>
                                    {readingBlog.category}
                                </span>
                                <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                                    By {readingBlog.author || 'SVASC Editorial'} • {readingBlog.date || '25 May, 2026'} • {readingBlog.readTime || '4 min read'}
                                </span>
                            </div>
                            <button
                                className={styles.readerCloseBtn}
                                onClick={() => setReadingBlog(null)}
                                aria-label="Close article"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Content Scroll */}
                        <div className={styles.readerModalScroll}>
                            {/* Hero Banner */}
                            <div className={styles.readerHeroBanner}>
                                <img src={readingBlog.bImage} alt={readingBlog.title || readingBlog.category} />
                                <div className={styles.readerHeroOverlay}>
                                    <h1 className={styles.readerHeroTitle}>{readingBlog.title || readingBlog.category}</h1>
                                </div>
                            </div>

                            {/* Full HTML Article Content */}
                            <div
                                className={styles.readerBodyContent}
                                dangerouslySetInnerHTML={{ __html: readingBlog.copy || readingBlog.description }}
                            />

                            {/* Associated Sub-cards / Activity Highlights */}
                            {readingBlog.cards && readingBlog.cards.length > 0 && (
                                <div className={styles.readerSubcardsSection}>
                                    <h3 className={styles.readerSubcardsHeading}>
                                        Key Highlights & Activity Topics
                                    </h3>
                                    <div className={styles.readerSubcardsGrid}>
                                        {readingBlog.cards.map((card, cIdx) => (
                                            <div
                                                key={cIdx}
                                                className={styles.subCardItem}
                                                onClick={() => setZoomedCard(card)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <img
                                                    src={card.image}
                                                    alt={card.title}
                                                    className={styles.subCardImage}
                                                    loading="lazy"
                                                />
                                                <div className={styles.subCardContent}>
                                                    <h4 className={styles.subCardTitle}>{card.title}</h4>
                                                    <p className={styles.subCardDesc}>{card.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Sub-card Zoom Modal */}
            {zoomedCard && (
                <div
                    className={styles.readerModalOverlay}
                    style={{ zIndex: 2100 }}
                    onClick={() => setZoomedCard(null)}
                >
                    <div
                        className={styles.readerModalBox}
                        style={{ maxWidth: '640px' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles.readerModalHeader}>
                            <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#002147', fontFamily: 'Playfair Display, serif' }}>
                                {zoomedCard.title}
                            </h3>
                            <button
                                className={styles.readerCloseBtn}
                                onClick={() => setZoomedCard(null)}
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div style={{ padding: '20px' }}>
                            <img
                                src={zoomedCard.image}
                                alt={zoomedCard.title}
                                style={{ width: '100%', height: '320px', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px' }}
                            />
                            <p style={{ fontSize: '1.15rem', color: '#374151', lineHeight: '1.7', textAlign: 'justify', margin: 0 }}>
                                {zoomedCard.description}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Blogs;
