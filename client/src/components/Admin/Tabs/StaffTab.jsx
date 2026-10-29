import React, { useState, useEffect, useMemo } from 'react';
import styles from './StaffTab.module.css';
import { Search, Plus, RefreshCw, Upload, Trash2, Edit3, X, CheckCircle, Info } from 'lucide-react';
import { getAllStaff, createStaff, updateStaff, deleteStaff, syncDefaultStaff } from '../../../services/staffService';
import { uploadDirectToCloudinary } from '../../../utils/cloudinaryDirectUpload';
import { parseStaffName, getStaffInitials, getStaffKey } from '../../../utils/staffParser';
import { useStaffPhotos } from '../../../hooks/useStaffPhotos';
import { programDetailsData } from '../../../data/programDetailsData';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const DEPARTMENT_OPTIONS = [
  { value: 'All', label: 'All Departments / Courses' },
  { value: 'B.Sc. Computer Science', label: 'B.Sc. Computer Science' },
  { value: 'B.Sc. Computer Science (AI & DS)', label: 'B.Sc. Computer Science (AI & DS)' },
  { value: 'B.Com (Banking & Insurance)', label: 'B.Com (Banking & Insurance)' },
  { value: 'B.Com (Information Technology)', label: 'B.Com (Information Technology)' },
  { value: 'B.Com (Computer Applications)', label: 'B.Com (Computer Applications)' },
  { value: 'B.Com (Professional Accounting)', label: 'B.Com (Professional Accounting)' },
  { value: 'BBA - Management Studies', label: 'BBA - Management Studies' },
  { value: 'B.Sc. Microbiology', label: 'B.Sc. Microbiology' },
  { value: 'B.A. Tamil', label: 'B.A. Tamil' },
  { value: 'B.A. English', label: 'B.A. English' },
  { value: 'B.Sc. Costume Design & Fashion', label: 'B.Sc. Costume Design & Fashion' },
  { value: 'M.Sc. Computer Science', label: 'M.Sc. Computer Science' },
  { value: 'M.Sc. Microbiology', label: 'M.Sc. Microbiology' },
  { value: 'Physical Education', label: 'Physical Education' },
  { value: 'Library', label: 'Library' },
  { value: 'Alumni Committee', label: 'Alumni Committee' },
];

const StaffTab = () => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    initial: '',
    qualification: '',
    designation: 'Assistant Professor',
    department: 'B.Sc. Computer Science',
    photo: '',
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');

  const { reloadStaffPhotos } = useStaffPhotos();

  const loadStaffData = async () => {
    setLoading(true);
    try {
      const data = await getAllStaff();
      if (Array.isArray(data) && data.length > 0) {
        setStaffList(data);
      } else {
        // If DB has no staff yet, auto-populate from existing website data!
        await handleSyncAllFaculty(false);
      }
    } catch (err) {
      console.error('Failed to load staff list:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStaffData();
  }, []);

  // Collect all default faculty from programDetailsData, Library, etc.
  const handleSyncAllFaculty = async (showNotification = true) => {
    setIsSyncing(true);
    try {
      const allFaculty = [];

      // 1. Programs faculty
      const progDeptMap = {
        'bsc-computer-science': 'B.Sc. Computer Science',
        'bsccomputer-ai-ds': 'B.Sc. Computer Science (AI & DS)',
        'b-combi-bachelor-of-commerce-with-banking-insurance': 'B.Com (Banking & Insurance)',
        'bcom-it-bachelor-of-information-technology': 'B.Com (Information Technology)',
        'bcomca-computer-applications': 'B.Com (Computer Applications)',
        'bcom-pa-professional-accounting': 'B.Com (Professional Accounting)',
        'management': 'BBA - Management Studies',
        'bsc-microbiology': 'B.Sc. Microbiology',
        'ba-tamil': 'B.A. Tamil',
        'ba-english': 'B.A. English',
        'bsc-costume-design-fashion': 'B.Sc. Costume Design & Fashion',
        'msc-computer-science': 'M.Sc. Computer Science',
        'msc-microbiology': 'M.Sc. Microbiology',
        'department-of-physical-education': 'Physical Education'
      };

      for (const [key, prog] of Object.entries(programDetailsData)) {
        const deptLabel = progDeptMap[key] || prog.title || key;
        if (Array.isArray(prog.staffDetails)) {
          prog.staffDetails.forEach((staff, idx) => {
            allFaculty.push({
              fullName: staff.name,
              qualification: staff.qualification || '',
              designation: 'Faculty',
              department: deptLabel,
              departments: [deptLabel],
              sNo: staff.sNo || idx + 1
            });
          });
        }
      }

      // 2. Library Staff
      allFaculty.push({
        fullName: 'Dr. P. Krishnakumari',
        qualification: 'MLIS., M.Phil., Ph.D.',
        designation: 'Librarian & Head',
        department: 'Library',
        departments: ['Library'],
        photo: '/library_images/image45.jpeg',
        sNo: 1
      });
      allFaculty.push({
        fullName: 'Karthi P',
        qualification: 'B.Com., BLIS.',
        designation: 'Library Assistant',
        department: 'Library',
        departments: ['Library'],
        photo: '/library_images/image46.png',
        sNo: 2
      });

      // 3. Alumni Committee staff
      allFaculty.push({
        fullName: 'Mrs. T. Ayeeshasumaiya',
        qualification: 'Assistant Professor & Head',
        designation: 'Coordinator',
        department: 'B.Sc. Costume Design & Fashion',
        departments: ['B.Sc. Costume Design & Fashion', 'Alumni Committee'],
        sNo: 1
      });
      allFaculty.push({
        fullName: 'Mr. P. Raman',
        qualification: 'Assistant Professor',
        designation: 'Member',
        department: 'B.A. Tamil',
        departments: ['B.A. Tamil', 'Alumni Committee'],
        sNo: 2
      });
      allFaculty.push({
        fullName: 'Mrs. P. S. Kavitha',
        qualification: 'Assistant Professor',
        designation: 'Member',
        department: 'BBA - Management Studies',
        departments: ['BBA - Management Studies', 'Alumni Committee'],
        sNo: 3
      });
      allFaculty.push({
        fullName: 'Mr. M. Sanjai',
        qualification: 'Assistant Professor',
        designation: 'Member',
        department: 'B.A. English',
        departments: ['B.A. English', 'Alumni Committee'],
        sNo: 4
      });

      await syncDefaultStaff(allFaculty);
      const updated = await getAllStaff();
      setStaffList(updated);
      if (showNotification) {
        setStatusMessage('Successfully synced faculty database from site definitions.');
        setTimeout(() => setStatusMessage(''), 4000);
      }
    } catch (err) {
      console.error('Error syncing staff:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleOpenModal = (staff = null) => {
    if (staff) {
      setEditingStaff(staff);
      const parsed = parseStaffName(staff.fullName || '');
      setFormData({
        fullName: staff.fullName || '',
        initial: staff.initial || parsed.initial || '',
        qualification: staff.qualification || '',
        designation: staff.designation || 'Assistant Professor',
        department: staff.department || 'B.Sc. Computer Science',
        photo: staff.photo || ''
      });
      setFilePreview(staff.photo || '');
    } else {
      setEditingStaff(null);
      setFormData({
        fullName: '',
        initial: '',
        qualification: '',
        designation: 'Assistant Professor',
        department: selectedDept !== 'All' ? selectedDept : 'B.Sc. Computer Science',
        photo: ''
      });
      setFilePreview('');
    }
    setSelectedFile(null);
    setUploadProgress(0);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStaff(null);
    setSelectedFile(null);
    setFilePreview('');
    setUploadProgress(0);
  };

  const handleFullNameChange = (e) => {
    const val = e.target.value;
    const parsed = parseStaffName(val);
    setFormData((prev) => ({
      ...prev,
      fullName: val,
      // If user hasn't typed a custom initial yet, auto-extract it
      initial: prev.initial && prev.initial !== parsed.initial ? prev.initial : (parsed.initial || '')
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      alert('Please enter faculty full name.');
      return;
    }

    let finalPhotoUrl = formData.photo || '';

    // Direct Cloudinary Upload if new file selected
    if (selectedFile) {
      setIsUploading(true);
      setUploadProgress(0);
      try {
        finalPhotoUrl = await uploadDirectToCloudinary(
          selectedFile,
          'svasc/staff',
          (pct) => setUploadProgress(pct)
        );
      } catch (uploadErr) {
        alert(`Cloudinary Upload Failed: ${uploadErr.message}`);
        setIsUploading(false);
        return;
      } finally {
        setIsUploading(false);
      }
    }

    const payload = {
      fullName: formData.fullName.trim(),
      initial: (formData.initial || '').trim().toUpperCase(),
      qualification: (formData.qualification || '').trim(),
      designation: (formData.designation || '').trim(),
      department: formData.department,
      photo: finalPhotoUrl
    };

    try {
      if (editingStaff) {
        await updateStaff(editingStaff._id || editingStaff.id, payload);
      } else {
        await createStaff(payload);
      }

      await reloadStaffPhotos();
      const refreshed = await getAllStaff();
      setStaffList(refreshed);
      handleCloseModal();
      setStatusMessage('Staff photo saved and synced across all departments successfully!');
      setTimeout(() => setStatusMessage(''), 4000);
    } catch (err) {
      alert(`Save Failed: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      try {
        await deleteStaff(id);
        const refreshed = await getAllStaff();
        setStaffList(refreshed);
        await reloadStaffPhotos();
      } catch (err) {
        alert(`Delete failed: ${err.message}`);
      }
    }
  };

  // Filtered List
  const filteredStaff = useMemo(() => {
    return staffList.filter((staff) => {
      const matchesDept =
        selectedDept === 'All' ||
        staff.department === selectedDept ||
        (Array.isArray(staff.departments) && staff.departments.includes(selectedDept));

      if (!matchesDept) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const fn = (staff.fullName || '').toLowerCase();
      const init = (staff.initial || '').toLowerCase();
      const qual = (staff.qualification || '').toLowerCase();
      const dept = (staff.department || '').toLowerCase();

      return fn.includes(q) || init === q || qual.includes(q) || dept.includes(q);
    });
  }, [staffList, selectedDept, searchQuery]);

  return (
    <div className={styles.tabContainer}>
      {/* Top Header */}
      <div className={styles.topHeader}>
        <div className={styles.headerInfo}>
          <h2>Faculty & Staff Directory</h2>
          <p>
            Upload staff photos here. When a photo is uploaded for a staff member, it automatically reflects in every course and department they belong to.
          </p>
        </div>
        <div className={styles.headerActions}>
          <button
            className={styles.secondaryBtn}
            onClick={() => handleSyncAllFaculty(true)}
            disabled={isSyncing}
            title="Populate/refresh default faculty from website definitions"
          >
            <RefreshCw size={16} className={isSyncing ? 'animate-spin' : ''} />
            {isSyncing ? 'Syncing...' : 'Sync Site Faculty'}
          </button>
          <button className={styles.primaryBtn} onClick={() => handleOpenModal()}>
            <Plus size={18} />
            Add New Faculty
          </button>
        </div>
      </div>

      {/* Status banner */}
      {statusMessage && (
        <div className={styles.syncNotice}>
          <CheckCircle size={20} color="#16a34a" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Filter Bar */}
      <div className={styles.filterBar}>
        <div className={styles.searchInputWrap}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by faculty name, initial (e.g., B or M), qualification..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className={styles.deptSelect}
        >
          {DEPARTMENT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Staff Table */}
      <div className={styles.tableContainer}>
        <table className={styles.staffTable}>
          <thead>
            <tr>
              <th style={{ width: '80px', textAlign: 'center' }}>Photo</th>
              <th style={{ width: '70px', textAlign: 'center' }}>Initial</th>
              <th>Faculty Name & Title</th>
              <th>Qualification</th>
              <th>Department / Courses</th>
              <th style={{ width: '130px', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                  Loading faculty list...
                </td>
              </tr>
            ) : filteredStaff.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                  No faculty found matching the selected criteria. Click "Add New Faculty" or "Sync Site Faculty" to populate.
                </td>
              </tr>
            ) : (
              filteredStaff.map((staff, idx) => {
                const photoUrl = staff.photo;
                const initials = staff.initial || getStaffInitials(staff.fullName);

                return (
                  <tr key={staff._id || staff.id || idx}>
                    {/* Round Avatar Preview */}
                    <td style={{ textAlign: 'center' }}>
                      <div className={styles.avatarWrap}>
                        {photoUrl ? (
                          <img
                            src={photoUrl}
                            alt={staff.fullName}
                            className={styles.roundAvatar}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const fallback = e.currentTarget.parentElement?.querySelector(`.${styles.initialAvatar}`);
                              if (fallback) fallback.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div
                          className={styles.initialAvatar}
                          style={{ display: photoUrl ? 'none' : 'flex' }}
                        >
                          {initials}
                        </div>
                      </div>
                    </td>

                    {/* Initial Badge */}
                    <td style={{ textAlign: 'center' }}>
                      <span className={styles.initialBadge}>{staff.initial || '-'}</span>
                    </td>

                    {/* Name */}
                    <td>
                      <span className={styles.nameHighlight}>{staff.fullName}</span>
                      {staff.designation && staff.designation !== 'Faculty' && (
                        <div style={{ fontSize: '1.2rem', color: '#64748b' }}>
                          {staff.designation}
                        </div>
                      )}
                    </td>

                    {/* Qualification */}
                    <td style={{ color: '#475569' }}>{staff.qualification || '-'}</td>

                    {/* Departments */}
                    <td>
                      {Array.isArray(staff.departments) && staff.departments.length > 0 ? (
                        staff.departments.map((d, dIdx) => (
                          <span key={dIdx} className={styles.deptBadge}>
                            {d}
                          </span>
                        ))
                      ) : (
                        <span className={styles.deptBadge}>{staff.department || 'General'}</span>
                      )}
                    </td>

                    {/* Action buttons */}
                    <td>
                      <div className={styles.actionBtns}>
                        <button
                          className={styles.editBtn}
                          onClick={() => handleOpenModal(staff)}
                          title="Upload/change photo or edit details"
                        >
                          <Edit3 size={15} />
                          Photo
                        </button>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => handleDelete(staff._id || staff.id)}
                          title="Delete staff"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Edit / Add Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{editingStaff ? 'Edit Faculty & Staff Photo' : 'Add New Faculty & Staff'}</h3>
              <button className={styles.closeModalBtn} onClick={handleCloseModal}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave}>
              {/* Notice Banner */}
              <div className={styles.syncNotice}>
                <Info size={20} color="#2563eb" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  <strong>Multi-Department Smart Sync:</strong> When you upload a photo for this faculty member, it will automatically sync and display across all departments and courses with matching name & initial.
                </span>
              </div>

              {/* Photo Preview & Upload */}
              <div className={styles.photoPreviewSection}>
                <div style={{ position: 'relative' }}>
                  {filePreview ? (
                    <img
                      src={filePreview}
                      alt="Preview"
                      className={styles.previewAvatarRound}
                    />
                  ) : (
                    <div
                      className={styles.previewAvatarRound}
                      style={{
                        background: 'linear-gradient(135deg, #021f4b 0%, #1e3a8a 100%)',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        fontWeight: '700'
                      }}
                    >
                      {formData.initial || getStaffInitials(formData.fullName) || 'ST'}
                    </div>
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <label className={styles.formLabel}>Staff Photo (Round Shape)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ fontSize: '1.25rem', color: '#475569' }}
                  />
                  <div className={styles.helperText}>
                    Select image to directly upload to Cloudinary. Circular avatar formatting is applied automatically with centered face alignment.
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              {isUploading && (
                <div className={styles.progressBarContainer}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: '600', color: '#2563eb', marginBottom: '0.4rem' }}>
                    <span>⚡ Uploading directly to Cloudinary...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className={styles.progressBar}>
                    <div className={styles.progressBarFill} style={{ width: `${uploadProgress}%` }} />
                  </div>
                </div>
              )}

              {/* Full Name Input */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Full Name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={handleFullNameChange}
                  placeholder="e.g. Ms. B. Kanchanadevi or Kanjana Devi"
                  className={styles.formInput}
                  required
                />
              </div>

              {/* Initial Input */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Initial (for Name Differentiation)</label>
                <input
                  type="text"
                  value={formData.initial}
                  onChange={(e) => setFormData({ ...formData, initial: e.target.value.toUpperCase() })}
                  placeholder="e.g. B or M or KR"
                  className={styles.formInput}
                  style={{ width: '120px' }}
                />
                <div className={styles.helperText}>
                  Crucial for differentiating between faculty who share the same name (e.g. Kanjana Devi with initial "M" vs "B").
                </div>
              </div>

              {/* Qualification */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Qualification</label>
                <input
                  type="text"
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  placeholder="e.g. M.Sc., M.Phil., (Ph.D)"
                  className={styles.formInput}
                />
              </div>

              {/* Designation */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Designation / Role</label>
                <input
                  type="text"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  placeholder="e.g. Assistant Professor & Head"
                  className={styles.formInput}
                />
              </div>

              {/* Department */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Department / Main Course</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className={styles.formInput}
                >
                  {DEPARTMENT_OPTIONS.filter((o) => o.value !== 'All').map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Modal Buttons */}
              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className={styles.secondaryBtn}
                  onClick={handleCloseModal}
                  disabled={isUploading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.primaryBtn}
                  disabled={isUploading}
                >
                  {isUploading ? 'Uploading & Saving...' : 'Save & Sync Photo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffTab;
