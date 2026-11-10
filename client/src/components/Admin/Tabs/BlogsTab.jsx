import React, { useState, useEffect } from 'react';
import HeroForm from '../HeroForm';
import CrudManager from '../CrudManager';
import { FormInput, FileUploader } from '../FormInput';
import { uploadDirectToCloudinary } from '../../../utils/cloudinaryDirectUpload';
import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  seedDefaultBlogs,
} from '../../../services/blogService';
import styles from '../CrudManager.module.css';
import { Plus, Trash2, RefreshCw, CheckCircle2 } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const CardBuilder = ({ cards, setCards }) => {
  const addCard = () => setCards([...cards, { title: '', description: '', image: null }]);
  const removeCard = (idx) => setCards(cards.filter((_, i) => i !== idx));
  const updateCard = (idx, field, val) => {
    const updated = [...cards];
    updated[idx] = { ...updated[idx], [field]: val };
    setCards(updated);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <label style={{ fontWeight: 600, color: '#333', fontSize: '0.9rem' }}>Cards (Unlimited)</label>
        <button type="button" className={styles.addButton}
          style={{ fontSize: '0.82rem', padding: '0.35rem 0.75rem' }}
          onClick={addCard}>
          <Plus size={14} /> Add Card
        </button>
      </div>
      {cards.map((card, idx) => (
        <div key={idx} style={{ border: '1px solid #e0e0e0', borderRadius: '6px', padding: '1rem', marginBottom: '0.75rem', background: '#fafafa' }}>
          <FormInput
            label={`Card ${idx + 1} Title`}
            value={card.title || ''}
            onChange={(e) => updateCard(idx, 'title', e.target.value)}
          />
          <FormInput
            label={`Card ${idx + 1} Content/Description`}
            type="textarea"
            value={card.description || ''}
            onChange={(e) => updateCard(idx, 'description', e.target.value)}
          />
          <div style={{ marginTop: '0.75rem' }}>
            <FileUploader
              label={`Card ${idx + 1} Image`}
              accept="image/*"
              onChange={(e) => updateCard(idx, 'image', e.target.files[0])}
              previewUrl={
                typeof card.image === 'string'
                  ? (card.image.startsWith('http') ? card.image : `${BASE_URL}/${card.image.replace(/^\/+/, '')}`)
                  : (card.image ? URL.createObjectURL(card.image) : null)
              }
            />
          </div>
          <button type="button" onClick={() => removeCard(idx)}
            style={{ marginTop: '0.75rem', background: '#dc3545', color: 'white', border: 'none', padding: '0.3rem 0.75rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem' }}>
            <Trash2 size={13} /> Remove Card
          </button>
        </div>
      ))}
      {cards.length === 0 && (
        <p style={{ color: '#999', fontStyle: 'italic', fontSize: '0.88rem' }}>No cards added yet. Click "Add Card" above.</p>
      )}
    </div>
  );
};

const BlogsTab = () => {
  const [blogs, setBlogs] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncNotice, setSyncNotice] = useState('');

  const loadData = async () => {
    try {
      const res = await getBlogs();
      let bRes = res?.data ?? (Array.isArray(res) ? res : []);

      // If backend has less than 6 blogs, auto-seed standard categories
      if (bRes.length < 6) {
        try {
          await seedDefaultBlogs(false);
          const freshRes = await getBlogs();
          bRes = freshRes?.data ?? (Array.isArray(freshRes) ? freshRes : []);
        } catch (e) {
          console.warn('Auto-seed notice:', e.message);
        }
      }

      const formatted = bRes.map(item => ({
        ...item,
        cardsCount: `${(item.cards || []).length} cards`
      }));
      setBlogs(formatted);
    } catch (err) {
      console.error('Error loading blogs data', err);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleSyncDefaults = async () => {
    if (!window.confirm('Do you want to sync all 6 standard categories and 24 cards into the backend? This ensures the database holds all website content.')) {
      return;
    }
    setIsSyncing(true);
    try {
      await seedDefaultBlogs(true);
      setSyncNotice('All 6 blog categories and 24 cards successfully synced into MongoDB!');
      await loadData();
      setTimeout(() => setSyncNotice(''), 4500);
    } catch (err) {
      alert(`Sync failed: ${err.message}`);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSave = async (formData, id) => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // 1. Upload Banner Image
      let bannerUrl = formData.bannerImage;
      if (formData.bannerImage instanceof File) {
        bannerUrl = await uploadDirectToCloudinary(
          formData.bannerImage,
          'svasc/blogs/banners',
          (pct) => setUploadProgress(Math.round(pct * 0.4))
        );
      }

      // 2. Upload Card Images
      const uploadedCards = [];
      const totalCards = (formData.cards || []).length;

      for (let i = 0; i < totalCards; i++) {
        const card = formData.cards[i];
        let cardImageUrl = card.image;
        if (card.image instanceof File) {
          cardImageUrl = await uploadDirectToCloudinary(
            card.image,
            'svasc/blogs/cards',
            (pct) => {
              const cardStep = 60 / totalCards;
              const currentCardProgress = 40 + Math.round((i * cardStep) + (pct * cardStep / 100));
              setUploadProgress(currentCardProgress);
            }
          );
        }
        uploadedCards.push({
          title: card.title || '',
          description: card.description || '',
          image: cardImageUrl || ''
        });
      }

      setUploadProgress(100);

      const payload = {
        category: formData.category || '',
        title: formData.title || formData.category || '',
        description: formData.description || '',
        author: formData.author || 'SVASC Editorial',
        date: formData.date || '25 May, 2026',
        readTime: formData.readTime || '4 min read',
        bannerImage: bannerUrl || '',
        cards: uploadedCards
      };

      if (id) {
        await updateBlog(id, payload);
      } else {
        await createBlog(payload);
      }

      loadData();
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteBlog(id);
    loadData();
  };

  const activityColumns = [
    { key: 'category', label: 'Category', type: 'text' },
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'author', label: 'Author', type: 'text' },
    { key: 'date', label: 'Date', type: 'text' },
    { key: 'cardsCount', label: 'Cards', type: 'text' },
    { key: 'bannerImage', label: 'Banner', type: 'image' }
  ];

  const initialState = {
    category: '',
    title: '',
    author: 'SVASC Editorial',
    date: '25 May, 2026',
    readTime: '4 min read',
    description: '',
    bannerImage: null,
    cards: []
  };

  return (
    <div>
      <HeroForm pageKey="blogs" title="Blogs Page Hero Section" />

      {/* Sync All Default Blogs Action Bar */}
      <div style={{
        background: '#f0fdf4',
        border: '1px solid #bbf7d0',
        borderRadius: '8px',
        padding: '1rem 1.25rem',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.8rem'
      }}>
        <div>
          <h4 style={{ margin: 0, color: '#166534', fontSize: '0.98rem', fontWeight: '700' }}>
            Full Database Sync (All 6 Categories & 24 Cards)
          </h4>
          <p style={{ margin: '0.25rem 0 0', color: '#15803d', fontSize: '0.85rem' }}>
            Ensure all front-end blog categories, full HTML stories, and card highlights exist in MongoDB.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSyncDefaults}
          disabled={isSyncing}
          style={{
            background: '#15803d',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '0.55rem 1.1rem',
            fontSize: '0.88rem',
            fontWeight: '600',
            cursor: isSyncing ? 'not-allowed' : 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
          }}
        >
          <RefreshCw size={14} className={isSyncing ? styles.spin : ''} />
          {isSyncing ? 'Syncing...' : 'Sync / Seed All 6 Default Blogs'}
        </button>
      </div>

      {syncNotice && (
        <div style={{
          background: '#ecfdf5',
          border: '1px solid #6ee7b7',
          color: '#065f46',
          padding: '0.75rem 1rem',
          borderRadius: '6px',
          marginBottom: '1.25rem',
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <CheckCircle2 size={18} color="#059669" />
          <span>{syncNotice}</span>
        </div>
      )}

      <CrudManager
        title="College Blogs Categories & Cards"
        data={blogs}
        columns={activityColumns}
        onSave={handleSave}
        onDelete={handleDelete}
        initialFormState={initialState}
        renderForm={(formData, setFormData) => (
          <>
            <FormInput
              label="Category Name"
              value={formData.category || ''}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            />
            <FormInput
              label="Article / Blog Title"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Campus Life & Community Overview"
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <FormInput
                label="Author"
                value={formData.author || ''}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                placeholder="SVASC Editorial"
              />
              <FormInput
                label="Published Date"
                value={formData.date || ''}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                placeholder="25 May, 2026"
              />
              <FormInput
                label="Read Time"
                value={formData.readTime || ''}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                placeholder="4 min read"
              />
            </div>
            <FormInput
              label="Full Story / Description (HTML Allowed)"
              type="textarea"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
            <FileUploader
              label="Banner Image"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, bannerImage: e.target.files[0] })}
              previewUrl={
                typeof formData.bannerImage === 'string'
                  ? (formData.bannerImage.startsWith('http') ? formData.bannerImage : `${BASE_URL}/${formData.bannerImage.replace(/^\/+/, '')}`)
                  : (formData.bannerImage ? URL.createObjectURL(formData.bannerImage) : null)
              }
            />

            {/* LIVE UPLOAD PROGRESS BAR */}
            {isUploading && (
              <div style={{ marginTop: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '600', color: '#2563eb', marginBottom: '0.3rem' }}>
                  <span>⚡ Direct Cloudinary Media Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${uploadProgress}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #3b82f6, #10b981)',
                    transition: 'width 0.2s ease'
                  }} />
                </div>
              </div>
            )}

            <CardBuilder
              cards={formData.cards || []}
              setCards={(cards) => setFormData({ ...formData, cards })}
            />
          </>
        )}
      />
    </div>
  );
};

export default BlogsTab;
