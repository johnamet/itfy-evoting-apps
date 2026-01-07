import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Nominees',
  description: 'View all nominees for IT FOR Youth Ghana awards. Discover talented youth making an impact in technology, innovation, and digital skills across Ghana.',
  keywords: ['ITFY nominees', 'award nominees', 'Ghana youth nominees', 'tech talent Ghana', 'youth achievers'],
  openGraph: {
    title: 'Nominees | IT FOR Youth Ghana',
    description: 'Meet the outstanding nominees for IT FOR Youth Ghana awards.',
    type: 'website',
  },
};

export default function NomineesLayout({ children }: { children: ReactNode }) {
  return children;
}
