import { CityData, PricingCityOption } from './types';

export interface ExtendedPricingCityOption extends PricingCityOption {
  lat?: number;
  lng?: number;
  path?: string;
}

export const CITIES_OPTIONS: ExtendedPricingCityOption[] = [
  { value: 'Delhi-NCR', label: 'Delhi & NCR', travelCost: 2500, thumbnail: 'https://placehold.co/100x100/ef4444/ffffff?text=DL', lat: 28.6139, lng: 77.2090, path: '/delhi-ncr' },
  { value: 'Hyderabad', label: 'Hyderabad', travelCost: 1500, thumbnail: 'https://placehold.co/100x100/6366f1/ffffff?text=HYD', lat: 17.3850, lng: 78.4867, path: '/hyderabad' },
  { value: 'Ballia', label: 'Ballia', travelCost: 1500, thumbnail: 'https://placehold.co/100x100/22c55e/ffffff?text=UP', lat: 25.7600, lng: 84.1400, path: '/ballia' },
  { value: 'Mumbai', label: 'Mumbai', travelCost: 3000, thumbnail: 'https://placehold.co/100x100/3b82f6/ffffff?text=MUM', lat: 19.0760, lng: 72.8777 },
  { value: 'Bengaluru', label: 'Bengaluru', travelCost: 2500, thumbnail: 'https://placehold.co/100x100/10b981/ffffff?text=BLR', lat: 12.9716, lng: 77.5946 },
  { value: 'Jaipur', label: 'Jaipur', travelCost: 3500, thumbnail: 'https://placehold.co/100x100/ec4899/ffffff?text=JPR', lat: 26.9124, lng: 75.7873 },
  { value: 'Udaipur', label: 'Udaipur', travelCost: 4000, thumbnail: 'https://placehold.co/100x100/a855f7/ffffff?text=UDR', lat: 24.5854, lng: 73.7125 },
];

const COMMON_FAQS = [
  {
    question: "What is the nanny-to-child ratio?",
    answer: "We maintain a strict ratio of 1:4 for under 3 years and 1:6 for 3+. Infant care uses more staff."
  },
  {
    question: "What is included in the 'Custom Activity Zone'?",
    answer: "Professional setup/takedown, curated games, sensory play, craft supplies and themed decorations matching the event decor."
  },
  {
    question: "When should I book?",
    answer: "We recommend booking 3–6 months in advance for peak dates to ensure availability and planning time."
  }
];

export const CITY_DATA: Record<string, CityData> = {
  home: {
    id: 'home',
    name: 'India',
    layout: ['hero', 'trust', 'reality', 'services', 'how-it-works', 'pricing', 'packages', 'comparison', 'testimonials', 'faq', 'contact', 'about', 'partners'],
    hero: {
      title: "Enjoy Your Wedding. We’ll Take Care of the Little Ones.",
      subtitle: "On-demand childcare and supervised kids’ areas for Indian weddings. Vetted caregivers, clear safety procedures, and engaging activities to keep children happy while parents enjoy the celebration.",
      imageAlt: "Joyful Kids at Wedding (Vetted Nannies on Duty)",
      pillText: "PREMIER WEDDING CHILDCARE ACROSS INDIA 🇮🇳"
    },
    trust: {
      title: "Why Parents Trust Us",
      description: "Child safety is at the heart of everything we do. Our families trust us because we follow strict vetting, training, and supervision standards designed specifically for event environments."
    },
    testimonials: [
      {
        text: "We actually got to enjoy our Sangeet! The kids were mesmerized by the activity corner.",
        author: "Priya & Rohan S.",
        location: "Delhi",
        rating: 5
      },
      {
        text: "As a planner, I need reliability. The Wedding Nanny team was on time and discreet.",
        author: "Kavita M.",
        location: "Event Designer",
        rating: 5
      },
      {
        text: "My infant was cared for during the ceremony — the nap space was a genius addition.",
        author: "Sneha P.",
        location: "Client Parent",
        rating: 5
      }
    ],
    faqs: [
      {
        question: "Are you event organizers?",
        answer: "No. We provide professional childcare as an on-demand add-on service for weddings. We work alongside your planner or venue team to set up supervised kids’ areas, but we do not organize or manage the event."
      },
      ...COMMON_FAQS,
      {
        question: "Is Wedding Nanny available in multiple cities?",
        answer: "Yes — Delhi & NCR, Hyderabad, Ballia and expanding."
      }
    ],
    partners: true
  },
  ballia: {
    id: 'ballia',
    name: 'Ballia',
    layout: ['hero', 'local-insights', 'reality', 'trust', 'services', 'pricing', 'packages', 'comparison', 'testimonials', 'how-it-works', 'faq', 'contact', 'about', 'partners'],
    hero: {
      title: "Enjoy Your Wedding in Ballia. We’ll Take Care of the Little Ones.",
      subtitle: "On-demand childcare and supervised kids’ areas for Indian weddings. Vetted caregivers, clear safety procedures, and engaging activities to keep children happy while parents enjoy the celebration.",
      imageAlt: "Kids playing in supervised kids corner Ballia",
      pillText: "PREMIER EVENT CHILDCARE 🇮🇳"
    },
    trust: {
      title: "Why Parents in Ballia Trust Us",
      description: "Child safety is at the heart of everything we do. We operate as an on-demand, optional add-on service for weddings, and our families trust us because we follow strict vetting, training, and event-ready supervision standards."
    },
    testimonials: [
      {
        text: "Late-night wedding functions ke dauraan bachchon ke liye shaant aur safe space milna parents ke liye bahut rahat bhara tha.",
        author: "Parent",
        location: "Ballia, UP",
        rating: 5
      },
      {
        text: "Guests apne bachchon ke saath aaye the, aur caregivers ne khana, khel aur rest sab smoothly manage kiya.",
        author: "Family member",
        location: "Ballia, UP",
        rating: 5
      }
    ],
    faqs: [
      {
        question: "Do you travel to villages near Ballia for home weddings?",
        answer: "Yes — we serve Ballia and nearby districts; travel charges depend on distance and logistics."
      },
      ...COMMON_FAQS
    ],
    localInsights: {
      title: "Serving Ballia & nearby districts",
      content: [
        "Ballia hosts many family-centered, multi-day weddings. We bring structured childcare with locally-aware teams that manage travel and setup in semi-urban and rural venues.",
        "The Multi-Day package is particularly useful here — families appreciate a consistent lead nanny across ceremonies for predictable routines and smoother mealtimes."
      ]
    },
    partners: true
  },
  'delhi-ncr': {
    id: 'delhi-ncr',
    name: 'Delhi & NCR',
    layout: ['hero', 'services', 'trust', 'pricing', 'packages', 'comparison', 'reality', 'how-it-works', 'testimonials', 'faq', 'contact', 'about', 'partners'],
    hero: {
      title: "Enjoy Your Wedding in Delhi & NCR. We’ll Take Care of the Little Ones.",
      subtitle: "On-demand childcare and supervised kids’ areas for weddings across Delhi, Noida, Gurugram, Faridabad, and the wider NCR region.",
      imageAlt: "Kids playing in supervised kids corner Delhi",
      pillText: "PREMIER EVENT CHILDCARE 🇮🇳"
    },
    trust: {
      title: "Why Parents in Delhi & NCR Trust Us",
      description: "Child safety is at the heart of everything we do. We follow strict vetting and event-ready supervision standards for the fast-paced NCR wedding scene."
    },
    testimonials: [
      {
        text: "The childcare setup worked seamlessly with our planner and venue timelines. Everything was handled professionally.",
        author: "Parent",
        location: "Delhi-NCR",
        rating: 5
      }
    ],
    faqs: COMMON_FAQS,
    partners: true
  },
  hyderabad: {
    id: 'hyderabad',
    name: 'Hyderabad',
    layout: ['hero', 'pricing', 'testimonials', 'services', 'trust', 'reality', 'how-it-works', 'packages', 'comparison', 'local-insights', 'faq', 'contact', 'about', 'partners'],
    hero: {
      title: "Enjoy Your Wedding in Hyderabad. We’ll Take Care of the Little Ones.",
      subtitle: "On-demand childcare and supervised kids' areas for Hyderabad weddings. Stress-free ceremonies for parents in Jubilee Hills, Banjara Hills, and beyond.",
      imageAlt: "Kids playing in supervised kids corner Hyderabad",
      pillText: "PREMIER EVENT CHILDCARE 🇮🇳"
    },
    trust: {
      title: "Why Parents in Hyderabad Trust Us",
      description: "Child safety is at the heart of everything we do. We bring high-end childcare standards to Hyderabad's elite wedding venues."
    },
    testimonials: [
      {
        text: "Our Mehendi ran late in Jubilee Hills — the kid's corner kept our little guests engaged and we could enjoy the night.",
        author: "Priya & Raj",
        location: "Jubilee Hills",
        rating: 5
      }
    ],
    faqs: COMMON_FAQS,
    localInsights: {
      title: "Why Hyderabad trusts The Wedding Nanny",
      content: [
        "Hyderabad weddings mix long evenings and cosmopolitan venues. We design discreet kids' corners that fit into popular local venues—from Jubilee Hills homes to large banquet halls in HITEC City."
      ]
    },
    partners: true
  }
};