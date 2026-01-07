import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Award Categories',
  description: 'Explore all award categories in IT FOR Youth Ghana events. Find categories for tech innovation, digital skills, youth leadership, and more.',
  keywords: ['award categories', 'ITFY categories', 'youth awards', 'tech awards categories', 'Ghana awards'],
  openGraph: {
    title: 'Award Categories | IT FOR Youth Ghana',
    description: 'Explore all award categories and vote for your favorites.',
    type: 'website',
  },
};

export default function CategoriesLayout({ children }: { children: ReactNode }) {
  return children;
}
