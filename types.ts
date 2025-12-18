
export interface Testimonial {
  text: string;
  author: string;
  location?: string;
  rating: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PricingCityOption {
  value: string;
  label: string;
  travelCost: number;
  thumbnail: string;
}

export interface CityData {
  id: string;
  name: string;
  layout: string[];
  hero: {
    title: string;
    subtitle: string;
    imageAlt: string;
    pillText?: string;
  };
  trust: {
    title: string;
    description: string;
  };
  testimonials: Testimonial[];
  faqs: FAQItem[];
  partners?: boolean;
  localInsights?: {
    title: string;
    content: string[];
  };
}

export interface BookingRecord {
  id: string;
  clientName: string;
  city: string;
  date: string;
  revenue: number;
  status: 'confirmed' | 'pending' | 'completed';
}

export interface GlobalConfig {
  robotsTxt: string;
  sitemapXml: string;
  headScripts: string;
  footerScripts: string;
  siteName: string;
  metaDescription: string;
  keywords: string;
  googleTagId: string;
  ogImageUrl: string;
  customJs: string;
  bookings: BookingRecord[];
}

export interface ChangeLog {
  id: string;
  timestamp: number;
  description: string;
  author: string;
}

export interface BackupEntry {
  id: string;
  timestamp: number;
  label: string;
  data: {
    cities: Record<string, CityData>;
    global: GlobalConfig;
  };
}

export interface PackageType {
  name: string;
  description: string;
  price: string;
  subPrice: string;
  features: { text: string; included: boolean }[];
  recommended?: boolean;
  colorTheme?: 'white' | 'navy';
}
