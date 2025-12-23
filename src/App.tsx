import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Moon, Sun, Trash2, Play, Briefcase, ShoppingBag, Lock, Unlock } from 'lucide-react';

const HamiboomApp = () => {
  const [hunger, setHunger] = useState(100);
  const [cleanliness, setCleanliness] = useState(100);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [coins, setCoins] = useState(0);
  const [mood, setMood] = useState('happy');
  const [message, setMessage] = useState('');
  const [showHearts, setShowHearts] = useState(false);
  const [lastFed, setLastFed] = useState(Date.now());
  const [lastPet, setLastPet] = useState(0);
  const [lastGamePlayed, setLastGamePlayed] = useState(0);
  const [poopVisible, setPoopVisible] = useState(false);
  const [sleeping, setSleeping] = useState(false);
  const [working, setWorking] = useState(false);
  const [workEndTime, setWorkEndTime] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [showCostumeMenu, setShowCostumeMenu] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [fallingSeeds, setFallingSeeds] = useState<Array<{ id: number; left: number }>>([]);
  const [gameTime, setGameTime] = useState(30);
  const [isEating, setIsEating] = useState(false);
  const [currentCostume, setCurrentCostume] = useState('default');
  const [ownedCostumes, setOwnedCostumes] = useState(['default']);

  const costumes = [
    { id: 'default', name: 'Standard', unlockLevel: 1, price: 0, type: 'level', color: '#FFA857', bodyColor: '#FFFEF7' },
    { id: 'santa', name: '🎅 Weihnachtsmann', unlockLevel: 2, price: 0, type: 'level', color: '#FF0000', bodyColor: '#FFFFFF', hat: 'santa' },
    { id: 'elf', name: '🧝 Elf', unlockLevel: 3, price: 0, type: 'level', color: '#00AA00', bodyColor: '#FFE5CC', hat: 'elf' },
    { id: 'knight', name: '⚔️ Ritter', unlockLevel: 4, price: 0, type: 'level', color: '#666666', bodyColor: '#C0C0C0', armor: true },
    { id: 'pirate', name: '🏴‍☠️ Pirat', unlockLevel: 5, price: 0, type: 'level', color: '#8B4513', bodyColor: '#FFDAB9', hat: 'pirate' },
    { id: 'ninja', name: '🥷 Ninja', unlockLevel: 6, price: 0, type: 'level', color: '#000000', bodyColor: '#1a1a1a', mask: true },
    { id: 'wizard', name: '🧙 Zauberer', unlockLevel: 7, price: 0, type: 'level', color: '#4B0082', bodyColor: '#E6E6FA', hat: 'wizard' },
    { id: 'angel', name: '👼 Engel', unlockLevel: 8, price: 0, type: 'level', color: '#FFD700', bodyColor: '#FFFFFF', wings: true },
    { id: 'devil', name: '😈 Teufel', unlockLevel: 9, price: 0, type: 'level', color: '#8B0000', bodyColor: '#FF6347', horns: true },
    { id: 'superhero', name: '🦸 Superheld', unlockLevel: 10, price: 0, type: 'level', color: '#0000FF', bodyColor: '#87CEEB', cape: true },
    { id: 'pink', name: '💗 Rosa', unlockLevel: 0, price: 50, type: 'shop', color: '#FF69B4', bodyColor: '#FFB6C1' },
    { id: 'blue', name: '💙 Blau', unlockLevel: 0, price: 50, type: 'shop', color: '#1E90FF', bodyColor: '#87CEEB' },
    { id: 'purple', name: '💜 Lila', unlockLevel: 0, price: 50, type: 'shop', color: '#9370DB', bodyColor: '#DDA0DD' },
    { id: 'green', name: '💚 Grün', unlockLevel: 0, price: 50, type: 'shop', color: '#32CD32', bodyColor: '#98FB98' },
    { id: 'yellow', name: '💛 Gelb', unlockLevel: 0, price: 50, type: 'shop', color: '#FFD700', bodyColor: '#FFFFE0' },
    { id: 'black', name: '🖤 Schwarz', unlockLevel: 0, price: 50, type: 'shop', color: '#2F4F4F', bodyColor: '#696969' },
    { id: 'white', name: '🤍 Weiß', unlockLevel: 0, price: 50, type: 'shop', color: '#F5F5F5', bodyColor: '#FFFFFF' },
    { id: 'rainbow', name: '🌈 Regenbogen', unlockLevel: 0, price: 50, type: 'shop', color: '#FF1493', bodyColor: '#FFB6C1', rainbow: true },
    { id: 'golden', name: '⭐ Golden', unlockLevel: 0, price: 50, type: 'shop', color: '#FFD700', bodyColor: '#FFF8DC', sparkle: true },
    { id: 'zombie', name: '🧟 Zombie', unlockLevel: 0, price: 50, type: 'shop', color: '#556B2F', bodyColor: '#9ACD32' },
    { id: 'vampire', name: '🧛 Vampir', unlockLevel: 0, price: 50, type: 'shop', color: '#8B0000', bodyColor: '#F5F5F5', cape: true, fangs: true },
    { id: 'robot', name: '🤖 Roboter', unlockLevel: 0, price: 50, type: 'shop', color: '#708090', bodyColor: '#C0C0C0', robot: true },
    { id: 'astronaut', name: '👨‍🚀 Astronaut', unlockLevel: 0, price: 50, type: 'shop', color: '#FFFFFF', bodyColor: '#E0E0E0', helmet: true },
    { id: 'chef', name: '👨‍🍳 Koch', unlockLevel: 0, price: 50, type: 'shop', color: '#FFFFFF', bodyColor: '#FFFEF7', hat: 'chef' },
    { id: 'doctor', name: '👨‍⚕️ Arzt', unlockLevel: 0, price: 50, type: 'shop', color: '#FFFFFF', bodyColor: '#F0F8FF' },
    { id: 'artist', name: '🎨 Künstler', unlockLevel: 0, price: 50, type: 'shop', color: '#FF6347', bodyColor: '#FFE4B5', beret: true },
    { id: 'cowboy', name: '🤠 Cowboy', unlockLevel: 0, price: 50, type: 'shop', color: '#8B4513', bodyColor: '#DEB887', hat: 'cowboy' },
    { id: 'detective', name: '🕵️ Detektiv', unlockLevel: 0, price: 50, type: 'shop', color: '#2F4F4F', bodyColor: '#708090', hat: 'detective' },
    { id: 'bee', name: '🐝 Biene', unlockLevel: 0, price: 50, type: 'shop', color: '#FFD700', bodyColor: '#000000', stripes: true, wings: true },
    { id: 'panda', name: '🐼 Panda', unlockLevel: 0, price: 50, type: 'shop', color: '#000000', bodyColor: '#FFFFFF', panda: true },
  ];

  const foods = [
    { name: '🌻 Sonnenblumenkerne', hunger: 20, message: 'Nom nom! Klassiker!' },
    { name: '🥗 Salat', hunger: 15, message: 'Gesund... aber langweilig!' },
    { name: '🍕 Pizza', hunger: 30, message: 'Junk Food! Ich liebe es!' },
    { name: '🍝 Nudeln', hunger: 25, message: 'Thomsi macht sie am besten!' }
  ];

  const greetings = [
    'Na, wieder da? 😏',
    'Hast du Essen mitgebracht? 🤔',
    'Ich hab dich vermisst! 💕',
    'Arbeiten? Nein danke! 😎',
    'Zeit für Verwöhnung! ✨',
    'Eure Armut kotzt mich an! 😂'
  ];

  useEffect(() => {
    const saved = localStorage.getItem('hamiboom');
    if (saved) {
      const data = JSON.parse(saved);
      setHunger(data.hunger || 100);
      setCleanliness(data.cleanliness || 100);
      setXp(data.xp || 0);
      setLevel(data.level || 1);
      setCoins(data.coins || 0);
      setLastFed(data.lastFed || Date.now());
      setLastPet(data.lastPet || 0);
      setLastGamePlayed(data.lastGamePlayed || 0);
      setWorkEndTime(data.workEndTime || 0);
      setCurrentCostume(data.currentCostume || 'default');
      setOwnedCostumes(data.ownedCostumes || ['default']);

      if (data.workEndTime && data.workEndTime > Date.now()) {
        setWorking(true);
      }
    }

    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    setMessage(randomGreeting);
    setTimeout(() => setMessage(''), 3000);
  }, []);

  useEffect(() => {
    const data = { hunger, cleanliness, xp, level, coins, lastFed, lastPet, lastGamePlayed, workEndTime, currentCostume, ownedCostumes };
    localStorage.setItem('hamiboom', JSON.stringify(data));
  }, [hunger, cleanliness, xp, level, coins, lastFed, lastPet, lastGamePlayed, workEndTime, currentCostume, ownedCostumes]);

  useEffect(() => {
    const checkSleep = () => {
      const hour = new Date().getHours();
      setSleeping(hour >= 22 || hour < 7);
    };
    checkSleep();
    const interval = setInterval(checkSleep, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (working && workEndTime > 0) {
      const checkWork = setInterval(() => {
        if (Date.now() >= workEndTime) {
          setWorking(false);
          setCoins(prev => prev + 50);
          setXp(prev => prev + 50);
          setMessage('Ich bin zurück! 50 Münzen verdient! 💰');
          setTimeout(() => setMessage(''), 3000);
        }
      }, 1000);
      return () => clearInterval(checkWork);
    }
  }, [working, workEndTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!working) {
        setHunger(prev => Math.max(0, prev - 0.5));

        if (Math.random() < 0.1 && !poopVisible) {
          setPoopVisible(true);
          setCleanliness(prev => Math.max(0, prev - 20));
        }
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [poopVisible, working]);

  useEffect(() => {
    if (hunger < 30) setMood('angry');
    else if (hunger > 70 && cleanliness > 70) setMood('happy');
    else setMood('neutral');
  }, [hunger, cleanliness]);

  useEffect(() => {
    const newLevel = Math.floor(xp / 100) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      const unlockedCostume = costumes.find(c => c.unlockLevel === newLevel && c.type === 'level');
      if (unlockedCostume && !ownedCostumes.includes(unlockedCostume.id)) {
        setOwnedCostumes(prev => [...prev, unlockedCostume.id]);
        setMessage(`🎉 Level ${newLevel}! ${unlockedCostume.name} freigeschaltet!`);
      } else {
        setMessage(`🎉 Level ${newLevel}!`);
      }
      setTimeout(() => setMessage(''), 3000);
    }
  }, [xp, level]);

  const feedHamiboom = (food: typeof foods[0]) => {
    if (sleeping) {
      setMessage('ZZZ... Lass mich schlafen! 😴');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    if (working) {
      setMessage('Ich bin arbeiten! 💼');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    if (hunger >= 90) {
      setMessage('Ich bin nicht hungrig! Mäste mich nicht! 😠');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    const oldHunger = hunger;
    const newHunger = Math.min(100, hunger + food.hunger);
    const hungerGained = newHunger - oldHunger;
    const xpGained = Math.floor(hungerGained / 10) * 2;

    setHunger(newHunger);
    setXp(prev => prev + xpGained);
    setLastFed(Date.now());
    setMessage(food.message);
    setMood('eating');
    setIsEating(true);

    setTimeout(() => {
      setIsEating(false);
      setMood('happy');
      setMessage('');
    }, 2000);
    setShowMenu(false);
  };

  const petHamiboom = () => {
    if (sleeping) {
      setMessage('Hey! Ich schlafe! 😠');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    if (working) {
      setMessage('Ich bin arbeiten! 💼');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    const oneHour = 60 * 60 * 1000;
    if (Date.now() - lastPet < oneHour) {
      setMessage('Fass mich nicht an! Zu viel Streicheln! 😤');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    setShowHearts(true);
    setXp(prev => prev + 20);
    setLastPet(Date.now());
    setMood('loved');
    setMessage('Das fühlt sich gut an! 💕');
    setTimeout(() => {
      setShowHearts(false);
      setMood('happy');
      setMessage('');
    }, 2000);
  };

  const cleanCage = () => {
    if (poopVisible) {
      const oldCleanliness = cleanliness;
      setCleanliness(100);
      const cleanlinessGained = 100 - oldCleanliness;
      const xpGained = Math.floor(cleanlinessGained / 10) * 2;

      setPoopVisible(false);
      setXp(prev => prev + xpGained);
      setMessage('Endlich sauber! Danke! ✨');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  const sendToWork = () => {
    if (working) {
      const timeLeft = Math.ceil((workEndTime - Date.now()) / 60000);
      setMessage(`Ich arbeite noch ${timeLeft} Minuten! 💼`);
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    setWorking(true);
    setWorkEndTime(Date.now() + 30 * 60 * 1000);
    setMessage('Ab zur Arbeit! Bis gleich! 👋');
    setTimeout(() => setMessage(''), 2000);
  };

  const startGame = () => {
    const twoHours = 2 * 60 * 60 * 1000;
    if (Date.now() - lastGamePlayed < twoHours) {
      const timeLeft = Math.ceil((twoHours - (Date.now() - lastGamePlayed)) / 60000);
      setMessage(`Spiel in ${timeLeft} Minuten wieder verfügbar! ⏰`);
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    setShowGame(true);
    setGameScore(0);
    setGameTime(30);
    setLastGamePlayed(Date.now());

    const gameInterval = setInterval(() => {
      setGameTime(prev => {
        if (prev <= 1) {
          clearInterval(gameInterval);
          setShowGame(false);
          const xpGained = gameScore;
          setXp(prevXp => prevXp + xpGained);
          setMessage(`Super! ${gameScore} Kerne = ${xpGained} XP! 🎉`);
          setTimeout(() => setMessage(''), 3000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const seedInterval = setInterval(() => {
      if (gameTime > 0) {
        const newSeed = {
          id: Date.now() + Math.random(),
          left: Math.random() * 80 + 10
        };
        setFallingSeeds(prev => [...prev, newSeed]);
        setTimeout(() => {
          setFallingSeeds(prev => prev.filter(s => s.id !== newSeed.id));
        }, 3000);
      }
    }, 500);

    setTimeout(() => {
      clearInterval(seedInterval);
    }, 30000);
  };

  const catchSeed = (seedId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFallingSeeds(prev => prev.filter(s => s.id !== seedId));
    setGameScore(prev => prev + 1);
  };

  const buyCostume = (costume: typeof costumes[0]) => {
    if (ownedCostumes.includes(costume.id)) {
      setCurrentCostume(costume.id);
      setMessage(`${costume.name} angezogen! ✨`);
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    if (costume.type === 'level' && level < costume.unlockLevel) {
      setMessage(`Level ${costume.unlockLevel} benötigt! 🔒`);
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    if (costume.type === 'shop' && coins < costume.price) {
      setMessage('Nicht genug Münzen! 💰');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    if (costume.type === 'shop') {
      setCoins(prev => prev - costume.price);
      setOwnedCostumes(prev => [...prev, costume.id]);
      setCurrentCostume(costume.id);
      setMessage(`${costume.name} gekauft! ✨`);
      setTimeout(() => setMessage(''), 2000);
    }
  };

  const getHamsterExpression = () => {
    if (sleeping) return 'sleepy';
    switch (mood) {
      case 'angry': return 'angry';
      case 'eating': return 'eating';
      case 'loved': return 'loved';
      case 'happy': return 'happy';
      default: return 'neutral';
    }
  };

  const getCurrentCostume = () => {
    return costumes.find(c => c.id === currentCostume) || costumes[0];
  };

  const renderHamster = () => {
    const costume = getCurrentCostume();
    const expression = getHamsterExpression();

    return (
      <svg width="140" height="160" viewBox="0 0 140 160" className="drop-shadow-lg">
        <ellipse cx="70" cy="90" rx="50" ry="45" fill={costume.bodyColor} stroke="#E8D5B5" strokeWidth="2"/>

        <path d="M 35 70 Q 35 45, 70 45 Q 105 45, 105 70" fill={costume.color} stroke="#E8944A" strokeWidth="2"/>

        <circle cx="45" cy="55" r="12" fill={costume.color} stroke="#E8944A" strokeWidth="1.5"/>
        <circle cx="95" cy="55" r="12" fill={costume.color} stroke="#E8944A" strokeWidth="1.5"/>
        <circle cx="45" cy="57" r="7" fill={costume.rainbow ? '#FFD700' : '#FFD4A3'}/>
        <circle cx="95" cy="57" r="7" fill={costume.rainbow ? '#FFD700' : '#FFD4A3'}/>

        {costume.hat === 'santa' && (
          <>
            <ellipse cx="70" cy="35" rx="25" ry="15" fill="#FF0000"/>
            <circle cx="70" cy="25" r="8" fill="#FFFFFF"/>
          </>
        )}

        {costume.hat === 'elf' && (
          <path d="M 55 45 L 70 20 L 85 45" fill="#00AA00" stroke="#006600" strokeWidth="2"/>
        )}

        {costume.hat === 'wizard' && (
          <>
            <path d="M 55 45 L 65 15 L 75 45" fill="#4B0082" stroke="#2F0052" strokeWidth="2"/>
            <ellipse cx="70" cy="45" rx="20" ry="5" fill="#4B0082"/>
          </>
        )}

        {costume.hat === 'pirate' && (
          <>
            <ellipse cx="70" cy="48" rx="28" ry="8" fill="#000000"/>
            <circle cx="85" cy="48" r="6" fill="#FFD700"/>
          </>
        )}

        {costume.hat === 'chef' && (
          <>
            <ellipse cx="70" cy="40" rx="20" ry="12" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="2"/>
            <ellipse cx="70" cy="38" rx="18" ry="8" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="2"/>
          </>
        )}

        {costume.hat === 'cowboy' && (
          <>
            <ellipse cx="70" cy="45" rx="30" ry="8" fill="#8B4513"/>
            <path d="M 50 45 Q 70 35, 90 45" fill="#8B4513" stroke="#654321" strokeWidth="2"/>
          </>
        )}

        {costume.wings && (
          <>
            <ellipse cx="30" cy="85" rx="15" ry="25" fill={costume.id === 'bee' ? '#FFD700' : '#FFFFFF'} opacity="0.7"/>
            <ellipse cx="110" cy="85" rx="15" ry="25" fill={costume.id === 'bee' ? '#FFD700' : '#FFFFFF'} opacity="0.7"/>
          </>
        )}

        {costume.cape && (
          <path d="M 30 75 Q 20 100, 30 120 L 30 75" fill={costume.id === 'vampire' ? '#8B0000' : '#0000FF'} opacity="0.8"/>
        )}

        {costume.horns && (
          <>
            <path d="M 45 50 L 40 35 L 48 45" fill="#8B0000"/>
            <path d="M 95 50 L 100 35 L 92 45" fill="#8B0000"/>
          </>
        )}

        {costume.armor && (
          <rect x="50" y="75" width="40" height="35" fill="#C0C0C0" stroke="#808080" strokeWidth="2" rx="5"/>
        )}

        {costume.mask && (
          <rect x="45" y="70" width="50" height="15" fill="#000000" opacity="0.8"/>
        )}

        {costume.helmet && (
          <>
            <ellipse cx="70" cy="58" rx="32" ry="28" fill="#E0E0E0" opacity="0.6" stroke="#999999" strokeWidth="2"/>
            <rect x="45" y="70" width="50" height="3" fill="#666666"/>
          </>
        )}

        {costume.beret && (
          <ellipse cx="70" cy="42" rx="22" ry="10" fill="#FF6347"/>
        )}

        {costume.stripes && (
          <>
            <rect x="55" y="80" width="30" height="5" fill="#000000"/>
            <rect x="55" y="90" width="30" height="5" fill="#000000"/>
            <rect x="55" y="100" width="30" height="5" fill="#000000"/>
          </>
        )}

        {expression === 'happy' && (
          <>
            <circle cx="55" cy="75" r="8" fill="black"/>
            <circle cx="85" cy="75" r="8" fill="black"/>
            <circle cx="57" cy="73" r="3" fill="white"/>
            <circle cx="87" cy="73" r="3" fill="white"/>
          </>
        )}
        {expression === 'angry' && (
          <>
            <line x1="48" y1="70" x2="62" y2="77" stroke="black" strokeWidth="4" strokeLinecap="round"/>
            <line x1="78" y1="77" x2="92" y2="70" stroke="black" strokeWidth="4" strokeLinecap="round"/>
          </>
        )}
        {expression === 'eating' && (
          <>
            <circle cx="55" cy="75" r="6" fill="black"/>
            <circle cx="85" cy="75" r="6" fill="black"/>
            <path d="M 60 93 Q 70 100, 80 93" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round"/>
          </>
        )}
        {expression === 'loved' && (
          <>
            <path d="M 48 70 L 52 77 L 58 73 L 62 77" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round"/>
            <path d="M 78 77 L 82 73 L 88 77 L 92 70" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round"/>
            <circle cx="60" cy="88" r="5" fill="#FF69B4"/>
            <circle cx="80" cy="88" r="5" fill="#FF69B4"/>
          </>
        )}
        {expression === 'neutral' && (
          <>
            <circle cx="55" cy="75" r="7" fill="black"/>
            <circle cx="85" cy="75" r="7" fill="black"/>
          </>
        )}
        {expression === 'sleepy' && (
          <>
            <line x1="48" y1="75" x2="62" y2="75" stroke="black" strokeWidth="3" strokeLinecap="round"/>
            <line x1="78" y1="75" x2="92" y2="75" stroke="black" strokeWidth="3" strokeLinecap="round"/>
          </>
        )}

        <circle cx="70" cy="87" r="4" fill="#FFB6C1"/>

        {(expression === 'happy' || expression === 'neutral') && (
          <path d="M 60 93 Q 70 98, 80 93" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        )}

        <line x1="30" y1="83" x2="48" y2="85" stroke="#8B7355" strokeWidth="1.5"/>
        <line x1="30" y1="88" x2="48" y2="88" stroke="#8B7355" strokeWidth="1.5"/>
        <line x1="92" y1="85" x2="110" y2="83" stroke="#8B7355" strokeWidth="1.5"/>
        <line x1="92" y1="88" x2="110" y2="88" stroke="#8B7355" strokeWidth="1.5"/>

        <ellipse cx="35" cy="105" rx="15" ry="12" fill={costume.bodyColor} stroke="#E8D5B5" strokeWidth="1.5"/>
        <ellipse cx="105" cy="105" rx="15" ry="12" fill={costume.bodyColor} stroke="#E8D5B5" strokeWidth="1.5"/>

        {costume.sparkle && (
          <>
            <text x="25" y="70" fontSize="16">✨</text>
            <text x="95" y="70" fontSize="16">✨</text>
          </>
        )}

        <ellipse cx="50" cy="125" rx="20" ry="10" fill={costume.bodyColor} stroke="#E8D5B5" strokeWidth="1.5"/>
        <ellipse cx="90" cy="125" rx="20" ry="10" fill={costume.bodyColor} stroke="#E8D5B5" strokeWidth="1.5"/>
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-orange-400 to-amber-500 p-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Hamiboom</h1>
            <p className="text-white text-sm opacity-90">Level {level}</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-white font-bold">⭐ {xp} XP</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-white font-bold">💰 {coins}</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-3 mb-6">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Hunger</span>
                <span className="text-sm font-medium text-gray-700">{Math.round(hunger)}%</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-400 to-green-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${hunger}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Sauberkeit</span>
                <span className="text-sm font-medium text-gray-700">{Math.round(cleanliness)}%</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${cleanliness}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>

          <div className="relative bg-gradient-to-b from-amber-100 to-orange-50 rounded-2xl p-8 mb-6 min-h-[300px] flex items-center justify-center overflow-hidden">
            {sleeping && (
              <div className="absolute top-2 right-2">
                <Moon className="text-indigo-600 w-6 h-6" />
              </div>
            )}

            {working && (
              <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-10">
                <div className="text-center">
                  <Briefcase className="w-16 h-16 text-white mx-auto mb-2" />
                  <p className="text-white text-lg font-bold">Bei der Arbeit...</p>
                  <p className="text-white text-sm">{Math.ceil((workEndTime - Date.now()) / 60000)} Min. übrig</p>
                </div>
              </div>
            )}

            <motion.div
              onClick={petHamiboom}
              className="cursor-pointer relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {renderHamster()}

              <AnimatePresence>
                {showHearts && (
                  <>
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 1, y: 0, x: 0 }}
                        animate={{
                          opacity: 0,
                          y: -50,
                          x: (Math.random() - 0.5) * 50
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="absolute top-0 left-1/2"
                      >
                        <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                      </motion.div>
                    ))}
                  </>
                )}
              </AnimatePresence>

              {poopVisible && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute bottom-4 right-4 text-4xl cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    cleanCage();
                  }}
                >
                  💩
                </motion.div>
              )}
            </motion.div>

            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg"
                >
                  <p className="text-center font-medium text-gray-800">{message}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-xl hover:shadow-lg transition-all"
            >
              <Sparkles className="w-5 h-5" />
              Füttern
            </button>

            <button
              onClick={sendToWork}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold py-3 px-4 rounded-xl hover:shadow-lg transition-all"
            >
              <Briefcase className="w-5 h-5" />
              Arbeiten
            </button>

            <button
              onClick={startGame}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold py-3 px-4 rounded-xl hover:shadow-lg transition-all"
            >
              <Play className="w-5 h-5" />
              Spielen
            </button>

            <button
              onClick={() => setShowCostumeMenu(!showCostumeMenu)}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold py-3 px-4 rounded-xl hover:shadow-lg transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              Kostüme
            </button>
          </div>

          {poopVisible && (
            <button
              onClick={cleanCage}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold py-3 px-4 rounded-xl hover:shadow-lg transition-all"
            >
              <Trash2 className="w-5 h-5" />
              Käfig säubern
            </button>
          )}

          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-2"
              >
                {foods.map((food, index) => (
                  <button
                    key={index}
                    onClick={() => feedHamiboom(food)}
                    className="w-full bg-white border-2 border-orange-300 hover:border-orange-500 text-gray-800 font-medium py-3 px-4 rounded-xl transition-all hover:shadow-md"
                  >
                    {food.name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showCostumeMenu && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 max-h-64 overflow-y-auto space-y-2"
              >
                <div className="mb-2">
                  <h3 className="font-bold text-gray-700 mb-2">Level Freischaltungen</h3>
                  {costumes.filter(c => c.type === 'level').map((costume) => (
                    <button
                      key={costume.id}
                      onClick={() => buyCostume(costume)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl mb-2 transition-all ${
                        ownedCostumes.includes(costume.id)
                          ? currentCostume === costume.id
                            ? 'bg-green-500 text-white'
                            : 'bg-green-100 text-green-800'
                          : level >= costume.unlockLevel
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      <span>{costume.name}</span>
                      <span className="flex items-center gap-2">
                        {level < costume.unlockLevel && <Lock className="w-4 h-4" />}
                        {ownedCostumes.includes(costume.id) && <Unlock className="w-4 h-4" />}
                        Level {costume.unlockLevel}
                      </span>
                    </button>
                  ))}
                </div>

                <div>
                  <h3 className="font-bold text-gray-700 mb-2">Shop</h3>
                  {costumes.filter(c => c.type === 'shop').map((costume) => (
                    <button
                      key={costume.id}
                      onClick={() => buyCostume(costume)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl mb-2 transition-all ${
                        ownedCostumes.includes(costume.id)
                          ? currentCostume === costume.id
                            ? 'bg-green-500 text-white'
                            : 'bg-green-100 text-green-800'
                          : coins >= costume.price
                          ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      <span>{costume.name}</span>
                      <span className="flex items-center gap-2">
                        {ownedCostumes.includes(costume.id) ? (
                          <Unlock className="w-4 h-4" />
                        ) : (
                          <>💰 {costume.price}</>
                        )}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {showGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <div className="bg-gradient-to-b from-sky-300 to-sky-100 rounded-3xl p-6 w-full max-w-md mx-4 relative overflow-hidden h-[500px]">
              <div className="flex justify-between items-center mb-4">
                <div className="text-2xl font-bold text-white drop-shadow-lg">
                  Kerne: {gameScore}
                </div>
                <div className="text-2xl font-bold text-white drop-shadow-lg">
                  Zeit: {gameTime}s
                </div>
              </div>

              <div className="relative h-full">
                {fallingSeeds.map((seed) => (
                  <motion.div
                    key={seed.id}
                    initial={{ y: -50, x: `${seed.left}%` }}
                    animate={{ y: 450 }}
                    transition={{ duration: 3, ease: 'linear' }}
                    className="absolute text-4xl cursor-pointer"
                    onClick={(e) => catchSeed(seed.id, e)}
                  >
                    🌻
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HamiboomApp;
