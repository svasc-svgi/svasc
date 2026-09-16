
import Exam from './pages/Exam';
import Home from './pages/Home';
import CampusLife from './pages/CampusLife';
import Sports from './pages/Sports';
import Alumni from './pages/Alumni';
import UserLayout from './pages/UserLayout';
import Blogs from './pages/Blogs';
import Programms from './pages/Programms';
import ProgramDetails from './pages/ProgramDetails';
import Events from './pages/Events';
import Activities from './pages/Activities';
import DynamicClubDetail from './pages/DynamicClubDetail';
import Placement from './pages/Placement';
import Statistics from './pages/Statistics';
import AboutSVASC from './pages/AboutSVASC';
import Vision from './pages/Vision';
import Timeline from './pages/Timeline';
import PrincipalMessage from './components/Leadership/PrincipalMessage';
import SecretaryMessage from './components/Leadership/SecretaryMessage';
import ChairmanMessage from './components/Leadership/ChairmanMessage';
import AwardsGallery from './pages/AwardsGallery';
import NewsLetter from './pages/NewsLetter';
import WhySvasc from './pages/WhySvasc';
import Admission from './pages/Admission';
import AdminDashboard from './pages/AdminDashboard';
import Cafeteria from './components/Facilities/Cafeteria';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/Common/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import LMS from './components/Facilities/LMS';
import Hostel from './components/Facilities/Hostel';
import SmartClass from './components/Facilities/SmartClass';
import Transport from './components/Facilities/Transport';
import Laboratory from './components/Facilities/Laboratory';
import LibraryPortal from './components/Facilities/LibraryPortal';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ErrorBoundary>
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
      </ErrorBoundary>
    </Router>
  );
}


export default App;
