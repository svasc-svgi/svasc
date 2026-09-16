import React, { useState, useEffect } from 'react';
import CrudManager from '../CrudManager';
import { FormInput, FileUploader } from '../FormInput';
import { uploadDirectToCloudinary } from '../../../utils/cloudinaryDirectUpload';
import {
  getLibraryActivities,
  createLibraryActivity,
  updateLibraryActivity,
  deleteLibraryActivity,
} from '../../../services/libraryService';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const LibraryActivitiesTab = () => {
  const [data, setData] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const loadData = async () => {
    try {
      const res = await getLibraryActivities();
      const list = res?.data ?? (Array.isArray(res) ? res : []);
      setData(list);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (formData, id) => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      let image1Url = formData.image1;
      let image2Url = formData.image2;

      if (formData.image1 instanceof File) {
        image1Url = await uploadDirectToCloudinary(
          formData.image1,
          'svasc/library/activities',
          (pct) => setUploadProgress(Math.round(pct * 0.5))
        );
      }

      if (formData.image2 instanceof File) {
        image2Url = await uploadDirectToCloudinary(
          formData.image2,
          'svasc/library/activities',
          (pct) => setUploadProgress(50 + Math.round(pct * 0.5))
        );
      }

      setUploadProgress(100);

      const payload = {
        title: formData.title || '',
        date: formData.date || '',
        desc: formData.desc || '',
        image1: image1Url || '',
        image2: image2Url || ''
      };

      if (id) {
        await updateLibraryActivity(id, payload);
      } else {
        await createLibraryActivity(payload);
      }
      loadData();
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteLibraryActivity(id);
    loadData();
  };

  const columns = [
    { key: 'image1', label: 'Image 1', type: 'image' },
    { key: 'image2', label: 'Image 2', type: 'image' },
    { key: 'title', label: 'Activity Title' },
    { key: 'date', label: 'Date' }
  ];

  const renderForm = (formData, setFormData) => (
    <>
      <FormInput
        label="Activity Title"
        value={formData.title || ''}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
        required
      />
      <FormInput
        label="Date"
        value={formData.date || ''}
        onChange={(e) => setFormData({...formData, date: e.target.value})}
        required
      />
      <FormInput
        label="Description"
        type="textarea"
        value={formData.desc || ''}
        onChange={(e) => setFormData({...formData, desc: e.target.value})}
        required
      />
      <FileUploader
        label="Image 1"
        accept="image/*"
        onChange={(e) => setFormData({...formData, image1: e.target.files[0]})}
        previewUrl={
          typeof formData.image1 === 'string'
            ? (formData.image1.startsWith('http') ? formData.image1 : `${BASE_URL}/${formData.image1.replace(/^\/+/, '')}`)
            : (formData.image1 ? URL.createObjectURL(formData.image1) : null)
        }
      />
      <FileUploader
        label="Image 2"
        accept="image/*"
        onChange={(e) => setFormData({...formData, image2: e.target.files[0]})}
        previewUrl={
          typeof formData.image2 === 'string'
            ? (formData.image2.startsWith('http') ? formData.image2 : `${BASE_URL}/${formData.image2.replace(/^\/+/, '')}`)
            : (formData.image2 ? URL.createObjectURL(formData.image2) : null)
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
  );

  return (
    <CrudManager
      title="Library Activities"
      data={data}
      columns={columns}
      onSave={handleSave}
      onDelete={handleDelete}
      renderForm={renderForm}
      initialFormState={{ title: '', date: '', desc: '', image1: null, image2: null }}
    />
  );
};

export default LibraryActivitiesTab;
