-- À exécuter dans Supabase > SQL Editor pour permettre l'upload des plans
-- techniques (Rez-de-chaussée, Étage supérieur, Coupe transversale,
-- Coupe longitudinale) depuis le dashboard admin, projet par projet.
-- Stocké comme { "Rez-de-chaussée": url, "Étage supérieur": url, ... }.

ALTER TABLE projects ADD COLUMN IF NOT EXISTS plans jsonb DEFAULT '{}'::jsonb;
