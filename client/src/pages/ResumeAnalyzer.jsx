// client/src/pages/ResumeAnalyzer.jsx
import React, { useState, useEffect } from 'react';
import UploadBox from '../components/UploadBox';
import { resumeAPI } from '../services/api';

const ResumeAnalyzer = () => {
  const [role, setRole] = useState('HR');
  const [backendOnline, setBackendOnline] = useState(true);

  // Check backend connection silently
  useEffect(() => {
    const checkBackend = async () => {
      try {
        await resumeAPI.health();
        setBackendOnline(true);
      } catch (error) {
        setBackendOnline(false);
        console.error('Backend connection failed:', error);
      }
    };
    
    checkBackend();
    // Check every 30 seconds
    const interval = setInterval(checkBackend, 30000);
    return () => clearInterval(interval);
  }, []);

  const roleInfo = {
    'HR': {
      title: 'HR Recruiter',
      icon: '👔',
      description: 'Focuses on skills match, experience relevance, and cultural fit for recruitment',
      color: 'from-blue-50 to-blue-100',
      border: 'border-blue-200'
    },
    'SDE': {
      title: 'Software Engineer',
      icon: '👨‍💻',
      description: 'Evaluates technical skills, project complexity, code quality, and problem-solving',
      color: 'from-green-50 to-green-100',
      border: 'border-green-200'
    },
    'MANAGER': {
      title: 'Engineering Manager',
      icon: '👨‍💼',
      description: 'Looks for leadership experience, team impact, project management, and delivery',
      color: 'from-purple-50 to-purple-100',
      border: 'border-purple-200'
    },
    'CEO': {
      title: 'Startup Founder / CEO',
      icon: '🚀',
      description: 'Assesses initiative, innovation, business impact, and problem-solving approach',
      color: 'from-orange-50 to-orange-100',
      border: 'border-orange-200'
    }
  };

  const currentRole = roleInfo[role];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            AI Resume Analyzer
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Get professional feedback on your resume from different industry perspectives
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Choose Review Perspective
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {Object.entries(roleInfo).map(([key, info]) => (
              <button
                key={key}
                onClick={() => setRole(key)}
                className={`p-5 rounded-xl border-2 text-left transition-all duration-200 transform hover:-translate-y-1 ${
                  role === key
                    ? `${info.color} ${info.border} border-2 shadow-lg scale-[1.02]`
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{info.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{info.title}</h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{info.description}</p>
                  </div>
                </div>
                {role === key && (
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <div className="text-xs text-gray-500">Currently Selected</div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Current Role Highlight */}
          <div className={`p-5 rounded-xl bg-gradient-to-r ${currentRole.color} border ${currentRole.border}`}>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="text-4xl">{currentRole.icon}</div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-xl">{currentRole.title} Perspective</h3>
                <p className="text-gray-700 mt-1">{currentRole.description}</p>
              </div>
              <div className="bg-white px-4 py-2 rounded-lg border border-gray-300">
                <span className="font-medium text-gray-700">Selected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Box */}
        <div className="mb-12">
          <UploadBox selectedRole={role} />
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-10">
            Comprehensive Resume Analysis
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-blue-600 text-3xl mb-4">📊</div>
              <h4 className="font-bold text-lg mb-3">Intelligent Scoring</h4>
              <p className="text-gray-600">
                Get a detailed score based on industry standards and role-specific criteria.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-green-600 text-3xl mb-4">🎯</div>
              <h4 className="font-bold text-lg mb-3">Targeted Feedback</h4>
              <p className="text-gray-600">
                Receive actionable suggestions tailored to what each professional role values most.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-purple-600 text-3xl mb-4">📈</div>
              <h4 className="font-bold text-lg mb-3">Job Matching</h4>
              <p className="text-gray-600">
                Discover suitable job roles with match percentages and improvement areas.
              </p>
            </div>
          </div>
        </div>

        {/* Backend Warning (Only shown when offline) */}
        {!backendOnline && (
          <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg max-w-sm animate-bounce">
            <div className="flex items-center">
              <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <p className="font-medium">Backend Server Offline</p>
                <p className="text-sm opacity-90">Start server at localhost:5000</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalyzer;