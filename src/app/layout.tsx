import './globals.css';
import { ReactNode } from 'react';
import { Analytics } from "@vercel/analytics/next"
import Logo from './components/logo';


export const metadata = {
  title: "Les Siestes - Nuit aux Jacobins - Ondorphine",
  description: "Une expérience sonore immersive dans la nef",
  openGraph: {
    title: "Les Siestes - Nuit aux Jacobins - Ondorphine",
    description: "Une expérience sonore immersive dans la nef",
    images: [
      {
        url: '/images/affiche.jpg',
        width: 1200,
        height: 630,
        alt: 'Les Siestes aux Jacobins',
      },
    ],
  },
};


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js"
          defer
        />
      </head>
      <body className="w-full h-full m-0 overflow-hidden">
        <main className='relative w-full h-full'>
          {children}
          <Logo />
          <Analytics />
        </main>
      </body>
    </html>
  );
}
