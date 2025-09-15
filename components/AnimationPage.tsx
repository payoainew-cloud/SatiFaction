
import React, { useState, useCallback } from 'react';
import AnimatedCircle from './AnimatedCircle';

interface Circle {
  id: number;
  x: number;
  y: number;
}

const AnimationPage: React.FC = () => {
  const [circles, setCircles] = useState<Circle[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const newCircle: Circle = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    };
    setCircles(prev => [...prev, newCircle]);
  };

  const removeCircle = useCallback((id: number) => {
    setCircles(prev => prev.filter(c => c.id !== id));
  }, []);

  return (
    <div
      onClick={handleClick}
      className="w-screen h-screen bg-gradient-to-br from-white via-gray-50 to-slate-100 cursor-pointer overflow-hidden"
    >
      {circles.map(circle => (
        <AnimatedCircle
          key={circle.id}
          x={circle.x}
          y={circle.y}
          onComplete={() => removeCircle(circle.id)}
        />
      ))}
       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <p className="text-gray-300 font-light text-2xl select-none animate-pulse">Click anywhere</p>
      </div>
    </div>
  );
};

export default AnimationPage;