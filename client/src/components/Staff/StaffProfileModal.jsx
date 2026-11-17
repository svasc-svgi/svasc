import React, { useState, useEffect } from 'react';
import styles from './StaffProfileModal.module.css';
import {
  X,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  FileText,
  Award,
  BookOpen,
  Users,
  Compass,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { getStaffInitials } from '../../utils/staffParser';

const StaffProfileModal = ({ staff, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
    setActiveTab('overview');
  }, [staff]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !staff) return null;

  const fullName = staff.fullName || staff.name || 'Faculty Member';
  const designation = staff.designation || 'Assistant Professor';
  const qualification = staff.qualification || '';
  const department = staff.department || (Array.isArray(staff.departments) ? staff.departments[0] : '');
  const photoUrl = staff.photo || staff.image || '';
  const initials = staff.initial || getStaffInitials(fullName);
  const contactNo = staff.contactNo || staff.mobile || '';
  const email = staff.email || '';

  const education = staff.education || {};
  const experience = staff.experience || {};
  const specialization = staff.specialization || '';
  const publications = staff.publications || {};
  const conferences = staff.conferences || {};
  const books = staff.books || '';
  const workshops = staff.workshops || '';
  const fdp = staff.fdp || '';
  const researchGuidance = staff.researchGuidance || {};
  const researchProjects = staff.researchProjects || {};
  const awards = staff.awards || '';

  const cleanVal = (val) => {
    if (!val || val === 'Nil' || val === '-' || val === 'null' || val === 'undefined') return '';
    return String(val).trim();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalCard}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="staff-profile-title"
      >
        {/* MODAL HEADER */}
        <div className={styles.modalHeader}>
          <div className={styles.headerPattern} />
          
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close Profile"
          >
            <X size={20} />
          </button>

          <div className={styles.headerContent}>
            <div className={styles.avatarContainer}>
              {photoUrl && !imageError ? (
                <img
                  src={photoUrl}
                  alt={fullName}
                  className={styles.staffAvatar}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className={styles.avatarFallback}>{initials}</div>
              )}
            </div>

            <div className={styles.staffInfo}>
              <div className={styles.staffNameRow}>
                <h2 id="staff-profile-title" className={styles.staffName}>{fullName}</h2>
                {designation && (
                  <span className={styles.designationBadge}>{designation}</span>
                )}
              </div>

              {qualification && (
                <p className={styles.qualificationText}>{qualification}</p>
              )}

              {department && (
                <div className={styles.departmentPill}>
                  <Compass size={14} style={{ color: '#f4b706' }} />
                  <span>{department}</span>
                </div>
              )}

              <div className={styles.contactRow}>
                {email && (
                  <a href={`mailto:${email}`} className={styles.contactPill}>
                    <Mail size={13} />
                    <span>{email}</span>
                  </a>
                )}
                {contactNo && (
                  <a href={`tel:${contactNo.split(' ')[0]}`} className={styles.contactPill}>
                    <Phone size={13} />
                    <span>{contactNo}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* TABS NAVIGATION */}
        <div className={styles.tabsContainer}>
          <button
            className={`${styles.tabBtn} ${activeTab === 'overview' ? styles.activeTabBtn : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <GraduationCap size={16} />
            <span>Overview & Education</span>
          </button>

          <button
            className={`${styles.tabBtn} ${activeTab === 'experience' ? styles.activeTabBtn : ''}`}
            onClick={() => setActiveTab('experience')}
          >
            <Briefcase size={16} />
            <span>Experience</span>
          </button>

          <button
            className={`${styles.tabBtn} ${activeTab === 'publications' ? styles.activeTabBtn : ''}`}
            onClick={() => setActiveTab('publications')}
          >
            <FileText size={16} />
            <span>Research & Publications</span>
          </button>

          <button
            className={`${styles.tabBtn} ${activeTab === 'contributions' ? styles.activeTabBtn : ''}`}
            onClick={() => setActiveTab('contributions')}
          >
            <Award size={16} />
            <span>Activities & Awards</span>
          </button>
        </div>

        {/* MODAL BODY */}
        <div className={styles.modalBody}>
          {/* TAB 1: OVERVIEW & EDUCATION */}
          {activeTab === 'overview' && (
            <div className={styles.tabContent}>
              <div className={styles.sectionBlock}>
                <div className={styles.sectionTitleRow}>
                  <div className={styles.sectionIconBadge}>
                    <GraduationCap size={16} />
                  </div>
                  <h3 className={styles.sectionHeading}>Educational Qualifications</h3>
                </div>

                <div className={styles.educationGrid}>
                  <div className={styles.eduCard}>
                    <div className={styles.eduLabel}>Undergraduate (UG)</div>
                    <div className={styles.eduValue}>
                      {cleanVal(education.ug) || cleanVal(qualification) || 'Degree Completed'}
                    </div>
                  </div>

                  <div className={styles.eduCard}>
                    <div className={styles.eduLabel}>Postgraduate (PG)</div>
                    <div className={styles.eduValue}>
                      {cleanVal(education.pg) || 'Master Degree'}
                    </div>
                  </div>

                  <div className={styles.eduCard}>
                    <div className={styles.eduLabel}>Doctorate (Ph.D)</div>
                    <div className={styles.eduValue}>
                      {cleanVal(education.doctorate) || (qualification.toLowerCase().includes('ph.d') ? 'Ph.D Awarded' : 'None')}
                    </div>
                  </div>

                  {cleanVal(education.other) && (
                    <div className={styles.eduCard}>
                      <div className={styles.eduLabel}>Other Qualifications</div>
                      <div className={styles.eduValue}>{education.other}</div>
                    </div>
                  )}
                </div>
              </div>

              {cleanVal(specialization) && (
                <div className={styles.sectionBlock}>
                  <div className={styles.sectionTitleRow}>
                    <div className={styles.sectionIconBadge}>
                      <Sparkles size={16} />
                    </div>
                    <h3 className={styles.sectionHeading}>Area of Specialization & Interest</h3>
                  </div>

                  <div className={styles.specializationCard}>
                    <div className={styles.specLabel}>Core Specialization</div>
                    <p className={styles.specValue}>{specialization}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: EXPERIENCE */}
          {activeTab === 'experience' && (
            <div className={styles.tabContent}>
              <div className={styles.sectionBlock}>
                <div className={styles.sectionTitleRow}>
                  <div className={styles.sectionIconBadge}>
                    <Briefcase size={16} />
                  </div>
                  <h3 className={styles.sectionHeading}>Years of Professional Experience</h3>
                </div>

                <div className={styles.experienceGrid}>
                  <div className={styles.expCard}>
                    <div className={styles.expNumber}>
                      {cleanVal(experience.teaching) || cleanVal(experience.total) || '0'}
                    </div>
                    <div className={styles.expLabel}>Teaching Experience</div>
                  </div>

                  <div className={styles.expCard}>
                    <div className={styles.expNumber}>
                      {cleanVal(experience.industry) || '0'}
                    </div>
                    <div className={styles.expLabel}>Industry Experience</div>
                  </div>

                  <div className={styles.expCard}>
                    <div className={styles.expNumber}>
                      {cleanVal(experience.research) || '0'}
                    </div>
                    <div className={styles.expLabel}>Research Experience</div>
                  </div>

                  <div className={styles.expCard}>
                    <div className={styles.expNumber}>
                      {cleanVal(experience.total) || cleanVal(experience.teaching) || '0'}
                    </div>
                    <div className={styles.expLabel}>Total Experience</div>
                  </div>
                </div>
              </div>

              <div className={styles.sectionBlock}>
                <div className={styles.sectionTitleRow}>
                  <div className={styles.sectionIconBadge}>
                    <Compass size={16} />
                  </div>
                  <h3 className={styles.sectionHeading}>Department Affiliation</h3>
                </div>

                <div className={styles.specializationCard}>
                  <div className={styles.specLabel}>Current Department & Courses Handled</div>
                  <p className={styles.specValue}>
                    {department}
                    {Array.isArray(staff.departments) && staff.departments.length > 1 && (
                      <span> • Also contributing to: {staff.departments.filter(d => d !== department).join(', ')}</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: RESEARCH & PUBLICATIONS */}
          {activeTab === 'publications' && (
            <div className={styles.tabContent}>
              <div className={styles.sectionBlock}>
                <div className={styles.sectionTitleRow}>
                  <div className={styles.sectionIconBadge}>
                    <FileText size={16} />
                  </div>
                  <h3 className={styles.sectionHeading}>Research Publications Summary</h3>
                </div>

                <div className={styles.pubTableWrapper}>
                  <table className={styles.pubTable}>
                    <thead>
                      <tr>
                        <th>Publication Category</th>
                        <th style={{ textAlign: 'center' }}>International</th>
                        <th style={{ textAlign: 'center' }}>National</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={styles.pubCategory}>Scopus Indexed Journals</td>
                        <td style={{ textAlign: 'center' }}>
                          <span className={`${styles.pubCountBadge} ${cleanVal(publications.scopus?.international) ? styles.hasCount : styles.zeroCount}`}>
                            {cleanVal(publications.scopus?.international) || '0'}
                          </span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <span className={`${styles.pubCountBadge} ${cleanVal(publications.scopus?.national) ? styles.hasCount : styles.zeroCount}`}>
                            {cleanVal(publications.scopus?.national) || '0'}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.pubCategory}>Peer-Reviewed Journals</td>
                        <td style={{ textAlign: 'center' }}>
                          <span className={`${styles.pubCountBadge} ${cleanVal(publications.peerReviewed?.international) ? styles.hasCount : styles.zeroCount}`}>
                            {cleanVal(publications.peerReviewed?.international) || '0'}
                          </span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <span className={`${styles.pubCountBadge} ${cleanVal(publications.peerReviewed?.national) ? styles.hasCount : styles.zeroCount}`}>
                            {cleanVal(publications.peerReviewed?.national) || '0'}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.pubCategory}>Web of Science</td>
                        <td style={{ textAlign: 'center' }}>
                          <span className={`${styles.pubCountBadge} ${cleanVal(publications.webOfScience?.international) ? styles.hasCount : styles.zeroCount}`}>
                            {cleanVal(publications.webOfScience?.international) || '0'}
                          </span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <span className={`${styles.pubCountBadge} ${cleanVal(publications.webOfScience?.national) ? styles.hasCount : styles.zeroCount}`}>
                            {cleanVal(publications.webOfScience?.national) || '0'}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.pubCategory}>Other Publications</td>
                        <td style={{ textAlign: 'center' }}>
                          <span className={`${styles.pubCountBadge} ${cleanVal(publications.others?.international) ? styles.hasCount : styles.zeroCount}`}>
                            {cleanVal(publications.others?.international) || '0'}
                          </span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <span className={`${styles.pubCountBadge} ${cleanVal(publications.others?.national) ? styles.hasCount : styles.zeroCount}`}>
                            {cleanVal(publications.others?.national) || '0'}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.pubCategory}>Conference Proceedings</td>
                        <td style={{ textAlign: 'center' }}>
                          <span className={`${styles.pubCountBadge} ${cleanVal(conferences.international) ? styles.hasCount : styles.zeroCount}`}>
                            {cleanVal(conferences.international) || '0'}
                          </span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <span className={`${styles.pubCountBadge} ${cleanVal(conferences.national) ? styles.hasCount : styles.zeroCount}`}>
                            {cleanVal(conferences.national) || '0'}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {(cleanVal(researchGuidance.awarded) || cleanVal(researchGuidance.undergoing) || cleanVal(researchProjects.completed) || cleanVal(researchProjects.undergoing)) && (
                <div className={styles.sectionBlock}>
                  <div className={styles.sectionTitleRow}>
                    <div className={styles.sectionIconBadge}>
                      <Users size={16} />
                    </div>
                    <h3 className={styles.sectionHeading}>Research Guidance & Projects</h3>
                  </div>

                  <div className={styles.contribGrid}>
                    <div className={styles.contribCard}>
                      <div className={styles.contribIcon}>
                        <Users size={20} />
                      </div>
                      <div className={styles.contribInfo}>
                        <div className={styles.contribLabel}>Research Guidance</div>
                        <div className={styles.contribValue}>
                          Awarded: {cleanVal(researchGuidance.awarded) || '0'} • Undergoing: {cleanVal(researchGuidance.undergoing) || '0'}
                        </div>
                        <div className={styles.contribDetail}>Supervision of Ph.D / M.Phil research scholars</div>
                      </div>
                    </div>

                    <div className={styles.contribCard}>
                      <div className={styles.contribIcon}>
                        <FileText size={20} />
                      </div>
                      <div className={styles.contribInfo}>
                        <div className={styles.contribLabel}>Research Projects</div>
                        <div className={styles.contribValue}>
                          Completed: {cleanVal(researchProjects.completed) || '0'} • Ongoing: {cleanVal(researchProjects.undergoing) || '0'}
                        </div>
                        <div className={styles.contribDetail}>Institutional & funded research initiatives</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: CONTRIBUTIONS & AWARDS */}
          {activeTab === 'contributions' && (
            <div className={styles.tabContent}>
              <div className={styles.sectionBlock}>
                <div className={styles.sectionTitleRow}>
                  <div className={styles.sectionIconBadge}>
                    <BookOpen size={16} />
                  </div>
                  <h3 className={styles.sectionHeading}>Academic Contributions & Development</h3>
                </div>

                <div className={styles.contribGrid}>
                  <div className={styles.contribCard}>
                    <div className={styles.contribIcon}>
                      <BookOpen size={20} />
                    </div>
                    <div className={styles.contribInfo}>
                      <div className={styles.contribLabel}>Book Publications</div>
                      <div className={styles.contribValue}>{cleanVal(books) || '0'}</div>
                      <div className={styles.contribDetail}>Books / Chapters published in recognized media</div>
                    </div>
                  </div>

                  <div className={styles.contribCard}>
                    <div className={styles.contribIcon}>
                      <Users size={20} />
                    </div>
                    <div className={styles.contribInfo}>
                      <div className={styles.contribLabel}>FDP Attended</div>
                      <div className={styles.contribValue}>{cleanVal(fdp) || '0'}</div>
                      <div className={styles.contribDetail}>Faculty Development Programs & pedagogical training</div>
                    </div>
                  </div>

                  <div className={styles.contribCard}>
                    <div className={styles.contribIcon}>
                      <Award size={20} />
                    </div>
                    <div className={styles.contribInfo}>
                      <div className={styles.contribLabel}>Workshops Attended</div>
                      <div className={styles.contribValue}>{cleanVal(workshops) || '0'}</div>
                      <div className={styles.contribDetail}>Hands-on workshops, webinars & technical symposiums</div>
                    </div>
                  </div>
                </div>
              </div>

              {cleanVal(awards) && (
                <div className={styles.sectionBlock}>
                  <div className={styles.sectionTitleRow}>
                    <div className={styles.sectionIconBadge}>
                      <Award size={16} />
                    </div>
                    <h3 className={styles.sectionHeading}>Honours & Awards Received</h3>
                  </div>

                  <div className={styles.awardsBox}>
                    <div className={styles.awardsIconWrapper}>
                      <Award size={24} />
                    </div>
                    <p className={styles.awardsText}>{awards}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className={styles.modalFooter}>
          <div className={styles.footerCollegeTag}>
            <Sparkles size={15} style={{ color: '#c8860a' }} />
            <span>Sri Vasavi College (Self-Finance Wing), Erode</span>
          </div>
          <button className={styles.footerCloseBtn} onClick={onClose}>
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffProfileModal;
