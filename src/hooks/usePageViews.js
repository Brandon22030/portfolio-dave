import { useCallback, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const DAY_MS = 24 * 60 * 60 * 1000;
const WEEKS = 12;

const EMPTY_STATS = {
  loading: true,
  error: null,
  total30: 0,
  prevTotal30: 0,
  trendPct: null,
  weekly: Array(WEEKS).fill(0),
  topProjectSlugs: [],
};

// Aggregates the raw page_views rows (logged by PageViewTracker) into the
// numbers the dashboard shows: 30-day total + trend, a 12-week bar chart, and
// the most-visited project detail pages.
export function usePageViewStats() {
  const [stats, setStats] = useState(EMPTY_STATS);

  const refresh = useCallback(async () => {
    try {
      const since = new Date(Date.now() - WEEKS * 7 * DAY_MS).toISOString();
      const { data, error } = await supabase.from("page_views").select("path, created_at").gte("created_at", since);
      if (error) throw error;

      const now = Date.now();
      const rows = data || [];

      let total30 = 0;
      let prevTotal30 = 0;
      const weekly = Array(WEEKS).fill(0);
      const projectCounts = {};

      for (const row of rows) {
        const t = new Date(row.created_at).getTime();
        const ageDays = (now - t) / DAY_MS;

        if (ageDays <= 30) total30 += 1;
        else if (ageDays <= 60) prevTotal30 += 1;

        const weekIndex = WEEKS - 1 - Math.min(WEEKS - 1, Math.floor(ageDays / 7));
        weekly[weekIndex] += 1;

        const match = /^\/projets\/([^/]+)$/.exec(row.path || "");
        if (match) projectCounts[match[1]] = (projectCounts[match[1]] || 0) + 1;
      }

      const topProjectSlugs = Object.entries(projectCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([slug, count]) => ({ slug, count }));

      const trendPct = prevTotal30 > 0 ? Math.round(((total30 - prevTotal30) / prevTotal30) * 100) : null;

      setStats({ loading: false, error: null, total30, prevTotal30, trendPct, weekly, topProjectSlugs });
    } catch (e) {
      setStats((s) => ({ ...s, loading: false, error: e.message }));
    }
  }, []);

  useEffect(() => {
    refresh();
    const channel = supabase
      .channel("page_views-changes")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "page_views" }, () => refresh())
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [refresh]);

  return stats;
}
