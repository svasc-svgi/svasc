import React, { useState, useEffect, useRef } from 'react';
import { FormGroup, FormInput } from './FormInput';
import { fetchAdminData } from '../../utils/adminApi';
import styles from './CrudManager.module.css';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const HeroForm = ({ pageKey, title = "Hero Section" }) => {
  const [formData, setFormData] = useState({ title: '', description: '', image: '' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const fileInputRef = useRef(null);

  // Load existing Hero data from DB on mount
  const loadHero = async () => {
    try {
      const data = await fetchAdminData(`/api/page-heros/${pageKey}`);
      if (data) {
        setFormData({
          title: data.title || '',
          description: data.description || '',
          image: data.image || ''
        });
        if (data.image) {
          const imgUrl = data.image.startsWith('http')
            ? data.image
            : `${BASE_URL}/${data.image.replace(/^\/+/, '')}`;
          setPreviewUrl(imgUrl);
        }
      }
    } catch (err) {
      console.error(`Error loading hero for ${pageKey}`, err);
    }
  };

  useEffect(() => {
    loadHero();
  }, [pageKey]);

  // Handle local file selection -> immediate preview before upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const localUrl = URL.createObjectURL(file);
      setPreviewUrl(localUrl);
    }
  };

  // Clear selected file and restore saved DB image preview
  const handleClearSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (formData.image) {
      const imgUrl = formData.image.startsWith('http')
        ? formData.image
        : `${BASE_URL}/${formData.image.replace(/^\/+/, '')}`;
      setPreviewUrl(imgUrl);
    } else {
      setPreviewUrl('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: '', type: '' });

    try {
      const fd = new FormData();
      fd.append('title', formData.title || '');
      fd.append('description', formData.description || '');

      if (selectedFile) {
        fd.append('image', selectedFile);
      } else if (typeof formData.image === 'string' && formData.image.trim() !== '') {
        fd.append('image', formData.image);
      }

      const url = `${BASE_URL}/api/page-heros/${pageKey}`;
      const res = await fetch(url, { method: 'PUT', body: fd });
      const resData = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(resData.message || 'Server error occurred');
      }

      // After upload: update form data with newly uploaded Cloudinary image
      const savedHero = resData.data;
      if (savedHero) {
        setFormData({
          title: savedHero.title || '',
          description: savedHero.description || '',
          image: savedHero.image || ''
        });

        if (savedHero.image) {
          const imgUrl = savedHero.image.startsWith('http')
            ? savedHero.image
            : `${BASE_URL}/${savedHero.image.replace(/^\/+/, '')}`;
          setPreviewUrl(imgUrl);
        }
      }

      // Reset local file input
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      setMessage({ text: 'Hero banner updated successfully & saved to Cloudinary!', type: 'success' });
      setTimeout(() => setMessage({ text: '', type: '' }), 4000);
    } catch (err) {
      console.error("Error saving hero", err);
      setMessage({ text: `Failed to update hero: ${err.message || 'Unknown error'}`, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.crudWrapper} style={{ padding: '2rem' }}>
      <h2 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#333' }}>{title}</h2>

      {message.text && (
        <div style={{
          padding: '0.8rem 1.2rem',
          marginBottom: '1.5rem',
          borderRadius: '6px',
          fontWeight: '500',
          backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
          color: message.type === 'success' ? '#155724' : '#721c24',
          border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
        }}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '650px' }}>
        <FormInput 
          label="Title" 
          value={formData.title} 
          onChange={(e) => setFormData({...formData, title: e.target.value})} 
          placeholder="e.g. Alumni Association"
        />

        <FormInput 
          label="Description" 
          type="textarea"
          value={formData.description} 
          onChange={(e) => setFormData({...formData, description: e.target.value})} 
          placeholder="Enter banner description or tagline..."
        />

        <FormGroup label="Hero Banner Image">
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef}
            onChange={handleFileChange} 
            style={{ padding: '0.5rem 0' }}
          />

          {/* ================= LIVE / SELECTED PREVIEW BOX ================= */}
          {previewUrl && (
            <div style={{
              marginTop: '0.75rem',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              padding: '1rem',
              backgroundColor: '#fafafa',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
                <span style={{
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: selectedFile ? '#d97706' : '#2563eb',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {selectedFile ? '● New Image Selected (Preview Before Upload)' : '● Current Banner Image (Live)'}
                </span>

                {selectedFile && (
                  <button
                    type="button"
                    onClick={handleClearSelectedFile}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#dc2626',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      textDecoration: 'underline'
                    }}
                  >
                    Cancel Selection
                  </button>
                )}
              </div>

              <div style={{
                width: '100%',
                maxHeight: '260px',
                overflow: 'hidden',
                borderRadius: '6px',
                background: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src={previewUrl} 
                  alt="Hero Preview" 
                  style={{
                    width: '100%',
                    height: '240px',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>

              {formData.image && !selectedFile && (
                <p style={{
                  fontSize: '0.75rem',
                  color: '#6b7280',
                  marginTop: '0.5rem',
                  marginBottom: 0,
                  wordBreak: 'break-all'
                }}>
                  Cloudinary URL: <a href={formData.image} target="_blank" rel="noreferrer" style={{ color: '#2563eb' }}>{formData.image}</a>
                </p>
              )}
            </div>
          )}
        </FormGroup>

        <div>
          <button 
            type="submit" 
            className={styles.submitBtn} 
            disabled={isSubmitting}
            style={{ minWidth: '140px' }}
          >
            {isSubmitting ? 'Saving to Cloudinary...' : 'Save Hero'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HeroForm;
