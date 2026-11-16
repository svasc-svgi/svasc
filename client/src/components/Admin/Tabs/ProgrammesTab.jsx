import React, { useState, useEffect, useMemo } from 'react';
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
  { name: 'School of Arts & Languages', acronym: 'SOAL' },
  { name: 'School of Design & Fashion', acronym: 'SODF' },
  { name: 'School of Physical Education', acronym: 'SOPE' },
  { name: 'School of Computer Science', acronym: 'SCS' },
  { name: 'School of Commerce & Management', acronym: 'SCM' },
  { name: 'Research & Development', acronym: 'R&D' }
];

const ProgrammesTab = () => {
  const [programs, setPrograms] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
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

  // Filtered programs based on category filter and search bar
  const filteredPrograms = useMemo(() => {
    return programs.filter((p) => {
      const matchesCategory = activeCategory === 'All' || p.programType === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (p.title || '').toLowerCase().includes(q) ||
        (p.school || '').toLowerCase().includes(q) ||
        (p.slug || '').toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [programs, activeCategory, searchQuery]);

  const counts = useMemo(() => {
    return {
      all: programs.length,
      ug: programs.filter((p) => p.programType === 'UG Programmes').length,
      pg: programs.filter((p) => p.programType === 'PG Programmes').length,
      phd: programs.filter((p) => p.programType === 'Ph.D').length,
    };
  }, [programs]);

  return (
    <div>
      {/* HEADER & METRIC SUMMARY CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ background: '#ffffff', padding: '1rem 1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Total Courses</div>
          <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a', marginTop: '0.2rem' }}>{counts.all}</div>
        </div>
        <div style={{ background: '#ffffff', padding: '1rem 1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: '600', textTransform: 'uppercase' }}>UG Programmes</div>
          <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#1e40af', marginTop: '0.2rem' }}>{counts.ug}</div>
        </div>
        <div style={{ background: '#ffffff', padding: '1rem 1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '0.8rem', color: '#7c3aed', fontWeight: '600', textTransform: 'uppercase' }}>PG Programmes</div>
          <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#5b21b6', marginTop: '0.2rem' }}>{counts.pg}</div>
        </div>
        <div style={{ background: '#ffffff', padding: '1rem 1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: '600', textTransform: 'uppercase' }}>Doctoral (Ph.D)</div>
          <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#065f46', marginTop: '0.2rem' }}>{counts.phd}</div>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.25rem', background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {[
            { id: 'All', label: `All (${counts.all})` },
            { id: 'UG Programmes', label: `UG (${counts.ug})` },
            { id: 'PG Programmes', label: `PG (${counts.pg})` },
            { id: 'Ph.D', label: `Ph.D (${counts.phd})` }
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: '6px',
                border: 'none',
                fontWeight: '600',
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: activeCategory === cat.id ? '#0f172a' : '#ffffff',
                color: activeCategory === cat.id ? '#ffffff' : '#475569',
                boxShadow: activeCategory === cat.id ? '0 2px 4px rgba(0,0,0,0.1)' : '0 1px 2px rgba(0,0,0,0.05)'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search by course title or department..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            minWidth: '260px',
            padding: '0.5rem 0.85rem',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            fontSize: '0.875rem',
            outline: 'none',
            background: '#ffffff'
          }}
        />
      </div>

      <CrudManager
        title={`Programmes Management (${filteredPrograms.length} shown)`}
        data={filteredPrograms}
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
                  const match = POPULAR_SCHOOLS.find((s) => s.name === val);
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
