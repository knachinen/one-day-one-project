"use client";

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface CountUpNumberProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

const CountUpNumber: React.FC<CountUpNumberProps> = ({ value, suffix = '', prefix = '', duration = 2 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const valueRef = useRef({ current: 0 }); // Using a ref to animate directly with GSAP

  useEffect(() => {
    // Only animate if the value changes or on initial mount
    if (valueRef.current.current !== value) {
      gsap.to(valueRef.current, {
        current: value,
        duration: duration,
        ease: 'power1.out',
        onUpdate: () => {
          setDisplayValue(Math.floor(valueRef.current.current));
        },
      });
    }
  }, [value, duration]);

  return (
    <span className="inline-block">
      {prefix}{displayValue}{suffix}
    </span>
  );
};

export default CountUpNumber;
