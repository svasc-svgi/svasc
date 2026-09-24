import React, { useState, useEffect } from 'react';
import HeroForm from '../HeroForm';
import CrudManager from '../CrudManager';
import { FormInput, FileUploader, FormGroup } from '../FormInput';
import { uploadDirectToCloudinary } from '../../../utils/cloudinaryDirectUpload';
import {
  getEventsGrid,
  createEventGrid,
  updateEventGrid,
  deleteEventGrid,
  getEventsMarquee,
  createEventMarquee,
  updateEventMarquee,
  deleteEventMarquee,
} from '../../../services/eventService';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const EventsTab = () => {
  const [gridEvents, setGridEvents] = useState([]);
  const [marqueeEvents, setMarqueeEvents] = useState([]);
  const [gridProgress, setGridProgress] = useState(0);
  const [isUploadingGrid, setIsUploadingGrid] = useState(false);
  const [marqueeProgress, setMarqueeProgress] = useState(0);
  const [isUploadingMarquee, setIsUploadingMarquee] = useState(false);

  const loadData = async () => {
    try {
      const [gRes, mRes] = await Promise.allSettled([
        getEventsGrid(),
        getEventsMarquee(),
      ]);
      if (gRes.status === 'fulfilled') {
        const val = gRes.value;
        setGridEvents(val?.data ?? (Array.isArray(val) ? val : []));
      }
      if (mRes.status === 'fulfilled') {
        const val = mRes.value;
        setMarqueeEvents(val?.data ?? (Array.isArray(val) ? val : []));
      }
    } catch (err) {
      console.error('Error loading events data', err);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleSaveGrid = async (formData, id) => {
    let imageUrl = formData.image;

    if (formData.image instanceof File) {
      setIsUploadingGrid(true);
      setGridProgress(0);
      try {
        imageUrl = await uploadDirectToCloudinary(
          formData.image,
          'svasc/events/grid',
          (pct) => setGridProgress(pct)
        );
      } finally {
        setIsUploadingGrid(false);
      }
    }

    if (!imageUrl) {
      throw new Error("Please select an image file or provide an image URL.");
    }

    const payload = {
      title: formData.title || '',
      date: formData.date || '',
      description: formData.description || '',
      image: imageUrl,
      spanTwoCols: formData.spanTwoCols === 'true' || formData.spanTwoCols === true
    };

    if (id) {
      await updateEventGrid(id, payload);
    } else {
      await createEventGrid(payload);
    }
    loadData();
  };

  const handleDeleteGrid = async (id) => {
    await deleteEventGrid(id);
    loadData();
  };

  const handleSaveMarquee = async (formData, id) => {
    let imageUrl = formData.image;

    if (formData.image instanceof File) {
      setIsUploadingMarquee(true);
      setMarqueeProgress(0);
      try {
        imageUrl = await uploadDirectToCloudinary(
          formData.image,
          'svasc/events/marquee',
          (pct) => setMarqueeProgress(pct)
        );
      } finally {
        setIsUploadingMarquee(false);
      }
    }

    if (!imageUrl) {
      throw new Error("Please select an image file or provide an image URL.");
    }

    const payload = {
      day: formData.day || '',
      month: formData.month || '',
      title: formData.title || '',
      description: formData.description || '',
      url: formData.url || '',
      youtubeUrl: formData.youtubeUrl || '',
      image: imageUrl
    };

    if (id) {
      await updateEventMarquee(id, payload);
    } else {
      await createEventMarquee(payload);
    }
    loadData();
  };

  const handleDeleteMarquee = async (id) => {
    await deleteEventMarquee(id);
    loadData();
  };

  return (
    <div>
      <HeroForm pageKey="events" title="Events Page Hero Section" />

      <CrudManager
        title="Upcoming Events Grid"
        data={gridEvents}
        columns={[
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'date', label: 'Date', type: 'text' },
          { key: 'image', label: 'Image', type: 'image' }
        ]}
        onSave={handleSaveGrid}
        onDelete={handleDeleteGrid}
        initialFormState={{ title: '', date: '', description: '', image: null, spanTwoCols: false }}
        renderForm={(formData, setFormData) => (
          <>
            <FormInput label="Event Title" value={formData.title || ''} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
            <FormInput label="Date (e.g. Mar 15-17, CS Department - Annual Tech Fest)" value={formData.date || ''} onChange={(e) => setFormData({...formData, date: e.target.value})} required />
            <FormInput label="Description" type="textarea" value={formData.description || ''} onChange={(e) => setFormData({...formData, description: e.target.value})} required />
            <FormGroup label="Display Size">
              <select
                value={formData.spanTwoCols ? 'wide' : 'normal'}
                onChange={(e) => setFormData({...formData, spanTwoCols: e.target.value === 'wide'})}
                style={{ padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'inherit' }}
              >
                <option value="normal">Normal Card</option>
                <option value="wide">Wide Card (Spans 2 Columns)</option>
              </select>
            </FormGroup>
            <FileUploader
              label="Event Image"
              accept="image/*"
              onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
              previewUrl={typeof formData.image === 'string' ? (formData.image.startsWith('http') ? formData.image : `${BASE_URL}/${formData.image.replace(/^\/+/, '')}`) : (formData.image ? URL.createObjectURL(formData.image) : null)}
            />

            {/* LIVE GRID EVENT UPLOAD PROGRESS BAR */}
            {isUploadingGrid && (
              <div style={{ marginTop: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '600', color: '#2563eb', marginBottom: '0.3rem' }}>
                  <span>⚡ Direct Cloudinary Image Uploading...</span>
                  <span>{gridProgress}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${gridProgress}%`,
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
        title="Events at SVASC (Marquee / Slider)"
        data={marqueeEvents}
        columns={[
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'day', label: 'Day', type: 'text' },
          { key: 'month', label: 'Month', type: 'text' },
          { key: 'image', label: 'Image', type: 'image' }
        ]}
        onSave={handleSaveMarquee}
        onDelete={handleDeleteMarquee}
        initialFormState={{ day: '', month: '', title: '', description: '', url: '', youtubeUrl: '', image: null }}
        renderForm={(formData, setFormData) => (
          <>
            <FormInput label="Day (e.g. 28)" value={formData.day || ''} onChange={(e) => setFormData({...formData, day: e.target.value})} required />
            <FormInput label="Month (e.g. Apr)" value={formData.month || ''} onChange={(e) => setFormData({...formData, month: e.target.value})} required />
            <FormInput label="Event Title" value={formData.title || ''} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
            <FormInput label="Description" type="textarea" value={formData.description || ''} onChange={(e) => setFormData({...formData, description: e.target.value})} required />
            <FormInput label="External URL (optional)" value={formData.url || ''} onChange={(e) => setFormData({...formData, url: e.target.value})} />
            <FormInput label="YouTube Link (optional)" value={formData.youtubeUrl || ''} onChange={(e) => setFormData({...formData, youtubeUrl: e.target.value})} />
            <FileUploader
              label="Event Image"
              accept="image/*"
              onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
              previewUrl={typeof formData.image === 'string' ? (formData.image.startsWith('http') ? formData.image : `${BASE_URL}/${formData.image.replace(/^\/+/, '')}`) : (formData.image ? URL.createObjectURL(formData.image) : null)}
            />

            {/* LIVE MARQUEE EVENT UPLOAD PROGRESS BAR */}
            {isUploadingMarquee && (
              <div style={{ marginTop: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '600', color: '#2563eb', marginBottom: '0.3rem' }}>
                  <span>⚡ Direct Cloudinary Image Uploading...</span>
                  <span>{marqueeProgress}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${marqueeProgress}%`,
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

export default EventsTab;
