import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface HeroProps {
  title: string;
  subtitle: string;
  imageAlt: string;
  pillText?: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, imageAlt, pillText }) => {
  const { resolvedTheme } = useTheme();

  const scrollToPricing = () => {
    const el = document.getElementById('pricing');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const input = document.getElementById('calcKids');
        if (input) input.focus();
      }, 400);
    }
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const radialGradient = resolvedTheme === 'dark' 
    ? 'radial-gradient(circle at 50% 50%, rgba(244, 63, 94, 0.04) 0%, transparent 60%)'
    : 'radial-gradient(circle at 50% 50%, rgba(244, 63, 94, 0.08) 0%, transparent 70%)';

  return (
    <section 
      id="hero" 
      className="hero-pattern relative overflow-hidden pt-16 pb-20 md:pt-24 lg:pt-32 bg-rose-50 dark:bg-slate-950 border-b-4 border-rose-gemini/30 dark:border-rose-900/20 transition-colors duration-300"
      style={{ backgroundImage: `${radialGradient}, var(--tw-bg-image)` }}
    >
      <div className="max-w-7xl mx-auto px-4 lg:flex lg:items-center relative z-10">
        <div className="lg:w-1/2 mb-10 lg:mb-0 text-center lg:text-left">
          {pillText && (
            <p className="text-xl font-semibold text-rose-gemini dark:text-rose-400 mb-3 tracking-wider animate-fadeIn">{pillText}</p>
          )}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-navy-gemini dark:text-white leading-tight playfair mb-6">
            {title}
          </h1>
          <p className="text-xl text-gray-700 dark:text-slate-300 mb-4">{subtitle}</p>
          <p className="text-lg text-gray-600 dark:text-slate-400 mt-2 leading-relaxed">
            We are an on-demand childcare add-on that works smoothly with your planner or venue — not event organizers. Our team creates supervised kids’ areas and comfortable spaces so parents can enjoy the celebration without worry.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-start gap-3 sm:gap-4 w-full max-w-md mx-auto lg:mx-0">
            <button 
              onClick={scrollToContact} 
              className="cta-button text-white font-bold py-3.5 px-8 rounded-full text-xl shadow-lg transition w-full sm:w-auto text-center btn-raise"
            >
              Book Stress-Free Day <i className="fas fa-arrow-right ml-2"></i>
            </button>

            <button 
              onClick={scrollToPricing} 
              className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-navy-gemini dark:text-slate-200 font-medium py-3.5 px-6 rounded-full text-lg shadow-sm hover:shadow-md transition w-full sm:w-auto inline-flex items-center justify-center btn-raise"
            >
              <i className="fas fa-calculator mr-2 text-rose-500" aria-hidden="true"></i>
              Get instant estimate
            </button>
          </div>

          <p className="text-sm text-gray-500 dark:text-slate-500 mt-6 text-center max-w-lg mx-auto lg:mx-0" role="note">
            Background-checked caregivers • First-aid trained leads • On-demand add-on • Secure 25% booking
          </p>
        </div>

        <div className="lg:w-1/2 relative flex justify-center lg:justify-end mt-12 lg:mt-0">
          <div className="relative group">
             <img 
              src={`https://placehold.co/600x400/f43f5e/ffffff?text=${encodeURIComponent(imageAlt)}`} 
              alt={imageAlt || "Childcare services provided by The Wedding Nanny"} 
              title={imageAlt || "Childcare services provided by The Wedding Nanny"}
              className="rounded-3xl shadow-2xl border-4 border-white dark:border-slate-800 transform group-hover:rotate-1 transition-transform duration-500 skeleton-img max-w-full h-auto"
              loading="eager"
            />
            <div className="absolute -top-4 -left-4 md:-top-8 md:-left-8 bg-white dark:bg-slate-800 p-4 rounded-full shadow-2xl text-3xl transform rotate-3 border-4 border-rose-gemini animate-bounce transition-all">
              💖
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-200/20 dark:bg-rose-900/10 rounded-full blur-[100px] pointer-events-none -z-0"></div>
    </section>
  );
};

export default Hero;