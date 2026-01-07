import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Nominate',
  description: 'Nominate outstanding youth for IT FOR Youth Ghana awards. Recognize talented individuals making a difference in technology, innovation, and digital skills.',
  keywords: ['nominate', 'ITFY nomination', 'youth nomination', 'award nomination Ghana', 'nominate candidate'],
  openGraph: {
    title: 'Nominate | IT FOR Youth Ghana',
    description: 'Nominate talented youth for recognition and awards.',
    type: 'website',
  },
};

export default function NominateLayout({ children }: { children: ReactNode }) {
  return children;
}
