import React, { useState, useEffect } from 'react';
import CrudManager from '../CrudManager';
import { FormInput, FormGroup, FileUploader } from '../FormInput';
import { fetchAdminData, saveAdminData, deleteAdminData } from '../../../utils/adminApi';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const HomeTab = () => {
  const [heroSlides, setHeroSlides] = useState([]);
  const [valueSlides, setValueSlides] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [alumni, setAlumni] = useState([]);
  const [events, setEvents] = useState([]);

  const loadData = async () => {
    try {
      const [hRes, vRes, bRes, aRes, eRes] = await Promise.allSettled([
        fetchAdminData('/api/home/hero-slides'),
        fetchAdminData('/api/home/value-slides'),
        fetchAdminData('/api/home/blogs'),
        fetchAdminData('/api/home/alumni-slider'),
        fetchAdminData('/api/home/events')
      ]);

      if (hRes.status === 'fulfilled') setHeroSlides(hRes.value);
      if (vRes.status === 'fulfilled') setValueSlides(vRes.value);
      if (bRes.status === 'fulfilled') setBlogs(bRes.value);
      if (aRes.status === 'fulfilled') setAlumni(aRes.value);
      if (eRes.status === 'fulfilled') setEvents(eRes.value);
    } catch (err) {
      console.error("Error loading home data", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (endpoint, fileKey, formData, id) => {
    await saveAdminData(endpoint, id, formData, fileKey);
    loadData();
  };

  const handleDelete = async (endpoint, id) => {
    await deleteAdminData(endpoint, id);
    loadData();
  };

  return (
    <div>
      <CrudManager
        title="Home Hero Slides"
        data={heroSlides}
        columns={[
          { key: 'order', label: 'Order', type: 'text' },
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'type', label: 'Type', type: 'text' },
          { key: 'src', label: 'Media', type: 'media' }
        ]}
        onSave={(data, id) => handleSave('/api/home/hero-slides', 'src', data, id)}
        onDelete={(id) => handleDelete('/api/home/hero-slides', id)}
        initialFormState={{ type: 'image', title: '', description: '', link: '#', linkLabel: 'Explore', order: 0, src: null }}
        renderForm={(formData, setFormData) => (
          <>
            <FormGroup label="Media Type">
              <select 
                className="input" 
                value={formData.type} 
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                style={{ padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </FormGroup>
            <FormInput 
              label="Title (e.g. Welcome to SVASC)" 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
              required 
            />
            <FormInput 
              label="Description" 
              type="textarea"
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})} 
            />
            <FormInput 
              label="Display Order (e.g. 1, 2, 3)" 
              type="number"
              value={formData.order ?? 0} 
              onChange={(e) => setFormData({...formData, order: e.target.value})} 
            />
            <FormInput 
              label="Action Link (e.g. # or /programms)" 
              value={formData.link || '#'} 
              onChange={(e) => setFormData({...formData, link: e.target.value})} 
            />
            <FileUploader 
              label={formData.type === 'video' ? "Upload Video (mp4, webm)" : "Upload Image (jpg, png, webp)"}
              accept={formData.type === 'video' ? "video/*" : "image/*"}
              onChange={(e) => setFormData({...formData, src: e.target.files[0]})} 
              previewUrl={typeof formData.src === 'string' ? (formData.src.startsWith('http') || formData.src.startsWith('.') ? formData.src : `${BASE_URL}/${formData.src.replace(/^\/+/, '')}`) : (formData.src ? URL.createObjectURL(formData.src) : null)}
            />
          </>
        )}
      />

      <CrudManager
        title="Unique Values"
        data={valueSlides}
        columns={[
          { key: 'order', label: 'Order', type: 'text' },
          { key: 'field1', label: 'Point 1', type: 'text' },
          { key: 'field2', label: 'Point 2', type: 'text' },
          { key: 'backgroundImage', label: 'Background', type: 'image' }
        ]}
        onSave={(data, id) => handleSave('/api/home/value-slides', 'backgroundImage', data, id)}
        onDelete={(id) => handleDelete('/api/home/value-slides', id)}
        initialFormState={{ field1: '', field2: '', field3: '', field4: '', field5: '', order: 0, backgroundImage: null }}
        renderForm={(formData, setFormData) => (
          <>
            <FormInput label="Point 1" value={formData.field1} onChange={(e) => setFormData({...formData, field1: e.target.value})} required />
            <FormInput label="Point 2" value={formData.field2} onChange={(e) => setFormData({...formData, field2: e.target.value})} required />
            <FormInput label="Point 3" value={formData.field3} onChange={(e) => setFormData({...formData, field3: e.target.value})} required />
            <FormInput label="Point 4" value={formData.field4} onChange={(e) => setFormData({...formData, field4: e.target.value})} required />
            <FormInput label="Point 5" value={formData.field5} onChange={(e) => setFormData({...formData, field5: e.target.value})} required />
            <FormInput 
              label="Display Order (e.g. 1, 2, 3)" 
              type="number"
              value={formData.order ?? 0} 
              onChange={(e) => setFormData({...formData, order: e.target.value})} 
            />
            <FileUploader 
              label="Background Image (jpg, png, webp)"
              accept="image/*"
              onChange={(e) => setFormData({...formData, backgroundImage: e.target.files[0]})} 
              previewUrl={typeof formData.backgroundImage === 'string' ? (formData.backgroundImage.startsWith('http') || formData.backgroundImage.startsWith('.') ? formData.backgroundImage : `${BASE_URL}/${formData.backgroundImage.replace(/^\/+/, '')}`) : (formData.backgroundImage ? URL.createObjectURL(formData.backgroundImage) : null)}
            />
          </>
        )}
      />

      <CrudManager
        title="Insightful Blogs"
        data={blogs}
        columns={[
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'category', label: 'Category', type: 'text' },
          { key: 'image', label: 'Image', type: 'image' }
        ]}
        onSave={(data, id) => handleSave('/api/home/blogs', 'image', data, id)}
        onDelete={(id) => handleDelete('/api/home/blogs', id)}
        initialFormState={{ title: '', category: '', date: '', content: '', image: null }}
        renderForm={(formData, setFormData) => (
          <>
            <FormInput label="Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
            <FormInput label="Category" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} required />
            <FormInput label="Date (e.g. Mar 15, 2024)" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} required />
            <FormInput label="Content Snippet" type="textarea" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} required />
            <FileUploader 
              label="Blog Image"
              onChange={(e) => setFormData({...formData, image: e.target.files[0]})} 
              previewUrl={typeof formData.image === 'string' ? `${BASE_URL}/${formData.image.replace(/^\/+/, '')}` : (formData.image ? URL.createObjectURL(formData.image) : null)}
            />
          </>
        )}
      />

      <CrudManager
        title="Alumni"
        data={alumni}
        columns={[
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'batch', label: 'Batch', type: 'text' },
          { key: 'image', label: 'Image', type: 'image' }
        ]}
        onSave={(data, id) => handleSave('/api/home/alumni-slider', 'image', data, id)}
        onDelete={(id) => handleDelete('/api/home/alumni-slider', id)}
        initialFormState={{ name: '', batch: '', role: '', description: '', image: null }}
        renderForm={(formData, setFormData) => (
          <>
            <FormInput label="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            <FormInput label="Batch" value={formData.batch} onChange={(e) => setFormData({...formData, batch: e.target.value})} required />
            <FormInput label="Role/Position" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} required />
            <FormInput label="Description" type="textarea" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required />
            <FileUploader 
              label="Alumni Image"
              onChange={(e) => setFormData({...formData, image: e.target.files[0]})} 
              previewUrl={typeof formData.image === 'string' ? `${BASE_URL}/${formData.image.replace(/^\/+/, '')}` : (formData.image ? URL.createObjectURL(formData.image) : null)}
            />
          </>
        )}
      />

      <CrudManager
        title="Events"
        data={events}
        columns={[
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'day', label: 'Day', type: 'text' },
          { key: 'month', label: 'Month', type: 'text' },
          { key: 'image', label: 'Image', type: 'image' }
        ]}
        onSave={(data, id) => handleSave('/api/home/events', 'image', data, id)}
        onDelete={(id) => handleDelete('/api/home/events', id)}
        initialFormState={{ day: '', month: '', title: '', description: '', image: null }}
        renderForm={(formData, setFormData) => (
          <>
            <FormInput label="Day (e.g. 28)" value={formData.day} onChange={(e) => setFormData({...formData, day: e.target.value})} required />
            <FormInput label="Month (e.g. Apr)" value={formData.month} onChange={(e) => setFormData({...formData, month: e.target.value})} required />
            <FormInput label="Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
            <FormInput label="Description" type="textarea" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required />
            <FileUploader 
              label="Event Image"
              onChange={(e) => setFormData({...formData, image: e.target.files[0]})} 
              previewUrl={typeof formData.image === 'string' ? `${BASE_URL}/${formData.image.replace(/^\/+/, '')}` : (formData.image ? URL.createObjectURL(formData.image) : null)}
            />
          </>
        )}
      />
    </div>
  );
};

export default HomeTab;
