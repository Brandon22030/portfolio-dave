-- Exécute ce fichier dans le SQL Editor de Supabase (SQL Editor > New query)
-- Table utilisée par le cron centralisé (repo supabase-keepalive) pour garder
-- ce projet Supabase actif.

CREATE TABLE IF NOT EXISTS keep_alive (
  id int PRIMARY KEY DEFAULT 1,
  last_ping timestamptz DEFAULT now(),
  CONSTRAINT keep_alive_single_row CHECK (id = 1)
);

INSERT INTO keep_alive (id, last_ping) VALUES (1, now())
ON CONFLICT (id) DO NOTHING;

-- RLS activé, sans policy publique : seule la service_role key
-- (utilisée par supabase-keepalive) peut lire/écrire cette table.
ALTER TABLE keep_alive ENABLE ROW LEVEL SECURITY;
