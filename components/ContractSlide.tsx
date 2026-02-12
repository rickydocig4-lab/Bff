
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const promises = [
  "I promise to always reply to your texts (unless I’m asleep 😴)",
  "I promise to send random reels that remind me of you",
  "I promise to defend you even if you’re wrong (privately I’ll correct you 😂)",
  "I promise to stay even on your worst days"
];

const ContractSlide: React.FC = () => {
  const [checked, setChecked] = useState<number[]>([]);

  const toggle = (i: number) => {
    if (checked.includes(i)) {
      setChecked(checked.filter(item => item !== i));
    } else {
      setChecked([...checked, i]);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl">
      <motion.div 
        initial={{ rotate: -2 }}
        className="bg-[#fffdf0] border-2 border-yellow-200 p-8 md:p-12 shadow-xl rounded-lg w-full relative"
      >
        {/* Paper texture overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/lined-paper.png')]" />
        
        <h2 className="text-3xl font-bold text-yellow-800 mb-8 border-b-2 border-yellow-200 pb-4 text-center">
          Best Friend Contract (Non-Cancellable) 📜
        </h2>

        <div className="space-y-6">
          {promises.map((promise, i) => (
            <div 
              key={i} 
              onClick={() => toggle(i)}
              className="flex items-start gap-4 cursor-pointer group"
            >
              <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${checked.includes(i) ? 'bg-green-400 border-green-400' : 'border-yellow-300'}`}>
                {checked.includes(i) && <Check size={16} className="text-white" />}
              </div>
              <p className={`text-lg font-medium transition-all ${checked.includes(i) ? 'text-green-600 line-through opacity-70' : 'text-yellow-900 group-hover:translate-x-1'}`}>
                {promise}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t-2 border-yellow-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm italic text-yellow-700">Signed with pinky promise: 🤙</div>
          <div className="font-bold text-xl text-yellow-800 border-b border-yellow-800 px-4">The Bestie Candidate</div>
          <div className="font-bold text-xl text-yellow-800 border-b border-yellow-800 px-4">Smriti</div>
        </div>
      </motion.div>
      <p className="mt-6 text-yellow-700 text-sm font-semibold animate-pulse">✓ This document is legally binding in Bestie Court.</p>
    </div>
  );
};

export default ContractSlide;
