import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ShieldAlert, ChevronLeft, ChevronRight, MessageSquare, Quote, HeartHandshake } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 md:py-28 bg-brand-bg-main relative overflow-hidden transition-colors duration-300">
      {/* Decorative Blur Backing */}
      <div className="absolute top-0 right-10 w-72 h-72 bg-primary-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="text-primary-500 text-xs sm:text-sm font-extrabold tracking-widest uppercase block font-mono">
            ★ VERIFIED TRANSFORMATION ALUMNI
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-brand-text-main tracking-tight leading-tight uppercase">
            Meet Our Placed Grads from Palnadu
          </h2>
          <div className="w-16 h-1 bg-primary-500 mx-auto rounded" />
          <p className="text-brand-text-muted text-base sm:text-lg font-light">
            Read inspiring career milestones from everyday students who studied at Balu Naik Academy, masterminded high-demand software languages, and earned roles in premier tech systems.
          </p>
        </div>

        {/* Testimonial Active Display Card Carousel */}
        <div className="max-w-4xl mx-auto relative px-4 md:px-12">
          
          {/* Main Display Area */}
          <div className="relative bg-brand-bg-card border border-brand-border rounded-3xl shadow-2xl p-6 sm:p-10 md:p-12 transition-all">
            
            {/* Quote watermark icon */}
            <Quote className="absolute top-6 right-8 w-20 h-20 text-brand-text-muted/10 shrink-0 select-none -scale-x-100 pointer-events-none" />

            <div className="relative z-10 space-y-6">
              
              {/* Star Rating & Course */}
              <div className="flex flex-wrap justify-between items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(TESTIMONIALS_DATA[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary-500 text-primary-500" />
                  ))}
                </div>
                <div className="bg-primary-500/10 text-primary-500 text-[11px] font-bold py-1 px-3.5 border border-primary-500/20 rounded-full font-mono">
                  {TESTIMONIALS_DATA[activeIndex].courseTaken}
                </div>
              </div>

              {/* Alumni Written Experience */}
              <p className="text-brand-text-main text-base sm:text-lg md:text-xl font-medium leading-relaxed italic">
                "{TESTIMONIALS_DATA[activeIndex].quote}"
              </p>

              {/* Alumni Details Layout */}
              <div className="pt-6 border-t border-brand-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                
                <div className="flex items-center gap-4">
                  {/* Styled Avatar Placeholder with Initials */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary-600 to-indigo-500 flex items-center justify-center text-white font-extrabold text-base shadow shadow-primary-500/10">
                    {TESTIMONIALS_DATA[activeIndex].name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-brand-text-main text-base leading-tight">
                      {TESTIMONIALS_DATA[activeIndex].name}
                    </h4>
                    <span className="text-brand-text-muted text-xs font-mono block mt-0.5">
                      Background: {TESTIMONIALS_DATA[activeIndex].fromBackground}
                    </span>
                  </div>
                </div>

                <div className="bg-brand-bg-accent text-brand-text-main px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 border border-brand-border">
                  <span className="bg-emerald-500 rounded-full w-2 h-2 animate-ping" />
                  <span>Placed at <strong className="text-primary-500">{TESTIMONIALS_DATA[activeIndex].company}</strong> ({TESTIMONIALS_DATA[activeIndex].packageText})</span>
                </div>

              </div>

            </div>

          </div>

          {/* Navigation Arrows Buttons Left & Right */}
          <div className="flex justify-center sm:justify-between items-center gap-4 mt-8 sm:absolute sm:inset-y-1/2 sm:-translate-y-1/2 sm:left-0 sm:right-0 sm:px-0 sm:pointer-events-none">
            
            <button
              id="slider-prev-btn"
              onClick={prevSlide}
              className="bg-brand-bg-card hover:bg-brand-bg-accent border border-brand-border p-3.5 rounded-full shadow hover:shadow-md active:scale-95 transition-all text-brand-text-muted hover:text-brand-text-main sm:pointer-events-auto sm:-translate-x-12 cursor-pointer"
              title="Previous Success Story"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              id="slider-next-btn"
              onClick={nextSlide}
              className="bg-brand-bg-card hover:bg-brand-bg-accent border border-brand-border p-3.5 rounded-full shadow hover:shadow-md active:scale-95 transition-all text-brand-text-muted hover:text-brand-text-main sm:pointer-events-auto sm:translate-x-12 cursor-pointer"
              title="Next Success Story"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

          </div>

          {/* Carousel Interactive Dots */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {TESTIMONIALS_DATA.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx ? 'w-8 bg-primary-600' : 'w-2.5 bg-brand-text-muted/30 hover:bg-brand-text-muted/60'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

        {/* Bento grid summary list of other reviews underneath */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.slice(2, 5).map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              whileHover={{ y: -8, scale: 1.015 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-brand-bg-card rounded-2xl border border-brand-border p-6 flex flex-col justify-between shadow-sm hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.3)] hover:border-primary-500/30 transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-primary-500 text-primary-500" />
                    ))}
                  </div>
                  <span className="text-[10px] text-primary-500 font-bold uppercase tracking-wider font-mono">{test.company} Alumnus</span>
                </div>
                <p className="text-brand-text-muted text-sm leading-relaxed font-light">
                  "{test.quote}"
                </p>
              </div>
              <div className="pt-4 border-t border-brand-border flex items-center gap-3 mt-5">
                <div className="w-9 h-9 text-xs rounded-full bg-brand-bg-accent flex items-center justify-center text-primary-500 font-extrabold uppercase border border-brand-border group-hover:scale-110 transition-transform">
                  {test.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <span className="font-bold text-brand-text-main text-sm block leading-none group-hover:text-primary-500 transition-colors">{test.name}</span>
                  <span className="text-brand-text-muted text-[10px] block mt-1 font-mono">{test.courseTaken}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
