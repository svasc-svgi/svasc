import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/Common/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import UserLayout from './pages/UserLayout';

// Lazy-load all pages — each becomes its own JS chunk, loaded only when visited
const Home = lazy(() => import('./pages/Home'));
const Events = lazy(() => import('./pages/Events'));
const Programms = lazy(() => import('./pages/Programms'));
const ProgramDetails = lazy(() => import('./pages/ProgramDetails'));
const Activities = lazy(() => import('./pages/Activities'));
const DynamicClubDetail = lazy(() => import('./pages/DynamicClubDetail'));
const Blogs = lazy(() => import('./pages/Blogs'));
const Sports = lazy(() => import('./pages/Sports'));
const Exam = lazy(() => import('./pages/Exam'));
const CampusLife = lazy(() => import('./pages/CampusLife'));
const Alumni = lazy(() => import('./pages/Alumni'));
const Placement = lazy(() => import('./pages/Placement'));
const Statistics = lazy(() => import('./pages/Statistics'));
const AboutSVASC = lazy(() => import('./pages/AboutSVASC'));
const Vision = lazy(() => import('./pages/Vision'));
const Timeline = lazy(() => import('./pages/Timeline'));
const PrincipalMessage = lazy(() => import('./components/Leadership/PrincipalMessage'));
const SecretaryMessage = lazy(() => import('./components/Leadership/SecretaryMessage'));
const ChairmanMessage = lazy(() => import('./components/Leadership/ChairmanMessage'));
const AwardsGallery = lazy(() => import('./pages/AwardsGallery'));
const NewsLetter = lazy(() => import('./pages/NewsLetter'));
const WhySvasc = lazy(() => import('./pages/WhySvasc'));
const Admission = lazy(() => import('./pages/Admission'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Cafeteria = lazy(() => import('./components/Facilities/Cafeteria'));
const LMS = lazy(() => import('./components/Facilities/LMS'));
const Hostel = lazy(() => import('./components/Facilities/Hostel'));
const SmartClass = lazy(() => import('./components/Facilities/SmartClass'));
const Transport = lazy(() => import('./components/Facilities/Transport'));
const Laboratory = lazy(() => import('./components/Facilities/Laboratory'));
const LibraryPortal = lazy(() => import('./components/Facilities/LibraryPortal'));

// Minimal inline spinner shown while a page chunk is being fetched
const PageLoader = () => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    minHeight: '60vh', fontSize: '1rem', color: '#666'
  }}>
    Loading...
  </div>
);

import React, { useEffect } from 'react';
import { warmUpBackend } from './services/apiClient';

function App() {
  useEffect(() => {
    warmUpBackend();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<UserLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/programms" element={<Programms />} />
              <Route path="/program/:id" element={<ProgramDetails />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/activities/:category" element={<Activities />} />
              <Route path="/activities/:category/:slug" element={<DynamicClubDetail />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/sports" element={<Sports />} />
              <Route path="/exam" element={<Exam />} />
              <Route path="/campus-life" element={<CampusLife />} />
              <Route path="/alumni" element={<Alumni />} />
              <Route path="/placement" element={<Placement />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/about" element={<AboutSVASC />} />
              <Route path="/vision-mission" element={<Vision />} />
              <Route path="/milestones" element={<Timeline />} />
              <Route path="/principal" element={<PrincipalMessage />} />
              <Route path="/secretary" element={<SecretaryMessage />} />
              <Route path="/chairman" element={<ChairmanMessage />} />
              <Route path="/awards" element={<AwardsGallery />} />
              <Route path="/news" element={<NewsLetter />} />
              <Route path="/newsletter" element={<NewsLetter />} />
              <Route path="/why-svasc" element={<WhySvasc />} />
              <Route path="/cafeteria" element={<Cafeteria />} />
              <Route path="/lms" element={<LMS />} />
              <Route path="/hostel" element={<Hostel />} />
              <Route path="/smart-class" element={<SmartClass />} />
              <Route path="/transport" element={<Transport />} />
              <Route path="/laboratory" element={<Laboratory />} />
              <Route path="/library" element={<LibraryPortal />} />
              {/* Dynamic Route for ALL current & future Clubs, Cells & Committees */}
              <Route path="/:slug" element={<DynamicClubDetail />} />
            </Route>
            <Route path="/admission" element={<Admission />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}

export default App;