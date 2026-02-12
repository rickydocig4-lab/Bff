
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const BackgroundHearts: React.FC = () => {
  const hearts = Array.from({ length: 20 });

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0,
            y: "110vh",
            x: `${Math.random() * 100}vw`,
            scale: 0.5 + Math.random() 
          }}
          animate={{ 
            opacity: [0, 0.5, 0],
            y: "-10vh" 
          }}
          transition={{ 
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear"
          }}
          className="absolute"
        >
          <Heart 
            className="text-pink-200 fill-pink-100" 
            size={12 + Math.random() * 24} 
          />
        </motion.div>
      ))}
      <div className="absolute inset-0 bg-white/10 opacity-30 pointer-events-none">
        {/* Subtle sparkle grid could go here */}
      </div>
    </div>
  );
};

export default BackgroundHearts;
