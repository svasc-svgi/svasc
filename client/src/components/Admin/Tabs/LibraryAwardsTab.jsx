import React, { useState, useEffect } from 'react';
import CrudManager from '../CrudManager';
import { FormInput, FileUploader } from '../FormInput';
import { uploadDirectToCloudinary } from '../../../utils/cloudinaryDirectUpload';
import {
  getLibraryAwards,
  createLibraryAward,
  updateLibraryAward,
  deleteLibraryAward,
} from '../../../services/libraryService';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const LibraryAwardsTab = () => {
  const [data, setData] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const loadData = async () => {
    try {
      const res = await getLibraryAwards();
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
    let imageUrl = formData.image;

    if (formData.image instanceof File) {
      setIsUploading(true);
      setUploadProgress(0);
      try {
        imageUrl = await uploadDirectToCloudinary(
          formData.image,
          'svasc/library/awards',
          (pct) => setUploadProgress(pct)
        );
      } finally {
        setIsUploading(false);
      }
    }

    const payload = {
      category: formData.category || 'Student',
      name: formData.name || '',
      designation: formData.designation || '',
      department: formData.department || '',
      image: imageUrl || ''
    };

    if (id) {
      await updateLibraryAward(id, payload);
    } else {
      await createLibraryAward(payload);
    }
    loadData();
  };

  const handleDelete = async (id) => {
    await deleteLibraryAward(id);
    loadData();
  };

  const columns = [
    { key: 'image', label: 'Photo', type: 'image' },
    { key: 'name', label: 'Name' },
    { key: 'category', label: 'Category' },
    { key: 'designation', label: 'Designation / Class' }
  ];

  const renderForm = (formData, setFormData) => (
    <>
      <FormInput
        label="Category"
        type="select"
        options={[
          { value: 'Student', label: 'Student Recipient' },
          { value: 'Faculty', label: 'Faculty Recipient' },
          { value: 'NonTeaching', label: 'Non-Teaching Staff Recipient' }
        ]}
        value={formData.category || 'Student'}
        onChange={(e) => setFormData({...formData, category: e.target.value})}
        required
      />
      <FormInput
        label="Full Name"
        value={formData.name || ''}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required
      />
      <FormInput
        label={formData.category === 'Student' ? "Class (e.g., II B.Com CA)" : "Designation / Role (e.g., Assistant Professor)"}
        value={formData.designation || ''}
        onChange={(e) => setFormData({...formData, designation: e.target.value})}
        required
      />
      
      {/* Department is only relevant for Faculty based on the frontend layout */}
      {formData.category === 'Faculty' && (
        <FormInput
          label="Department (e.g., English)"
          value={formData.department || ''}
          onChange={(e) => setFormData({...formData, department: e.target.value})}
          required={formData.category === 'Faculty'}
        />
      )}

      <FileUploader
        label="Profile Image"
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
  );

  return (
    <CrudManager
      title="Library User Awards"
      data={data}
      columns={columns}
      onSave={handleSave}
      onDelete={handleDelete}
      renderForm={renderForm}
      initialFormState={{ category: 'Student', name: '', designation: '', department: '', image: null }}
    />
  );
};

export default LibraryAwardsTab;
