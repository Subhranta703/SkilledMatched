import React, { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { 
  Target, Rocket, Telescope, Bot, BarChart2, 
  History, Briefcase, BrainCircuit, Mail, Users, 
  ShieldCheck, HeartHandshake, Zap, GitCommit, 
  Database, Wind, XCircle, CheckCircle, BookOpen 
} from 'lucide-react';

// --- Helper Component for Animated Counters ---
const AnimatedCounter = ({ value, text }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const springValue = useSpring(isInView ? value : 0, {
        mass: 0.8,
        stiffness: 70,
        damping: 15,
    });
    const displayValue = useTransform(springValue, (current) => 
        Math.round(current).toLocaleString()
    );

    return (
        <div ref={ref} className="text-center">
            <p className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-sky-500">
                <motion.span>{displayValue}</motion.span>+
            </p>
            <p className="text-sm text-slate-500 mt-1">{text}</p>
        </div>
    );
};

// --- Main About Page Component ---
const AboutPage = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const creators = [
    { 
      name: 'Subhranta Nayak', 
      role: 'Creator & Lead Developer', 
      avatar: 'https://ui-avatars.com/api/?name=Subhranta+Nayak&background=3B82F6&color=fff&size=120&bold=true',
      quote: "Passionate about leveraging technology to solve real-world problems and make high-quality career guidance accessible to everyone.", 
      contact: 'mailto:skninfoo@gmail.com' 
    },
    { 
      name: 'Rakesh Kumar Patra', 
      role: 'Co-Developer & UI/UX Specialist', 
      avatar: 'https://ui-avatars.com/api/?name=Rakesh+Patra&background=3B82F6&color=fff&size=120&bold=true',
      quote: "Dedicated to crafting intuitive and beautiful user interfaces that make complex tools feel simple and delightful to use.", 
      contact: 'mailto:rakesh@example.com' 
    }
  ];

  const timelineEvents = [
    { icon: <Bot size={24} />, title: "AI Guidance Chatbot", description: "Get instant answers and career advice." },
    { icon: <BarChart2 size={24} />, title: "Resume Scoring System", description: "Receive actionable insights to improve your score." },
    { icon: <History size={24} />, title: "Progress & History Tracker", description: "Track your resume versions and improvements." },
    { icon: <Briefcase size={24} />, title: "Curated Job Matching", description: "Find jobs and internships tailored to you." },
    { icon: <BrainCircuit size={24} />, title: "Smart Skill Assessments", description: "Test your skills with intelligent quizzes." },
  ];
  
  const coreValues = [
      { icon: <HeartHandshake size={24} />, title: "User-Centric", description: "We build for you. Your career goals are at the center of every feature we design." },
      { icon: <ShieldCheck size={24} />, title: "Data Privacy", description: "Your data is yours. We are committed to the highest standards of privacy and security." },
      { icon: <Zap size={24} />, title: "Continuous Innovation", description: "We are always learning and improving, ensuring our tools are always cutting-edge." }
  ];
  
  const techStack = [
      { icon: <Rocket size={20} />, name: 'React', description: 'For a fast and interactive user interface.' },
      { icon: <GitCommit size={20} />, name: 'Node.js', description: 'Powering our robust and scalable backend.' },
      { icon: <Database size={20} />, name: 'MongoDB', description: 'Flexible and powerful database solutions.' },
      { icon: <Wind size={20} />, name: 'Tailwind CSS', description: 'For rapid and modern UI development.' },
      { icon: <Bot size={20} />, name: 'Google AI', description: 'The brains behind our intelligent analysis.' },
  ];

  // Fix: Added missing useEffect to handle cleanup if needed
  useEffect(() => {
    // Any cleanup or side effects can go here
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="bg-slate-50 text-slate-800 font-sans">
      {/* --- Hero Section --- */}
      <div className="relative text-center bg-gradient-to-br from-sky-50 to-indigo-100 py-20 sm:py-28 px-4">
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-indigo-800" 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          About SkillMatched
        </motion.h1>
        <motion.p 
          className="mt-4 max-w-2xl mx-auto text-lg text-slate-600" 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          An AI-powered career guidance platform designed to bridge the gap between your ambition and your next achievement.
        </motion.p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-20 sm:space-y-28">
        
        {/* Our Story Section */}
        <motion.section 
          variants={sectionVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-indigo-100 text-indigo-700 font-semibold px-4 py-2 rounded-full mb-4">
              <BookOpen size={20} />
              <span>Our Story</span>
            </div>
            <h2 className="text-3xl font-bold">The Motivation Behind SkillMatched</h2>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-slate-600 leading-relaxed space-y-4">
            <p>
              We've all been there: staring at a resume, wondering if it's "good enough." We've scrolled through endless job postings, feeling unsure about which skills to learn next. The world of career development can often feel like a maze with no map.
            </p>
            <p>
              <strong>SkillMatched was born from this shared frustration.</strong> Our motivation was to create the tool we wished we had—a smart, unbiased, and deeply personal guide to help navigate the complexities of the modern job market.
            </p>
            <p>
              This project is dedicated to every student preparing for their first internship, every professional aiming for a promotion, and every ambitious individual who believes in the power of continuous learning. We're here to replace uncertainty with clarity and provide a data-driven path to help you achieve your goals.
            </p>
          </div>
        </motion.section>

        {/* Statistics Section */}
        <motion.section 
          variants={sectionVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-2">Our Impact in Numbers</h2>
          <p className="text-slate-500 text-center mb-12">We're proud of the progress so far and excited for what's to come.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedCounter value={10000} text="Resumes Analyzed" />
            <AnimatedCounter value={5000} text="Users Guided" />
            <AnimatedCounter value={1200} text="Skills Mapped" />
            <AnimatedCounter value={800} text="Roadmaps Generated" />
          </div>
        </motion.section>

        {/* Problem vs Solution Section */}
        <motion.section 
          variants={sectionVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">From Confusion to Clarity</h2>
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* The Problem */}
            <div className="bg-slate-100 p-8 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <XCircle className="text-red-500" size={28}/>
                <h3 className="text-xl font-bold">The Old Way: Generic & Unclear</h3>
              </div>
              <ul className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="opacity-50" aria-hidden="true">❌</span>
                  <span>Endless articles with vague, one-size-fits-all advice.</span>
                </li>
                <li className="flex gap-3">
                  <span className="opacity-50" aria-hidden="true">❌</span>
                  <span>Uncertainty about which skills are actually in demand.</span>
                </li>
                <li className="flex gap-3">
                  <span className="opacity-50" aria-hidden="true">❌</span>
                  <span>Feeling stuck and unsure of the next step to take.</span>
                </li>
              </ul>
            </div>
            
            {/* The Solution */}
            <div className="bg-indigo-600 text-white p-8 rounded-2xl shadow-lg shadow-indigo-500/30">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="text-green-300" size={28}/>
                <h3 className="text-xl font-bold">The SkillMatched Way: Smart & Personal</h3>
              </div>
              <ul className="space-y-3 text-indigo-100">
                <li className="flex gap-3">
                  <span className="text-green-300">✔</span>
                  <span>AI-driven analysis of your specific resume for tailored feedback.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-300">✔</span>
                  <span>A clear, step-by-step learning path to bridge your skill gaps.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-300">✔</span>
                  <span>Confidence in your career direction, backed by data.</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Our Mission Section */}
        <motion.section 
          className="grid md:grid-cols-2 gap-12 items-center" 
          variants={sectionVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-3 bg-indigo-100 text-indigo-700 font-semibold px-4 py-2 rounded-full mb-4">
              <Rocket size={20} />
              <span>Our Mission</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">Empowering Your Professional Journey</h2>
            <p className="text-slate-600 leading-relaxed">
              Our mission is to democratize career guidance. We provide smart, personalized, and data-driven tools that adapt to your unique skills and aspirations, ensuring you're always on the right path.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-48 h-48 relative">
              <motion.div 
                className="absolute inset-0 bg-indigo-200 rounded-full" 
                animate={{ scale: [1, 1.1, 1] }} 
                transition={{ duration: 5, repeat: Infinity }}
                aria-hidden="true"
              />
              <motion.div 
                className="absolute inset-4 bg-indigo-300 rounded-full" 
                animate={{ scale: [1, 0.9, 1] }} 
                transition={{ duration: 4, repeat: Infinity }}
                aria-hidden="true"
              />
              <Target size={60} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" strokeWidth={1.5} />
            </div>
          </div>
        </motion.section>
        
        {/* Core Values Section */}
        <motion.section 
          variants={sectionVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-lg border border-slate-100 hover:shadow-indigo-100 hover:-translate-y-1 transition-all">
                <div className="mx-auto w-16 h-16 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full mb-4">
                  {value.icon}
                </div>
                <h3 className="font-bold text-lg">{value.title}</h3>
                <p className="text-slate-600 text-sm mt-1">{value.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Technology Spotlight Section */}
        <motion.section 
          variants={sectionVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Technology Spotlight</h2>
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4">
            {techStack.map((tech, index) => (
              <div key={index} className="flex items-center gap-3 text-slate-600">
                {tech.icon}
                <span className="font-semibold">{tech.name}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Timeline Section */}
        <motion.section 
          variants={sectionVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-sky-100 text-sky-700 font-semibold px-4 py-2 rounded-full mb-4">
              <Telescope size={20} />
              <span>The Journey Ahead</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">What's Coming Next?</h2>
            <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto mb-12">
              SkillMatched is constantly evolving. Here's a sneak peek at the exciting new features currently in development.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-slate-200" aria-hidden="true" />
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <motion.div 
                  key={index} 
                  className="relative flex items-center" 
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ duration: 0.5 }}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left order-2'}`}>
                    <div className="p-4 bg-white rounded-lg shadow-md border border-slate-100">
                      <h3 className="font-bold">{event.title}</h3>
                      <p className="text-sm text-slate-500">{event.description}</p>
                    </div>
                  </div>
                  <div className="w-1/2 flex justify-center order-1">
                    <div className="z-10 bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center">
                      {event.icon}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
        
        {/* Team Section */}
        <motion.section 
          className="text-center bg-white p-8 sm:p-12 rounded-2xl shadow-lg border border-slate-100" 
          variants={sectionVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="inline-flex items-center gap-3 bg-indigo-100 text-indigo-700 font-semibold px-4 py-2 rounded-full mb-8">
            <Users size={20} />
            <span>Meet the Team</span>
          </div>
          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {creators.map((creator, index) => (
              <div key={index} className="flex flex-col items-center">
                <img 
                  src={creator.avatar} 
                  alt={`Avatar of ${creator.name}`}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-md" 
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(creator.name)}&background=3B82F6&color=fff&size=96`;
                  }}
                />
                <h4 className="text-xl font-bold text-slate-800">{creator.name}</h4>
                <p className="text-indigo-600 font-semibold">{creator.role}</p>
                <p className="mt-2 text-slate-600 text-sm flex-grow">"{creator.quote}"</p>
                <a 
                  href={creator.contact} 
                  className="mt-4 inline-flex items-center gap-2 bg-slate-100 text-slate-700 font-semibold px-4 py-2 rounded-lg hover:bg-slate-200 transition-colors"
                  aria-label={`Contact ${creator.name}`}
                >
                  <Mail size={16} /> Contact
                </a>
              </div>
            ))}
          </div>
          <p className="mt-12 text-slate-400 text-xs">
            © {new Date().getFullYear()} SkillMatched · Created by Subhranta Nayak & Rakesh Kumar Patra
          </p>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutPage;