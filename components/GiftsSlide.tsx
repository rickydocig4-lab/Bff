
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Sparkles, Box } from 'lucide-react';

const GiftsSlide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center text-center max-w-2xl">
      <motion.h2 
        className="text-3xl md:text-4xl font-bold text-purple-600 mb-8"
      >
        Your Gifts Are in the Safest Hands Ever 🤍
      </motion.h2>

      <div className="bg-purple-50 p-8 rounded-[2rem] border border-purple-200 shadow-inner mb-10 relative">
        <p className="text-lg text-purple-700 leading-relaxed mb-6">
          “Every gift you’ve ever given me is not just a thing — it’s a memory wrapped in love. 
          I keep them safe, clean, and protected like precious treasure. 
          They are handled with care, respect, and a little extra smile every time I look at them.”
        </p>
        <div className="text-purple-500 font-bold tracking-widest text-sm uppercase">
          Stored with Love. Protected with Loyalty.
        </div>
      </div>

      <div className="relative cursor-pointer group" onClick={() => setIsOpen(!isOpen)}>
        <motion.div
          animate={isOpen ? { scale: 1.1, rotate: [0, -5, 5, 0] } : {}}
          className="text-8xl p-4 transition-all duration-500"
        >
          {isOpen ? '💝' : '🎁'}
        </motion.div>
        
        {isOpen && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 0, x: 0 }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  y: -100 - Math.random() * 50, 
                  x: (Math.random() - 0.5) * 150 
                }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                className="absolute top-10 left-10 text-2xl"
              >
                ❤️
              </motion.div>
            ))}
          </>
        )}
        
        <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 rounded-full transition-opacity" />
      </div>
      
      <p className="mt-4 text-purple-400 text-sm font-medium">Click the gift box to see what's inside my heart!</p>
    </div>
  );
};

export default GiftsSlide;
