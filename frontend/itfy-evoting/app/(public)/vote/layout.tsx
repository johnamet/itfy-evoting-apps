import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Vote',
  description: 'Cast your vote for your favorite nominees in IT FOR Youth Ghana awards. Support talented youth making an impact in technology and innovation.',
  keywords: ['vote Ghana', 'ITFY voting', 'online voting', 'youth awards voting', 'cast vote'],
  openGraph: {
    title: 'Vote | IT FOR Youth Ghana',
    description: 'Cast your vote and support your favorite nominees.',
    type: 'website',
  },
};

export default function VoteLayout({ children }: { children: ReactNode }) {
  return children;
}
