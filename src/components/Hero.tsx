import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, BookOpen, GraduationCap, ChevronRight, CheckCircle, Flame, ArrowUpRight } from 'lucide-react';

interface HeroProps {
  onOpenApplyModal: () => void;
  onExploreCourses: () => void;
}

export default function Hero({ onOpenApplyModal, onExploreCourses }: HeroProps) {
  return (
    <section id="home" className="relative min-h-[92vh] bg-brand-bg-main overflow-hidden flex items-center justify-center pt-8 pb-16 transition-colors duration-300">
      {/* Dynamic Animated Background Glow Elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-primary-600/15 blur-[100px] animate-pulse-glow" style={{ animationDelay: '0s' }}></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-[120px] animate-pulse-glow" style={{ animationDelay: '4s' }}></div>
      
      {/* Tech Grid Overlay Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="col-span-1 lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Dynamic Status Tag */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-brand-bg-card/100 border border-brand-border px-3.5 py-1.5 rounded-full shadow-lg"
            >
              <Sparkles className="w-4.5 h-4.5 text-brand-accent animate-pulse" />
              <span className="text-[12px] md:text-sm font-semibold text-brand-text-main tracking-wide">
                Macherlas Premier Software Training Hub
              </span>
            </motion.div>

            {/* Immersive Main Display Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-text-main tracking-tight leading-[1.1]"
              >
                Launch Your Career in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary-500 to-indigo-500">
                  Global Software
                </span>{' '}
                Industries
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-brand-text-muted text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto lg:mx-0"
              >
                No coding background required. Master Java Enterprise, Python Web stacks, AWS DevOps, or Automated Software Testing from industry guides in Macherla and land a job.
              </motion.p>
            </div>

            {/* Core USPs Quick Bullet Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-xl mx-auto lg:mx-0"
            >
              {[
                'Practical Labs & Real Capstone Projects',
                'Dedicated 100% Placement Drives Cell',
                'Daily Coding Homework & Mentoring Support',
                'Interview Prep, Grooming & Resume Optimization',
              ].map((usp, i) => (
                <div key={i} className="flex items-center gap-2.5 text-brand-text-muted text-sm">
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                  <span className="font-medium text-left">{usp}</span>
                </div>
              ))}
            </motion.div>

            {/* Call to Actions Blocks */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
            >
              <button
                id="hero-apply-btn"
                onClick={onOpenApplyModal}
                className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-semibold text-base py-4 px-8 rounded-xl shadow-xl hover:shadow-primary-500/25 active:scale-95 transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <GraduationCap className="w-5.5 h-5.5" />
                <span>Book Free Career Demo</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                id="hero-explore-btn"
                onClick={onExploreCourses}
                className="bg-brand-bg-accent hover:bg-brand-bg-card text-brand-text-main font-medium text-base py-4 px-8 rounded-xl border border-brand-border active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <BookOpen className="w-5.5 h-5.5 text-primary-500" />
                <span>Explore Courses</span>
              </button>
            </motion.div>

            {/* Local Trust badging */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-4 border-t border-brand-border flex flex-wrap justify-center lg:justify-start items-center gap-6 text-xs text-brand-text-muted"
            >
              <span className="font-mono">PARTNERED WITH MNC RECRUITERS</span>
              <div className="flex items-center gap-3 font-semibold text-brand-text-main">
                <span>TCS</span>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <span>Wipro</span>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <span>Cognizant</span>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <span>Capgemini</span>
              </div>
            </motion.div>

          </div>

          {/* Hero Right Visuals - High Tech Interactivity */}
          <div className="col-span-1 lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative mx-auto max-w-[420px] lg:max-w-none"
            >
              {/* Main Workspace Frame container */}
              <div className="bg-slate-900/90 rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative backdrop-blur-md">
                
                {/* Terminal top chrome */}
                <div className="bg-slate-950 px-4 py-3 border-b border-white/5 flex justify-between items-center">
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
                    <span className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                    <span className="w-3 h-3 rounded-full bg-[#10b981]" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">balu_naik_advisor.ts â active</span>
                  <div className="w-4 h-4 rounded bg-slate-800" />
                </div>

                {/* Simulated code / interactive list */}
                <div className="p-5 font-mono text-xs text-slate-300/90 space-y-6">
                  
                  {/* Dynamic welcome comment */}
                  <div className="space-y-1 select-none">
                    <span className="text-emerald-400">// Transforming career trajectories in Palnadu district</span>
                    <p className="text-slate-400">
                      <span className="text-primary-400">const</span> <span className="text-amber-300">academy</span> = <span className="text-white">"Balu Naik Academy"</span>;
                    </p>
                    <p className="text-slate-400">
                      <span className="text-primary-400">const</span> <span className="text-amber-300">goal</span> = <span className="text-emerald-300">["100% Industry Readiness", "Durable Careers"]</span>;
                    </p>
                  </div>

                  {/* Program Selector Widgets */}
                  <div className="space-y-3">
                    <span className="text-slate-500 text-[10px] block font-semibold uppercase tracking-wider">CHOOSE YOUR CODE TRACK:</span>
                    
                    {[
                      { title: 'Java Enterprise stack', icon: '☕', sub: 'Spring Boot, Microservices, React' },
                      { title: 'Python Web developer', icon: '🐍', sub: 'Django, PostgreSQL, API integrations' },
                      { title: 'AWS Cloud & DevOps Specialist', icon: '☁️', sub: 'Terraform, Docker, Jenkins pipelines' },
                      { title: 'Automated QA Testing Eng', icon: '🧪', sub: 'Selenium WebDriver, Cucumber BDD' },
                    ].map((item, id) => (
                      <div 
                        key={id} 
                        onClick={onExploreCourses}
                        className="bg-slate-950/60 hover:bg-slate-950 p-3 rounded-xl border border-white/5 hover:border-primary-500/30 transition-all duration-250 cursor-pointer flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg bg-slate-900 w-8 h-8 rounded-lg flex items-center justify-center">{item.icon}</span>
                          <div>
                            <span className="font-semibold text-slate-200 block text-xs tracking-tight group-hover:text-primary-300 transition-colors">{item.title}</span>
                            <span className="text-[10px] text-slate-500 block font-sans">{item.sub}</span>
                          </div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-primary-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                      </div>
                    ))}
                  </div>

                  {/* Immediate registration statistics strip */}
                  <div className="bg-slate-950/90 border border-emerald-500/20 p-4.5 rounded-xl flex items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2">
                      <Flame className="w-5 h-5 text-brand-accent animate-bounce" />
                      <div>
                        <span className="text-[10px] text-slate-400 block font-sans">ADMISSION STATUS</span>
                        <span className="text-emerald-400 text-xs font-bold font-sans">Batch Starts This Monday</span>
                      </div>
                    </div>
                    <button 
                      onClick={onOpenApplyModal}
                      className="bg-brand-accent hover:bg-amber-400 font-sans text-brand-dark font-bold text-[11px] py-1.5 px-3 rounded shadow hover:scale-105 active:scale-95 transition-all text-center uppercase tracking-wide cursor-pointer"
                    >
                      Instant Reg
                    </button>
                  </div>

                </div>
              </div>

              {/* Floating success metric cards */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-6 -right-4 md:-right-6 bg-brand-bg-card border border-brand-border p-3.5 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-md"
              >
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-ping absolute -top-1 -right-1" />
                <div className="bg-emerald-500/10 p-2 rounded-lg">
                  <GraduationCap className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <span className="text-[10px] text-brand-text-muted block uppercase font-bold">RECENT PLACEMENT</span>
                  <span className="text-xs font-extrabold text-brand-text-main block">TCS Drive - 6.5 LPA</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute -top-6 -left-4 md:-left-6 bg-brand-bg-card border border-brand-border p-3.5 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-md"
              >
                <div className="bg-primary-500/10 p-2 rounded-lg">
                  <Calendar className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <span className="text-[10px] text-brand-text-muted block uppercase font-bold">NEXT FREE DEMO</span>
                  <span className="text-xs font-extrabold text-brand-text-main block">Daily Mock Class</span>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
