import React, { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { Bell, BellRing, X } from 'lucide-react';
import styles from './AdminDashboard.module.css';
import {
  getAdmissions,
  markAdmissionRead,
  markAllAdmissionsRead,
  updateAdmissionStatus,
  deleteAdmission,
} from '../services/admissionService';

// Lazy-load every tab — only the active tab code is downloaded
const HomeTab = lazy(() => import('../components/Admin/Tabs/HomeTab'));
const AdmissionsTab = lazy(() => import('../components/Admin/Tabs/AdmissionsTab'));
const AlumniTab = lazy(() => import('../components/Admin/Tabs/AlumniTab'));
const SportsTab = lazy(() => import('../components/Admin/Tabs/SportsTab'));
const CampusLifeTab = lazy(() => import('../components/Admin/Tabs/CampusLifeTab'));
const ExamsTab = lazy(() => import('../components/Admin/Tabs/ExamsTab'));
const ActivitiesTab = lazy(() => import('../components/Admin/Tabs/ActivitiesTab'));
const BlogsTab = lazy(() => import('../components/Admin/Tabs/BlogsTab'));
const EventsTab = lazy(() => import('../components/Admin/Tabs/EventsTab'));
const AboutTab = lazy(() => import('../components/Admin/Tabs/AboutTab'));
const NewsletterTab = lazy(() => import('../components/Admin/Tabs/NewsletterTab'));
const AwardsGalleryTab = lazy(() => import('../components/Admin/Tabs/AwardsGalleryTab'));
const LibraryActivitiesTab = lazy(() => import('../components/Admin/Tabs/LibraryActivitiesTab'));
const LibraryAwardsTab = lazy(() => import('../components/Admin/Tabs/LibraryAwardsTab'));
const StaffTab = lazy(() => import('../components/Admin/Tabs/StaffTab'));
const WhySvascTab = lazy(() => import('../components/Admin/Tabs/WhySvascTab'));
const ProgrammesTab = lazy(() => import('../components/Admin/Tabs/ProgrammesTab'));

const TAB_LABELS = [
  'Home', 'Admissions', 'Faculty & Staff', 'Programmes', 'Why SVASC', 'Alumni', 'Sports', 'Campus Life', 'Exams',
  'Activities', 'Blogs', 'Events', 'About SVASC', 'Newsletter',
  'Awards & Achievements', 'Library Activities', 'Library Awards',
];

const STATIC_TAB_COMPONENTS = {
  'Home': <HomeTab />,
  'Faculty & Staff': <StaffTab />,
  'Programmes': <ProgrammesTab />,
  'Why SVASC': <WhySvascTab />,
  'Alumni': <AlumniTab />,
  'Sports': <SportsTab />,
  'Campus Life': <CampusLifeTab />,
  'Exams': <ExamsTab />,
  'Activities': <ActivitiesTab />,
  'Blogs': <BlogsTab />,
  'Events': <EventsTab />,
  'About SVASC': <AboutTab />,
  'Newsletter': <NewsletterTab />,
  'Awards & Achievements': <AwardsGalleryTab />,
  'Library Activities': <LibraryActivitiesTab />,
  'Library Awards': <LibraryAwardsTab />,
};

const TabLoader = () => (
  <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>Loading tab...</div>
);

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [activeTab, setActiveTab] = useState('Home');

  const [admissions, setAdmissions] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [admissionsLoading, setAdmissionsLoading] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [toastAlert, setToastAlert] = useState(null);
  const prevLatestIdRef = useRef(null);
  const notifWrapperRef = useRef(null);

  const fetchAdmissions = useCallback(async (isPoll = false) => {
    try {
      if (!isPoll) setAdmissionsLoading(true);
      const res = await getAdmissions();
      const list = Array.isArray(res?.data) ? res.data : [];
      const unread = typeof res?.unreadCount === 'number'
        ? res.unreadCount
        : list.filter((a) => !a.isRead).length;

      setAdmissions(list);
      setUnreadCount(unread);

      const newestUnread = list.find((a) => !a.isRead);
      if (newestUnread && newestUnread._id !== prevLatestIdRef.current) {
        setBannerDismissed(false);
        setToastAlert(newestUnread);
        prevLatestIdRef.current = newestUnread._id;
      } else if (!newestUnread) {
        prevLatestIdRef.current = null;
      }
    } catch (err) {
      if (err?.message !== 'Deduplicated request') {
        console.warn('Could not load admission notifications:', err.message);
      }
    } finally {
      if (!isPoll) setAdmissionsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return undefined;
    fetchAdmissions(false);
    const timer = setInterval(() => {
      fetchAdmissions(true);
    }, 15000);
    return () => clearInterval(timer);
  }, [isAuthenticated, fetchAdmissions]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifWrapperRef.current && !notifWrapperRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkRead = async (id) => {
    try {
      await markAdmissionRead(id);
      setAdmissions((prev) => prev.map((a) => (a._id === id ? { ...a, isRead: true } : a)));
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Error marking admission as read:', err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllAdmissionsRead();
      setAdmissions((prev) => prev.map((a) => ({ ...a, isRead: true })));
      setUnreadCount(0);
      setToastAlert(null);
      setNotifOpen(false);
    } catch (err) {
      console.error('Error marking all admissions as read:', err);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await updateAdmissionStatus(id, status);
      const updated = res?.data;
      setAdmissions((prev) => {
        const next = prev.map((a) =>
          a._id === id ? (updated || { ...a, status, isRead: true }) : a
        );
        setUnreadCount(next.filter((a) => !a.isRead).length);
        return next;
      });
    } catch (err) {
      console.error('Error updating admission status:', err);
    }
  };

  const handleDeleteAdmission = async (id) => {
    try {
      await deleteAdmission(id);
      setAdmissions((prev) => {
        const next = prev.filter((a) => a._id !== id);
        setUnreadCount(next.filter((a) => !a.isRead).length);
        return next;
      });
    } catch (err) {
      console.error('Error deleting admission:', err);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'svasc@procols') {
      setIsAuthenticated(true);
      setPasswordError('');
    } else {
      setPasswordError('Incorrect security code. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.loginContainer}>
        <form onSubmit={handleLogin} className={styles.loginForm}>
          <div className={styles.loginLogo}>SVASC</div>
          <h2>Admin Panel</h2>
          <p className={styles.loginSubtitle}>Enter your security code to continue</p>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }}
            placeholder="Security Code"
            className={styles.passwordInput}
            autoFocus
          />
          {passwordError && <p className={styles.errorMsg}>{passwordError}</p>}
          <button type="submit" className={styles.loginButton}>Login</button>
        </form>
      </div>
    );
  }

  const latestUnread = admissions.find((a) => !a.isRead);

  return (
    <div className={styles.adminLayout}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarLogo}>SVASC</div>
          <span className={styles.sidebarTagline}>Admin Panel</span>
        </div>
        <ul className={styles.navLinks}>
          {TAB_LABELS.map((label) => (
            <li
              key={label}
              className={`${styles.navItem} ${activeTab === label ? styles.active : ''}`}
              onClick={() => setActiveTab(label)}
            >
              <span>{label}</span>
              {label === 'Admissions' && unreadCount > 0 && (
                <span className={styles.navBadge}>{unreadCount}</span>
              )}
            </li>
          ))}
        </ul>
        <div className={styles.logoutBtn} onClick={() => setIsAuthenticated(false)}>
          Logout
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <h1>{activeTab} Management</h1>
            <span className={styles.topbarNote}>Changes reflect on the frontend immediately after saving.</span>
          </div>

          <div className={styles.notificationWrapper} ref={notifWrapperRef}>
            <button
              type="button"
              className={`${styles.bellBtn} ${unreadCount > 0 ? styles.bellBtnHasUnread : ''}`}
              onClick={() => setNotifOpen((prev) => !prev)}
            >
              {unreadCount > 0 ? <BellRing size={17} /> : <Bell size={17} />}
              <span>Admission Alerts</span>
              {unreadCount > 0 && <span className={styles.bellBadge}>{unreadCount}</span>}
            </button>

            {notifOpen && (
              <div className={styles.notifDropdown}>
                <div className={styles.notifHeader}>
                  <span>Admission Notifications ({unreadCount} New)</span>
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      className={styles.notifHeaderBtn}
                      onClick={handleMarkAllRead}
                    >
                      Mark All Read
                    </button>
                  )}
                </div>
                <div className={styles.notifList}>
                  {admissions.slice(0, 6).map((item) => (
                    <div
                      key={item._id}
                      className={`${styles.notifItem} ${!item.isRead ? styles.notifItemUnread : ''}`}
                      onClick={() => {
                        setActiveTab('Admissions');
                        setNotifOpen(false);
                        if (!item.isRead) handleMarkRead(item._id);
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong style={{ color: '#002147', fontSize: '0.88rem' }}>{item.studentName}</strong>
                        {!item.isRead && (
                          <span style={{ fontSize: '0.68rem', background: '#dc2626', color: '#fff', padding: '1px 6px', borderRadius: '9999px', fontWeight: 700 }}>
                            NEW
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '2px' }}>
                        {item.course} • {item.phone}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '3px' }}>
                        {item.city} • {item.createdAt ? new Date(item.createdAt).toLocaleString('en-IN') : ''}
                      </div>
                    </div>
                  ))}
                  {admissions.length === 0 && (
                    <div style={{ padding: '20px', textAlign: 'center', color: '#64748b', fontSize: '0.86rem' }}>
                      No admission notifications yet.
                    </div>
                  )}
                </div>
                <div
                  className={styles.notifFooter}
                  onClick={() => {
                    setActiveTab('Admissions');
                    setNotifOpen(false);
                  }}
                >
                  Open Admissions Portal →
                </div>
              </div>
            )}
          </div>
        </div>

        {/* High-Priority Admission Alert Banner */}
        {unreadCount > 0 && !bannerDismissed && (
          <div className={styles.alertBanner} role="alert">
            <div className={styles.alertBannerLeft}>
              <BellRing size={20} color="#b45309" />
              <div>
                <strong>New Admission Alert:</strong> {unreadCount} unread admission application{unreadCount > 1 ? 's' : ''}{' '}
                received{latestUnread ? ` — Latest: ${latestUnread.studentName} (${latestUnread.course}, ${latestUnread.phone})` : ''}.
              </div>
            </div>
            <div className={styles.alertBannerActions}>
              <button
                type="button"
                className={styles.alertPrimaryBtn}
                onClick={() => setActiveTab('Admissions')}
              >
                View Admissions
              </button>
              <button
                type="button"
                className={styles.alertSecondaryBtn}
                onClick={handleMarkAllRead}
              >
                Mark All Read
              </button>
              <button
                type="button"
                onClick={() => setBannerDismissed(true)}
                aria-label="Dismiss banner"
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#78350f', display: 'flex' }}
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}

        <div className={styles.contentArea}>
          <Suspense fallback={<TabLoader />}>
            {activeTab === 'Admissions' ? (
              <AdmissionsTab
                admissions={admissions}
                unreadCount={unreadCount}
                loading={admissionsLoading}
                onRefresh={() => fetchAdmissions(false)}
                onMarkRead={handleMarkRead}
                onMarkAllRead={handleMarkAllRead}
                onUpdateStatus={handleUpdateStatus}
                onDelete={handleDeleteAdmission}
              />
            ) : (
              STATIC_TAB_COMPONENTS[activeTab]
            )}
          </Suspense>
        </div>
      </div>

      {/* Live Toast Notification Popup */}
      {toastAlert && (
        <div className={styles.toastAlert} role="alert">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f89e20', fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase' }}>
              <BellRing size={16} />
              New Admission Inquiry
            </div>
            <button
              type="button"
              onClick={() => setToastAlert(null)}
              style={{ background: 'transparent', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 0 }}
            >
              <X size={16} />
            </button>
          </div>
          <div style={{ marginTop: '8px', fontSize: '0.96rem', fontWeight: 700 }}>
            {toastAlert.studentName}
          </div>
          <div style={{ marginTop: '2px', fontSize: '0.84rem', color: '#cbd5e1' }}>
            {toastAlert.course} • {toastAlert.qualification}
          </div>
          <div style={{ marginTop: '2px', fontSize: '0.82rem', color: '#e2e8f0' }}>
            {toastAlert.phone} • {toastAlert.city}
          </div>
          <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={() => {
                setActiveTab('Admissions');
                setToastAlert(null);
              }}
              style={{
                background: '#f89e20',
                color: '#002147',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
              }}
            >
              View Application
            </button>
            <button
              type="button"
              onClick={() => {
                handleMarkRead(toastAlert._id);
                setToastAlert(null);
              }}
              style={{
                background: 'rgba(255,255,255,0.12)',
                color: '#fff',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '0.8rem',
                cursor: 'pointer',
              }}
            >
              Mark Read
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
