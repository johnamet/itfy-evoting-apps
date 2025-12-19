import './styles/globals.css';
import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { AuthProvider } from '../../hooks/useAuth';

export const metadata = {
  title: 'ITFY E-Voting',
  description: 'Rebuilt itfy-evoting frontend (MVP scaffold)'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
