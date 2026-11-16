import React, { useState, useEffect } from 'react';
import CrudManager from '../CrudManager';
import { FormInput, FileUploader } from '../FormInput';
import { uploadDirectToCloudinary } from '../../../utils/cloudinaryDirectUpload';
import {
  getNewsletters,
  createNewsletter,
  updateNewsletter,
  deleteNewsletter,
} from '../../../services/newsletterService';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const NewsletterTab = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStep, setUploadStep] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const loadData = async () => {
    try {
      const res = await getNewsletters();
      const rawList = res?.data ?? (Array.isArray(res) ? res : []);
      const mapped = rawList.map((item) => ({
        ...item,
        coverImage: item.coverImage || item.image || '/newsletter/newsletter_cover.jpg'
      }));
      setNewsletters(mapped);
    } catch (err) {
      console.error('Error loading newsletter data', err);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleSave = async (formData, id) => {
    let coverImageUrl = formData.coverImage || formData.image || '';
    let pdfUrl = formData.pdf || '';

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // 1. Upload Card Thumbnail Image (UI Purpose)
      if (formData.imageFile instanceof File) {
        setUploadStep('Uploading Card Image (UI)...');
        coverImageUrl = await uploadDirectToCloudinary(
          formData.imageFile,
          'svasc/newsletters/covers',
          (pct) => setUploadProgress(Math.round(pct / 2))
        );
      }

      // 2. Upload PDF Document (Reading Purpose)
      if (formData.pdfFile instanceof File) {
        setUploadStep('Uploading Newsletter PDF Document...');
        pdfUrl = await uploadDirectToCloudinary(
          formData.pdfFile,
          'svasc/newsletters/docs',
          (pct) => setUploadProgress(50 + Math.round(pct / 2))
        );
      } else if (formData.file instanceof File) {
        // Fallback if uploaded via general file
        setUploadStep('Uploading File...');
        const uploaded = await uploadDirectToCloudinary(
          formData.file,
          'svasc/newsletters',
          (pct) => setUploadProgress(pct)
        );
        if (formData.file.type.includes('image')) {
          coverImageUrl = uploaded;
        } else {
          pdfUrl = uploaded;
        }
      }
    } finally {
      setIsUploading(false);
      setUploadStep('');
    }

    if (!coverImageUrl) {
      coverImageUrl = '/newsletter/newsletter_cover.jpg';
    }

    if (!pdfUrl) {
      pdfUrl = formData.pdf || coverImageUrl;
    }

    const payload = {
      title: formData.title || '',
      description: formData.description || '',
      coverImage: coverImageUrl,
      image: coverImageUrl,
      pdf: pdfUrl,
      byline: formData.byline || 'CAMPUS EDITORIAL DESK',
      date: formData.date || ''
    };

    if (id) {
      await updateNewsletter(id, payload);
    } else {
      await createNewsletter(payload);
    }
    loadData();
  };

  const handleDelete = async (id) => {
    await deleteNewsletter(id);
    loadData();
  };

  return (
    <div>
      <CrudManager
        title="Manage Newsletters"
        data={newsletters}
        columns={[
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'coverImage', label: 'Card Image (UI)', type: 'image' },
          { key: 'pdf', label: 'PDF Document Link', type: 'text' }
        ]}
        onSave={handleSave}
        onDelete={handleDelete}
        initialFormState={{
          title: '',
          description: '',
          coverImage: '',
          pdf: '',
          imageFile: null,
          pdfFile: null
        }}
        renderForm={(formData, setFormData) => (
          <>
            <FormInput
              label="Newsletter Title *"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.4rem', color: '#1e293b' }}>
                Description (Excerpt)
              </label>
              <textarea
                rows={3}
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief summary of highlights, symposiums, laurels..."
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontFamily: 'inherit',
                  fontSize: '0.9rem',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* 1. CARD IMAGE FOR UI PURPOSE */}
            <div style={{ border: '1px dashed #3b82f6', borderRadius: '8px', padding: '1rem', marginBottom: '1rem', backgroundColor: '#f0f7ff' }}>
              <div style={{ fontSize: '0.92rem', fontWeight: '700', color: '#1d4ed8', marginBottom: '0.3rem' }}>
                1. Card Thumbnail Image (For UI Display)
              </div>
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.75rem' }}>
                This image will appear on the newsletter card preview in the website.
              </p>
              <FileUploader
                label="Select Card Image (PNG, JPG, WEBP)"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, imageFile: e.target.files[0] })}
                previewUrl={
                  formData.imageFile
                    ? URL.createObjectURL(formData.imageFile)
                    : (formData.coverImage
                        ? (formData.coverImage.startsWith('http') || formData.coverImage.startsWith('/') ? formData.coverImage : `${BASE_URL}/${formData.coverImage.replace(/^\/+/, '')}`)
                        : '/newsletter/newsletter_cover.jpg')
                }
              />
            </div>

            {/* 2. PDF FILE FOR READING PURPOSE */}
            <div style={{ border: '1px dashed #10b981', borderRadius: '8px', padding: '1rem', marginBottom: '1rem', backgroundColor: '#f0fdf4' }}>
              <div style={{ fontSize: '0.92rem', fontWeight: '700', color: '#047857', marginBottom: '0.3rem' }}>
                2. Newsletter PDF File (For Reading / Download)
              </div>
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.75rem' }}>
                This PDF opens when visitors click the card or the arrow icon to read the newsletter.
              </p>
              <FileUploader
                label="Select Newsletter PDF Document (.pdf)"
                accept=".pdf,application/pdf"
                onChange={(e) => setFormData({ ...formData, pdfFile: e.target.files[0] })}
                previewUrl={null}
              />
              {formData.pdf && (
                <div style={{ marginTop: '0.5rem', fontSize: '0.82rem', color: '#047857' }}>
                  Current PDF Link:{' '}
                  <a href={formData.pdf} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', fontWeight: '600' }}>
                    View PDF
                  </a>
                </div>
              )}
            </div>

            {/* LIVE UPLOAD PROGRESS BAR */}
            {isUploading && (
              <div style={{ marginTop: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '600', color: '#2563eb', marginBottom: '0.3rem' }}>
                  <span>⚡ {uploadStep || 'Uploading to Cloudinary...'}</span>
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
          </>
        )}
      />
    </div>
  );
};

export default NewsletterTab;
