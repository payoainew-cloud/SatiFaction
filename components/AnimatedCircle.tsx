
import React, { useEffect, useState } from 'react';

interface AnimatedCircleProps {
  x: number;
  y: number;
  onComplete: () => void;
}

const AnimatedCircle: React.FC<AnimatedCircleProps> = ({ x, y, onComplete }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Trigger animation right after mount
    const frameId = requestAnimationFrame(() => {
      setIsAnimating(true);
    });

    const timeoutId = setTimeout(onComplete, 1200); // Animation duration + buffer

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  return (
    <div
      style={{
        top: y,
        left: x,
        transform: 'translate(-50%, -50%)',
      }}
      className={`
        absolute rounded-full bg-emerald-800 pointer-events-none
        transition-all duration-1000 ease-out
        ${isAnimating ? 'w-64 h-64 opacity-0 scale-125' : 'w-0 h-0 opacity-70 scale-0'}
      `}
    />
  );
};

export default AnimatedCircle;
