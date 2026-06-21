import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, CheckSquare, Send, ShieldCheck, Phone, GraduationCap, 
  Sparkles, Calendar, BookOpen, AlertCircle, ArrowUp, Zap, HelpCircle
} from 'lucide-react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Counters from './components/Counters';
import Courses from './components/Courses';
import Placement from './components/Placement';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AuthGate from './components/AuthGate';
import StudentWorkspace from './components/StudentWorkspace';
import { COURSES_DATA } from './data';

export const THEMES = [
  {
    key: 'crimson',
    name: 'Classic Crimson',
    color: '#eb3b3b',
    variables: {
      '--color-primary-50': '#fff5f5',
      '--color-primary-100': '#ffe3e3',
      '--color-primary-200': '#ffc9c9',
      '--color-primary-300': '#ffa8a8',
      '--color-primary-400': '#ff8787',
      '--color-primary-500': '#ef4444',
      '--color-primary-600': '#eb3b3b',
      '--color-primary-700': '#d32f2f',
      '--color-primary-800': '#b91c1c',
      '--color-primary-900': '#7f1d1d',
      '--color-brand-accent': '#eb3b3b',
    }
  },
  {
    key: 'emerald',
    name: 'Emerald Tech',
    color: '#10b981',
    variables: {
      '--color-primary-50': '#ecfdf5',
      '--color-primary-100': '#d1fae5',
      '--color-primary-200': '#a7f3d0',
      '--color-primary-300': '#6ee7b7',
      '--color-primary-400': '#34d399',
      '--color-primary-500': '#10b981',
      '--color-primary-600': '#059669',
      '--color-primary-700': '#047857',
      '--color-primary-800': '#065f46',
      '--color-primary-900': '#064e3b',
      '--color-brand-accent': '#10b981',
    }
  },
  {
    key: 'cyber',
    name: 'Cyber Ocean',
    color: '#0ea5e9',
    variables: {
      '--color-primary-50': '#f0f9ff',
      '--color-primary-100': '#e0f2fe',
      '--color-primary-200': '#bae6fd',
      '--color-primary-300': '#7dd3fc',
      '--color-primary-400': '#38bdf8',
      '--color-primary-500': '#0ea5e9',
      '--color-primary-600': '#0284c7',
      '--color-primary-700': '#0369a1',
      '--color-primary-800': '#075985',
      '--color-primary-900': '#0c4a6e',
      '--color-brand-accent': '#0ea5e9',
    }
  },
  {
    key: 'amber',
    name: 'Golden Sunset',
    color: '#f59e0b',
    variables: {
      '--color-primary-50': '#fffbeb',
      '--color-primary-100': '#fef3c7',
      '--color-primary-200': '#fde68a',
      '--color-primary-300': '#fcd34d',
      '--color-primary-400': '#fbbf24',
      '--color-primary-500': '#f59e0b',
      '--color-primary-600': '#d97706',
      '--color-primary-700': '#b45309',
      '--color-primary-800': '#92400e',
      '--color-primary-900': '#78350f',
      '--color-brand-accent': '#f59e0b',
    }
  }
];

export default function App() {
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; courseInterest: string } | null>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('balu-academy-user');
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });

  const [isWorkspaceActive, setIsWorkspaceActive] = useState(false);

  const handleAuthSuccess = (userData: { name: string; email: string; courseInterest: string }) => {
    setCurrentUser(userData);
    localStorage.setItem('balu-academy-user', JSON.stringify(userData));
    setIsWorkspaceActive(true); // Immersive instant portal workspace layout entrance!
  };

  const handleLogOut = () => {
    setCurrentUser(null);
    setIsWorkspaceActive(false);
    localStorage.removeItem('balu-academy-user');
  };

  const [currentTheme, setCurrentTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('balu-academy-theme') || 'crimson';
    }
    return 'crimson';
  });

  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('balu-academy-mode') as 'light' | 'dark' | 'system') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const selected = THEMES.find(t => t.key === currentTheme) || THEMES[0];
    Object.entries(selected.variables).forEach(([key, val]) => {
      document.documentElement.style.setProperty(key, val);
    });
    localStorage.setItem('balu-academy-theme', currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    const root = document.documentElement;
    const applyThemeMode = (mode: 'light' | 'dark' | 'system') => {
      root.classList.remove('light', 'dark');
      if (mode === 'system') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.classList.add(systemPrefersDark ? 'dark' : 'light');
      } else {
        root.classList.add(mode);
      }
    };

    applyThemeMode(themeMode);
    localStorage.setItem('balu-academy-mode', themeMode);

    if (themeMode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = (e: MediaQueryListEvent) => {
        root.classList.remove('light', 'dark');
        root.classList.add(e.matches ? 'dark' : 'light');
      };
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [themeMode]);

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedCourseStr, setSelectedCourseStr] = useState('');
  const [modalFormData, setModalFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: '',
    message: '',
  });
  const [modalSubmitting, setModalSubmitting] = useState(false);
  const [modalSubmitted, setModalSubmitted] = useState(false);

  // Handles closing the modal and resetting things
  const handleCloseModal = () => {
    setIsApplyModalOpen(false);
    // Give time for layout transition before resetting success view
    setTimeout(() => {
      setModalSubmitted(false);
      setModalFormData({
        name: '',
        phone: '',
        email: '',
        course: '',
        message: '',
      });
    }, 300);
  };

  // Triggers the modal popup with an optional pre-loaded course context
  const handleOpenApplyModal = (courseTitle?: string) => {
    if (courseTitle) {
      setSelectedCourseStr(courseTitle);
      setModalFormData((prev) => ({ ...prev, course: courseTitle }));
    } else {
      setSelectedCourseStr('');
    }
    setIsApplyModalOpen(true);
  };

  const handleModalInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setModalFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalFormData.name || !modalFormData.phone) {
      alert('Please enter your full Name and Contact Phone.');
      return;
    }

    setModalSubmitting(true);
    // Simulate real server/CRM submission
    setTimeout(() => {
      setModalSubmitting(false);
      setModalSubmitted(true);
    }, 1200);
  };

  const scrollExploreCourses = () => {
    const section = document.getElementById('courses');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Back to top helper
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="app-container" className="min-h-screen bg-slate-55 flex flex-col justify-between selection:bg-primary-500 selection:text-white">
      
      {/* Sticky Top Navbar */}
      <Navbar 
        currentTheme={currentTheme} 
        onChangeTheme={setCurrentTheme} 
        themeMode={themeMode}
        onChangeThemeMode={setThemeMode}
        onOpenApplyModal={() => handleOpenApplyModal()} 
        user={currentUser}
        onLogOut={handleLogOut}
        isWorkspaceActive={isWorkspaceActive}
        onToggleWorkspace={() => setIsWorkspaceActive(!isWorkspaceActive)}
      />

      {/* Main Page Layout assembly */}
      <main className="flex-grow">
        
        {/* Trainee Portal Welcome Callout Banner */}
        {currentUser && !isWorkspaceActive && (
          <div className="max-w-7xl mx-auto px-4 mt-6">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0b1220] border border-white/10 p-5 sm:p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-600 via-amber-500 to-indigo-600" />
              
              <div className="flex items-center gap-4 text-left w-full md:w-auto">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary-600 to-amber-500 flex items-center justify-center font-black text-white text-sm shadow-xl shrink-0">
                  {currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-amber-400 font-mono font-bold tracking-widest uppercase bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      Trainee Logged In
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white block">
                    Welcome to the Academy, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-400">{currentUser.name}</span>!
                  </h4>
                  <span className="text-xs text-slate-400 block">
                    Target Track: <strong className="text-slate-300 font-semibold">{currentUser.courseInterest}</strong>
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsWorkspaceActive(true)}
                className="w-full md:w-auto bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-white font-extrabold px-6 py-3.5 rounded-2xl text-xs sm:text-sm cursor-pointer transition-all hover:shadow-[0_10px_25px_rgba(99,102,241,0.25)] text-center flex items-center justify-center gap-2 uppercase tracking-wide shrink-0"
              >
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span>Launch Interactive Student Terminal Dashboard</span>
              </button>
            </motion.div>
          </div>
        )}

        {currentUser && isWorkspaceActive ? (
          <div className="px-4">
            <StudentWorkspace 
              user={currentUser} 
              onCloseWorkspace={() => setIsWorkspaceActive(false)} 
            />
          </div>
        ) : (
          <>
            {/* Hero Section */}
            <Hero 
              onOpenApplyModal={() => handleOpenApplyModal()} 
              onExploreCourses={scrollExploreCourses} 
            />

            {/* Scroll counters block */}
            <Counters />

            {/* Course Catalog tabs */}
            <Courses onOpenApplyModal={(title) => handleOpenApplyModal(title)} />

            {/* Placements Wall */}
            <Placement />

            {/* Alumni Testimonials panel */}
            <Testimonials />

            {/* Interactive photo gallery showcase */}
            <Gallery />

            {/* Combined FAQs and contact form */}
            <Contact />
          </>
        )}

      </main>

      {/* Multi-tier footer */}
      <Footer />

      {/* Back to top dynamic button */}
      <button
        id="btn-back-to-top"
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-30 bg-primary-600 hover:bg-primary-500 text-white p-3.5 rounded-2xl shadow-xl border border-white/5 cursor-pointer hover:-translate-y-1 transition-all group"
        title="Scroll back to top"
      >
        <ArrowUp className="w-5 h-5 group-hover:scale-110 duration-200" />
      </button>

      {/* Immersion Admission Callback Modal Screen */}
      <AnimatePresence>
        {isApplyModalOpen && (
          <div 
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-55 flex items-center justify-center p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.25 }}
              className="bg-slate-900 border border-white/10 rounded-2xl sm:rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative text-white"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Modal Chrome Header Bar */}
              <div className="bg-slate-950 px-6 py-4.5 border-b border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5.5 h-5.5 text-primary-400" />
                  <span className="font-display font-medium text-base text-slate-100 uppercase tracking-wider block">
                    {selectedCourseStr ? 'Course Registration' : 'Admissions Inquiry'}
                  </span>
                </div>
                <button
                  id="close-apply-modal-btn"
                  onClick={handleCloseModal}
                  className="text-slate-400 hover:text-white h-8 w-8 rounded-lg flex items-center justify-center bg-slate-800 cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Core Layout Block */}
              <div className="p-6 sm:p-8">
                
                {modalSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 space-y-6"
                  >
                    <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <ShieldCheck className="w-9 h-9" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-display font-extrabold text-xl text-white">
                        Enquiry Saved Successfully!
                      </h4>
                      <p className="text-slate-300 text-xs sm:text-sm font-light max-w-sm mx-auto leading-relaxed">
                        Excellent selection. Balu Naik Academy director/counselors will contact you on your registered cell <strong>{modalFormData.phone}</strong> shortly to share the syllabus and demo details.
                      </p>
                    </div>
                    <div className="pt-4 flex justify-center">
                      <button
                        onClick={handleCloseModal}
                        className="bg-white text-slate-900 font-bold text-xs py-3 px-8 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        Acknowledge & Close
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleModalSubmit} className="space-y-5">
                    
                    <div className="space-y-1">
                      <h3 className="font-display font-extrabold text-lg sm:text-xl text-slate-100">
                        {selectedCourseStr ? `Study ${selectedCourseStr}` : 'Book Free Placement Consultation'}
                      </h3>
                      <p className="text-slate-400 text-xs font-light">
                        Please fill your contact parameters. We will arrange live demo slots, answer fees queries, and explain our 100% placement cell support layout.
                      </p>
                    </div>

                    {/* Inputs panel */}
                    <div className="space-y-3.5">
                      
                      <div className="space-y-1 text-left">
                        <label htmlFor="modal-name" className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold block">
                          Full Candidate Name <span className="text-brand-accent">*</span>
                        </label>
                        <input
                          id="modal-name"
                          type="text"
                          name="name"
                          value={modalFormData.name}
                          onChange={handleModalInputChange}
                          placeholder="e.g. Anand Banavath"
                          className="w-full bg-slate-950 border border-white/5 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-primary-500 transition-colors"
                          required
                        />
                      </div>

                      <div className="space-y-1 text-left">
                        <label htmlFor="modal-phone" className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold block">
                          Whatsapp Contact Phone <span className="text-brand-accent">*</span>
                        </label>
                        <input
                          id="modal-phone"
                          type="tel"
                          name="phone"
                          value={modalFormData.phone}
                          onChange={handleModalInputChange}
                          placeholder="e.g. 6304045279"
                          className="w-full bg-slate-950 border border-white/5 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-primary-500 transition-colors"
                          required
                        />
                      </div>

                      <div className="space-y-1 text-left">
                        <label htmlFor="modal-email" className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold block">
                          Primary Email Address
                        </label>
                        <input
                          id="modal-email"
                          type="email"
                          name="email"
                          value={modalFormData.email}
                          onChange={handleModalInputChange}
                          placeholder="e.g. name@domain.com"
                          className="w-full bg-slate-950 border border-white/5 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-primary-500 transition-colors"
                        />
                      </div>

                      <div className="space-y-1 text-left">
                        <label htmlFor="modal-course" className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold block">
                          Target Core Curriculum Track
                        </label>
                        <select
                          id="modal-course"
                          name="course"
                          value={modalFormData.course}
                          onChange={handleModalInputChange}
                          className="w-full bg-slate-950 border border-white/5 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-primary-500 transition-colors"
                        >
                          <option value="">-- General Admission Consultation --</option>
                          {COURSES_DATA.map((crs) => (
                            <option key={crs.id} value={crs.title}>
                              {crs.title} ({crs.duration})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1 text-left">
                        <label htmlFor="modal-message" className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold block">
                          Additional Query or Previous background?
                        </label>
                        <textarea
                          id="modal-message"
                          name="message"
                          value={modalFormData.message}
                          onChange={handleModalInputChange}
                          rows={2}
                          placeholder="e.g. B.Sc graduate looking for manual and automated QA classes."
                          className="w-full bg-slate-950 border border-white/5 rounded-xl py-2.5 px-4 text-white text-sm focus:outline-none focus:border-primary-500 transition-colors resize-none"
                        />
                      </div>

                    </div>

                    {/* Disclaimer and Submit */}
                    <div className="space-y-4 pt-4 border-t border-white/5">
                      <div className="flex gap-2 items-start text-[11px] text-slate-400 leading-normal text-left">
                        <CheckSquare className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                        <span>I understand that Balu Naik Academy operates direct phone advisory callbacks and respect confidentiality.</span>
                      </div>
                      <button
                        id="modal-submit-btn"
                        type="submit"
                        className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-primary-600/25 active:scale-95 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
                        disabled={modalSubmitting}
                      >
                        <span>{modalSubmitting ? 'Saving Application...' : 'Send Application'}</span>
                        <Send className="w-4 h-4" />
                      </button>
                    </div>

                  </form>
                )}

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!currentUser && (
          <AuthGate onAuthSuccess={handleAuthSuccess} />
        )}
      </AnimatePresence>

    </div>
  );
}
