import React from 'react';
import Hero from '../components/Hero';
import Trust from '../components/Trust';
import WeddingReality from '../components/WeddingReality';
import Services from '../components/Services';
import HowItWorks from '../components/HowItWorks';
import Pricing from '../components/Pricing';
import Packages from '../components/Packages';
import PackageComparison from '../components/PackageComparison';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import Partners from '../components/Partners';
import About from '../components/About';
import LocalInsights from '../components/LocalInsights';
import { CityData } from '../types';

interface CityPageProps {
  data: CityData;
}

const CityPage: React.FC<CityPageProps> = ({ data }) => {
  if (!data) return null;

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'hero':
        return (
          <Hero 
            key="hero"
            title={data.hero.title} 
            subtitle={data.hero.subtitle} 
            imageAlt={data.hero.imageAlt}
            pillText={data.hero.pillText}
          />
        );
      case 'trust':
        return <Trust key="trust" title={data.trust.title} description={data.trust.description} />;
      case 'reality':
        return <WeddingReality key="reality" />;
      case 'services':
        return <Services key="services" />;
      case 'how-it-works':
        return <HowItWorks key="how-it-works" />;
      case 'pricing':
        return <Pricing key="pricing" defaultCity={data.name === 'India' ? undefined : data.name} />;
      case 'packages':
        return <Packages key="packages" />;
      case 'comparison':
        return <PackageComparison key="comparison" />;
      case 'testimonials':
        return <Testimonials key="testimonials" testimonials={data.testimonials} />;
      case 'faq':
        return <FAQ key="faq" items={data.faqs} />;
      case 'contact':
        return <Contact key="contact" defaultCity={data.name} />;
      case 'about':
        return <About key="about" />;
      case 'local-insights':
        return data.localInsights ? (
          <LocalInsights 
            key="local-insights" 
            title={data.localInsights.title} 
            content={data.localInsights.content} 
          />
        ) : null;
      case 'partners':
        return data.partners ? <Partners key="partners" /> : null;
      default:
        return null;
    }
  };

  return (
    <div className="animate-fadeIn">
      {data.layout.map((sectionId, idx) => {
        return <React.Fragment key={`${sectionId}-${idx}`}>{renderSection(sectionId)}</React.Fragment>;
      })}
    </div>
  );
};

export default CityPage;