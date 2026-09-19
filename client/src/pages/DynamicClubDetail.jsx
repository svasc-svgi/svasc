import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CellPage } from '@/components/site/CellPage';
import { getActivityById, getActivities } from '@/services/activityService';

export default function DynamicClubDetail() {
  const { slug } = useParams();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  const cleanSlug = (slug || '').toLowerCase().trim().replace(/^\//, '');

  useEffect(() => {
    let isMounted = true;

    const fetchClubDetail = async () => {
      if (!cleanSlug) {
        if (isMounted) setLoading(false);
        return;
      }

      try {
        if (isMounted) setLoading(true);

        // 1. Fetch from Backend API
        let apiData = null;
        let matchedCard = null;

        try {
          const res = await getActivityById(cleanSlug);
          if (res?.success && res?.data) {
            apiData = res.data;
            matchedCard = res.data.matchedCard || null;
          }
        } catch (e) {
          // Fall through to query all activities
        }

        // If not found directly, fetch all activities and search across categories and cards
        if (!apiData || (!matchedCard && !apiData.category)) {
          try {
            const allRes = await getActivities();
            const allCategories = allRes?.data || (Array.isArray(allRes) ? allRes : []);
            const normSlug = cleanSlug.replace(/[^a-z0-9]+/g, '-');
            const cleanWords = cleanSlug.replace(/[^a-z0-9]+/g, ' ').trim();

            for (const cat of allCategories) {
              const card = (cat.cards || []).find(c => {
                const cardSlug = (c.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
                const cardWords = (c.title || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
                const linkSlug = (c.link || '').toLowerCase().replace(/^\//, '').replace(/[^a-z0-9]+/g, '-');
                return cardSlug === normSlug ||
                       linkSlug === normSlug ||
                       (cleanWords.length > 3 && cardWords.includes(cleanWords)) ||
                       (cardWords.length > 3 && cleanWords.includes(cardWords));
              });

              if (card) {
                apiData = cat;
                matchedCard = card;
                break;
              }
            }

            if (!apiData) {
              // Check category match
              const catMatch = allCategories.find(cat => {
                const catSlug = (cat.category || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
                const catWords = (cat.category || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
                return catSlug === normSlug || catWords === cleanWords || catWords.includes(cleanWords);
              });
              if (catMatch) {
                apiData = catMatch;
              }
            }
          } catch (e) {
            console.error("Error searching all activities:", e);
          }
        }

        // Process data from API
        if (apiData) {
          if (!matchedCard && apiData.cards && apiData.cards.length > 0) {
            const normSlug = cleanSlug.replace(/[^a-z0-9]+/g, '-');
            const cleanWords = cleanSlug.replace(/[^a-z0-9]+/g, ' ').trim();
            matchedCard = apiData.cards.find(c => {
              const cardSlug = (c.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
              const cardWords = (c.title || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
              const linkSlug = (c.link || '').toLowerCase().replace(/^\//, '').replace(/[^a-z0-9]+/g, '-');
              return cardSlug === normSlug ||
                     linkSlug === normSlug ||
                     (cleanWords.length > 3 && cardWords.includes(cleanWords)) ||
                     (cardWords.length > 3 && cleanWords.includes(cardWords));
            });
          }

          if (matchedCard) {
            const blocks = [];

            if (matchedCard.vision) {
              blocks.push({
                kind: 'prose',
                title: 'Vision',
                body: matchedCard.vision.split('\n').filter(Boolean)
              });
            }

            if (matchedCard.mission) {
              blocks.push({
                kind: 'list',
                title: 'Mission',
                items: matchedCard.mission.split('\n').filter(Boolean)
              });
            }

            if (matchedCard.objectives) {
              const objs = Array.isArray(matchedCard.objectives)
                ? matchedCard.objectives
                : matchedCard.objectives.split('\n').filter(Boolean);
              if (objs.length > 0) {
                blocks.push({
                  kind: 'numbered',
                  title: 'Objectives',
                  items: objs
                });
              }
            }

            if (matchedCard.roles && matchedCard.roles.length > 0) {
              blocks.push({
                kind: 'cards',
                title: 'Roles & Responsibilities',
                items: matchedCard.roles.map(r => ({
                  title: r.role || 'Role',
                  body: r.responsibility || ''
                }))
              });
            }

            // Members
            let membersList = [];
            if (matchedCard.members && matchedCard.members.length > 0) {
              membersList = matchedCard.members.map(m => ({
                name: m.name,
                role: m.designation,
                email: m.email || '',
                phone: m.phone || ''
              }));
            } else if (matchedCard.coordinator || matchedCard.memberList) {
              if (matchedCard.coordinator) {
                membersList.push({
                  name: matchedCard.coordinator,
                  role: 'Coordinator',
                  email: '',
                  phone: ''
                });
              }
              if (matchedCard.memberList) {
                matchedCard.memberList.split('\n').map(l => l.trim()).filter(Boolean).forEach(mLine => {
                  const cleanName = mLine.replace(/^\d+[\.\)]\s*/, '');
                  membersList.push({
                    name: cleanName,
                    role: 'Member',
                    email: '',
                    phone: ''
                  });
                });
              }
            }

            if (membersList.length > 0) {
              blocks.push({
                kind: 'members',
                title: 'Committee Members & Coordinators',
                items: membersList
              });
            }

            const CLUB_INTROS = {
              'voter-literacy-club': 'Transforming every eligible citizen into an informed, ethical and empowered voter — because democracy is only as strong as its most engaged participant.',
              'nss': 'Forging youth into agents of change — guided by the timeless motto ‘Not Me But You’ — to serve society with dedication, empathy and purpose.',
              'national-service-scheme': 'Forging youth into agents of change — guided by the timeless motto ‘Not Me But You’ — to serve society with dedication, empathy and purpose.',
              'rotaract-club': 'Service Above Self — where student leaders transform compassion into action, and local service into global impact.',
              'junior-jci-wing': 'Developing tomorrow’s ethical, visionary leaders through the proven JCI philosophy of active citizenship, community service and lifelong personal growth.',
              'fine-arts-club': 'Nurturing student creativity, artistic expression, cultural traditions, and stage confidence through diverse cultural events.',
              'consumer-protection-club': 'Educating consumers on statutory rights, fair-trade standards, ethical purchasing, and legal redressal pathways.',
              'red-ribbon-club': 'Harnessing the potential of youth in health promotion, HIV/AIDS awareness, voluntary blood donation, and compassionate community care.',
              'literary-club': 'Fostering linguistic flair, public speaking, debating excellence, and creative literary pursuits among students.',
              'eco-club': 'Instilling environmental stewardship, campus sustainability, bio-diversity conservation, and climate responsibility.',
              'anti-drug-club': 'Building an informed, healthy, and substance-free campus through proactive youth awareness, peer education, and wellness counseling.',
              'research-development-cell': 'Cultivating a thriving ecosystem of innovation, interdisciplinary inquiry and transformative research that connects academic knowledge to national development.',
              'innovation-entrepreneurship': 'Transforming student ideas into sustainable ventures through incubation mentorship, intellectual property support, and startup funding guidance.',
              'iiedc': 'Transforming student ideas into sustainable ventures through incubation mentorship, intellectual property support, and startup funding guidance.',
              'institution-innovation-entrepreneurial-development-cell': 'Transforming student ideas into sustainable ventures through incubation mentorship, intellectual property support, and startup funding guidance.',
              'placement-training-cell': 'Empowering students with industry-aligned competencies, corporate mentorship, professional grooming, and premier placement opportunities.',
              'placement-and-training-cell': 'Empowering students with industry-aligned competencies, corporate mentorship, professional grooming, and premier placement opportunities.',
              'exam-cell': 'Administering transparent, rigorous, and seamless continuous assessments, university examinations, and academic evaluation.',
              'women-empowerment-cell': 'Championing gender equity, self-reliance, leadership, campus safety, and holistic empowerment for women students and faculty.',
              'media-cell': 'Amplifying campus milestones, academic achievements, student life, and institutional storytelling across modern media platforms.',
              'social-media-media-cell': 'Amplifying campus milestones, academic achievements, student life, and institutional storytelling across modern media platforms.',
              'iqac': 'Spearheading continuous quality benchmarks, academic innovations, NAAC excellence, and holistic institutional governance.',
              'internal-quality-assurance-cell': 'Spearheading continuous quality benchmarks, academic innovations, NAAC excellence, and holistic institutional governance.',
              'internal-grievances-committee': 'Providing prompt, transparent, and fair dispute redressal mechanisms to ensure harmonious campus relations.',
              'grievance-redressal-committee': 'Providing prompt, transparent, and fair dispute redressal mechanisms to ensure harmonious campus relations.',
              'anti-ragging-cell': 'Upholding strict zero-tolerance protocols, respectful student fellowship, and a secure, supportive campus atmosphere.',
              'anti-ragging-cell-committee': 'Upholding strict zero-tolerance protocols, respectful student fellowship, and a secure, supportive campus atmosphere.',
              'swayam-nptel': 'Bridging the digital education frontier — empowering SVASC students and faculty with world-class online certifications that redefine career trajectories.',
              'youth-red-cross': 'Instilling emergency preparedness, humanitarian relief, voluntary blood donation, and health awareness in youth.',
              'physical-education': 'Championing fitness, disciplined sportsmanship, athletic excellence, and competitive university championship honors.',
              'department-of-physical-education': 'Championing fitness, disciplined sportsmanship, athletic excellence, and competitive university championship honors.'
            };

            const cleanIntro = (card) => {
              // 1. Explicit clean intro field
              if (card.intro && typeof card.intro === 'string' && card.intro.trim()) {
                return card.intro.trim();
              }
              // 2. Curated tagline by card title or slug
              const normSlug = cleanSlug.replace(/[^a-z0-9]+/g, '-');
              const titleSlug = (card.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
              if (CLUB_INTROS[normSlug]) return CLUB_INTROS[normSlug];
              if (CLUB_INTROS[titleSlug]) return CLUB_INTROS[titleSlug];

              // 3. Clean rawDescription or description if it does NOT contain combined HTML sections
              const candidate = (card.rawDescription || card.description || '').trim();
              if (candidate) {
                const lower = candidate.toLowerCase();
                const isCombinedPayload = candidate.includes('<h3') || 
                                          candidate.includes('modalDescContent') || 
                                          candidate.includes('table-wrapper') ||
                                          lower.includes('vision') || 
                                          lower.includes('responsibilit');
                if (!isCombinedPayload) {
                  const stripped = candidate.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
                  if (stripped && stripped.length < 350) return stripped;
                }
              }

              return `Explore the initiatives, objectives, and activities of the ${card.title} at SVASC.`;
            };

            const formatted = {
              slug: `/${cleanSlug}`,
              nav: matchedCard.title,
              title: matchedCard.title,
              hero: matchedCard.title,
              intro: cleanIntro(matchedCard),
              motto: matchedCard.motto || 'Empowering Students Through Holistic Co-Curricular Learning',
              image: matchedCard.image || apiData.bannerImage || '/hero-campus.jpg',
              customImage: matchedCard.image || apiData.bannerImage,
              blocks: blocks
            };

            if (isMounted) setPageData(formatted);
            return;
          }

          // If the slug matched the overall category
          if (apiData.category) {
            const blocks = [];

            if (apiData.vision) {
              blocks.push({
                kind: 'prose',
                title: 'Vision',
                body: apiData.vision.split('\n').filter(Boolean)
              });
            }

            if (apiData.mission) {
              blocks.push({
                kind: 'list',
                title: 'Mission',
                items: apiData.mission.split('\n').filter(Boolean)
              });
            }

            if (apiData.objectives) {
              const objs = Array.isArray(apiData.objectives)
                ? apiData.objectives
                : apiData.objectives.split('\n').filter(Boolean);
              if (objs.length > 0) {
                blocks.push({
                  kind: 'numbered',
                  title: 'Objectives',
                  items: objs
                });
              }
            }

            const cleanCatIntro = (cat) => {
              if (cat.intro && typeof cat.intro === 'string' && cat.intro.trim()) return cat.intro.trim();
              if (cat.description && typeof cat.description === 'string') {
                const candidate = cat.description.trim();
                const lower = candidate.toLowerCase();
                if (!candidate.includes('<h3') && !candidate.includes('activitySection') && !lower.includes('vision') && !lower.includes('mission')) {
                  const stripped = candidate.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
                  if (stripped && stripped.length < 350) return stripped;
                }
              }
              return `Discover all activities, cells, and clubs under ${cat.category} at SVASC.`;
            };

            const formatted = {
              slug: `/${cleanSlug}`,
              nav: apiData.category,
              title: apiData.category,
              hero: apiData.category,
              intro: cleanCatIntro(apiData),
              motto: apiData.clubsSummary && !apiData.clubsSummary.includes('<') ? apiData.clubsSummary.split('\n')[0] : 'Excellence in Action · SVASC',
              image: apiData.bannerImage || '/hero-campus.jpg',
              customImage: apiData.bannerImage,
              blocks: blocks
            };

            if (isMounted) setPageData(formatted);
            return;
          }
        }

        // If no data found from API
        if (isMounted) setPageData(null);
      } catch (error) {
        console.error('Error fetching activity details from API:', error);
        if (isMounted) setPageData(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchClubDetail();
    return () => { isMounted = false; };
  }, [cleanSlug]);

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', color: '#fff' }}>
        <p>Loading Details...</p>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '40px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#021f4b', marginBottom: '12px' }}>Activity Not Found</h2>
        <p style={{ color: '#64748b', marginBottom: '24px' }}>The requested activity or club could not be loaded from the server.</p>
        <Link to="/activities" style={{ background: '#021f4b', color: '#fff', padding: '10px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 600 }}>
          Back to Activities
        </Link>
      </div>
    );
  }

  return <CellPage page={pageData} />;
}
