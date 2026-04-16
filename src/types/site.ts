export type NavItem = {
  id: string;
  label: string;
  href: string;
};

export type ProblemItem = {
  id: string;
  title: string;
  description: string;
};

export type SystemStep = {
  id: string;
  title: string;
  description: string;
};

export type GrowthStage = {
  id: string;
  title: string;
  bestFor: string;
  build: string;
  outcome: string;
  points: string[];
};

export type CreatorLayerItem = {
  id: string;
  title: string;
  description: string;
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
  challenge: string;
  changed: string;
  impact: string;
  image?: string;
};

export type PricingPlan = {
  id: string;
  name: string;
  priceTRY: string;
  badge?: string;
  bestFor: string;
  description: string;
  outcome: string;
  includes: string[];
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
