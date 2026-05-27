export interface LeaderboardEntry {
  anonymous_name: string;
  country_code: string | null;
  region_label: string | null;
  city_label: string | null;
  location_precision: 'none' | 'country' | 'region' | 'city';
  total_iu: number;
  total_sun_minutes: number;
  session_count: number;
  last_updated_at: string;
  rank: number;
}

export type LeaderboardPeriod = 'today' | 'week';

export interface DateBounds {
  start: string;
  end: string;
}

const COUNTRY_NAMES: Record<string, string> = {
  US: 'United States',
  CA: 'Canada',
  GB: 'United Kingdom',
  AU: 'Australia',
  NZ: 'New Zealand',
  DE: 'Germany',
  FR: 'France',
  ES: 'Spain',
  IT: 'Italy',
  NL: 'Netherlands',
  SE: 'Sweden',
  NO: 'Norway',
  DK: 'Denmark',
  FI: 'Finland',
  IE: 'Ireland',
  CH: 'Switzerland',
  AT: 'Austria',
  BE: 'Belgium',
  PT: 'Portugal',
  JP: 'Japan',
  KR: 'South Korea',
  SG: 'Singapore',
  IN: 'India',
  BR: 'Brazil',
  MX: 'Mexico',
};

export const COUNTRY_FILTER_OPTIONS = [
  { value: '', label: 'All countries' },
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'AU', label: 'Australia' },
  { value: 'NZ', label: 'New Zealand' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'ES', label: 'Spain' },
  { value: 'IT', label: 'Italy' },
  { value: 'NL', label: 'Netherlands' },
  { value: 'SE', label: 'Sweden' },
  { value: 'NO', label: 'Norway' },
  { value: 'DK', label: 'Denmark' },
  { value: 'FI', label: 'Finland' },
  { value: 'IE', label: 'Ireland' },
  { value: 'CH', label: 'Switzerland' },
  { value: 'AT', label: 'Austria' },
  { value: 'BE', label: 'Belgium' },
  { value: 'PT', label: 'Portugal' },
  { value: 'JP', label: 'Japan' },
  { value: 'KR', label: 'South Korea' },
  { value: 'SG', label: 'Singapore' },
  { value: 'IN', label: 'India' },
  { value: 'BR', label: 'Brazil' },
  { value: 'MX', label: 'Mexico' },
] as const;

export function getTodayBounds(): DateBounds {
  const now = new Date();
  const start = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
  const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  };
}

export function getWeekBounds(): DateBounds {
  const now = new Date();
  const day = now.getUTCDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const start = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + mondayOffset,
    ),
  );
  const end = new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000);
  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  };
}

export function getBoundsForPeriod(period: LeaderboardPeriod): DateBounds {
  return period === 'today' ? getTodayBounds() : getWeekBounds();
}

export function formatLocation(entry: LeaderboardEntry): string {
  if (
    entry.location_precision === 'city' &&
    entry.city_label &&
    entry.region_label
  ) {
    return `${entry.city_label}, ${entry.region_label}`;
  }
  if (entry.location_precision === 'region' && entry.region_label) {
    return entry.region_label;
  }
  if (entry.location_precision === 'country' && entry.country_code) {
    return COUNTRY_NAMES[entry.country_code] ?? entry.country_code;
  }
  return '—';
}

export function formatIU(value: number): string {
  if (value >= 1000) {
    const compact = value / 1000;
    return compact >= 10
      ? `${Math.round(compact)}k`
      : `${compact.toFixed(1).replace(/\.0$/, '')}k`;
  }
  return String(Math.round(value));
}

export function formatSunMinutes(minutes: number): string {
  const rounded = Math.round(minutes);
  if (rounded < 60) {
    return `${rounded}m`;
  }
  const hours = Math.floor(rounded / 60);
  const remainder = rounded % 60;
  return remainder > 0 ? `${hours}h ${remainder}m` : `${hours}h`;
}

export function formatRelativeUpdated(iso: string, now = Date.now()): string {
  const updatedAt = new Date(iso).getTime();
  if (Number.isNaN(updatedAt)) {
    return 'Updated recently';
  }

  const diffMs = Math.max(0, now - updatedAt);
  const diffMinutes = Math.floor(diffMs / 60000);

  if (diffMinutes < 1) {
    return 'Updated just now';
  }
  if (diffMinutes < 60) {
    return `Updated ${diffMinutes}m ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `Updated ${diffHours}h ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  return `Updated ${diffDays}d ago`;
}

export function getLatestUpdatedAt(entries: LeaderboardEntry[]): string | null {
  if (entries.length === 0) {
    return null;
  }

  return entries.reduce((latest, entry) => {
    return new Date(entry.last_updated_at).getTime() >
      new Date(latest).getTime()
      ? entry.last_updated_at
      : latest;
  }, entries[0].last_updated_at);
}

export function getRankMedal(rank: number): string | null {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return null;
}
