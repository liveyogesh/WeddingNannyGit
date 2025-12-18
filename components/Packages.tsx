import React from 'react';
import { useModal } from '../context/ModalContext';

const Packages: React.FC = () => {
  const { setSelectedPackage } = useModal();

  const handleSelect = (pkg: string) => {
    setSelectedPackage(pkg);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="packages" className="py-20 bg-rose-50 dark:bg-slate-950 border-t border-b border-rose-200 dark:border-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl playfair md:text-5xl font-extrabold text-navy-gemini dark:text-white mb-4">Our Stress-Free Packages 💍</h2>
        <p className="text-xl text-gray-500 dark:text-slate-400 mb-12 max-w-4xl mx-auto">Choose the level of care that fits your celebration. All packages require a 25% deposit to secure your date.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Elopement Care - New Budget Option */}
          <div className="package-card bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border-t-8 border-rose-300 dark:border-rose-400/50 transform hover:shadow-rose-300/40 transition duration-300 flex flex-col relative overflow-hidden">
            <div className="absolute top-2 right-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-full">BUDGET FRIENDLY</div>
            <h3 className="text-2xl font-extrabold text-navy-gemini dark:text-white mb-2 playfair">Elopement Care</h3>
            <p className="text-gray-500 dark:text-slate-400 mb-4 text-sm">Perfect for intimate elopements or small dinners.</p>
            <div className="text-4xl font-bold text-rose-gemini mb-6">₹6,000+ <span className="text-xs text-gray-500 dark:text-slate-500 font-normal block">for up to 3 hours</span></div>
            <ul className="text-left space-y-3 mb-8 text-gray-700 dark:text-slate-300 flex-grow text-sm">
              <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i><span>1 Vetted Nanny</span></li>
              <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i><span>Basic Supervision Only</span></li>
              <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i><span>Small Activity Kit Included</span></li>
              <li className="flex items-start text-gray-400"><i className="fas fa-times-circle text-gray-300 mt-1 mr-3"></i><span>No Custom Zone Setup</span></li>
            </ul>
            <button onClick={() => handleSelect('Elopement Care')} className="w-full cta-button text-white font-bold py-3 px-4 rounded-full text-sm btn-raise">Select & Secure</button>
          </div>

          {/* Basic Care */}
          <div className="package-card bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border-t-8 border-rose-gemini transform hover:shadow-rose-gemini/40 transition duration-300 flex flex-col">
            <h3 className="text-2xl font-extrabold text-navy-gemini dark:text-white mb-2 playfair">The Basic Care</h3>
            <p className="text-gray-500 dark:text-slate-400 mb-4 text-sm">Ideal for smaller, shorter functions.</p>
            <div className="text-4xl font-bold text-rose-gemini mb-6">₹8,000+ <span className="text-xs text-gray-500 dark:text-slate-500 font-normal block">for up to 4 hours</span></div>
            <ul className="text-left space-y-3 mb-8 text-gray-700 dark:text-slate-300 flex-grow text-sm">
              <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i><span>1-2 Vetted Nannies</span></li>
              <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i><span>Supervised Play Area</span></li>
              <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i><span>Basic Meal Assistance</span></li>
              <li className="flex items-start text-gray-400"><i className="fas fa-times-circle text-gray-300 mt-1 mr-3"></i><span>No Custom Activity Zone</span></li>
            </ul>
            <button onClick={() => handleSelect('Basic Care')} className="w-full cta-button text-white font-bold py-3 px-4 rounded-full text-sm btn-raise">Select & Secure</button>
          </div>

          {/* Celebration Premium */}
          <div className="package-card relative bg-navy-gemini dark:bg-slate-900 p-8 rounded-3xl shadow-2xl border-t-8 border-yellow-400 transform lg:scale-[1.05] hover:lg:scale-[1.08] transition-all duration-300 ring-4 ring-yellow-400/20 flex flex-col">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-navy-gemini text-[10px] font-bold uppercase py-1 px-4 rounded-full shadow-lg z-10">MOST POPULAR 🏆</div>
            <h3 className="text-2xl font-extrabold text-white mb-2 playfair mt-2">Celebration Premium</h3>
            <p className="text-rose-200 dark:text-rose-400 mb-4 text-sm">Our recommended full-service experience.</p>
            <div className="text-5xl font-bold text-yellow-400 mb-6">₹15,000+ <span className="text-xs text-white/70 font-normal block">for up to 6 hours</span></div>
            <ul className="text-left space-y-3 mb-8 text-white flex-grow text-sm">
              <li className="flex items-start"><i className="fas fa-check-circle text-yellow-400 mt-1 mr-3"></i><span>2-4 Vetted Nannies (1:4 Ratio)</span></li>
              <li className="flex items-start"><i className="fas fa-check-circle text-yellow-400 mt-1 mr-3"></i><span><strong>Custom Activity Zone</strong></span></li>
              <li className="flex items-start"><i className="fas fa-check-circle text-yellow-400 mt-1 mr-3"></i><span>Dedicated Nap Area Setup</span></li>
              <li className="flex items-start"><i className="fas fa-check-circle text-yellow-400 mt-1 mr-3"></i><span>Parent Communication Support</span></li>
            </ul>
            <button onClick={() => handleSelect('Celebration Premium')} className="w-full bg-yellow-400 text-navy-gemini font-bold py-3 px-4 rounded-full shadow-xl hover:bg-yellow-300 transition text-sm">Select Premium</button>
          </div>

          {/* Multi-Day */}
          <div className="package-card bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border-t-8 border-rose-gemini transform hover:shadow-rose-gemini/40 transition duration-300 flex flex-col">
            <h3 className="text-2xl font-extrabold text-navy-gemini dark:text-white mb-2 playfair">Multi-Day Event</h3>
            <p className="text-gray-500 dark:text-slate-400 mb-4 text-sm">For Sangeet, Mehendi, and Wedding.</p>
            <div className="text-4xl font-bold text-rose-gemini mb-6">Custom <span className="text-xs text-gray-500 dark:text-slate-500 font-normal block">Best for 3+ functions</span></div>
            <ul className="text-left space-y-3 mb-8 text-gray-700 dark:text-slate-300 flex-grow text-sm">
              <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i><span>Dedicated Lead Nanny</span></li>
              <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i><span><strong>Bulk Discounted Rate</strong></span></li>
              <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i><span>Seamless Setup Transition</span></li>
              <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i><span>Priority Scheduling</span></li>
            </ul>
            <button onClick={() => handleSelect('Multi-Day Event')} className="w-full cta-button text-white font-bold py-3 px-4 rounded-full text-sm btn-raise">Custom Quote</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Packages;