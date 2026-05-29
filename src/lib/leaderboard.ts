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

export type LeaderboardPeriod = 'week' | 'allTime';

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

const ALL_TIME_START = '2020-01-01';

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

export function getAllTimeBounds(): DateBounds {
  const now = new Date();
  const end = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1),
  );
  return { start: ALL_TIME_START, end: end.toISOString().slice(0, 10) };
}

export function getBoundsForPeriod(period: LeaderboardPeriod): DateBounds {
  return period === 'allTime' ? getAllTimeBounds() : getWeekBounds();
}

export function getCountryName(code: string): string {
  return COUNTRY_NAMES[code] ?? code;
}

export function hasVisibleLocation(entry: LeaderboardEntry): boolean {
  return Boolean(entry.country_code);
}

export function formatLocation(entry: LeaderboardEntry): string {
  if (!entry.country_code) {
    return '—';
  }
  return getCountryName(entry.country_code);
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
