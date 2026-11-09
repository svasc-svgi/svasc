import React, { useState, useEffect } from 'react';
import styles from './Blogs.module.css';
import Hero from '../components/Common/Hero';
import { getBlogsPageHero, getBlogs } from '../services/blogService';
import { Calendar, User, ArrowRight, Search, X, Layers, ExternalLink } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const defaultBlogs = [
    {
      ID: "all",
      category: "Campus Life & Community",
      bImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
      copy: `<p>Welcome to our comprehensive college blogs portal. Here you'll find insightful articles and stories about all aspects of campus life including academic insights, cultural experiences, innovation showcases, student achievements, and official SVASC announcements.</p> <p>Our college is committed to sharing experiences and knowledge that enriches the educational journey. From technical tutorials to cultural reflections, from sports highlights to expert interviews, we ensure that every student has access to inspiring content that helps them learn, grow, and connect.</p><p>Stay updated with all the latest blog posts and stories from our campus. Check back regularly for new articles, insights, and opportunities to contribute to the vibrant narrative of our college community.</p>`,
      cards: [
        { image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400", title: "Campus Overview", description: "A detailed glimpse into the SVASC state-of-the-art campus, modern learning zones, and green open spaces." },
        { image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400", title: "Student Life", description: "Vibrant clubs, daily campus activities, friendship, leadership opportunities, and community fellowship." },
        { image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400", title: "Facilities", description: "High-tech laboratories, modern smart classrooms, comprehensive library facilities, and recreational avenues." },
        { image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400", title: "Activities", description: "Extracurriculars, workshops, seminars, NSS, YRC, and campus celebration days throughout the academic year." }
      ]
    },
    {
      ID: "academicEvents",
      category: "Academic Events",
      bImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800",
      copy: `<p>Our Academic Blogs section features insightful articles about scholarly activities including guest lectures, seminars, workshops, research findings, and academic competitions. These blogs are designed to share knowledge and foster intellectual growth among students and faculty.</p> <p>Recent blog posts cover distinguished speaker insights, departmental research highlights, competition experiences, and interdisciplinary explorations. Students share their experiences in music, dance, drama, art, and various traditional and contemporary art forms. These blog posts provide a platform for students to express themselves, appreciate different cultures, and build a sense of community and belonging.</p><p>We encourage all students to read and contribute to these academic blogs to broaden their horizons, develop critical thinking skills, and stay updated with the latest developments in their fields of study.</p>`,
      cards: [
        { image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400", title: "Guest Lectures", description: "Eminent industry experts and university scholars delivering masterclasses on cutting-edge topics." },
        { image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400", title: "Seminars", description: "Interactive departmental seminars providing students with platforms to discuss research innovations." },
        { image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400", title: "Workshops", description: "Practical hands-on technical workshops bridging classroom theory with industrial practices." },
        { image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400", title: "Competitions", description: "Inter-collegiate and intra-departmental academic challenges, hackathons, and quiz tournaments." }
      ]
    },
    {
      ID: "cultures",
      category: "Cultural",
      bImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
      copy: `<p>Cultural blogs at our college celebrate diversity, creativity, and artistic expression. From annual festival recaps to talent showcase features, traditional celebration stories to modern performance reviews, our blogs capture the vibrant cultural pulse of campus life throughout the year.</p> <p>Students share their experiences in music, dance, drama, art, and various traditional and contemporary art forms. These blog posts provide a platform for students to express themselves, appreciate different cultures, and build a sense of community and belonging.</p><p>Our cultural committee regularly publishes stories about festival celebrations, cultural nights, inter-college competitions, and artistic workshops that enrich the campus atmosphere and create lasting memories for all participants.</p>`,
      cards: [
        { image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400", title: "Music Events", description: "Live acoustic sessions, vocal recitals, instrumental bands, and inter-college singing championships." },
        { image: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=400", title: "Dance Shows", description: "Traditional classical forms, western contemporary dance, and high-energy group choreographies." },
        { image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=400", title: "Drama & Theater", description: "Thought-provoking theatrical plays, skits, and dramatic storytelling addressing social themes." },
        { image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400", title: "Art Exhibitions", description: "Creative oil paintings, digital art, charcoal sketches, and handcrafted student installations." }
      ]
    },
    {
      ID: "innovationTech",
      category: "Innovations in Education and Technology",
      bImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800",
      copy: `<p>Innovation is at the heart of our educational approach. This blog section highlights stories from hackathons, tech fests, startup journeys, project showcases, and tutorials focused on emerging technologies such as AI, machine learning, blockchain, IoT, and more.</p> <p>Students share their experiences developing innovative solutions to real-world problems through hands-on projects, collaborative research, and entrepreneurial ventures. Our innovation lab and maker space stories provide inspiration and practical knowledge for budding innovators and tech enthusiasts.</p><p>We regularly publish articles about tech talks, coding competition experiences, innovation challenges, and industry collaborations that prepare students for the rapidly evolving technological landscape and encourage entrepreneurial thinking.</p>`,
      cards: [
        { image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400", title: "Hackathons", description: "24-hour non-stop code sprints and solution challenges solving real community problems." },
        { image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400", title: "Tech Fests", description: "Annual technical extravaganza featuring project displays, robotics arenas, and tech talks." },
        { image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400", title: "Startup Programs", description: "Incubation support, business pitching workshops, and student entrepreneurship guidance." },
        { image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400", title: "Innovation Lab", description: "Prototyping equipment, IoT sensors, AI workstations, and creative exploration spaces." }
      ]
    },
    {
      ID: "studentAchievements",
      category: "Student Activities and Achievements",
      bImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800",
      copy: `<p>We take pride in celebrating the remarkable achievements of our students through inspiring blog posts about academics, sports, cultural activities, research, competitions, and community service. This section showcases award stories, recognition features, success journeys, and outstanding performances by our talented student community.</p> <p>From winning national-level competitions to publishing research papers, from excelling in sports tournaments to leading social initiatives, our students consistently demonstrate excellence through their stories that make the college proud.</p><p>Student activity blogs include club experiences, volunteer program stories, leadership development insights, sports highlights, and various extracurricular activities that contribute to holistic development and help students discover their passions and potential.</p>`,
      cards: [
        { image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400", title: "Awards", description: "State and national accolades, academic distinctions, and leadership recognition." },
        { image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400", title: "Sports", description: "Medals, university championship trophies, and athletic records set by our student athletes." },
        { image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400", title: "Research", description: "Peer-reviewed scientific journals, patents, and faculty-student collaborative papers." },
        { image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400", title: "Community Service", description: "NSS village adoption drives, blood donation camps, and environmental conservation walks." }
      ]
    },
    {
      ID: "svascNews",
      category: "SVASC News",
      bImage: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800",
      copy: `<p>Stay informed with the latest official announcements, news articles, and blog updates from SVASC. This section includes important notices, policy updates, administrative blog posts, academic calendar information, and institutional development stories.</p> <p>Recent blog posts cover new course launches, infrastructure developments, collaborations with industry partners, accreditation achievements, placement records, and other significant milestones reached by our institution.</p><p>We ensure transparent communication with students, faculty, and stakeholders through regular blog updates about college activities, upcoming initiatives, examination schedules, admission procedures, and other important information that affects the college community.</p>`,
      cards: [
        { image: "https://images.unsplash.com/photo-1586339949216-35c7e6b3c0ab?w=400", title: "Announcements", description: "Official college circulars, examination updates, and academic notifications." },
        { image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", title: "Updates", description: "New curriculum additions, campus upgrades, and student services enhancements." },
        { image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400", title: "Infrastructure", description: "Modern campus facilities, sports grounds, cafeteria, and smart classroom expansions." },
        { image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400", title: "Achievements", description: "Institutional rankings, NAAC accreditation distinctions, and university affiliations." }
      ]
    }
];

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
                                        <span>25 May, 2026</span>
                                    </span>
                                    <span className={styles.metaItem}>
                                        <User size={14} color="#f4b706" />
                                        <span>SVASC Editorial</span>
                                    </span>
                                </div>

                                <h2 className={styles.cardTitle}>{blog.category}</h2>

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
                                    SVASC Official Feature
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
                                <img src={readingBlog.bImage} alt={readingBlog.category} />
                                <div className={styles.readerHeroOverlay}>
                                    <h1 className={styles.readerHeroTitle}>{readingBlog.category}</h1>
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
