import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 lg:flex lg:space-x-12">
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <h2 className="text-4xl playfair font-extrabold text-navy-gemini mb-4">
            About The Wedding Nanny
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            The Wedding Nanny was created to help families enjoy weddings without worrying about childcare. Parents deserve to be fully present for the big moments, and children deserve a space where they feel safe, engaged, and cared for.
          </p>
          <p className="text-lg text-gray-600 mb-4">
            Our nannies are experienced, background-checked, and trained for event environments. From infants who need constant attention to toddlers who need structured activities, we support families through every ceremony.
          </p>
          <p className="text-lg text-gray-600">
            We are committed to giving parents peace of mind, creating a joyful experience for kids, and making every celebration smoother for planners and venues.
          </p>
        </div>

        <div className="lg:w-1/2 flex justify-center">
          <img 
            src="https://placehold.co/500x350/fce7f3/333?text=Our+Story" 
            alt="About The Wedding Nanny"
            className="rounded-3xl shadow-xl border-4 border-white skeleton-img max-w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default About;