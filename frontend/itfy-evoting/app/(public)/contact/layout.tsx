import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with IT FOR Youth Ghana. Contact us for inquiries about events, voting, nominations, partnerships, or general questions.',
  keywords: ['contact ITFY', 'IT FOR Youth Ghana contact', 'Ghana youth organization contact', 'ITFY support'],
  openGraph: {
    title: 'Contact Us | IT FOR Youth Ghana',
    description: 'Get in touch with our team for any inquiries or support.',
    type: 'website',
  },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
