import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, FileText, TrendingUp, Lightbulb, Briefcase } from 'lucide-react';

// Main App component for demonstration
export default function App() {
  // Dummy navigation function
  const navigate = (path) => console.log(`Navigating to ${path}`);
  
  return (
    <div className="bg-white font-sans">
      <CTASection navigate={navigate} />
    </div>
  );
}

// Helper component for the floating icons
const FloatingIcon = ({ icon, className, animation }) => {
  const IconComponent = icon;
  return (
    <motion.div
      className={`absolute text-white/20 ${className}`}
      animate={animation.animate}
      transition={animation.transition}
    >
      <IconComponent size={animation.size} />
    </motion.div>
  );
};


// The Redesigned Call-to-Action (CTA) Section Component
const CTASection = ({ navigate }) => {

  const icons = [
    { 
      icon: FileText, 
      className: 'top-[15%] left-[10%]', 
      animation: { 
        size: 48,
        animate: { y: [0, -15, 0] },
        transition: { duration: 4, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
      } 
    },
    { 
      icon: TrendingUp, 
      className: 'top-[20%] right-[15%] hidden sm:block', 
      animation: { 
        size: 64,
        animate: { y: [0, 20, 0], x: [0, 10, 0] },
        transition: { duration: 5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 1 }
      } 
    },
    { 
      icon: Lightbulb, 
      className: 'bottom-[15%] left-[20%] hidden lg:block', 
      animation: { 
        size: 40,
        animate: { y: [0, 10, 0] },
        transition: { duration: 3.5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 0.5 }
      } 
    },
     { 
      icon: Briefcase, 
      className: 'bottom-[25%] right-[5%]', 
      animation: { 
        size: 56,
        animate: { y: [0, -10, 0], x: [0, -15, 0] },
        transition: { duration: 6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 2 }
      } 
    },
  ];

  return (
    <section className="py-20 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative bg-gradient-to-br from-indigo-500 to-sky-500 rounded-2xl shadow-2xl shadow-indigo-500/30 overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Decorative background elements & Floating Icons */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
              <div className="w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            </div>
            <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2">
              <div className="w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            </div>
            {/* Render the floating icons */}
            {icons.map((item, index) => (
              <FloatingIcon key={index} {...item} />
            ))}
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between text-center lg:text-left gap-8 p-10 sm:p-16">
            {/* Text Content */}
            <div className="max-w-xl">
              <div className="flex justify-center lg:justify-start items-center gap-2 mb-4">
                <Sparkles className="text-amber-300" size={24} />
                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  Ready to Transform Your Career?
                </h2>
              </div>
              <p className="text-lg text-indigo-100">
                Stop guessing and start building a future you're excited about. Let our AI-powered insights guide your next move. Your personalized career path is just a click away.
              </p>
            </div>

            {/* Button */}
            <motion.button
              onClick={() => navigate('/analyze')}
              className="flex-shrink-0 w-full lg:w-auto bg-white text-indigo-600 font-bold px-8 py-4 rounded-full shadow-lg text-lg flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 25px rgba(255, 255, 255, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Get Started Now
              <ArrowRight size={20} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
