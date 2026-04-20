import React, { useState, useEffect } from 'react';
import './index.css';

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prevHearts) => {
        const newHearts = [
          ...prevHearts,
          {
            id: Math.random(),
            left: Math.random() * 90 + 5, 
            animationDuration: Math.random() * 3 + 4,
            fontSize: Math.random() * 15 + 15,
          }
        ];
        return newHearts.slice(-25); 
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="animate-float absolute bottom-0 text-red-500 opacity-80"
          style={{
            left: `${heart.left}%`,
            animationDuration: `${heart.animationDuration}s`,
            fontSize: `${heart.fontSize}px`
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noPosition, setNoPosition] = useState({ top: null, left: null });
  const [buttonText, setButtonText] = useState("NO 💔");
  
  // 0: default, 1: inflating, 2: burst popped
  const [burstPhase, setBurstPhase] = useState(0);

  const moveNoButton = () => {
    setNoCount(prev => prev + 1);

    // We assume the longest button string could be around 220px wide on mobile and 60px tall
    const buttonEstimatedWidth = 240; 
    const buttonEstimatedHeight = 70;

    // The mathematically safe maximum top/left coordinates
    const maxLeft = window.innerWidth - buttonEstimatedWidth;
    const maxTop = window.innerHeight - buttonEstimatedHeight;

    // Prevent negative bounds in case of incredibly tiny windows
    const safeMaxLeft = Math.max(20, maxLeft);
    const safeMaxTop = Math.max(60, maxTop);

    // Generate random positions with a small buffer from screen edges
    const newTop = Math.floor(Math.random() * (safeMaxTop - 20)) + 20;
    const newLeft = Math.floor(Math.random() * (safeMaxLeft - 20)) + 10;

    setNoPosition({ top: `${newTop}px`, left: `${newLeft}px` });

    const phrases = [
      "Please oka sari alochinchu 😢",
      "Drama chestunnava? 😒",
      "Yes nokku ra please 😭",
      "Inko sari try cheyyu 😤",
      "Catch me if you can 🤪",
      "Catch me if you can 🏃‍♂️💨",
      "Catch me if you can 😜"
    ];
    const randomIndex = Math.floor(Math.random() * phrases.length);
    setButtonText(phrases[randomIndex]);
  };

  const handleNoClick = (e) => {
    e.preventDefault();
    moveNoButton();
  };

  const handleYesClick = () => {
    // Phase 1: Inflate
    setBurstPhase(1);
    
    // Phase 2: Pop visually after 150ms
    setTimeout(() => {
      setBurstPhase(2);
      
      // Phase 3: Move to next screen after pop animation finishes
      setTimeout(() => {
        setYesPressed(true);
      }, 400);
    }, 150);
  };

  const yesButtonScale = 1 + noCount * 0.15;

  const getYesButtonStyle = () => {
    if (burstPhase === 1) {
      // Balloon takes a massive breath in!
      return { 
        transform: `scale(${yesButtonScale * 1.4})`,
        transition: 'transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      };
    }
    if (burstPhase === 2) {
      // Balloon is completely completely gone
      return {
        transform: `scale(${yesButtonScale * 2})`,
        opacity: 0,
        filter: 'blur(10px)',
        transition: 'transform 0.2s ease-out, opacity 0.2s, filter 0.2s'
      };
    }
    // Normal state
    return {
      transform: `scale(${yesButtonScale})`,
      transition: 'transform 0.5s ease'
    };
  };

  if (yesPressed) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-premium-animate font-sans p-6 overflow-hidden relative">
        <FloatingHearts />
        <div className="z-10 flex flex-col items-center animate-in zoom-in duration-700 transition-all glass-panel p-10 rounded-3xl">
          <img 
            src="https://i.giphy.com/ZQN9js7pSYL65YyG7O.gif" 
            alt="Cute hugging couple" 
            className="rounded-2xl shadow-2xl max-w-[90%] w-64 md:w-80 h-auto min-h-[200px] mb-8 transition-transform hover:scale-105 duration-500 object-cover"
          />
          <h1 className="text-4xl md:text-6xl font-bold tracking-wide text-red-600 drop-shadow-md text-center">
            Love you too <span className="font-normal inline-block" style={{ fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", emoji' }}>❤️🥰😍</span>
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-premium-animate font-sans p-4 overflow-hidden relative">
      <FloatingHearts />
      <div className="z-10 flex flex-col items-center text-center max-w-2xl px-8 py-12 w-full glass-panel rounded-3xl animate-in fade-in zoom-in duration-[800ms]">
        <h1 className="text-4xl md:text-6xl font-bold tracking-wide text-red-600 drop-shadow-md mb-12 duration-300 leading-tight">
          Will you be my Valentine kutty? <span className="font-normal inline-block whitespace-nowrap" style={{ fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", emoji' }}>🫣🥺😘❤️</span>
        </h1>
        
        <div className="flex flex-col items-center justify-center gap-6 w-full relative h-[150px]">
          
          {/* YES Button Wrapper for absolute particle positioning */}
          <div className="relative z-20 flex justify-center items-center">
            <button
              onClick={handleYesClick}
              disabled={burstPhase > 0} // Disable clicks during animation
              style={getYesButtonStyle()}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl"
            >
              YES ❤️
            </button>

            {/* Balloon Pop Particles */}
            {burstPhase === 2 && (
              <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 30 * Math.PI) / 180;
                  const distance = 120 + Math.random() * 50; 
                  const tx = Math.cos(angle) * distance;
                  const ty = Math.sin(angle) * distance;

                  return (
                    <div
                      key={i}
                      className="absolute w-4 h-4 bg-red-500 rounded-full animate-pop opacity-0"
                      style={{
                        '--pop-translate': `translate(${tx}px, ${ty}px)`,
                        transform: `scale(${yesButtonScale})`
                      }}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* NO Button */}
          <button
            onClick={handleNoClick}
            onMouseEnter={moveNoButton}
            onTouchStart={(e) => {
              e.preventDefault();
              moveNoButton();
            }}
            style={
              noPosition.top 
              ? { 
                  position: 'fixed',
                  top: noPosition.top,
                  left: noPosition.left,
                  zIndex: 50
                }
              : { position: 'relative' }
            }
            className={`transition-all duration-300 ease-in-out bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 font-semibold py-3 px-8 rounded-full shadow-md whitespace-nowrap`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
