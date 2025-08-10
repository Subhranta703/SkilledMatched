import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import HeroSection from '../components/home/Hero';
import FeaturesSection from '../components/home/Features';
import TestimonialsSection from '../components/home/Testimonials';
import CTASection from '../components/home/CTA';
const Home = () => {
  const analyzerRef = useRef(null);
  const navigate = useNavigate();

  const scrollToAnalyzer = () => {
    analyzerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex flex-col justify-between">
      {/* Hero Section */}
      <section className="relative h-screen px-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-b-3xl shadow-md overflow-hidden flex items-center justify-center">
  {/* Decorative Blur Background Blobs */}
  <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 opacity-30 rounded-full blur-3xl animate-pulse -z-10" />
  <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-200 opacity-30 rounded-full blur-3xl animate-pulse -z-10" />

  {/* Main Content */}
  <div className="text-center max-w-3xl mx-auto">
    <motion.h1
      className="text-4xl md:text-6xl font-extrabold text-blue-800 mb-4 leading-tight"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      Welcome to <span className="text-blue-600">SkillMatched</span>
    </motion.h1>

    <motion.p
      className="text-lg md:text-xl text-gray-700 max-w-xl mx-auto mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
    >
      Your AI-powered assistant for career guidance, resume analysis, and personalized learning paths.
    </motion.p>

    {/* CTA Buttons */}
    <motion.div
      className="flex flex-col md:flex-row justify-center gap-4"
      ref={analyzerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      <Link to="/analyze">
        <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition-transform transform hover:scale-105">
          Analyze Your Resume <ArrowRight size={18} />
        </button>
      </Link>

      <Link to="/roadmap">
        <button className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3 rounded-lg transition-transform transform hover:scale-105">
          Explore Career Roadmaps
        </button>
      </Link>
    </motion.div>

    {/* Optional: Scroll Hint */}
    <div className="mt-16 text-gray-400 text-sm animate-bounce">
      Scroll down to explore more ↓
    </div>
  </div>
</section>



      {/* Features Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
  <motion.h2
    className="text-4xl font-bold text-center mb-16 text-gray-800"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    What We Offer
  </motion.h2>

  <div className="grid md:grid-cols-3 gap-10">
    {/* Resume Analysis */}
    <motion.div
      className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 text-center cursor-pointer"
      onClick={scrollToAnalyzer}
      whileHover={{ scale: 1.03 }}
    >
      <h3 className="text-xl font-bold mb-3 text-blue-600">Resume Analysis</h3>
      <p className="text-gray-600">
        Instantly identify gaps, highlight strengths, and optimize your resume for job success.
      </p>
    </motion.div>

    {/* Job Role Suggestions */}
    <motion.div
      className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 text-center cursor-pointer"
      onClick={() => navigate('/roles')}
      whileHover={{ scale: 1.03 }}
    >
      <h3 className="text-xl font-bold mb-3 text-blue-600">Job Role Suggestions</h3>
      <p className="text-gray-600">
        Discover tailored job roles that match your skills, experience, and interests.
      </p>
    </motion.div>

    {/* Learning Roadmap */}
    <motion.div
      className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 text-center cursor-pointer"
      onClick={() => navigate('/roadmap')}
      whileHover={{ scale: 1.03 }}
    >
      <h3 className="text-xl font-bold mb-3 text-blue-600">Learning Roadmap</h3>
      <p className="text-gray-600">
        Get a step-by-step roadmap with curated resources to bridge your skill gaps.
      </p>
    </motion.div>
  </div>

  {/* Decorative Footer Message */}
  <motion.div
    className="mt-14 text-center text-gray-500 italic text-sm"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.6, duration: 1 }}
  >
    Explore more things and shape your journey your way... <br />
    <span className="text-blue-400">[this is just a demo — fill this with your thoughts ✨]</span>
  </motion.div>
</section>
      {/* Testimonials Section */}
      {/* <section className="bg-white py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">What Users Say</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              name: "Ananya S.",
              feedback: "SkillMatched helped me land my first internship by fixing my resume gaps!",
            },
            {
              name: "Rohan P.",
              feedback: "I followed the learning roadmap and cracked my frontend developer interview!",
            },
            {
              name: "Megha D.",
              feedback: "The career suggestions were spot on. I’m now confident about my goals.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-blue-50 p-6 rounded-xl text-gray-700 shadow-sm hover:shadow-md transition"
            >
              <p className="text-md mb-3 italic">"{item.feedback}"</p>
              <p className="font-semibold text-blue-600">— {item.name}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="bg-blue-100 py-12 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to transform your career?</h3>
        <p className="text-gray-600 mb-6">Let SkillMatched guide your path with intelligent insights.</p>
        <Link to="/analyze">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold">
            Get Started Now
          </button>
        </Link>
      </section> */}

      {/* Footer Section */}
      {/* <HeroSection /> */}
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};

export default Home;
