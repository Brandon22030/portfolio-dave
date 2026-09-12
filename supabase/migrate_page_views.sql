-- Real page-view tracking for the admin dashboard.
-- No personal data is stored: only the visited path and a timestamp.

CREATE TABLE IF NOT EXISTS page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS page_views_created_at_idx ON page_views(created_at);
CREATE INDEX IF NOT EXISTS page_views_path_idx ON page_views(path);

ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public insert page_views" ON page_views;
DROP POLICY IF EXISTS "Auth read page_views" ON page_views;

-- Any visitor can log a page view.
CREATE POLICY "Public insert page_views" ON page_views FOR INSERT WITH CHECK (true);

-- Only the logged-in admin can read the raw data (same pattern as contacts).
CREATE POLICY "Auth read page_views" ON page_views FOR SELECT USING (auth.uid() IS NOT NULL);
