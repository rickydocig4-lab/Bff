
import React from 'react';
import { motion } from 'framer-motion';

const reasons = [
  { text: "We match energy like WiFi + Password 📶", emoji: "⚡" },
  { text: "We laugh at the dumbest jokes", emoji: "😂" },
  { text: "We can roast each other but still protect each other", emoji: "🛡️" },
  { text: "I’ll always hype you up like your personal PR manager 💅", emoji: "📣" }
];

const ReasonsSlide: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <motion.h2 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-3xl md:text-4xl font-bold text-blue-500 mb-10"
      >
        Reasons We Are a Legendary Duo 😎✨
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        {reasons.map((reason, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9, x: idx % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: idx * 0.15 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white/90 p-6 rounded-2xl border border-blue-100 shadow-md blush-hover flex items-center gap-4 group"
          >
            <span className="text-3xl floating group-hover:animate-bounce">{reason.emoji}</span>
            <span className="text-blue-700 font-semibold leading-relaxed">{reason.text}</span>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-12 flex items-center gap-2 text-blue-400 text-sm italic">
        <span className="animate-pulse">✨</span> 
        Just a few of the million reasons 
        <span className="animate-pulse">✨</span>
      </div>
    </div>
  );
};

export default ReasonsSlide;
