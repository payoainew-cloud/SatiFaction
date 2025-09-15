import React, { useState, useEffect } from 'react';

interface LandingPageProps {
  onStartClick: () => void;
}

const parallaxElements = [
  { depth: 0.1, classes: 'w-48 h-48 bg-emerald-200/50 rounded-full top-[60%] left-[5%] blur-3xl' },
  { depth: 0.15, classes: 'w-32 h-32 bg-emerald-300/50 top-[80%] left-[95%] blur-3xl' },
  { depth: 0.2, classes: 'w-24 h-24 bg-emerald-300/50 top-[10%] left-[25%] blur-2xl' },
  { depth: 0.4, classes: 'w-16 h-16 bg-emerald-400/50 rounded-full top-[75%] left-[70%] blur-xl' },
  { depth: 0.7, classes: 'w-6 h-6 bg-emerald-500/50 rounded-full top-[15%] left-[85%] blur-md' },
  { depth: 0.8, classes: 'w-8 h-8 bg-emerald-500/50 top-[45%] left-[15%] blur-lg' },
];


const LandingPage: React.FC<LandingPageProps> = ({ onStartClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });


  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize(); // Set initial size
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-gray-50 to-slate-100 overflow-hidden select-none">
      
      {/* Background Aurora Effect */}
      <div 
        className={`
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          w-[60vw] h-[60vw] max-w-[800px] max-h-[800px]
          bg-gradient-to-tr from-emerald-300/50 via-emerald-200/40 to-white/30
          rounded-full blur-3xl animate-spin-slow
          transition-opacity duration-1000
          ${isLoaded ? 'opacity-50' : 'opacity-0'}
        `}
      />

      {/* Parallax Icons */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 delay-200 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {parallaxElements.map((el, i) => {
          const offsetX = (mousePosition.x - windowSize.width / 2) * -el.depth / 100;
          const offsetY = (mousePosition.y - windowSize.height / 2) * -el.depth / 100;
          return (
            <div
              key={i}
              className={`absolute transition-transform duration-700 ease-out ${el.classes}`}
              style={{
                transform: `translate3d(${offsetX}px, ${offsetY}px, 0)`,
              }}
            />
          );
        })}
      </div>

      <div className="text-center z-10">
        <h1 
            className={`
                font-extrabold tracking-tighter transition-all duration-700 ease-out
                bg-gradient-to-r from-emerald-500 via-emerald-700 to-emerald-500
                text-transparent bg-clip-text animate-text-gradient
                ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `} 
            style={{ fontSize: 'clamp(3rem, 12vw, 8rem)' }}
        >
          SatiFaction
        </h1>
        <h2 
            className={`
                font-light text-5xl text-emerald-800/70 tracking-widest transition-all duration-700 ease-out delay-200
                ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
        >
          FAction
        </h2>
      </div>

      <button
        onClick={onStartClick}
        className={`
          mt-10 px-10 py-4 bg-emerald-700 text-white font-semibold text-lg rounded-full z-10
          shadow-lg shadow-emerald-700/30 hover:bg-emerald-600 focus:outline-none
          focus:ring-4 focus:ring-emerald-500/50 transform hover:scale-105 transition-all duration-700 ease-out delay-500
          ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}
      >
        Start
      </button>
    </div>
  );
};

export default LandingPage;