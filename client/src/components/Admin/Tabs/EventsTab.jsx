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
} from '../../../services/eventService';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const EventsTab = () => {
  const [gridEvents, setGridEvents] = useState([]);
  const [gridProgress, setGridProgress] = useState(0);
  const [isUploadingGrid, setIsUploadingGrid] = useState(false);

  const loadData = async () => {
    try {
      const gRes = await getEventsGrid();
      const val = gRes?.data ?? (Array.isArray(gRes) ? gRes : []);
      setGridEvents(val);
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
    </div>
  );
};

export default EventsTab;
