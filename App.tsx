import React from 'react';
import WaterMixMode from './components/WaterMixMode';

const App: React.FC = () => {
  // --- Handlers ---
  const toggleMode = () => {
    //
  };

  return (
    <>
      <WaterMixMode onToggleMode={toggleMode} />
    </>
  );
};

export default App;
