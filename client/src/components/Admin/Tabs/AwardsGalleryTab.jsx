import React, { useState, useEffect } from 'react';
import HeroForm from '../HeroForm';
import CrudManager from '../CrudManager';
import { FormInput, FileUploader } from '../FormInput';
import { uploadDirectToCloudinary } from '../../../utils/cloudinaryDirectUpload';
import {
  getAwards,
  createAward,
  updateAward,
  deleteAward,
} from '../../../services/awardService';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const AwardsGalleryTab = () => {
  const [awards, setAwards] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const loadData = async () => {
    try {
      const res = await getAwards();
      const list = res?.data ?? (Array.isArray(res) ? res : []);
      setAwards(list);
    } catch (err) {
      console.error('Error loading awards gallery data', err);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleSave = async (formData, id) => {
    let imageUrl = formData.image;

    if (formData.image instanceof File) {
      setIsUploading(true);
      setUploadProgress(0);
      try {
        imageUrl = await uploadDirectToCloudinary(
          formData.image,
          'svasc/awards-gallery',
          (pct) => setUploadProgress(pct)
        );
      } finally {
        setIsUploading(false);
      }
    }

    if (!imageUrl) {
      throw new Error("Please select an image file or provide an image URL.");
    }

    const payload = {
      category: formData.category || 'academic',
      alt: formData.alt || '',
      image: imageUrl
    };

    if (id) {
      await updateAward(id, payload);
    } else {
      await createAward(payload);
    }
    loadData();
  };

  const handleDelete = async (id) => {
    await deleteAward(id);
    loadData();
  };

  return (
    <div>
      <HeroForm pageKey="awards" title="Awards & Achievements Hero Section" />

      <CrudManager
        title="Awards & Achievements Gallery"
        data={awards}
        columns={[
          { key: 'category', label: 'Category', type: 'text' },
          { key: 'alt', label: 'Title / Alt Text', type: 'text' },
          { key: 'image', label: 'Image', type: 'image' }
        ]}
        onSave={handleSave}
        onDelete={handleDelete}
        initialFormState={{ category: 'academic', alt: '', image: null }}
        renderForm={(formData, setFormData) => (
          <>
            <FormInput 
                label="Category" 
                type="select" 
                value={formData.category || 'academic'} 
                onChange={(e) => setFormData({...formData, category: e.target.value})} 
                required 
                options={[
                    {value: 'academic', label: 'Academic Certificates'},
                    {value: 'professional', label: 'Professional/Staff Certificates'},
                    {value: 'achievement', label: 'Achievement Certificates'},
                    {value: 'industry', label: 'Industry/Professional Certificates'},
                    {value: 'special', label: 'Special Purpose Certificates'},
                    {value: 'research', label: 'Research Certificates'}
                ]}
            />
            <FormInput label="Title / Alt Text" value={formData.alt || ''} onChange={(e) => setFormData({...formData, alt: e.target.value})} required />
            <FileUploader
              label="Award Image"
              accept="image/*"
              onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
              previewUrl={
                typeof formData.image === 'string'
                  ? (formData.image.startsWith('http') ? formData.image : `${BASE_URL}/${formData.image.replace(/^\/+/, '')}`)
                  : (formData.image ? URL.createObjectURL(formData.image) : null)
              }
            />

            {/* LIVE UPLOAD PROGRESS BAR */}
            {isUploading && (
              <div style={{ marginTop: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '600', color: '#2563eb', marginBottom: '0.3rem' }}>
                  <span>⚡ Direct Cloudinary Image Uploading...</span>
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

export default AwardsGalleryTab;
