import React, { useState, useEffect, useMemo } from 'react';
import styles from './StaffTab.module.css';
import { Search, Plus, RefreshCw, Upload, Trash2, Edit3, X, CheckCircle, Info, Copy, FolderPlus, Layers, Eye, GraduationCap, Briefcase, FileText, Award, Sparkles } from 'lucide-react';
import {
  getAllStaff,
  createStaff,
  updateStaff,
  deleteStaff,
  cloneStaff,
  syncDefaultStaff,
  deduplicateStaff,
  getDepartments,
  createDepartment,
  deleteDepartment
} from '../../../services/staffService';
import { uploadDirectToCloudinary } from '../../../utils/cloudinaryDirectUpload';
import { parseStaffName, getStaffInitials } from '../../../utils/staffParser';
import { useStaffPhotos } from '../../../hooks/useStaffPhotos';
import { programDetailsData } from '../../../data/programDetailsData';
import { facultyProfiles } from '../../../data/facultyProfiles';
import StaffProfileModal from '../../Staff/StaffProfileModal';

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

const emptyStaffForm = {
  fullName: '',
  initial: '',
  qualification: '',
  designation: 'Assistant Professor',
  department: 'B.Sc. Computer Science',
  departments: ['B.Sc. Computer Science'],
  photo: '',
  contactNo: '',
  email: '',
  education: { ug: '', pg: '', doctorate: '', other: '' },
  experience: { teaching: '', industry: '', research: '', total: '' },
  specialization: '',
  publications: {
    scopus: { international: '', national: '' },
    peerReviewed: { international: '', national: '' },
    webOfScience: { international: '', national: '' },
    others: { international: '', national: '' }
  },
  conferences: { international: '', national: '' },
  books: '',
  workshops: '',
  fdp: '',
  researchGuidance: { awarded: '', undergoing: '' },
  researchProjects: { completed: '', undergoing: '' },
  awards: ''
};

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
  const [isDeduping, setIsDeduping] = useState(false);
  const [activeFormTab, setActiveFormTab] = useState('basic');

  // View modal state
  const [selectedStaffForView, setSelectedStaffForView] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Active items for editing / cloning
  const [editingStaff, setEditingStaff] = useState(null);
  const [cloningStaff, setCloningStaff] = useState(null);
  const [selectedCloneDepts, setSelectedCloneDepts] = useState([]);
  const [isCloning, setIsCloning] = useState(false);

  // New Department Form
  const [newDeptInput, setNewDeptInput] = useState('');
  const [deptActionLoading, setDeptActionLoading] = useState(false);

  // Form State for Add / Edit
  const [formData, setFormData] = useState(emptyStaffForm);

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
      try {
        await deduplicateStaff();
      } catch (dedupErr) {
        // Safe to ignore in development / offline
      }

      const data = await getAllStaff();
      if (Array.isArray(data) && data.length > 0) {
        setStaffList(data);
      } else {
        // If DB has no staff yet, auto-populate from facultyProfiles
        await handleSyncAllFaculty(false);
      }
    } catch (err) {
      console.error('Failed to load staff list:', err);
    } finally {
      setLoading(false);
    }
  };

  // Manual trigger to clean duplicates in database and merge course assignments
  const handleManualDedup = async () => {
    setIsDeduping(true);
    try {
      await deduplicateStaff();
      const refreshed = await getAllStaff();
      setStaffList(refreshed);
      await reloadStaffPhotos();
      setStatusMessage('Duplicate staff records successfully merged! Each faculty member now appears once.');
      setTimeout(() => setStatusMessage(''), 4500);
    } catch (err) {
      alert('Deduplication notice: ' + err.message);
    } finally {
      setIsDeduping(false);
    }
  };

  useEffect(() => {
    loadDepartments();
    loadStaffData();
  }, []);

  // Open full detailed view profile popup
  const handleViewProfile = (staff) => {
    let enriched = { ...staff };
    const cleanStr = (s) => (s || '').toLowerCase().replace(/^(dr\.|mr\.|mrs\.|ms\.)\s*/gi, '').replace(/[^a-z0-9]/g, '');
    const targetKey = cleanStr(staff.fullName || staff.name || '');
    const found = facultyProfiles.find(fp => cleanStr(fp.fullName) === targetKey || (fp.coreName && cleanStr(fp.coreName) === targetKey));

    if (found) {
      enriched = {
        ...found,
        ...enriched,
        photo: enriched.photo || found.photo,
        education: (enriched.education && (enriched.education.ug || enriched.education.pg)) ? enriched.education : found.education,
        experience: (enriched.experience && (enriched.experience.teaching || enriched.experience.total)) ? enriched.experience : found.experience,
        specialization: enriched.specialization || found.specialization,
        publications: (enriched.publications && enriched.publications.scopus) ? enriched.publications : found.publications,
        conferences: (enriched.conferences && (enriched.conferences.international || enriched.conferences.national)) ? enriched.conferences : found.conferences,
        books: enriched.books || found.books,
        workshops: enriched.workshops || found.workshops,
        fdp: enriched.fdp || found.fdp,
        researchGuidance: enriched.researchGuidance || found.researchGuidance,
        researchProjects: enriched.researchProjects || found.researchProjects,
        awards: enriched.awards || found.awards,
        contactNo: enriched.contactNo || enriched.mobile || found.contactNo,
        email: enriched.email || found.email
      };
    }
    setSelectedStaffForView(enriched);
    setIsViewModalOpen(true);
  };

  // Sync faculty database using the rich facultyProfiles dataset
  const handleSyncAllFaculty = async (showNotification = true) => {
    setIsSyncing(true);
    try {
      const allFaculty = [...facultyProfiles];

      // Add library staff
      allFaculty.push({
        fullName: 'Dr. P. Krishnakumari',
        qualification: 'MLIS., M.Phil., Ph.D.',
        designation: 'Librarian & Head',
        department: 'Library',
        departments: ['Library'],
        photo: '/library_images/image45.jpeg',
        sNo: 1,
        education: { ug: 'BLIS', pg: 'MLIS', doctorate: 'Ph.D in Library Science', other: 'M.Phil' },
        experience: { teaching: '15 Years', industry: '-', research: '5 Years', total: '15 Years' },
        specialization: 'Library & Information Science, Digital Archiving'
      });
      allFaculty.push({
        fullName: 'Karthi P',
        qualification: 'B.Com., BLIS.',
        designation: 'Library Assistant',
        department: 'Library',
        departments: ['Library'],
        photo: '/library_images/image46.png',
        sNo: 2,
        education: { ug: 'B.Com, BLIS', pg: '', doctorate: '', other: '' },
        experience: { teaching: '', industry: '5 Years', research: '', total: '5 Years' }
      });

      // Add Alumni committee coordinators
      allFaculty.push({
        fullName: 'Mrs. T. Ayeeshasumaiya',
        qualification: 'Assistant Professor & Head',
        designation: 'Coordinator',
        department: 'B.Sc. Costume Design & Fashion',
        departments: ['B.Sc. Costume Design & Fashion', 'Alumni Committee'],
        sNo: 1
      });

      await syncDefaultStaff(allFaculty);
      const updated = await getAllStaff();
      setStaffList(updated);
      await loadDepartments();
      await reloadStaffPhotos();

      if (showNotification) {
        setStatusMessage('Successfully synced all detailed faculty profiles with research, qualifications and photo maps!');
        setTimeout(() => setStatusMessage(''), 4500);
      }
    } catch (err) {
      console.error('Error syncing staff:', err);
      if (showNotification) alert('Error syncing faculty: ' + err.message);
    } finally {
      setIsSyncing(false);
    }
  };

  // Open Add / Edit Modal
  const handleOpenModal = (staff = null) => {
    setActiveFormTab('basic');
    if (staff) {
      setEditingStaff(staff);
      const parsed = parseStaffName(staff.fullName || '');

      const cleanStr = (s) => (s || '').toLowerCase().replace(/^(dr\.|mr\.|mrs\.|ms\.)\s*/gi, '').replace(/[^a-z0-9]/g, '');
      const targetKey = cleanStr(staff.fullName || '');
      const found = facultyProfiles.find(fp => cleanStr(fp.fullName) === targetKey || (fp.coreName && cleanStr(fp.coreName) === targetKey)) || {};

      const rawDepts = Array.isArray(staff.departments) && staff.departments.length > 0
        ? staff.departments
        : (staff.department ? [staff.department] : [(departmentList[0]?.value || 'B.Sc. Computer Science')]);

      setFormData({
        fullName: staff.fullName || '',
        initial: staff.initial || parsed.initial || '',
        qualification: staff.qualification || '',
        designation: staff.designation || 'Assistant Professor',
        department: staff.department || rawDepts[0] || (departmentList[0]?.value || 'B.Sc. Computer Science'),
        departments: rawDepts,
        photo: staff.photo || found.photo || '',
        contactNo: staff.contactNo || staff.mobile || found.contactNo || '',
        email: staff.email || found.email || '',
        education: staff.education?.ug ? staff.education : (found.education || { ug: '', pg: '', doctorate: '', other: '' }),
        experience: staff.experience?.total ? staff.experience : (found.experience || { teaching: '', industry: '', research: '', total: '' }),
        specialization: staff.specialization || found.specialization || '',
        publications: staff.publications?.scopus ? staff.publications : (found.publications || {
          scopus: { international: '', national: '' },
          peerReviewed: { international: '', national: '' },
          webOfScience: { international: '', national: '' },
          others: { international: '', national: '' }
        }),
        conferences: staff.conferences || found.conferences || { international: '', national: '' },
        books: staff.books || found.books || '',
        workshops: staff.workshops || found.workshops || '',
        fdp: staff.fdp || found.fdp || '',
        researchGuidance: staff.researchGuidance || found.researchGuidance || { awarded: '', undergoing: '' },
        researchProjects: staff.researchProjects || found.researchProjects || { completed: '', undergoing: '' },
        awards: staff.awards || found.awards || ''
      });
      setFilePreview(staff.photo || found.photo || '');
    } else {
      setEditingStaff(null);
      setFormData({
        ...emptyStaffForm,
        department: selectedDept !== 'All' ? selectedDept : (departmentList[0]?.value || 'B.Sc. Computer Science')
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
      departments: Array.isArray(formData.departments) && formData.departments.length > 0
        ? formData.departments
        : (formData.department ? [formData.department] : []),
      photo: finalPhotoUrl,
      contactNo: (formData.contactNo || '').trim(),
      email: (formData.email || '').trim(),
      education: formData.education,
      experience: formData.experience,
      specialization: (formData.specialization || '').trim(),
      publications: formData.publications,
      conferences: formData.conferences,
      books: (formData.books || '').trim(),
      workshops: (formData.workshops || '').trim(),
      fdp: (formData.fdp || '').trim(),
      researchGuidance: formData.researchGuidance,
      researchProjects: formData.researchProjects,
      awards: (formData.awards || '').trim()
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
      setStatusMessage(`Assigned ${cloningStaff.fullName} to ${selectedCloneDepts.join(', ')} successfully!`);
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
    // 1. Deduplicate staff by canonical faculty person identity
    const cleanStr = (s) =>
      (s || '')
        .toLowerCase()
        .replace(/^(dr|mr|mrs|ms|prof|rev|முனைவர்|திரு|திருமதி|செல்வி)\.?\s+/gi, '')
        .replace(/[^a-z0-9\u0B80-\u0BFF]/g, '')
        .replace(/j/g, 'ch');

    const personMap = new Map();

    for (const s of staffList) {
      const parsed = parseStaffName(s.fullName || s.name || '');
      const initial = (s.initial || parsed.initial || '').trim().toLowerCase();
      const core = cleanStr(parsed.coreName || s.coreName || s.fullName || s.name || '');
      const key = s.normalizedKey || (initial ? `${core}_${initial}` : core) || String(s._id || s.id);

      if (!personMap.has(key)) {
        const itemDepts = Array.isArray(s.departments) && s.departments.length > 0
          ? s.departments
          : (s.department ? [s.department] : []);
        personMap.set(key, { ...s, departments: [...itemDepts] });
      } else {
        const existing = personMap.get(key);
        // Merge departments
        const combined = new Set([
          ...(Array.isArray(existing.departments) ? existing.departments : [existing.department]),
          ...(Array.isArray(s.departments) ? s.departments : [s.department])
        ].filter(Boolean));
        existing.departments = Array.from(combined);

        // Keep best available details
        if (!existing.photo && s.photo) existing.photo = s.photo;
        if (!existing.qualification && s.qualification) existing.qualification = s.qualification;
        if (!existing.contactNo && (s.contactNo || s.mobile)) existing.contactNo = s.contactNo || s.mobile;
        if (!existing.email && s.email) existing.email = s.email;
      }
    }

    const uniqueList = Array.from(personMap.values());

    // 2. Filter by selected department & search query
    const list = uniqueList.filter((staff) => {
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
      const allDeptsStr = (staff.departments || []).join(' ').toLowerCase();

      return fn.includes(q) || init === q || qual.includes(q) || dept.includes(q) || allDeptsStr.includes(q);
    });

    return [...list].sort((a, b) => {
      const sNoA = typeof a.sNo === 'number' && a.sNo > 0 ? a.sNo : 99999;
      const sNoB = typeof b.sNo === 'number' && b.sNo > 0 ? b.sNo : 99999;
      if (sNoA !== sNoB) return sNoA - sNoB;
      const nameA = (a.fullName || '').toLowerCase();
      const nameB = (b.fullName || '').toLowerCase();
      return nameA.localeCompare(nameB);
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
            onClick={handleManualDedup}
            disabled={isDeduping}
            title="Clean duplicate entries and merge course assignments across database"
          >
            <Sparkles size={16} className={isDeduping ? 'animate-spin' : ''} />
            {isDeduping ? 'Cleaning...' : 'Deduplicate Staff'}
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
          <option value="All">All Departments / Courses ({filteredStaff.length})</option>
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
              <th style={{ width: '250px', textAlign: 'center' }}>Actions</th>
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
                      {idx + 1}
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
                          className={styles.viewBtn}
                          onClick={() => handleViewProfile(staff)}
                          title="View full detailed staff profile popup"
                        >
                          <Eye size={15} />
                          View
                        </button>
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

      {/* Edit / Add Faculty Modal with Comprehensive Profile Details */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{editingStaff ? 'Edit Faculty Detailed Profile & Photo' : 'Add New Faculty & Staff Profile'}</h3>
              <button className={styles.closeModalBtn} onClick={handleCloseModal}>
                <X size={20} />
              </button>
            </div>

            {/* FORM TAB NAVIGATION */}
            <div className={styles.formTabNav}>
              <button
                type="button"
                className={`${styles.formTabBtn} ${activeFormTab === 'basic' ? styles.activeFormTab : ''}`}
                onClick={() => setActiveFormTab('basic')}
              >
                Basic & Contact Info
              </button>
              <button
                type="button"
                className={`${styles.formTabBtn} ${activeFormTab === 'education' ? styles.activeFormTab : ''}`}
                onClick={() => setActiveFormTab('education')}
              >
                Education
              </button>
              <button
                type="button"
                className={`${styles.formTabBtn} ${activeFormTab === 'experience' ? styles.activeFormTab : ''}`}
                onClick={() => setActiveFormTab('experience')}
              >
                Experience & Specialization
              </button>
              <button
                type="button"
                className={`${styles.formTabBtn} ${activeFormTab === 'research' ? styles.activeFormTab : ''}`}
                onClick={() => setActiveFormTab('research')}
              >
                Research & Publications
              </button>
              <button
                type="button"
                className={`${styles.formTabBtn} ${activeFormTab === 'activities' ? styles.activeFormTab : ''}`}
                onClick={() => setActiveFormTab('activities')}
              >
                Activities & Awards
              </button>
            </div>

            <form onSubmit={handleSave}>
              {/* TAB 1: BASIC & CONTACT INFO */}
              {activeFormTab === 'basic' && (
                <div>
                  <div className={styles.syncNotice}>
                    <Info size={20} color="#2563eb" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>
                      <strong>Realtime Updates:</strong> Any change to profile information or photo will instantly reflect on the frontend course page!
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

                  <div className={styles.formRowGrid}>
                    {/* Full Name Input */}
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Full Name *</label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={handleFullNameChange}
                        placeholder="e.g. Dr. V. Suresh Kumar"
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
                      />
                    </div>
                  </div>

                  <div className={styles.formRowGrid}>
                    {/* Qualification */}
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Qualification</label>
                      <input
                        type="text"
                        value={formData.qualification}
                        onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                        placeholder="e.g. MCA., M.Phil., Ph.D."
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

                  <div className={styles.formRowGrid}>
                    {/* Contact Number */}
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Contact / Mobile Number</label>
                      <input
                        type="text"
                        value={formData.contactNo}
                        onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
                        placeholder="e.g. 9677621706"
                        className={styles.formInput}
                      />
                    </div>

                    {/* Email */}
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Official Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. staff@svasc.org"
                        className={styles.formInput}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: EDUCATIONAL QUALIFICATIONS */}
              {activeFormTab === 'education' && (
                <div>
                  <div className={styles.formRowGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Undergraduate (UG)</label>
                      <input
                        type="text"
                        value={formData.education?.ug || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          education: { ...formData.education, ug: e.target.value }
                        })}
                        placeholder="e.g. B.Sc Computer Science"
                        className={styles.formInput}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Postgraduate (PG)</label>
                      <input
                        type="text"
                        value={formData.education?.pg || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          education: { ...formData.education, pg: e.target.value }
                        })}
                        placeholder="e.g. MCA"
                        className={styles.formInput}
                      />
                    </div>
                  </div>

                  <div className={styles.formRowGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Doctorate (Ph.D)</label>
                      <input
                        type="text"
                        value={formData.education?.doctorate || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          education: { ...formData.education, doctorate: e.target.value }
                        })}
                        placeholder="e.g. Computer Science (Awarded / Undergoing)"
                        className={styles.formInput}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Other Qualifications / Certifications</label>
                      <input
                        type="text"
                        value={formData.education?.other || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          education: { ...formData.education, other: e.target.value }
                        })}
                        placeholder="e.g. M.Phil, NET, SET, PG Diploma"
                        className={styles.formInput}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: EXPERIENCE & SPECIALIZATION */}
              {activeFormTab === 'experience' && (
                <div>
                  <div className={styles.formRowGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Teaching Experience</label>
                      <input
                        type="text"
                        value={formData.experience?.teaching || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          experience: { ...formData.experience, teaching: e.target.value }
                        })}
                        placeholder="e.g. 12 Years"
                        className={styles.formInput}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Industry Experience</label>
                      <input
                        type="text"
                        value={formData.experience?.industry || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          experience: { ...formData.experience, industry: e.target.value }
                        })}
                        placeholder="e.g. 6 Months"
                        className={styles.formInput}
                      />
                    </div>
                  </div>

                  <div className={styles.formRowGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Research Experience</label>
                      <input
                        type="text"
                        value={formData.experience?.research || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          experience: { ...formData.experience, research: e.target.value }
                        })}
                        placeholder="e.g. 2 Years / Nil"
                        className={styles.formInput}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Total Experience</label>
                      <input
                        type="text"
                        value={formData.experience?.total || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          experience: { ...formData.experience, total: e.target.value }
                        })}
                        placeholder="e.g. 12 Years"
                        className={styles.formInput}
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Area of Interest / Specialization</label>
                    <textarea
                      rows="3"
                      value={formData.specialization || ''}
                      onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                      placeholder="e.g. Computer Networks, Machine Learning, Cloud Computing, Sports Achievements..."
                      className={styles.formInput}
                    />
                  </div>
                </div>
              )}

              {/* TAB 4: RESEARCH & PUBLICATIONS */}
              {activeFormTab === 'research' && (
                <div>
                  <h4 className={styles.subSectionTitle}>Journal Publications</h4>
                  
                  {/* Scopus */}
                  <div className={styles.formRowGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Scopus Indexed (International)</label>
                      <input
                        type="text"
                        value={formData.publications?.scopus?.international || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          publications: {
                            ...formData.publications,
                            scopus: { ...formData.publications?.scopus, international: e.target.value }
                          }
                        })}
                        placeholder="e.g. 2"
                        className={styles.formInput}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Scopus Indexed (National)</label>
                      <input
                        type="text"
                        value={formData.publications?.scopus?.national || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          publications: {
                            ...formData.publications,
                            scopus: { ...formData.publications?.scopus, national: e.target.value }
                          }
                        })}
                        placeholder="e.g. 1"
                        className={styles.formInput}
                      />
                    </div>
                  </div>

                  {/* Peer Reviewed */}
                  <div className={styles.formRowGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Peer-Reviewed (International)</label>
                      <input
                        type="text"
                        value={formData.publications?.peerReviewed?.international || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          publications: {
                            ...formData.publications,
                            peerReviewed: { ...formData.publications?.peerReviewed, international: e.target.value }
                          }
                        })}
                        placeholder="e.g. 4"
                        className={styles.formInput}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Peer-Reviewed (National)</label>
                      <input
                        type="text"
                        value={formData.publications?.peerReviewed?.national || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          publications: {
                            ...formData.publications,
                            peerReviewed: { ...formData.publications?.peerReviewed, national: e.target.value }
                          }
                        })}
                        placeholder="e.g. 2"
                        className={styles.formInput}
                      />
                    </div>
                  </div>

                  {/* Web of Science */}
                  <div className={styles.formRowGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Web of Science (International)</label>
                      <input
                        type="text"
                        value={formData.publications?.webOfScience?.international || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          publications: {
                            ...formData.publications,
                            webOfScience: { ...formData.publications?.webOfScience, international: e.target.value }
                          }
                        })}
                        placeholder="e.g. 1"
                        className={styles.formInput}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Web of Science (National)</label>
                      <input
                        type="text"
                        value={formData.publications?.webOfScience?.national || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          publications: {
                            ...formData.publications,
                            webOfScience: { ...formData.publications?.webOfScience, national: e.target.value }
                          }
                        })}
                        placeholder="e.g. 0"
                        className={styles.formInput}
                      />
                    </div>
                  </div>

                  {/* Conferences */}
                  <h4 className={styles.subSectionTitle}>Conference Proceedings</h4>
                  <div className={styles.formRowGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Conferences (International)</label>
                      <input
                        type="text"
                        value={formData.conferences?.international || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          conferences: { ...formData.conferences, international: e.target.value }
                        })}
                        placeholder="e.g. 2"
                        className={styles.formInput}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Conferences (National)</label>
                      <input
                        type="text"
                        value={formData.conferences?.national || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          conferences: { ...formData.conferences, national: e.target.value }
                        })}
                        placeholder="e.g. 3"
                        className={styles.formInput}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: ACTIVITIES & AWARDS */}
              {activeFormTab === 'activities' && (
                <div>
                  <div className={styles.formRowGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Book Publications (Count or Title)</label>
                      <input
                        type="text"
                        value={formData.books || ''}
                        onChange={(e) => setFormData({ ...formData, books: e.target.value })}
                        placeholder="e.g. 2"
                        className={styles.formInput}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>FDP Attended</label>
                      <input
                        type="text"
                        value={formData.fdp || ''}
                        onChange={(e) => setFormData({ ...formData, fdp: e.target.value })}
                        placeholder="e.g. 7"
                        className={styles.formInput}
                      />
                    </div>
                  </div>

                  <div className={styles.formRowGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Workshops Attended</label>
                      <input
                        type="text"
                        value={formData.workshops || ''}
                        onChange={(e) => setFormData({ ...formData, workshops: e.target.value })}
                        placeholder="e.g. 10"
                        className={styles.formInput}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Research Guidance (Awarded / Undergoing)</label>
                      <input
                        type="text"
                        value={
                          formData.researchGuidance?.awarded || formData.researchGuidance?.undergoing
                            ? `Awarded: ${formData.researchGuidance?.awarded || 0}, Ongoing: ${formData.researchGuidance?.undergoing || 0}`
                            : ''
                        }
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData({
                            ...formData,
                            researchGuidance: { awarded: val, undergoing: '' }
                          });
                        }}
                        placeholder="e.g. Awarded: 1, Ongoing: 2"
                        className={styles.formInput}
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Honours & Awards Received</label>
                    <textarea
                      rows="2"
                      value={formData.awards || ''}
                      onChange={(e) => setFormData({ ...formData, awards: e.target.value })}
                      placeholder="e.g. Gold Medal in Athletics, Best Faculty Award..."
                      className={styles.formInput}
                    />
                  </div>
                </div>
              )}

              {/* Modal Footer Buttons */}
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
                  {isUploading ? 'Uploading & Saving...' : 'Save Faculty Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DETAILED STAFF PROFILE POPUP MODAL (ADMIN PREVIEW) */}
      <StaffProfileModal
        staff={selectedStaffForView}
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
      />

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
