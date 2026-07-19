import type { CityData, CityPageData, SkinTypeMinutes, UVIndex } from '../types';

const TIMEZONE_OFFSETS: Record<string, number> = {
  'America/New_York': -5,
  'America/Chicago': -6,
  'America/Denver': -7,
  'America/Phoenix': -7,
  'America/Los_Angeles': -8,
  'America/Anchorage': -9,
  'Pacific/Honolulu': -10,
};

function getTimezoneOffsetHours(timezone: string): number {
  if (timezone in TIMEZONE_OFFSETS) {
    return TIMEZONE_OFFSETS[timezone];
  }
  return 0;
}

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function formatHourMinutes(hours: number): string {
  const wrapped = ((hours % 24) + 24) % 24;
  const h = Math.floor(wrapped);
  const m = Math.floor((wrapped - h) * 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function calculateSolarNoon(longitude: number, timezone: string): string {
  const offsetHours = getTimezoneOffsetHours(timezone);
  const hours = 12 - longitude / 15 + offsetHours;
  return formatHourMinutes(hours);
}

export function calculateDeclination(dayOfYear: number): number {
  const radians = (2 * Math.PI * (dayOfYear - 81)) / 365;
  return 23.45 * Math.sin(radians);
}

export function calculateAltitudeAngle(latitude: number, declination: number): number {
  return 90 - Math.abs(latitude - declination);
}

export function calculateSolarHours(latitude: number, dayOfYear: number): number {
  const declination = calculateDeclination(dayOfYear);
  const latRad = (latitude * Math.PI) / 180;
  const decRad = (declination * Math.PI) / 180;
  const cosHourAngle = -Math.tan(latRad) * Math.tan(decRad);
  if (cosHourAngle >= 1) return 0;
  if (cosHourAngle <= -1) return 24;
  const hourAngle = (Math.acos(cosHourAngle) * 180) / Math.PI;
  return (2 * hourAngle) / 15;
}

export function calculateVitaminDWindow(altitudeAngle: number): string {
  if (altitudeAngle < 20) return 'No UVB available';
  if (altitudeAngle < 35) return '11:00 - 13:00';
  if (altitudeAngle < 50) return '10:30 - 13:30';
  return '10:00 - 14:00';
}

export function estimateUVIndex(latitude: number, dayOfYear: number): UVIndex {
  const declination = calculateDeclination(dayOfYear);
  const peakAltitude = calculateAltitudeAngle(latitude, declination);
  const peak = Math.max(0, 12 * Math.sin((peakAltitude * Math.PI) / 180));
  return {
    morning: Math.round(peak * 0.55 * 10) / 10,
    midday: Math.round(peak * 10) / 10,
    afternoon: Math.round(peak * 0.55 * 10) / 10,
    peak: Math.round(peak * 10) / 10,
  };
}

export function calculateBurnTime(uvIndex: number): number {
  if (uvIndex <= 0) return 0;
  return Math.round(200 / uvIndex);
}

export function calculateMinutesBySkinType(uvIndex: number): SkinTypeMinutes {
  if (uvIndex <= 0) {
    return { type1: 0, type2: 0, type3: 0, type4: 0, type5: 0, type6: 0 };
  }
  return {
    type1: Math.round(100 / uvIndex),
    type2: Math.round(200 / uvIndex),
    type3: Math.round(300 / uvIndex),
    type4: Math.round(400 / uvIndex),
    type5: Math.round(600 / uvIndex),
    type6: Math.round(1000 / uvIndex),
  };
}

export function generateCityPageData(city: CityData, date: Date): CityPageData {
  const dayOfYear = getDayOfYear(date);
  const declination = calculateDeclination(dayOfYear);
  const altitudeAngle = calculateAltitudeAngle(city.latitude, declination);
  const solarNoon = calculateSolarNoon(city.longitude, city.timezone);
  const solarHours = calculateSolarHours(city.latitude, dayOfYear);
  const vitaminDWindow = calculateVitaminDWindow(altitudeAngle);
  const uv = estimateUVIndex(city.latitude, dayOfYear);
  const burnMinutes = calculateMinutesBySkinType(uv.peak);
  const slug = `${city.name.toLowerCase().replace(/\s+/g, '-')}-${city.state.toLowerCase()}`;

  return {
    slug,
    city,
    date,
    solar: {
      solarNoon,
      declination: Math.round(declination * 100) / 100,
      altitudeAngle: Math.round(altitudeAngle * 100) / 100,
      solarHours: Math.round(solarHours * 100) / 100,
      vitaminDWindow,
    },
    uv,
    burnMinutes,
  };
}