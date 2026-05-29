import ReactCountryFlag from 'react-country-flag';
import {
  formatLocation,
  getCountryName,
  type LeaderboardEntry,
} from '../../lib/leaderboard';

interface LocationDisplayProps {
  entry: LeaderboardEntry;
  compact?: boolean;
}

export function LocationDisplay({ entry, compact = false }: LocationDisplayProps) {
  const label = formatLocation(entry);
  if (label === '—') {
    return <span className="bask-lb-location-empty">—</span>;
  }

  return (
    <span
      className={`bask-lb-location ${compact ? 'bask-lb-location--compact' : ''}`}
    >
      {entry.country_code && (
        <ReactCountryFlag
          countryCode={entry.country_code}
          svg
          className="bask-lb-flag"
          aria-label={getCountryName(entry.country_code)}
        />
      )}
      <span className="bask-lb-location-text">{label}</span>
    </span>
  );
}
