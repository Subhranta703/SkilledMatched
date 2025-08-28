import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, KeyRound, CheckCircle } from 'lucide-react';

// --- Main OTP Verification Page Component ---
const OTPVerificationPage = () => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [isVerified, setIsVerified] = useState(false);
    const inputRefs = useRef([]);

    // This email would typically be passed from the previous page
    const userEmail = "example@email.com"; 

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Focus next input
        if (element.value !== "" && element.nextSibling) {
            element.nextSibling.focus();
        }
    };
    
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && inputRefs.current[index - 1]) {
            // Focus previous input on backspace if current is empty
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const enteredOTP = otp.join("");
        // Handle OTP verification logic here
        console.log("Verifying OTP:", enteredOTP);
        if (enteredOTP.length === 6) {
             // On successful verification, you would typically redirect to a reset password page.
            setIsVerified(true);
        } else {
            // A non-blocking notification would be better in a real app
            alert("Please enter a valid 6-digit OTP.");
        }
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
                        <h2 className="text-4xl font-bold mb-4">Verify Your Identity</h2>
                        <p className="opacity-80">
                            For your security, we've sent a one-time password (OTP) to your email address. Please enter it to proceed.
                        </p>
                        <div className="mt-8 w-full h-48 bg-white/20 rounded-lg flex items-center justify-center">
                            <ShieldCheck size={64} className="opacity-30" />
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
                        {isVerified ? (
                             <div className="text-center">
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: 'spring' }}>
                                    <CheckCircle className="w-20 h-20 bg-green-100 text-green-600 rounded-full p-4 mx-auto" />
                                </motion.div>
                                <h3 className="text-2xl font-bold text-slate-900 mt-6 mb-2">Verification Successful!</h3>
                                <p className="text-slate-500">
                                    You can now proceed to reset your password.
                                </p>
                                <a href="/reset-password" className="mt-8 inline-flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold px-6 py-3 rounded-lg shadow-lg">
                                    Reset Password &rarr;
                                </a>
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-3xl font-bold text-slate-900 mb-2">Enter Verification Code</h3>
                                <p className="text-slate-500 mb-8">
                                    A 6-digit code has been sent to <span className="font-semibold text-indigo-600">{userEmail}</span>
                                </p>

                                <form onSubmit={handleSubmit}>
                                    <div className="flex justify-center gap-2 sm:gap-4 mb-6">
                                        {otp.map((data, index) => {
                                            return (
                                                <input
                                                    className="w-12 h-12 sm:w-14 sm:h-14 text-center text-2xl font-semibold border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                                    type="text"
                                                    name="otp"
                                                    maxLength="1"
                                                    key={index}
                                                    value={data}
                                                    onChange={e => handleChange(e.target, index)}
                                                    onKeyDown={e => handleKeyDown(e, index)}
                                                    onFocus={e => e.target.select()}
                                                    ref={el => (inputRefs.current[index] = el)}
                                                />
                                            );
                                        })}
                                    </div>
                                    
                                    <button type="submit" className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold px-6 py-3 rounded-lg shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105">
                                        Verify Code <KeyRound size={18} />
                                    </button>
                                </form>
                                <div className="text-center mt-6">
                                    <p className="text-slate-500">
                                        Didn't receive the code?{' '}
                                        <button className="font-semibold text-indigo-600 hover:underline">
                                            Resend OTP
                                        </button>
                                    </p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default OTPVerificationPage;
