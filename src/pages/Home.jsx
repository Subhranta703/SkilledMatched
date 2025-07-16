import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const analyzerRef = useRef(null);
  const navigate = useNavigate();

  const scrollToAnalyzer = () => {
    analyzerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100">
      {/* Hero Section */}
      <section className="text-center py-20 px-6 bg-blue-50 rounded-b-3xl shadow-md">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">
          Welcome to SkillMatched
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-6">
          Your AI-powered assistant for career guidance, resume analysis, and personalized learning paths.
        </p>
        <div ref={analyzerRef}>
          <Link to="/analyze">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200">
              Analyze Your Resume
            </button>
          </Link>
        </div>
        <Link to="/roadmap">
          <button className="mt-6 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
            Explore Career Roadmaps
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">What We Offer</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div
            className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition duration-300 text-center cursor-pointer"
            onClick={scrollToAnalyzer}
          >
            <h3 className="text-xl font-bold mb-2 text-blue-600">Resume Analysis</h3>
            <p className="text-gray-600">
              Instantly identify gaps, highlight strengths, and optimize your resume for job success.
            </p>
          </div>

          <div
            className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition duration-300 text-center cursor-pointer"
            onClick={() => navigate('/roles')}
          >
            <h3 className="text-xl font-bold mb-2 text-blue-600">Job Role Suggestions</h3>
            <p className="text-gray-600">
              Discover tailored job roles that match your skills, experience, and interests.
            </p>
          </div>

          <div
            className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition duration-300 text-center cursor-pointer"
            onClick={() => navigate('/roadmap')}
          >
            <h3 className="text-xl font-bold mb-2 text-blue-600">Learning Roadmap</h3>
            <p className="text-gray-600">
              Get a step-by-step roadmap with curated resources to bridge your skill gaps.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="bg-white py-10 mt-10 text-center text-gray-600 border-t">
        <p>&copy; {new Date().getFullYear()} SkillMatched · Built with ❤️</p>
        <p>vibe coder SKN</p>
      </section>
    </div>
  );
};

export default Home;
