import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Voting Guidelines',
  description: 'Learn how to vote in IT FOR Youth Ghana events. Understand the voting process, rules, and guidelines for fair and transparent elections.',
  keywords: ['voting guidelines', 'how to vote', 'ITFY voting rules', 'voting process Ghana'],
  openGraph: {
    title: 'Voting Guidelines | IT FOR Youth Ghana',
    description: 'Everything you need to know about the voting process.',
    type: 'website',
  },
};

export default function GuidelinesLayout({ children }: { children: ReactNode }) {
  return children;
}
