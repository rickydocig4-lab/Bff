
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Music, Volume2, VolumeX, ChevronRight, ChevronLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

import ApplicationSlide from './components/ApplicationSlide';
import ReasonsSlide from './components/ReasonsSlide';
import GiftsSlide from './components/GiftsSlide';
import TraumaSlide from './components/TraumaSlide';
import ContractSlide from './components/ContractSlide';
import GameSlide from './components/GameSlide';
import BackgroundHearts from './components/BackgroundHearts';

const slides = [
  { id: 1, component: ApplicationSlide },
  { id: 2, component: ReasonsSlide },
  { id: 3, component: GiftsSlide },
  { id: 4, component: TraumaSlide },
  { id: 5, component: ContractSlide },
  { id: 6, component: GameSlide }
];

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 text-pink-600">
      <BackgroundHearts />
      
      {/* Audio Visualizer / Control */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-4 bg-white/50 backdrop-blur-md p-3 rounded-full border border-pink-200 shadow-sm">
        <span className="text-xs font-semibold px-2">Love Vibes</span>
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="p-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition-colors"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>

      <main className="h-full w-full flex flex-col items-center justify-center p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-4xl bg-white/70 backdrop-blur-lg rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white/40 flex flex-col items-center relative overflow-hidden"
          >
            {React.createElement(slides[currentSlide].component, { onNext: nextSlide })}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="fixed bottom-12 flex gap-6 z-40">
          <button 
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`p-4 rounded-full bg-white/80 shadow-lg transition-all ${currentSlide === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110 active:scale-95 text-pink-500'}`}
          >
            <ChevronLeft size={32} />
          </button>
          
          <div className="flex gap-2 items-center">
            {slides.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-3 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-8 bg-pink-500' : 'w-3 bg-pink-200'}`} 
              />
            ))}
          </div>

          <button 
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className={`p-4 rounded-full bg-white/80 shadow-lg transition-all ${currentSlide === slides.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110 active:scale-95 text-pink-500'}`}
          >
            <ChevronRight size={32} />
          </button>
        </div>

        {/* Footer */}
        <footer className="fixed bottom-2 w-full text-center text-[10px] md:text-xs text-pink-400 font-medium tracking-wide">
          Made with unlimited affection for Smriti 💗 By your officially applying best friend
        </footer>
      </main>
    </div>
  );
};

export default App;
