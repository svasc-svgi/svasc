import React, { useState, useEffect } from 'react';
import CrudManager from '../CrudManager';
import { FormInput, FileUploader } from '../FormInput';
import { uploadDirectToCloudinary } from '../../../utils/cloudinaryDirectUpload';
import {
  getWhySvascTestimonials,
  createWhySvascTestimonial,
  updateWhySvascTestimonial,
  deleteWhySvascTestimonial,
} from '../../../services/whySvascService';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const WhySvascTab = () => {
  const [items, setItems] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const loadData = async () => {
    try {
      const res = await getWhySvascTestimonials();
      const list = res?.data ?? (Array.isArray(res) ? res : []);
      setItems(list);
    } catch (err) {
      console.error('Error loading Why SVASC feedback:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (formData, id) => {
    let imageUrl = formData.image || '';

    if (formData.file instanceof File) {
      setIsUploading(true);
      setUploadProgress(0);
      try {
        imageUrl = await uploadDirectToCloudinary(
          formData.file,
          'svasc/testimonials',
          (pct) => setUploadProgress(pct)
        );
      } finally {
        setIsUploading(false);
      }
    }

    const payload = {
      name: formData.name || '',
      text: formData.text || '',
      image: imageUrl || formData.image || '/testimonials/pooja.jpg',
      department: formData.department || '',
      batch: formData.batch || '',
      order: Number(formData.order) || 0
    };

    if (id) {
      await updateWhySvascTestimonial(id, payload);
    } else {
      await createWhySvascTestimonial(payload);
    }
    loadData();
  };

  const handleDelete = async (id) => {
    await deleteWhySvascTestimonial(id);
    loadData();
  };

  return (
    <div>
      <CrudManager
        title="Why SVASC - Student Testimonials"
        data={items}
        columns={[
          { key: 'name', label: 'Student / Title', type: 'text' },
          { key: 'text', label: 'Testimonial Feedback', type: 'text' },
          { key: 'image', label: 'Student Photo', type: 'image' }
        ]}
        onSave={handleSave}
        onDelete={handleDelete}
        initialFormState={{
          name: '',
          text: '',
          image: '',
          department: '',
          batch: '',
          order: 0,
          file: null
        }}
        renderForm={(formData, setFormData) => (
          <>
            <FormInput
              label="Student Name & Details (e.g. E.Pooja - B.Sc Computer Science (2023 batch))"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.4rem', color: '#1e293b' }}>
                Testimonial Feedback Text *
              </label>
              <textarea
                rows={5}
                value={formData.text || ''}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                required
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
                placeholder="Enter the student's testimonial feedback..."
              />
            </div>
            <FileUploader
              label="Student Photo"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
              previewUrl={
                typeof formData.file === 'string'
                  ? (formData.file.startsWith('http') ? formData.file : `${BASE_URL}/${formData.file.replace(/^\/+/, '')}`)
                  : (formData.file ? URL.createObjectURL(formData.file) : (formData.image ? (formData.image.startsWith('http') || formData.image.startsWith('/') ? formData.image : `${BASE_URL}/${formData.image.replace(/^\/+/, '')}`) : null))
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
                  <div
                    style={{
                      width: `${uploadProgress}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #3b82f6, #10b981)',
                      transition: 'width 0.2s ease'
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

export default WhySvascTab;
