export type CityData = {
  name: string;
  state: string;
  latitude: number;
  longitude: number;
  timezone: string;
};

export type SolarCalculation = {
  solarNoon: string;
  declination: number;
  altitudeAngle: number;
  solarHours: number;
  vitaminDWindow: string;
};

export type UVIndex = {
  morning: number;
  midday: number;
  afternoon: number;
  peak: number;
};

export type SkinTypeMinutes = {
  type1: number;
  type2: number;
  type3: number;
  type4: number;
  type5: number;
  type6: number;
};

export type CityPageData = {
  slug: string;
  city: CityData;
  date: Date;
  solar: SolarCalculation;
  uv: UVIndex;
  burnMinutes: SkinTypeMinutes;
};