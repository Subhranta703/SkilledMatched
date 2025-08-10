import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import LearningRoadmap from './pages/LearningRoadmap';

// Add other roadmap pages as needed
import JobRoles from './pages/JobRoles';
import About from './pages/About';
import ResumeBuilder from './components/ResumeBuilder';
import JobMatching from './components/JobMatcher';
import CoverLetter from './pages/CoverLetter';
import Footer from "./components/Footer";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analyze" element={<ResumeAnalyzer />} />
        <Route path="/roadmap" element={<LearningRoadmap />} />

        <Route path="/roles" element={<JobRoles />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/resume-builder" element={<Resume />} /> */}
       
        <Route path="/job-matcher" element={<JobMatching />} />
        <Route path="/cover-letter" element={<CoverLetter />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />

        {/* Add more routes for data science, UI/UX, etc. */}
      </Routes>
      <Footer />
    </Router>
    
  );
}

export default App;
