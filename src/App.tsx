import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Moon, Sun, Trash2, Play, Briefcase, ShoppingBag, Lock } from 'lucide-react';

const HamiboomApp = () => {
  const [xp, setXp] = useState(0);
  const [coins, setCoins] = useState(0);
  const [level, setLevel] = useState(1);
  const [hunger, setHunger] = useState(100);

  const handleAdminCheat = () => {
    const pw = window.prompt("Admin Passwort:");
    if (pw === "6212") {
      setCoins(c => c + 700);
      setXp(x => x + 1000);
      alert("Cheat aktiv! 🚀");
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden relative">
        <button onClick={handleAdminCheat} className="absolute top-2 right-2 opacity-10 hover:opacity-100"><Lock size={12}/></button>
        <div className="bg-orange-500 p-6 text-white">
          <h1 className="text-2xl font-bold">Hamiboom</h1>
          <p>Level {Math.floor(xp/100) + 1} | 💰 {coins}</p>
        </div>
        <div className="p-10 text-center">
          <div className="text-8xl mb-4">🐹</div>
          <p className="text-gray-600">Dein Hamster ist bereit!</p>
          <div className="mt-4 h-4 bg-gray-200 rounded-full overflow-hidden">
             <div className="h-full bg-green-500" style={{width: `${hunger}%`}}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HamiboomApp;
