/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FeatureItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  content: string;
  avatar: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface PriceTier {
  id: string;
  name: string;
  badge?: string;
  originalPrice: number;
  currentPrice: number;
  installmentsCount: number;
  installmentsValue: number;
  features: string[];
  ctaText: string;
  isPopular?: boolean;
}

export interface SalesPageConfig {
  headline: string;
  subheadline: string;
  vslUrl: string; // YouTube, Vimeo, or leave empty for interactive placeholder
  vslBadge: string;
  primaryCtaText: string;
  countdownMinutes: number;
  featuresTitle: string;
  featuresSubtitle: string;
  features: FeatureItem[];
  authorName: string;
  authorRole: string;
  authorBio: string;
  authorAvatar: string;
  authorSignature?: string;
  testimonialsTitle: string;
  testimonials: Testimonial[];
  priceTitle: string;
  priceSubtitle: string;
  priceTiers: PriceTier[];
  guaranteeDays: number;
  guaranteeText: string;
  faqTitle: string;
  faqs: FAQItem[];
  theme: 'deep-dark' | 'midnight-blue' | 'minimal-indigo' | 'clean-emerald' | 'hotmart-pink' | 'premium-gold';
  purchaseAlertNames: string[];
}
