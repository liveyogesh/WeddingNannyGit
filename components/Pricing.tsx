import React, { useState, useEffect, useRef } from 'react';
import { CITIES_OPTIONS } from '../constants';
import { useModal } from '../context/ModalContext';

interface PricingProps {
  defaultCity?: string;
}

const Pricing: React.FC<PricingProps> = ({ defaultCity = 'Hyderabad' }) => {
  const { openBookingModal, selectedPackage, setSelectedPackage } = useModal();
  const [city, setCity] = useState(defaultCity);
  const [kids, setKids] = useState(10);
  const [hours, setHours] = useState(6);
  
  const [estimate, setEstimate] = useState({ total: 0, deposit: 0, travel: 0, pkg: '' });
  
  const [isCityDropdownOpen, setCityDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const match = CITIES_OPTIONS.find(c => c.value === defaultCity || c.label === defaultCity);
    if(match) setCity(match.value);
  }, [defaultCity]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCityDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    calculateEstimate();
  }, [city, kids, hours, selectedPackage]);

  const calculateEstimate = () => {
    const cityOpt = CITIES_OPTIONS.find(c => c.value === city) || CITIES_OPTIONS[0];
    const travel = cityOpt.travelCost;
    
    let base = 0;
    let pkg = selectedPackage;

    if (selectedPackage === 'Auto Recommend') {
      if (kids <= 3 && hours <= 3) pkg = 'Elopement Care';
      else if (kids <= 6 && hours <= 4) pkg = 'Basic Care';
      else if (kids <= 20) pkg = 'Celebration Premium';
      else pkg = 'Multi-Day Event';
    }

    if (pkg === 'Elopement Care') base = 6000;
    else if (pkg === 'Basic Care') base = 8000;
    else if (pkg === 'Celebration Premium') base = 15000;
    else if (pkg === 'Multi-Day Event') base = 35000;

    const baseHours = pkg === 'Elopement Care' ? 3 : (pkg === 'Basic Care' ? 4 : 6);
    if (hours > baseHours) {
      base = Math.round(base * (1 + (hours - baseHours) * 0.15));
    }

    if (pkg === 'Elopement Care' && kids > 4) base += (kids - 4) * 1000;
    if (pkg === 'Basic Care' && kids > 6) base += (kids - 6) * 800;
    if (pkg === 'Celebration Premium' && kids > 20) base += (kids - 20) * 700;

    const total = base + travel;
    const deposit = Math.round(total * 0.25);

    setEstimate({ total, deposit, travel, pkg });
  };

  const handleBookNow = () => {
    openBookingModal(estimate.pkg);
  };

  const selectedCityOption = CITIES_OPTIONS.find(c => c.value === city) || CITIES_OPTIONS[0];

  const labelClasses = "text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-2 block";
  const inputClasses = "w-full p-3.5 border rounded-xl bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-rose-gemini/20 border-gray-200 outline-none transition-all";

  return (
    <section id="pricing" className="py-20 bg-stone-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-navy-gemini dark:text-white playfair">Interactive Pricing Estimator 💰</h2>
          <p className="text-lg text-stone-600 dark:text-slate-400 mt-2">Choose city and requirements to get an instant quote.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl dark:shadow-rose-900/5 border border-gray-100 dark:border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative" ref={dropdownRef}>
              <label className={labelClasses}>📍 <span>Wedding City</span></label>
              <button 
                type="button"
                onClick={() => setCityDropdownOpen(!isCityDropdownOpen)}
                className={`${inputClasses} flex items-center justify-between text-left`}
              >
                <div className="flex items-center gap-3">
                   <img src={selectedCityOption.thumbnail} alt={selectedCityOption.label} className="w-8 h-8 rounded-full object-cover border border-gray-100 dark:border-slate-600" />
                   <span className="font-semibold">{selectedCityOption.label}</span>
                </div>
                <i className={`fas fa-chevron-down text-rose-gemini transition-transform ${isCityDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>

              {isCityDropdownOpen && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-2xl shadow-2xl z-20 max-h-72 overflow-y-auto animate-fadeIn">
                  {CITIES_OPTIONS.map((opt) => (
                    <button
                      type="button"
                      key={opt.value}
                      onClick={() => {
                        setCity(opt.value);
                        setCityDropdownOpen(false);
                      }}
                      className={`w-full p-4 flex items-center gap-4 hover:bg-rose-50 dark:hover:bg-slate-700 transition-colors border-b dark:border-slate-700 last:border-b-0 text-left ${city === opt.value ? 'bg-rose-50 dark:bg-slate-700/50' : ''}`}
                    >
                      <img src={opt.thumbnail} alt={opt.label} className="w-10 h-10 rounded-lg object-cover shadow-sm" />
                      <div className="flex-1">
                        <div className="font-bold text-navy-gemini dark:text-white text-sm">{opt.label}</div>
                        <div className="text-xs text-gray-500 dark:text-slate-400">Travel Fee: ₹{opt.travelCost}</div>
                      </div>
                      {city === opt.value && <i className="fas fa-check text-rose-gemini"></i>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className={labelClasses}>👶 <span>Number of Kids</span></label>
              <input 
                id="calcKids" 
                type="number" 
                min="1" 
                className={inputClasses} 
                value={kids}
                onChange={(e) => setKids(Math.max(1, parseInt(e.target.value) || 0))}
                title="Enter the total number of children requiring supervision at the event."
              />
            </div>

            <div>
              <label className={labelClasses}>
                ⏱️ <span>Duration (Hours)</span>
                <i className="fas fa-info-circle ml-2 text-gray-300 cursor-help" title="Exceeding the base hours (3-6h depending on package) incurs an additional 15% charge per hour."></i>
              </label>
              <input 
                id="calcHours" 
                type="number" 
                min="1" 
                max="24" 
                className={inputClasses} 
                value={hours}
                onChange={(e) => setHours(Math.max(1, parseInt(e.target.value) || 0))}
                title="Total hours of on-site service required, from check-in to final pickup."
              />
              <p className="text-[10px] text-gray-400 mt-1 italic leading-tight dark:text-slate-500">* Exceeding base hours adds 15% per hour.</p>
            </div>

            <div>
              <label className={labelClasses}>📦 <span>Select Package</span></label>
              <select 
                id="calcPackage" 
                className={`${inputClasses} bg-none appearance-none cursor-pointer`} 
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
              >
                <option value="Auto Recommend">Auto Recommend ✨</option>
                <option value="Elopement Care">Elopement Care</option>
                <option value="Basic Care">Basic Care</option>
                <option value="Celebration Premium">Celebration Premium</option>
                <option value="Multi-Day Event">Multi-Day Event</option>
              </select>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-gray-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-gray-100 dark:border-slate-800">
            <div>
              <div className="text-[10px] text-stone-500 dark:text-slate-500 uppercase tracking-widest font-bold mb-1">Total Estimated Price</div>
              <div id="estPrice" className="text-3xl font-extrabold text-navy-gemini dark:text-white">₹{estimate.total.toLocaleString('en-IN')}</div>
            </div>
            <div>
              <div className="text-[10px] text-stone-500 dark:text-slate-500 uppercase tracking-widest font-bold mb-1">Included Travel</div>
              <div id="estTravel" className="text-xl font-bold text-gray-700 dark:text-slate-300">₹{estimate.travel.toLocaleString('en-IN')}</div>
            </div>
            <div>
              <div className="text-[10px] text-stone-500 dark:text-slate-500 uppercase tracking-widest font-bold mb-1">Deposit (25%)</div>
              <div id="estDeposit" className="text-xl font-bold text-rose-gemini">
                <span className="inline-block bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/40 text-rose-gemini px-4 py-1.5 rounded-full font-bold shadow-sm">
                  ₹{estimate.deposit.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-4 flex-wrap">
            <button onClick={handleBookNow} className="px-10 py-4 bg-rose-gemini text-white rounded-xl btn-raise shadow-xl font-bold flex-grow text-lg">
              Book Now <i className="fas fa-calendar-check ml-2"></i>
            </button>
            <button onClick={() => window.location.href="#contact"} className="px-8 py-4 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-200 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 font-bold transition-all flex-grow text-lg">
              Detailed Quote
            </button>
          </div>

          <div className="mt-6 text-xs text-stone-400 dark:text-slate-500 text-center italic">
            * This is an estimate. Final pricing may vary based on specific logistics.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;