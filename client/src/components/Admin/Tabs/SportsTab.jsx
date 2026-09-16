import React, { useState, useEffect } from 'react';
import HeroForm from '../HeroForm';
import CrudManager from '../CrudManager';
import { FormInput, FileUploader } from '../FormInput';
import { uploadDirectToCloudinary } from '../../../utils/cloudinaryDirectUpload';
import {
  getSportHouses,
  createSportHouse,
  updateSportHouse,
  deleteSportHouse,
} from '../../../services/sportsService';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const SportsTab = () => {
  const [houses, setHouses] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const loadData = async () => {
    try {
      const res = await getSportHouses();
      const data = res?.data ?? (Array.isArray(res) ? res : []);
      setHouses(data);
    } catch (err) {
      console.error('Error loading sports data', err);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleSaveHouse = async (formData, id) => {
    let imageUrl = formData.image;

    if (formData.image instanceof File) {
      setIsUploading(true);
      setUploadProgress(0);
      try {
        imageUrl = await uploadDirectToCloudinary(
          formData.image,
          'svasc/sports/houses',
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
      name: formData.name || '',
      subtitle: formData.subtitle || '',
      description: formData.description || '',
      image: imageUrl,
      order: Number(formData.order) || 0,
      offset: formData.offset === true || formData.offset === 'true',
      custom: formData.custom === true || formData.custom === 'true',
    };

    if (id) {
      await updateSportHouse(id, payload);
    } else {
      await createSportHouse(payload);
    }
    loadData();
  };

  const handleDeleteHouse = async (id) => {
    await deleteSportHouse(id);
    loadData();
  };

  return (
    <div>
      <HeroForm pageKey="sports" title="Sports Page Hero Section" />

      <CrudManager
        title="SVASC Sport Houses"
        data={houses}
        columns={[
          { key: 'order', label: 'Order', type: 'text' },
          { key: 'name', label: 'House Name', type: 'text' },
          { key: 'subtitle', label: 'Subtitle / Mascot', type: 'text' },
          { key: 'description', label: 'Description', type: 'text' },
          { key: 'image', label: 'Image', type: 'image' },
        ]}
        onSave={handleSaveHouse}
        onDelete={handleDeleteHouse}
        initialFormState={{ name: '', subtitle: '', description: '', image: null, order: 0 }}
        renderForm={(formData, setFormData) => (
          <>
            <FormInput
              label="House Name (e.g. House 1)"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <FormInput
              label="Subtitle / Mascot (e.g. Warriors, Champions)"
              value={formData.subtitle || ''}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            />
            <FormInput
              label="Description (e.g. Excellence in Athletics)"
              type="textarea"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <FormInput
              label="Display Order"
              type="number"
              value={formData.order ?? 0}
              onChange={(e) => setFormData({ ...formData, order: e.target.value })}
            />
            <FileUploader
              label="House Image"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              previewUrl={
                typeof formData.image === 'string'
                  ? formData.image.startsWith('http')
                    ? formData.image
                    : `${BASE_URL}/${formData.image.replace(/^\/+/, '')}`
                  : formData.image
                  ? URL.createObjectURL(formData.image)
                  : null
              }
            />

            {/* LIVE IMAGE UPLOAD PROGRESS BAR */}
            {isUploading && (
              <div style={{ marginTop: '0.75rem' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    color: '#2563eb',
                    marginBottom: '0.3rem',
                  }}
                >
                  <span>⚡ Direct Cloudinary Image Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '8px',
                    background: '#e5e7eb',
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${uploadProgress}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #3b82f6, #10b981)',
                      transition: 'width 0.2s ease',
                    }}
                  />
                </div>
              </div>
            )}
          </>
        )}
      />
    </div>
  );
};

export default SportsTab;
