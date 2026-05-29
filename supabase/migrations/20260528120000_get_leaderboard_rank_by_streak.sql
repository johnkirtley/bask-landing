-- Leaderboard ranking by current streak.
-- Redefines get_leaderboard to rank by current_streak (then longest_streak) and
-- return the streak fields, including active users with no sessions in the window.
-- Run in Supabase SQL Editor on existing projects (after leaderboard-streak.sql).
-- Source of truth: Bask repo supabase/ (see supabase/RECOVERY.md).
--
-- NOTE: this also changes the in-app leaderboard, which shares this RPC.

DROP FUNCTION IF EXISTS public.get_leaderboard(date, date, integer, text);

CREATE OR REPLACE FUNCTION public.get_leaderboard(
  p_start date,
  p_end date,
  p_limit integer DEFAULT 50,
  p_country_code text DEFAULT NULL::text
)
RETURNS TABLE(
  anonymous_name text,
  country_code text,
  region_label text,
  city_label text,
  location_precision text,
  current_streak integer,
  longest_streak integer,
  total_iu bigint,
  total_sun_minutes bigint,
  session_count bigint,
  last_updated_at timestamp with time zone,
  rank bigint
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public', 'extensions'
AS $function$
  WITH aggregated AS (
    SELECT
      d.public_user_id,
      SUM(d.total_iu) AS total_iu,
      SUM(d.total_sun_seconds) AS total_sun_seconds,
      SUM(d.session_count) AS session_count,
      MAX(d.updated_at) AS last_updated_at
    FROM leaderboard_daily_stats d
    JOIN leaderboard_users u ON u.public_user_id = d.public_user_id
    WHERE u.is_active = true
      AND d.session_date >= p_start
      AND d.session_date < p_end
      AND (p_country_code IS NULL OR u.country_code = p_country_code)
    GROUP BY d.public_user_id
  ),
  active_users AS (
    SELECT u.*
    FROM leaderboard_users u
    WHERE u.is_active = true
      AND (p_country_code IS NULL OR u.country_code = p_country_code)
  )
  SELECT
    u.anonymous_name,
    CASE WHEN u.location_precision IN ('country', 'region', 'city') THEN u.country_code ELSE NULL END AS country_code,
    CASE WHEN u.location_precision IN ('region', 'city') THEN u.region_label ELSE NULL END AS region_label,
    CASE WHEN u.location_precision = 'city' THEN u.city_label ELSE NULL END AS city_label,
    u.location_precision,
    u.current_streak,
    u.longest_streak,
    COALESCE(a.total_iu, 0)::BIGINT AS total_iu,
    COALESCE((a.total_sun_seconds / 60)::BIGINT, 0) AS total_sun_minutes,
    COALESCE(a.session_count, 0)::BIGINT AS session_count,
    COALESCE(a.last_updated_at, u.updated_at) AS last_updated_at,
    ROW_NUMBER() OVER (
      ORDER BY
        u.current_streak DESC,
        u.longest_streak DESC,
        COALESCE(a.last_updated_at, u.updated_at) ASC
    ) AS rank
  FROM active_users u
  LEFT JOIN aggregated a ON a.public_user_id = u.public_user_id
  ORDER BY
    u.current_streak DESC,
    u.longest_streak DESC,
    COALESCE(a.last_updated_at, u.updated_at) ASC
  LIMIT LEAST(GREATEST(p_limit, 1), 100);
$function$;

-- DROP FUNCTION removes the prior grant; restore it (matches the rest of the schema).
GRANT EXECUTE ON FUNCTION public.get_leaderboard(date, date, integer, text) TO anon, authenticated;
