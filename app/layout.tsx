import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { themeInitScript } from '@/lib/theme';
import { OG_IMAGE, SITE_NAME, SITE_URL } from '@/lib/site';
import './globals.css';

const TITLE = 'Omar Amine | Frontend Engineer';
const DESCRIPTION =
  'Frontend engineer in Casablanca building fast, responsive web apps with React, Next.js, TypeScript and Tailwind CSS.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description:
    'Omar Amine is a frontend engineer in Casablanca building fast, responsive web apps with React, Next.js, TypeScript and Tailwind CSS. See projects, experience and get in touch.',
  alternates: { canonical: '/' },
  icons: { icon: { url: '/favicon.svg', type: 'image/svg+xml' } },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Omar Amine, Frontend Engineer: React, Next.js, TypeScript, Tailwind CSS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@OmarAMI03151544',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export const viewport: Viewport = {
  themeColor: '#1e3a8a',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // The theme script adds the `dark` class before React hydrates
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
