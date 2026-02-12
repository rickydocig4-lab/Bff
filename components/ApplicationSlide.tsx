
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const ApplicationSlide: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#dda0dd', '#add8e6']
    });
  };

  return (
    <div className="flex flex-col items-center text-center max-w-xl">
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="text-6xl mb-6"
      >
        💌
      </motion.div>
      <h1 className="text-3xl md:text-4xl font-bold text-pink-600 mb-6 leading-tight">
        Official Application to Become Smriti’s Best Friend 💖
      </h1>
      
      <div className="bg-pink-50/50 p-6 rounded-3xl border-2 border-dashed border-pink-200 mb-8 text-lg text-pink-700 font-medium">
        <p className="mb-4 italic">“Dear Miss Smriti,”</p>
        <p>
          I would like to formally apply for the position of your best friend . 
          I promise to share memes, secrets, snacks, and emotional support 24/7 🫶
        </p>
      </div>

      {!accepted ? (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleAccept}
          className="bg-pink-500 text-white px-10 py-4 rounded-full text-xl font-bold shadow-lg shadow-pink-200 blush-hover transition-all"
        >
          Accept This Cutie
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center"
        >
          <div className="text-pink-600 font-bold text-2xl mb-4 bg-white/80 px-6 py-3 rounded-full border border-pink-200">
            Application Under Permanent Approval 💖
          </div>
          <button 
            onClick={onNext}
            className="text-pink-400 hover:text-pink-600 text-sm font-semibold underline underline-offset-4"
          >
            Let's see why we're so great!
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default ApplicationSlide;
