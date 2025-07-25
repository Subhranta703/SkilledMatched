import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
      <div className="text-2xl font-bold text-blue-600">
        <Link to="/">SkillMatched</Link>
      </div>
      <div className="space-x-6 text-sm md:text-base">
        <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
        <Link to="/resume-builder" className="text-gray-700 hover:text-blue-600 font-medium">Resume Builder</Link>
        <Link to="/resume-analyzer" className="text-gray-700 hover:text-blue-600 font-medium">Resume Analyzer</Link>
        <Link to="/job-matching" className="text-gray-700 hover:text-blue-600 font-medium">JD Matching</Link>
        <Link to="/cover-letter" className="text-gray-700 hover:text-blue-600 font-medium">Cover Letter Generator</Link>
        <Link to="/templates" className="text-gray-700 hover:text-blue-600 font-medium">Templates</Link>
        <Link to="/roadmap" className="text-gray-700 hover:text-blue-600 font-medium">Roadmap</Link>
        <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">About</Link>
      </div>
    </nav>
  );
};

export default Navbar;
