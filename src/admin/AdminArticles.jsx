import { useState } from "react";
import AdminLayout from "./AdminLayout";
import { PageHeader, StatusPill, PrimaryButton, DarkButton, OutlineButton, Field, inputStyle, Card } from "./adminUI";
import { COLORS } from "../theme";
import { useArticles, useProjects, useContacts } from "../hooks/resources";
import { slugify } from "../utils/slugify";
import { supabase } from "../supabaseClient";

const CATEGORIES = ["Conception", "Processus", "Chantier", "Visualisation", "Matériaux"];
const EMPTY = { title: "", slug: "", category: CATEGORIES[0], date: "", cover_image_url: "/img/article-une.jpg", excerpt: "", content: "" };

export default function AdminArticles() {
  const { rows: articles, add, update } = useArticles();
  const { rows: projects } = useProjects();
  const { rows: contacts } = useContacts();

  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [uploading, setUploading] = useState(false);

  const visible = articles.filter((a) => a.title.toLowerCase().includes(search.toLowerCase()));

  const selectArticle = (a) => {
    setEditingId(a.slug);
    setForm({ title: a.title, slug: a.slug, category: a.category, date: a.date || "", cover_image_url: a.cover_image_url, excerpt: a.excerpt, content: a.content });
  };

  const newArticle = () => {
    setEditingId(null);
    setForm(EMPTY);
  };

  const handleCover = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const path = `articles/${crypto.randomUUID()}-${file.name}`;
      const { error: uploadError } = await supabase.storage.from("site-media").upload(path, file, { contentType: file.type });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from("site-media").getPublicUrl(path);
      setForm((f) => ({ ...f, cover_image_url: data.publicUrl }));
    } catch (err) {
      alert("Erreur d'import : " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const save = async (status) => {
    const slug = form.slug || slugify(form.title);
    const record = { ...form, slug, status, views: editingId ? undefined : 0 };
    if (editingId) {
      const existing = articles.find((a) => a.slug === editingId);
      await update(existing.id, record);
    } else {
      await add(record);
    }
    newArticle();
  };

  return (
    <AdminLayout active="Articles" counts={{ Projets: projects.length, Contacts: contacts.filter((c) => c.status === "Nouveau").length }}>
      <PageHeader
        title="Articles"
        actions={
          <>
            <input style={{ ...inputStyle, width: 220 }} placeholder="Rechercher…" value={search} onChange={(e) => setSearch(e.target.value)} />
            <PrimaryButton onClick={newArticle}>+ Nouvel article</PrimaryButton>
          </>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 420px", gap: 24 }}>
        <Card style={{ padding: 0, overflowX: "auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 110px 110px 90px 70px 60px", fontSize: 11, textTransform: "uppercase", letterSpacing: ".1em", color: COLORS.text3, padding: "14px 20px", borderBottom: `1px solid ${COLORS.adminHairline}` }}>
            <div>Titre</div>
            <div>Catégorie</div>
            <div>Date</div>
            <div>Statut</div>
            <div>Vues</div>
            <div />
          </div>
          {visible.map((a) => (
            <div key={a.slug} style={{ display: "grid", gridTemplateColumns: "1fr 110px 110px 90px 70px 60px", alignItems: "center", padding: "12px 20px", borderBottom: `1px solid ${COLORS.adminHairline}`, fontSize: 13 }}>
              <div style={{ fontWeight: 500 }}>{a.title}</div>
              <div style={{ color: COLORS.text1 }}>{a.category}</div>
              <div style={{ color: COLORS.text3 }}>{a.date || "-"}</div>
              <div>
                <StatusPill status={a.status} />
              </div>
              <div style={{ color: COLORS.text3 }}>{a.views ?? "-"}</div>
              <button onClick={() => selectArticle(a)} style={{ background: "none", border: "none", color: COLORS.terracotta, cursor: "pointer", fontSize: 13, padding: 0 }}>
                Éditer
              </button>
            </div>
          ))}
        </Card>

        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ fontWeight: 500 }}>{editingId ? articles.find((a) => a.slug === editingId)?.status : "Brouillon"}</div>
            <div style={{ fontSize: 12, color: COLORS.text3 }}>Enregistré il y a 2 min</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Field label="Titre">
              <input style={inputStyle} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </Field>
            <Field label="Slug">
              <input style={inputStyle} value={form.slug} placeholder={slugify(form.title)} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            </Field>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Field label="Catégorie">
                <select style={inputStyle} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Publication">
                <input style={inputStyle} placeholder="Date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </Field>
            </div>
            <Field label="Image de couverture">
              <label style={{ position: "relative", display: "block", aspectRatio: "16/9", overflow: "hidden", cursor: "pointer" }}>
                <img src={form.cover_image_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <span style={{ position: "absolute", bottom: 8, right: 8, background: COLORS.ink, color: COLORS.sand, fontSize: 11, padding: "6px 10px" }}>
                  {uploading ? "…" : "Changer"}
                </span>
                <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleCover} />
              </label>
            </Field>
            <Field label="Extrait">
              <textarea style={{ ...inputStyle, resize: "vertical" }} rows={3} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
            </Field>
            <Field label="Contenu">
              <div style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 12, color: COLORS.text3 }}>
                <span>B</span>
                <span style={{ fontStyle: "italic" }}>I</span>
                <span>H2</span>
                <span>H3</span>
                <span>" "</span>
                <span>▤</span>
                <span>⛶</span>
              </div>
              <textarea style={{ ...inputStyle, resize: "vertical" }} rows={6} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
            </Field>
            <div style={{ display: "flex", gap: 12 }}>
              <DarkButton onClick={() => save("Publié")}>Publier</DarkButton>
              <OutlineButton as="a" href={`/journal/${form.slug || slugify(form.title)}`} target="_blank" rel="noreferrer">
                Prévisualiser
              </OutlineButton>
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
