import React from 'react';

interface LocalInsightsProps {
  title: string;
  content: string[];
}

const LocalInsights: React.FC<LocalInsightsProps> = ({ title, content }) => {
  return (
    <section className="max-w-6xl mx-auto px-4 mt-8">
      <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-rose-gemini">
        <h2 className="text-2xl font-extrabold mb-4 text-navy-gemini">{title}</h2>
        {content.map((paragraph, idx) => (
          <p key={idx} className="text-gray-700 mb-3 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
};

export default LocalInsights;