
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Trophy, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

const questions = [
  {
    q: "What makes me happiest?",
    options: ["Pizza 🍕", "Talking to you 📱", "Sleep 😴", "A Billion Dollars 💰"],
    correct: 1 // Talking to you
  },
  {
    q: "What's my favorite thing about you?",
    options: ["Your laugh 😂", "Your kindness 😇", "Your sarcasm 💅", "Everything! 💖"],
    correct: 3 // Everything!
  },
  {
    q: "Who laughs louder?",
    options: ["Me 🙋‍♂️", "You 🙋‍♀️", "Neighbors complain both ways 🏠", "We laugh silently 🤫"],
    correct: 2 // Neighbors complain
  }
];

const GameSlide: React.FC = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleAnswer = (idx: number) => {
    const isCorrect = idx === questions[currentQ].correct;
    if (isCorrect) {
      setScore(s => s + 1);
      setFeedback("BESTIE ENERGY 100% 💕✨");
    } else {
      setFeedback("Still Best Friends Forever 😌💖");
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentQ < questions.length - 1) {
        setCurrentQ(prev => prev + 1);
      } else {
        setShowResult(true);
        if (score >= 1) {
          confetti({
            particleCount: 200,
            spread: 90,
            origin: { y: 0.7 }
          });
        }
      }
    }, 1500);
  };

  const restart = () => {
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="flex flex-col items-center text-center max-w-md py-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-yellow-100 p-6 rounded-full mb-6"
        >
          <Trophy size={64} className="text-yellow-500" />
        </motion.div>
        <h2 className="text-4xl font-bold text-pink-600 mb-4">You're Perfect! 🏆</h2>
        <div className="text-2xl font-bold text-pink-400 mb-8">
          Your Score: {score}/{questions.length} Bestie Points
        </div>
        <p className="text-xl text-pink-700 font-semibold mb-10 leading-relaxed">
          “Congratulations Smriti, You’re Stuck With Me Forever 💞”
        </p>
        <button 
          onClick={restart}
          className="flex items-center gap-2 bg-pink-100 text-pink-600 px-6 py-3 rounded-full hover:bg-pink-200 transition-colors"
        >
          <RefreshCw size={20} /> Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-xl">
      <h2 className="text-3xl font-bold text-pink-500 mb-8 flex items-center gap-3">
        <Star className="fill-pink-500" />
        How Well Do You Know Your Future Bestie?
        <Star className="fill-pink-500" />
      </h2>

      {/* Progress bar */}
      <div className="w-full bg-pink-100 h-6 rounded-full mb-10 overflow-hidden border border-pink-200 relative">
        <motion.div 
          className="h-full bg-pink-500 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
        />
        <div className="absolute inset-0 flex justify-center items-center text-[10px] font-bold text-pink-600">
          Question {currentQ + 1} of {questions.length}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!feedback ? (
          <motion.div 
            key={currentQ}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full space-y-4"
          >
            <h3 className="text-2xl font-semibold text-pink-700 mb-6 text-center">
              {questions[currentQ].q}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questions[currentQ].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="bg-white border-2 border-pink-100 hover:border-pink-300 p-4 rounded-2xl text-lg font-medium text-pink-600 transition-all hover:scale-105 active:scale-95 shadow-sm blush-hover"
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="feedback"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center h-48"
          >
            <div className="text-4xl font-black text-pink-600 animate-bounce">
              {feedback}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameSlide;
