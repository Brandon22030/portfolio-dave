import { useState } from "react";
import AdminLayout from "./AdminLayout";
import { PageHeader, PrimaryButton, DarkButton, OutlineButton, Field, inputStyle, Card } from "./adminUI";
import SoftwareLogo from "../components/SoftwareLogo";
import { COLORS } from "../theme";
import { useSoftwares, useProjects, useContacts } from "../hooks/resources";
import { supabase } from "../supabaseClient";

const EMPTY = { n: "", u: "", logoSlug: "", logo_url: "", mark: "" };

export default function AdminSoftwares() {
  const { rows: softwares, add, update, remove } = useSoftwares();
  const { rows: projects } = useProjects();
  const { rows: contacts } = useContacts();

  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [uploading, setUploading] = useState(false);

  const startEdit = (s) => {
    setEditingId(s.id);
    setForm({ n: s.n, u: s.u, logoSlug: s.logoSlug || "", logo_url: s.logo_url || "", mark: s.mark || "" });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(EMPTY);
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const path = `softwares/${crypto.randomUUID()}-${file.name}`;
      const { error: uploadError } = await supabase.storage.from("site-media").upload(path, file, { contentType: file.type });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from("site-media").getPublicUrl(path);
      setForm((f) => ({ ...f, logo_url: data.publicUrl }));
    } catch (err) {
      alert("Erreur d'import : " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const save = async (e) => {
    e.preventDefault();
    const record = {
      n: form.n,
      u: form.u,
      logoSlug: form.logoSlug || null,
      logo_url: form.logo_url || null,
      mark: form.logo_url || form.logoSlug ? null : form.mark || form.n.slice(0, 2).toUpperCase(),
    };
    if (editingId) {
      await update(editingId, record);
    } else {
      await add({ ...record, order_index: softwares.length + 1 });
    }
    resetForm();
  };

  return (
    <AdminLayout active="Logiciels" counts={{ Projets: projects.length, Contacts: contacts.filter((c) => c.status === "Nouveau").length }}>
      <PageHeader
        title="Logiciels"
        subtitle="Alimente la section « Logiciels » de la page À propos."
        actions={
          <PrimaryButton
            onClick={() => {
              resetForm();
            }}
          >
            + Nouveau logiciel
          </PrimaryButton>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 380px", gap: 24 }}>
        <Card style={{ padding: 0 }}>
          {softwares.map((s) => (
            <div key={s.id || s.n} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 20px", borderBottom: `1px solid ${COLORS.adminHairline}` }}>
              <div style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", background: COLORS.ink, flexShrink: 0 }}>
                <SoftwareLogo software={s} size={28} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, fontSize: 14 }}>{s.n}</div>
                <div style={{ fontSize: 12, color: COLORS.text3 }}>{s.u}</div>
              </div>
              <button onClick={() => startEdit(s)} style={{ background: "none", border: "none", color: COLORS.terracotta, cursor: "pointer", fontSize: 13 }}>
                Éditer
              </button>
              <button onClick={() => remove(s.id)} style={{ background: "none", border: "none", color: COLORS.text3, cursor: "pointer", fontSize: 13 }}>
                Supprimer
              </button>
            </div>
          ))}
        </Card>

        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
            <div style={{ fontWeight: 500 }}>{editingId ? "Modifier le logiciel" : "Nouveau logiciel"}</div>
            {editingId && (
              <button onClick={resetForm} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.text3 }}>
                Annuler
              </button>
            )}
          </div>
          <form onSubmit={save} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Field label="Nom">
              <input required style={inputStyle} placeholder="Ex. Rhino" value={form.n} onChange={(e) => setForm({ ...form, n: e.target.value })} />
            </Field>
            <Field label="Description courte (affichée sur À propos)">
              <input required style={inputStyle} placeholder="Ex. Modélisation paramétrique" value={form.u} onChange={(e) => setForm({ ...form, u: e.target.value })} />
            </Field>
            <Field label="Logo - importer une image">
              <label
                style={{
                  border: `1px dashed ${COLORS.terracotta}`,
                  background: COLORS.adminHighlight,
                  color: COLORS.terracotta,
                  padding: 14,
                  textAlign: "center",
                  fontSize: 13,
                  cursor: "pointer",
                  display: "block",
                }}
              >
                {uploading ? "Import..." : form.logo_url ? "Logo importé - cliquer pour changer" : "Choisir une image de logo"}
                <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleLogoUpload} />
              </label>
            </Field>
            <Field label="Ou icône Simple Icons (slug, optionnel)">
              <input
                style={inputStyle}
                placeholder="Ex. rhino3d"
                value={form.logoSlug}
                onChange={(e) => setForm({ ...form, logoSlug: e.target.value, logo_url: e.target.value ? "" : form.logo_url })}
              />
            </Field>
            <div style={{ fontSize: 11, color: COLORS.text3 }}>
              Sans logo ni icône, les deux premières lettres du nom sont utilisées comme badge.
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0" }}>
              <span style={{ fontSize: 11, color: COLORS.text3, textTransform: "uppercase", letterSpacing: ".08em" }}>Aperçu</span>
              <div style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", background: COLORS.ink }}>
                <SoftwareLogo software={{ n: form.n, logoSlug: form.logoSlug, logo_url: form.logo_url, mark: form.mark || form.n.slice(0, 2).toUpperCase() }} />
              </div>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <DarkButton type="submit">{editingId ? "Mettre à jour" : "Ajouter"}</DarkButton>
              {editingId && <OutlineButton type="button" onClick={resetForm}>Annuler</OutlineButton>}
            </div>
          </form>
        </Card>
      </div>
    </AdminLayout>
  );
}
