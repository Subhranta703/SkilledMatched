import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-blue-600">SkillMatched</div>
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
        <Link to="/analyze" className="text-gray-700 hover:text-blue-600 font-medium">Resume Analyzer</Link>
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">Dashboard</Link>
        <Link to="/roadmap" className="text-gray-700 hover:text-blue-600 font-medium">Roadmap</Link>
        <Link to="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
  About Us
</Link>

      </div>
    </nav>
  );
};

export default Navbar;
