import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: '#0152be',
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vote.itforyouthghana.org';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'IT FOR Youth Ghana E-Voting Platform',
    template: '%s | IT FOR Youth Ghana',
  },
  description: 'Official e-voting platform for IT FOR Youth Ghana events and elections. Vote for your favorite candidates, nominate participants, and participate in youth empowerment initiatives.',
  keywords: [
    'IT FOR Youth Ghana',
    'e-voting',
    'Ghana elections',
    'youth empowerment',
    'online voting',
    'Ghana awards',
    'youth awards Ghana',
    'vote Ghana',
    'nominations',
    'ITFY Ghana',
  ],
  authors: [{ name: 'IT FOR Youth Ghana', url: siteUrl }],
  creator: 'IT FOR Youth Ghana',
  publisher: 'IT FOR Youth Ghana',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/Asset-1.png',
    apple: '/Asset-1.png',
    shortcut: '/Asset-1.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GH',
    url: siteUrl,
    siteName: 'IT FOR Youth Ghana E-Voting',
    title: 'IT FOR Youth Ghana E-Voting Platform',
    description: 'Vote for your favorite candidates in IT FOR Youth Ghana events. Participate in youth empowerment through democratic elections.',
    images: [
      {
        url: '/Asset-2.jpg',
        width: 1200,
        height: 630,
        alt: 'IT FOR Youth Ghana E-Voting Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IT FOR Youth Ghana E-Voting Platform',
    description: 'Vote for your favorite candidates in IT FOR Youth Ghana events.',
    images: ['/Asset-2.jpg'],
    creator: '@ITFYGhana',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add these when you have them
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <QueryProvider>
          <AuthProvider>
            {children}
            <Toaster position="top-right" richColors closeButton />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
