import React, { useState, lazy, Suspense } from 'react';
import styles from './AdminDashboard.module.css';

// Lazy-load every tab — only the active tab code is downloaded
const HomeTab = lazy(() => import('../components/Admin/Tabs/HomeTab'));
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

const TAB_LABELS = [
  'Home', 'Faculty & Staff', 'Alumni', 'Sports', 'Campus Life', 'Exams',
  'Activities', 'Blogs', 'Events', 'About SVASC', 'Newsletter',
  'Awards & Achievements', 'Library Activities', 'Library Awards',
];

const TAB_COMPONENTS = {
  'Home': <HomeTab />,
  'Faculty & Staff': <StaffTab />,
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
              {label}
            </li>
          ))}
        </ul>
        <div className={styles.logoutBtn} onClick={() => setIsAuthenticated(false)}>
          Logout
        </div>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.topbar}>
          <h1>{activeTab} Management</h1>
          <span className={styles.topbarNote}>Changes reflect on the frontend immediately after saving.</span>
        </div>
        <div className={styles.contentArea}>
          <Suspense fallback={<TabLoader />}>
            {TAB_COMPONENTS[activeTab]}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;