-- Refonte Smart'Archi : nouveau schéma + données de la maquette.
-- Exécute ce fichier dans Supabase > SQL Editor (après schema.sql, migrate_auth.sql,
-- migrate_project_gallery.sql et migrate_keep_alive.sql, déjà en place).
-- ATTENTION : ce script vide et réinsère le contenu des tables projects/services
-- avec les nouvelles données de la maquette Smart'Archi.

-- ============ PROJECTS (colonnes étendues) ============
ALTER TABLE projects ADD COLUMN IF NOT EXISTS category text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS client_type text DEFAULT 'Projet freelance';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS surface text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS status text DEFAULT 'Publié';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS slug text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS cover_image_url text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS quote_text text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS quote_author text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS quote_role text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS lead text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS sheet jsonb DEFAULT '{}'::jsonb;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS softwares text[] DEFAULT '{}';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS gallery jsonb DEFAULT '[]'::jsonb;
CREATE UNIQUE INDEX IF NOT EXISTS projects_slug_key ON projects(slug);
ALTER TABLE projects DROP COLUMN IF EXISTS type;

TRUNCATE project_images, projects CASCADE;

INSERT INTO projects (title, slug, category, client_type, year, surface, status, color, cover_image_url, quote_text, quote_author, quote_role, lead, description, sheet, softwares, gallery, order_index) VALUES
('Résidence individuelle R+1', 'residence-r1', 'Résidentiel', 'Projet freelance', '2025', '~120 m² · 2 niveaux', 'Publié', '#2A1F1A', '/img/hero-residence-r1.jpg',
 'L''architecture commence lorsque vous placez soigneusement deux briques ensemble. Là, elle commence.', 'Ludwig Mies van der Rohe', 'architecte germano-américain',
 'Ce projet prouve qu''un terrain étroit ne signifie pas renoncer à une belle maison spacieuse. La solution : construire en hauteur plutôt qu''en largeur, en maximisant chaque mètre carré disponible.',
 E'L''architecture mélange trois matériaux : des murs blancs pour la fraîcheur, du bois naturel pour la chaleur, et du métal gris foncé pour les portes et fenêtres. L''étage avance légèrement au-dessus du rez-de-chaussée, créant une zone ombragée à l''entrée et donnant du caractère à la façade.\n\nAu rez-de-chaussée se trouvent le garage pour deux voitures et l''entrée principale. L''étage supérieur abrite les pièces de vie, avec un grand balcon protégé du soleil par des lames horizontales qui filtrent la lumière naturelle. À l''intérieur, les pièces sont organisées en profondeur pour capter la lumière des deux côtés et offrir des vues sur le jardin arrière.',
 '{"Type":"Projet freelance","Localisation":"Bénin","Année":"2025","Surface":"~120 m²","Bâtiment":"Maison familiale sur deux niveaux","Contexte":"Terrain urbain de faible largeur","Matériaux":"Murs blancs, bois naturel, métal gris foncé","Livrables":"Plans, coupes, rendus 3D"}',
 ARRAY['Archicad','Twinmotion','Photoshop'],
 '[{"url":"/img/salon-r1.jpg","caption":"Vue sur la façade principale"},{"url":"/img/salon-cadres.jpg","caption":"Vue en angle"},{"url":"/img/salon-escalier.jpg","caption":"Vue nocturne, façade principale"},{"url":"/img/facade-lames.jpg","caption":"Vue sur la façade latérale gauche"},{"url":"/img/facade-nuit.jpg","caption":"Vue nocturne, façade latérale gauche"},{"url":"/img/facade-vitree.jpg","caption":"Vue intérieure"}]',
 1),

('Complexe résidentiel', 'complexe-residentiel', 'Collectif', 'Projet freelance', '2025', '9 studios · ~27 m² chacun', 'Publié', '#1A2420', '/img/hero-accueil.jpg',
 'Le vrai luxe, c''est l''espace, la lumière et le calme.', 'Jean-Michel Wilmotte', 'architecte français',
 'Neuf studios indépendants sur un même terrain, sans sacrifier la lumière, l''intimité ni la ventilation naturelle de chaque logement.',
 E'Neuf studios organisés autour d''une cour commune plantée, pensés pour la location courte durée. Chaque logement dispose d''un accès indépendant et d''une orientation étudiée pour limiter l''exposition directe au soleil de l''après-midi.\n\nLa structure en R+1 optimise un terrain de forme irrégulière tout en gardant une circulation commune généreuse et ventilée naturellement.',
 '{"Type":"Projet freelance","Localisation":"Bénin","Année":"2025","Surface":"9 studios · ~27 m² chacun","Bâtiment":"Habitat collectif en R+1","Contexte":"Terrain irrégulier à usage locatif","Matériaux":"Enduit taloché, toiture bac acier, menuiseries aluminium","Livrables":"Plans, coupes, rendus 3D"}',
 ARRAY['Archicad','Revit','Twinmotion'],
 '[{"url":"/img/hero-accueil.jpg","caption":"Vue d''ensemble de la cour"},{"url":"/img/salon-cadres.jpg","caption":"Circulation commune"}]',
 2),

('Villa de prestige', 'villa-de-prestige', 'Résidentiel', 'Projet freelance', '2025', '~180 m² · RDC + toiture terrasse', 'Publié', '#1F1A2A', '/img/villa-piscine.jpg',
 'L''architecture doit améliorer la qualité de vie.', 'Tadao Andō', 'architecte japonais',
 'Une villa de plain-pied construite autour de l''eau, où chaque pièce de vie donne directement sur la piscine.',
 E'Une villa de plain-pied organisée autour d''une piscine centrale, avec une toiture terrasse accessible offrant un point de vue dégagé. Les grandes baies vitrées effacent la frontière entre les pièces de vie et l''extérieur.\n\nLe plan distribue les chambres à l''écart des espaces recevant les invités, tout en gardant une vue sur l''eau depuis chaque pièce principale.',
 '{"Type":"Projet freelance","Localisation":"Bénin","Année":"2025","Surface":"~180 m²","Bâtiment":"Villa de plain-pied avec toiture terrasse","Contexte":"Terrain résidentiel avec piscine","Matériaux":"Pierre naturelle, verre, bois exotique","Livrables":"Plans, coupes, rendus 3D"}',
 ARRAY['Archicad','Twinmotion','Lumion'],
 '[{"url":"/img/villa-piscine.jpg","caption":"Vue sur la piscine"},{"url":"/img/facade-lames.jpg","caption":"Façade principale"}]',
 3),

('Villa contemporaine R+2', 'villa-contemporaine-r2', 'Résidentiel', 'Projet freelance', '2025', 'R+1 + toiture terrasse', 'Publié', '#2A1A1A', '/img/facade-lames.jpg',
 'L''architecture doit naître du lieu, du climat et de la vie de ceux qui l''habitent.', 'Francis Kéré', 'architecte burkinabé',
 'Une façade filtrante en béton qui protège du soleil sans fermer la maison sur elle-même.',
 E'Une façade rythmée par des lames verticales en béton qui filtrent le soleil tout en laissant circuler l''air. La toiture terrasse accessible prolonge l''espace de vie vers l''extérieur.\n\nLe rez-de-chaussée regroupe les espaces communs, l''étage les chambres, orientées pour capter les vents dominants et limiter le recours à la climatisation.',
 '{"Type":"Projet freelance","Localisation":"Bénin","Année":"2025","Surface":"R+1 + toiture terrasse","Bâtiment":"Villa contemporaine sur deux niveaux","Contexte":"Terrain résidentiel exposé plein sud","Matériaux":"Béton brut, lames verticales, verre","Livrables":"Plans, coupes, rendus 3D"}',
 ARRAY['Archicad','AutoCAD','Twinmotion'],
 '[{"url":"/img/facade-lames.jpg","caption":"Façade filtrante"},{"url":"/img/facade-nuit.jpg","caption":"Vue nocturne"}]',
 4),

('Couvent traditionnel', 'couvent-traditionnel', 'Patrimoine', 'Projet freelance', '2025', 'Toiture pyramidale en chaume', 'Publié', '#1A1F2A', '/img/citation-accueil.jpg',
 'L''architecture est l''expression des valeurs d''un peuple dans l''espace.', 'David Adjaye', 'architecte ghanéen',
 'Un relevé fidèle et un renforcement discret, au service d''un patrimoine bâti en terre et en chaume.',
 E'Un couvent traditionnel dont la toiture pyramidale en chaume et la structure en terre respectent les techniques constructives locales, tout en intégrant des relevés précis pour la restauration.\n\nLe projet documente l''existant et propose un renforcement structurel discret, sans dénaturer l''aspect patrimonial du bâtiment.',
 '{"Type":"Projet freelance","Localisation":"Bénin","Année":"2025","Surface":"Toiture pyramidale en chaume","Bâtiment":"Édifice patrimonial traditionnel","Contexte":"Restauration d''un bâtiment existant","Matériaux":"Terre, chaume, bois local","Livrables":"Relevés, plans, rendus 3D"}',
 ARRAY['Archicad','AutoCAD'],
 '[{"url":"/img/citation-accueil.jpg","caption":"Vue d''ensemble"},{"url":"/img/salon-escalier.jpg","caption":"Détail structurel"}]',
 5),

('Villa résidentielle', 'villa-residentielle', 'Résidentiel', 'Projet freelance', '2025', 'Plain-pied · cour intérieure & piscine', 'Brouillon', '#1A2020', '/img/facade-nuit.jpg',
 'La cour intérieure n''est pas un luxe en Afrique, c''est une nécessité culturelle et climatique. C''est l''espace qui respire à la place de la maison.', 'Mariam Kamara', 'architecte nigérienne',
 'Un plan en U replié sur une cour intérieure, pour vivre dehors sans jamais quitter chez soi.',
 E'Une villa organisée autour d''une cour intérieure qui distribue la lumière et la ventilation à toutes les pièces, avec une petite piscine en son centre.\n\nLe plan en U protège la cour des regards extérieurs tout en gardant les espaces de vie ouverts sur cet espace central.',
 '{"Type":"Projet freelance","Localisation":"Bénin","Année":"2025","Surface":"Plain-pied avec cour intérieure","Bâtiment":"Villa en plan U","Contexte":"Terrain résidentiel clos","Matériaux":"Murs enduits, bois, métal","Livrables":"Plans, coupes, rendus 3D"}',
 ARRAY['Archicad','Twinmotion'],
 '[{"url":"/img/facade-nuit.jpg","caption":"Cour intérieure et piscine"}]',
 6);

-- ============ SERVICES (colonnes étendues) ============
ALTER TABLE services ADD COLUMN IF NOT EXISTS numeral text;
ALTER TABLE services ADD COLUMN IF NOT EXISTS label text;
ALTER TABLE services ADD COLUMN IF NOT EXISTS span int DEFAULT 2;
ALTER TABLE services ADD COLUMN IF NOT EXISTS bg_color text DEFAULT '#14120f';
ALTER TABLE services ADD COLUMN IF NOT EXISTS fg_color text DEFAULT '#efe9df';
ALTER TABLE services ADD COLUMN IF NOT EXISTS numeral_color text DEFAULT '#d9855f';

TRUNCATE services;
INSERT INTO services (numeral, title, label, description, span, bg_color, fg_color, numeral_color, icon, order_index) VALUES
('01', 'Conception architecturale', 'Esquisses · APS/APD · PC', 'Étude de faisabilité, esquisses, avant-projet et dossier de permis de construire. Chaque proposition est testée en 3D dès l''esquisse.', 4, '#14120f', '#efe9df', '#d9855f', '', 1),
('02', 'Dessin technique', 'EXE · détails · carnets', 'Plans d''exécution, coupes, façades, détails constructifs et carnets de menuiseries.', 2, '#b4532a', '#efe9df', '#efe9df', '', 2),
('03', 'Dossier de permis', 'PC · devis · métrés', 'Constitution du dossier de permis de construire, devis quantitatif et estimatif, pièces graphiques et écrites.', 2, '#cfc8bc', '#14120f', '#b4532a', '', 3),
('04', 'Visualisation 3D', 'Rendus HD · vidéo · visite', 'Rendus photoréalistes, vues aériennes et animations pour présenter, vendre ou financer.', 2, '#ffffff', '#14120f', '#b4532a', '', 4),
('05', 'Assistance technique', 'Relevés · CR · DOE', 'Relevés d''existant, vérification de dossiers, suivi de chantier et plans conformes à l''exécution.', 2, '#14120f', '#efe9df', '#d9855f', '', 5);

-- ============ TIMELINE (Parcours) ============
CREATE TABLE IF NOT EXISTS timeline_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  years text NOT NULL,
  kind text NOT NULL,
  title text NOT NULL,
  place text NOT NULL,
  description text NOT NULL,
  order_index int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE timeline_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_entries REPLICA IDENTITY FULL;
DROP POLICY IF EXISTS "Public read timeline" ON timeline_entries;
DROP POLICY IF EXISTS "Auth write timeline" ON timeline_entries;
CREATE POLICY "Public read timeline" ON timeline_entries FOR SELECT USING (true);
CREATE POLICY "Auth write timeline" ON timeline_entries FOR ALL USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

TRUNCATE timeline_entries;
INSERT INTO timeline_entries (years, kind, title, place, description, order_index) VALUES
('Août 2025 - auj.', 'Agence', 'Dessinateur projeteur bâtiment - OBA Architectes et Associés', 'Akpakpa, Ségbèya - Cotonou', 'Conception architecturale et élaboration de plans techniques avec Archicad et Revit. Réalisation de modèles 3D et rendus photoréalistes pour la présentation de projets. Suivi de chantier et coordination avec les équipes techniques.', 1),
('Jan. - Avr. 2025', 'Stage pratique', 'Bureau d''Études Structures et Conseils Génie Civil (ECCO-GC)', 'Calavi, Bénin', 'Suivi et contrôle des travaux du Complexe Défense Sécurité d''Abomey-Calavi (CDSA). Projet de fin d''études : étude et suivi de la réalisation d''une bâche à eau pour le Complexe Administratif d''Abomey-Calavi.', 2),
('Août - Sept. 2024', 'Stage académique', 'Studio d''Architecture et d''Aménagement du Patrimoine (S2AP)', 'Zogbo, Bénin', 'Conception architecturale et plans techniques. Suivi des travaux du Palais Royal HONMÈ à Porto-Novo.', 3),
('Juil. - Août 2023', 'Stage d''immersion', 'Cabinet MODULOR ARCHI URBA', 'Gbégamey, Bénin', 'Maîtrise d''Archicad, AutoCAD et Artlantis. Conception des plans d''un R+2 résidentiel, permis de construire et rendu 3D.', 4),
('2022 - 2025', 'Formation', 'Licence professionnelle en Génie Civil', 'École Supérieure de Génie Civil VERECHAGUINE AK (ESGC-VAK), Gbégamey', 'Technicien supérieur en génie civil : structure, construction, dessin assisté par ordinateur.', 5),
('2018 - 2021', 'Formation', 'Diplôme Technique de Dessinateur et Projeteur en Bâtiments (DPB)', 'Complexe scolaire Jean-Michel LE FAUCON, Calavi', 'Baccalauréat série F4, mention assez bien, obtenu en parallèle.', 6),
('2018 - 2020', 'Formation', 'CAP Bâtiment et Travaux Publics', 'Complexe scolaire Jean-Michel LE FAUCON, Calavi', 'Certificat d''Aptitude Professionnelle en BTP.', 7);

-- ============ SKILLS ============
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  t text NOT NULL,
  lvl text NOT NULL,
  w text NOT NULL,
  order_index int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills REPLICA IDENTITY FULL;
DROP POLICY IF EXISTS "Public read skills" ON skills;
DROP POLICY IF EXISTS "Auth write skills" ON skills;
CREATE POLICY "Public read skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Auth write skills" ON skills FOR ALL USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

TRUNCATE skills;
INSERT INTO skills (t, lvl, w, order_index) VALUES
('Conception architecturale', 'Expert', '92%', 1),
('Dessin technique & DCE', 'Expert', '95%', 2),
('Constitution de dossier de permis', 'Avancé', '85%', 3),
('Visualisation 3D & rendu', 'Avancé', '80%', 4),
('Devis quantitatif et estimatif', 'Avancé', '78%', 5),
('Suivi de chantier & coordination', 'Confirmé', '70%', 6);

-- ============ SOFTWARES ============
CREATE TABLE IF NOT EXISTS softwares (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  n text NOT NULL,
  u text NOT NULL,
  "logoSlug" text,
  mark text,
  order_index int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE softwares ENABLE ROW LEVEL SECURITY;
ALTER TABLE softwares REPLICA IDENTITY FULL;
DROP POLICY IF EXISTS "Public read softwares" ON softwares;
DROP POLICY IF EXISTS "Auth write softwares" ON softwares;
CREATE POLICY "Public read softwares" ON softwares FOR SELECT USING (true);
CREATE POLICY "Auth write softwares" ON softwares FOR ALL USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

TRUNCATE softwares;
INSERT INTO softwares (n, u, "logoSlug", mark, order_index) VALUES
('Archicad', 'Conception, plans, nomenclatures', 'archicad', NULL, 1),
('Revit', 'Modélisation, plans techniques', 'autodeskrevit', NULL, 2),
('AutoCAD', 'Dessin 2D, détails', 'autocad', NULL, 3),
('SketchUp', 'Volumétrie rapide', 'sketchup', NULL, 4),
('Twinmotion', 'Rendus temps réel, vidéo', 'twinmotion', NULL, 5),
('Lumion', 'Rendus photoréalistes', NULL, 'Lu', 6),
('Photoshop', 'Post-production', NULL, 'Ps', 7),
('Artlantis', 'Rendus, premiers projets', NULL, 'Ar', 8);

-- ============ ARTICLES (Journal) ============
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  category text NOT NULL,
  date text,
  excerpt text,
  content text,
  cover_image_url text,
  status text DEFAULT 'Brouillon',
  views int,
  featured boolean DEFAULT false,
  order_index int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles REPLICA IDENTITY FULL;
DROP POLICY IF EXISTS "Public read articles" ON articles;
DROP POLICY IF EXISTS "Auth write articles" ON articles;
CREATE POLICY "Public read articles" ON articles FOR SELECT USING (true);
CREATE POLICY "Auth write articles" ON articles FOR ALL USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

TRUNCATE articles;
INSERT INTO articles (title, slug, category, date, excerpt, content, cover_image_url, status, views, featured, order_index) VALUES
('Construire en hauteur sur un terrain étroit : la Résidence R+1', 'residence-r1-terrain-etroit', 'Conception', '12 août 2026',
 'Un terrain étroit ne signifie pas renoncer à une maison spacieuse. Retour sur une résidence de ~120 m² dessinée en hauteur plutôt qu''en largeur, mètre carré par mètre carré.',
 'Un terrain étroit ne signifie pas renoncer à une maison spacieuse. Retour sur une résidence de ~120 m² dessinée en hauteur plutôt qu''en largeur, mètre carré par mètre carré. Le rez-de-chaussée regroupe le garage et l''entrée, l''étage concentre les pièces de vie autour d''un grand balcon filtré par des lames horizontales.',
 '/img/article-une.jpg', 'Publié', 1240, true, 1),

('De l''esquisse au permis : les cinq étapes d''une villa à Cotonou', 'esquisse-au-permis-cinq-etapes', 'Processus', '3 juil. 2026',
 'Ce que le client voit, ce qu''il ne voit pas, et où se joue la qualité du projet.',
 'Ce que le client voit, ce qu''il ne voit pas, et où se joue la qualité du projet : de l''écoute du terrain au dossier de permis, chaque étape conditionne la suivante.',
 '/img/salon-r1.jpg', 'Publié', 860, false, 2),

('Relever un existant sans plan d''origine', 'relever-existant-sans-plan', 'Chantier', '19 mai 2026',
 'Méthode, outils et pièges d''un relevé de maison des années 80.',
 'Méthode, outils et pièges d''un relevé de maison des années 80, quand aucun plan d''origine n''a survécu.',
 '/img/salon-cadres.jpg', 'Publié', 540, false, 3),

('Twinmotion ou Lumion pour un rendu de présentation ?', 'twinmotion-ou-lumion', 'Visualisation', '2 avr. 2026',
 'Comparatif sur un vrai projet : temps, qualité de lumière, animation.',
 'Comparatif sur un vrai projet : temps, qualité de lumière, animation. Deux moteurs, deux flux de travail, un même objectif : convaincre avant de construire.',
 '/img/salon-escalier.jpg', 'Publié', 1020, false, 4),

('Construire en briques de terre comprimée au Bénin', 'briques-terre-comprimee-benin', 'Matériaux', NULL,
 'Un matériau local, économe et thermiquement performant. Retour sur trois chantiers.',
 'La brique de terre comprimée (BTC) est produite à quelques kilomètres du chantier…',
 '/img/vision-apropos.jpg', 'Brouillon', NULL, false, 5);

-- ============ CONTACTS ============
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  project_type text,
  message text,
  received text,
  status text DEFAULT 'Nouveau',
  internal_note text DEFAULT '',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts REPLICA IDENTITY FULL;
DROP POLICY IF EXISTS "Public insert contacts" ON contacts;
DROP POLICY IF EXISTS "Auth read contacts" ON contacts;
DROP POLICY IF EXISTS "Auth update contacts" ON contacts;
CREATE POLICY "Public insert contacts" ON contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth read contacts" ON contacts FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth update contacts" ON contacts FOR UPDATE USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

TRUNCATE contacts;
INSERT INTO contacts (name, email, phone, project_type, message, received, status, created_at) VALUES
('Aurèle Hounkpatin', 'a.hounkpatin@gmail.com', '+229 97 00 00 00', 'Résidentiel', 'Bonjour, je possède une parcelle de 600 m² à Abomey-Calavi et souhaite construire une villa R+1 avec 4 chambres. Pouvez-vous m''accompagner du permis au chantier ? Budget indicatif : 45 M FCFA.', '10 sept.', 'Nouveau', now() - interval '1 day'),
('SOGEA Bénin', 'projets@sogea.bj', '+229 21 00 00 00', 'Dossier de permis', 'Nous cherchons un prestataire pour constituer le dossier de permis d''un immeuble R+4 à partir de plans existants.', '9 sept.', 'Nouveau', now() - interval '2 days'),
('Mairie de Ouidah', 'urbanisme@ouidah.bj', '+229 21 34 00 00', 'Institutionnel', 'Demande de devis pour l''extension de l''école primaire (3 salles de classe).', '6 sept.', 'Répondu', now() - interval '5 days'),
('Chantal Dossou', 'chantal.d@yahoo.fr', '+229 96 00 00 00', 'Rénovation', 'Rénovation d''une maison familiale à Akpakpa, toiture et façade.', '2 sept.', 'Répondu', now() - interval '9 days'),
('Immo Atlantique', 'contact@immoatlantique.bj', '+229 95 00 00 00', 'Visualisation 3D', 'Rendus 3D pour une plaquette commerciale de 12 villas.', '28 août', 'Archivé', now() - interval '14 days');

-- ============ MEDIA (médiathèque admin) ============
CREATE TABLE IF NOT EXISTS media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text NOT NULL,
  url text NOT NULL,
  storage_path text,
  size_bytes bigint,
  folder text DEFAULT 'Galeries',
  order_index int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE media REPLICA IDENTITY FULL;
DROP POLICY IF EXISTS "Public read media" ON media;
DROP POLICY IF EXISTS "Auth write media" ON media;
CREATE POLICY "Public read media" ON media FOR SELECT USING (true);
CREATE POLICY "Auth write media" ON media FOR ALL USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

INSERT INTO storage.buckets (id, name, public)
VALUES ('site-media', 'site-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public read site media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated upload site media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated update site media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated delete site media" ON storage.objects;
CREATE POLICY "Public read site media" ON storage.objects FOR SELECT USING (bucket_id = 'site-media');
CREATE POLICY "Authenticated upload site media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'site-media' AND auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated update site media" ON storage.objects FOR UPDATE USING (bucket_id = 'site-media' AND auth.uid() IS NOT NULL) WITH CHECK (bucket_id = 'site-media' AND auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated delete site media" ON storage.objects FOR DELETE USING (bucket_id = 'site-media' AND auth.uid() IS NOT NULL);

-- ============ SEO PAGES ============
CREATE TABLE IF NOT EXISTS seo_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key text UNIQUE NOT NULL,
  label text NOT NULL,
  title text NOT NULL,
  description text DEFAULT '',
  keywords text[] DEFAULT '{}',
  og_image_url text,
  canonical_url text,
  ok boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE seo_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_pages REPLICA IDENTITY FULL;
DROP POLICY IF EXISTS "Public read seo_pages" ON seo_pages;
DROP POLICY IF EXISTS "Auth write seo_pages" ON seo_pages;
CREATE POLICY "Public read seo_pages" ON seo_pages FOR SELECT USING (true);
CREATE POLICY "Auth write seo_pages" ON seo_pages FOR ALL USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

TRUNCATE seo_pages;
INSERT INTO seo_pages (page_key, label, title, description, keywords, og_image_url, canonical_url, ok) VALUES
('accueil', 'Accueil', 'Smart''Archi - Dessinateur projeteur bâtiment à Cotonou · 3D', 'Bennett David Medehou, dessinateur projeteur bâtiment à Cotonou : conception, plans techniques, permis, visualisation 3D.', ARRAY['architecte cotonou','bim bénin','plan de maison','rendu 3d'], '/img/hero-accueil.jpg', 'https://smartarchi.bj/', true),
('projets', 'Projets', 'Projets d''architecture au Bénin - Smart''Archi', 'Résidences, villas, complexe résidentiel et couvent traditionnel conçus et dessinés au Bénin.', ARRAY[]::text[], '/img/hero-accueil.jpg', 'https://smartarchi.bj/projets', true),
('services', 'Services', 'Services : conception, permis, rendus 3D - Smart''Archi', '', ARRAY[]::text[], '/img/hero-accueil.jpg', 'https://smartarchi.bj/services', false),
('contact', 'Contact', 'Contact - Smart''Archi Cotonou', 'Décrivez votre projet, réponse sous 48 h.', ARRAY[]::text[], '/img/hero-accueil.jpg', 'https://smartarchi.bj/contact', true);
