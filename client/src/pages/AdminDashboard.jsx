import React, { useState } from 'react';
import styles from './AdminDashboard.module.css';
import HomeTab from '../components/Admin/Tabs/HomeTab';
import AlumniTab from '../components/Admin/Tabs/AlumniTab';
import SportsTab from '../components/Admin/Tabs/SportsTab';
import CampusLifeTab from '../components/Admin/Tabs/CampusLifeTab';
import ExamsTab from '../components/Admin/Tabs/ExamsTab';
import ActivitiesTab from '../components/Admin/Tabs/ActivitiesTab';
import BlogsTab from '../components/Admin/Tabs/BlogsTab';
import EventsTab from '../components/Admin/Tabs/EventsTab';
import AboutTab from '../components/Admin/Tabs/AboutTab';
import NewsletterTab from '../components/Admin/Tabs/NewsletterTab';
import AwardsGalleryTab from '../components/Admin/Tabs/AwardsGalleryTab';
import LibraryActivitiesTab from '../components/Admin/Tabs/LibraryActivitiesTab';
import LibraryAwardsTab from '../components/Admin/Tabs/LibraryAwardsTab';

const tabs = [
  { label: 'Home', component: <HomeTab /> },
  { label: 'Alumni', component: <AlumniTab /> },
  { label: 'Sports', component: <SportsTab /> },
  { label: 'Campus Life', component: <CampusLifeTab /> },
  { label: 'Exams', component: <ExamsTab /> },
  { label: 'Activities', component: <ActivitiesTab /> },
  { label: 'Blogs', component: <BlogsTab /> },
  { label: 'Events', component: <EventsTab /> },
  { label: 'About SVASC', component: <AboutTab /> },
  { label: 'Newsletter', component: <NewsletterTab /> },
  { label: 'Awards & Achievements', component: <AwardsGalleryTab /> },
  { label: 'Library Activities', component: <LibraryActivitiesTab /> },
  { label: 'Library Awards', component: <LibraryAwardsTab /> },
];

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

  const activeComponent = tabs.find(t => t.label === activeTab)?.component;

  return (
    <div className={styles.adminLayout}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarLogo}>SVASC</div>
          <span className={styles.sidebarTagline}>Admin Panel</span>
        </div>
        <ul className={styles.navLinks}>
          {tabs.map((tab) => (
            <li
              key={tab.label}
              className={`${styles.navItem} ${activeTab === tab.label ? styles.active : ''}`}
              onClick={() => setActiveTab(tab.label)}
            >
              {tab.label}
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
          {activeComponent}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
