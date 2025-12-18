import React from 'react';

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl playfair font-extrabold text-navy-gemini mb-4">
          How It Works
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
          Booking childcare for your wedding is simple and stress-free.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="p-6 bg-cream-gemini rounded-2xl shadow">
            <div className="text-5xl mb-3">📅</div>
            <h3 className="text-xl font-bold mb-2">1. Share Your Event</h3>
            <p className="text-gray-600">Tell us your date, venue, and kids' count.</p>
          </div>

          <div className="p-6 bg-cream-gemini rounded-2xl shadow">
            <div className="text-5xl mb-3">🧸</div>
            <h3 className="text-xl font-bold mb-2">2. Choose a Package</h3>
            <p className="text-gray-600">We recommend the right care level based on your requirements.</p>
          </div>

          <div className="p-6 bg-cream-gemini rounded-2xl shadow">
            <div className="text-5xl mb-3">🤝</div>
            <h3 className="text-xl font-bold mb-2">3. Meet Your Nanny</h3>
            <p className="text-gray-600">We introduce your lead nanny before the event.</p>
          </div>

          <div className="p-6 bg-cream-gemini rounded-2xl shadow">
            <div className="text-5xl mb-3">🎉</div>
            <h3 className="text-xl font-bold mb-2">4. Enjoy Your Day</h3>
            <p className="text-gray-600">We take care of the kids while you enjoy the celebrations.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;