
import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import AnimationPage from './components/AnimationPage';

const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);

  const handleStart = () => {
    setIsStarted(true);
  };

  return (
    <div className="relative w-screen h-screen">
       <div
        className={`transition-opacity duration-1000 ${isStarted ? 'opacity-0' : 'opacity-100'}`}
      >
        <LandingPage onStartClick={handleStart} />
      </div>
      {isStarted && (
        <div
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${isStarted ? 'opacity-100' : 'opacity-0'}`}
        >
          <AnimationPage />
        </div>
      )}
    </div>
  );
};

export default App;
