import './globals.css';

export const metadata = {
  title: "Pannellum Demo",
};

import { ReactNode } from 'react';

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
      <body style={{ height: "100%", margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
