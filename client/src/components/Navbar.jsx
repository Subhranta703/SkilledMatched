import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav
      className="bg-white px-6 py-5 sticky top-0 z-50 font-['Exo']"
      // 🔧 Adjust navbar height → change `py-5`, padding → `px-6`
    >
      <div className="flex justify-center items-center">
        <div className="w-full max-w-screen-xl flex justify-between items-center mx-auto">
          
          {/* Logo */}
          <div className="text-2xl tracking-tight text-blue-700 font-['Playwrite_Australia_NSW']">
            <Link to="/">SkillMatched</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-[17px] text-gray-800 font-medium">
            {/* 🔧 Adjust item spacing via `space-x-8` */}
            <Link to="/" className="hover:text-blue-600 transition-all duration-200">Home</Link>
            <Link to="/templates" className="hover:text-blue-600 transition-all duration-200">Templates</Link>
            <Link to="/roadmap" className="hover:text-blue-600 transition-all duration-200">Roadmap</Link>

            {/* Dropdown */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-1 hover:text-blue-600 transition-all duration-200"
              >
                Our Tools <ChevronDown size={18} />
              </button>

              <div
                className={`absolute top-10 left-0 bg-white border rounded-md py-2 w-64 shadow transition-all duration-300 ease-in-out origin-top transform ${
                  isDropdownOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
                }`}
              >
                <Link to="/resume-builder" className="block px-4 py-2 hover:bg-gray-100">Resume Builder</Link>
                <Link to="/resume-analyzer" className="block px-4 py-2 hover:bg-gray-100">Resume Analyzer</Link>
                <Link to="/job-matching" className="block px-4 py-2 hover:bg-gray-100">JD Matching</Link>
                <Link to="/cover-letter" className="block px-4 py-2 hover:bg-gray-100">Cover Letter Generator</Link>
              </div>
            </div>

            <Link to="/about" className="hover:text-blue-600 transition-all duration-200">About Us</Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'max-h-[500px] mt-4' : 'max-h-0'
        }`}
      >
        <div className="space-y-3 text-base font-medium text-gray-800">
          <Link to="/" className="block hover:text-blue-600">Home</Link>
          <Link to="/templates" className="block hover:text-blue-600">Templates</Link>
          <Link to="/roadmap" className="block hover:text-blue-600">Roadmap</Link>

          {/* Dropdown inside mobile */}
          <div>
            <button onClick={toggleDropdown} className="flex items-center gap-1 hover:text-blue-600">
              Our Tools <ChevronDown size={16} />
            </button>
            <div
              className={`ml-4 mt-2 space-y-2 transition-all duration-300 ease-in-out ${
                isDropdownOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'
              }`}
            >
              <Link to="/resume-builder" className="block hover:text-blue-600">Resume Builder</Link>
              <Link to="/resume-analyzer" className="block hover:text-blue-600">Resume Analyzer</Link>
              <Link to="/job-matching" className="block hover:text-blue-600">JD Matching</Link>
              <Link to="/cover-letter" className="block hover:text-blue-600">Cover Letter Generator</Link>
            </div>
          </div>

          <Link to="/about" className="block hover:text-blue-600">About Us</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
