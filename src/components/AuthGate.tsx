import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, Mail, User, Eye, EyeOff, Sparkles, Code2, ArrowRight, 
  GraduationCap, AlertCircle, CheckCircle, Shield 
} from 'lucide-react';
import { COURSES_DATA } from '../data';

interface AuthGateProps {
  onAuthSuccess: (userData: { name: string; email: string; courseInterest: string }) => void;
}

export default function AuthGate({ onAuthSuccess }: AuthGateProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [courseInterest, setCourseInterest] = useState('');

  // Statuses
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Built-in presets for easy evaluation
  const handleQuickBypass = () => {
    setIsLoading(true);
    setErrorMessage('');
    setTimeout(() => {
      setIsLoading(false);
      onAuthSuccess({
        name: 'Guest Trainee',
        email: 'guest@balunaik.edu',
        courseInterest: 'Web Full-Stack Development (MERN)'
      });
    }, 850);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (isSignUp && !name.trim()) {
      setErrorMessage('Full name is required for registration.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);

    // Get DB from local storage or set empty
    const localUsersStr = localStorage.getItem('balu-academy-registered-users');
    const registeredUsers = localUsersStr ? JSON.parse(localUsersStr) : [];

    setTimeout(() => {
      if (isSignUp) {
        // Sign Up Mode
        const userExists = registeredUsers.some((u: any) => u.email.toLowerCase() === email.toLowerCase());
        if (userExists) {
          setIsLoading(false);
          setErrorMessage('This email is already registered. Please Sign In instead.');
          return;
        }

        // Add new user to simulated storage
        const newUser = { name, email, password, courseInterest: courseInterest || 'General Counseling' };
        registeredUsers.push(newUser);
        localStorage.setItem('balu-academy-registered-users', JSON.stringify(registeredUsers));

        setIsLoading(false);
        setSuccessMessage('Account created successfully! Logging you in...');
        
        setTimeout(() => {
          onAuthSuccess({ name, email, courseInterest: courseInterest || 'General Counseling' });
        }, 1000);

      } else {
        // Sign In Mode
        // Default evaluation account
        const isDefaultAcct = email.toLowerCase() === 'student@balunaik.edu' && password === 'macherla123';
        
        const matchedUser = registeredUsers.find(
          (u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );

        if (isDefaultAcct) {
          setIsLoading(false);
          onAuthSuccess({
            name: 'Praveen Kumar',
            email: 'student@balunaik.edu',
            courseInterest: 'Software Testing (Manual & Automation)'
          });
        } else if (matchedUser) {
          setIsLoading(false);
          onAuthSuccess({
            name: matchedUser.name,
            email: matchedUser.email,
            courseInterest: matchedUser.courseInterest
          });
        } else {
          setIsLoading(false);
          setErrorMessage('Invalid email or password combination. Try student@balunaik.edu / macherla123 or sign up.');
        }
      }
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/95 overflow-y-auto flex items-center justify-center p-4 selection:bg-primary-500 selection:text-white">
      {/* Absolute high contrast grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative bg-[#0c1322] border border-white/10 rounded-3xl w-full max-w-lg shadow-2xl p-6 sm:p-10 my-8 overflow-hidden z-10"
      >
        {/* Tech decorative top bar */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-primary-600 via-amber-500 to-primary-600" />
        
        <div className="space-y-6 text-center">
          
          {/* Logo brand */}
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="bg-gradient-to-tr from-primary-600 to-primary-400 p-2.5 rounded-2xl shadow-lg ring-4 ring-primary-500/10">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <span className="font-display font-black text-lg text-white block uppercase tracking-tight leading-none">
                BALU NAIK ACADEMY
              </span>
              <span className="text-[9px] text-primary-400 font-mono tracking-widest font-bold uppercase block mt-1">
                Candidate Portal Access Gate
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="font-display text-2xl sm:text-3xl font-black text-brand-text-main tracking-tight uppercase leading-tight">
              {isSignUp ? 'Enrollment Registries' : 'Welcome Candidate'}
            </h2>
            <p className="text-brand-text-muted text-xs sm:text-sm font-light max-w-sm mx-auto leading-relaxed">
              {isSignUp 
                ? 'Create your central student workspace login catalog. Access our full high-performance placement ecosystem.' 
                : 'Sign in to access courses, physical training class galleries, alumni resume packages, and callbacks.'}
            </p>
          </div>

          {/* Form Action */}
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            
            {/* Quick Presets Notice Bar */}
            {!isSignUp && (
              <div className="bg-brand-bg-accent/40 border border-brand-border rounded-xl p-3 flex items-center justify-between gap-2 text-[11px]">
                <div className="flex items-center gap-2 text-brand-text-muted">
                  <Shield className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Use: <strong className="text-brand-text-main">student@balunaik.edu</strong> / <strong className="text-brand-text-main">macherla123</strong></span>
                </div>
                <button 
                  type="button"
                  onClick={() => {
                    setEmail('student@balunaik.edu');
                    setPassword('macherla123');
                  }}
                  className="text-primary-500 hover:underline font-bold"
                >
                  Fill Demo
                </button>
              </div>
            )}

            <AnimatePresence mode="popLayout">
              {/* Errors container */}
              {errorMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-3.5 flex items-start gap-2.5 text-xs"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span className="font-light leading-relaxed">{errorMessage}</span>
                </motion.div>
              )}

              {/* Success container */}
              {successMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl p-3.5 flex items-start gap-2.5 text-xs"
                >
                  <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span className="font-semibold leading-relaxed">{successMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-3">
              {isSignUp && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-1"
                >
                  <label className="text-[10px] text-brand-text-muted uppercase tracking-wider font-extrabold block">
                    Your Full Name <span className="text-brand-accent">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-muted" />
                    <input
                      type="text"
                      placeholder="e.g. Anand Naik"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-brand-bg-accent/50 border border-brand-border rounded-xl py-2.5 pl-10 pr-4 text-brand-text-main text-sm focus:outline-none focus:border-primary-500 focus:bg-slate-950 transition-colors"
                      required={isSignUp}
                    />
                  </div>
                </motion.div>
              )}

              <div className="space-y-1">
                <label className="text-[10px] text-brand-text-muted uppercase tracking-wider font-extrabold block">
                  Email Address <span className="text-brand-accent">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-muted" />
                  <input
                    type="email"
                    placeholder="e.g. student@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-brand-bg-accent/50 border border-brand-border rounded-xl py-2.5 pl-10 pr-4 text-brand-text-main text-sm focus:outline-none focus:border-primary-500 focus:bg-slate-950 transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] text-brand-text-muted uppercase tracking-wider font-extrabold block">
                    Security Password <span className="text-brand-accent">*</span>
                  </label>
                  {!isSignUp && (
                    <button 
                      type="button" 
                      onClick={() => setErrorMessage('Demo simulation: Simply register a new account on Sign Up if password is lost!')} 
                      className="text-[10px] text-primary-500 hover:underline"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-muted" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-brand-bg-accent/50 border border-brand-border rounded-xl py-2.5 pl-10 pr-10 text-brand-text-main text-sm focus:outline-none focus:border-primary-500 focus:bg-slate-950 transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-text-muted hover:text-brand-text-main"
                  >
                    {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>
              </div>

              {isSignUp && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-1"
                >
                  <label className="text-[10px] text-brand-text-muted uppercase tracking-wider font-extrabold block">
                    Preferred Specialized Career Track
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-muted" />
                    <select
                      value={courseInterest}
                      onChange={(e) => setCourseInterest(e.target.value)}
                      className="w-full bg-brand-bg-accent/50 border border-brand-border rounded-xl py-2.5 pl-10 pr-4 text-brand-text-main text-sm focus:outline-none focus:border-primary-500 focus:bg-slate-950 transition-colors cursor-pointer"
                    >
                      <option value="">-- Support Counseling Advice --</option>
                      {COURSES_DATA.map((crs) => (
                        <option key={crs.id} value={crs.title}>
                          {crs.title} ({crs.duration})
                        </option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-primary-650/15 disabled:opacity-75 transition-all text-xs sm:text-sm flex items-center justify-center gap-2 mt-4 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Authenticating Record...</span>
                </>
              ) : (
                <>
                  <span>{isSignUp ? 'Create Candidate Record' : 'Unlock Access Portal'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Toggle Link */}
          <div className="pt-4 border-t border-brand-border flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
            <span className="text-brand-text-muted">
              {isSignUp ? 'Already registered?' : 'Brand New to our Academy?'}
            </span>
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setErrorMessage('');
              }}
              className="text-primary-500 hover:text-primary-400 font-bold transition-colors cursor-pointer"
            >
              {isSignUp ? 'Sign In Instead' : 'Create Free Student Profile'}
            </button>
          </div>

          {/* Bypass Options */}
          <div className="pt-2 flex flex-col gap-2 items-center justify-center">
            <div className="text-[10px] text-brand-text-muted select-none">OR EVALUATE WITHOUT CREDENTIALS</div>
            <button
              type="button"
              onClick={handleQuickBypass}
              className="px-5 py-2.5 rounded-xl border border-dashed border-primary-500/20 text-brand-text-muted hover:text-primary-500 hover:border-primary-500/50 hover:bg-primary-500/5 text-xs transition-all duration-300"
            >
              🚀 Bypass as Guest Evaluator
            </button>
          </div>

        </div>

      </motion.div>
    </div>
  );
}
