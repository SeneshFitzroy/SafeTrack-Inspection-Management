import React from 'react';

const Logo = ({ width = 150, height = 150 }) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="100" cy="100" r="90" fill="rgba(84, 121, 255, 0.2)" />
      <path 
        d="M60 110L85 135L140 80" 
        stroke="rgba(84, 121, 255, 1)" 
        strokeWidth="10" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
};

export default Logo;
