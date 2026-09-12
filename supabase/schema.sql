-- Exécute ce fichier dans l'éditeur SQL de Supabase (SQL Editor > New query)

-- Table des projets
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text NOT NULL,
  year text NOT NULL,
  color text NOT NULL,
  description text DEFAULT '',
  order_index int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS project_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  storage_path text NOT NULL UNIQUE,
  image_url text NOT NULL,
  alt_text text DEFAULT '',
  order_index int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Table des services
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  icon text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  order_index int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Table des paramètres / textes modifiables
CREATE TABLE IF NOT EXISTS settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Active la réplication temps réel (pour rafraîchir le site automatiquement)
ALTER TABLE projects REPLICA IDENTITY FULL;
ALTER TABLE project_images REPLICA IDENTITY FULL;
ALTER TABLE services REPLICA IDENTITY FULL;
ALTER TABLE settings REPLICA IDENTITY FULL;

-- Données par défaut
INSERT INTO projects (title, type, year, color, order_index) VALUES
('Résidence Individuelle R+1', 'Villa résidentielle', '2024', '#2A1F1A', 1),
('Complexe Sécurité Défense', 'Bâtiment institutionnel', '2024', '#1A2420', 2),
('Hotel Dayalor', 'Hôtellerie & tourisme', '2023', '#1F1A2A', 3),
('Hall de Réception', 'Salle d''événements', '2023', '#1A2020', 4),
('Villa Contemporaine', 'Résidence privée', '2023', '#2A1A1A', 5),
('Immeuble R+3', 'Habitat collectif', '2022', '#1A1F2A', 6);

INSERT INTO services (icon, title, description, order_index) VALUES
('📐', 'Plans 2D', 'Reproduction et conception de plans d''architecture conformes aux normes : façades, coupes, plans de masse.', 1),
('🏗️', 'Modélisation 3D', 'Maquettes numériques BIM sur Archicad - villas, hôtels, halls d''événements.', 2),
('✨', 'Rendu photoréaliste', 'Visualisations haute qualité avec Twinmotion et Artlantis pour présenter votre projet comme bâti.', 3),
('📋', 'Suivi de chantier', 'Rapports techniques, documentation de chantier et contrôle de conformité des ouvrages.', 4);

INSERT INTO settings (key, value) VALUES
('hero_subtitle', 'ARCHITECTE · TECHNICIEN BIM · COTONOU, BÉNIN'),
('hero_title', 'Des espaces pensés.|<span>Des projets réalisés.</span>'),
('hero_description', 'Du plan 2D au rendu photoréaliste - je transforme vos idées en projets architecturaux clairs, beaux et construits.'),
('about_label', 'À PROPOS'),
('about_title', 'L''architecte qui <span>décode</span> les maisons'),
('about_text1', 'Basé à Cotonou, je suis Dessinateur Projeteur Bâtiment et Technicien en Génie Civil, passionné par l''architecture africaine contemporaine.'),
('about_text2', 'Mon objectif : rendre l''architecture accessible, lisible et concrète - des villas résidentielles aux complexes hôteliers, chaque projet raconte une histoire.'),
('services_label', 'SERVICES'),
('services_title', 'Ce que je propose'),
('projects_label', 'RÉALISATIONS'),
('projects_title', 'Mes projets'),
('contact_label', 'CONTACT'),
('contact_title', 'Parlons de votre projet'),
('contact_description', 'Un projet en tête ? Une question ? Envoyez-moi un message, je reviens rapidement.');

-- Politiques RLS : lecture publique, écriture réservée aux utilisateurs authentifiés.
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert on projects" ON projects FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated update on projects" ON projects FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated delete on projects" ON projects FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow public read on project images" ON project_images FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert on project images" ON project_images FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated update on project images" ON project_images FOR UPDATE USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated delete on project images" ON project_images FOR DELETE USING (auth.uid() IS NOT NULL);

INSERT INTO storage.buckets (id, name, public) VALUES ('project-images', 'project-images', true);
CREATE POLICY "Public read project images" ON storage.objects FOR SELECT USING (bucket_id = 'project-images');
CREATE POLICY "Authenticated upload project images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'project-images' AND auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated update project images" ON storage.objects FOR UPDATE USING (bucket_id = 'project-images' AND auth.uid() IS NOT NULL) WITH CHECK (bucket_id = 'project-images' AND auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated delete project images" ON storage.objects FOR DELETE USING (bucket_id = 'project-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Allow public read on services" ON services FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert on services" ON services FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated update on services" ON services FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated delete on services" ON services FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow public read on settings" ON settings FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert on settings" ON settings FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated update on settings" ON settings FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated delete on settings" ON settings FOR DELETE USING (auth.uid() IS NOT NULL);
