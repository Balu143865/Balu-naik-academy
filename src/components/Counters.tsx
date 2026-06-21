import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { GraduationCap, Award, Building, Sparkles, TrendingUp, Handshake } from 'lucide-react';
import { STATS_DATA } from '../data';

// Helper component for animating individual numeric count
function CounterItem({ target, suffix, speed = 40 }: { target: number; suffix: string; speed?: number }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(elementRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = target;
    if (start === end) return;

    // Total duration should be around 1 to 1.5 seconds
    const duration = 1200; 
    const stepTime = Math.max(Math.floor(duration / end), 15);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / (duration / stepTime));
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  // If target represents a decimal like 5.2 LPA (we pass target=52, and format with decimals)
  const displayValue = target === 52 
    ? (count / 10).toFixed(1) 
    : count.toLocaleString('en-IN');

  return (
    <span ref={elementRef} className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-brand-text-main tracking-tight">
      {displayValue}
      <span className="text-primary-500 font-sans ml-0.5">{suffix}</span>
    </span>
  );
}

export default function Counters() {
  const iconMap: Record<string, any> = {
    GraduationCap: GraduationCap,
    Sparkles: Sparkles,
    Building: Building,
    Award: Award,
    TrendingUp: TrendingUp,
  };

  return (
    <section className="relative bg-brand-bg-accent py-12 md:py-16 -mt-8 z-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subtle decorative card wrap */}
        <div className="bg-brand-bg-card border border-brand-border rounded-3xl shadow-xl p-6 sm:p-10 lg:p-12 backdrop-blur-md">
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4">
            {STATS_DATA.map((stat, i) => {
              const IconComponent = iconMap[stat.iconName] || GraduationCap;
              
              return (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center p-2.5 sm:p-4 group"
                >
                  {/* Decorative Icon Circle */}
                  <div className="bg-primary-500/10 text-primary-400 border border-primary-500/10 p-3.5 rounded-2xl group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 shadow-sm mb-4">
                    <IconComponent className="w-6 h-6" />
                  </div>
 
                  {/* Counter Value */}
                  <CounterItem target={stat.target} suffix={stat.suffix} />
 
                  {/* Stat Description label */}
                  <span className="text-brand-text-muted text-xs sm:text-sm font-semibold tracking-wide text-center uppercase block mt-2.5">
                    {stat.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
 
          <div className="mt-10 border-t border-brand-border pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-text-muted">
            <div className="flex items-center gap-2">
              <Handshake className="w-5 h-5 text-primary-500 shrink-0" />
              <span>Direct partnerships representing major MNCs, product companies, and national tech setups.</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block mr-1" />
              <span className="font-semibold text-brand-text-main">62 Students Placed in the Last 30 Days</span>
            </div>
          </div>
 
        </div>
 
      </div>
    </section>
  );
}
