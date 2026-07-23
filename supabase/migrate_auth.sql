-- À exécuter dans Supabase > SQL Editor si les tables existent déjà
-- Cette migration restreint les écritures aux utilisateurs authentifiés.

-- Supprime les anciennes politiques publiques d'écriture
DROP POLICY IF EXISTS "Allow public insert on projects" ON projects;
DROP POLICY IF EXISTS "Allow public update on projects" ON projects;
DROP POLICY IF EXISTS "Allow public delete on projects" ON projects;

DROP POLICY IF EXISTS "Allow public insert on services" ON services;
DROP POLICY IF EXISTS "Allow public update on services" ON services;
DROP POLICY IF EXISTS "Allow public delete on services" ON services;

DROP POLICY IF EXISTS "Allow public insert on settings" ON settings;
DROP POLICY IF EXISTS "Allow public update on settings" ON settings;
DROP POLICY IF EXISTS "Allow public delete on settings" ON settings;

-- Lectures publiques (le site vitrine reste accessible sans login)
DROP POLICY IF EXISTS "Allow public read on projects" ON projects;
DROP POLICY IF EXISTS "Allow public read on services" ON services;
DROP POLICY IF EXISTS "Allow public read on settings" ON settings;

CREATE POLICY "Allow public read on projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read on services" ON services FOR SELECT USING (true);
CREATE POLICY "Allow public read on settings" ON settings FOR SELECT USING (true);

-- Écritures réservées aux utilisateurs connectés
CREATE POLICY "Allow authenticated insert on projects" ON projects FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated update on projects" ON projects FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated delete on projects" ON projects FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated insert on services" ON services FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated update on services" ON services FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated delete on services" ON services FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated insert on settings" ON settings FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated update on settings" ON settings FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated delete on settings" ON settings FOR DELETE USING (auth.uid() IS NOT NULL);

-- Active l'authentification par email/mot de passe si ce n'est pas déjà fait
-- (Côté Supabase UI : Authentication > Providers > Email)
