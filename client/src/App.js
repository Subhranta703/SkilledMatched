import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import LearningRoadmap from './pages/LearningRoadmap';
import FullStackRoadmap from './pages/roadmaps/FullStackRoadmap';
// Add other roadmap pages as needed
import JobRoles from './pages/JobRoles';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analyze" element={<ResumeAnalyzer />} />
        <Route path="/roadmap" element={<LearningRoadmap />} />
        <Route path="/roadmap/fullstack" element={<FullStackRoadmap />} />
        <Route path="/roles" element={<JobRoles />} />
        <Route path="/about" element={<About />} />

        {/* Add more routes for data science, UI/UX, etc. */}
      </Routes>
    </Router>
  );
}

export default App;
