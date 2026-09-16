import { useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { PageHeader, StatCard, StatusPill, PrimaryButton, DarkButton, OutlineButton, Field, inputStyle, Card, Modal } from "./adminUI";
import { COLORS } from "../theme";
import { useProjects, useArticles, useContacts, useMedia, useSoftwares } from "../hooks/resources";
import { slugify } from "../utils/slugify";
import { supabase } from "../supabaseClient";

const CATEGORIES = ["Résidentiel", "Collectif", "Patrimoine"];
const DEFAULT_FORM = { title: "", category: CATEGORIES[0], year: "2026", location: "Cotonou, Bénin", description: "" };
const PLAN_TABS = ["Rez-de-chaussée", "Étage supérieur", "Coupe transversale", "Coupe longitudinale"];

export default function AdminProjects() {
  const { rows: projects, add, update, remove } = useProjects();
  const { rows: articles } = useArticles();
  const { rows: contacts } = useContacts();
  const { rows: media } = useMedia();
  const { rows: softwares } = useSoftwares();

  const [editorOpen, setEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(DEFAULT_FORM);
  const [selSoft, setSelSoft] = useState(["Archicad", "Twinmotion", "Photoshop"]);
  const [pendingFiles, setPendingFiles] = useState([]);
  const [planUrls, setPlanUrls] = useState({});
  const [planFiles, setPlanFiles] = useState({});
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const resetForm = () => {
    setEditingId(null);
    setForm(DEFAULT_FORM);
    setSelSoft(["Archicad", "Twinmotion", "Photoshop"]);
    setPendingFiles([]);
    setPlanUrls({});
    setPlanFiles({});
  };

  const openNew = () => {
    resetForm();
    setEditorOpen(true);
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setForm({ title: p.title, category: p.category, year: p.year, location: p.sheet?.Localisation || "Cotonou, Bénin", description: p.description || "" });
    setSelSoft(p.softwares || []);
    setPendingFiles([]);
    setPlanUrls(p.plans || {});
    setPlanFiles({});
    setEditorOpen(true);
  };

  const closeModal = () => {
    setEditorOpen(false);
    resetForm();
  };

  const toggleSoft = (name) => {
    setSelSoft((prev) => (prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]));
  };

  const uploadPendingImages = async (projectId) => {
    const { count } = await supabase
      .from("project_images")
      .select("id", { count: "exact", head: true })
      .eq("project_id", projectId);
    let orderIndex = count || 0;
    const urls = [];
    for (const file of pendingFiles) {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${projectId}/${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("project-images").upload(path, file, { contentType: file.type });
      if (uploadError) throw uploadError;
      const { data: publicUrl } = supabase.storage.from("project-images").getPublicUrl(path);
      await supabase.from("project_images").insert({
        project_id: projectId,
        storage_path: path,
        image_url: publicUrl.publicUrl,
        alt_text: `${form.title} - vue ${orderIndex + 1}`,
        order_index: orderIndex,
      });
      orderIndex += 1;
      urls.push(publicUrl.publicUrl);
    }
    return urls;
  };

  const uploadPendingPlans = async (projectId) => {
    const merged = { ...planUrls };
    for (const tab of PLAN_TABS) {
      const file = planFiles[tab];
      if (!file) continue;
      const ext = file.name.split(".").pop() || "jpg";
      const path = `plans/${projectId}/${slugify(tab)}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("project-images").upload(path, file, { contentType: file.type, upsert: true });
      if (uploadError) throw uploadError;
      const { data: publicUrl } = supabase.storage.from("project-images").getPublicUrl(path);
      merged[tab] = `${publicUrl.publicUrl}?v=${Date.now()}`;
    }
    return merged;
  };

  const save = async (status) => {
    setSaving(true);
    try {
      const record = {
        title: form.title,
        slug: slugify(form.title),
        category: form.category,
        year: form.year,
        client_type: "Projet freelance",
        description: form.description,
        status,
        softwares: selSoft,
        sheet: { Localisation: form.location },
      };
      const saved = editingId ? await update(editingId, record) : await add({ ...record, cover_image_url: "/img/hero-accueil.jpg", color: "#1A1A1A" });
      if (pendingFiles.length) {
        const urls = await uploadPendingImages(saved.id);
        if (!editingId && urls[0]) await update(saved.id, { cover_image_url: urls[0] });
      }
      if (Object.keys(planFiles).length) {
        const mergedPlans = await uploadPendingPlans(saved.id);
        await update(saved.id, { plans: mergedPlans });
      }
      setMessage(editingId ? "Projet mis à jour." : "Projet créé.");
      closeModal();
    } catch (err) {
      setMessage("Erreur : " + err.message);
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const deleteProject = async (p) => {
    if (!window.confirm(`Supprimer définitivement « ${p.title} » ? Cette action est irréversible.`)) return;
    try {
      await remove(p.id);
      setMessage("Projet supprimé.");
    } catch (err) {
      setMessage("Erreur : " + err.message);
    } finally {
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const stats = [
    { label: "Projets publiés", value: projects.filter((p) => p.status === "Publié").length },
    { label: "Médias", value: media.length },
    { label: "Articles", value: articles.length },
    { label: "Nouveaux contacts", value: contacts.filter((c) => c.status === "Nouveau").length },
  ];

  return (
    <AdminLayout
      active="Projets"
      counts={{ Projets: projects.length, Contacts: contacts.filter((c) => c.status === "Nouveau").length }}
    >
      <PageHeader
        title="Projets"
        actions={
          <>
            <OutlineButton>Réordonner</OutlineButton>
            <PrimaryButton onClick={openNew}>+ Nouveau projet</PrimaryButton>
          </>
        }
      />

      {message && <div style={{ marginBottom: 20, fontSize: 13, color: COLORS.terracotta }}>{message}</div>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 32 }}>
        {stats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} />
        ))}
      </div>

      <Card style={{ padding: 0, overflowX: "auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "56px 1fr 140px 120px 70px 90px 130px", fontSize: 11, textTransform: "uppercase", letterSpacing: ".1em", color: COLORS.text3, padding: "14px 20px", borderBottom: `1px solid ${COLORS.adminHairline}` }}>
          <div />
          <div>Titre</div>
          <div>Catégorie</div>
          <div>Lieu</div>
          <div>Année</div>
          <div>Statut</div>
          <div />
        </div>
        {projects.map((p) => (
          <div key={p.id || p.slug} style={{ display: "grid", gridTemplateColumns: "56px 1fr 140px 120px 70px 90px 130px", alignItems: "center", padding: "12px 20px", borderBottom: `1px solid ${COLORS.adminHairline}`, fontSize: 13 }}>
            <img src={p.cover_image_url} alt="" style={{ width: 56, height: 40, objectFit: "cover" }} />
            <div style={{ fontWeight: 500 }}>{p.title}</div>
            <div style={{ color: COLORS.text1 }}>{p.category}</div>
            <div style={{ color: COLORS.text3 }}>{p.sheet?.Localisation || p.client_type}</div>
            <div style={{ color: COLORS.text3 }}>{p.year}</div>
            <div>
              <StatusPill status={p.status} />
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => startEdit(p)} style={{ background: "none", border: "none", color: COLORS.terracotta, cursor: "pointer", fontSize: 13, padding: 0 }}>
                Éditer
              </button>
              <button onClick={() => deleteProject(p)} style={{ background: "none", border: "none", color: COLORS.text3, cursor: "pointer", fontSize: 13, padding: 0 }}>
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </Card>

      {editorOpen && (
        <Modal title={editingId ? "Modifier le projet" : "Nouveau projet"} onClose={closeModal} width={720}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Field label="Titre">
              <input style={inputStyle} placeholder="Villa …" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </Field>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Field label="Catégorie">
                <select style={inputStyle} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Année">
                <input style={inputStyle} placeholder="2026" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
              </Field>
            </div>
            <Field label="Localisation">
              <input style={inputStyle} placeholder="Cotonou, Bénin" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            </Field>
            <Field label="Description">
              <textarea style={{ ...inputStyle, resize: "vertical" }} rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </Field>
            <Field label="Médias">
              <label
                style={{
                  border: `1px dashed ${COLORS.terracotta}`,
                  background: COLORS.adminHighlight,
                  color: COLORS.terracotta,
                  padding: 16,
                  textAlign: "center",
                  fontSize: 13,
                  cursor: "pointer",
                  display: "block",
                }}
              >
                {pendingFiles.length ? `${pendingFiles.length} fichier(s) prêt(s)` : "Glisser images, PDF, vidéos - compression automatique"}
                <input type="file" multiple accept="image/*" style={{ display: "none" }} onChange={(e) => setPendingFiles(Array.from(e.target.files || []))} />
              </label>
            </Field>

            <Field label="Plans techniques & coupes">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {PLAN_TABS.map((tabLabel) => {
                  const hasFile = !!planFiles[tabLabel];
                  const hasUrl = !!planUrls[tabLabel];
                  return (
                    <label
                      key={tabLabel}
                      style={{
                        border: `1px dashed ${hasFile || hasUrl ? COLORS.ink : COLORS.taupe}`,
                        background: hasFile || hasUrl ? COLORS.adminHighlight : COLORS.adminCard,
                        padding: 12,
                        fontSize: 12,
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                      }}
                    >
                      <span style={{ fontWeight: 500, color: COLORS.ink }}>{tabLabel}</span>
                      <span style={{ color: hasFile || hasUrl ? COLORS.terracotta : COLORS.text3 }}>
                        {hasFile ? "Nouveau fichier prêt" : hasUrl ? "Déjà ajouté - cliquer pour remplacer" : "Choisir une image"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setPlanFiles((prev) => ({ ...prev, [tabLabel]: file }));
                        }}
                      />
                    </label>
                  );
                })}
              </div>
              <div style={{ fontSize: 11, color: COLORS.text3, marginTop: 8 }}>
                Alimente la section « Plans techniques & coupes » de la page projet. Sans image, un schéma générique reste affiché.
              </div>
            </Field>

            <Field label="Logiciels utilisés">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {softwares.map((s) => {
                  const active = selSoft.includes(s.n);
                  return (
                    <button
                      key={s.id || s.n}
                      type="button"
                      onClick={() => toggleSoft(s.n)}
                      style={{
                        fontSize: 12,
                        padding: "8px 12px",
                        border: `1px solid ${active ? COLORS.ink : COLORS.taupe}`,
                        background: active ? COLORS.ink : COLORS.adminCard,
                        color: active ? COLORS.sand : COLORS.text1,
                        cursor: "pointer",
                      }}
                    >
                      {s.n}
                    </button>
                  );
                })}
              </div>
              <div style={{ fontSize: 11, color: COLORS.text3, marginTop: 8 }}>
                Un logiciel manquant ? <Link to="/dashboard/logiciels" style={{ color: COLORS.terracotta }}>Ajoute-le depuis la page Logiciels →</Link>
              </div>
            </Field>

            <div style={{ display: "flex", gap: 12, borderTop: `1px solid ${COLORS.adminHairline}`, paddingTop: 20, marginTop: 4 }}>
              <DarkButton onClick={() => save("Publié")} disabled={saving}>
                {saving ? "…" : "Publier"}
              </DarkButton>
              <OutlineButton onClick={() => save("Brouillon")} disabled={saving}>
                Brouillon
              </OutlineButton>
              <OutlineButton onClick={closeModal} type="button">
                Annuler
              </OutlineButton>
            </div>
          </div>
        </Modal>
      )}
    </AdminLayout>
  );
}
