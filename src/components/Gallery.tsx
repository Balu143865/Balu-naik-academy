import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image, Layers, Laptop, Award, Eye, Flame, ZoomIn } from 'lucide-react';
import { GALLERY_DATA } from '../data';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'classroom' | 'labs' | 'events' | 'placement'>('all');
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string; desc: string } | null>(null);

  const filterTabs = [
    { key: 'all', label: 'All Photos' },
    { key: 'classroom', label: 'Interactive Classrooms' },
    { key: 'labs', label: 'Coding Laboratories' },
    { key: 'events', label: 'Events & graduation' },
    { key: 'placement', label: 'Placement Trainings' },
  ] as const;

  const filteredItems = activeCategory === 'all'
    ? GALLERY_DATA
    : GALLERY_DATA.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="py-20 md:py-28 bg-brand-bg-main relative overflow-hidden transition-colors duration-300">
      {/* Accent background glows */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-primary-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="text-primary-500 text-xs sm:text-sm font-extrabold tracking-widest uppercase block font-mono">
            ★ ACADEMY LIFE & CAMPUS VIEW
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-brand-text-main tracking-tight leading-tight uppercase">
            Explore Campus Life in Macherla
          </h2>
          <div className="w-16 h-1 bg-primary-500 mx-auto rounded" />
          <p className="text-brand-text-muted text-base sm:text-lg font-light">
            Glance through our physical infrastructure, training classrooms, coding workstations, graduation events, mock interviews, and student networking loops.
          </p>
        </div>

        {/* Gallery Filter Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12 max-w-3xl mx-auto bg-brand-bg-card p-2 rounded-2xl border border-brand-border">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveCategory(tab.key)}
              className={`px-4.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === tab.key
                  ? 'bg-primary-600 text-white shadow shadow-primary-600/30'
                  : 'text-brand-text-muted hover:text-brand-text-main hover:bg-brand-bg-accent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Image Grid with Overlay zoom hover effects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 min-h-[350px]">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative h-72 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-brand-border bg-brand-bg-card transition-all cursor-pointer"
                onClick={() => setLightboxImage({ url: item.imageUrl, title: item.title, desc: item.description })}
              >
                
                {/* Main Asset Image */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    const imgEl = e.currentTarget;
                    if (imgEl.src !== 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80') {
                      imgEl.src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80';
                    }
                  }}
                />

                {/* Aesthetic dark overlay on default, gets darker on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-350" />

                {/* Text overlays details */}
                <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col justify-end text-white text-left z-10 transition-transform duration-300">
                  <span className="bg-primary-500 text-white text-[9px] font-bold tracking-wider rounded px-2 py-0.5 select-none w-fit uppercase mb-2.5 font-mono">
                    {item.category}
                  </span>
                  <h4 className="font-display font-bold text-base sm:text-lg group-hover:text-primary-300 transition-colors leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-slate-300 text-xs font-light line-clamp-2 max-h-0 opacity-0 group-hover:max-h-16 group-hover:opacity-100 group-hover:mt-2.5 transition-all duration-300">
                    {item.description}
                  </p>
                </div>

                {/* Floating overlay indicators search symbol */}
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md rounded-full p-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ZoomIn className="w-4 h-4 text-white" />
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Lightbox Modal Overlay Popup */}
      <AnimatePresence>
        {lightboxImage && (
          <div 
            className="fixed inset-0 bg-slate-950/95 z-55 flex items-center justify-center p-4 sm:p-6"
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-brand-bg-card rounded-3xl border border-brand-border max-w-3xl w-full overflow-hidden shadow-2xl text-left text-brand-text-main"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Image box */}
              <div className="relative h-64 sm:h-96 w-full">
                <img
                  src={lightboxImage.url}
                  alt={lightboxImage.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const imgEl = e.currentTarget;
                    if (imgEl.src !== 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80') {
                      imgEl.src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80';
                    }
                  }}
                />
                
                {/* Close upper button */}
                <button
                  id="lightbox-close-btn"
                  onClick={() => setLightboxImage(null)}
                  className="absolute top-4 right-4 bg-slate-950/80 hover:bg-slate-950 text-white h-9 w-9 rounded-full flex items-center justify-center font-bold cursor-pointer transition-colors shadow"
                >
                  X
                </button>
              </div>

              {/* Text metadata bottom pane */}
              <div className="p-6 sm:p-8 space-y-3">
                <h3 className="font-display font-extrabold text-lg sm:text-xl text-brand-text-main">
                  {lightboxImage.title}
                </h3>
                <p className="text-brand-text-muted text-sm font-light leading-relaxed">
                  {lightboxImage.desc}
                </p>
                <div className="pt-4 border-t border-brand-border flex justify-end">
                  <button
                    onClick={() => setLightboxImage(null)}
                    className="bg-brand-bg-accent hover:bg-brand-bg-main text-brand-text-main border border-brand-border font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer"
                  >
                    Close View
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
