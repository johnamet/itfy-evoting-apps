import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about IT FOR Youth Ghana - empowering youth through technology education, digital skills training, and recognition of young innovators across Ghana.',
  keywords: ['IT FOR Youth Ghana', 'about ITFY', 'youth empowerment', 'Ghana NGO', 'tech education Ghana', 'digital skills'],
  openGraph: {
    title: 'About Us | IT FOR Youth Ghana',
    description: 'Empowering youth through technology education and recognition.',
    type: 'website',
  },
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children;
}
