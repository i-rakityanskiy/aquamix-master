import React, { useState, useEffect } from 'react';
import { AppMode } from './types';
import WaterMixMode from './components/WaterMixMode';
import BrewMode from './components/BrewMode';

const MODE_STORAGE_KEY = 'aquamix_mode';

const App: React.FC = () => {
  // --- State ---
  const [mode, setMode] = useState<AppMode>(() => {
    const saved = localStorage.getItem(MODE_STORAGE_KEY);
    return (saved as AppMode) || AppMode.AQUA_MIX;
  });

  // --- Persistence ---
  useEffect(() => {
    localStorage.setItem(MODE_STORAGE_KEY, mode);
  }, [mode]);

  // --- Handlers ---
  const toggleMode = () => {
    setMode(prev => prev === AppMode.AQUA_MIX ? AppMode.BREW_MODE : AppMode.AQUA_MIX);
  };

  return (
    <>
      {mode === AppMode.AQUA_MIX ? (
        <WaterMixMode onToggleMode={toggleMode} />
      ) : (
        <BrewMode onToggleMode={toggleMode} />
      )}
    </>
  );
};

export default App;
