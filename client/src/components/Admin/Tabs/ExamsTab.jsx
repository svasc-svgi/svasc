import React, { useState, useEffect } from 'react';
import HeroForm from '../HeroForm';
import CrudManager from '../CrudManager';
import { FormInput, FileUploader, FormGroup } from '../FormInput';
import { uploadDirectToCloudinary } from '../../../utils/cloudinaryDirectUpload';
import {
  getExamTimeTables,
  createExamTimeTable,
  updateExamTimeTable,
  deleteExamTimeTable,
  getExamPortalConfig,
  updateExamPortalConfig,
} from '../../../services/examService';
import styles from '../CrudManager.module.css';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const ExamsTab = () => {
  const [timetables, setTimetables] = useState([]);
  const [portalConfig, setPortalConfig] = useState({ image1: null, image2: null, image3: null, schedules: [] });
  const [portalSubmitting, setPortalSubmitting] = useState(false);
  const [portalProgress, setPortalProgress] = useState(0);
  const [isUploadingPortal, setIsUploadingPortal] = useState(false);
  const [ttProgress, setTtProgress] = useState(0);
  const [isUploadingTt, setIsUploadingTt] = useState(false);

  const loadData = async () => {
    try {
      const [ttRes, pcRes] = await Promise.allSettled([
        getExamTimeTables(),
        getExamPortalConfig(),
      ]);
      if (ttRes.status === 'fulfilled') {
        const val = ttRes.value;
        setTimetables(val?.data ?? (Array.isArray(val) ? val : []));
      }
      if (pcRes.status === 'fulfilled') {
        const val = pcRes.value?.data ?? pcRes.value;
        if (val) {
          setPortalConfig({
            image1: val.image1 || null,
            image2: val.image2 || null,
            image3: val.image3 || null,
            schedules: val.schedules || []
          });
        }
      }
    } catch (err) {
      console.error('Error loading exam data', err);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleSavePortalImages = async (e) => {
    e.preventDefault();
    setPortalSubmitting(true);
    setIsUploadingPortal(true);
    setPortalProgress(0);
    try {
      let img1 = portalConfig.image1;
      let img2 = portalConfig.image2;
      let img3 = portalConfig.image3;

      if (img1 instanceof File) {
        img1 = await uploadDirectToCloudinary(img1, 'svasc/exam/portal', (pct) => setPortalProgress(Math.round(pct / 3)));
      }
      if (img2 instanceof File) {
        img2 = await uploadDirectToCloudinary(img2, 'svasc/exam/portal', (pct) => setPortalProgress(33 + Math.round(pct / 3)));
      }
      if (img3 instanceof File) {
        img3 = await uploadDirectToCloudinary(img3, 'svasc/exam/portal', (pct) => setPortalProgress(66 + Math.round(pct / 3)));
      }

      await updateExamPortalConfig({
        image1: img1 || '',
        image2: img2 || '',
        image3: img3 || '',
        schedules: portalConfig.schedules
      });

      alert('Portal images updated successfully!');
      loadData();
    } catch (err) {
      alert('Failed to update portal images: ' + (err.message || 'Unknown error'));
    } finally {
      setIsUploadingPortal(false);
      setPortalSubmitting(false);
    }
  };

  const handleSavePortalSchedules = async (e) => {
    e.preventDefault();
    setPortalSubmitting(true);
    try {
      await updateExamPortalConfig({
        image1: typeof portalConfig.image1 === 'string' ? portalConfig.image1 : '',
        image2: typeof portalConfig.image2 === 'string' ? portalConfig.image2 : '',
        image3: typeof portalConfig.image3 === 'string' ? portalConfig.image3 : '',
        schedules: portalConfig.schedules
      });
      alert('Portal schedules updated successfully!');
      loadData();
    } catch (err) {
      alert('Failed to update portal schedules: ' + (err.message || 'Unknown error'));
    } finally {
      setPortalSubmitting(false);
    }
  };

  const addSchedule = () => {
    setPortalConfig(prev => ({
      ...prev,
      schedules: [...prev.schedules, { examType: '', department: '', startDate: '', endDate: '' }]
    }));
  };

  const updateSchedule = (idx, field, val) => {
    setPortalConfig(prev => {
      const updated = [...prev.schedules];
      updated[idx] = { ...updated[idx], [field]: val };
      return { ...prev, schedules: updated };
    });
  };

  const removeSchedule = (idx) => {
    setPortalConfig(prev => ({ ...prev, schedules: prev.schedules.filter((_, i) => i !== idx) }));
  };

  const handleSaveTimetable = async (formData, id) => {
    let fileUrl = formData.file;

    if (formData.file instanceof File) {
      setIsUploadingTt(true);
      setTtProgress(0);
      try {
        fileUrl = await uploadDirectToCloudinary(
          formData.file,
          'svasc/exam/timetables',
          (pct) => setTtProgress(pct)
        );
      } finally {
        setIsUploadingTt(false);
      }
    }

    const payload = {
      title: formData.title || '',
      examType: formData.examType || 'Bharathiyar University',
      file: fileUrl || ''
    };

    if (id) {
      await updateExamTimeTable(id, payload);
    } else {
      await createExamTimeTable(payload);
    }
    loadData();
  };

  const handleDeleteTimetable = async (id) => {
    await deleteExamTimeTable(id);
    loadData();
  };

  return (
    <div>
      <HeroForm pageKey="exam" title="Examination Page Hero Section" />

      {/* Exam Portal Config */}
      <div className={styles.crudWrapper} style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h2 style={{ marginTop: 0, color: '#333', marginBottom: '1.5rem' }}>Exam Portal — 3 Images & Exam Schedules</h2>
        <form onSubmit={handleSavePortalImages} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            {[1, 2, 3].map(n => (
              <FileUploader
                key={n}
                label={`Portal Image ${n}`}
                accept="image/*"
                onChange={(e) => setPortalConfig(prev => ({ ...prev, [`image${n}`]: e.target.files[0] }))}
                previewUrl={typeof portalConfig[`image${n}`] === 'string' ? (portalConfig[`image${n}`].startsWith('http') ? portalConfig[`image${n}`] : `${BASE_URL}/${portalConfig[`image${n}`].replace(/^\/+/, '')}`) : (portalConfig[`image${n}`] ? URL.createObjectURL(portalConfig[`image${n}`]) : null)}
              />
            ))}
          </div>

          {/* LIVE PORTAL IMAGE UPLOAD PROGRESS BAR */}
          {isUploadingPortal && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '600', color: '#2563eb', marginBottom: '0.3rem' }}>
                <span>⚡ Direct Cloudinary Image Uploading...</span>
                <span>{portalProgress}%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                  width: `${portalProgress}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #3b82f6, #10b981)',
                  transition: 'width 0.2s ease'
                }} />
              </div>
            </div>
          )}

          <div>
            <button type="submit" className={styles.submitBtn} disabled={portalSubmitting}>
              {portalSubmitting ? 'Saving Images...' : 'Save Images'}
            </button>
          </div>
        </form>

        <form onSubmit={handleSavePortalSchedules} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, color: '#333' }}>Exam Schedules (Popup Content)</h3>
              <button type="button" className={styles.addButton} onClick={addSchedule}>+ Add Schedule</button>
            </div>
            {portalConfig.schedules.map((sch, idx) => (
              <div key={idx} style={{ border: '1px solid #eaeaea', borderRadius: '4px', padding: '1rem', marginBottom: '1rem', background: '#f8f9fa' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '0.75rem' }}>
                  <FormGroup label="Exam Type (e.g. Sem Exam)">
                    <input style={{ padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', width: '100%', boxSizing: 'border-box' }} value={sch.examType || ''} onChange={(e) => updateSchedule(idx, 'examType', e.target.value)} />
                  </FormGroup>
                  <FormGroup label="Department">
                    <input style={{ padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', width: '100%', boxSizing: 'border-box' }} value={sch.department || ''} onChange={(e) => updateSchedule(idx, 'department', e.target.value)} />
                  </FormGroup>
                  <FormGroup label="Start Date">
                    <input type="date" style={{ padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', width: '100%', boxSizing: 'border-box' }} value={sch.startDate || ''} onChange={(e) => updateSchedule(idx, 'startDate', e.target.value)} />
                  </FormGroup>
                  <FormGroup label="End Date">
                    <input type="date" style={{ padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', width: '100%', boxSizing: 'border-box' }} value={sch.endDate || ''} onChange={(e) => updateSchedule(idx, 'endDate', e.target.value)} />
                  </FormGroup>
                </div>
                <button type="button" onClick={() => removeSchedule(idx)} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '0.25rem 0.75rem', borderRadius: '4px', cursor: 'pointer' }}>Remove</button>
              </div>
            ))}
          </div>

          <div>
            <button type="submit" className={styles.submitBtn} disabled={portalSubmitting}>
              {portalSubmitting ? 'Saving Schedules...' : 'Save Schedules'}
            </button>
          </div>
        </form>
      </div>

      {/* Timetables */}
      <CrudManager
        title="Exam Timetables (PDF Upload)"
        data={timetables}
        columns={[
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'examType', label: 'Type', type: 'text' }
        ]}
        onSave={handleSaveTimetable}
        onDelete={handleDeleteTimetable}
        initialFormState={{ title: '', examType: 'Bharathiyar University', file: null }}
        renderForm={(formData, setFormData) => (
          <>
            <FormInput label="Timetable Title" value={formData.title || ''} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
            <FormGroup label="Exam Type">
              <select value={formData.examType || ''} onChange={(e) => setFormData({...formData, examType: e.target.value})} style={{ padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'inherit' }}>
                <option value="Bharathiyar University">Bharathiyar University</option>
                <option value="Continuous Internal Assessment">Continuous Internal Assessment</option>
              </select>
            </FormGroup>
            <FileUploader
              label="Upload PDF"
              accept=".pdf"
              onChange={(e) => setFormData({...formData, file: e.target.files[0]})}
              previewUrl={typeof formData.file === 'string' ? (formData.file.startsWith('http') ? formData.file : `${BASE_URL}/${formData.file.replace(/^\/+/, '')}`) : null}
            />

            {/* LIVE TIMETABLE UPLOAD PROGRESS BAR */}
            {isUploadingTt && (
              <div style={{ marginTop: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '600', color: '#2563eb', marginBottom: '0.3rem' }}>
                  <span>⚡ Direct Cloudinary File Uploading...</span>
                  <span>{ttProgress}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${ttProgress}%`,
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

export default ExamsTab;
