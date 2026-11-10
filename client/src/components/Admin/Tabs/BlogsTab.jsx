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
import { defaultBlogs } from '../../../data/blogsData';
import styles from '../CrudManager.module.css';
import { RefreshCw, CheckCircle2, Filter } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const CATEGORIES = [
  'Campus Life & Community',
  'Academic Events',
  'Cultural',
  'Innovations in Education and Technology',
  'Student Activities and Achievements',
  'SVASC News'
];

const BlogsTab = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedFilterCategory, setSelectedFilterCategory] = useState('All');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncNotice, setSyncNotice] = useState('');

  const loadData = async () => {
    try {
      const res = await getBlogs();
      let bRes = res?.data ?? (Array.isArray(res) ? res : []);

      // If backend has 0 blogs, auto-seed all 24 cards
      if (bRes.length === 0) {
        try {
          await seedDefaultBlogs(false);
          const freshRes = await getBlogs();
          bRes = freshRes?.data ?? (Array.isArray(freshRes) ? freshRes : []);
        } catch (e) {
          console.warn('Auto-seed notice:', e.message);
        }
      }

      // If still empty (e.g. backend offline), use defaultBlogs
      if (bRes.length === 0) {
        bRes = defaultBlogs;
      }

      const formatted = bRes.map(item => ({
        ...item,
        image: item.image || item.bannerImage || (item.cards && item.cards[0] ? item.cards[0].image : ''),
        bannerImage: item.image || item.bannerImage,
        description: item.description || item.copy || ''
      }));

      setBlogs(formatted);
    } catch (err) {
      console.error('Error loading blogs data', err);
      // Fallback to defaultBlogs on network failure
      setBlogs(defaultBlogs.map(item => ({
        ...item,
        image: item.image || item.bImage,
        bannerImage: item.image || item.bImage,
        description: item.description || item.copy || ''
      })));
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSyncDefaults = async () => {
    if (!window.confirm('Do you want to sync/reset all 24 independent blog cards into MongoDB? This will ensure every card exists in the database.')) {
      return;
    }
    setIsSyncing(true);
    try {
      await seedDefaultBlogs(true);
      setSyncNotice('All 24 blog cards successfully synced into MongoDB database!');
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
      // 1. Handle Image Upload
      let imageUrl = formData.image;
      if (formData.image instanceof File) {
        imageUrl = await uploadDirectToCloudinary(
          formData.image,
          'svasc/blogs',
          (pct) => setUploadProgress(pct)
        );
      } else if (!imageUrl && formData.bannerImage) {
        imageUrl = formData.bannerImage;
      }

      setUploadProgress(100);

      const payload = {
        title: (formData.title || '').trim(),
        category: (formData.category || 'SVASC News').trim(),
        image: imageUrl || '',
        bannerImage: imageUrl || '',
        description: formData.description || '',
        author: (formData.author || 'SVASC Editorial').trim(),
        date: (formData.date || '25 May, 2026').trim(),
        readTime: (formData.readTime || '4 min read').trim(),
        order: formData.order !== undefined ? Number(formData.order) : 0
      };

      // 2. Check if valid MongoDB ObjectId or fallback ID
      const isRealMongoId = id && !String(id).startsWith('blog-def-') && id !== 'all';

      if (isRealMongoId) {
        await updateBlog(id, payload);
      } else {
        // Check if item already exists in local list with a mongo _id
        const existingInList = blogs.find(b => b.title?.toLowerCase() === payload.title.toLowerCase() && b._id && !String(b._id).startsWith('blog-def-'));
        if (existingInList) {
          await updateBlog(existingInList._id, payload);
        } else {
          await createBlog(payload);
        }
      }

      await loadData();
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!id || String(id).startsWith('blog-def-')) {
      alert('Default seed item cannot be deleted directly from database without first syncing.');
      return;
    }
    await deleteBlog(id);
    await loadData();
  };

  const activityColumns = [
    { key: 'image', label: 'Image', type: 'image' },
    { key: 'title', label: 'Card Title', type: 'text' },
    { key: 'category', label: 'Category', type: 'text' },
    { key: 'author', label: 'Author', type: 'text' },
    { key: 'date', label: 'Date', type: 'text' },
    { key: 'readTime', label: 'Read Time', type: 'text' }
  ];

  const initialState = {
    title: '',
    category: 'Campus Life & Community',
    image: null,
    bannerImage: null,
    description: '',
    author: 'SVASC Editorial',
    date: '25 May, 2026',
    readTime: '4 min read',
    order: 0
  };

  // Filtered blogs for table view
  const displayedBlogs = blogs.filter(b => {
    if (selectedFilterCategory === 'All') return true;
    return (b.category || '').toLowerCase().trim() === selectedFilterCategory.toLowerCase().trim();
  });

  return (
    <div>
      <HeroForm pageKey="blogs" title="Blogs Page Hero Section" />

      {/* Sync All 24 Cards Action Bar */}
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
            Full Database Sync (All 24 Independent Blog Cards)
          </h4>
          <p style={{ margin: '0.25rem 0 0', color: '#15803d', fontSize: '0.85rem' }}>
            Ensure all 24 individual blog cards across all 6 categories are stored in MongoDB as separate editable cards.
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
            fontWeight: 600,
            fontSize: '0.85rem',
            cursor: isSyncing ? 'not-allowed' : 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.06)'
          }}
        >
          <RefreshCw size={15} className={isSyncing ? 'animate-spin' : ''} />
          {isSyncing ? 'Syncing 24 Cards...' : 'Sync / Reset 24 Cards'}
        </button>
      </div>

      {syncNotice && (
        <div style={{
          background: '#dcfce7',
          border: '1px solid #86efac',
          color: '#15803d',
          padding: '0.75rem 1rem',
          borderRadius: '6px',
          marginBottom: '1rem',
          fontSize: '0.88rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontWeight: 600
        }}>
          <CheckCircle2 size={16} /> {syncNotice}
        </div>
      )}

      {/* Category Filter Pills for Admin Quick Nav */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        flexWrap: 'wrap',
        marginBottom: '1.25rem',
        padding: '0.75rem 1rem',
        background: '#f8fafc',
        borderRadius: '8px',
        border: '1px solid #e2e8f0'
      }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Filter size={14} /> Filter by Category:
        </span>
        {['All', ...CATEGORIES].map((cat, idx) => {
          const isSelected = selectedFilterCategory.toLowerCase() === cat.toLowerCase();
          const count = cat === 'All' ? blogs.length : blogs.filter(b => (b.category || '').toLowerCase().trim() === cat.toLowerCase().trim()).length;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedFilterCategory(cat)}
              style={{
                background: isSelected ? '#15803d' : '#ffffff',
                color: isSelected ? '#ffffff' : '#334155',
                border: isSelected ? '1px solid #15803d' : '1px solid #cbd5e1',
                borderRadius: '20px',
                padding: '0.3rem 0.75rem',
                fontSize: '0.8rem',
                fontWeight: isSelected ? 600 : 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      <CrudManager
        title={`All Blog Cards (${displayedBlogs.length}${selectedFilterCategory !== 'All' ? ` in ${selectedFilterCategory}` : ''})`}
        data={displayedBlogs}
        columns={activityColumns}
        onSave={handleSave}
        onDelete={handleDelete}
        initialFormState={initialState}
        renderForm={(formData, setFormData) => (
          <div>
            {isUploading && (
              <div style={{ marginBottom: '1rem', background: '#e0f2fe', padding: '0.6rem 0.9rem', borderRadius: '6px' }}>
                <div style={{ fontSize: '0.85rem', color: '#0369a1', fontWeight: 600, marginBottom: '0.3rem' }}>
                  Uploading Image to Cloudinary: {uploadProgress}%
                </div>
                <div style={{ width: '100%', height: '6px', background: '#bae6fd', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${uploadProgress}%`, height: '100%', background: '#0284c7', transition: 'width 0.2s' }} />
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <FormInput
                label="Card Title *"
                placeholder="e.g. Campus Overview, Guest Lectures, etc."
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1rem' }}>
                <label style={{ fontWeight: 600, color: '#333', fontSize: '0.88rem' }}>
                  Category *
                </label>
                <select
                  value={formData.category || 'Campus Life & Community'}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  style={{
                    padding: '0.6rem 0.8rem',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.9rem',
                    backgroundColor: '#fff',
                    outline: 'none'
                  }}
                >
                  {CATEGORIES.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <FileUploader
                label="Card Image *"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                previewUrl={
                  typeof formData.image === 'string'
                    ? (formData.image.startsWith('http') ? formData.image : `${BASE_URL}/${formData.image.replace(/^\/+/, '')}`)
                    : (formData.image ? URL.createObjectURL(formData.image) : (
                        typeof formData.bannerImage === 'string'
                          ? (formData.bannerImage.startsWith('http') ? formData.bannerImage : `${BASE_URL}/${formData.bannerImage.replace(/^\/+/, '')}`)
                          : null
                      ))
                }
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <FormInput
                label="Author"
                placeholder="SVASC Editorial"
                value={formData.author || ''}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              />
              <FormInput
                label="Date"
                placeholder="25 May, 2026"
                value={formData.date || ''}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
              <FormInput
                label="Read Time"
                placeholder="4 min read"
                value={formData.readTime || ''}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
              />
              <FormInput
                label="Display Order"
                type="number"
                value={formData.order ?? 0}
                onChange={(e) => setFormData({ ...formData, order: e.target.value })}
              />
            </div>

            <FormInput
              label="Article Description / Full Content *"
              type="textarea"
              rows={8}
              placeholder="HTML or plain text content for this blog card..."
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
        )}
      />
    </div>
  );
};

export default BlogsTab;
