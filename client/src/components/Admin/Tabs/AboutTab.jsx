import React, { useState, useEffect } from 'react';
import HeroForm from '../HeroForm';
import CrudManager from '../CrudManager';
import { FormInput, FileUploader } from '../FormInput';
import { uploadDirectToCloudinary } from '../../../utils/cloudinaryDirectUpload';
import {
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
  getAllTeacherAwards,
  createTeacherAward,
  updateTeacherAward,
  deleteTeacherAward,
} from '../../../services/aboutService';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const AboutTab = () => {
  const [certifications, setCertifications] = useState([]);
  const [teacherAwards, setTeacherAwards] = useState([]);
  const [certProgress, setCertProgress] = useState(0);
  const [isUploadingCert, setIsUploadingCert] = useState(false);

  const loadData = async () => {
    try {
      const [certRes, awardsRes] = await Promise.allSettled([
        getCertifications(),
        getAllTeacherAwards()
      ]);
      if (certRes.status === 'fulfilled') {
        const val = certRes.value;
        setCertifications(val?.data ?? (Array.isArray(val) ? val : []));
      }
      if (awardsRes.status === 'fulfilled') {
        const val = awardsRes.value;
        setTeacherAwards(val?.data ?? (Array.isArray(val) ? val : []));
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleSaveCert = async (formData, id) => {
    let imageUrl = formData.image;

    if (formData.image instanceof File) {
      setIsUploadingCert(true);
      setCertProgress(0);
      try {
        imageUrl = await uploadDirectToCloudinary(
          formData.image,
          'svasc/about/certifications',
          (pct) => setCertProgress(pct)
        );
      } finally {
        setIsUploadingCert(false);
      }
    }

    if (!imageUrl) {
      throw new Error("Please select an image file or provide an image URL.");
    }

    const payload = {
      order: Number(formData.order) || 0,
      image: imageUrl
    };

    if (id) {
      await updateCertification(id, payload);
    } else {
      await createCertification(payload);
    }
    loadData();
  };

  const handleDeleteCert = async (id) => {
    await deleteCertification(id);
    loadData();
  };

  const handleSaveAward = async (formData, id) => {
    const payload = {
      year: Number(formData.year) || new Date().getFullYear(),
      awardName: formData.awardName || '',
      facultyName: formData.facultyName || ''
    };
    
    if (id) {
      await updateTeacherAward(id, payload);
    } else {
      await createTeacherAward(payload);
    }
    loadData();
  };

  const handleDeleteAward = async (id) => {
    await deleteTeacherAward(id);
    loadData();
  };

  return (
    <div>
      <HeroForm pageKey="about" title="About Page Hero Section" />

      <CrudManager
        title="Awards & Certifications"
        data={certifications}
        columns={[
          { key: 'order', label: 'Order', type: 'text' },
          { key: 'image', label: 'Certificate Image', type: 'image' }
        ]}
        onSave={handleSaveCert}
        onDelete={handleDeleteCert}
        initialFormState={{ order: 0, image: null }}
        renderForm={(formData, setFormData) => (
          <>
            <FormInput label="Display Order" type="number" value={formData.order || 0} onChange={(e) => setFormData({...formData, order: e.target.value})} />
            <FileUploader
              label="Certificate Image"
              accept="image/*"
              onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
              previewUrl={typeof formData.image === 'string' ? (formData.image.startsWith('http') ? formData.image : `${BASE_URL}/${formData.image.replace(/^\/+/, '')}`) : (formData.image ? URL.createObjectURL(formData.image) : null)}
            />

            {/* LIVE CERTIFICATE UPLOAD PROGRESS BAR */}
            {isUploadingCert && (
              <div style={{ marginTop: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '600', color: '#2563eb', marginBottom: '0.3rem' }}>
                  <span>⚡ Direct Cloudinary Image Uploading...</span>
                  <span>{certProgress}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${certProgress}%`,
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
        title="Awards Received By Teachers"
        data={teacherAwards}
        columns={[
          { key: 'year', label: 'Year', type: 'text' },
          { key: 'awardName', label: 'Award Name', type: 'text' },
          { key: 'facultyName', label: 'Faculty Name', type: 'text' }
        ]}
        onSave={handleSaveAward}
        onDelete={handleDeleteAward}
        initialFormState={{ year: new Date().getFullYear(), awardName: '', facultyName: '' }}
        renderForm={(formData, setFormData) => (
          <>
            <FormInput label="Year" type="number" value={formData.year || ''} onChange={(e) => setFormData({...formData, year: e.target.value})} required />
            <FormInput label="Award Name" value={formData.awardName || ''} onChange={(e) => setFormData({...formData, awardName: e.target.value})} required />
            <FormInput label="Faculty Name" value={formData.facultyName || ''} onChange={(e) => setFormData({...formData, facultyName: e.target.value})} required />
          </>
        )}
      />
    </div>
  );
};

export default AboutTab;
