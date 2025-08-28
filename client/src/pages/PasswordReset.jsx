import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Send, CheckCircle } from 'lucide-react';

// --- Main Forgot Password Page Component ---
const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle submission logic here (e.g., API call to send reset email)
        console.log("Password reset requested for:", email);
        setIsSubmitted(true);
    };

    return (
        <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4 font-sans">
            <div className="grid lg:grid-cols-2 w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden">
                
                {/* --- Left Column: Informational Message --- */}
                <div className="hidden lg:block p-12 bg-gradient-to-br from-indigo-500 to-sky-500 text-white">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-4xl font-bold mb-4">Forgot Your Password?</h2>
                        <p className="opacity-80">
                            No problem. Just enter the email address you used to sign up, and we'll send you a link to reset your password.
                        </p>
                        <div className="mt-8 w-full h-48 bg-white/20 rounded-lg flex items-center justify-center">
                            <Mail size={64} className="opacity-30" />
                        </div>
                    </motion.div>
                </div>

                {/* --- Right Column: Form --- */}
                <div className="p-8 sm:p-12 flex items-center">
                    <motion.div
                        className="w-full"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {isSubmitted ? (
                            <div className="text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.1, type: 'spring' }}
                                >
                                    <CheckCircle className="w-20 h-20 bg-green-100 text-green-600 rounded-full p-4 mx-auto" />
                                </motion.div>
                                <h3 className="text-2xl font-bold text-slate-900 mt-6 mb-2">Check Your Email</h3>
                                <p className="text-slate-500">
                                    We've sent a password reset link to <span className="font-semibold text-indigo-600">{email}</span>. Please follow the instructions in the email to continue.
                                </p>
                                <a href="/login" className="mt-8 inline-block text-indigo-600 font-semibold hover:underline">
                                    &larr; Back to Log In
                                </a>
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-3xl font-bold text-slate-900 mb-2">Reset Your Password</h3>
                                <p className="text-slate-500 mb-8">
                                    Remember your password? <a href="/login" className="text-indigo-600 font-semibold hover:underline">Log in here</a>
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                        <input 
                                            type="email" 
                                            placeholder="Email Address" 
                                            required 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" 
                                        />
                                    </div>
                                    
                                    <button type="submit" className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold px-6 py-3 rounded-lg shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105">
                                        Send Reset Link <Send size={18} />
                                    </button>
                                </form>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
