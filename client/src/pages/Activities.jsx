import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Activities.module.css';
import Hero from '../components/Common/Hero';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

import { defaultActivities } from '../data/activitiesData';
import { getActivities } from '../services/activityService';
import campusHeroImg from '../assets/campushero.jpg';
import clubImg from '../assets/club.jpg';
import cellImg from '../assets/cell.JPG';
import commitiesImg from '../assets/commities.JPG';


const ProjectsPortfolio = () => {
  const navigate = useNavigate();
  const { category: categoryParam } = useParams();
  const [projects, setProjects] = useState(defaultActivities);
  const [selectedProject, setSelectedProject] = useState(null);
  const [highlightedContent, setHighlightedContent] = useState({ ID: "", category: "", bImage: "", copy: "", cards: [] });
  const [projectHeights, setProjectHeights] = useState({});
  const [heroData, setHeroData] = useState({
    title: 'SVASC Campus Activities',
    description: 'Explore the comprehensive range of student support services, clubs, and developmental programs at SVASC.',
    image: campusHeroImg
  });
  const scrollBackTo = useRef(0);
  const selectedAreaRef = useRef(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/page-heros/activities`).then(res => {
      if (res.data.success && res.data.data) {
        const d = res.data.data;
        const cleanImg = d.image ? d.image.replace(/^\/+/, '') : '';
        setHeroData({
          title: d.title || heroData.title,
          description: d.description || heroData.description,
          image: d.image ? (d.image.startsWith('http') ? d.image : `${BASE_URL}/${cleanImg}`) : campusHeroImg
        });
      }
    }).catch(() => {});
  }, []);

  const compileCopyHTML = (item) => {
    if (item.description && item.description.includes('<h3')) {
      return item.description;
    }
    
    let html = `<div class="${styles.activitySection}">`;
    
    if (item.intro && item.intro.trim()) {
      html += `<p>${item.intro.trim().replace(/\n/g, '<br/>')}</p>`;
    }
    
    if (item.vision && item.vision.trim()) {
      html += `<h3>Vision</h3><p>${item.vision.trim().replace(/\n/g, '<br/>')}</p>`;
    }
    
    if (item.mission && item.mission.trim()) {
      const points = item.mission.split('\n').map(p => p.trim()).filter(Boolean);
      if (points.length > 0) {
        html += `<h3>Mission</h3><ul>`;
        points.forEach(pt => {
          const cleanPt = pt.replace(/^[•\-\*\d+\.]\s*/, '');
          html += `<li>${cleanPt}</li>`;
        });
        html += `</ul>`;
      }
    }
    
    if (item.clubsSummary && item.clubsSummary.trim()) {
      const items = item.clubsSummary.split('\n').map(i => i.trim()).filter(Boolean);
      if (items.length > 0) {
        html += `<h3>Our Clubs / Overview</h3><ol>`;
        items.forEach(it => {
          const parts = it.split(':');
          if (parts.length > 1) {
            html += `<li><strong>${parts[0].trim()}:</strong> ${parts.slice(1).join(':').trim()}</li>`;
          } else {
            html += `<li>${it}</li>`;
          }
        });
        html += `</ol>`;
      }
    }
    
    if (item.objectives) {
      const points = Array.isArray(item.objectives)
        ? item.objectives
        : item.objectives.split('\n').map(p => p.trim()).filter(Boolean);
      if (points.length > 0) {
        html += `<h3>Objectives</h3><ol>`;
        points.forEach(pt => {
          const cleanPt = pt.replace(/^[•\-\*\d+\.]\s*/, '');
          html += `<li>${cleanPt}</li>`;
        });
        html += `</ol>`;
      }
    }
    
    html += `</div>`;
    return html;
  };

  const resolveImage = (imgSrc) => {
    if (!imgSrc) return '';
    if (imgSrc.startsWith('http')) return imgSrc;
    if (imgSrc.startsWith('/uploads/') || imgSrc.startsWith('uploads/')) {
      return `${BASE_URL}/${imgSrc.replace(/^\/+/, '')}`;
    }
    return imgSrc.startsWith('/') ? imgSrc : `/${imgSrc}`;
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await getActivities();
        const activityList = res?.data || res || [];
        if (Array.isArray(activityList) && activityList.length > 0) {
          const mapped = activityList.map(item => {
            let overrideImg = null;
            const catLower = (item.category || '').toLowerCase();
            if (catLower.includes("svasc cells") || catLower === "svasc cells") overrideImg = clubImg;
            else if (catLower.includes("committee") || catLower === "committee") overrideImg = commitiesImg;
            else if (catLower.includes("college club") || catLower === "college club") overrideImg = cellImg;

            return {
              ID: item._id,
              category: item.category,
              bImage: overrideImg || resolveImage(item.bannerImage),
              copy: compileCopyHTML(item),
              cards: (item.cards || []).map(card => {
                return {
                  title: card.title,
                  description: card.description || "No description provided.",
                  image: resolveImage(card.image),
                  link: card.link || `/${card.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
                };
              })
            };
          });
          setProjects(mapped);
        }
      } catch (err) {
        console.error("Error fetching activities", err);
      }
    };
    fetchActivities();
  }, []);




  const getProjectFromParam = (param) => {
    if (!param) return null;
    const p = param.toLowerCase().trim().replace(/[^a-z0-9]+/g, '');
    return projects.find((item) => {
      const id = item.ID.toLowerCase();
      const cat = item.category.toLowerCase().replace(/[^a-z0-9]+/g, '');
      if (p === 'club' || p === 'clubs' || p === 'collegeclub' || p === 'collegeclubs') return id === 'collegeclub' || cat.includes('club');
      if (p === 'cell' || p === 'cells' || p === 'svasccells' || p === 'svasccell') return id === 'svasccells' || cat.includes('cell');
      if (p === 'committee' || p === 'committees') return id === 'committee' || cat.includes('committee');
      return id === p || cat === p;
    });
  };

  const getSlugFromProject = (project) => {
    if (!project) return '';
    const id = project.ID.toLowerCase();
    if (id === 'collegeclub') return 'college-club';
    if (id === 'svasccells') return 'svasc-cells';
    if (id === 'committee') return 'committee';
    return project.category.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
  };

  // Synchronize categoryParam with active project state
  useEffect(() => {
    if (categoryParam) {
      const match = getProjectFromParam(categoryParam);
      if (match) {
        setSelectedProject(match.ID);
        setHighlightedContent(match);
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300);
      }
    } else {
      setSelectedProject(null);
    }
  }, [categoryParam, projects]);

  const selectProject = (projectId) => {
    const project = projects.find(p => p.ID === projectId);

    if (selectedProject === projectId) {
      navigate('/activities');
    } else if (project) {
      scrollBackTo.current = window.scrollY;
      const slug = getSlugFromProject(project);
      navigate(`/activities/${slug}`);
    }
  };

  const calculateHeights = () => {
    const winWidth = window.innerWidth;
    let height;

    if (winWidth < 600) {
      height = 300;
    } else if (winWidth < 960) {
      height = 380;
    } else {
      height = 480;
    }

    const heights = {};
    (projects || []).forEach((project) => {
      heights[project.ID] = `${height}px`;
    });

    setProjectHeights(heights);
  };

  useEffect(() => {
    calculateHeights();
    window.addEventListener('resize', calculateHeights);
    return () => window.removeEventListener('resize', calculateHeights);
  }, [projects]);


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

  const getCardTargetLink = (card) => {
    if (card.link) return card.link;
    const titleLower = card.title.toLowerCase();
    if (titleLower.includes('voter')) return '/voter-literacy-club';
    if (titleLower.includes('rotaract')) return '/rotaract-club';
    if (titleLower.includes('red ribbon')) return '/red-ribbon-club';
    if (titleLower.includes('jci')) return '/junior-jci-wing';
    if (titleLower.includes('consumer')) return '/consumer-protection-club';
    if (titleLower.includes('fine art')) return '/fine-arts-club';
    if (titleLower.includes('anti drug')) return '/anti-drug-club';
    if (titleLower.includes('eco')) return '/eco-club';
    if (titleLower.includes('literary')) return '/literary-club';
    if (titleLower.includes('women')) return '/women-empowerment-cell';
    if (titleLower.includes('media')) return '/media-cell';
    if (titleLower.includes('ragging')) return '/anti-ragging-cell';
    if (titleLower.includes('research') || titleLower.includes('r and d')) return '/research-development-cell';
    if (titleLower.includes('exam')) return '/exam-cell';
    if (titleLower.includes('swayam') || titleLower.includes('nptel')) return '/swayam-nptel';
    if (titleLower.includes('innovation') || titleLower.includes('iiedc')) return '/innovation-entrepreneurship';
    if (titleLower.includes('internal grievance')) return '/internal-grievances-committee';
    if (titleLower.includes('grievance')) return '/grievance-redressal-committee';
    if (titleLower.includes('iqac')) return '/iqac';
    if (titleLower.includes('youth red cross') || titleLower.includes('yrc')) return '/youth-red-cross';
    if (titleLower.includes('physical education') || titleLower.includes('sports')) return '/physical-education';
    if (titleLower.includes('nss')) return '/nss';
    if (titleLower.includes('entrepreneurship') || titleLower.includes('edc')) return '/entrepreneurship-development-cell';
    return `/${titleLower.replace(/[^a-z0-9]+/g, '-')}`;
  };

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif", margin: 0, padding: 0, minHeight: '100vh' }}>
      <Hero
        title={heroData.title}
        description={heroData.description}
        image={heroData.image}
      />

      <h2 className={styles.campusLifeTitle}>
        Campus Life
      </h2>

      <div style={{ width: '100%', float: 'left', clear: 'both' }}>
        {projects.map((project) => (
          <div
            key={project.ID}
            className={getProjectClass(project.ID)}
            style={{
              backgroundImage: `url("${typeof project.bImage === 'string' ? encodeURI(project.bImage) : project.bImage}")`,
              height: projectHeights[project.ID] || '480px'
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
        <h1 style={{ backgroundImage: `url("${typeof highlightedContent.bImage === 'string' ? encodeURI(highlightedContent.bImage) : highlightedContent.bImage}")` }}>
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
                  style={{ 
                    backgroundImage: `url("${typeof card.image === 'string' ? encodeURI(card.image).replace(/\(/g, '%28').replace(/\)/g, '%29') : card.image}")`, 
                    cursor: 'pointer' 
                  }}
                  onClick={(e) => { 

                    e.stopPropagation(); 
                    const targetLink = getCardTargetLink(card);
                    navigate(targetLink);
                  }}
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
    </div>
  );
};

export default ProjectsPortfolio;

