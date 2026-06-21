import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Calendar, MapPin, CheckCircle, ChevronDown, ChevronRight, FileDown, Briefcase, GraduationCap } from 'lucide-react';
import { COURSES_DATA } from '../data';
import { Course } from '../types';

interface CoursesProps {
  onOpenApplyModal: (courseTitle?: string) => void;
}

export default function Courses({ onOpenApplyModal }: CoursesProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'fullstack' | 'testing' | 'cloud'>('all');
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);

  const categories = [
    { key: 'all', label: 'All Courses' },
    { key: 'fullstack', label: 'Full-Stack Web' },
    { key: 'testing', label: 'Software Testing' },
    { key: 'cloud', label: 'Cloud & DevOps' },
  ] as const;

  const filteredCourses = activeCategory === 'all'
    ? COURSES_DATA
    : COURSES_DATA.filter((course) => course.category === activeCategory);

  const toggleExpand = (id: string) => {
    setExpandedCourseId((prev) => (prev === id ? null : id));
  };

  const getThemeClasses = (theme: string) => {
    switch (theme) {
      case 'amber':
        return {
          badge: 'bg-primary-500/10 text-primary-400 border-primary-500/20',
          accent: 'bg-primary-500',
          cardBorder: 'hover:border-primary-500/40',
          accentText: 'text-primary-400',
        };
      case 'emerald':
        return {
          badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          accent: 'bg-emerald-500',
          cardBorder: 'hover:border-emerald-400/40',
          accentText: 'text-emerald-400',
        };
      case 'indigo':
        return {
          badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
          accent: 'bg-indigo-500',
          cardBorder: 'hover:border-indigo-400/40',
          accentText: 'text-indigo-400',
        };
      case 'sky':
        return {
          badge: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
          accent: 'bg-sky-500',
          cardBorder: 'hover:border-sky-400/40',
          accentText: 'text-sky-400',
        };
      case 'blue':
      default:
        return {
          badge: 'bg-primary-500/10 text-primary-400 border-primary-500/20',
          accent: 'bg-primary-500',
          cardBorder: 'hover:border-primary-500/40',
          accentText: 'text-primary-400',
        };
    }
  };

  return (
    <section id="courses" className="py-20 md:py-28 bg-brand-bg-accent relative overflow-hidden transition-colors duration-300">
      {/* Ambient background glow grids */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="text-primary-500 text-xs sm:text-sm font-extrabold tracking-widest uppercase block font-mono">
            ★ CERTIFIED CURRICULUMS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-brand-text-main tracking-tight leading-tight uppercase">
            Comprehensive Courses, Aligned for MNC Criteria
          </h2>
          <div className="w-16 h-1 bg-primary-500 mx-auto rounded" />
          <p className="text-brand-text-muted text-base sm:text-lg font-light">
            Choose your learning focus. Our training programs are crafted alongside leading corporate developers to include daily labs and interview preparation.
          </p>
        </div>

        {/* Section Category Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-12 max-w-2xl mx-auto bg-brand-bg-card p-2 rounded-2xl border border-brand-border">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setActiveCategory(cat.key);
                setExpandedCourseId(null);
              }}
              className={`px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30'
                  : 'text-brand-text-muted hover:text-brand-text-main hover:bg-white/[0.05]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-start">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course) => {
              const theme = getThemeClasses(course.colorTheme);
              const isExpanded = expandedCourseId === course.id;

              return (
                <motion.div
                  layout
                  key={course.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -8, scale: 1.005 }}
                  transition={{ duration: 0.3, layout: { type: "spring", stiffness: 300, damping: 30 } }}
                  className={`bg-brand-bg-card rounded-2xl border border-brand-border shadow-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 group hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.15)] hover:border-primary-500/40 ${theme.cardBorder}`}
                >
                  
                  {/* Card Header & Metadata Info */}
                  <div className="p-6 sm:p-8 space-y-6">
                    <div className="flex justify-between items-start gap-2 flex-wrap">
                      <span className={`px-3 py-1 text-[11px] font-bold uppercase rounded-md border tracking-wider shrink-0 font-mono ${theme.badge}`}>
                        {course.tag || 'Specialist'}
                      </span>
                      <div className="flex items-center gap-3 text-brand-text-muted text-xs">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-primary-400" />
                          <span>{course.duration}</span>
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-primary-400" />
                          <span>Macherla AP / Online</span>
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-display font-black text-xl sm:text-2xl text-brand-text-main group-hover:text-primary-400 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-brand-text-muted text-sm leading-relaxed font-light">
                        {course.description}
                      </p>
                    </div>

                    {/* Quick Highlights list */}
                    <div className="space-y-2.5">
                      <span className="text-[10px] text-brand-text-muted font-extrabold tracking-wider uppercase block font-mono">CORE SKILLS TO MASTER:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {course.skillsCovered.slice(0, 7).map((skill, rid) => (
                          <span key={rid} className="bg-brand-bg-accent px-2.5 py-1 rounded text-[11px] font-medium text-brand-text-main border border-brand-border shadow-sm font-mono hover:bg-white/[0.08] transition-colors">
                            {skill}
                          </span>
                        ))}
                        {course.skillsCovered.length > 7 && (
                          <span className="bg-brand-bg-accent border border-brand-border px-2.5 py-1 rounded text-[11px] font-bold text-brand-text-muted select-none">
                            +{course.skillsCovered.length - 7} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Interactive Collapsible Module Section */}
                    <div>
                      <button
                        onClick={() => toggleExpand(course.id)}
                        className="w-full py-3 px-4 rounded-xl bg-brand-bg-accent border border-brand-border hover:bg-brand-bg-main shadow-sm flex items-center justify-between text-xs sm:text-sm font-semibold text-brand-text-main transition-all cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <BookOpen className="w-4.5 h-4.5 text-primary-500 shrink-0" />
                          <span>{isExpanded ? 'Hide Course Curriculum' : 'View Detailed Curriculum Chapters'}</span>
                        </span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-primary-500' : ''}`} />
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden mt-3"
                          >
                            <div className="p-4 rounded-xl bg-brand-bg-accent border border-brand-border space-y-3 shadow-inner">
                              <p className="text-brand-text-muted text-xs leading-relaxed italic border-b border-brand-border pb-2.5 font-sans">
                                {course.longDescription}
                              </p>
                              <div className="space-y-2">
                                {course.modules.map((chap, cid) => (
                                  <div key={cid} className="flex gap-2 text-xs text-brand-text-muted font-medium items-start">
                                    <CheckCircle className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
                                    <span>{chap}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                  </div>

                  {/* Card Actions Footer */}
                  <div className="bg-brand-bg-accent/60 py-4 px-6 sm:px-8 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-3.5">
                    <button
                      onClick={() => onOpenApplyModal(course.title)}
                      className="text-xs text-primary-500 font-bold hover:text-primary-400 flex items-center gap-1 sm:order-2 cursor-pointer py-1.5 rounded-lg group-hover:translate-x-1 transition-transform"
                    >
                      <span>Download PDF Syllabus</span>
                      <FileDown className="w-4 h-4 inline" />
                    </button>
                    <button
                      id={`apply-course-${course.id}`}
                      onClick={() => onOpenApplyModal(course.title)}
                      className="w-full sm:w-auto bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow shadow-primary-500/10 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer sm:order-1"
                    >
                      <GraduationCap className="w-4.5 h-4.5" />
                      <span>Request Call Back</span>
                    </button>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
