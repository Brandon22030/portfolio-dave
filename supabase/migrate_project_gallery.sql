-- À exécuter dans Supabase > SQL Editor pour activer les pages projet et la galerie d'images.

ALTER TABLE projects ADD COLUMN IF NOT EXISTS description text DEFAULT '';

CREATE TABLE IF NOT EXISTS project_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  storage_path text NOT NULL UNIQUE,
  image_url text NOT NULL,
  alt_text text DEFAULT '',
  order_index int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images REPLICA IDENTITY FULL;

DROP POLICY IF EXISTS "Allow public read on project images" ON project_images;
DROP POLICY IF EXISTS "Allow authenticated insert on project images" ON project_images;
DROP POLICY IF EXISTS "Allow authenticated update on project images" ON project_images;
DROP POLICY IF EXISTS "Allow authenticated delete on project images" ON project_images;

CREATE POLICY "Allow public read on project images" ON project_images FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert on project images" ON project_images FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated update on project images" ON project_images FOR UPDATE USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated delete on project images" ON project_images FOR DELETE USING (auth.uid() IS NOT NULL);

INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public read project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated upload project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated update project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated delete project images" ON storage.objects;

CREATE POLICY "Public read project images" ON storage.objects FOR SELECT USING (bucket_id = 'project-images');
CREATE POLICY "Authenticated upload project images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'project-images' AND auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated update project images" ON storage.objects FOR UPDATE USING (bucket_id = 'project-images' AND auth.uid() IS NOT NULL) WITH CHECK (bucket_id = 'project-images' AND auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated delete project images" ON storage.objects FOR DELETE USING (bucket_id = 'project-images' AND auth.uid() IS NOT NULL);
