import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold mb-3 text-blue-400">SkillMatched</h2>
          <p className="text-sm">
            Helping job seekers align their resumes, cover letters, and skills
            to real-world job demands through AI-powered insights.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
            <li><Link to="/analyze" className="hover:text-blue-400">Resume Analyzer</Link></li>
            <li><Link to="/roadmap" className="hover:text-blue-400">Roadmap</Link></li>
            <li><Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link></li>
            <li><Link to="/about" className="hover:text-blue-400">About Us</Link></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p className="text-sm">Email: support@skillmatched.com</p>
        
<div className="flex gap-4 mt-3">
  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
    LinkedIn
  </a>
  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
    GitHub
  </a>
  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
    Twitter
  </a>
</div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} SkillMatched. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
