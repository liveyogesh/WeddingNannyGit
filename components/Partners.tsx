import React, { useState } from 'react';

const Partners: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyTemplate = () => {
    const text = `Subject: Partnership opportunity — The Wedding Nanny\n\nHi [Planner Name],\n\nWe help your couples enjoy their ceremonies while we supervise and entertain their children at the venue. We offer vetted staff, first-aid leads, and a simple revenue share.\n\nWould you be open to a short pilot at a discounted rate? We’ll provide video testimonial and priority listing on our site.\n\n— [Your Name], The Wedding Nanny`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSignup = () => {
    const name = prompt('Planner / Venue name:');
    if(name) {
       alert("Thanks — we will reach out within 48 hours.");
    }
  };

  return (
    <section id="partners" className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Planner & Venue Partnerships</h2>
          <p className="text-sm text-stone-600">Offer turnkey childcare to your clients. Revenue share & fast onboarding.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow border border-gray-100">
            <h3 className="font-bold text-lg text-navy-gemini">Why partner with us?</h3>
            <ul className="mt-3 text-stone-600 space-y-2 list-disc pl-5">
              <li>Dedicated onboarding & 10–15% commission.</li>
              <li>Co-branded offers and pilot events for testimonials.</li>
              <li>Partner portal (lead submission), training & SOPs provided.</li>
            </ul>
            <div className="mt-4">
              <button onClick={handleSignup} className="px-4 py-2 bg-rose-gemini text-white rounded hover:bg-rose-600 transition">Sign up as a partner</button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow border border-gray-100">
            <h3 className="font-bold text-lg text-navy-gemini">Planner outreach template</h3>
            <div className="mt-3 p-3 border rounded text-sm bg-gray-50 font-mono text-xs text-gray-600 whitespace-pre-wrap">
              Subject: Partnership opportunity — The Wedding Nanny...
            </div>
            <div className="mt-3 text-right">
              <button onClick={copyTemplate} className="px-3 py-2 bg-white border rounded hover:bg-gray-50 text-sm">
                {copied ? 'Copied!' : 'Copy Template'}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-rose-50 p-8 rounded-lg mt-8">
          <h2 className="text-xl font-extrabold mb-4 text-navy-gemini">How We Work Together</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
               <h3 className="font-semibold mb-2">Partner Benefits</h3>
               <p className="text-sm text-gray-600">Flexible add-on at proposal stage. Dedicated partner liaison.</p>
            </div>
            <div>
               <h3 className="font-semibold mb-2">How It Works</h3>
               <p className="text-sm text-gray-600">Share brief -> We propose staffing -> Confirm with 25%.</p>
            </div>
             <div>
               <h3 className="font-semibold mb-2">Onboarding</h3>
               <p className="text-sm text-gray-600">Simple 5-minute call. No long-term lock-ins.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;