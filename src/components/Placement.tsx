import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Building2, CheckCircle2, Award, Zap, Users, GraduationCap, ArrowUpRight } from 'lucide-react';

export default function Placement() {
  const recruitmentSteps = [
    {
      title: 'Industry Aligned Portfolio Build',
      desc: 'Instead of dry theoretical concepts, you write active corporate deployment codes. We construct comprehensive GitHub portfolios and clean LinkedIn profile hooks that naturally highlight your capability.',
      icon: Users,
    },
    {
      title: 'Mock Coding & Deep Review Panels',
      desc: 'Our mock interviews simulate official MNC screenings. We train you daily on standard SQL performance issues, data structure concepts, writing algorithmic structures, and automated QA tests.',
      icon: Zap,
    },
    {
      title: 'Weekly Recruiting Drives & Referrals',
      desc: 'Our placement cell shares your credentials directly with engineering managers at our partner networks. We schedule interview calls and offer dedicated on-campus coding rounds.',
      icon: Briefcase,
    }
  ];

  const coreLogos = [
    { name: 'Tata Consultancy Services', short: 'TCS' },
    { name: 'Infosys Technologies', short: 'Infosys' },
    { name: 'Tech Mahindra', short: 'TechM' },
    { name: 'Cognizant Technology Solutions', short: 'Cognizant' },
    { name: 'Wipro Technologies', short: 'Wipro' },
    { name: 'Capgemini SE', short: 'Capgemini' },
    { name: 'Deloitte Services', short: 'Deloitte' },
    { name: 'Accenture', short: 'Accenture' },
  ];

  return (
    <section id="placements" className="py-20 md:py-28 bg-brand-bg-accent text-brand-text-main relative overflow-hidden transition-colors duration-300">
      {/* Background visual graphics */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-primary-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Stats & Methodology */}
          <div className="col-span-1 lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-primary-500 text-xs sm:text-sm font-extrabold tracking-widest uppercase block">
                ★ 100% COMMITTED CAREER CELL
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight uppercase text-brand-text-main">
                Our Ultimate Placement Support Ecosystem
              </h2>
              <div className="w-16 h-1 bg-brand-accent rounded" />
              <p className="text-brand-text-muted text-base sm:text-lg leading-relaxed font-light">
                Our success relies entirely on our graduates landing high-performance tech roles. From day one, your studies are customized around actual workplace expectations. Here is how we get you ready:
              </p>
            </div>

            {/* Steps Timeline visual */}
            <div className="space-y-6">
              {recruitmentSteps.map((step, idx) => {
                const IconComponent = step.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.4, delay: idx * 0.15 }}
                    className="flex gap-4 p-5 rounded-2xl bg-brand-bg-card border border-brand-border hover:border-primary-500/30 transition-all group"
                  >
                    <div className="bg-primary-500/10 text-primary-500 p-3 rounded-xl shrink-0 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-brand-text-main text-base group-hover:text-primary-500 transition-colors">
                        {step.title}
                      </h4>
                      <p className="text-brand-text-muted text-xs sm:text-sm font-light leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>

          {/* Right Column: Interactive Placement Wall of Fame */}
          <div className="col-span-1 lg:col-span-5 space-y-6">
            
            <div className="bg-brand-bg-card border border-brand-border rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              {/* Top ambient light reflections */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="absolute top-4 right-4 bg-amber-500/15 text-amber-500 text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border border-amber-500/20 tracking-wider uppercase select-none">
                Macherla Active Drives
              </div>

              <div className="space-y-6 pt-2">
                
                {/* Re-designed Highest Package banner - Gorgeous Glassmorphic container */}
                <div className="bg-gradient-to-r from-amber-500/10 to-amber-600/5 border border-amber-500/30 rounded-2xl p-5 text-center relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
                  <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest block font-mono">
                    ★ HIGHEST package ACHIEVED
                  </span>
                  <div className="text-4xl sm:text-5xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-amber-400 mt-1 select-all">
                    18.0 LPA
                  </div>
                  <span className="text-[11px] text-brand-text-muted font-light block mt-1.5 leading-relaxed">
                    Offered to our expert MERN trainee by a premium enterprise scaling cloud solution startup
                  </span>
                </div>

                <div className="space-y-3.5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-brand-text-muted uppercase tracking-widest font-extrabold block font-mono">
                      ALUMNI CORPORATE NETWORKS
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  
                  {/* Company Badges grid - Gorgeous high-contrast tiles with specific left-border highlights */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { short: 'TCS', name: 'Tata Consultancy', accent: 'border-l-blue-500' },
                      { short: 'Infosys', name: 'Infosys Tech', accent: 'border-l-emerald-500' },
                      { short: 'TechM', name: 'Tech Mahindra', accent: 'border-l-orange-500' },
                      { short: 'Cognizant', name: 'Cognizant CTS', accent: 'border-l-cyan-500' },
                      { short: 'Wipro', name: 'Wipro Limited', accent: 'border-l-purple-500' },
                      { short: 'Capgemini', name: 'Capgemini SE', accent: 'border-l-red-500' },
                      { short: 'Deloitte', name: 'Deloitte Services', accent: 'border-l-emerald-400' },
                      { short: 'Accenture', name: 'Accenture Corp', accent: 'border-l-indigo-500' },
                    ].map((logo, lid) => (
                      <motion.div 
                        key={lid} 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        whileHover={{ scale: 1.04, y: -3 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: lid * 0.04,
                          scale: { type: "spring", stiffness: 400, damping: 25 }
                        }}
                        className={`bg-brand-bg-accent border border-brand-border ${logo.accent} border-l-2 rounded-xl p-3 flex flex-col justify-center items-start text-left group hover:bg-brand-bg-main transition-all duration-300 cursor-pointer hover:shadow-lg`}
                      >
                        <span className="font-display font-black text-xs sm:text-sm text-brand-text-main tracking-tight block uppercase group-hover:text-primary-500 transition-colors">
                          {logo.short}
                        </span>
                        <span className="text-[9px] text-brand-text-muted font-sans leading-none mt-1 transition-colors select-none block">
                          {logo.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                </div>

                {/* Placement Stats Gauges */}
                <div className="bg-brand-bg-accent border border-brand-border p-5 rounded-2xl space-y-4">
                  <div className="flex items-center gap-2.5">
                    <Award className="w-5 h-5 text-amber-500 shrink-0" />
                    <span className="text-xs font-bold text-brand-text-main uppercase tracking-widest font-mono">PLACEMENT METRICS DETAILED</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 divide-x divide-brand-border">
                    <div className="text-center pl-2">
                      <span className="text-3xl font-bold font-display block text-brand-text-main tracking-tight">94%</span>
                      <span className="text-[10px] text-brand-text-muted uppercase tracking-widest mt-1 block">Immediate Offers</span>
                      <p className="text-[9px] text-brand-text-muted/70 font-light leading-none mt-1">Within 12 weeks of finishing</p>
                    </div>
                    <div className="text-center pl-2">
                      <span className="text-3xl font-bold font-display block text-brand-text-main tracking-tight">35%</span>
                      <span className="text-[10px] text-brand-text-muted uppercase tracking-widest mt-1 block">Multi-Offers</span>
                      <p className="text-[9px] text-brand-text-muted/70 font-light leading-none mt-1">Candidates holding 2+ letters</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Rebuilt modern Recruiter & Hiring callback desk block - Sleek, High-Contrast */}
            <div className="bg-brand-bg-card border border-brand-border text-brand-text-muted rounded-3xl p-5.5 flex flex-col sm:flex-row gap-4 items-center justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary-500/10 rounded-full blur-xl pointer-events-none animate-pulse" />
              
              <div className="flex gap-3.5 items-start text-left">
                <div className="bg-primary-500 text-white rounded-xl h-11 w-11 flex items-center justify-center shrink-0 shadow-lg shadow-primary-500/10">
                  <Building2 className="w-5.5 h-5.5" />
                </div>
                <div className="space-y-1">
                  <span className="bg-primary-500/15 text-primary-500 text-[9px] font-bold px-2 py-0.5 rounded tracking-widest uppercase inline-block">
                    Hiring Managers Only
                  </span>
                  <h4 className="font-display font-bold text-sm text-brand-text-main group-hover:text-primary-500 transition-colors">
                    Access Placed-Ready Resumes
                  </h4>
                  <p className="text-[11px] text-brand-text-muted font-light leading-normal max-w-sm">
                    Are you a recruiter? Get immediate access to our list of highly trained software testing and web full-stack developers in AP.
                  </p>
                </div>
              </div>

              <a 
                href="#contact" 
                className="w-full sm:w-auto bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs py-3 px-5 rounded-xl border border-white/5 text-center shadow-lg transition-all hover:scale-[1.03] active:scale-95 shrink-0 whitespace-nowrap cursor-pointer"
              >
                Request Candidate Pool
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
