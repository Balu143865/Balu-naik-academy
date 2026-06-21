import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, Mail, MapPin, Menu, X, Code2, GraduationCap, ChevronRight, 
  Palette, Check, Sun, Moon, Laptop, LogOut, User, UserCheck, Sparkles
} from 'lucide-react';
import { THEMES } from '../App';

interface NavbarProps {
  currentTheme: string;
  onChangeTheme: (themeKey: string) => void;
  themeMode: 'light' | 'dark' | 'system';
  onChangeThemeMode: (mode: 'light' | 'dark' | 'system') => void;
  onOpenApplyModal: () => void;
  user: { name: string; email: string; courseInterest: string } | null;
  onLogOut: () => void;
  isWorkspaceActive?: boolean;
  onToggleWorkspace?: () => void;
}

const MODE_OPTIONS = [
  { key: 'light', name: 'Light Mode', icon: Sun },
  { key: 'dark', name: 'Dark Mode', icon: Moon },
  { key: 'system', name: 'System Default', icon: Laptop }
];

export default function Navbar({ 
  currentTheme, 
  onChangeTheme, 
  themeMode, 
  onChangeThemeMode, 
  onOpenApplyModal,
  user,
  onLogOut,
  isWorkspaceActive = false,
  onToggleWorkspace
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [isModeDropdownOpen, setIsModeDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const ModeIcon = themeMode === 'light' ? Sun : themeMode === 'dark' ? Moon : Laptop;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Courses', href: '#courses' },
    { name: 'Placements', href: '#placements' },
    { name: 'Student Gallery', href: '#gallery' },
    { name: 'Faq', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top Banner (Disappears / custom heights on scroll optionally, or we keep it clean) */}
      <div className="bg-brand-dark text-white text-xs py-2 px-4 border-b border-white/5 transition-all duration-300 relative z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 text-slate-300">
            <a href="tel:6304045279" className="flex items-center gap-1.5 hover:text-primary-400 transitioning">
              <Phone className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
              <span>+91 6304045279</span>
            </a>
            <a href="mailto:balunaikbanavath662@gmail.com" className="flex items-center gap-1.5 hover:text-primary-400 transitioning">
              <Mail className="w-3.5 h-3.5 text-brand-accent" />
              <span className="hidden sm:inline">balunaikbanavath662@gmail.com</span>
              <span className="inline sm:hidden">Email Us</span>
            </a>
            <div className="hidden md:flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-accent" />
              <span>Macherla, Palnadu District, AP</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-brand-accent/20 text-brand-accent text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
              ★ 100% Placement Support
            </span>
          </div>
        </div>
      </div>

      {/* Sticky Main Navigation */}
      <nav id="navbar-sticky" className={`sticky top-0 w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-brand-dark/95 backdrop-blur-md shadow-lg border-b border-white/5 py-3' 
          : 'bg-slate-900/90 backdrop-blur-sm border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-tr from-primary-600 to-primary-400 p-2 rounded-lg shadow-md group-hover:rotate-6 transition-transform duration-300">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg sm:text-xl text-white tracking-tight leading-none">
                  BALU NAIK
                </span>
                <span className="text-[10px] text-primary-400 font-mono tracking-widest uppercase font-bold leading-none mt-1">
                  Academy of Technology
                </span>
              </div>
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-7">
              <div className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200 relative group py-2"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-accent transition-all duration-200 group-hover:w-full" />
                  </a>
                ))}
              </div>

              {/* Theme Palette Dynamic Swapper */}
              <div className="relative">
                <button
                  id="btn-desktop-theme-selector"
                  onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
                  className="bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white p-2.5 rounded-xl border border-white/5 hover:border-white/10 transition-all flex items-center justify-center cursor-pointer shadow-inner h-10 w-10 shrink-0 select-none"
                  title="Choose Academics Theme"
                >
                  <Palette className="w-5 h-5 text-primary-500 animate-pulse-glow" />
                </button>
                
                <AnimatePresence>
                  {isThemeDropdownOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-30" 
                        onClick={() => setIsThemeDropdownOpen(false)} 
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-3 w-56 bg-slate-950 border border-white/10 rounded-2xl shadow-2xl p-3 z-40 text-left"
                      >
                        <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block px-2 pb-2.5 border-b border-white/5 mb-2.5 font-mono">
                          ★ ACADEMY THEMES
                        </span>
                        <div className="space-y-1">
                          {THEMES.map((t) => (
                            <button
                              key={t.key}
                              onClick={() => {
                                onChangeTheme(t.key);
                                setIsThemeDropdownOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                currentTheme === t.key
                                  ? 'bg-primary-600/10 text-primary-400 border border-primary-500/10'
                                  : 'text-slate-300 hover:text-white hover:bg-white/[0.04] border border-transparent'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <span 
                                  className="w-3.5 h-3.5 rounded-full inline-block border border-white/10 shrink-0"
                                  style={{ backgroundColor: t.color }}
                                />
                                <span>{t.name}</span>
                              </div>
                              {currentTheme === t.key && (
                                <Check className="w-4 h-4 text-primary-450 text-primary-400 shrink-0" />
                              )}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Dynamic Dark/Light/System Mode Swapper */}
              <div className="relative">
                <button
                  id="btn-desktop-mode-selector"
                  onClick={() => setIsModeDropdownOpen(!isModeDropdownOpen)}
                  className="bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white p-2.5 rounded-xl border border-white/5 hover:border-white/10 transition-all flex items-center justify-center cursor-pointer shadow-inner h-10 w-10 shrink-0 select-none"
                  title={`Active: ${themeMode} mode. Click to change.`}
                >
                  <ModeIcon className="w-5 h-5 text-primary-500" />
                </button>
                
                <AnimatePresence>
                  {isModeDropdownOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-30" 
                        onClick={() => setIsModeDropdownOpen(false)} 
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-3 w-48 bg-slate-950 border border-white/10 rounded-2xl shadow-2xl p-3 z-40 text-left"
                      >
                        <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block px-2 pb-2.5 border-b border-white/5 mb-2.5 font-mono">
                          ★ THEME MODE
                        </span>
                        <div className="space-y-1">
                          {MODE_OPTIONS.map((opt) => {
                            const OptIcon = opt.icon;
                            const isActive = themeMode === opt.key;
                            return (
                              <button
                                key={opt.key}
                                onClick={() => {
                                  onChangeThemeMode(opt.key as 'light' | 'dark' | 'system');
                                  setIsModeDropdownOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                  isActive
                                    ? 'bg-primary-600/10 text-primary-400 border border-primary-500/10'
                                    : 'text-slate-300 hover:text-white hover:bg-white/[0.04] border border-transparent'
                                }`}
                              >
                                <div className="flex items-center gap-2.5">
                                  <OptIcon className={`w-4.5 h-4.5 ${isActive ? 'text-primary-500' : 'text-slate-400'}`} />
                                  <span>{opt.name}</span>
                                </div>
                                {isActive && (
                                  <Check className="w-4 h-4 text-primary-400 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* User Account Dropdown */}
              {user ? (
                <div className="relative">
                  <button
                    id="btn-desktop-user-profile"
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 hover:border-white/10 text-white font-semibold text-xs transition-all focus:outline-none cursor-pointer"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary-600 to-amber-550 flex items-center justify-center font-black text-[10px] text-white uppercase shadow-md shrink-0">
                      {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <span className="max-w-[100px] truncate block text-slate-300">
                      Hi, {user.name.split(' ')[0]}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isUserDropdownOpen && (
                      <>
                        <div 
                          className="fixed inset-0 z-30" 
                          onClick={() => setIsUserDropdownOpen(false)} 
                        />
                        <motion.div
                          initial={{ opacity: 0, y: 12, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 12, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 mt-3 w-64 bg-slate-950 border border-white/10 rounded-2xl shadow-2xl p-4 z-40 text-left"
                        >
                          <div className="space-y-3">
                            <div className="pb-3 border-b border-white/5">
                              <div className="flex items-center gap-2.5">
                                <div className="bg-primary-500/10 text-primary-400 p-2 rounded-xl">
                                  <UserCheck className="w-4 h-4" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-xs text-white leading-none">{user.name}</h4>
                                  <span className="text-[10px] text-slate-400 block mt-1 font-mono truncate max-w-[160px]">
                                    {user.email}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2 text-[11px]">
                              <div>
                                <span className="text-[9px] text-slate-500 font-extrabold uppercase font-mono tracking-wider block">
                                  Target Track Career
                                </span>
                                <span className="text-slate-200 block font-medium mt-0.5 max-w-[200px] truncate">
                                  {user.courseInterest || 'General Admission'}
                                </span>
                              </div>
                              
                              <div className="pt-1 flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span>Trainee Portal Profile Active</span>
                              </div>
                            </div>

                            <div className="pt-1">
                              <button
                                type="button"
                                onClick={() => {
                                  setIsUserDropdownOpen(false);
                                  if (onToggleWorkspace) onToggleWorkspace();
                                }}
                                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl py-2 px-3 flex items-center justify-center gap-1.5 text-xs transition-all cursor-pointer shadow-sm"
                              >
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>{isWorkspaceActive ? 'Return to Website' : 'Enterprise Portal & Labs'}</span>
                              </button>
                            </div>

                            <div className="pt-3 border-t border-white/5">
                              <button
                                type="button"
                                onClick={() => {
                                  setIsUserDropdownOpen(false);
                                  onLogOut();
                                }}
                                className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/10 rounded-xl py-2 px-3 flex items-center justify-center gap-2 font-bold text-xs transition-all cursor-pointer"
                              >
                                <LogOut className="w-3.5 h-3.5" />
                                <span>Sign Out of Portal</span>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              ) : null}

              {/* Action Button */}
              <button
                id="btn-nav-apply"
                onClick={onOpenApplyModal}
                className="bg-primary-600 hover:bg-primary-500 text-white font-medium text-sm px-5 py-2.5 rounded-lg shadow-md hover:shadow-primary-500/20 active:scale-95 transition-all duration-150 flex items-center gap-2 group cursor-pointer"
              >
                <span>Apply For Admission</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Mobile Menu & Theme Trigger Button Group */}
            <div className="lg:hidden flex items-center gap-3">
              {/* Mobile quick theme swapper */}
              <div className="relative">
                <button
                  id="btn-mobile-theme-selector"
                  onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
                  className="bg-white/[0.04] text-slate-300 p-2.5 rounded-xl border border-white/5 flex items-center justify-center cursor-pointer"
                  title="Choose Theme"
                >
                  <Palette className="w-4.5 h-4.5 text-primary-500" />
                </button>
                
                <AnimatePresence>
                  {isThemeDropdownOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-30" 
                        onClick={() => setIsThemeDropdownOpen(false)} 
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-3 w-48 bg-slate-950 border border-white/10 rounded-2xl shadow-2xl p-3 z-40 text-left"
                      >
                        <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider block px-1 pb-2 border-b border-white/5 mb-2 font-mono">
                          ★ ACTIVE THEME
                        </span>
                        <div className="space-y-1">
                          {THEMES.map((t) => (
                            <button
                              key={t.key}
                              onClick={() => {
                                onChangeTheme(t.key);
                                setIsThemeDropdownOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                currentTheme === t.key
                                  ? 'bg-primary-600/10 text-primary-400 border border-primary-500/10'
                                  : 'text-slate-300 hover:text-white hover:bg-white/[0.04] border border-transparent'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span 
                                  className="w-3.5 h-3.5 rounded-full inline-block border border-white/10 shrink-0"
                                  style={{ backgroundColor: t.color }}
                                />
                                <span>{t.name.split(' ')[1]}</span>
                              </div>
                              {currentTheme === t.key && (
                                <Check className="w-3.5 h-3.5 text-primary-400 shrink-0" />
                              )}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Mode Swapper */}
              <div className="relative">
                <button
                  id="btn-mobile-mode-selector"
                  onClick={() => setIsModeDropdownOpen(!isModeDropdownOpen)}
                  className="bg-white/[0.04] text-slate-300 p-2.5 rounded-xl border border-white/5 flex items-center justify-center cursor-pointer"
                  title="Choose Mode"
                >
                  <ModeIcon className="w-4.5 h-4.5 text-primary-500" />
                </button>
                
                <AnimatePresence>
                  {isModeDropdownOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-30" 
                        onClick={() => setIsModeDropdownOpen(false)} 
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-3 w-40 bg-slate-950 border border-white/10 rounded-2xl shadow-2xl p-2.5 z-40 text-left"
                      >
                        <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider block px-1 pb-2 border-b border-white/5 mb-2 font-mono">
                          ★ DISPLAY MODE
                        </span>
                        <div className="space-y-1">
                          {MODE_OPTIONS.map((opt) => {
                            const OptIcon = opt.icon;
                            const isActive = themeMode === opt.key;
                            return (
                              <button
                                key={opt.key}
                                onClick={() => {
                                  onChangeThemeMode(opt.key as 'light' | 'dark' | 'system');
                                  setIsModeDropdownOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                  isActive
                                    ? 'bg-primary-600/10 text-primary-400 border border-primary-500/10'
                                    : 'text-slate-300 hover:text-white hover:bg-white/[0.04] border border-transparent'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <OptIcon className="w-3.5 h-3.5 text-primary-400 shrink-0" />
                                  <span>{opt.name.split(' ')[0]}</span>
                                </div>
                                {isActive && (
                                  <Check className="w-3.5 h-3.5 text-primary-400 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              <button
                id="btn-mobile-menu"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-300 hover:text-white p-2.5 rounded-xl bg-white/[0.04] border border-white/5 focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-nav-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-slate-900 border-t border-white/5"
            >
              <div className="px-4 pt-3 pb-6 space-y-2">
                {user && (
                  <div className="px-4 py-3 bg-white/[0.03] border border-white/5 rounded-xl mb-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-600 to-amber-500 flex items-center justify-center font-black text-xs text-white uppercase shrink-0">
                        {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div className="truncate">
                        <span className="block text-xs font-bold text-white leading-none">{user.name}</span>
                        <span className="block text-[10px] text-slate-400 font-mono mt-1 truncate">{user.email}</span>
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-400 pt-1.5 border-t border-white/5">
                      <span className="text-[9px] text-slate-500 font-extrabold uppercase font-mono tracking-wider block">Career Tracking:</span>
                      <span className="text-slate-300 font-medium block mt-0.5 truncate">{user.courseInterest}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onLogOut();
                      }}
                      className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 text-xs font-bold transition-all border border-red-500/10 cursor-pointer mt-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out of Portal</span>
                    </button>
                  </div>
                )}

                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-2.5 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="pt-4 border-t border-white/5 px-4">
                  <button
                    id="btn-mobile-apply-now"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenApplyModal();
                    }}
                    className="w-full bg-primary-600 hover:bg-primary-500 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-primary-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <GraduationCap className="w-5 h-5" />
                    <span>Apply For Free Demo</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
