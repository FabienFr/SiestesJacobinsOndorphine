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
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
    }
  `;

  return (
    <StyledDiv>
      <Image 
        src="/images/logo2.png" 
        alt="Logo"
        width={250}
        height={250}
        className="w-[120px] h-[120px] md:w-[250px] md:h-[250px]"
        priority
        onError={() => setHasError(true)}
      />
    </StyledDiv>
  );
}