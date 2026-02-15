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

  return (
    <div className="flex flex-col gap-2 mb-6">
      <div className="flex justify-between items-center">
        <label className="text-sm font-semibold text-slate-600 uppercase tracking-wider">{label}</label>
        <span className="text-lg font-bold text-slate-900 bg-white px-3 py-1 rounded-lg shadow-sm border border-slate-100">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer ${accentClasses[accentColor] || "accent-blue-600"}`}
      />
      <div className="flex justify-between text-xs text-slate-400">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
};

export default InputSlider;
