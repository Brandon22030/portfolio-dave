-- Ajoute la gestion complète des logiciels (page À propos) depuis l'admin.
-- Sans risque à rejouer : n'ajoute qu'une colonne, ne touche à aucune donnée.
-- (Contrairement à migrate_smartarchi.sql, qui vide et réinsère ses tables -
-- ne le relance pas après avoir ajouté des logiciels depuis le dashboard,
-- sous peine de perdre les ajouts.)

ALTER TABLE softwares ADD COLUMN IF NOT EXISTS logo_url text;
