import React, { useState, useEffect } from 'react';
import HeroForm from '../HeroForm';
import CrudManager from '../CrudManager';
import { FormInput, FileUploader } from '../FormInput';
import { uploadDirectToCloudinary } from '../../../utils/cloudinaryDirectUpload';
import {
  getCampusLifeGallery,
  createCampusLifeGallery,
  updateCampusLifeGallery,
  deleteCampusLifeGallery,
  getCampusLifeScrollItems,
  createCampusLifeScrollItem,
  updateCampusLifeScrollItem,
  deleteCampusLifeScrollItem,
} from '../../../services/campusLifeService';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const CampusLifeTab = () => {
  const [gallery, setGallery] = useState([]);
  const [scrollItems, setScrollItems] = useState([]);
  const [galleryProgress, setGalleryProgress] = useState(0);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isUploadingScroll, setIsUploadingScroll] = useState(false);

  const loadData = async () => {
    try {
      const [gRes, sRes] = await Promise.allSettled([
        getCampusLifeGallery(),
        getCampusLifeScrollItems(),
      ]);
      if (gRes.status === 'fulfilled') {
        const val = gRes.value;
        setGallery(val?.data ?? (Array.isArray(val) ? val : []));
      }
      if (sRes.status === 'fulfilled') {
        const val = sRes.value;
        setScrollItems(val?.data ?? (Array.isArray(val) ? val : []));
      }
    } catch (err) {
      console.error('Error loading campus life data', err);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleSaveGallery = async (formData, id) => {
    let imageUrl = formData.image;

    if (formData.image instanceof File) {
      setIsUploadingGallery(true);
      setGalleryProgress(0);
      try {
        imageUrl = await uploadDirectToCloudinary(
          formData.image,
          'svasc/campus-life/gallery',
          (pct) => setGalleryProgress(pct)
        );
      } finally {
        setIsUploadingGallery(false);
      }
    }

    if (!imageUrl) {
      throw new Error("Please select an image file or provide an image URL.");
    }

    const payload = {
      name: formData.name || '',
      description: formData.description || '',
      image: imageUrl,
      order: Number(formData.order) || 0
    };

    if (id) {
      await updateCampusLifeGallery(id, payload);
    } else {
      await createCampusLifeGallery(payload);
    }
    loadData();
  };

  const handleDeleteGallery = async (id) => {
    await deleteCampusLifeGallery(id);
    loadData();
  };

  const handleSaveScroll = async (formData, id) => {
    let imageUrl = formData.image;

    if (formData.image instanceof File) {
      setIsUploadingScroll(true);
      setScrollProgress(0);
      try {
        imageUrl = await uploadDirectToCloudinary(
          formData.image,
          'svasc/campus-life/scroll',
          (pct) => setScrollProgress(pct)
        );
      } finally {
        setIsUploadingScroll(false);
      }
    }

    if (!imageUrl) {
      throw new Error("Please select an image file or provide an image URL.");
    }

    const payload = {
      title: formData.title || '',
      description: formData.description || '',
      link: formData.link || '',
      image: imageUrl,
      order: Number(formData.order) || 0
    };

    if (id) {
      await updateCampusLifeScrollItem(id, payload);
    } else {
      await createCampusLifeScrollItem(payload);
    }
    loadData();
  };

  const handleDeleteScroll = async (id) => {
    await deleteCampusLifeScrollItem(id);
    loadData();
  };

  return (
    <div>
      <HeroForm pageKey="campus-life" title="Campus Life Page Hero Section" />

      <CrudManager
        title="SVASC Gallery (Hover Effect)"
        data={gallery}
        columns={[
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'description', label: 'Description', type: 'text' },
          { key: 'image', label: 'Image', type: 'image' }
        ]}
        onSave={handleSaveGallery}
        onDelete={handleDeleteGallery}
        initialFormState={{ name: '', description: '', image: null, order: 0 }}
        renderForm={(formData, setFormData) => (
          <>
            <FormInput label="Image Name / Title" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            <FormInput label="Description (shows on hover)" type="textarea" value={formData.description || ''} onChange={(e) => setFormData({...formData, description: e.target.value})} required />
            <FormInput label="Order" type="number" value={formData.order ?? 0} onChange={(e) => setFormData({...formData, order: e.target.value})} />
            <FileUploader
              label="Gallery Image"
              accept="image/*"
              onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
              previewUrl={typeof formData.image === 'string' ? (formData.image.startsWith('http') ? formData.image : `${BASE_URL}/${formData.image.replace(/^\/+/, '')}`) : (formData.image ? URL.createObjectURL(formData.image) : null)}
            />

            {/* LIVE GALLERY UPLOAD PROGRESS BAR */}
            {isUploadingGallery && (
              <div style={{ marginTop: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '600', color: '#2563eb', marginBottom: '0.3rem' }}>
                  <span>⚡ Direct Cloudinary Image Uploading...</span>
                  <span>{galleryProgress}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${galleryProgress}%`,
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

      <CrudManager
        title="Campus Life Scroll Section"
        data={scrollItems}
        columns={[
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'description', label: 'Description', type: 'text' },
          { key: 'image', label: 'Image', type: 'image' }
        ]}
        onSave={handleSaveScroll}
        onDelete={handleDeleteScroll}
        initialFormState={{ title: '', description: '', link: '', image: null, order: 0 }}
        renderForm={(formData, setFormData) => (
          <>
            <FormInput label="Title" value={formData.title || ''} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
            <FormInput label="About / Description" type="textarea" value={formData.description || ''} onChange={(e) => setFormData({...formData, description: e.target.value})} required />
            <FormInput label="Link (optional)" value={formData.link || ''} onChange={(e) => setFormData({...formData, link: e.target.value})} />
            <FormInput label="Order" type="number" value={formData.order ?? 0} onChange={(e) => setFormData({...formData, order: e.target.value})} />
            <FileUploader
              label="Section Image"
              accept="image/*"
              onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
              previewUrl={typeof formData.image === 'string' ? (formData.image.startsWith('http') ? formData.image : `${BASE_URL}/${formData.image.replace(/^\/+/, '')}`) : (formData.image ? URL.createObjectURL(formData.image) : null)}
            />

            {/* LIVE SCROLL UPLOAD PROGRESS BAR */}
            {isUploadingScroll && (
              <div style={{ marginTop: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '600', color: '#2563eb', marginBottom: '0.3rem' }}>
                  <span>⚡ Direct Cloudinary Image Uploading...</span>
                  <span>{scrollProgress}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${scrollProgress}%`,
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

export default CampusLifeTab;
