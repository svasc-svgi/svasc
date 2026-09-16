import React, { useState, useEffect, useRef } from 'react';
import styles from './Blogs.module.css';
import Hero from '../components/Common/Hero';
import { getBlogsPageHero, getBlogs } from '../services/blogService';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const defaultBlogs = [
    {
      ID: "all",
      category: "All",
      bImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
      copy: `<p>Welcome to our comprehensive college blogs portal. Here you'll find insightful articles and stories about all aspects of campus life including academic insights, cultural experiences, innovation showcases, student achievements, and official SVASC announcements.</p> <p>Our college is committed to sharing experiences and knowledge that enriches the educational journey. From technical tutorials to cultural reflections, from sports highlights to expert interviews, we ensure that every student has access to inspiring content that helps them learn, grow, and connect.</p><p>Stay updated with all the latest blog posts and stories from our campus. Check back regularly for new articles, insights, and opportunities to contribute to the vibrant narrative of our college community.</p>`,
      cards: [
        { image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400", title: "Campus Overview" },
        { image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400", title: "Student Life" },
        { image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400", title: "Facilities" },
        { image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400", title: "Activities" }
      ]
    },
    {
      ID: "academicEvents",
      category: "Academic Events",
      bImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800",
      copy: `<p>Our Academic Blogs section features insightful articles about scholarly activities including guest lectures, seminars, workshops, research findings, and academic competitions. These blogs are designed to share knowledge and foster intellectual growth among students and faculty.</p> <p>Recent blog posts cover distinguished speaker insights, departmental research highlights, competition experiences, and interdisciplinary explorations. Students share their experiences in music, dance, drama, art, and various traditional and contemporary art forms. These blog posts provide a platform for students to express themselves, appreciate different cultures, and build a sense of community and belonging.</p><p>We encourage all students to read and contribute to these academic blogs to broaden their horizons, develop critical thinking skills, and stay updated with the latest developments in their fields of study.</p>`,
      cards: [
        { image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400", title: "Guest Lectures" },
        { image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400", title: "Seminars" },
        { image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400", title: "Workshops" },
        { image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400", title: "Competitions" }
      ]
    },
    {
      ID: "cultures",
      category: "Cultures",
      bImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
      copy: `<p>Cultural blogs at our college celebrate diversity, creativity, and artistic expression. From annual festival recaps to talent showcase features, traditional celebration stories to modern performance reviews, our blogs capture the vibrant cultural pulse of campus life throughout the year.</p> <p>Students share their experiences in music, dance, drama, art, and various traditional and contemporary art forms. These blog posts provide a platform for students to express themselves, appreciate different cultures, and build a sense of community and belonging.</p><p>Our cultural committee regularly publishes stories about festival celebrations, cultural nights, inter-college competitions, and artistic workshops that enrich the campus atmosphere and create lasting memories for all participants.</p>`,
      cards: [
        { image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400", title: "Music Events" },
        { image: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=400", title: "Dance Shows" },
        { image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=400", title: "Drama & Theater" },
        { image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400", title: "Art Exhibitions" }
      ]
    },
    {
      ID: "innovationTech",
      category: "Innovation in Education and Tech",
      bImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800",
      copy: `<p>Innovation is at the heart of our educational approach. This blog section highlights stories from hackathons, tech fests, startup journeys, project showcases, and tutorials focused on emerging technologies such as AI, machine learning, blockchain, IoT, and more.</p> <p>Students share their experiences developing innovative solutions to real-world problems through hands-on projects, collaborative research, and entrepreneurial ventures. Our innovation lab and maker space stories provide inspiration and practical knowledge for budding innovators and tech enthusiasts.</p><p>We regularly publish articles about tech talks, coding competition experiences, innovation challenges, and industry collaborations that prepare students for the rapidly evolving technological landscape and encourage entrepreneurial thinking.</p>`,
      cards: [
        { image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400", title: "Hackathons" },
        { image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400", title: "Tech Fests" },
        { image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400", title: "Startup Programs" },
        { image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400", title: "Innovation Lab" }
      ]
    },
    {
      ID: "studentAchievements",
      category: "Student Achievements and Activities",
      bImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800",
      copy: `<p>We take pride in celebrating the remarkable achievements of our students through inspiring blog posts about academics, sports, cultural activities, research, competitions, and community service. This section showcases award stories, recognition features, success journeys, and outstanding performances by our talented student community.</p> <p>From winning national-level competitions to publishing research papers, from excelling in sports tournaments to leading social initiatives, our students consistently demonstrate excellence through their stories that make the college proud.</p><p>Student activity blogs include club experiences, volunteer program stories, leadership development insights, sports highlights, and various extracurricular activities that contribute to holistic development and help students discover their passions and potential.</p>`,
      cards: [
        { image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400", title: "Awards" },
        { image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400", title: "Sports" },
        { image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400", title: "Research" },
        { image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400", title: "Community Service" }
      ]
    },
    {
      ID: "svascNews",
      category: "SVASC News",
      bImage: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800",
      copy: `<p>Stay informed with the latest official announcements, news articles, and blog updates from SVASC. This section includes important notices, policy updates, administrative blog posts, academic calendar information, and institutional development stories.</p> <p>Recent blog posts cover new course launches, infrastructure developments, collaborations with industry partners, accreditation achievements, placement records, and other significant milestones reached by our institution.</p><p>We ensure transparent communication with students, faculty, and stakeholders through regular blog updates about college activities, upcoming initiatives, examination schedules, admission procedures, and other important information that affects the college community.</p>`,
      cards: [
        { image: "https://images.unsplash.com/photo-1586339949216-35c7e6b3c0ab?w=400", title: "Announcements" },
        { image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", title: "Updates" },
        { image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400", title: "Infrastructure" },
        { image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400", title: "Achievements" }
      ]
    }
  ];

const ProjectsPortfolio = () => {
  const [projects, setProjects] = useState(defaultBlogs);
  const [selectedProject, setSelectedProject] = useState(null);
  const [highlightedContent, setHighlightedContent] = useState({ ID: "", category: "", bImage: "", copy: "", cards: [] });
  const [modalCard, setModalCard] = useState(null);
  const [heroData, setHeroData] = useState({
    title: 'SVASC College Blogs',
    description: 'Discover the vibrant campus life at SVASC. From academic excellence to cultural celebrations, explore all the exciting blogs and stories.',
    image: 'https://images.unsplash.com/photo-1438109491414-7198515b166b?q=80&fm=jpg&s=cbdabf7a79c087a0b060670a6d79726c'
  });
  const scrollBackTo = useRef(0);
  const selectedAreaRef = useRef(null);

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
          const mapped = data.map(item => {
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
                  description: card.description || "No description provided.",
                  image: card.image?.startsWith('http') ? card.image : `${BASE_URL}/${cardClean}`
                };
              })
            };
          });
          setProjects(mapped);
        }
      } catch (err) {
        console.error("Error fetching blogs", err);
      }
    };
    fetchBlogs();
  }, []);

  const selectProject = (projectId) => {
    const project = projects.find(p => p.ID === projectId);

    if (selectedProject === projectId) {
      setSelectedProject(null);
      setTimeout(() => {
        window.scrollTo({ top: scrollBackTo.current, behavior: 'smooth' });
      }, 1600);
    } else {
      scrollBackTo.current = window.scrollY;
      setSelectedProject(projectId);
      setHighlightedContent(project);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 800);
    }
  };

  const [projectHeights, setProjectHeights] = useState({});

  const calculateHeights = () => {
    const winWidth = window.innerWidth;
    const midRange = winWidth < 920 && winWidth > 620;
    const smallRange = winWidth < 720;

    const heights = {};
    projects.forEach((project, index) => {
      const baseWidth = index < 2 ? (winWidth * 0.48 - 20) : (winWidth * 0.23 - 20);
      let height;

      if (index < 2) {
        height = baseWidth;
      } else {
        if (midRange) {
          height = baseWidth * 0.5;
        } else if (smallRange) {
          height = baseWidth;
        } else {
          height = baseWidth * 1.5;
        }
      }
      heights[project.ID] = height;
    });

    setProjectHeights(heights);
  };

  useEffect(() => {
    calculateHeights();
    window.addEventListener('resize', calculateHeights);
    return () => window.removeEventListener('resize', calculateHeights);
  }, []);

  // Reset scroll position when a project is opened
  useEffect(() => {
    if (selectedProject && selectedAreaRef.current) {
      selectedAreaRef.current.scrollTop = 0;
    }
  }, [selectedProject, highlightedContent]);

  const getProjectClass = (projectId) => {
    const classes = [styles.project];
    if (selectedProject === projectId) {
      classes.push(styles.openedProject);
    }
    if (selectedProject && selectedProject !== projectId) {
      classes.push(styles.hidden, styles.shrunk);
    }
    return classes.join(' ');
  };

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif", margin: 0, padding: 0, minHeight: '100vh' }}>
      {/* Hero Section */}
      <Hero
        title={heroData.title}
        description={heroData.description}
        image={heroData.image}
      />

      <h2 className={styles.blogsMainTitle}>
        Blogs
      </h2>

      <div style={{ width: '100%', float: 'left', clear: 'both' }}>
        {projects.map((project) => (
          <div
            key={project.ID}
            className={getProjectClass(project.ID)}
            style={{
              backgroundImage: `url(${project.bImage})`,
              height: projectHeights[project.ID] || '50px'
            }}
            onClick={() => selectProject(project.ID)}
          >
            <h3 className={styles.beforeTitle}>{project.category}</h3>
            <div className={styles.info}>
              <h1 className={styles.fadeTitle}>{project.category}</h1>
              <hr />
            </div>
            <p className={styles.backArrow}>
              <i className="fa fa-angle-double-left" aria-hidden="true">‹‹</i>
            </p>
          </div>
        ))}
      </div>

      <div
        ref={selectedAreaRef}
        className={`${styles.selectedArea} ${selectedProject ? styles.opened : ''}`}
      >
        <h1 style={{ backgroundImage: `url(${highlightedContent.bImage})` }}>
          <span>{highlightedContent.category}</span>
        </h1>
        <div
          className={styles.copyArea}
          dangerouslySetInnerHTML={{ __html: highlightedContent.copy }}
        />

        {highlightedContent.cards && highlightedContent.cards.length > 0 && (
          <div className={styles.cardContainer}>
            <div className={styles.eventUniqueSection}>
              <div className={styles.yearContainer}>
                <span className={styles.yearPart}>20</span>
                <span className={styles.yearPart}>26</span>
              </div>
              <div className={styles.eventInfo}>
                <div className={styles.eventDate}>
                  {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()}
                </div>
                <h2 className={styles.eventCategoryTitle}>
                  {highlightedContent.category}
                </h2>
              </div>
            </div>
            {highlightedContent.cards.map((card, index) => (
              <div key={index} className={styles.gameCard}>
                <div
                  className={styles.gameCardCover}
                  style={{ backgroundImage: `url(${card.image})`, cursor: 'pointer' }}
                  onClick={(e) => { e.stopPropagation(); setModalCard(card); }}
                >
                  <div className={styles.cardContentOverlay}>
                    <div className={styles.cardTitle}>{card.title}</div>
                    <button className={styles.readMoreBtn}>Read More</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modalCard && (
        <div className={styles.cardModalOverlay} onClick={() => setModalCard(null)}>
          <div className={styles.cardModalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeModalBtn} onClick={() => setModalCard(null)}>×</button>
            <img src={modalCard.image} alt={modalCard.title} className={styles.modalImage} />
            <h2 className={styles.modalTitle}>{modalCard.title}</h2>
            <div className={styles.modalDesc}>{modalCard.description}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPortfolio;
