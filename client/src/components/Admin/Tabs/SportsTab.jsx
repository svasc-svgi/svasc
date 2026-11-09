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
  getSportsDay,
  updateSportsDay,
} from '../../../services/sportsService';
import styles from '../CrudManager.module.css';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const SportsTab = () => {
  const [houses, setHouses] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Sports Day State
  const [sportsDay, setSportsDay] = useState({
    title: 'Sports Day',
    subtitle: 'Annual Athletic Meet',
    description: '',
    pdfTitle: 'Sports Day Schedule & Guidelines',
    pdfUrl: '',
  });
  const [sportsDayFile, setSportsDayFile] = useState(null);
  const [isSavingSportsDay, setIsSavingSportsDay] = useState(false);
  const [sportsDayProgress, setSportsDayProgress] = useState(0);
  const [isUploadingSportsDayPdf, setIsUploadingSportsDayPdf] = useState(false);
  const [sportsDayStatus, setSportsDayStatus] = useState({ text: '', type: '' });

  const loadData = async () => {
    try {
      const [housesRes, dayRes] = await Promise.allSettled([
        getSportHouses(),
        getSportsDay(),
      ]);

      if (housesRes.status === 'fulfilled') {
        const val = housesRes.value;
        const data = val?.data ?? (Array.isArray(val) ? val : []);
        setHouses(data);
      }

      if (dayRes.status === 'fulfilled') {
        const val = dayRes.value?.data ?? dayRes.value;
        if (val) {
          setSportsDay({
            title: val.title || 'Sports Day',
            subtitle: val.subtitle || 'Annual Athletic Meet',
            description: val.description || '',
            pdfTitle: val.pdfTitle || 'Sports Day Schedule & Guidelines',
            pdfUrl: val.pdfUrl || '',
          });
        }
      }
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

  const handleSaveSportsDay = async (e) => {
    e.preventDefault();
    setIsSavingSportsDay(true);
    setSportsDayStatus({ text: '', type: '' });

    try {
      let finalPdfUrl = sportsDay.pdfUrl;

      if (sportsDayFile instanceof File) {
        setIsUploadingSportsDayPdf(true);
        setSportsDayProgress(0);
        try {
          finalPdfUrl = await uploadDirectToCloudinary(
            sportsDayFile,
            'svasc/sports/sports-day',
            (pct) => setSportsDayProgress(pct)
          );
        } finally {
          setIsUploadingSportsDayPdf(false);
        }
      }

      const payload = {
        title: sportsDay.title || 'Sports Day',
        subtitle: sportsDay.subtitle || 'Annual Athletic Meet',
        description: sportsDay.description || '',
        pdfTitle: sportsDay.pdfTitle || 'Sports Day Schedule & Guidelines',
        pdfUrl: finalPdfUrl || '',
      };

      const res = await updateSportsDay(payload);
      const updated = res?.data ?? res;
      if (updated) {
        setSportsDay(prev => ({
          ...prev,
          ...updated,
          pdfUrl: updated.pdfUrl || finalPdfUrl || '',
        }));
      }
      setSportsDayFile(null);
      setSportsDayStatus({ text: 'Sports Day section updated successfully!', type: 'success' });
      setTimeout(() => setSportsDayStatus({ text: '', type: '' }), 5000);
    } catch (err) {
      console.error('Error saving Sports Day section', err);
      setSportsDayStatus({ text: err.message || 'Failed to update Sports Day section', type: 'error' });
    } finally {
      setIsSavingSportsDay(false);
    }
  };

  const currentPdfHref = sportsDay.pdfUrl
    ? (sportsDay.pdfUrl.startsWith('http') ? sportsDay.pdfUrl : `${BASE_URL}/${sportsDay.pdfUrl.replace(/^\/+/, '')}`)
    : null;

  return (
    <div>
      <HeroForm pageKey="sports" title="Sports Page Hero Section" />

      {/* Sports Day Section Management */}
      <div className={styles.crudWrapper} style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #eaeaea', paddingBottom: '1rem' }}>
          <div>
            <h2 style={{ margin: 0, color: '#333', fontSize: '1.25rem' }}>Sports Day Section (Left Paragraph & Right PDF)</h2>
            <p style={{ margin: '0.25rem 0 0', color: '#666', fontSize: '0.9rem' }}>
              Configure the left-side paragraph and right-side PDF schedule / brochure shown in the Sports Day section.
            </p>
          </div>
        </div>

        {sportsDayStatus.text && (
          <div style={{
            padding: '0.85rem 1.25rem',
            marginBottom: '1.25rem',
            borderRadius: '4px',
            backgroundColor: sportsDayStatus.type === 'success' ? '#dcfce7' : '#fee2e2',
            color: sportsDayStatus.type === 'success' ? '#15803d' : '#b91c1c',
            fontWeight: '500',
            fontSize: '0.9rem'
          }}>
            {sportsDayStatus.text}
          </div>
        )}

        <form onSubmit={handleSaveSportsDay} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <FormInput
              label="Section Label / Subtitle (e.g. Annual Athletic Meet)"
              value={sportsDay.subtitle || ''}
              onChange={(e) => setSportsDay({ ...sportsDay, subtitle: e.target.value })}
            />
            <FormInput
              label="Section Title (e.g. Sports Day)"
              value={sportsDay.title || ''}
              onChange={(e) => setSportsDay({ ...sportsDay, title: e.target.value })}
              required
            />
          </div>

          <FormInput
            label="Left-Side Paragraph (Description of Sports Day)"
            type="textarea"
            rows={5}
            value={sportsDay.description || ''}
            onChange={(e) => setSportsDay({ ...sportsDay, description: e.target.value })}
            placeholder="Write the Sports Day paragraph that will display on the left side of the Sports Day section..."
            required
          />

          <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '1.25rem' }}>
            <h3 style={{ margin: '0 0 1rem', fontSize: '1rem', color: '#444' }}>Right-Side PDF Document</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <FormInput
                label="PDF Title / Label (e.g. Sports Day Schedule & Guidelines)"
                value={sportsDay.pdfTitle || ''}
                onChange={(e) => setSportsDay({ ...sportsDay, pdfTitle: e.target.value })}
              />

              <div>
                <FileUploader
                  label="Upload PDF Document (.pdf)"
                  accept=".pdf,application/pdf"
                  onChange={(e) => setSportsDayFile(e.target.files[0] || null)}
                  previewUrl={null}
                />
                {sportsDayFile && (
                  <p style={{ margin: '0.35rem 0 0', fontSize: '0.85rem', color: '#2563eb' }}>
                    Selected file: <strong>{sportsDayFile.name}</strong> ({(sportsDayFile.size / 1024).toFixed(1)} KB)
                  </p>
                )}
                {currentPdfHref && !sportsDayFile && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#16a34a', fontWeight: '600' }}>✓ PDF Uploaded:</span>
                    <a
                      href={currentPdfHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#2563eb', textDecoration: 'underline', fontWeight: '500' }}
                    >
                      View Current PDF 📄
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* LIVE PDF UPLOAD PROGRESS BAR */}
            {isUploadingSportsDayPdf && (
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
                  <span>⚡ Direct Cloudinary PDF Uploading...</span>
                  <span>{sportsDayProgress}%</span>
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
                      width: `${sportsDayProgress}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #3b82f6, #10b981)',
                      transition: 'width 0.2s ease',
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSavingSportsDay}
            >
              {isSavingSportsDay ? 'Saving Sports Day Details...' : 'Save Sports Day Details'}
            </button>
          </div>
        </form>
      </div>

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
