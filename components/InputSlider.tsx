import React from 'react';

interface InputSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit: string;
  onChange: (val: number) => void;
  accentColor?: string;
}

const InputSlider: React.FC<InputSliderProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  onChange,
  accentColor = "blue"
}) => {
  const accentClasses: Record<string, string> = {
    blue: "accent-blue-600",
    red: "accent-red-600",
    indigo: "accent-indigo-600",
    orange: "accent-orange-500"
  };

  const buttonColorClasses: Record<string, string> = {
    blue: "text-blue-600 hover:bg-blue-50",
    red: "text-red-600 hover:bg-red-50",
    indigo: "text-indigo-600 hover:bg-indigo-50",
    orange: "text-orange-500 hover:bg-orange-50"
  };

  const handleDecrement = () => {
    const newValue = Math.max(min, value - step);
    onChange(newValue);
  };

  const handleIncrement = () => {
    const newValue = Math.min(max, value + step);
    onChange(newValue);
  };

  return (
    <div className="flex flex-col gap-2 mb-3">
      <div className="flex justify-between items-center">
        <label className="text-sm font-semibold text-slate-600 uppercase tracking-wider">{label}</label>
        <span className="text-lg font-bold text-slate-900 bg-white px-3 py-1 rounded-lg shadow-sm border border-slate-100 min-w-16 text-center">
          {value}{unit}
        </span>
      </div>
      
      <div className="flex items-center">
        <button
          onClick={handleDecrement}
          disabled={value <= min}
          className={`w-6 h-6 flex items-center justify-center rounded-xl bg-white shadow-sm border border-slate-200 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 ${buttonColorClasses[accentColor] || buttonColorClasses.blue}`}
          aria-label={`Decrease ${label}`}
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
          </svg>
        </button>

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`flex-grow h-2 bg-slate-200 appearance-none cursor-pointer transition-all ${accentClasses[accentColor] || "accent-blue-600"}`}
        />

        <button
          onClick={handleIncrement}
          disabled={value >= max}
          className={`w-6 h-6 flex items-center justify-center rounded-xl bg-white shadow-sm border border-slate-200 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 ${buttonColorClasses[accentColor] || buttonColorClasses.blue}`}
          aria-label={`Increase ${label}`}
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      <div className="flex justify-between text-[10px] text-slate-400 font-medium px-1">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
};

export default InputSlider;
