import React, { useState, useMemo } from 'react';
import { TEA_RECIPES } from '../data/teaRecipes';
import InputSlider from './InputSlider';
import { AquaIcon, LeafIcon } from './Icons';

interface BrewModeProps {
  onToggleMode: () => void;
}

const BrewMode: React.FC<BrewModeProps> = ({ onToggleMode }) => {
  const [teaType, setTeaType] = useState<string>('Black');
  const [volume, setVolume] = useState<number>(250);

  const recipe = useMemo(() => TEA_RECIPES[teaType], [teaType]);

  const teaAmount = useMemo(() => {
    const minGrams = ((volume / 100) * recipe.grams_per_100ml_min).toFixed(1);
    const maxGrams = ((volume / 100) * recipe.grams_per_100ml_max).toFixed(1);
    return `${minGrams}g – ${maxGrams}g`;
  }, [volume, recipe]);

  return (
    <div className="bg-brew min-h-screen flex flex-col items-center p-4 md:p-8 transition-colors duration-700 relative overflow-hidden">
      {/* Header */}
      <header className="w-full max-w-md flex justify-between items-center mb-8 z-10">
        <div className="text-left">
          <h1 className="text-3xl font-black flex items-center gap-2 text-amber-900">
            <LeafIcon />
            TeaCraft Pro
          </h1>
          <p className="mt-1 text-xs font-bold uppercase tracking-widest text-amber-700/60">
            The Art of the Perfect Steep
          </p>
        </div>

        {/* Mode Switch - Tea Leaf Icon */}
        <button
          onClick={onToggleMode}
          className="p-3 rounded-2xl shadow-lg transition-all active:scale-90 border bg-amber-100 border-amber-200 text-amber-900"
          aria-label="Switch to Water Mix Mode"
        >
          <AquaIcon />
        </button>
      </header>

      <main className="w-full max-w-md space-y-6 z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Tea Selection Card */}
        <section className="bg-white/30 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-amber-100">
          <h2 className="text-lg font-bold mb-6 text-amber-900 flex items-center gap-2">
            <span className="w-2 h-6 bg-amber-600 rounded-full"></span>
            Select Your Brew
          </h2>

          <div className="mb-6">
            <label className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-2 block">Tea Variety</label>
            <select
              value={teaType}
              onChange={(e) => setTeaType(e.target.value)}
              className="w-full bg-amber-50 border border-amber-200 text-amber-900 text-sm rounded-xl focus:ring-amber-500 focus:border-amber-500 block p-3 font-medium transition-all"
            >
              {Object.keys(TEA_RECIPES).map((type) => (
                <option key={type} value={type}>
                  {TEA_RECIPES[type].tea_type}
                </option>
              ))}
            </select>
          </div>

          <InputSlider
            label="Target Volume"
            value={volume}
            min={100}
            max={1000}
            step={50}
            unit="ml"
            accentColor="orange"
            onChange={setVolume}
          />

          <div className="mt-4 p-4 bg-amber-50 rounded-2xl border border-amber-100 text-center">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-tighter block mb-1">Recommended Tea Amount</span>
            <p className="text-3xl font-black text-amber-900">{teaAmount}</p>
            <p className="text-[10px] text-amber-500 mt-1 font-medium italic">~{recipe.teaspoons_per_cup} teaspoons per cup</p>
          </div>
        </section>

        {/* Recipe Details Card */}
        <section className="bg-stone-800/80 text-stone-100 rounded-3xl p-6 shadow-2xl border border-stone-700">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">Recipe Details</h3>
              <p className="text-2xl font-black">{recipe.tea_type}</p>
            </div>
            <div className="bg-amber-500/20 p-2 rounded-xl">
              <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <span className="text-[10px] text-stone-400 font-bold uppercase block mb-1">Water Temp</span>
              <p className="text-xl font-bold text-amber-400">{recipe.water_temp}°C</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <span className="text-[10px] text-stone-400 font-bold uppercase block mb-1">Steep Time</span>
              <p className="text-xl font-bold text-amber-400">{recipe.steeping_time}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mb-1">Common Examples</h4>
              <p className="text-sm text-stone-300 leading-relaxed">{recipe.examples}</p>
            </div>
            <div className="pt-4 border-t border-white/5">
              <h4 className="text-[10px] text-amber-400 font-bold uppercase tracking-widest mb-1">Pro Tip</h4>
              <p className="text-sm text-stone-300 italic leading-relaxed">"{recipe.serving_tip}"</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer info */}
      <footer className="text-center pb-8 pt-4 z-10">
        <p className="text-xs text-stone-500 font-medium">
          Brewing is an art. Adjust quantities to your personal taste.
        </p>
      </footer>
    </div>
  );
};

export default BrewMode;
