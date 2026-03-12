export type NavItem = {
  id: string;
  label: string;
  href: string;
};

export type ReferenceBrand = {
  id: 'loli' | 'master';
  name: string;
  sector: string;
  signature: string;
  description: string;
  highlights: string[];
};

export type AgencySignal = {
  id: string;
  title: string;
  description: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  metric: string;
};

export type ServiceItem = {
  id: string;
  title: string;
  icon: string;
  description: string;
  benefits: string[];
};

export type ServiceCategory = {
  id: string;
  title: string;
  items: ServiceItem[];
};

export type ProcessStep = {
  id: string;
  title: string;
  description: string;
};

export type CaseCategory = string;

export type CaseStudy = {
  id: string;
  title: string;
  category: CaseCategory;
  summary: string;
  metric: string;
  image: string;
  problem?: string;
  solution?: string;
  outcome?: string;
  services?: string[];
  highlights?: string[];
};

export type PricingPlan = {
  id: string;
  name: string;
  priceTRY: string;
  priceLabel?: string;
  description: string;
  features: string[];
  recommended?: boolean;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type BlogPost = {
  id: string;
  title: string;
  category: 'Reklam' | 'Yazılım' | 'Strateji';
  excerpt: string;
  readTime: string;
  image: string;
};

export type ContactInfo = {
  phone: string;
  email: string;
  whatsapp: string;
  instagramHandle: string;
  instagramUrl: string;
};

export type SocialLink = {
  id: string;
  label: string;
  href: string;
};
