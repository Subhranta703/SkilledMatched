import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Send } from 'lucide-react';

// Main App component for demonstration
export default function App() {
  return (
    <div className="bg-slate-50 font-sans">
      <TestimonialsWithForm />
    </div>
  );
}

// The main component including Testimonials and the Form
const TestimonialsWithForm = () => {
  // --- Testimonial Data ---
  const testimonials = [
    {
      name: "Ananya S.",
      role: "Software Development Intern",
      feedback: "SkillMatched is a game-changer! It instantly highlighted the gaps in my resume and the learning roadmap helped me focus my efforts. I landed my first internship within a month!",
      avatar: "https://placehold.co/100x100/EBF4FF/3B82F6?text=AS",
      rating: 5,
    },
    {
      name: "Rohan P.",
      role: "Frontend Developer",
      feedback: "I was stuck in a tutorial loop. The career suggestions gave me a clear goal, and the roadmap was incredibly practical. I finally felt confident enough to apply and cracked my interview!",
      avatar: "https://placehold.co/100x100/EBF4FF/3B82F6?text=RP",
      rating: 5,
    },
    {
      name: "Megha D.",
      role: "Aspiring Product Manager",
      feedback: "I wasn't sure which career path was right for me. The job role suggestions were surprisingly accurate and aligned perfectly with my interests. I finally have a clear direction.",
      avatar: "https://placehold.co/100x100/EBF4FF/3B82F6?text=MD",
      rating: 4,
    },
  ];

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  // --- Form State & Handler ---
  const [formData, setFormData] = useState({ name: '', role: '', feedback: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Here you would typically send the data to your backend
    setSubmitted(true);
    // Reset form after a delay
    setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', role: '', feedback: '' });
    }, 3000);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* --- Testimonials Section --- */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-slate-800"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Loved by Ambitious Professionals
        </motion.h2>
        <motion.p 
          className="text-lg text-slate-600 text-center mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          See how SkillMatched is helping people achieve their career goals.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-sky-50 to-indigo-100 rounded-2xl p-8 shadow-lg flex flex-col h-full border border-sky-100"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0px 15px 30px -5px rgba(129, 140, 248, 0.2)"}}
              transition={{type: 'spring', stiffness: 300}}
            >
              <div className="flex items-center mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={20} className={i < testimonial.rating ? 'text-amber-400' : 'text-slate-300'} fill={i < testimonial.rating ? 'currentColor' : 'none'} />
                ))}
              </div>
              <div className="relative flex-grow">
                 <Quote className="absolute -top-2 -left-3 w-10 h-10 text-indigo-200/50" />
                 <p className="text-slate-700 italic text-lg z-10 relative">{testimonial.feedback}</p>
              </div>
              <div className="mt-6 flex items-center">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover border-2 border-white" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x100/EBF4FF/3B82F6?text=??'; }} />
                <div className="ml-4">
                  <p className="font-bold text-indigo-800">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* --- Share Your Story Form Section --- */}
        <motion.div 
          className="mt-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-slate-800">Share Your Story</h3>
            <p className="mt-2 text-slate-600">Have a success story with SkillMatched? We'd love to hear it!</p>
          </div>
          
          <div className="mt-8 max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
            {submitted ? (
              <div className="text-center py-8">
                <h4 className="text-2xl font-bold text-green-600">Thank You!</h4>
                <p className="text-slate-600 mt-2">Your story has been submitted successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"/>
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-1">Your Role (e.g., Student)</label>
                    <input type="text" name="role" id="role" value={formData.role} onChange={handleInputChange} required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"/>
                  </div>
                </div>
                <div>
                  <label htmlFor="feedback" className="block text-sm font-medium text-slate-700 mb-1">Your Feedback</label>
                  <textarea name="feedback" id="feedback" rows="4" value={formData.feedback} onChange={handleInputChange} required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"></textarea>
                </div>
                <div>
                  <button type="submit" className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105">
                    <Send size={18} />
                    Submit My Story
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
