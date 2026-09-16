import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { CellPage } from '@/components/site/CellPage';
import { pageBySlug, pages } from '@/data/activitiesData';
import { getActivityById } from '@/services/activityService';

export default function DynamicClubDetail() {
  const { slug, category } = useParams();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  const cleanSlug = (slug || '').toLowerCase().trim().replace(/^\//, '');

  useEffect(() => {
    const fetchClubDetail = async () => {
      if (!cleanSlug) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // 1. Try fetching from Backend API
        const res = await getActivityById(cleanSlug);
        const apiData = res?.data || res;

        if (apiData) {
          // Check if a specific card in this category matches the slug
          const slugPattern = cleanSlug.replace(/[-_]/g, ' ');
          const matchedCard = (apiData.cards || []).find(c => {
            const titleClean = (c.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
            const linkClean = (c.link || '').toLowerCase().replace(/^\//, '');
            return titleClean === cleanSlug || linkClean === cleanSlug || (c.title || '').toLowerCase().includes(slugPattern);
          });

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

            if (matchedCard.members && matchedCard.members.length > 0) {
              blocks.push({
                kind: 'members',
                title: 'Committee Members & Coordinators',
                items: matchedCard.members.map(m => ({
                  name: m.name,
                  role: m.designation,
                  email: m.email || '',
                  phone: m.phone || ''
                }))
              });
            }

            const formatted = {
              slug: `/${cleanSlug}`,
              nav: matchedCard.title,
              title: matchedCard.title,
              hero: matchedCard.title,
              intro: matchedCard.description || `Welcome to ${matchedCard.title} at SVASC.`,
              motto: matchedCard.motto || 'Empowering Students Through Holistic Co-Curricular Learning',
              image: matchedCard.image || apiData.bannerImage || '/hero-campus.jpg',
              customImage: matchedCard.image || apiData.bannerImage,
              blocks: blocks
            };
            setPageData(formatted);
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

            const formatted = {
              slug: `/${cleanSlug}`,
              nav: apiData.category,
              title: apiData.category,
              hero: apiData.category,
              intro: apiData.intro || apiData.description || `Welcome to the ${apiData.category} of SVASC.`,
              motto: apiData.clubsSummary || 'Excellence in Action · SVASC',
              image: apiData.bannerImage || '/hero-campus.jpg',
              customImage: apiData.bannerImage,
              blocks: blocks
            };
            setPageData(formatted);
            return;
          }
        }



        // 2. Fallback to site.ts / Activities local data
        loadFallback();
      } catch (error) {
        // If API fails / not found, use local fallback
        loadFallback();
      } finally {
        setLoading(false);
      }
    };

    const loadFallback = () => {
      let fallback = pageBySlug(`/${cleanSlug}`);
      if (!fallback) {
        fallback = pages.find((p) => {
          const pSlug = p.slug.replace(/^\//, '').toLowerCase();
          return pSlug === cleanSlug || pSlug.includes(cleanSlug) || cleanSlug.includes(pSlug);
        });
      }
      setPageData(fallback || null);
    };

    fetchClubDetail();
  }, [cleanSlug]);

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', color: '#fff' }}>
        <p>Loading Details...</p>
      </div>
    );
  }

  if (!pageData) {
    return <Navigate to="/activities" replace />;
  }

  return <CellPage page={pageData} />;
}
