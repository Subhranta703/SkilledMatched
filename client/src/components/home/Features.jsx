import React from 'react';
import { motion } from 'framer-motion';
import { FileSearch, Briefcase, Map, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Wrap the component in React.forwardRef to accept the 'ref' from Home.jsx
const FeaturesSection = React.forwardRef((props, ref) => {
  // Use the useNavigate hook from react-router-dom for navigation
  const navigate = useNavigate();

  // This is the function that will be passed from Home.jsx to handle scrolling
  const { onResumeClick } = props;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 10 },
    },
  };
  
  const features = [
    {
      icon: <FileSearch size={40} className="text-indigo-500" />,
      title: "Resume Analysis",
      description: "Instantly identify gaps, highlight strengths, and optimize your resume for job success.",
      // Use the function passed down from the parent for this specific action
      onClick: onResumeClick,
    },
    {
      icon: <Briefcase size={40} className="text-indigo-500" />,
      title: "Job Role Suggestions",
      description: "Discover tailored job roles that match your skills, experience, and interests.",
      // Use the navigate function for routing
      onClick: () => navigate('/roles'),
    },
    {
      icon: <Map size={40} className="text-indigo-500" />,
      title: "Learning Roadmap",
      description: "Get a step-by-step roadmap with curated resources to bridge your skill gaps.",
      // Use the navigate function for routing
      onClick: () => navigate('/roadmap'),
    },
  ];

  return (
    // Attach the ref to the section so Home.jsx can scroll to it
    <section ref={ref} className="bg-white py-20 px-4 max-w-6xl mx-auto w-full">
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
      >
        Shape Your Career Journey
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-slate-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col items-start text-left group"
            onClick={feature.onClick}
            variants={itemVariants}
            whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }}
          >
            <div className="bg-indigo-100 p-4 rounded-full mb-6">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
            <p className="text-gray-600 mb-6 flex-grow">{feature.description}</p>
            <div className="flex items-center text-indigo-600 font-semibold">
              Learn More
              <ArrowRight size={16} className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
});

export default FeaturesSection;

// In your pages/Home.jsx file

