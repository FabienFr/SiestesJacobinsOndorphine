'use client'

import Image from 'next/image';
import { useState } from 'react';

export default function Logo() {
  const [hasError, setHasError] = useState(false);

  if (hasError) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[9999] pointer-events-non" style={{ 
        position: 'fixed',
        top: '2rem',
        right: '2rem',
        zIndex: 9999 
    }}
    >
      <Image 
        src="/images/logo2.png" 
        alt="Logo"
        width={250}
        height={250}
        priority
        onError={() => setHasError(true)}
      />
    </div>
  );
}