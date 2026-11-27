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
import { 
  Info, 
  Image, 
  Target, 
  CheckSquare, 
  Cpu, 
  Briefcase, 
  HelpCircle, 
  Plus, 
  Trash2 
} from 'lucide-react';

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
  { name: 'School of Science', acronym: 'SOS' },
  { name: 'School of Commerce & Management', acronym: 'SCM' },
  { name: 'Research in Arts', acronym: 'RIA' },
  { name: 'Research in Commerce', acronym: 'RIC' },
  { name: 'Research in Science', acronym: 'RIS' },
  { name: 'Research in Management', acronym: 'RIM' }
];

const FORM_TABS = [
  { id: 'general', label: '1. General Info', icon: Info },
  { id: 'overview', label: '2. About & Hero', icon: Image },
  { id: 'vision', label: '3. Vision & Mission', icon: Target },
  { id: 'objectives', label: '4. Objectives & Roles', icon: CheckSquare },
  { id: 'facilities', label: '5. Facilities & Labs', icon: Cpu },
  { id: 'careers', label: '6. Careers & Eligibility', icon: Briefcase },
  { id: 'faqs', label: '7. FAQs', icon: HelpCircle }
];

const ProgramInnerForm = ({ formData, setFormData, isUploading, uploadProgress, uploadStep }) => {
  const [activeTab, setActiveTab] = useState('general');

  // Convert array or string to text safely
  const missionVal = formData.missionText !== undefined
    ? formData.missionText
    : (Array.isArray(formData.mission) ? formData.mission.join('\n') : (formData.mission || ''));

  const objectivesVal = formData.objectivesText !== undefined
    ? formData.objectivesText
    : (Array.isArray(formData.objectives) ? formData.objectives.join('\n') : '');

  const rolesVal = formData.rolesText !== undefined
    ? formData.rolesText
    : (Array.isArray(formData.rolesAndResponsibilities) ? formData.rolesAndResponsibilities.join('\n') : '');

  const facilitiesVal = formData.facilitiesText !== undefined
    ? formData.facilitiesText
    : (Array.isArray(formData.facilities) ? formData.facilities.join('\n') : '');

  const careersVal = formData.careersText !== undefined
    ? formData.careersText
    : (Array.isArray(formData.careerOpportunities) ? formData.careerOpportunities.map(c => typeof c === 'string' ? c : (c.title || '')).join('\n') : '');

  const highlightsVal = formData.highlightsText !== undefined
    ? formData.highlightsText
    : (Array.isArray(formData.keyHighlights) ? formData.keyHighlights.join('\n') : '');

  const faqsList = Array.isArray(formData.faqs) ? formData.faqs : [];

  const handleAddFaq = () => {
    setFormData({
      ...formData,
      faqs: [...faqsList, { question: '', answer: '' }]
    });
  };

  const handleUpdateFaq = (index, field, value) => {
    const updated = [...faqsList];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, faqs: updated });
  };

  const handleRemoveFaq = (index) => {
    const updated = faqsList.filter((_, i) => i !== index);
    setFormData({ ...formData, faqs: updated });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* SECTION TABS SUB-NAVIGATION */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.4rem',
        padding: '0.4rem',
        background: '#f1f5f9',
        borderRadius: '8px',
        border: '1px solid #e2e8f0'
      }}>
        {FORM_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 0.85rem',
                borderRadius: '6px',
                border: 'none',
                background: isActive ? '#0f172a' : 'transparent',
                color: isActive ? '#ffffff' : '#475569',
                fontSize: '0.82rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT PANELS */}
      <div style={{ minHeight: '380px' }}>
        {/* 1. GENERAL INFO */}
        {activeTab === 'general' && (
          <div>
            <div style={{ fontWeight: '700', fontSize: '1rem', color: '#0f172a', marginBottom: '1rem' }}>
              Course Core Identification
            </div>
            <FormInput
              label="Course Title * (e.g. Ph.D Microbiology, B.Sc Computer Science)"
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormInput
                label="School Acronym (e.g. SCSIT, SOC, R&D)"
                value={formData.schoolAcronym || ''}
                onChange={(e) => setFormData({ ...formData, schoolAcronym: e.target.value })}
              />
              <FormInput
                label="Custom URL Slug (e.g. ph-d-microbiology)"
                value={formData.slug || ''}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              />
            </div>

            <div style={{ border: '1px dashed #cbd5e1', borderRadius: '8px', padding: '1rem', background: '#f8fafc', marginTop: '0.5rem' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.4rem' }}>
                Course Card Thumbnail (Catalog Card Image)
              </div>
              <FileUploader
                label="Select Card Image"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
                previewUrl={
                  formData.file instanceof File
                    ? URL.createObjectURL(formData.file)
                    : (formData.image
                        ? (formData.image.startsWith('http') || formData.image.startsWith('/') ? formData.image : `${BASE_URL}/${formData.image.replace(/^\/+/, '')}`)
                        : null)
                }
              />
            </div>
          </div>
        )}

        {/* 2. ABOUT & HERO */}
        {activeTab === 'overview' && (
          <div>
            <div style={{ fontWeight: '700', fontSize: '1rem', color: '#0f172a', marginBottom: '1rem' }}>
              Programme Overview & Banner Media
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.4rem', color: '#1e293b' }}>
                About Programme Description
              </label>
              <textarea
                rows={5}
                value={formData.about || ''}
                onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                placeholder="Comprehensive description of the department, history, academic framework, and specialized domains..."
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
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div style={{ border: '1px dashed #cbd5e1', borderRadius: '8px', padding: '1rem', background: '#f8fafc' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.4rem' }}>
                  Hero Header Banner Image
                </div>
                <FormInput
                  label="Or enter Image URL"
                  value={formData.heroImage || ''}
                  onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                  placeholder="https://... or /assets/..."
                />
                <FileUploader
                  label="Upload Hero Image"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, heroImageFile: e.target.files[0] })}
                  previewUrl={
                    formData.heroImageFile instanceof File
                      ? URL.createObjectURL(formData.heroImageFile)
                      : (formData.heroImage ? (formData.heroImage.startsWith('http') || formData.heroImage.startsWith('/') ? formData.heroImage : `${BASE_URL}/${formData.heroImage.replace(/^\/+/, '')}`) : null)
                  }
                />
              </div>

              <div style={{ border: '1px dashed #cbd5e1', borderRadius: '8px', padding: '1rem', background: '#f8fafc' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.4rem' }}>
                  About Section Feature Image
                </div>
                <FormInput
                  label="Or enter Image URL"
                  value={formData.aboutImage || ''}
                  onChange={(e) => setFormData({ ...formData, aboutImage: e.target.value })}
                  placeholder="https://... or /assets/..."
                />
                <FileUploader
                  label="Upload About Image"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, aboutImageFile: e.target.files[0] })}
                  previewUrl={
                    formData.aboutImageFile instanceof File
                      ? URL.createObjectURL(formData.aboutImageFile)
                      : (formData.aboutImage ? (formData.aboutImage.startsWith('http') || formData.aboutImage.startsWith('/') ? formData.aboutImage : `${BASE_URL}/${formData.aboutImage.replace(/^\/+/, '')}`) : null)
                  }
                />
              </div>
            </div>
          </div>
        )}

        {/* 3. VISION & MISSION */}
        {activeTab === 'vision' && (
          <div>
            <div style={{ fontWeight: '700', fontSize: '1rem', color: '#0f172a', marginBottom: '1rem' }}>
              Academic Vision & Mission
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.4rem', color: '#1e293b' }}>
                Department Vision
              </label>
              <textarea
                rows={3}
                value={formData.vision || ''}
                onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                placeholder="The overarching aspirational vision of the department / research center..."
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
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.2rem', color: '#1e293b' }}>
                Department Mission Statements (One point per line)
              </label>
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.4rem' }}>
                Type each mission statement on a new line. It will automatically render as bullet items.
              </p>
              <textarea
                rows={6}
                value={missionVal}
                onChange={(e) => setFormData({ ...formData, missionText: e.target.value })}
                placeholder="To cultivate a strong research culture...&#10;To empower students with state-of-the-art knowledge...&#10;To enhance employability, practical skills and entrepreneurial mindset..."
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
              />
            </div>
          </div>
        )}

        {/* 4. OBJECTIVES & ROLES */}
        {activeTab === 'objectives' && (
          <div>
            <div style={{ fontWeight: '700', fontSize: '1rem', color: '#0f172a', marginBottom: '1rem' }}>
              Objectives & Department Roles
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.2rem', color: '#1e293b' }}>
                Programme Educational Objectives (PEOs) (One point per line)
              </label>
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.4rem' }}>
                Type each program objective on a new line.
              </p>
              <textarea
                rows={5}
                value={objectivesVal}
                onChange={(e) => setFormData({ ...formData, objectivesText: e.target.value })}
                placeholder="To impart advanced research methodology and experimental design...&#10;To facilitate doctoral research in specialized domains...&#10;To prepare scholars for high-impact careers..."
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
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.2rem', color: '#1e293b' }}>
                Roles and Responsibilities of the Department (One point per line)
              </label>
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.4rem' }}>
                Type each role or responsibility on a new line.
              </p>
              <textarea
                rows={6}
                value={rolesVal}
                onChange={(e) => setFormData({ ...formData, rolesText: e.target.value })}
                placeholder="Conduct advanced original research adhering to university regulations...&#10;Deliver effective theoretical and practical training...&#10;Maintain well-equipped laboratories and safety protocols..."
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
              />
            </div>
          </div>
        )}

        {/* 5. FACILITIES & LABS */}
        {activeTab === 'facilities' && (
          <div>
            <div style={{ fontWeight: '700', fontSize: '1rem', color: '#0f172a', marginBottom: '1rem' }}>
              Department Facilities & Laboratory Infrastructure
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.2rem', color: '#1e293b' }}>
                Facilities & Laboratory Assets (One item per line)
              </label>
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.4rem' }}>
                List laboratory instruments, smart facilities, libraries, or computer centers on each line.
              </p>
              <textarea
                rows={6}
                value={facilitiesVal}
                onChange={(e) => setFormData({ ...formData, facilitiesText: e.target.value })}
                placeholder="Advanced Research Laboratory with Class II Biosafety Cabinets...&#10;High-Speed Refrigerated Centrifuges & Thermal Cyclers (PCR)...&#10;Phase Contrast Microscopes with Image Analysis...&#10;Dedicated Research Scholar Workstations..."
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
              />
            </div>

            <div style={{ border: '1px dashed #cbd5e1', borderRadius: '8px', padding: '1rem', background: '#f8fafc' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.4rem' }}>
                Facilities Showcase Image
              </div>
              <FormInput
                label="Or enter Image URL"
                value={formData.facilitiesImage || ''}
                onChange={(e) => setFormData({ ...formData, facilitiesImage: e.target.value })}
                placeholder="https://... or /assets/..."
              />
              <FileUploader
                label="Upload Facilities Image"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, facilitiesImageFile: e.target.files[0] })}
                previewUrl={
                  formData.facilitiesImageFile instanceof File
                    ? URL.createObjectURL(formData.facilitiesImageFile)
                    : (formData.facilitiesImage ? (formData.facilitiesImage.startsWith('http') || formData.facilitiesImage.startsWith('/') ? formData.facilitiesImage : `${BASE_URL}/${formData.facilitiesImage.replace(/^\/+/, '')}`) : null)
                }
              />
            </div>
          </div>
        )}

        {/* 6. CAREERS & ELIGIBILITY */}
        {activeTab === 'careers' && (
          <div>
            <div style={{ fontWeight: '700', fontSize: '1rem', color: '#0f172a', marginBottom: '1rem' }}>
              Careers, Highlights & Eligibility Criteria
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.2rem', color: '#1e293b' }}>
                Career & Research Opportunities (One job role per line)
              </label>
              <textarea
                rows={5}
                value={careersVal}
                onChange={(e) => setFormData({ ...formData, careersText: e.target.value })}
                placeholder="University & College Professor / Senior Faculty&#10;Principal Scientist / Research Scientist in Biotech & Pharma&#10;Clinical Microbiologist & Medical Research Officer&#10;Scientific Officer in Research Institutes (ICMR, CSIR)..."
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
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.2rem', color: '#1e293b' }}>
                Key Programme Highlights (One per line)
              </label>
              <textarea
                rows={4}
                value={highlightsVal}
                onChange={(e) => setFormData({ ...formData, highlightsText: e.target.value })}
                placeholder="Affiliated to Bharathiar University...&#10;Guidance by experienced doctorates with extensive research publications...&#10;Regular research colloquiums and national workshops..."
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
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.2rem', color: '#1e293b' }}>
                Eligibility Criteria
              </label>
              <textarea
                rows={3}
                value={formData.eligibility || ''}
                onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                placeholder="Minimum qualifying degree, percentage requirements (55%), CET/NET/SET requirements..."
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
              />
            </div>
          </div>
        )}

        {/* 7. FAQS */}
        {activeTab === 'faqs' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <div style={{ fontWeight: '700', fontSize: '1rem', color: '#0f172a' }}>
                  Frequently Asked Questions (FAQs)
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Add common questions and answers for prospective students and research scholars.
                </div>
              </div>
              <button
                type="button"
                onClick={handleAddFaq}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '6px',
                  border: 'none',
                  background: '#2563eb',
                  color: '#ffffff',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                <Plus size={14} /> Add Question
              </button>
            </div>

            {faqsList.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2.5rem 1rem', background: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1', color: '#64748b', fontSize: '0.88rem' }}>
                No FAQs added yet. Click "+ Add Question" above to add FAQ items.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {faqsList.map((faq, index) => (
                  <div key={index} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.85rem', background: '#ffffff', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1e40af' }}>FAQ #{index + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFaq(index)}
                        style={{ border: 'none', background: 'transparent', color: '#ef4444', cursor: 'pointer', padding: '2px' }}
                        title="Delete Question"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Question: e.g. Is the Ph.D offered both Full-Time and Part-Time?"
                      value={faq.question || ''}
                      onChange={(e) => handleUpdateFaq(index, 'question', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.88rem',
                        marginBottom: '0.5rem',
                        outline: 'none'
                      }}
                    />
                    <textarea
                      rows={2}
                      placeholder="Answer: e.g. Yes, both Full-Time and Part-Time options are available..."
                      value={faq.answer || ''}
                      onChange={(e) => handleUpdateFaq(index, 'answer', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.88rem',
                        outline: 'none',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* LIVE UPLOAD PROGRESS BAR */}
      {isUploading && (
        <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: '#eff6ff', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '600', color: '#1d4ed8', marginBottom: '0.3rem' }}>
            <span>⚡ {uploadStep || 'Uploading Media to Cloudinary...'}</span>
            <span>{uploadProgress}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
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
    </div>
  );
};

const ProgrammesTab = () => {
  const [programs, setPrograms] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStep, setUploadStep] = useState('');
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
    let cardImageUrl = formData.image || '';
    let heroImageUrl = formData.heroImage || '';
    let aboutImageUrl = formData.aboutImage || '';
    let facilitiesImageUrl = formData.facilitiesImage || '';

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // 1. Upload Card Image
      if (formData.file instanceof File) {
        setUploadStep('Uploading Card Image...');
        cardImageUrl = await uploadDirectToCloudinary(
          formData.file,
          'svasc/programs',
          (pct) => setUploadProgress(Math.round(pct * 0.25))
        );
      }

      // 2. Upload Hero Banner Image
      if (formData.heroImageFile instanceof File) {
        setUploadStep('Uploading Hero Image...');
        heroImageUrl = await uploadDirectToCloudinary(
          formData.heroImageFile,
          'svasc/programs/hero',
          (pct) => setUploadProgress(25 + Math.round(pct * 0.25))
        );
      }

      // 3. Upload About Section Image
      if (formData.aboutImageFile instanceof File) {
        setUploadStep('Uploading About Section Image...');
        aboutImageUrl = await uploadDirectToCloudinary(
          formData.aboutImageFile,
          'svasc/programs/about',
          (pct) => setUploadProgress(50 + Math.round(pct * 0.25))
        );
      }

      // 4. Upload Facilities Image
      if (formData.facilitiesImageFile instanceof File) {
        setUploadStep('Uploading Facilities Image...');
        facilitiesImageUrl = await uploadDirectToCloudinary(
          formData.facilitiesImageFile,
          'svasc/programs/facilities',
          (pct) => setUploadProgress(75 + Math.round(pct * 0.25))
        );
      }
    } finally {
      setIsUploading(false);
      setUploadStep('');
    }

    if (!cardImageUrl) {
      cardImageUrl = '/assets/ugpg.jpg';
    }

    const autoSlug = (formData.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const slug = formData.slug ? formData.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : autoSlug;

    // Parse multiline string inputs into clean arrays
    const parseLines = (text, fallbackArray) => {
      if (typeof text === 'string') {
        return text.split('\n').map(s => s.trim()).filter(Boolean);
      }
      return Array.isArray(fallbackArray) ? fallbackArray : [];
    };

    const mission = parseLines(formData.missionText, formData.mission);
    const objectives = parseLines(formData.objectivesText, formData.objectives);
    const rolesAndResponsibilities = parseLines(formData.rolesText, formData.rolesAndResponsibilities);
    const facilities = parseLines(formData.facilitiesText, formData.facilities);
    const keyHighlights = parseLines(formData.highlightsText, formData.keyHighlights);

    const careerLines = parseLines(
      formData.careersText, 
      Array.isArray(formData.careerOpportunities) ? formData.careerOpportunities.map(c => typeof c === 'string' ? c : c.title) : []
    );
    const careerOpportunities = careerLines.map(title => ({ title }));

    const faqs = Array.isArray(formData.faqs)
      ? formData.faqs.filter(f => f && (f.question || f.answer)).map(f => ({ question: (f.question || '').trim(), answer: (f.answer || '').trim() }))
      : [];

    const payload = {
      title: formData.title || '',
      slug,
      programType: formData.programType || 'UG Programmes',
      school: formData.school || 'School of Sciences',
      schoolAcronym: formData.schoolAcronym || '',
      image: cardImageUrl,
      heroImage: heroImageUrl,
      aboutImage: aboutImageUrl,
      about: formData.about || '',
      vision: formData.vision || '',
      mission,
      objectives,
      rolesAndResponsibilities,
      facilities,
      facilitiesImage: facilitiesImageUrl,
      careerOpportunities,
      keyHighlights,
      eligibility: formData.eligibility || '',
      faqs
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
      {/* SUMMARY STATS TILES */}
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
          heroImage: '',
          aboutImage: '',
          about: '',
          vision: '',
          missionText: '',
          objectivesText: '',
          rolesText: '',
          facilitiesText: '',
          facilitiesImage: '',
          careersText: '',
          highlightsText: '',
          eligibility: '',
          faqs: [],
          file: null,
          heroImageFile: null,
          aboutImageFile: null,
          facilitiesImageFile: null
        }}
        renderForm={(formData, setFormData) => (
          <ProgramInnerForm
            formData={formData}
            setFormData={setFormData}
            isUploading={isUploading}
            uploadProgress={uploadProgress}
            uploadStep={uploadStep}
          />
        )}
      />
    </div>
  );
};

export default ProgrammesTab;
