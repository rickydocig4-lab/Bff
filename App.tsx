import React, { useState, useEffect } from 'react';
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

// --- Background ---
const BackgroundElements = () => {
  const [hearts, setHearts] = useState<any[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 15}s`,
      duration: `${10 + Math.random() * 15}s`,
      size: 16 + Math.random() * 24
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="heart-particle"
          style={{ 
            left: h.left, 
            animationDelay: h.delay, 
            animationDuration: h.duration 
          }}
        >
          <Heart className="text-pink-200 fill-pink-100" size={h.size} />
        </div>
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
    <div className="flex flex-col items-center text-center animate-fade-in">
      <div className="text-7xl mb-6 floating animate-pop-in">💌</div>
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
        <button
          onClick={handleAccept}
          className="bg-gradient-to-r from-pink-500 to-rose-400 text-white px-12 py-4 rounded-full text-xl font-bold shadow-xl blush-hover active-scale"
        >
          Accept This Cutie
        </button>
      ) : (
        <div className="flex flex-col items-center animate-slide-up">
          <div className="bg-white/90 text-pink-600 font-bold text-xl px-8 py-3 rounded-full border-2 border-pink-200 mb-4 flex items-center gap-2">
            <ShieldCheck className="text-pink-500" /> Application Approved!
          </div>
          <button onClick={onNext} className="text-pink-400 hover:text-pink-600 text-sm font-semibold underline underline-offset-4">
            Proceed to the Proof Section →
          </button>
        </div>
      )}
    </div>
  );
};

// --- Slide 2: Reasons ---
const ReasonsSlide = () => {
  const reasons = [
    { text: "We match energy like WiFi + Password 📶", emoji: "⚡" },
    { text: "We laugh at things that aren't even funny 😂", emoji: "🤡" },
    { text: "I'll defend you even if you're the villain 🛡️", emoji: "😈" },
    { text: "Unlimited access to my heart & memes 📱", emoji: "🎁" }
  ];
  return (
    <div className="w-full flex flex-col items-center animate-fade-in">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-8 font-romantic">Why We're Actually Iconic 💅</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
        {reasons.map((r, i) => (
          <div
            key={i}
            className="bg-white/80 p-5 rounded-2xl border border-blue-100 shadow-sm flex items-center gap-4 blush-hover group animate-slide-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <span className="text-3xl group-hover:scale-125 transition-transform">{r.emoji}</span>
            <span className="text-blue-700 font-medium">{r.text}</span>
          </div>
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
    const newHp = Math.max(0, hp - p);
    setHp(newHp);
    if (newHp <= 0) {
      setIsDead(true);
      confetti({ particleCount: 100, spread: 70, colors: ['#ff0000', '#ffffff'] });
    }
  };
  return (
    <div className="w-full flex flex-col items-center text-center animate-fade-in">
      <h2 className="text-3xl font-bold text-rose-500 mb-4 uppercase tracking-tighter">Mini-Game: Destroy the Bad Vibes 👾</h2>
      <div className="relative py-8 flex flex-col items-center w-full">
        {!isDead ? (
          <>
            <div className="text-8xl mb-6 select-none cursor-pointer floating">👾</div>
            <div className="w-full max-w-xs h-4 bg-gray-200 rounded-full overflow-hidden border-2 border-white shadow-inner mb-8">
              <div 
                className="h-full bg-red-500 transition-all duration-300" 
                style={{ width: `${hp}%` }}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full px-4">
              {attacks.map((a, i) => (
                <button 
                  key={i} 
                  onClick={() => hit(a.p)} 
                  className={`${a.c} text-white p-3 rounded-xl font-bold flex flex-col items-center text-[10px] shadow-md active-scale blush-hover`}
                >
                  {a.i} {a.n}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center animate-pop-in">
            <Trophy className="text-yellow-500 w-16 h-16 mb-4" />
            <h3 className="text-2xl font-bold text-green-500">TRAUMA OBLITERATED!</h3>
            <p className="text-green-600 mt-2 italic px-6 py-2 bg-green-50 rounded-full border border-green-200">Smriti is now officially in her Peace Era. ✨</p>
          </div >
        )}
      </div>
    </div>
  );
};

// --- Slide 4: Vault ---
const VaultSlide = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-center text-center animate-fade-in">
      <h2 className="text-3xl font-bold text-purple-600 mb-6 font-romantic">Your Memories Are My Treasure 💎</h2>
      <div className="bg-purple-50/80 p-6 rounded-[2rem] border border-purple-200 mb-8 italic text-purple-800 leading-relaxed shadow-sm">
        "Every shared secret and inside joke is stored in a special vault in my heart. 
        I keep them safe, cherished, and protected forever."
      </div>
      <div 
        onClick={() => { setOpen(!open); if(!open) confetti({ particleCount: 30, colors: ['#a855f7'] }); }}
        className="text-9xl cursor-pointer select-none floating transition-transform active-scale"
      >
        {open ? '💖' : '🎁'}
      </div>
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
    <div className="w-full flex flex-col items-center animate-fade-in">
      <div className="bg-[#fffdf0] border-2 border-yellow-200 p-8 rounded-xl shadow-lg w-full max-w-lg relative" style={{ transform: 'rotate(1deg)' }}>
        <h2 className="text-2xl font-bold text-yellow-800 border-b-2 border-yellow-100 pb-4 mb-6 text-center">
          Pinky Promise Contract 📜
        </h2>
        <div className="space-y-4 mb-8">
          {checks.map((c, i) => (
            <div key={i} className="flex items-center gap-3 text-yellow-900 font-medium text-sm animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <Check size={18} className="text-green-500 flex-shrink-0" /> {c}
            </div>
          ))}
        </div>
        <div className="flex justify-between items-end border-t border-yellow-100 pt-6">
          <div className="text-xs text-yellow-600 italic">Official Signature:</div>
          <button 
            onClick={() => { setSigned(true); confetti(); }}
            className={`px-6 py-2 rounded-lg font-bold transition-all active-scale ${signed ? 'bg-green-100 text-green-600 cursor-default' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'}`}
          >
            {signed ? "SIGNED! ✍️" : "Sign for Smriti"}
          </button>
        </div>
      </div>
      {signed && (
        <div className="mt-6 text-pink-500 font-bold flex items-center gap-2 animate-pop-in">
          <Heart fill="currentColor" size={20} /> STUCK WITH ME FOREVER! <Heart fill="currentColor" size={20} />
        </div>
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

  const CurrentSlideComponent = slides[slide].component;

  return (
    <div className="relative h-screen w-full bg-gradient-to-tr from-pink-100 via-white to-blue-100 flex items-center justify-center p-4 overflow-hidden">
      <BackgroundElements />
      
      <main className="relative z-10 w-full max-w-3xl">
        <div className="bg-white/75 backdrop-blur-2xl rounded-[3rem] p-8 md:p-12 shadow-2xl border border-white/50 min-h-[520px] flex items-center justify-center overflow-hidden">
          <CurrentSlideComponent onNext={handleNext} />
        </div>

        <div className="mt-8 flex items-center justify-center gap-6">
          <button 
            onClick={handlePrev}
            disabled={slide === 0}
            className={`p-3 rounded-full bg-white/80 shadow-md transition-all active-scale ${slide === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:scale-110 text-pink-500'}`}
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
            className={`p-3 rounded-full bg-white/80 shadow-md transition-all active-scale ${slide === slides.length - 1 ? 'opacity-20 cursor-not-allowed' : 'hover:scale-110 text-pink-500'}`}
          >
            <ChevronRight size={28} />
          </button>
        </div>
      </main>

      <footer className="absolute bottom-4 w-full text-center text-[10px] text-pink-300 font-bold tracking-widest uppercase">
        Handcrafted for Smriti with 💖 • Always Iconic
      </footer>
    </div>
  );
};

export default App;