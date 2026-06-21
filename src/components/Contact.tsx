import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, HelpCircle, ChevronDown, CheckSquare, MessageSquare, ShieldCheck } from 'lucide-react';
import { FAQS_DATA, COURSES_DATA } from '../data';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: '',
    message: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill out your Name and Phone Number.');
      return;
    }
    
    setSubmitting(true);
    // Simulate real database or email delivery service call
    setTimeout(() => {
      setSubmitting(false);
      setFormSubmitted(true);
      // Reset form on success
      setFormData({
        name: '',
        phone: '',
        email: '',
        course: '',
        message: '',
      });
    }, 1200);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-brand-bg-main text-brand-text-main relative transition-colors duration-300">
      
      {/* Decorative gradient overlay */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION FAQ HEADER & ACCORDION (Integrated beautifully) */}
        <div id="faq" className="mb-24">
          <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
            <span className="text-primary-500 text-xs sm:text-sm font-extrabold tracking-widest uppercase block">
              ★ QUESTIONS & ANSWERS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-text-main">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="w-16 h-1 bg-brand-accent mx-auto rounded" />
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {FAQS_DATA.map((faq, index) => {
              const isOpen = expandedFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-brand-bg-card border border-brand-border rounded-2xl overflow-hidden transition-all hover:border-primary-500/30"
                >
                  <button
                    onClick={() => setExpandedFaqIndex(isOpen ? null : index)}
                    className="w-full px-6 py-4.5 sm:py-5 flex items-center justify-between text-left cursor-pointer group"
                  >
                    <span className="font-semibold text-brand-text-main group-hover:text-primary-500 transition-colors text-sm sm:text-base pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-brand-text-muted shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary-500' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-6 text-brand-text-muted text-xs sm:text-sm font-light leading-relaxed border-t border-brand-border pt-3">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* CONTACT SECTION SUBDIVISIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Side: Contact Information channels */}
          <div className="col-span-1 lg:col-span-5 space-y-8 text-left">
            <div className="space-y-4">
              <span className="text-primary-500 text-xs sm:text-sm font-extrabold tracking-widest uppercase block">
                ★ ENROLL TODAY
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight leading-tight text-brand-text-main">
                Connect With Our Admission Advisors
              </h2>
              <div className="w-16 h-1 bg-brand-accent rounded" />
              <p className="text-brand-text-muted text-sm sm:text-base leading-relaxed font-light">
                Have lingering questions about modern technology course details, batch hours, or custom payment solutions? Call our helpline or stop by our Macherla campus. Our doors are open Monday to Saturday, 9 AM to 7 PM.
              </p>
            </div>

            {/* Quick Contact Block cards */}
            <div className="space-y-4">
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                whileHover={{ scale: 1.02, x: 5 }}
                transition={{ duration: 0.3 }}
                className="bg-brand-bg-card border border-brand-border p-5 rounded-2xl flex gap-4 hover:bg-brand-bg-accent transition-colors cursor-pointer"
              >
                <div className="bg-primary-500/10 text-primary-500 p-3 h-12 w-12 rounded-xl flex items-center justify-center shrink-0 border border-primary-500/20 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-brand-text-muted block font-bold uppercase tracking-wider">CALL DIRECTLY</span>
                  <a href="tel:6304045279" className="text-brand-text-main hover:text-primary-500 font-extrabold text-lg transition-colors block mt-0.5">
                    +91 6304045279
                  </a>
                  <span className="text-[11px] text-brand-text-muted mt-1 block leading-none">Instant chat on WhatsApp also active</span>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                whileHover={{ scale: 1.02, x: 5 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-brand-bg-card border border-brand-border p-5 rounded-2xl flex gap-4 hover:bg-brand-bg-accent transition-colors cursor-pointer"
              >
                <div className="bg-primary-500/10 text-primary-500 p-3 h-12 w-12 rounded-xl flex items-center justify-center shrink-0 border border-primary-500/20 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-brand-text-muted block font-bold uppercase tracking-wider">EMAIL ADMISSIONS</span>
                  <a href="mailto:balunaikbanavath662@gmail.com" className="text-brand-text-main hover:text-primary-500 font-extrabold text-base transition-colors block mt-0.5 break-all">
                    balunaikbanavath662@gmail.com
                  </a>
                  <span className="text-[11px] text-brand-text-muted mt-1 block">Replies within 2 hours</span>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                whileHover={{ scale: 1.02, x: 5 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="bg-brand-bg-card border border-brand-border p-5 rounded-2xl flex gap-4 hover:bg-brand-bg-accent transition-colors cursor-pointer"
              >
                <div className="bg-primary-500/10 text-primary-500 p-3 h-12 w-12 rounded-xl flex items-center justify-center shrink-0 border border-primary-500/20 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-brand-text-muted block font-bold uppercase tracking-wider">PHYSICAL ACADEMY CAMPUS</span>
                  <span className="text-brand-text-main font-bold block text-sm leading-tight mt-1">
                    Balu Naik Academy
                  </span>
                  <address className="text-brand-text-muted text-xs sm:text-sm font-light mt-1.5 not-italic leading-relaxed">
                    Macherla, Palnadu District, Andhra Pradesh - 522426
                  </address>
                </div>
              </motion.div>

            </div>

            {/* Custom Interactive Map Graphics container */}
            <div className="bg-brand-bg-card border border-brand-border rounded-2xl p-5 space-y-4 shadow-xl">
              <span className="text-[10px] text-brand-text-muted uppercase tracking-widest block font-extrabold">CAMPUS LOCATION GUIDE</span>
              <div className="bg-brand-bg-accent rounded-xl relative p-6 border border-brand-border flex flex-col justify-center items-center text-center group h-36">
                <div className="absolute top-2 right-2 bg-emerald-500/20 text-emerald-500 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase select-none">
                  Located
                </div>
                <MapPin className="w-10 h-10 text-primary-500 animate-bounce mb-2 shrink-0" />
                <span className="font-bold text-brand-text-main text-xs sm:text-sm select-none">Macherla Central Hub</span>
                <p className="text-[10px] text-brand-text-muted leading-none mt-1 select-none">Palnadu District, AP</p>
              </div>
              <a 
                href="https://maps.google.com/?q=Macherla+Palnadu+District+Andhra+Pradesh+522426" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full bg-brand-bg-accent hover:bg-brand-bg-main text-brand-text-main font-bold py-3 px-4 rounded-xl border border-brand-border text-xs flex items-center justify-center gap-2 group cursor-pointer transition-colors"
              >
                <span>Open in Google Maps Mobile</span>
                <span className="group-hover:translate-x-1 duration-150 transform transition-transform">→</span>
              </a>
            </div>

          </div>

          {/* Right Side: Interactive Admission Enquiry Form card */}
          <div className="col-span-1 lg:col-span-7 bg-brand-bg-card border border-brand-border rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl relative">
            
            <div className="absolute top-4 right-4 text-[10px] uppercase font-bold text-brand-text-muted/60 font-mono hidden sm:inline">
              Secure SSL transmission
            </div>

            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-6"
              >
                <div className="mx-auto w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
                  <ShieldCheck className="w-10 h-10 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display font-extrabold text-2xl text-brand-text-main">
                    Application Received!
                  </h3>
                  <p className="text-brand-text-muted text-sm font-light max-w-md mx-auto">
                    Thank you. Our Admissions Director (Balu Naik Banavath) or a senior coordinator will call you back on your registered phone within 2 hours. We will also dispatch the current program catalog over email.
                  </p>
                </div>
                
                <div className="pt-4">
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="bg-brand-bg-accent hover:bg-brand-bg-main border border-brand-border text-brand-text-main font-bold text-xs px-6 py-3 rounded-xl transition-all cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-brand-text-main">
                    Syllabus & Callback Inquiry
                  </h3>
                  <p className="text-brand-text-muted text-xs sm:text-sm font-light">
                    Register to schedule a free coding demo, receive customized program brochures, and clarify enrollment installment fees.
                  </p>
                </div>

                {/* Form fields layout */}
                <div className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 text-left">
                      <label htmlFor="form-name" className="text-xs text-brand-text-main font-semibold uppercase block">
                        Your Full Name <span className="text-brand-accent">*</span>
                      </label>
                      <input
                        id="form-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Ramesh Banavath"
                        className="w-full bg-brand-bg-accent border border-brand-border rounded-xl py-3 px-4 text-brand-text-main text-sm focus:outline-none focus:border-primary-500 focus:bg-brand-bg-main transition-colors"
                        required
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label htmlFor="form-phone" className="text-xs text-brand-text-main font-semibold uppercase block">
                        Mobile Phone Number <span className="text-brand-accent">*</span>
                      </label>
                      <input
                        id="form-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. +91 6304045279"
                        className="w-full bg-brand-bg-accent border border-brand-border rounded-xl py-3 px-4 text-brand-text-main text-sm focus:outline-none focus:border-primary-500 focus:bg-brand-bg-main transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 text-left">
                      <label htmlFor="form-email" className="text-xs text-brand-text-main font-semibold uppercase block">
                        Email Address
                      </label>
                      <input
                        id="form-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. name@domain.com"
                        className="w-full bg-brand-bg-accent border border-brand-border rounded-xl py-3 px-4 text-brand-text-main text-sm focus:outline-none focus:border-primary-500 focus:bg-brand-bg-main transition-colors"
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label htmlFor="form-course" className="text-xs text-brand-text-main font-semibold uppercase block">
                        Selected Code Track
                      </label>
                      <select
                        id="form-course"
                        name="course"
                        value={formData.course}
                        onChange={handleInputChange}
                        className="w-full bg-brand-bg-accent border border-brand-border rounded-xl py-3.5 px-4 text-brand-text-main text-sm focus:outline-none focus:border-primary-500 focus:bg-brand-bg-main transition-colors cursor-pointer"
                      >
                        <option value="">-- Please Select Preferred Course --</option>
                        {COURSES_DATA.map((course) => (
                           <option key={course.id} value={course.title} className="bg-brand-bg-card text-brand-text-main">
                            {course.title} ({course.duration})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1 text-left">
                    <label htmlFor="form-message" className="text-xs text-brand-text-main font-semibold uppercase block">
                      Enquiry Question / Message
                    </label>
                    <textarea
                      id="form-message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="e.g. I am a Mechanical Engineering graduate. Can I request weekend batches and review the demo schedule?"
                      className="w-full bg-brand-bg-accent border border-brand-border rounded-xl py-3 px-4 text-brand-text-main text-sm focus:outline-none focus:border-primary-500 focus:bg-brand-bg-main transition-colors resize-none"
                    />
                  </div>

                </div>

                {/* Submit button bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-3 border-t border-brand-border">
                  <div className="flex items-center gap-2 text-brand-text-muted text-xs text-left">
                    <CheckSquare className="w-4 h-4 text-brand-accent shrink-0" />
                    <span>I agree to receive programmatic call-backs from counselors.</span>
                  </div>
                  <button
                    id="contact-submit-btn"
                    type="submit"
                    className="w-full sm:w-auto bg-primary-600 hover:bg-primary-500 text-white font-bold text-sm py-4 px-8 rounded-xl shadow-lg hover:shadow-primary-600/25 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                    disabled={submitting}
                  >
                    <span>{submitting ? 'Transmitting...' : 'Transmit Enquiry'}</span>
                    <Send className={`w-4 h-4 ${submitting ? 'animate-bounce' : ''}`} />
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
