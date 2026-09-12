import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { PageHeader, DarkButton, Field, inputStyle, Card } from "./adminUI";
import { COLORS } from "../theme";
import { useSeoPages, useProjects, useContacts } from "../hooks/resources";
import { supabase } from "../supabaseClient";

const TABS = ["SEO par page", "Général", "Réseaux", "Compte"];

export default function AdminSeo() {
  const { rows: pages, update } = useSeoPages();
  const { rows: projects } = useProjects();
  const { rows: contacts } = useContacts();

  const [tab, setTab] = useState(TABS[0]);
  const [selectedKey, setSelectedKey] = useState(null);
  const [form, setForm] = useState(null);
  const [newKeyword, setNewKeyword] = useState("");
  const [coverUploading, setCoverUploading] = useState(false);

  const selected = pages.find((p) => p.page_key === selectedKey) || pages[0];

  useEffect(() => {
    if (selected) setForm({ title: selected.title, description: selected.description, keywords: selected.keywords || [], og_image_url: selected.og_image_url, canonical_url: selected.canonical_url });
  }, [selected?.page_key]);

  if (!form) return null;

  const missingDescCount = pages.filter((p) => !p.description).length;

  const save = async () => {
    await update(selected.id, form);
  };

  const addKeyword = () => {
    if (!newKeyword.trim()) return;
    setForm((f) => ({ ...f, keywords: [...f.keywords, newKeyword.trim()] }));
    setNewKeyword("");
  };

  const handleCover = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverUploading(true);
    try {
      const path = `seo/${crypto.randomUUID()}-${file.name}`;
      const { error: uploadError } = await supabase.storage.from("site-media").upload(path, file, { contentType: file.type });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from("site-media").getPublicUrl(path);
      setForm((f) => ({ ...f, og_image_url: data.publicUrl }));
    } finally {
      setCoverUploading(false);
    }
  };

  return (
    <AdminLayout active="SEO & paramètres" counts={{ Projets: projects.length, Contacts: contacts.filter((c) => c.status === "Nouveau").length }}>
      <PageHeader
        title="SEO & paramètres"
        actions={TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              fontSize: 13,
              padding: "9px 16px",
              background: tab === t ? COLORS.ink : COLORS.adminCard,
              color: tab === t ? COLORS.sand : COLORS.ink,
              border: tab === t ? "none" : `1px solid ${COLORS.adminBorder}`,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {t}
          </button>
        ))}
      />

      {tab !== "SEO par page" ? (
        <Card>
          <div style={{ color: COLORS.text3, fontSize: 13 }}>Réglages « {tab} » à venir.</div>
        </Card>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "300px minmax(0,1fr)", gap: 24 }}>
          <Card style={{ padding: 0 }}>
            <div style={{ fontWeight: 500, padding: "16px 20px", borderBottom: `1px solid ${COLORS.adminHairline}` }}>Pages</div>
            {pages.map((p) => (
              <div
                key={p.page_key}
                onClick={() => setSelectedKey(p.page_key)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px 20px",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 500,
                  background: selected?.page_key === p.page_key ? COLORS.adminHighlight : "transparent",
                  borderBottom: `1px solid ${COLORS.adminHairline}`,
                }}
              >
                <span>{p.label}</span>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: p.ok ? COLORS.successText : COLORS.terracotta }} />
              </div>
            ))}
            <div style={{ padding: "14px 20px", fontSize: 12, color: COLORS.text3 }}>Les projets et articles ont leurs propres champs SEO dans leur fiche.</div>
          </Card>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <Card>
              <Field label={`Titre SEO - ${form.title.length} / 60 caractères`}>
                <input style={inputStyle} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </Field>
              <div style={{ height: 14 }} />
              <Field label={`Description Google - ${form.description.length} / 160 caractères`}>
                <textarea style={{ ...inputStyle, resize: "vertical" }} rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </Field>
              <div style={{ height: 14 }} />
              <Field label="Mots-clés">
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {form.keywords.map((k) => (
                    <span key={k} style={{ fontSize: 12, padding: "6px 10px", background: COLORS.adminHairline }}>
                      {k}
                    </span>
                  ))}
                  <input style={{ ...inputStyle, width: 140 }} placeholder="+ ajouter" value={newKeyword} onChange={(e) => setNewKeyword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addKeyword()} />
                </div>
              </Field>
              <div style={{ height: 14 }} />
              <Field label="Image de partage (1200 × 630)">
                <label style={{ position: "relative", display: "block", aspectRatio: "1200/630", overflow: "hidden", cursor: "pointer" }}>
                  <img src={form.og_image_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <span style={{ position: "absolute", bottom: 8, right: 8, background: COLORS.ink, color: COLORS.sand, fontSize: 11, padding: "6px 10px" }}>
                    {coverUploading ? "…" : "Changer"}
                  </span>
                  <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleCover} />
                </label>
              </Field>
              <div style={{ height: 14 }} />
              <Field label="URL canonique">
                <input style={inputStyle} value={form.canonical_url} onChange={(e) => setForm({ ...form, canonical_url: e.target.value })} />
              </Field>
              <div style={{ height: 16 }} />
              <DarkButton onClick={save}>Enregistrer</DarkButton>
            </Card>

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <Card>
                <div style={{ fontSize: 12, color: COLORS.text3, marginBottom: 8 }}>Aperçu Google</div>
                <div style={{ fontFamily: "Arial, sans-serif" }}>
                  <div style={{ fontSize: 12, color: "#4d5156" }}>smartarchi.bj</div>
                  <div style={{ fontSize: 18, color: "#1a0dab", margin: "2px 0" }}>{form.title}</div>
                  <div style={{ fontSize: 13, color: "#4d5156" }}>{form.description}</div>
                </div>
              </Card>
              <Card>
                <div style={{ fontSize: 12, color: COLORS.text3, marginBottom: 8 }}>Aperçu partage (WhatsApp, LinkedIn)</div>
                <div style={{ aspectRatio: "1200/630", overflow: "hidden", marginBottom: 8 }}>
                  <img src={form.og_image_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ fontWeight: 500, fontSize: 14 }}>{form.title}</div>
                <div style={{ fontSize: 12, color: COLORS.text3 }}>smartarchi.bj</div>
              </Card>
              <div style={{ background: COLORS.ink, color: COLORS.sand, padding: 24 }}>
                <div style={{ fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: COLORS.terracottaLight, marginBottom: 12 }}>État du site</div>
                {[
                  ["Sitemap.xml", "Généré", "#8fbf86"],
                  ["Robots.txt", "OK", "#8fbf86"],
                  ["Pages sans description", `${missingDescCount} (${pages.find((p) => !p.description)?.label || "-"})`, missingDescCount ? COLORS.terracottaLight : "#8fbf86"],
                ].map(([label, value, color]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 13 }}>
                    <span>{label}</span>
                    <span style={{ color }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
