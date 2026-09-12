import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../supabaseClient";

// Logs one row per public page visit, used to compute real dashboard stats.
// Admin routes are excluded so browsing the dashboard doesn't inflate traffic.
export default function PageViewTracker() {
  const { pathname } = useLocation();
  const lastTracked = useRef(null);

  useEffect(() => {
    if (pathname.startsWith("/dashboard")) return;
    if (lastTracked.current === pathname) return;
    lastTracked.current = pathname;
    supabase.from("page_views").insert({ path: pathname }).then(
      () => {},
      () => {}
    );
  }, [pathname]);

  return null;
}
