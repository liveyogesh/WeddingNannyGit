import React, { useState } from 'react';
import { FAQItem } from '../types';

interface FAQProps {
  items: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-rose-50 dark:bg-slate-950 border-t border-b border-rose-200 dark:border-slate-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl playfair md:text-5xl font-extrabold text-navy-gemini dark:text-white mb-6 text-center">Questions Answered 💡</h2>
        <p className="text-xl text-gray-500 dark:text-slate-400 mb-16 text-center leading-relaxed">Everything you need to know about our premium event childcare.</p>

        <div className="space-y-4">
          {items.map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-rose-100 dark:border-slate-800 overflow-hidden transition-all duration-300">
              <button 
                className="w-full text-left p-6 md:p-8 flex justify-between items-center text-xl font-bold text-navy-gemini dark:text-slate-100 focus:outline-none group" 
                onClick={() => toggle(idx)}
              >
                <span>{item.question}</span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${openIndex === idx ? 'bg-rose-gemini text-white rotate-180' : 'bg-rose-50 dark:bg-slate-800 text-rose-gemini'}`}>
                   <i className="fas fa-chevron-down text-sm"></i>
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0 text-gray-600 dark:text-slate-400 border-t border-gray-50 dark:border-slate-800/50 leading-relaxed text-lg">
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;