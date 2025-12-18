import React from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { useTheme } from '../context/ThemeContext';

const Footer: React.FC = () => {
  const { openConsentModal } = useModal();
  const { mode, toggleMode } = useTheme();

  const getThemeIcon = () => {
    switch (mode) {
      case 'light': return <i className="fas fa-sun"></i>;
      case 'dark': return <i className="fas fa-moon"></i>;
      case 'auto': return <i className="fas fa-wand-magic-sparkles"></i>;
    }
  };

  const getThemeLabel = () => {
    switch (mode) {
      case 'light': return 'Light';
      case 'dark': return 'Dark';
      case 'auto': return 'Astro-Sync';
    }
  };
  
  return (
    <footer id="footer" className="bg-gray-950 dark:bg-slate-950 text-gray-400 dark:text-slate-400 py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-rose-gemini rounded-lg flex items-center justify-center shadow-lg shadow-rose-500/20">
                <i className="fa-solid fa-heart text-white"></i>
              </div>
              <span className="font-bold text-xl text-white tracking-tight">The Wedding Nanny</span>
            </div>
            <p className="text-sm leading-relaxed">
              Making Indian weddings fun for kids and relaxing for parents. Professional event childcare for peace of mind across major Indian cities.
            </p>
            <div className="flex items-center gap-4">
               <button 
                onClick={toggleMode} 
                className="flex items-center gap-3 p-2 px-4 rounded-full bg-white/5 border border-white/10 hover:border-rose-500/50 hover:bg-white/10 transition-all text-rose-gemini group shadow-sm"
                aria-label={`Switch Theme (Current: ${mode})`}
                title={`Mode: ${getThemeLabel()}`}
               >
                 <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                   {getThemeLabel()}
                 </span>
                 {getThemeIcon()}
               </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-rose-gemini rounded-full"></span> Quick Links
            </h4>
            <ul className="space-y-4 text-sm">
              <li><button onClick={() => document.getElementById('services')?.scrollIntoView({behavior:'smooth'})} className="hover:text-rose-500 transition-colors">Services Overview</button></li>
              <li><button onClick={() => document.getElementById('packages')?.scrollIntoView({behavior:'smooth'})} className="hover:text-rose-500 transition-colors">Pricing & Packages</button></li>
              <li><button onClick={() => document.getElementById('partners')?.scrollIntoView({behavior:'smooth'})} className="hover:text-rose-500 transition-colors">Partner with Us</button></li>
              <li><button onClick={openConsentModal} className="hover:text-rose-500 transition-colors">Privacy Policy</button></li>
              <li><Link to="/admin" className="text-gray-600 hover:text-white transition-colors">Admin Panel</Link></li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-rose-gemini rounded-full"></span> Locations
            </h4>
            <ul className="space-y-4 text-sm">
               <li><Link to="/hyderabad" className="hover:text-rose-500 transition-colors flex items-center gap-2"><i className="fas fa-map-marker-alt text-xs text-rose-500/50"></i> Hyderabad, TS</Link></li>
               <li><Link to="/ballia" className="hover:text-rose-500 transition-colors flex items-center gap-2"><i className="fas fa-map-marker-alt text-xs text-rose-500/50"></i> Ballia, UP</Link></li>
               <li><Link to="/delhi-ncr" className="hover:text-rose-500 transition-colors flex items-center gap-2"><i className="fas fa-map-marker-alt text-xs text-rose-500/50"></i> Delhi & NCR</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-rose-gemini rounded-full"></span> Contact Us
            </h4>
            <p className="text-sm mb-4 flex items-center gap-3"><i className="fa-solid fa-phone text-rose-500"></i> <a href="tel:+919115117795" className="hover:text-rose-500 transition-colors">+91 911 511 7795</a></p>
            <p className="text-sm mb-8 flex items-center gap-3"><i className="fa-solid fa-envelope text-rose-500"></i> <a href="mailto:hello@weddingnanny.in" className="hover:text-rose-500 transition-colors">hello@weddingnanny.in</a></p>
            
            <div className="flex space-x-5">
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all"><i className="fa-brands fa-facebook-f text-sm"></i></a>
              <a href="#" aria-label="YouTube" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all"><i className="fa-brands fa-youtube text-sm"></i></a>
            </div>
          </div>
        </div>
        <div className="text-center text-xs border-t border-white/5 pt-10 mt-16 opacity-50 tracking-widest uppercase">
          &copy; {new Date().getFullYear()} The Wedding Nanny. Handcrafted for your special moments.
        </div>
      </div>
    </footer>
  );
};

export default Footer;