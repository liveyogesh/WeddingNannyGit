import React from 'react';
import { Testimonial } from '../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl playfair md:text-5xl font-extrabold text-navy-gemini dark:text-white mb-6">Loved by Parents & Planners 🥂</h2>
        <p className="text-xl text-gray-500 dark:text-slate-400 mb-16 max-w-3xl mx-auto leading-relaxed">
          Hear from couples and event planners who trust us to manage the children's experience flawlessly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="p-8 bg-cream-gemini dark:bg-slate-800 rounded-3xl shadow-lg border border-rose-100 dark:border-slate-700 transition hover:shadow-2xl text-left relative group">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-rose-gemini rounded-full flex items-center justify-center text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <i className="fas fa-quote-left text-sm"></i>
              </div>
              <div className="flex justify-between items-center mb-6">
                <div className="flex text-yellow-500 text-sm gap-0.5">
                  {[...Array(t.rating)].map((_, i) => <i key={i} className="fas fa-star"></i>)}
                </div>
                {t.location && (
                  <span className="text-[10px] bg-rose-100 dark:bg-rose-900/30 text-rose-gemini dark:text-rose-400 px-3 py-1 rounded-full font-bold tracking-widest uppercase">
                    📍 {t.location}
                  </span>
                )}
              </div>
              <p className="italic text-gray-700 dark:text-slate-300 mb-6 leading-relaxed">"{t.text}"</p>
              <div className="font-bold text-navy-gemini dark:text-white text-base">— {t.author}</div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-6 mt-16 flex-wrap">
          {[
            "✔ Trusted by Modern Couples",
            "✔ Seamlessly Works with Planners",
            "✔ Loved by Families in All Cities"
          ].map((badge, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 shadow-sm rounded-full px-6 py-2.5 border border-rose-100 dark:border-slate-700">
              <p className="text-navy-gemini dark:text-slate-200 font-bold text-sm tracking-wide">{badge}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;