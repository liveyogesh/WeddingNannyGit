
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { useTheme } from '../context/ThemeContext';
import { CITIES_OPTIONS } from '../constants';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLocDropdownOpen, setLocDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { mode, toggleMode } = useTheme();
  const locRef = useRef<HTMLDivElement>(null);
  
  const logoText = pathname.includes('ballia') ? 'Ballia' 
                 : pathname.includes('delhi') ? 'Delhi & NCR' 
                 : pathname.includes('hyderabad') ? 'Hyderabad' 
                 : '';

  const filteredCities = useMemo(() => {
    return CITIES_OPTIONS.filter(c => 
      c.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (locRef.current && !locRef.current.contains(e.target as Node)) setLocDropdownOpen(false);
    };
    document.addEventListener('mousedown', clickOutside);
    return () => document.removeEventListener('mousedown', clickOutside);
  }, []);

  useEffect(() => {
    if (!isLocDropdownOpen) setSearchTerm('');
  }, [isLocDropdownOpen]);

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/#${id}`);
    }
  };

  const getThemeIcon = () => {
    switch (mode) {
      case 'light': return <i className="fas fa-sun"></i>;
      case 'dark': return <i className="fas fa-moon"></i>;
      case 'auto': return <i className="fas fa-wand-magic-sparkles"></i>;
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 shadow-lg backdrop-blur-sm no-print border-b border-gray-100 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-3xl font-extrabold playfair text-rose-gemini tracking-tight flex items-center group">
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 64 64" role="img">
              <rect rx="12" width="64" height="64" className="fill-orange-50 dark:fill-slate-800"/>
              <g transform="translate(6,6)">
                <circle cx="22" cy="16" r="12" className="fill-rose-gemini"/>
                <text x="22" y="20" fontFamily="Inter, sans-serif" fontSize="10" textAnchor="middle" fill="#fff" fontWeight="700">WN</text>
              </g>
            </svg>
            <span className="ml-3 font-bold text-rose-gemini hidden sm:inline">
              The Wedding Nanny {logoText && `— ${logoText}`}
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6 text-sm lg:text-base font-medium text-navy-gemini dark:text-slate-200">
            {/* Location Selector */}
            <div className="relative" ref={locRef}>
              <button 
                onClick={() => setLocDropdownOpen(!isLocDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 dark:bg-slate-800 border dark:border-slate-700 text-rose-gemini hover:bg-rose-50 transition-all font-bold shadow-sm"
              >
                <i className="fas fa-map-marker-alt"></i>
                <span>{logoText || 'India'}</span>
                <i className={`fas fa-chevron-down text-[10px] transition-transform ${isLocDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              {isLocDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-slate-800 shadow-xl rounded-xl border dark:border-slate-700 overflow-hidden py-2 animate-fadeIn">
                  <div className="px-3 pb-2 pt-1">
                    <div className="relative">
                      <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
                      <input 
                        type="text" 
                        placeholder="Search city..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-xs bg-gray-50 dark:bg-slate-700 border dark:border-slate-600 rounded-lg outline-none focus:ring-1 focus:ring-rose-gemini dark:text-white"
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {!searchTerm && (
                      <button onClick={() => { navigate('/'); setLocDropdownOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-rose-50 dark:hover:bg-slate-700 text-sm font-medium">All India</button>
                    )}
                    {filteredCities.map(c => (
                      <button 
                        key={c.value} 
                        onClick={() => { if(c.path) navigate(c.path); setLocDropdownOpen(false); }}
                        className={`w-full text-left px-4 py-2 hover:bg-rose-50 dark:hover:bg-slate-700 text-sm font-medium ${!c.path ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {c.label}
                      </button>
                    ))}
                    {filteredCities.length === 0 && (
                      <p className="px-4 py-2 text-xs text-gray-400 italic">No cities found.</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <button onClick={() => handleNavClick('services')} className="hover:text-rose-gemini transition-colors duration-200 py-2 border-b-2 border-transparent hover:border-rose-gemini">Services</button>
            <button onClick={() => handleNavClick('packages')} className="hover:text-rose-gemini transition-colors duration-200 py-2 border-b-2 border-transparent hover:border-rose-gemini">Packages</button>
            <button onClick={() => handleNavClick('faq')} className="hover:text-rose-gemini transition-colors duration-200 py-2 border-b-2 border-transparent hover:border-rose-gemini">FAQ</button>
            
            <button onClick={toggleMode} className="p-2 rounded-full bg-gray-50 dark:bg-slate-800 text-rose-gemini shadow-sm border dark:border-slate-700 hover:bg-rose-50 dark:hover:bg-slate-700 transition-colors">
              {getThemeIcon()}
            </button>

            <a href="tel:+919115117795" className="hidden lg:flex items-center space-x-2 text-navy-gemini dark:text-white hover:text-rose-gemini transition p-2 px-4 rounded-full border dark:border-slate-700 bg-gray-50 dark:bg-slate-800 font-bold shadow-sm hover:shadow-md">
              <i className="fas fa-phone-alt text-rose-gemini"></i><span>+91 911 511 7795</span>
            </a>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <button onClick={toggleMode} className="p-2.5 rounded-full bg-rose-gemini/10 text-rose-gemini">{getThemeIcon()}</button>
            <button onClick={() => setIsMobileMenuOpen(true)} className="text-rose-gemini p-2.5 rounded-full bg-rose-gemini/10"><i className="fas fa-bars"></i></button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-50 bg-navy-gemini/98 dark:bg-slate-950/98 backdrop-blur-md transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 h-full flex flex-col items-center justify-center text-center relative">
          <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 text-white text-3xl"><i className="fas fa-times"></i></button>
          <nav className="flex flex-col space-y-8 text-3xl font-bold text-white">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <button onClick={() => handleNavClick('services')}>Services</button>
            <button onClick={() => handleNavClick('packages')}>Packages</button>
            <button onClick={() => handleNavClick('faq')}>FAQ</button>
            <button onClick={() => handleNavClick('contact')} className="text-rose-400 font-extrabold">Contact Us</button>
            <a href="tel:+919115117795" className="text-xl text-rose-300">+91 911 511 7795</a>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
