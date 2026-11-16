import React, { useState, useEffect } from 'react';
import CrudManager from '../CrudManager';
import { FormInput, FileUploader } from '../FormInput';
import { uploadDirectToCloudinary } from '../../../utils/cloudinaryDirectUpload';
import {
  getPrograms,
  createProgram,
  updateProgram,
  deleteProgram
} from '../../../services/programService';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const PROGRAM_TYPES = ['UG Programmes', 'PG Programmes', 'Ph.D'];

const POPULAR_SCHOOLS = [
  { name: 'School of Computer Science & IT', acronym: 'SCSIT' },
  { name: 'School of Commerce', acronym: 'SOC' },
  { name: 'School of Sciences', acronym: 'SOS' },
  { name: 'School of Management', acronym: 'SOM' },
  { name: 'School of Arts & Humanities', acronym: 'SOAH' },
  { name: 'PG & Research Department of Tamil', acronym: 'TAMIL' },
  { name: 'PG & Research Department of English', acronym: 'ENGLISH' },
  { name: 'PG & Research Department of Commerce', acronym: 'COMMERCE' }
];

const ProgrammesTab = () => {
  const [programs, setPrograms] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const loadData = async () => {
    try {
      const res = await getPrograms();
      const list = res?.data ?? (Array.isArray(res) ? res : []);
      setPrograms(list);
    } catch (err) {
      console.error('Error loading programs:', err);
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
          'svasc/programs',
          (pct) => setUploadProgress(pct)
        );
      } finally {
        setIsUploading(false);
      }
    }

    if (!imageUrl) {
      imageUrl = '/assets/ugpg.jpg';
    }

    const slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    const payload = {
      title: formData.title || '',
      slug,
      programType: formData.programType || 'UG Programmes',
      school: formData.school || 'School of Sciences',
      schoolAcronym: formData.schoolAcronym || '',
      image: imageUrl
    };

    if (id) {
      await updateProgram(id, payload);
    } else {
      await createProgram(payload);
    }
    loadData();
  };

  const handleDelete = async (id) => {
    await deleteProgram(id);
    loadData();
  };

  return (
    <div>
      <CrudManager
        title="Manage Programmes & Courses"
        data={programs}
        columns={[
          { key: 'title', label: 'Course Title', type: 'text' },
          { key: 'programType', label: 'Level (UG / PG / Ph.D)', type: 'text' },
          { key: 'school', label: 'Department / School', type: 'text' },
          { key: 'image', label: 'Card Image', type: 'image' }
        ]}
        onSave={handleSave}
        onDelete={handleDelete}
        initialFormState={{
          title: '',
          slug: '',
          programType: 'UG Programmes',
          school: 'School of Computer Science & IT',
          schoolAcronym: 'SCSIT',
          image: '',
          file: null
        }}
        renderForm={(formData, setFormData) => (
          <>
            <FormInput
              label="Course Title (e.g. B.Sc. Computer Science)"
              value={formData.title || ''}
              onChange={(e) => {
                const title = e.target.value;
                const autoSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                setFormData({
                  ...formData,
                  title,
                  slug: formData.slug || autoSlug
                });
              }}
              required
            />

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.4rem', color: '#1e293b' }}>
                Program Category (Level) *
              </label>
              <select
                value={formData.programType || 'UG Programmes'}
                onChange={(e) => setFormData({ ...formData, programType: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#fff',
                  fontFamily: 'inherit',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              >
                {PROGRAM_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.4rem', color: '#1e293b' }}>
                School / Department *
              </label>
              <input
                type="text"
                list="schools-list"
                value={formData.school || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  const match = POPULAR_SCHOOLS.find(s => s.name === val);
                  setFormData({
                    ...formData,
                    school: val,
                    schoolAcronym: match ? match.acronym : (formData.schoolAcronym || '')
                  });
                }}
                required
                placeholder="Select or type School / Department"
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontFamily: 'inherit',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
              <datalist id="schools-list">
                {POPULAR_SCHOOLS.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name} ({s.acronym})
                  </option>
                ))}
              </datalist>
            </div>

            <FormInput
              label="School Acronym (Optional, e.g. SCSIT, SOC)"
              value={formData.schoolAcronym || ''}
              onChange={(e) => setFormData({ ...formData, schoolAcronym: e.target.value })}
            />

            <FormInput
              label="Custom URL Slug (Optional, e.g. bsc-computer-science)"
              value={formData.slug || ''}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            />

            <FileUploader
              label="Course Card Image"
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

export default ProgrammesTab;
