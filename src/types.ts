export enum AppMode {
  AQUA_MIX = 'AQUA_MIX',
  BREW_MODE = 'BREW_MODE'
}

export interface TeaRecipe {
  tea_type: string;
  examples: string;
  water_temp: string;
  grams_per_100ml_min: number;
  grams_per_100ml_max: number;
  teaspoons_per_cup: string;
  steeping_time: string;
  serving_tip: string;
}

export interface MixSettings {
  hotTemp: number;
  coldTemp: number;
  targetTemp: number;
  targetVolume: number;
}

export interface BrewSettings {
  teaType: string;
  targetVolume: number;
}

export interface MixResult {
  hotVolume: number;
  coldVolume: number;
  isValid: boolean;
  errorMessage?: string;
}

export interface AquaTip {
  title: string;
  suggestion: string;
  icon: string;
}
