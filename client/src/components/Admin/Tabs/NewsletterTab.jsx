import React, { useState, useEffect } from 'react';
import HeroForm from '../HeroForm';
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
  const [isUploading, setIsUploading] = useState(false);

  const loadData = async () => {
    try {
      const res = await getNewsletters();
      const list = res?.data ?? (Array.isArray(res) ? res : []);
      setNewsletters(list);
    } catch (err) {
      console.error('Error loading newsletter data', err);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleSave = async (formData, id) => {
    let fileUrl = formData.file || formData.pdf;

    if (formData.file instanceof File) {
      setIsUploading(true);
      setUploadProgress(0);
      try {
        fileUrl = await uploadDirectToCloudinary(
          formData.file,
          'svasc/newsletters',
          (pct) => setUploadProgress(pct)
        );
      } finally {
        setIsUploading(false);
      }
    }

    if (!fileUrl) {
      throw new Error("Please select an image or PDF file to upload.");
    }

    const payload = {
      title: formData.title || '',
      pdf: fileUrl
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
          { key: 'pdf', label: 'Image / PDF', type: 'image' }
        ]}
        onSave={handleSave}
        onDelete={handleDelete}
        initialFormState={{ title: '', file: null }}
        renderForm={(formData, setFormData) => (
          <>
            <FormInput label="Title" value={formData.title || ''} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
            <FileUploader
              label="Newsletter Image / PDF"
              accept="image/*,.pdf"
              onChange={(e) => setFormData({...formData, file: e.target.files[0]})}
              previewUrl={
                typeof formData.file === 'string'
                  ? (formData.file.startsWith('http') ? formData.file : `${BASE_URL}/${formData.file.replace(/^\/+/, '')}`)
                  : (formData.file ? URL.createObjectURL(formData.file) : (formData.pdf ? (formData.pdf.startsWith('http') ? formData.pdf : `${BASE_URL}/${formData.pdf.replace(/^\/+/, '')}`) : null))
              }
            />

            {/* LIVE UPLOAD PROGRESS BAR */}
            {isUploading && (
              <div style={{ marginTop: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '600', color: '#2563eb', marginBottom: '0.3rem' }}>
                  <span>⚡ Direct Cloudinary Uploading...</span>
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
