'use client'

import Image from 'next/image';
import { useState } from 'react';
import styled from '@emotion/styled';

export default function Logo() {
  const [hasError, setHasError] = useState(false);

  if (hasError) return null;
  const StyledDiv = styled.div`
    position: fixed;
    z-index: 9999;
    @media (min-width: 768px) {
      top: 2rem;
      right: 2rem;
      transform: none;
    }
    @media (max-width: 767px) {
      bottom: 1.5rem;
      left: 50%;
      transform: translateX(-50%);
    }
  `;

  return (
    <StyledDiv>
      <a 
        href="https://les-siestes.com" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ display: 'block' }}
      >
        <Image 
          src="/images/logo2.png" 
          alt="Logo"
          width={250}
          height={250}
          className="!w-[100px] !h-[100px] md:w-[250px] md:h-[250px]"
          priority
          onError={() => setHasError(true)}
        />
      </a>
    </StyledDiv>
  );
}