import React from 'react';
import { 
  Code2, 
  Phone, 
  Mail, 
  Facebook, 
  Youtube, 
  Linkedin, 
  Instagram,
  ArrowRight
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#050b16] text-[#94a3b8] text-sm pt-20 pb-0 overflow-hidden font-sans border-t border-white/5">
      
      {/* Wave pattern grids matching background lines in the reference mockup */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-30" />
      <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Inner section frame container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 text-left">
          
          {/* Column 1: Brand & Desc & Circular solid buttons */}
          <div className="space-y-6">
            {/* Logo and smart secondary slogan */}
            <a href="#home" className="flex items-center gap-3.5 group">
              <div className="bg-gradient-to-tr from-[#ef4444] to-primary-600 p-2.5 rounded-xl shadow-lg shadow-[#ef4444]/15 group-hover:scale-105 transition-transform duration-300">
                <Code2 className="w-5.5 h-5.5 text-white" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-display font-black text-lg text-white tracking-wider leading-none uppercase">
                  BALU NAIK ACADEMY
                </h3>
                <span className="text-[9px] text-[#ef4444] font-mono tracking-widest uppercase font-bold leading-none mt-1.5">
                  ACADEMY - STUDY SMART
                </span>
              </div>
            </a>

            {/* Description Paragraph */}
            <p className="text-[#a0aec0] text-num-13.5 leading-relaxed font-light">
              Balu Naik Academy empowers you with Java Full Stack, Python Full Stack, and MERN Full Stack skills. Build real-world projects and launch your tech career with confidence.
            </p>

            {/* Red Solid Rounded Social Buttons exactly matching screenshot mockup */}
            <div className="flex items-center gap-3 pt-1">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="bg-[#eb3b3b] hover:bg-[#d32f2f] text-white p-2.5 rounded-lg transition-all hover:-translate-y-0.5 shadow-md flex items-center justify-center h-10 w-10 shrink-0"
                title="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                className="bg-[#eb3b3b] hover:bg-[#d32f2f] text-white p-2.5 rounded-lg transition-all hover:-translate-y-0.5 shadow-md flex items-center justify-center h-10 w-10 shrink-0"
                title="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/banavath-balu-naik-a9ab03298" 
                target="_blank" 
                rel="noreferrer" 
                className="bg-[#eb3b3b] hover:bg-[#d32f2f] text-white p-2.5 rounded-lg transition-all hover:-translate-y-0.5 shadow-md flex items-center justify-center h-10 w-10 shrink-0"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/balu_naik_rocky?igsh=MW9rbzJzMTFmMGZmbw==" 
                target="_blank" 
                rel="noreferrer" 
                className="bg-[#eb3b3b] hover:bg-[#d32f2f] text-white p-2.5 rounded-lg transition-all hover:-translate-y-0.5 shadow-md flex items-center justify-center h-10 w-10 shrink-0"
                title="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-extrabold text-base tracking-wide uppercase font-display border-b border-white/5 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-3.5 text-[14px]">
              <li>
                <a href="#home" className="text-[#a0aec0] hover:text-white transition-all flex items-center gap-2 group/link">
                  <ArrowRight className="w-3.5 h-3.5 text-primary-500 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all" />
                  <span>About Us</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="text-[#a0aec0] hover:text-white transition-all flex items-center gap-2 group/link">
                  <ArrowRight className="w-3.5 h-3.5 text-primary-500 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all" />
                  <span>Contact Us</span>
                </a>
              </li>
              <li>
                <a href="#courses" className="text-[#a0aec0] hover:text-white transition-all flex items-center gap-2 group/link">
                  <ArrowRight className="w-3.5 h-3.5 text-primary-500 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all" />
                  <span>Privacy Policy</span>
                </a>
              </li>
              <li>
                <a href="#courses" className="text-[#a0aec0] hover:text-white transition-all flex items-center gap-2 group/link">
                  <ArrowRight className="w-3.5 h-3.5 text-primary-500 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all" />
                  <span>Terms & Conditions</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Courses - Always single line display on wide screens */}
          <div className="space-y-6">
            <h4 className="text-white font-extrabold text-base tracking-wide uppercase font-display border-b border-white/5 pb-2 whitespace-nowrap">
              Courses List
            </h4>
            <ul className="space-y-3.5 text-[14px]">
              <li>
                <a href="#courses" className="text-[#a0aec0] hover:text-white transition-all flex items-center gap-2 group/link whitespace-nowrap">
                  <ArrowRight className="w-3.5 h-3.5 text-primary-500 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all" />
                  <span>Java Full Stack</span>
                </a>
              </li>
              <li>
                <a href="#courses" className="text-[#a0aec0] hover:text-white transition-all flex items-center gap-2 group/link whitespace-nowrap">
                  <ArrowRight className="w-3.5 h-3.5 text-primary-500 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all" />
                  <span>Python Full Stack</span>
                </a>
              </li>
              <li>
                <a href="#courses" className="text-[#a0aec0] hover:text-white transition-all flex items-center gap-2 group/link whitespace-nowrap">
                  <ArrowRight className="w-3.5 h-3.5 text-primary-500 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all" />
                  <span>MERN Full Stack</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Details */}
          <div className="space-y-6">
            <h4 className="text-white font-extrabold text-base tracking-wide uppercase font-display border-b border-white/5 pb-2">
              Contact Details
            </h4>
            
            <div className="space-y-4 text-[13.5px] font-light text-[#a0aec0]">
              {/* Plain text address exactly matching Mockup layout */}
              <p className="leading-relaxed font-sans text-[#a0aec0]">
                Beside JNTU Metro Campus,<br />
                Macherla, Palnadu District,<br />
                Andhra Pradesh - 522426
              </p>

              {/* Responsive contact channels */}
              <div className="space-y-3.5 pt-2">
                
                <a 
                  href="tel:6304045279" 
                  className="flex items-center gap-3 text-[#a0aec0] hover:text-white transition-colors group"
                >
                  <Phone className="w-4 h-4 text-primary-400 group-hover:scale-110 transition-transform duration-200 shrink-0" />
                  <span className="font-semibold text-white tracking-wide">+91 6304045279</span>
                </a>

                <a 
                  href="mailto:balunaikbanavath662@gmail.com" 
                  className="flex items-center gap-3 text-[#a0aec0] hover:text-white transition-colors group"
                >
                  <Mail className="w-4 h-4 text-primary-400 group-hover:scale-110 transition-transform duration-200 shrink-0" />
                  <span className="text-sm font-light text-[#a0aec0] truncate">balunaikbanavath662@gmail.com</span>
                </a>

              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Styled bottom copyright footer bar exactly matching screenshot layout */}
      <div className="bg-[#040913] py-6 border-t border-white/5 text-center px-4 relative z-10">
        <p className="text-xs text-slate-400 font-sans tracking-wide">
          Copyright © 2026 Balu Naik Academy. All Rights Reserved.
        </p>
      </div>

    </footer>
  );
}

