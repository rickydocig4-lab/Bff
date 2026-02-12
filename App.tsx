import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Check, 
  Zap, 
  Pizza, 
  ShieldCheck,
  Star,
  Trophy
} from 'lucide-react';
import confetti from 'canvas-confetti';

// --- Background Components ---
const BackgroundElements = () => {
  const hearts = Array.from({ length: 15 });
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
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
            opacity: [0, 0.4, 0],
            y: "-10vh" 
          }}
          transition={{ 
            duration: 10 + Math.random() * 15,
            repeat: Infinity,
            delay: Math.random() * 20,
            ease: "linear"
          }}
          className="absolute"
        >
          <Heart className="text-pink-200 fill-pink-100" size={16 + Math.random() * 32} />
        </motion.div>
      ))}
      <div className="absolute top-1/4 left-10 sparkle text-pink-300 opacity-20"><Sparkles size={48} /></div>
      <div className="absolute bottom-1/4 right-10 sparkle text-blue-300 opacity-20" style={{ animationDelay: '1s' }}><Sparkles size={48} /></div>
    </div>
  );
};

// --- Slide 1: Application ---
const ApplicationSlide = ({ onNext }: { onNext: () => void }) => {
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
    <div className="flex flex-col items-center text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-7xl mb-6 floating">💌</motion.div>
      <h1 className="text-3xl md:text-5xl font-bold text-pink-600 mb-6 font-romantic tracking-wide">
        Official Request for Smriti’s Forever Friendship 💖
      </h1>
      <div className="bg-pink-50/60 p-6 rounded-3xl border-2 border-dashed border-pink-200 mb-8 text-lg text-pink-700 italic shadow-inner">
        <p className="mb-4 font-bold">“Dear Smriti,”</p>
        <p className="leading-relaxed">
          I am hereby applying for the lifetime position of your Chief Gossip Officer, 
          Professional Hype-Person, and Emergency Snacking Partner. 🫶
        </p>
      </div>
      {!accepted ? (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleAccept}
          className="bg-gradient-to-r from-pink-500 to-rose-400 text-white px-12 py-4 rounded-full text-xl font-bold shadow-xl blush-hover"
        >
          Accept This Cutie
        </motion.button>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center">
          <div className="bg-white/90 text-pink-600 font-bold text-xl px-8 py-3 rounded-full border-2 border-pink-200 mb-4 flex items-center gap-2">
            <ShieldCheck className="text-pink-500" /> Application Approved!
          </div>
          <button onClick={onNext} className="text-pink-400 hover:text-pink-600 text-sm font-semibold underline underline-offset-4">
            Proceed to the Proof Section →
          </button>
        </motion.div>
      )}
    </div>
  );
};

// --- Slide 2: Reasons ---
const ReasonsSlide = () => {
  const reasons = [
    { text: "We match energy like WiFi + Password 📶", emoji: "⚡" },
    { text: "We laugh at the dumbest inside jokes 😂", emoji: "🤡" },
    { text: "I'll defend you even if you're the villain 🛡️", emoji: "😈" },
    { text: "Unlimited access to my heart & memes 📱", emoji: "🎁" }
  ];
  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-8 font-romantic">Why We're Actually Iconic 💅</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
        {reasons.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/80 p-5 rounded-2xl border border-blue-100 shadow-sm flex items-center gap-4 blush-hover group"
          >
            <span className="text-3xl group-hover:scale-125 transition-transform">{r.emoji}</span>
            <span className="text-blue-700 font-medium">{r.text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- Slide 3: Trauma Eraser ---
const TraumaSlide = () => {
  const [hp, setHp] = useState(100);
  const [isDead, setIsDead] = useState(false);
  const attacks = [
    { n: "Aggressive Hype", p: 25, c: "bg-yellow-400", i: <Zap /> },
    { n: "Endless Reels", p: 15, c: "bg-purple-400", i: <Star /> },
    { n: "Hot Pizza Delivery", p: 40, c: "bg-orange-400", i: <Pizza /> }
  ];
  const hit = (p: number) => {
    if (isDead) return;
    setHp(h => Math.max(0, h - p));
    if (hp - p <= 0) {
      setIsDead(true);
      confetti({ particleCount: 100, spread: 70, colors: ['#ff0000', '#ffffff'] });
    }
  };
  return (
    <div className="w-full flex flex-col items-center text-center">
      <h2 className="text-3xl font-bold text-rose-500 mb-4 uppercase tracking-tighter">Mini-Game: Destroy the Bad Vibes 👾</h2>
      <div className="relative py-8 flex flex-col items-center w-full">
        {!isDead ? (
          <>
            <motion.div animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-8xl mb-6 select-none cursor-pointer">👾</motion.div>
            <div className="w-full max-w-xs h-4 bg-gray-200 rounded-full overflow-hidden border-2 border-white shadow-inner mb-8">
              <motion.div animate={{ width: `${hp}%` }} className="h-full bg-red-500 transition-all" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
              {attacks.map((a, i) => (
                <button key={i} onClick={() => hit(a.p)} className={`${a.c} text-white p-3 rounded-xl font-bold flex flex-col items-center text-xs shadow-md active:scale-95 transition-transform hover:scale-105`}>
                  {a.i} {a.n}
                </button>
              ))}
            </div>
          </>
        ) : (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center">
            <Trophy className="text-yellow-500 w-16 h-16 mb-4" />
            <h3 className="text-2xl font-bold text-green-500">TRAUMA OBLITERATED!</h3>
            <p className="text-green-600 mt-2">Smriti is now officially in her Peace Era. ✨</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// --- Slide 4: Treasure Vault ---
const VaultSlide = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="text-3xl font-bold text-purple-600 mb-6 font-romantic">Your Memories Are My Treasure 💎</h2>
      <div className="bg-purple-50/80 p-6 rounded-[2rem] border border-purple-200 mb-8 italic text-purple-800 leading-relaxed shadow-sm">
        "Every shared secret and inside joke is stored in a special vault in my heart. 
        I keep them safe, cherished, and protected forever."
      </div>
      <motion.div 
        onClick={() => { setOpen(!open); if(!open) confetti({ particleCount: 30, colors: ['#a855f7'] }); }}
        animate={open ? { scale: [1, 1.1, 1] } : {}}
        className="text-9xl cursor-pointer select-none floating"
      >
        {open ? '💖' : '🎁'}
      </motion.div>
      <p className="mt-4 text-purple-400 text-sm font-medium">{open ? "You are the center of it!" : "Click to open the vault"}</p>
    </div>
  );
};

// --- Slide 5: Contract ---
const ContractSlide = () => {
  const [signed, setSigned] = useState(false);
  const checks = [
    "Answer your 3 AM crises (even if I'm half-asleep)",
    "Send the most specific memes for your mood",
    "Defend your honor even against a scary bug 🐜",
    "Be your Bestie Forever (Non-Negotiable)"
  ];
  return (
    <div className="w-full flex flex-col items-center">
      <div className="bg-[#fffdf0] border-2 border-yellow-200 p-8 rounded-xl shadow-lg w-full max-w-lg relative rotate-1">
        <h2 className="text-2xl font-bold text-yellow-800 border-b-2 border-yellow-100 pb-4 mb-6 text-center">
          Pinky Promise Contract 📜
        </h2>
        <div className="space-y-4 mb-8">
          {checks.map((c, i) => (
            <div key={i} className="flex items-center gap-3 text-yellow-900 font-medium text-sm">
              <Check size={18} className="text-green-500 flex-shrink-0" /> {c}
            </div>
          ))}
        </div>
        <div className="flex justify-between items-end border-t border-yellow-100 pt-6">
          <div className="text-xs text-yellow-600 italic">Official Signature:</div>
          <button 
            onClick={() => { setSigned(true); confetti(); }}
            className={`px-6 py-2 rounded-lg font-bold transition-all ${signed ? 'bg-green-100 text-green-600 cursor-default' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'}`}
          >
            {signed ? "SIGNED! ✍️" : "Sign for Smriti"}
          </button>
        </div>
      </div>
      {signed && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 text-pink-500 font-bold flex items-center gap-2">
          <Heart fill="currentColor" size={20} /> STUCK WITH ME FOREVER! <Heart fill="currentColor" size={20} />
        </motion.div>
      )}
    </div>
  );
};

// --- Main App ---
const App: React.FC = () => {
  const [slide, setSlide] = useState(0);
  const slides = [
    { component: ApplicationSlide },
    { component: ReasonsSlide },
    { component: TraumaSlide },
    { component: VaultSlide },
    { component: ContractSlide }
  ];

  const handleNext = () => setSlide(s => Math.min(slides.length - 1, s + 1));
  const handlePrev = () => setSlide(s => Math.max(0, s - 1));

  return (
    <div className="relative h-screen w-full bg-gradient-to-tr from-pink-100 via-white to-blue-100 flex items-center justify-center p-4 overflow-hidden">
      <BackgroundElements />
      
      <main className="relative z-10 w-full max-w-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 1.05, x: -20 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="bg-white/75 backdrop-blur-2xl rounded-[3rem] p-8 md:p-12 shadow-2xl border border-white/50 min-h-[520px] flex items-center justify-center"
          >
            {React.createElement(slides[slide].component, { onNext: handleNext })}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-center gap-6">
          <button 
            onClick={handlePrev}
            disabled={slide === 0}
            className={`p-3 rounded-full bg-white/80 shadow-md transition-all ${slide === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:scale-110 text-pink-500'}`}
          >
            <ChevronLeft size={28} />
          </button>

          <div className="flex gap-2">
            {slides.map((_, i) => (
              <div 
                key={i} 
                className={`h-2 rounded-full transition-all duration-500 ${i === slide ? 'w-8 bg-pink-500' : 'w-2 bg-pink-200'}`} 
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            disabled={slide === slides.length - 1}
            className={`p-3 rounded-full bg-white/80 shadow-md transition-all ${slide === slides.length - 1 ? 'opacity-20 cursor-not-allowed' : 'hover:scale-110 text-pink-500'}`}
          >
            <ChevronRight size={28} />
          </button>
        </div>
      </main>

      <footer className="absolute bottom-4 w-full text-center text-[10px] text-pink-300 font-bold tracking-widest uppercase">
        Handcrafted for Smriti with 💖 
      </footer>
    </div>
  );
};

export default App;