import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle, FileText, Sparkles, BookOpen, Clock, PlayCircle, 
  User, Award, TrendingUp, Cpu, Calendar, ChevronRight, BarChart3,
  ThumbsUp, MessageSquare, Briefcase, Plus, Send, AlertCircle,
  Activity, GraduationCap, ShieldCheck
} from 'lucide-react';
import { COURSES_DATA } from '../data';

interface StudentWorkspaceProps {
  user: { name: string; email: string; courseInterest: string };
  onCloseWorkspace: () => void;
}

export default function StudentWorkspace({ user, onCloseWorkspace }: StudentWorkspaceProps) {
  // Find course matching user interest, fallback to first course
  const matchedCourse = COURSES_DATA.find(c => 
    c.title.toLowerCase().includes(user.courseInterest.toLowerCase()) || 
    user.courseInterest.toLowerCase().includes(c.title.toLowerCase()) ||
    c.id.toLowerCase().includes(user.courseInterest.toLowerCase())
  ) || COURSES_DATA[0];

  // Modules checkbox state stored in user-specific local storage key
  const storageProgressKey = `balu-tracker-progress-${user.email}-${matchedCourse.id}`;
  const [completedModules, setCompletedModules] = useState<string[]>(() => {
    const stored = localStorage.getItem(storageProgressKey);
    return stored ? JSON.parse(stored) : [];
  });

  // Track selected tab within student workspace
  const [activeTab, setActiveTab] = useState<'syllabus' | 'interview' | 'metrics' | 'resume'>('syllabus');

  // Daily metrics values (1-10)
  const metricStorageKey = `balu-metrics-${user.email}`;
  const [metrics, setMetrics] = useState({
    coding: 7,
    communication: 6,
    aptitude: 6,
    discipline: 8
  });

  // Custom mock placement question state
  const mockQuestionsByCourse: Record<string, { q: string; keywords: string[] }[]> = {
    'java-fullstack': [
      { q: "How does HashMap handle collisions internally in Java 8?", keywords: ["linkedlist", "red-black tree", "hashcode", "equals", "threshold", "overflow"] },
      { q: "What is the difference between Spring dependency injection models: Constructor vs Setter injection?", keywords: ["constructor", "setter", "circular dependency", "immutable", "mandatory"] }
    ],
    'python-fullstack': [
      { q: "Explain PEP 8 guidelines and how list comprehensions outperform manual loops in Python.", keywords: ["pep 8", "readability", "generator", "bytecode", "efficiency", "syntax"] },
      { q: "What is the role of middleware in Django, and how does request-response cycle work?", keywords: ["middleware", "request", "response", "layer", "authentication", "processing"] }
    ],
    'software-testing': [
      { q: "Explain the difference between Page Object Model (POM) and BDD Cucumber framework.", keywords: ["pom", "cucumber", "elements", "gherkin", "reusability", "maintenance", "readable"] },
      { q: "What is the Bug Lifecycle in software testing, and what roles manage severe defects?", keywords: ["defect", "new", "assigned", "testing", "rejected", "closed", "severity", "priority"] }
    ],
    'aws-devops': [
      { q: "Explain how Terraform manages resources using state files and how to prevent locks.", keywords: ["state file", "plan", "apply", "locking", "dynamodb", "s3", "backend"] },
      { q: "What are the main advantages of multi-stage Docker builds for microservice hosting?", keywords: ["multi-stage", "size", "dependencies", "security", "builder", "lightweight"] }
    ],
    'mern-stack': [
      { q: "What is React Virtual DOM, and how does the Reconciliation diff algorithm work?", keywords: ["virtual dom", "reconciliation", "re-render", "keys", "diff", "batching"] },
      { q: "How do JWT tokens manage stateless login sessions and what are solid strategies to prevent XSS?", keywords: ["jwt", "stateless", "httpOnly", "cookie", "xss", "payload", "signature"] }
    ]
  };

  const getQuestions = () => {
    return mockQuestionsByCourse[matchedCourse.id] || mockQuestionsByCourse['java-fullstack'];
  };

  const questions = getQuestions();
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<any | null>(null);

  // Resume builder simulated variables
  const resumeStorageKey = `balu-resume-${user.email}`;
  const [resumeData, setResumeData] = useState({
    college: 'Palnadu Technical Campus',
    degree: 'B.Tech - Computer Science',
    yop: '2026',
    github: 'github.com/balu-trainee',
    bio: 'Dedicated student aiming to launch enterprise web systems.',
    skills: matchedCourse.skillsCovered.slice(0, 6)
  });
  const [isResumeSaved, setIsResumeSaved] = useState(false);

  // Save metrics on change
  useEffect(() => {
    const stored = localStorage.getItem(metricStorageKey);
    if (stored) {
      setMetrics(JSON.parse(stored));
    }
    
    const storedResume = localStorage.getItem(resumeStorageKey);
    if (storedResume) {
      setResumeData(JSON.parse(storedResume));
    }
  }, [user.email]);

  const handleModuleToggle = (moduleName: string) => {
    const updated = completedModules.includes(moduleName)
      ? completedModules.filter(m => m !== moduleName)
      : [...completedModules, moduleName];
    
    setCompletedModules(updated);
    localStorage.setItem(storageProgressKey, JSON.stringify(updated));
  };

  const handleMetricChange = (key: keyof typeof metrics, val: number) => {
    const updated = { ...metrics, [key]: val };
    setMetrics(updated);
    localStorage.setItem(metricStorageKey, JSON.stringify(updated));
  };

  const handleEvaluateAnswer = () => {
    if (!studentAnswer.trim()) return;

    setIsEvaluating(true);
    setEvaluationResult(null);

    // Dynamic rule-base score simulation checking actual loaded keywords!
    setTimeout(() => {
      const q = questions[selectedQuestionIndex];
      const answerLower = studentAnswer.toLowerCase();
      const matchedKeywords = q.keywords.filter(kw => answerLower.includes(kw));
      const matchRatio = matchedKeywords.length / q.keywords.length;

      let score = 30; // base score
      let grade = 'C';
      let comments = '';

      if (matchRatio >= 0.8) {
        score = 92 + Math.floor(Math.random() * 7);
        grade = 'S (Superb)';
        comments = 'Excellent technical depth! You targeted all standard HR keywords. Great structural answer.';
      } else if (matchRatio >= 0.5) {
        score = 75 + Math.floor(Math.random() * 12);
        grade = 'A (Satisfactory)';
        comments = 'Very strong comprehension. To achieve an S-grade, briefly detail the internal workflows and explain production-level nuances.';
      } else if (matchRatio >= 0.2) {
        score = 55 + Math.floor(Math.random() * 15);
        grade = 'B (Average)';
        comments = 'A good informal summary. Incorporate official vocabulary terms to impress placement interview panels.';
      } else {
        score = 40 + Math.floor(Math.random() * 12);
        grade = 'C (Review Needed)';
        comments = 'The concept was partially stated. Let us master the specific module definitions again and refine our theoretical core.';
      }

      setEvaluationResult({
        score,
        grade,
        feedback: comments,
        matched: matchedKeywords,
        missing: q.keywords.filter(kw => !matchedKeywords.includes(kw))
      });
      setIsEvaluating(false);
    }, 1500);
  };

  const handleSaveResume = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(resumeStorageKey, JSON.stringify(resumeData));
    setIsResumeSaved(true);
    setTimeout(() => setIsResumeSaved(false), 2500);
  };

  // Compute stats of progress
  const progressPercent = Math.round((completedModules.length / matchedCourse.modules.length) * 100);

  // Compute calculated Placement Readiness Score
  // Logic: 40% module progress, 60% standard self assessment scores
  const compositeReadinessScore = Math.round(
    (progressPercent * 0.4) + 
    (((metrics.coding + metrics.communication + metrics.aptitude + metrics.discipline) / 4) * 10) * 0.6
  );

  return (
    <div className="w-full bg-slate-950 border border-white/15 rounded-3xl overflow-hidden shadow-2xl relative my-10 max-w-7xl mx-auto selection:bg-amber-500 selection:text-slate-950">
      {/* High-tech top ambient gradient bars */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-primary-600 via-amber-500 to-indigo-600" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main dashboard header branding bar */}
      <div className="bg-[#0b1220] border-b border-white/5 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 px-3 py-1 rounded-full text-xs text-primary-400 font-mono font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Interactive Trainee Workspace</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase leading-tight">
            Greetings, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-amber-400 to-indigo-400">{user.name}</span>!
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-light max-w-2xl leading-relaxed">
            Welcome to your career prep terminal. Keep tracking modules, practice simulated placement tests, configure your callback profile, and benchmark recruitment readiness.
          </p>
        </div>

        <button
          onClick={onCloseWorkspace}
          className="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white px-5 py-3 rounded-2xl text-xs font-extrabold tracking-wider uppercase border border-white/10 hover:border-white/25 transition-all text-center cursor-pointer shrink-0"
        >
          ← Back to Main Info Screen
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Side: Dynamic Workspace Navigation & Stats Hub */}
        <div className="lg:col-span-4 bg-[#0a0f19] border-r border-white/5 p-6 space-y-6">
          
          {/* Active Career Track Status Card */}
          <div className="bg-[#0e1626] border border-white/5 p-5 rounded-2xl space-y-4">
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest font-mono">
              Selected Training Track
            </span>
            <div className="flex items-start gap-3">
              <div className="bg-primary-600/20 p-2.5 rounded-xl border border-primary-500/20 mt-1">
                <GraduationCap className="w-5 h-5 text-primary-400" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-slate-100 leading-tight">
                  {matchedCourse.title}
                </h3>
                <div className="flex gap-2 text-[10px] font-mono text-slate-400 mt-1">
                  <span>{matchedCourse.duration}</span>
                  <span>•</span>
                  <span>{matchedCourse.mode}</span>
                </div>
              </div>
            </div>

            {/* Course completion percentage bar info */}
            <div className="pt-2 space-y-2">
              <div className="flex justify-between items-center text-[11px] font-bold">
                <span className="text-slate-400">Lessons Completed</span>
                <span className="text-white font-mono">{progressPercent}%</span>
              </div>
              <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-primary-600 via-amber-500 to-indigo-500 rounded-full"
                />
              </div>
              <span className="text-[10px] text-slate-400 block font-light">
                {completedModules.length} of {matchedCourse.modules.length} lessons unlocked.
              </span>
            </div>
          </div>

          {/* Placement Match Score Index Gauge */}
          <div className="bg-[#0e1626] border border-white/5 p-5 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-500/10 to-transparent blur-xl" />
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono block">
              Placement Readiness Index
            </span>
            
            <div className="pt-4 flex items-baseline gap-2">
              <span className="text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 tracking-tight font-mono">
                {compositeReadinessScore}%
              </span>
              <span className="text-xs text-slate-400 font-light font-mono">readiness factor</span>
            </div>

            {/* Simulated recruiting tier alert */}
            <div className="mt-4 pt-3 border-t border-white/5 space-y-3">
              <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                {compositeReadinessScore >= 80 
                  ? '🔥 VIP access unlocked! Our Palnadu partners will prioritize your profile for corporate interviews.'
                  : compositeReadinessScore >= 50 
                  ? '⚡ Good progress! Complete 2 more modules or self-assessments to unlock priority matching.'
                  : '⏳ Master coding basics and log focus hours to scale your mock matching indicators.'}
              </p>

              {/* Recruitment company match visual cards */}
              <div className="grid grid-cols-3 gap-2 text-center text-[9px] font-mono">
                <div className={`p-1.5 rounded-lg border ${compositeReadinessScore >= 50 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' : 'bg-slate-900/50 border-white/5 text-slate-500'}`}>
                  TCS Ready
                </div>
                <div className={`p-1.5 rounded-lg border ${compositeReadinessScore >= 70 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' : 'bg-slate-900/50 border-white/5 text-slate-500'}`}>
                  Cognizant
                </div>
                <div className={`p-1.5 rounded-lg border ${compositeReadinessScore >= 85 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' : 'bg-slate-900/50 border-white/5 text-slate-500'}`}>
                  Accenture
                </div>
              </div>
            </div>
          </div>

          {/* Modern Workspace Sidebar Navigation tabs buttons */}
          <div className="space-y-1.5">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono block mb-2 px-1">
              Dashboard Navigation
            </span>
            {[
              { id: 'syllabus', label: 'Trainee Catalog Modules', icon: BookOpen },
              { id: 'metrics', label: 'Cognitive Logs & Self-Assess', icon: Activity },
              { id: 'interview', label: 'AI Mock Interview Simulator', icon: Cpu },
              { id: 'resume', label: 'Academy Callback Profile', icon: FileText }
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all text-xs text-left cursor-pointer ${
                    isActive 
                      ? 'bg-gradient-to-r from-primary-600/20 to-primary-600/5 border-primary-500/40 text-white font-extrabold'
                      : 'bg-transparent border-transparent hover:border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <TabIcon className={`w-4 h-4 ${isActive ? 'text-primary-400' : 'text-slate-400'}`} />
                    <span>{tab.label}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${isActive ? 'translate-x-0.5 text-primary-400' : 'text-slate-600 opacity-0 group-hover:opacity-100'}`} />
                </button>
              );
            })}
          </div>

        </div>

        {/* Right Side: Main Active Work Space Panels */}
        <div className="lg:col-span-8 bg-[#070b12] p-6 sm:p-8 min-h-[480px]">
          
          <AnimatePresence mode="wait">
            
            {/* TAB: Syllabus / Module progress checklist */}
            {activeTab === 'syllabus' && (
              <motion.div
                key="syllabus"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="font-display font-black text-lg text-white uppercase tracking-tight">
                      Syllabus Learning Checklist
                    </h3>
                    <p className="text-xs text-slate-400 font-light mt-1">
                      Check off modules as you complete physical training classes or pass internal assessments.
                    </p>
                  </div>
                  <div className="bg-[#0a0f19] border border-white/5 px-4 py-1.5 rounded-xl">
                    <span className="text-[10px] text-slate-400 font-bold block">CURRENT TRACK</span>
                    <span className="text-xs font-semibold text-primary-400 leading-none block mt-0.5">{matchedCourse.title}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 pt-2">
                  {matchedCourse.modules.map((moduleName, index) => {
                    const isDone = completedModules.includes(moduleName);
                    return (
                      <div 
                        key={index}
                        onClick={() => handleModuleToggle(moduleName)}
                        className={`p-4 border rounded-2xl flex items-start gap-4 transition-all hover:bg-white/[0.01] cursor-pointer group ${
                          isDone 
                            ? 'bg-emerald-500/[0.03] border-emerald-500/20' 
                            : 'bg-[#0a0f19] border-white/5'
                        }`}
                      >
                        <button
                          type="button"
                          className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-all ${
                            isDone 
                              ? 'bg-emerald-500 border-emerald-500 text-slate-950' 
                              : 'transparent border-slate-700 group-hover:border-slate-500'
                          }`}
                        >
                          {isDone && (
                            <svg className="w-3.5 h-3.5 stroke-[4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>

                        <div className="space-y-1 text-left">
                          <h4 className={`text-xs sm:text-sm font-semibold transition-colors leading-relaxed ${
                            isDone ? 'text-emerald-400 line-through' : 'text-slate-100 group-hover:text-primary-400'
                          }`}>
                            {moduleName}
                          </h4>
                          <div className="flex flex-wrap gap-2 text-[10px] font-mono text-slate-500">
                            <span>Balu Naik Academy Standard</span>
                            <span>•</span>
                            <span className="text-amber-500">Includes Practice Homework</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* TAB: Trainee Cognitive Logs & Self Assessment */}
            {activeTab === 'metrics' && (
              <motion.div
                key="metrics"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-display font-black text-lg text-white uppercase tracking-tight">
                    Trainee Metrics Self-Assessment
                  </h3>
                  <p className="text-xs text-slate-400 font-light mt-1">
                    Log and rate your engineering and communication strengths daily. This maps directly to placements suitability.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  
                  {/* Left panel: sliders of values */}
                  <div className="space-y-5 bg-[#0a0f19] border border-white/5 p-5 rounded-2xl">
                    <h4 className="text-xs font-extrabold uppercase font-mono text-slate-300 tracking-wide mb-3">
                      Configure Trainee Strengths
                    </h4>

                    {[
                      { key: 'coding', label: 'Technical Coding Logic', desc: 'Syntax, databases, dynamic project architecture', color: 'bg-primary-500' },
                      { key: 'communication', label: 'Soft Skills & Communication', desc: 'Group roundtable talks, HR presentations, mock interviews', color: 'bg-amber-500' },
                      { key: 'aptitude', label: 'Aptitude & Logical Analysis', desc: 'Problem solving speed, quantitative techniques', color: 'bg-indigo-500' },
                      { key: 'discipline', label: 'Physical Focus & Discipline', desc: 'Academy attendance, labs, mock session submission', color: 'bg-emerald-500' }
                    ].map((metric) => (
                      <div key={metric.key} className="space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-slate-200">{metric.label}</span>
                          <span className="font-mono text-white bg-slate-900 border border-white/5 px-2 py-0.5 rounded text-[11px] font-black">
                            {metrics[metric.key as keyof typeof metrics]} / 10
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-light leading-relaxed">
                          {metric.desc}
                        </p>
                        <div className="flex items-center gap-4">
                          <input 
                            type="range" 
                            min="1" 
                            max="10" 
                            value={metrics[metric.key as keyof typeof metrics]} 
                            onChange={(e) => handleMetricChange(metric.key as any, parseInt(e.target.value))}
                            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right panel: Custom visual layout mapping strengths */}
                  <div className="bg-[#0a0f19] border border-white/5 p-5 rounded-2xl flex flex-col justify-between h-full space-y-6">
                    <div>
                      <h4 className="text-xs font-extrabold uppercase font-mono text-slate-300 tracking-wide mb-1">
                        Metrics Visual Chart
                      </h4>
                      <p className="text-[10px] text-slate-400 font-light leading-relaxed">
                        Visualize balanced dimensions of your career readiness. Aim for a balanced profile.
                      </p>
                    </div>

                    {/* Custom bar chart representation */}
                    <div className="py-6 flex justify-around items-end h-40 bg-slate-950/40 rounded-xl relative border border-white/[0.03]">
                      <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
                      
                      {[
                        { key: 'coding', label: 'Code', color: 'from-blue-600 to-blue-400' },
                        { key: 'communication', label: 'Talk', color: 'from-amber-600 to-amber-400' },
                        { key: 'aptitude', label: 'Apt', color: 'from-indigo-600 to-indigo-400' },
                        { key: 'discipline', label: 'Focus', color: 'from-emerald-600 to-emerald-400' }
                      ].map((item) => {
                        const val = metrics[item.key as keyof typeof metrics];
                        const percentage = `${val * 10}%`;
                        return (
                          <div key={item.key} className="flex flex-col items-center gap-2 h-full justify-end z-10 w-12">
                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: percentage }}
                              transition={{ duration: 0.4 }}
                              className={`w-4 sm:w-6 bg-gradient-to-t ${item.color} rounded-t-lg shadow-lg relative group`}
                            >
                              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 border border-white/10 text-[9px] px-1.5 py-0.5 rounded text-white font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {val} / 10
                              </div>
                            </motion.div>
                            <span className="text-[10px] font-mono text-slate-400 font-bold tracking-tight">
                              {item.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="bg-[#0e1626] border border-white/5 p-3 rounded-xl text-center">
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                        Composite Trainee Quotient
                      </span>
                      <span className="block text-xl font-black text-white mt-1 font-mono">
                        {( (metrics.coding + metrics.communication + metrics.aptitude + metrics.discipline) / 4 ).toFixed(1)} / 10.0
                      </span>
                    </div>

                  </div>

                </div>

              </motion.div>
            )}

            {/* TAB: AI Mock Placement simulator */}
            {activeTab === 'interview' && (
              <motion.div
                key="interview"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 text-left"
              >
                <div>
                  <h3 className="font-display font-black text-lg text-white uppercase tracking-tight">
                    AI Placement Interview Simulator
                  </h3>
                  <p className="text-xs text-slate-400 font-light mt-1">
                    Select a core placement question specific to your track and practice writing explanations. Receive instant keyword density grading checkups.
                  </p>
                </div>

                <div className="space-y-4">
                  
                  {/* Select Question List */}
                  <div className="flex flex-wrap gap-2">
                    {questions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedQuestionIndex(idx);
                          setStudentAnswer('');
                          setEvaluationResult(null);
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          selectedQuestionIndex === idx 
                            ? 'bg-primary-600/10 border-primary-500 text-primary-400' 
                            : 'bg-[#0a0f19] border-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        Placement Practice Question #{idx + 1}
                      </button>
                    ))}
                  </div>

                  {/* Active Question Box */}
                  <div className="bg-[#0a0f19] border border-white/5 p-5 rounded-2xl relative">
                    <div className="absolute top-4 right-4 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-lg px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider font-mono">
                      Recruiter Core Focus Question
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono">
                      Interactive Practice Query
                    </span>
                    <h4 className="font-bold text-sm sm:text-base text-slate-200 mt-2 leading-relaxed">
                      {questions[selectedQuestionIndex].q}
                    </h4>
                  </div>

                  {/* Evaluation Criteria Info */}
                  <div className="flex items-center gap-1.5 flex-wrap text-[10px] font-mono text-slate-500 px-1">
                    <span>Grading keywords:</span>
                    {questions[selectedQuestionIndex].keywords.map((kw, lid) => (
                      <span key={lid} className="bg-slate-900 border border-white/5 text-slate-300 px-1.5 py-0.5 rounded">
                        {kw}
                      </span>
                    ))}
                  </div>

                  {/* Code Answer Input Form area */}
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold block">
                      Type Your Answer response below:
                    </label>
                    <textarea
                      placeholder="Enter your interview explanation here..."
                      value={studentAnswer}
                      onChange={(e) => setStudentAnswer(e.target.value)}
                      rows={5}
                      className="w-full bg-[#0a0f19] border border-white/10 rounded-2xl p-4 text-sm text-slate-200 focus:outline-none focus:border-primary-500 focus:bg-slate-950 transition-colors placeholder:text-slate-600 leading-relaxed font-mono"
                    />
                  </div>

                  {/* Action Evaluate Form Submission */}
                  <div className="flex justify-between items-center flex-wrap gap-4 pt-1">
                    <div className="text-[10px] text-slate-500 font-mono">
                      Tip: Use standard technical keywords to qualify for Higher S/A Grade scores.
                    </div>
                    <button
                      type="button"
                      disabled={isEvaluating || !studentAnswer.trim()}
                      onClick={handleEvaluateAnswer}
                      className="bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-white font-bold py-2.5 px-6 rounded-xl shadow-lg border border-white/5 text-xs flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                    >
                      {isEvaluating ? (
                        <>
                          <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Grading...</span>
                        </>
                      ) : (
                        <>
                          <Cpu className="w-4 h-4" />
                          <span>AI Assessment Grading Check</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Reveal results if any */}
                  <AnimatePresence>
                    {evaluationResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        className="bg-[#0f182c] border border-white/10 p-5 rounded-2xl space-y-4 text-left"
                      >
                        <div className="flex justify-between items-start flex-wrap gap-4 pb-3 border-b border-white/5">
                          <div className="space-y-1">
                            <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest font-mono">
                              Placement assessment result
                            </span>
                            <h4 className="font-bold text-sm text-white">
                              Keyword density grade: <span className="text-primary-400 font-mono font-black">{evaluationResult.grade}</span>
                            </h4>
                          </div>
                          
                          <div className="bg-slate-900 border border-white/15 px-4 py-2 rounded-xl text-center">
                            <span className="text-[8px] text-slate-400 block font-mono">SCORE</span>
                            <span className="font-display font-black text-lg text-amber-400 font-mono leading-none">
                              {evaluationResult.score}/100
                            </span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <span className="text-[9px] text-slate-500 font-extrabold uppercase font-mono tracking-wider block">
                              Recruiter Feedback
                            </span>
                            <p className="text-xs text-slate-300 font-light mt-1 leading-relaxed">
                              {evaluationResult.feedback}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                            {/* Matched Keywords */}
                            <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-3">
                              <span className="text-[9px] text-emerald-400 font-bold uppercase font-mono tracking-wider block">
                                Matched Keywords ({evaluationResult.matched.length})
                              </span>
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {evaluationResult.matched.length > 0 ? (
                                  evaluationResult.matched.map((m: string, mid: number) => (
                                    <span key={mid} className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-mono px-1.5 py-0.5 rounded">
                                      ✓ {m}
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-[10px] text-slate-500 font-light italic">None detected. Try using more precise terms.</span>
                                )}
                              </div>
                            </div>

                            {/* Missing Keywords */}
                            <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-xl p-3">
                              <span className="text-[9px] text-indigo-400 font-bold uppercase font-mono tracking-wider block">
                                Sugggested to add ({evaluationResult.missing.length})
                              </span>
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {evaluationResult.missing.length > 0 ? (
                                  evaluationResult.missing.map((m: string, mid: number) => (
                                    <span key={mid} className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[9px] font-mono px-1.5 py-0.5 rounded">
                                      + {m}
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-[10px] text-emerald-400 font-mono font-bold text-[9px]">Perfect keyword coverage!</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </motion.div>
            )}

            {/* TAB: Create dynamic job callback package profile */}
            {activeTab === 'resume' && (
              <motion.div
                key="resume"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 text-left"
              >
                <div>
                  <h3 className="font-display font-black text-lg text-white uppercase tracking-tight">
                    Academy Placement Callback Profile
                  </h3>
                  <p className="text-xs text-slate-400 font-light mt-1">
                    Configure your academic qualifications, year of passout, and personal bio. This generates a standardized curriculum resume package accessed by our hiring partners.
                  </p>
                </div>

                <form onSubmit={handleSaveResume} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold block">
                        College / Institution Name
                      </label>
                      <input
                        type="text"
                        value={resumeData.college}
                        onChange={(e) => setResumeData({...resumeData, college: e.target.value})}
                        className="w-full bg-[#0a0f19] border border-white/5 rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-slate-200 focus:outline-[#facc15] transition-all"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold block">
                        Academic Degree & Stream
                      </label>
                      <input
                        type="text"
                        value={resumeData.degree}
                        onChange={(e) => setResumeData({...resumeData, degree: e.target.value})}
                        className="w-full bg-[#0a0f19] border border-white/5 rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-slate-200 focus:outline-[#facc15] transition-all"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold block">
                        Year of Passout (YOP)
                      </label>
                      <select
                        value={resumeData.yop}
                        onChange={(e) => setResumeData({...resumeData, yop: e.target.value})}
                        className="w-full bg-[#0a0f19] border border-white/5 rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-slate-200 focus:outline-[#facc15] transition-all cursor-pointer"
                      >
                        <option value="2023">2023 or older</option>
                        <option value="2024">2024 (Recently Graduated)</option>
                        <option value="2025">2025 (Final Year)</option>
                        <option value="2026">2026 (Pre-Final Year)</option>
                        <option value="2027">2027 or younger</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold block">
                        GitHub Profile / Portfolio Link
                      </label>
                      <input
                        type="text"
                        value={resumeData.github}
                        onChange={(e) => setResumeData({...resumeData, github: e.target.value})}
                        className="w-full bg-[#0a0f19] border border-white/5 rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-slate-200 focus:outline-[#facc15] transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold block">
                      Placement Bio / Statement
                    </label>
                    <textarea
                      value={resumeData.bio}
                      onChange={(e) => setResumeData({...resumeData, bio: e.target.value})}
                      rows={3}
                      className="w-full bg-[#0a0f19] border border-white/5 rounded-xl p-3 max-h-32 text-xs sm:text-sm text-slate-200 focus:outline-[#facc15] transition-all"
                      placeholder="e.g. Seeking a robust Junior Java Full-Stack placement role where I can employ Spring Boot rest controller experience..."
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="submit"
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-2.5 px-6 rounded-xl shadow-lg shadow-amber-550/10 text-xs sm:text-sm cursor-pointer transition-all flex items-center gap-1.5"
                    >
                      {isResumeSaved ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          <span>Callback Saved Successfully!</span>
                        </>
                      ) : (
                        <>
                          <span>Save & Submit Profile</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Simulated dynamic recruitment candidate summary slip */}
                <div className="p-5 rounded-2xl bg-gradient-to-tr from-[#0c1322] to-[#0a0f19] border border-white/10 relative overflow-hidden space-y-4">
                  <div className="absolute top-4 right-4 text-emerald-400 font-mono text-[9px] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>Live Match Database</span>
                  </div>

                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono block">
                    Recruiter View Slip Preview
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 text-left">
                      <span className="text-xs text-slate-400 font-light block">CANDIDATE</span>
                      <h4 className="font-bold text-sm text-white leading-none capitalize">{user.name}</h4>
                      <span className="text-[11px] text-primary-400 block font-mono">{user.email}</span>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <span className="text-xs text-slate-400 font-light block">TECHNICAL ACCREDITATION</span>
                      <h4 className="font-bold text-sm text-amber-500 leading-none">{matchedCourse.title}</h4>
                      <span className="text-[10px] font-mono text-slate-400 block mt-1">Passing standard verified by Balu Naik Academy</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex flex-wrap gap-1.5 text-[9px]">
                    <span className="text-slate-400 mr-2 py-0.5">ACCREDITED SKILLS:</span>
                    {resumeData.skills.map((sk: string, sid: number) => (
                      <span key={sid} className="bg-white/5 border border-white/5 text-slate-300 px-2 py-0.5 rounded font-mono">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}

          </AnimatePresence>
          
        </div>

      </div>

    </div>
  );
}
