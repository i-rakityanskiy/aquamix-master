
export interface MixSettings {
  hotTemp: number;
  coldTemp: number;
  targetTemp: number;
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
