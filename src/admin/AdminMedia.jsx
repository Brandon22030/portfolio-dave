import { useState } from "react";
import AdminLayout from "./AdminLayout";
import { PageHeader, PrimaryButton, OutlineButton, inputStyle } from "./adminUI";
import { COLORS } from "../theme";
import { useMedia, useProjects, useContacts } from "../hooks/resources";
import { supabase } from "../supabaseClient";

const FOLDERS = ["Tous", "Projets", "Galeries", "Plans & PDF", "Blog"];
const SORTS = ["Ordre manuel", "Plus récent", "Nom", "Poids"];

function formatSize(bytes) {
  if (!bytes) return "-";
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} Mo`;
}

export default function AdminMedia() {
  const { rows: media, add, remove } = useMedia();
  const { rows: projects } = useProjects();
  const { rows: contacts } = useContacts();

  const [folder, setFolder] = useState("Tous");
  const [sort, setSort] = useState(SORTS[0]);
  const [selected, setSelected] = useState([]);
  const [uploading, setUploading] = useState(false);

  const counts = FOLDERS.reduce((acc, f) => {
    acc[f] = f === "Tous" ? media.length : media.filter((m) => m.folder === f).length;
    return acc;
  }, {});

  let visible = folder === "Tous" ? media : media.filter((m) => m.folder === folder);
  if (sort === "Plus récent") visible = [...visible].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  if (sort === "Nom") visible = [...visible].sort((a, b) => a.filename.localeCompare(b.filename));
  if (sort === "Poids") visible = [...visible].sort((a, b) => (b.size_bytes || 0) - (a.size_bytes || 0));

  const toggleSelect = (id) => setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));

  const handleUpload = async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      for (const file of files) {
        const path = `${crypto.randomUUID()}-${file.name}`;
        const { error: uploadError } = await supabase.storage.from("site-media").upload(path, file, { contentType: file.type });
        if (uploadError) throw uploadError;
        const { data: publicUrl } = supabase.storage.from("site-media").getPublicUrl(path);
        await add({ filename: file.name, url: publicUrl.publicUrl, storage_path: path, size_bytes: file.size, folder: "Galeries" });
      }
    } catch (err) {
      alert("Erreur d'import : " + err.message);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const deleteSelected = async () => {
    for (const id of selected) {
      const item = media.find((m) => m.id === id);
      if (item?.storage_path) await supabase.storage.from("site-media").remove([item.storage_path]);
      await remove(id);
    }
    setSelected([]);
  };

  return (
    <AdminLayout active="Médias" counts={{ Projets: projects.length, Contacts: contacts.filter((c) => c.status === "Nouveau").length }}>
      <PageHeader
        title="Médias"
        actions={
          <>
            <OutlineButton>Nouvelle galerie</OutlineButton>
            <label>
              <PrimaryButton as="span">{uploading ? "Import…" : "↑ Importer"}</PrimaryButton>
              <input type="file" multiple accept="image/*" style={{ display: "none" }} onChange={handleUpload} />
            </label>
          </>
        }
      />

      <label
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: `1px dashed ${COLORS.terracotta}`,
          background: COLORS.adminHighlight,
          padding: 24,
          marginBottom: 24,
          cursor: "pointer",
        }}
      >
        <div>
          <div style={{ fontWeight: 500, color: COLORS.terracotta }}>Glissez vos images, PDF ou vidéos ici</div>
          <div style={{ fontSize: 13, color: COLORS.text3, marginTop: 4 }}>Import multiple · compression automatique WebP · 20 Mo max par fichier</div>
        </div>
        <input type="file" multiple accept="image/*" style={{ display: "none" }} onChange={handleUpload} />
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
          Compression auto
          <div style={{ width: 34, height: 18, borderRadius: 10, background: COLORS.terracotta, position: "relative" }}>
            <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, right: 2 }} />
          </div>
        </div>
      </label>

      <div style={{ display: "grid", gridTemplateColumns: "200px minmax(0,1fr)", gap: 24 }}>
        <div style={{ fontSize: 13 }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".1em", color: COLORS.text3, marginBottom: 10 }}>Dossiers</div>
          {FOLDERS.map((f) => (
            <button
              key={f}
              onClick={() => setFolder(f)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                textAlign: "left",
                padding: "10px 12px",
                marginBottom: 4,
                background: folder === f ? COLORS.adminCard : "transparent",
                border: folder === f ? `1px solid ${COLORS.adminBorder}` : "1px solid transparent",
                fontWeight: folder === f ? 500 : 400,
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: 13,
              }}
            >
              <span>{f}</span>
              <span>{counts[f]}</span>
            </button>
          ))}
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".1em", color: COLORS.text3, margin: "20px 0 10px" }}>Trier</div>
          <select style={inputStyle} value={sort} onChange={(e) => setSort(e.target.value)}>
            {SORTS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, fontSize: 13 }}>
            <div style={{ color: COLORS.text3 }}>
              {visible.length} éléments · {selected.length} sélectionnés
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              <button style={{ background: "none", border: "none", color: COLORS.ink, cursor: "pointer" }}>Déplacer</button>
              <button style={{ background: "none", border: "none", color: COLORS.ink, cursor: "pointer" }}>Ajouter à une galerie</button>
              <button onClick={deleteSelected} style={{ background: "none", border: "none", color: COLORS.terracotta, cursor: "pointer" }}>
                Supprimer
              </button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
            {visible.map((m) => (
              <div key={m.id} style={{ position: "relative" }}>
                <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", background: COLORS.taupe }}>
                  <img src={m.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <input type="checkbox" checked={selected.includes(m.id)} onChange={() => toggleSelect(m.id)} style={{ position: "absolute", top: 8, left: 8 }} />
                  <div style={{ position: "absolute", top: 8, right: 8, background: COLORS.sand, fontSize: 10, textTransform: "uppercase", padding: "3px 6px" }}>{m.folder}</div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginTop: 6 }}>
                  <span style={{ fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.filename}</span>
                  <span style={{ color: COLORS.text3, flexShrink: 0, marginLeft: 6 }}>{formatSize(m.size_bytes)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
