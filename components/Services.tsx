import React from 'react';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl playfair md:text-5xl font-extrabold text-navy-gemini dark:text-white mb-6">What We Offer 🌟</h2>
        <p className="text-xl text-gray-500 dark:text-slate-400 mb-16 max-w-3xl mx-auto leading-relaxed">
          We integrate seamlessly as an optional, on-demand childcare add-on — providing discreet, professional care so your guests can fully enjoy every ceremony.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { emoji: '🎨', title: "Custom Kids' Corner", text: "Themed activity zone with age-appropriate toys, crafts, and games. Entertainment guaranteed!", border: "border-rose-gemini" },
            { emoji: '👩‍👧‍👦', title: "Vetted Caregivers", text: "Professional, background-checked, and experienced nannies dedicated to group event supervision.", border: "border-navy-gemini dark:border-slate-600" },
            { emoji: '🍎', title: "Nap & Meal Assistance", text: "Managing nap schedules, feeding assistance, and diaper changes in a quiet, designated area.", border: "border-rose-gemini" },
            { emoji: '🌙', title: "Ceremony to Reception", text: "Flexible hours covering main functions, from morning ceremonies to late-night receptions.", border: "border-navy-gemini dark:border-slate-600" }
          ].map((service, idx) => (
            <div key={idx} className={`bg-cream-gemini dark:bg-slate-800 p-8 rounded-2xl shadow-xl transition-all transform hover:scale-[1.03] duration-300 border-b-4 ${service.border}`}>
              <div className="text-5xl mb-6 transform hover:scale-110 transition-transform cursor-default">{service.emoji}</div>
              <h3 className="text-2xl font-bold mb-4 playfair text-rose-gemini dark:text-rose-400 leading-tight">{service.title}</h3>
              <p className="text-gray-600 dark:text-slate-300 leading-relaxed text-sm">{service.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;