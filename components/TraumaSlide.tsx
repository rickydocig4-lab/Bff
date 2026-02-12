
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sword, Zap, Pizza, Heart, Skull } from 'lucide-react';
import confetti from 'canvas-confetti';

const TraumaSlide: React.FC = () => {
  const [health, setHealth] = useState(100);
  const [isHitting, setIsHitting] = useState(false);
  const [isDead, setIsDead] = useState(false);

  const attacks = [
    { name: "Aggressive Hype-Man Energy", icon: <Zap />, power: 25, color: "bg-yellow-400" },
    { name: "500+ Unread Reels", icon: <Zap />, power: 20, color: "bg-purple-400" },
    { name: "Unsolicited Hot Pizza", icon: <Pizza />, power: 40, color: "bg-orange-500" },
  ];

  const handleAttack = (power: number) => {
    if (isDead) return;
    setIsHitting(true);
    setHealth(prev => Math.max(0, prev - power));
    
    // Play hit sound effect placeholder or vibration
    if (navigator.vibrate) navigator.vibrate(50);

    setTimeout(() => setIsHitting(false), 200);
  };

  useEffect(() => {
    if (health <= 0 && !isDead) {
      setIsDead(true);
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ef4444', '#f87171', '#ffffff']
      });
    }
  }, [health, isDead]);

  return (
    <div className="flex flex-col items-center text-center max-w-2xl w-full">
      <motion.h2 
        className="text-3xl md:text-4xl font-bold text-red-500 mb-6 uppercase tracking-tighter"
      >
        Boss Battle: Smriti's Old Trauma 👾
      </motion.h2>

      <div className="relative w-full flex flex-col items-center py-10">
        {/* Monster Area */}
        <AnimatePresence>
          {!isDead ? (
            <motion.div
              key="monster"
              animate={isHitting ? { 
                scale: [1, 1.2, 1], 
                rotate: [0, -10, 10, 0],
                filter: ["grayscale(0%)", "sepia(100%) brightness(1.2)", "grayscale(0%)"]
              } : { 
                y: [0, -15, 0],
                rotate: [2, -2, 2]
              }}
              transition={{ repeat: isHitting ? 0 : Infinity, duration: 2 }}
              className="text-9xl mb-8 relative select-none"
            >
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs px-2 py-1 rounded font-bold uppercase">
                Smriti's Past BS
              </div>
              👾
            </motion.div>
          ) : (
            <motion.div
              key="victory"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center gap-4 py-8"
            >
              <div className="text-8xl">👑💅</div>
              <div className="text-3xl font-black text-green-500">TRAUMA IS OBLITERATED!</div>
              <p className="text-lg text-green-600 font-medium bg-green-50 px-6 py-2 rounded-full border border-green-200">
                Smriti is officially in her Main Character Era. No bad vibes allowed!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Health Bar */}
        {!isDead && (
          <div className="w-full max-w-sm mb-12">
            <div className="flex justify-between mb-2 px-1">
              <span className="font-bold text-red-600 flex items-center gap-1">
                <Skull size={14} /> HP: {health}%
              </span>
              <span className="text-red-400 text-xs italic">Boss is weakening...</span>
            </div>
            <div className="h-4 w-full bg-red-100 rounded-full border-2 border-red-200 overflow-hidden shadow-inner">
              <motion.div 
                initial={{ width: "100%" }}
                animate={{ width: `${health}%` }}
                className="h-full bg-gradient-to-r from-red-400 to-red-600"
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {!isDead && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full px-4">
            {attacks.map((atk, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAttack(atk.power)}
                className={`${atk.color} text-white p-4 rounded-2xl shadow-lg flex flex-col items-center gap-2 font-bold transition-all border-b-4 border-black/20`}
              >
                <div className="text-2xl">{atk.icon}</div>
                <div className="text-xs uppercase leading-tight">{atk.name}</div>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 text-pink-400 text-sm font-medium italic">
        "One click = one trauma deleted forever. Destroy it, Smriti!"
      </div>
    </div>
  );
};

export default TraumaSlide;
