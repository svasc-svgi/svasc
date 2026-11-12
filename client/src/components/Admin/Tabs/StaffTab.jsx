import React, { useState, useEffect, useMemo } from 'react';
import styles from './StaffTab.module.css';
import { Search, Plus, RefreshCw, Upload, Trash2, Edit3, X, CheckCircle, Info, Copy, FolderPlus, Layers } from 'lucide-react';
import {
  getAllStaff,
  createStaff,
  updateStaff,
  deleteStaff,
  cloneStaff,
  syncDefaultStaff,
  getDepartments,
  createDepartment,
  deleteDepartment
} from '../../../services/staffService';
import { uploadDirectToCloudinary } from '../../../utils/cloudinaryDirectUpload';
import { parseStaffName, getStaffInitials } from '../../../utils/staffParser';
import { useStaffPhotos } from '../../../hooks/useStaffPhotos';
import { programDetailsData } from '../../../data/programDetailsData';

const DEFAULT_FALLBACK_DEPARTMENTS = [
  'B.Sc. Computer Science',
  'B.Sc. Computer Science (AI & DS)',
  'Bachelor of Computer Applications (BCA)',
  'B.Sc. Information Technology',
  'B.Sc. Cyber Security',
  'B.Com – Bachelor of Commerce',
  'B.Com (Banking & Insurance)',
  'B.Com (Information Technology)',
  'B.Com (Computer Applications)',
  'B.Com (Professional Accounting)',
  'BBA - Management Studies',
  'B.Sc. Chemistry',
  'B.Sc. Mathematics',
  'B.Sc. Microbiology',
  'B.A. English',
  'B.Sc. Costume Design & Fashion',
  'M.Sc. Computer Science',
  'Master of Commerce (M.Com)',
  'M.Sc. Microbiology',
  'M.A. English',
  'Ph.D. Commerce',
  'Ph.D. English',
  'Ph.D. Tamil',
  'Department of Physical Education',
  'Library',
  'Alumni Committee',
  'Administrative Staff'
];

const StaffTab = () => {
  const [staffList, setStaffList] = useState([]);
  const [departmentList, setDepartmentList] = useState(
    DEFAULT_FALLBACK_DEPARTMENTS.map(d => ({ name: d, value: d, label: d, isCustom: false }))
  );
  const [loading, setLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
  const [isCloneModalOpen, setIsCloneModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Active items for editing / cloning
  const [editingStaff, setEditingStaff] = useState(null);
  const [cloningStaff, setCloningStaff] = useState(null);
  const [selectedCloneDepts, setSelectedCloneDepts] = useState([]);
  const [isCloning, setIsCloning] = useState(false);

  // New Department Form
  const [newDeptInput, setNewDeptInput] = useState('');
  const [deptActionLoading, setDeptActionLoading] = useState(false);

  // Form State for Add / Edit
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

  // Load Departments list from backend
  const loadDepartments = async () => {
    try {
      const depts = await getDepartments();
      if (Array.isArray(depts) && depts.length > 0) {
        setDepartmentList(depts);
      }
    } catch (err) {
      console.warn('Could not fetch departments list, using defaults:', err.message);
    }
  };

  // Load Staff list from backend
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
    loadDepartments();
    loadStaffData();
  }, []);

  // Collect all default faculty from programDetailsData, Library, Alumni, and auto-clone to AI & DS and M.Sc. CS
  const handleSyncAllFaculty = async (showNotification = true) => {
    setIsSyncing(true);
    try {
      const allFaculty = [];

      const progDeptMap = {
        'bsc-computer-science': 'B.Sc. Computer Science',
        'bsccomputer-ai-ds': 'B.Sc. Computer Science (AI & DS)',
        'bachelor-of-computer-applications-bca': 'Bachelor of Computer Applications (BCA)',
        'bscinformation-technology': 'B.Sc. Information Technology',
        'bsccyber-security': 'B.Sc. Cyber Security',
        'b-com-bachelor-of-commerce': 'B. Com – Bachelor of Commerce',
        'b-combi-bachelor-of-commerce-with-banking-insurance': 'B.Com (Banking & Insurance)',
        'bcom-it-bachelor-of-information-technology': 'B.Com (Information Technology)',
        'bcomca-computer-applications': 'B.Com (Computer Applications)',
        'bcom-pa-professional-accounting': 'B.Com (Professional Accounting)',
        'management': 'BBA - Management Studies',
        'bsc-chemistry': 'B.Sc. Chemistry',
        'bsc-mathematics': 'B.Sc. Mathematics',
        'bsc-microbiology': 'B.Sc. Microbiology',
        'ba-english': 'B.A. English',
        'bsc-costume-design-fashion': 'B.Sc. Costume Design & Fashion',
        'msc-computer-science': 'M.Sc. Computer Science',
        'mcom': 'Master of Commerce (M.Com)',
        'msc-microbiology': 'M.Sc. Microbiology',
        'phd-commerce': 'Ph.D. Commerce',
        'phd-english': 'Ph.D. English',
        'phd-tamil': 'Ph.D. Tamil',
        'ma-english': 'M.A. English',
        'department-of-physical-education': 'Department of Physical Education',
        'physical-education': 'Department of Physical Education'
      };

      const csFacultyList = [];

      for (const [key, prog] of Object.entries(programDetailsData)) {
        const deptLabel = progDeptMap[key] || prog.title || key;
        if (Array.isArray(prog.staffDetails)) {
          prog.staffDetails.forEach((staff, idx) => {
            const facultyObj = {
              fullName: staff.name,
              qualification: staff.qualification || '',
              designation: staff.designation || 'Faculty',
              department: deptLabel,
              departments: [deptLabel],
              photo: staff.photo || staff.image || '',
              sNo: staff.sNo || idx + 1
            };
            allFaculty.push(facultyObj);

            if (deptLabel === 'B.Sc. Computer Science') {
              csFacultyList.push(facultyObj);
            }
          });
        }
      }

      // Requirement 4: B.Sc. staff details automatically available in B.Sc. AI & DS and M.Sc. CS
      if (csFacultyList.length > 0) {
        const aiDsTargets = ['B.Sc. Computer Science (AI & DS)', 'M.Sc. Computer Science'];
        aiDsTargets.forEach((targetDept) => {
          csFacultyList.forEach((csStaff, idx) => {
            allFaculty.push({
              ...csStaff,
              department: targetDept,
              departments: [targetDept],
              sNo: idx + 1
            });
          });
        });
      }

      // Library Staff
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

      // Alumni Committee staff
      allFaculty.push({
        fullName: 'Mrs. T. Ayeeshasumaiya',
        qualification: 'Assistant Professor & Head',
        designation: 'Coordinator',
        department: 'B.Sc. Costume Design & Fashion',
        departments: ['B.Sc. Costume Design & Fashion', 'Alumni Committee'],
        sNo: 1
      });
      allFaculty.push({
        fullName: 'Mrs. P. S. Kavitha',
        qualification: 'Assistant Professor',
        designation: 'Member',
        department: 'BBA - Management Studies',
        departments: ['BBA - Management Studies', 'Alumni Committee'],
        sNo: 2
      });
      allFaculty.push({
        fullName: 'Mr. M. Sanjai',
        qualification: 'Assistant Professor',
        designation: 'Member',
        department: 'B.A. English',
        departments: ['B.A. English', 'Alumni Committee'],
        sNo: 3
      });

      await syncDefaultStaff(allFaculty);
      const updated = await getAllStaff();
      setStaffList(updated);
      await loadDepartments();
      await reloadStaffPhotos();

      if (showNotification) {
        setStatusMessage('Successfully synced faculty database from site definitions with all course mappings.');
        setTimeout(() => setStatusMessage(''), 4000);
      }
    } catch (err) {
      console.error('Error syncing staff:', err);
      alert('Error syncing faculty: ' + err.message);
    } finally {
      setIsSyncing(false);
    }
  };

  // Open Add / Edit Modal
  const handleOpenModal = (staff = null) => {
    if (staff) {
      setEditingStaff(staff);
      const parsed = parseStaffName(staff.fullName || '');
      setFormData({
        fullName: staff.fullName || '',
        initial: staff.initial || parsed.initial || '',
        qualification: staff.qualification || '',
        designation: staff.designation || 'Assistant Professor',
        department: staff.department || (departmentList[0]?.value || 'B.Sc. Computer Science'),
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
        department: selectedDept !== 'All' ? selectedDept : (departmentList[0]?.value || 'B.Sc. Computer Science'),
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

  // Save Add / Edit Faculty
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
      setStatusMessage(
        editingStaff
          ? 'Staff details updated and photo synced across all courses successfully!'
          : 'New faculty added at bottom of list successfully!'
      );
      setTimeout(() => setStatusMessage(''), 4000);
    } catch (err) {
      alert(`Save Failed: ${err.message}`);
    }
  };

  // Delete Staff
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

  // Department / Course Management
  const handleAddDepartment = async (e) => {
    e.preventDefault();
    const trimmed = newDeptInput.trim();
    if (!trimmed) {
      alert('Please enter a course or department name.');
      return;
    }

    setDeptActionLoading(true);
    try {
      await createDepartment(trimmed);
      setNewDeptInput('');
      await loadDepartments();
      setStatusMessage(`Course/Department "${trimmed}" added successfully!`);
      setTimeout(() => setStatusMessage(''), 4000);
    } catch (err) {
      alert('Failed to add department: ' + err.message);
    } finally {
      setDeptActionLoading(false);
    }
  };

  const handleDeleteDepartment = async (deptName) => {
    if (window.confirm(`Are you sure you want to remove the custom course/department "${deptName}"?`)) {
      setDeptActionLoading(true);
      try {
        await deleteDepartment(deptName);
        await loadDepartments();
        if (selectedDept === deptName) setSelectedDept('All');
        setStatusMessage(`Course/Department "${deptName}" removed.`);
        setTimeout(() => setStatusMessage(''), 4000);
      } catch (err) {
        alert('Failed to delete department: ' + err.message);
      } finally {
        setDeptActionLoading(false);
      }
    }
  };

  // Faculty Cloning Feature
  const handleOpenCloneModal = (staff) => {
    setCloningStaff(staff);
    setSelectedCloneDepts([]);
    setIsCloneModalOpen(true);
  };

  const handleCloseCloneModal = () => {
    setIsCloneModalOpen(false);
    setCloningStaff(null);
    setSelectedCloneDepts([]);
  };

  const handleToggleCloneDept = (deptName) => {
    setSelectedCloneDepts((prev) =>
      prev.includes(deptName) ? prev.filter((d) => d !== deptName) : [...prev, deptName]
    );
  };

  const handleExecuteClone = async () => {
    if (!cloningStaff) return;
    if (selectedCloneDepts.length === 0) {
      alert('Please select at least one target course or department to clone this faculty member into.');
      return;
    }

    setIsCloning(true);
    try {
      await cloneStaff(cloningStaff._id || cloningStaff.id, {
        targetDepartments: selectedCloneDepts
      });
      const refreshed = await getAllStaff();
      setStaffList(refreshed);
      await reloadStaffPhotos();
      handleCloseCloneModal();
      setStatusMessage(`Faculty cloned to ${selectedCloneDepts.join(', ')} successfully!`);
      setTimeout(() => setStatusMessage(''), 4500);
    } catch (err) {
      alert(`Clone failed: ${err.message}`);
    } finally {
      setIsCloning(false);
    }
  };

  // Filtered and Sorted Staff List
  // Newly added faculty will appear at the bottom because backend assigns next sNo
  // and we sort by sNo ascending, then createdAt ascending.
  const filteredStaff = useMemo(() => {
    const list = staffList.filter((staff) => {
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

    return [...list].sort((a, b) => {
      const sNoA = typeof a.sNo === 'number' && a.sNo > 0 ? a.sNo : 99999;
      const sNoB = typeof b.sNo === 'number' && b.sNo > 0 ? b.sNo : 99999;
      if (sNoA !== sNoB) return sNoA - sNoB;
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateA - dateB;
    });
  }, [staffList, selectedDept, searchQuery]);

  return (
    <div className={styles.tabContainer}>
      {/* Top Header */}
      <div className={styles.topHeader}>
        <div className={styles.headerInfo}>
          <h2>Faculty & Staff Directory</h2>
          <p>
            Manage faculty, departments, courses, and photos. Newly added faculty automatically appear at the bottom of the list.
          </p>
        </div>
        <div className={styles.headerActions}>
          <button
            className={styles.deptManageBtn}
            onClick={() => setIsDeptModalOpen(true)}
            title="Add or manage courses and departments"
          >
            <FolderPlus size={16} />
            + Add Course / Dept
          </button>
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
          <option value="All">All Departments / Courses ({staffList.length})</option>
          {departmentList.map((opt) => (
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
              <th style={{ width: '60px', textAlign: 'center' }}>S.No</th>
              <th style={{ width: '80px', textAlign: 'center' }}>Photo</th>
              <th style={{ width: '70px', textAlign: 'center' }}>Initial</th>
              <th>Faculty Name & Title</th>
              <th>Qualification</th>
              <th>Department / Courses</th>
              <th style={{ width: '190px', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                  Loading faculty list...
                </td>
              </tr>
            ) : filteredStaff.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                  No faculty found matching the selected criteria. Click "Add New Faculty" or "Sync Site Faculty" to populate.
                </td>
              </tr>
            ) : (
              filteredStaff.map((staff, idx) => {
                const photoUrl = staff.photo;
                const initials = staff.initial || getStaffInitials(staff.fullName);

                return (
                  <tr key={staff._id || staff.id || idx}>
                    {/* S.No */}
                    <td style={{ textAlign: 'center', fontWeight: '600', color: '#64748b' }}>
                      {staff.sNo || idx + 1}
                    </td>

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
                          Edit
                        </button>
                        <button
                          className={styles.cloneBtn}
                          onClick={() => handleOpenCloneModal(staff)}
                          title="Clone faculty to another course"
                        >
                          <Copy size={15} />
                          Clone
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

      {/* Edit / Add Faculty Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{editingStaff ? 'Edit Faculty Details & Photo' : 'Add New Faculty & Staff'}</h3>
              <button className={styles.closeModalBtn} onClick={handleCloseModal}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className={styles.syncNotice}>
                <Info size={20} color="#2563eb" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  <strong>Dynamic Realtime Updates:</strong> Any change to name, qualification, designation, or photo will immediately reflect on the frontend course page! New faculty are automatically placed at the bottom.
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
                  Differentiates faculty who share similar names.
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
                  {departmentList.map((opt) => (
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
                  {isUploading ? 'Uploading & Saving...' : 'Save Faculty'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Course / Department Management Modal */}
      {isDeptModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsDeptModalOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Manage Departments & Courses</h3>
              <button className={styles.closeModalBtn} onClick={() => setIsDeptModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddDepartment}>
              <div className={styles.syncNotice}>
                <Info size={20} color="#2563eb" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  Add any new course or department (e.g. <em>B.Sc. Data Science</em>, <em>M.Com</em>, <em>B.Sc. Cyber Security</em>). It will immediately appear in all course dropdowns and filters.
                </span>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>New Department / Course Name *</label>
                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <input
                    type="text"
                    value={newDeptInput}
                    onChange={(e) => setNewDeptInput(e.target.value)}
                    placeholder="e.g. B.Sc. Artificial Intelligence & Machine Learning"
                    className={styles.formInput}
                    style={{ flex: 1 }}
                    required
                  />
                  <button
                    type="submit"
                    className={styles.primaryBtn}
                    disabled={deptActionLoading}
                  >
                    <Plus size={16} />
                    Add Course
                  </button>
                </div>
              </div>

              <label className={styles.formLabel} style={{ marginTop: '1.5rem' }}>
                Existing Departments & Courses ({departmentList.length})
              </label>
              <div className={styles.deptTagsContainer}>
                {departmentList.map((d) => (
                  <div
                    key={d.value}
                    className={`${styles.deptTag} ${d.isCustom ? styles.deptTagCustom : ''}`}
                  >
                    <span>{d.name}</span>
                    {d.isCustom && (
                      <span
                        className={styles.deleteDeptIcon}
                        onClick={() => handleDeleteDepartment(d.name)}
                        title="Delete custom department"
                      >
                        <Trash2 size={13} />
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className={styles.primaryBtn}
                  onClick={() => setIsDeptModalOpen(false)}
                >
                  Done
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Clone Faculty to Course Modal */}
      {isCloneModalOpen && cloningStaff && (
        <div className={styles.modalOverlay} onClick={handleCloseCloneModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
            <div className={styles.modalHeader}>
              <h3>Clone Faculty to Course(s)</h3>
              <button className={styles.closeModalBtn} onClick={handleCloseCloneModal}>
                <X size={20} />
              </button>
            </div>

            <div>
              <div className={styles.syncNotice}>
                <Layers size={22} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  Cloning <strong>{cloningStaff.fullName}</strong> ({cloningStaff.qualification}) from <strong>{cloningStaff.department}</strong>.
                  The cloned faculty will appear at the bottom of the target course list with their photo and qualification intact.
                </span>
              </div>

              {/* Quick Select common cross-department destinations */}
              <label className={styles.formLabel}>Quick Selection for Computer Science & Tech:</label>
              <div className={styles.quickPillsWrap}>
                {['B.Sc. Computer Science (AI & DS)', 'M.Sc. Computer Science', 'Bachelor of Computer Applications (BCA)', 'B.Sc. Information Technology', 'B.Sc. Cyber Security']
                  .filter((dept) => dept !== cloningStaff.department)
                  .map((dept) => {
                    const isSelected = selectedCloneDepts.includes(dept);
                    return (
                      <button
                        key={dept}
                        type="button"
                        className={styles.quickPill}
                        style={{
                          background: isSelected ? '#dcfce7' : '#f1f5f9',
                          borderColor: isSelected ? '#86efac' : '#cbd5e1',
                          color: isSelected ? '#166534' : '#334155',
                          fontWeight: isSelected ? '600' : '500'
                        }}
                        onClick={() => handleToggleCloneDept(dept)}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {dept}
                      </button>
                    );
                  })}
              </div>

              {/* All courses checklist */}
              <label className={styles.formLabel} style={{ marginTop: '1rem' }}>
                Select Target Course(s) / Department(s):
              </label>
              <div className={styles.checklistGrid}>
                {departmentList
                  .filter((d) => d.value !== cloningStaff.department)
                  .map((d) => {
                    const isChecked = selectedCloneDepts.includes(d.value);
                    return (
                      <label
                        key={d.value}
                        className={`${styles.checkItem} ${isChecked ? styles.checkItemActive : ''}`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleCloneDept(d.value)}
                          style={{ cursor: 'pointer' }}
                        />
                        <span style={{ flex: 1 }}>{d.name}</span>
                      </label>
                    );
                  })}
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className={styles.secondaryBtn}
                  onClick={handleCloseCloneModal}
                  disabled={isCloning}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={styles.primaryBtn}
                  onClick={handleExecuteClone}
                  disabled={isCloning || selectedCloneDepts.length === 0}
                >
                  {isCloning ? 'Cloning Faculty...' : `Clone to ${selectedCloneDepts.length} Course(s)`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffTab;
