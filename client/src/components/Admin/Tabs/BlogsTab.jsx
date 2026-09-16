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
} from '../../../services/blogService';
import styles from '../CrudManager.module.css';
import { Plus, Trash2 } from 'lucide-react';

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

  const loadData = async () => {
    try {
      const res = await getBlogs();
      const bRes = res?.data ?? (Array.isArray(res) ? res : []);
      setBlogs(bRes);
    } catch (err) {
      console.error('Error loading blogs data', err);
    }
  };

  useEffect(() => { loadData(); }, []);

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
        description: formData.description || '',
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
    { key: 'bannerImage', label: 'Banner', type: 'image' }
  ];
  const initialState = { category: '', description: '', bannerImage: null, cards: [] };

  return (
    <div>
      <HeroForm pageKey="blogs" title="Blogs Page Hero Section" />

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
              label="Description"
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
