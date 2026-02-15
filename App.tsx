
import React, { useState, useEffect, useMemo } from 'react';
import { MixSettings, MixResult } from './types';
import InputSlider from './components/InputSlider';
import { TEMPERATURE_TIPS } from './data/tips';

const STORAGE_KEY = 'aquamix_preferences';

const App: React.FC = () => {
  // --- State ---
  const [settings, setSettings] = useState<MixSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {
      hotTemp: 80,
      coldTemp: 20,
      targetTemp: 40,
      targetVolume: 500
    };
  });

  const [displayedAdvice, setDisplayedAdvice] = useState<string>(() => {
    const temp = Math.round(settings.targetTemp);
    return TEMPERATURE_TIPS[temp] || "Water temperature is key to quality brewing and comfort.";
  });
  const [isUpdatingAdvice, setIsUpdatingAdvice] = useState(false);

  // --- Persistence ---
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  // --- Calculations ---
  const results = useMemo((): MixResult => {
    const { hotTemp, coldTemp, targetTemp, targetVolume } = settings;

    if (coldTemp >= hotTemp) {
      return { hotVolume: 0, coldVolume: 0, isValid: false, errorMessage: "Hot temperature must be higher than cold temperature." };
    }
    if (targetTemp < coldTemp || targetTemp > hotTemp) {
      return { hotVolume: 0, coldVolume: 0, isValid: false, errorMessage: "Target temperature must be between cold and hot temperatures." };
    }

    if (targetTemp === coldTemp) {
      return { hotVolume: 0, coldVolume: targetVolume, isValid: true };
    }
    if (targetTemp === hotTemp) {
      return { hotVolume: targetVolume, coldVolume: 0, isValid: true };
    }

    const k_cold = (hotTemp - targetTemp) / (targetTemp - coldTemp);
    const hotVolume = targetVolume / (1 + k_cold);
    const coldVolume = targetVolume - hotVolume;

    return {
      hotVolume: Math.round(hotVolume),
      coldVolume: Math.round(coldVolume),
      isValid: true
    };
  }, [settings]);

  // --- Advice Logic (Debounced) ---
  useEffect(() => {
    setIsUpdatingAdvice(true);
    const timer = setTimeout(() => {
      const temp = Math.round(settings.targetTemp);
      setDisplayedAdvice(TEMPERATURE_TIPS[temp] || "Water temperature is key to quality brewing and comfort.");
      setIsUpdatingAdvice(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [settings.targetTemp]);

  // --- Handlers ---
  const handleUpdate = (key: keyof MixSettings, val: number) => {
    setSettings(prev => ({ ...prev, [key]: val }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8">
      {/* Header */}
      <header className="w-full max-w-md text-center mb-4">
        <h1 className="text-3xl font-extrabold text-blue-600 flex items-center justify-center gap-2">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          AquaMix Master
        </h1>
        <p className="text-slate-500 mt-2 text-sm font-medium">Precision temperature blending made simple.</p>
      </header>

      <main className="w-full max-w-md space-y-4">
        {/* Input Card */}
        <section className="bg-white rounded-3xl shadow-xl p-6 pt-2 pb-2 border border-slate-100">
          <h2 className="text-lg font-bold mb-2 text-slate-800 flex items-center gap-2">
            <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
            Mix Configuration
          </h2>
          <InputSlider
            label="Target Volume"
            value={settings.targetVolume}
            min={10}
            max={2000}
            step={10}
            unit="ml"
            accentColor="indigo"
            onChange={(v) => handleUpdate('targetVolume', v)}
          />
          <InputSlider
            label="Target Temp"
            value={settings.targetTemp}
            min={0}
            max={100}
            unit="°C"
            accentColor="orange"
            onChange={(v) => handleUpdate('targetTemp', v)}
          />
          <InputSlider
            label="Hot Source Temp"
            value={settings.hotTemp}
            min={0}
            max={100}
            unit="°C"
            accentColor="red"
            onChange={(v) => handleUpdate('hotTemp', v)}
          />
          <InputSlider
            label="Cold Source Temp"
            value={settings.coldTemp}
            min={0}
            max={100}
            unit="°C"
            accentColor="blue"
            onChange={(v) => handleUpdate('coldTemp', v)}
          />
        </section>

        {/* Results Card */}
        <section className={`rounded-3xl p-6 shadow-xl transition-all duration-300 ${results.isValid ? 'bg-indigo-600 text-white' : 'bg-red-50 text-red-600 border border-red-200'}`}>
          {!results.isValid ? (
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <p className="font-semibold">{results.errorMessage}</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-start gap-3">
                <div>
                  <h3 className="text-indigo-100 text-xs font-bold uppercase tracking-widest mb-1">Results</h3>
                  <p className="text-xl font-black">Recipe Found</p>
                </div>
                <div className="text-right whitespace-nowrap shrink-0">
                  <span className="block text-xs opacity-75 uppercase mb-1">Target</span>
                  <span className="text-lg font-bold">
                    {settings.targetVolume}ml @ {settings.targetTemp}°C
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <span className="text-xs text-red-100 font-bold uppercase block mb-2">🔥 Hot ({settings.hotTemp}°C)</span>
                  <p className="text-2xl font-black tracking-tight">{results.hotVolume}<span className="text-sm ml-1 font-normal opacity-70">ml</span></p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <span className="text-xs text-blue-100 font-bold uppercase block mb-2">❄️ Cold ({settings.coldTemp}°C)</span>
                  <p className="text-2xl font-black tracking-tight">{results.coldVolume}<span className="text-sm ml-1 font-normal opacity-70">ml</span></p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Aqua Insights Section */}
        <section className="bg-blue-50 border border-blue-100 rounded-3xl p-6">
          <div className="flex gap-4 items-start">
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div>
              <h4 className="font-bold text-blue-900 text-sm mb-1 uppercase tracking-tight">Aqua Insights</h4>
              <p className={`text-blue-800 text-sm transition-opacity duration-300 ${isUpdatingAdvice ? 'opacity-40' : 'opacity-100'}`}>
                {displayedAdvice}
              </p>
            </div>
          </div>
        </section>

        {/* Footer info */}
        <footer className="text-center p-2">
          <p className="text-xs text-slate-400 font-medium">
            Remember: Always check temperature manually before use.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default App;
