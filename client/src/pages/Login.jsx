import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, Mail, Lock } from 'lucide-react';

// A simple SVG component for the Google icon
const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.99,36.506,44,30.836,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);

// A simple SVG component for the LinkedIn icon
const LinkedInIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"></path>
    </svg>
);

// --- Main Login Page Component ---
const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Login form submitted");
    };

    return (
        <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4 font-sans">
            <div className="grid lg:grid-cols-2 w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden">
                
                {/* --- Left Column: Welcome Message --- */}
                <div className="hidden lg:block p-12 bg-gradient-to-br from-indigo-500 to-sky-500 text-white">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
                        <p className="opacity-80 mb-8">
                            Log in to access your dashboard, continue your learning roadmaps, and discover new career opportunities.
                        </p>
                        <div className="w-full h-48 bg-white/20 rounded-lg flex items-center justify-center">
                            <p className="text-lg font-semibold opacity-70">Your journey continues here.</p>
                        </div>
                    </motion.div>
                </div>

                {/* --- Right Column: Login Form --- */}
                <div className="p-8 sm:p-12">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h3 className="text-3xl font-bold text-slate-900 mb-2">Log In to Your Account</h3>
                        <p className="text-slate-500 mb-8">
                            Don't have an account? <a href="/signup" className="text-indigo-600 font-semibold hover:underline">Sign up</a>
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input type="email" placeholder="Email Address" required className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" />
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input type={showPassword ? "text" : "password"} placeholder="Password" required className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            
                            <div className="flex items-center justify-end">
                                <a href="/forgot-password" className="text-sm text-indigo-600 hover:underline font-semibold">
                                    Forgot Password?
                                </a>
                            </div>

                            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold px-6 py-3 rounded-lg shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105">
                                Log In <ArrowRight size={18} />
                            </button>
                        </form>

                        <div className="flex items-center my-8">
                            <hr className="w-full border-slate-300" />
                            <span className="px-4 text-slate-500">OR</span>
                            <hr className="w-full border-slate-300" />
                        </div>

                        {/* Social Login */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="w-full flex items-center justify-center gap-3 bg-white border border-slate-300 text-slate-700 font-semibold px-4 py-3 rounded-lg hover:bg-slate-50 transition-colors">
                                <GoogleIcon />
                                <span>Continue with Google</span>
                            </button>
                            <button className="w-full flex items-center justify-center gap-3 bg-[#0077B5] text-white font-semibold px-4 py-3 rounded-lg hover:bg-[#006097] transition-colors">
                                <LinkedInIcon />
                                <span>Continue with LinkedIn</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
