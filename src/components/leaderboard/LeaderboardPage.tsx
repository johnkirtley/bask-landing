import { useCallback, useEffect, useMemo, useState } from 'react';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { Menu, RefreshCw, X } from 'lucide-react';
import { Cloud, SunGlyph, SunMascot } from '../landing/Mascot';
import { AppleLogo } from '../landing/PhoneMockups';
import {
  formatIU,
  formatRelativeUpdated,
  formatStreak,
  formatSunMinutes,
  getAllTimeBounds,
  getLatestUpdatedAt,
  getRankMedal,
  hasVisibleLocation,
  type LeaderboardEntry,
} from '../../lib/leaderboard';
import { LocationDisplay } from './LocationDisplay';

export const APP_STORE_URL =
  'https://apps.apple.com/us/app/bask-vitamin-d-sun-tracker/id6758405235';

const REFRESH_INTERVAL_MS = 60_000;

interface LeaderboardPageProps {
  supabaseUrl: string;
  supabaseAnonKey: string;
}

type FetchState = 'idle' | 'loading' | 'success' | 'error' | 'config';

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks: { href: string; label: string; current?: boolean }[] = [
    { href: '/', label: 'Home' },
    { href: '/leaderboard', label: 'Leaderboard', current: true },
    { href: '/blog', label: 'Blog' },
  ];

  return (
    <nav className="bask-nav">
      <div className="bask-nav-inner">
        <a className="bask-nav-brand" href="/">
          <SunGlyph size={28} color="var(--bask-sun)" />
          <span>Bask</span>
        </a>
        <div className="bask-nav-links">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={link.current ? 'page' : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>
        <a
          className="bask-nav-cta"
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download
        </a>
        <button
          type="button"
          className="bask-nav-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <div className={`bask-nav-mobile ${menuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            aria-current={link.current ? 'page' : undefined}
          >
            {link.label}
          </a>
        ))}
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bask-nav-cta"
        >
          Download
        </a>
      </div>
    </nav>
  );
}

function LeaderboardHero() {
  return (
    <section className="bask-lb-hero">
      <div className="bask-lb-hero-bg" aria-hidden="true">
        <Cloud
          size={110}
          opacity={0.65}
          style={{ position: 'absolute', top: '12%', left: '8%' }}
        />
        <Cloud
          size={80}
          opacity={0.5}
          style={{ position: 'absolute', top: '28%', right: '12%' }}
        />
        <Cloud
          size={64}
          opacity={0.38}
          style={{ position: 'absolute', bottom: '18%', left: '16%' }}
        />
      </div>
      <div className="bask-lb-hero-inner">
        <div className="bask-lb-hero-copy">
          <div className="bask-eyebrow bask-eyebrow--green">
            <span className="bask-eyebrow-dot" />
            Touch Grass Leaderboard
          </div>
          <h1 className="bask-h1">
            Who&apos;s hitting their <em>Vitamin D goals</em>?
          </h1>
          <p className="bask-sub">Live rankings from Bask users who opt in.</p>
          <p className="bask-sub">
            <strong>Based on daily goal streak being achieved,</strong> not just
            total IU or sun minutes.
          </p>
        </div>
        <div className="bask-lb-hero-mascot">
          <SunMascot size={220} expression="cheer" />
        </div>
      </div>
    </section>
  );
}

function LeaderboardTable({
  entries,
  loading,
}: {
  entries: LeaderboardEntry[];
  loading: boolean;
}) {
  if (loading && entries.length === 0) {
    return (
      <div className="bask-lb-table-shell">
        <div className="bask-lb-skeleton-list" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="bask-lb-skeleton-row" key={index} />
          ))}
        </div>
        <p className="bask-lb-status" role="status">
          Loading leaderboard…
        </p>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="bask-lb-empty">
        <SunMascot size={120} expression="happy" />
        <h2 className="bask-h3">No sessions yet.</h2>
        <p className="bask-body">
          Be the first to touch grass. Opt in from the Bask app and your sun
          sessions will show up here.
        </p>
      </div>
    );
  }

  return (
    <div className="bask-lb-table-shell">
      <div className="bask-lb-table-head">
        <span className="bask-lb-head-rank">Rank</span>
        <span className="bask-lb-head-name">Name</span>
        <span className="bask-lb-col-location">Country</span>
        <span className="bask-lb-col-streak">Streak</span>
      </div>
      <ol className="bask-lb-table-body">
        {entries.map((entry) => {
          const medal = getRankMedal(entry.rank);
          const topThree = entry.rank <= 3;

          return (
            <li
              key={`${entry.rank}-${entry.anonymous_name}`}
              className={`bask-lb-row ${topThree ? `bask-lb-row--top bask-lb-row--${entry.rank}` : ''}`}
            >
              <div className="bask-lb-rank">
                {medal ? (
                  <span className="bask-lb-medal" aria-hidden="true">
                    {medal}
                  </span>
                ) : (
                  <span className="bask-lb-rank-num">#{entry.rank}</span>
                )}
              </div>
              <div className="bask-lb-name">
                <span className="bask-lb-name-text">
                  {entry.anonymous_name}
                </span>
                <span className="bask-lb-name-meta">
                  {entry.session_count}{' '}
                  {entry.session_count === 1 ? 'session' : 'sessions'}
                </span>
                <span className="bask-lb-name-meta">
                  Time in sun: {formatSunMinutes(entry.total_sun_minutes)}
                </span>
                <span className="bask-lb-name-meta">
                  Total IU gained: {formatIU(entry.total_iu)}
                </span>
                {hasVisibleLocation(entry) && (
                  <span className="bask-lb-location-mobile">
                    <LocationDisplay entry={entry} compact />
                  </span>
                )}
              </div>
              <div className="bask-lb-col-location">
                <LocationDisplay entry={entry} />
              </div>
              <div className="bask-lb-streak">
                <span className="bask-lb-streak-current">
                  {formatStreak(entry.current_streak)}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function JoinCTA() {
  return (
    <section className="bask-section bask-lb-join">
      <div className="bask-section-inner bask-lb-join-inner">
        <div className="bask-lb-join-copy">
          <div className="bask-eyebrow">
            <span className="bask-eyebrow-dot" />
            Join the board
          </div>
          <h2 className="bask-h2">
            Want your name on the <em>scoreboard</em>?
          </h2>
          <p className="bask-body">
            Opt in from{' '}
            <strong>
              Bask → Settings → Community → Touch Grass Leaderboard
            </strong>
            . Anonymous by default. Location is optional and never uses GPS.
          </p>
          <div className="bask-cta-row">
            <a
              className="bask-cta-primary"
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <AppleLogo />
              Join the leaderboard in the Bask app
            </a>
          </div>
        </div>
        <div className="bask-lb-join-card">
          <div className="bask-lb-join-card-title">How it works</div>
          <ul className="bask-lb-join-steps">
            <li>Opt in from the Bask app settings</li>
            <li>Track a live sun session in the app</li>
            <li>Climb the board by achieving your daily Vitamin D goals</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bask-footer">
      <div className="bask-section-inner bask-footer-inner">
        <div>
          <div className="bask-footer-brand">
            <SunGlyph
              size={32}
              color="var(--bask-honey)"
              faceColor="var(--bask-bg)"
            />
            <span>Bask</span>
          </div>
          <div className="bask-footer-tag">
            Sunlight intelligence for vitamin D.
          </div>
        </div>
        <div className="bask-footer-cols">
          <div>
            <div className="bask-footer-h">App</div>
            <a href="/">Home</a>
            <a href="/leaderboard" aria-current="page">
              Leaderboard
            </a>
            <a href={APP_STORE_URL}>Download</a>
          </div>
          <div>
            <div className="bask-footer-h">Company</div>
            <a href="/blog">Blog</a>
            <a href="mailto:support@getbask.app">Contact</a>
          </div>
          <div>
            <div className="bask-footer-h">Legal</div>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </div>
        </div>
        <div className="bask-footer-bottom">
          <span>© 2026 Bask</span>
          <span>
            Estimates only · Not medical advice. Educational tool, not a
            diagnostic device.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default function LeaderboardPage({
  supabaseUrl,
  supabaseAnonKey,
}: LeaderboardPageProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [fetchState, setFetchState] = useState<FetchState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());

  const configReady = Boolean(supabaseUrl && supabaseAnonKey);

  const supabase = useMemo<SupabaseClient | null>(() => {
    if (!configReady) {
      return null;
    }
    return createClient(supabaseUrl, supabaseAnonKey);
  }, [configReady, supabaseAnonKey, supabaseUrl]);

  const fetchLeaderboard = useCallback(async () => {
    if (!supabase) {
      setFetchState('config');
      setErrorMessage(
        'Leaderboard is not configured yet. Add Supabase environment variables to enable live rankings.',
      );
      return;
    }

    setFetchState((current) => (current === 'success' ? 'success' : 'loading'));
    setErrorMessage(null);

    const { start, end } = getAllTimeBounds();

    const { data, error } = await supabase.rpc('get_leaderboard', {
      p_start: start,
      p_end: end,
      p_limit: 50,
      p_country_code: null,
    });

    if (error) {
      setFetchState('error');
      setErrorMessage(
        'Could not load the leaderboard right now. Check your connection and try again.',
      );
      return;
    }

    setEntries((data ?? []) as LeaderboardEntry[]);
    setFetchState('success');
    setNow(Date.now());
  }, [supabase]);

  useEffect(() => {
    void fetchLeaderboard();
  }, [fetchLeaderboard]);

  useEffect(() => {
    if (!configReady) {
      return;
    }

    const intervalId = window.setInterval(() => {
      void fetchLeaderboard();
    }, REFRESH_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [configReady, fetchLeaderboard]);

  useEffect(() => {
    const tickId = window.setInterval(() => {
      setNow(Date.now());
    }, 30_000);

    return () => window.clearInterval(tickId);
  }, []);

  const latestUpdatedAt = getLatestUpdatedAt(entries);
  const updatedLabel = latestUpdatedAt
    ? formatRelativeUpdated(latestUpdatedAt, now)
    : fetchState === 'loading'
      ? 'Refreshing…'
      : null;

  return (
    <div className="bask-root">
      <Navigation />
      <LeaderboardHero />

      <section className="bask-section bask-lb-section">
        <div className="bask-section-inner bask-lb-inner">
          <div className="bask-lb-panel">
            <div className="bask-lb-toolbar">
              <button
                type="button"
                className="bask-lb-refresh"
                onClick={() => void fetchLeaderboard()}
                disabled={fetchState === 'loading' || !configReady}
              >
                <RefreshCw
                  size={16}
                  className={fetchState === 'loading' ? 'bask-lb-spin' : ''}
                />
                Refresh
              </button>
            </div>

            <div className="bask-lb-meta-row">
              <div className="bask-lb-meta-chip">
                <span className="bask-lb-live-dot" aria-hidden="true" />
                Live streak rankings
              </div>
              {updatedLabel && (
                <div className="bask-lb-meta-updated">{updatedLabel}</div>
              )}
            </div>

            {fetchState === 'config' && (
              <div className="bask-lb-alert bask-lb-alert--config" role="alert">
                <strong>Leaderboard unavailable.</strong> {errorMessage}
              </div>
            )}

            {fetchState === 'error' && (
              <div className="bask-lb-alert" role="alert">
                <strong>Something went wrong.</strong> {errorMessage}
                <button
                  type="button"
                  className="bask-lb-retry"
                  onClick={() => void fetchLeaderboard()}
                >
                  Try again
                </button>
              </div>
            )}

            <LeaderboardTable
              entries={entries}
              loading={fetchState === 'loading' || fetchState === 'idle'}
            />

            <p className="bask-lb-disclaimer">
              Estimates only · Not medical advice · Anonymous opt-in
            </p>
          </div>
        </div>
      </section>

      <JoinCTA />
      <Footer />
    </div>
  );
}
