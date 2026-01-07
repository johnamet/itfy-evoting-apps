import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Browse all IT FOR Youth Ghana events and elections. Find active voting events, upcoming awards, and past ceremonies. Participate in youth empowerment initiatives.',
  keywords: ['ITFY events', 'Ghana youth events', 'voting events', 'awards ceremony', 'tech awards Ghana'],
  openGraph: {
    title: 'Events | IT FOR Youth Ghana',
    description: 'Browse and participate in IT FOR Youth Ghana events and elections.',
    type: 'website',
  },
};

export default function EventsLayout({ children }: { children: ReactNode }) {
  return children;
}
