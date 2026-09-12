import { useState } from "react";
import AdminLayout from "./AdminLayout";
import { PageHeader, PrimaryButton, DarkButton, OutlineButton, Field, inputStyle, Card } from "./adminUI";
import { COLORS } from "../theme";
import { useTimeline, useSkills, useProjects, useContacts } from "../hooks/resources";

const EMPTY_ENTRY = { years: "", kind: "", title: "", place: "", description: "" };
const EMPTY_SKILL = { t: "", lvl: "", w: "" };

const textareaStyle = { ...inputStyle, resize: "vertical", fontFamily: "inherit" };

function TimelineSection({ timeline }) {
  const { add, update, remove } = timeline;
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_ENTRY);

  const startEdit = (t) => {
    setEditingId(t.id);
    setForm({ years: t.years, kind: t.kind, title: t.title, place: t.place, description: t.description });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(EMPTY_ENTRY);
  };

  const save = async (e) => {
    e.preventDefault();
    if (editingId) {
      await update(editingId, form);
    } else {
      await add({ ...form, order_index: timeline.rows.length });
    }
    resetForm();
  };

  const move = async (t, dir) => {
    const idx = timeline.rows.findIndex((r) => r.id === t.id);
    const swapWith = timeline.rows[idx + dir];
    if (!swapWith) return;
    await update(t.id, { order_index: swapWith.order_index });
    await update(swapWith.id, { order_index: t.order_index });
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 380px", gap: 24 }}>
      <Card style={{ padding: 0 }}>
        {timeline.rows.map((t, i) => (
          <div key={t.id} style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "16px 20px", borderBottom: `1px solid ${COLORS.adminHairline}` }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <button
                onClick={() => move(t, -1)}
                disabled={i === 0}
                style={{ background: "none", border: "none", cursor: i === 0 ? "default" : "pointer", color: i === 0 ? COLORS.adminHairline : COLORS.text3, fontSize: 12, padding: 0 }}
              >
                ▲
              </button>
              <button
                onClick={() => move(t, 1)}
                disabled={i === timeline.rows.length - 1}
                style={{ background: "none", border: "none", cursor: i === timeline.rows.length - 1 ? "default" : "pointer", color: i === timeline.rows.length - 1 ? COLORS.adminHairline : COLORS.text3, fontSize: 12, padding: 0 }}
              >
                ▼
              </button>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: COLORS.terracotta, marginBottom: 2 }}>
                {t.years} · {t.kind}
              </div>
              <div style={{ fontWeight: 500, fontSize: 14 }}>{t.title}</div>
              <div style={{ fontSize: 12, color: COLORS.text3, marginTop: 2 }}>{t.place}</div>
            </div>
            <button onClick={() => startEdit(t)} style={{ background: "none", border: "none", color: COLORS.terracotta, cursor: "pointer", fontSize: 13, flexShrink: 0 }}>
              Éditer
            </button>
            <button onClick={() => remove(t.id)} style={{ background: "none", border: "none", color: COLORS.text3, cursor: "pointer", fontSize: 13, flexShrink: 0 }}>
              Supprimer
            </button>
          </div>
        ))}
        {timeline.rows.length === 0 && <div style={{ padding: 24, fontSize: 13, color: COLORS.text3 }}>Aucune entrée pour l'instant.</div>}
      </Card>

      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{ fontWeight: 500 }}>{editingId ? "Modifier l'entrée" : "Nouvelle entrée"}</div>
          {editingId && (
            <button onClick={resetForm} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.text3 }}>
              Annuler
            </button>
          )}
        </div>
        <form onSubmit={save} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Field label="Période">
            <input required style={inputStyle} placeholder="Ex. Août 2025 - auj." value={form.years} onChange={(e) => setForm({ ...form, years: e.target.value })} />
          </Field>
          <Field label="Type">
            <input required style={inputStyle} placeholder="Ex. Agence, Stage pratique, Formation..." value={form.kind} onChange={(e) => setForm({ ...form, kind: e.target.value })} />
          </Field>
          <Field label="Titre / poste">
            <input required style={inputStyle} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </Field>
          <Field label="Lieu">
            <input required style={inputStyle} placeholder="Ex. Akpakpa, Ségbèya - Cotonou" value={form.place} onChange={(e) => setForm({ ...form, place: e.target.value })} />
          </Field>
          <Field label="Description">
            <textarea required rows={4} style={textareaStyle} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </Field>
          <div style={{ display: "flex", gap: 12 }}>
            <DarkButton type="submit">{editingId ? "Mettre à jour" : "Ajouter"}</DarkButton>
            {editingId && <OutlineButton type="button" onClick={resetForm}>Annuler</OutlineButton>}
          </div>
        </form>
      </Card>
    </div>
  );
}

function SkillsSection({ skills }) {
  const { add, update, remove } = skills;
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_SKILL);

  const startEdit = (s) => {
    setEditingId(s.id);
    setForm({ t: s.t, lvl: s.lvl, w: s.w });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(EMPTY_SKILL);
  };

  const save = async (e) => {
    e.preventDefault();
    const w = form.w.trim().endsWith("%") ? form.w.trim() : `${form.w.trim()}%`;
    const record = { t: form.t, lvl: form.lvl, w };
    if (editingId) {
      await update(editingId, record);
    } else {
      await add({ ...record, order_index: skills.rows.length });
    }
    resetForm();
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 380px", gap: 24 }}>
      <Card style={{ padding: 0 }}>
        {skills.rows.map((s) => (
          <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 20px", borderBottom: `1px solid ${COLORS.adminHairline}` }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, fontSize: 14 }}>{s.t}</div>
              <div style={{ fontSize: 12, color: COLORS.text3 }}>
                {s.lvl} · {s.w}
              </div>
            </div>
            <div style={{ width: 100, height: 4, background: COLORS.adminHairline, flexShrink: 0 }}>
              <div style={{ width: s.w, height: 4, background: COLORS.terracotta }} />
            </div>
            <button onClick={() => startEdit(s)} style={{ background: "none", border: "none", color: COLORS.terracotta, cursor: "pointer", fontSize: 13, flexShrink: 0 }}>
              Éditer
            </button>
            <button onClick={() => remove(s.id)} style={{ background: "none", border: "none", color: COLORS.text3, cursor: "pointer", fontSize: 13, flexShrink: 0 }}>
              Supprimer
            </button>
          </div>
        ))}
        {skills.rows.length === 0 && <div style={{ padding: 24, fontSize: 13, color: COLORS.text3 }}>Aucune compétence pour l'instant.</div>}
      </Card>

      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{ fontWeight: 500 }}>{editingId ? "Modifier la compétence" : "Nouvelle compétence"}</div>
          {editingId && (
            <button onClick={resetForm} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.text3 }}>
              Annuler
            </button>
          )}
        </div>
        <form onSubmit={save} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Field label="Compétence">
            <input required style={inputStyle} placeholder="Ex. Conception architecturale" value={form.t} onChange={(e) => setForm({ ...form, t: e.target.value })} />
          </Field>
          <Field label="Niveau (étiquette affichée)">
            <input required style={inputStyle} placeholder="Ex. Expert, Avancé, Confirmé..." value={form.lvl} onChange={(e) => setForm({ ...form, lvl: e.target.value })} />
          </Field>
          <Field label="Barre de progression (%)">
            <input required style={inputStyle} placeholder="Ex. 92" value={form.w} onChange={(e) => setForm({ ...form, w: e.target.value })} />
          </Field>
          <div style={{ display: "flex", gap: 12 }}>
            <DarkButton type="submit">{editingId ? "Mettre à jour" : "Ajouter"}</DarkButton>
            {editingId && <OutlineButton type="button" onClick={resetForm}>Annuler</OutlineButton>}
          </div>
        </form>
      </Card>
    </div>
  );
}

export default function AdminCareer() {
  const timelineTable = useTimeline();
  const skillsTable = useSkills();
  const { rows: projects } = useProjects();
  const { rows: contacts } = useContacts();

  return (
    <AdminLayout active="Parcours" counts={{ Projets: projects.length, Contacts: contacts.filter((c) => c.status === "Nouveau").length }}>
      <PageHeader title="Parcours" subtitle="Alimente la timeline de la page « Parcours » et les compétences de la page « À propos »." />

      <div style={{ marginBottom: 48 }}>
        <div style={{ fontSize: 13, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".06em", color: COLORS.text3, marginBottom: 16 }}>
          Entrées du parcours
        </div>
        <TimelineSection timeline={timelineTable} />
      </div>

      <div>
        <div style={{ fontSize: 13, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".06em", color: COLORS.text3, marginBottom: 16 }}>
          Compétences
        </div>
        <SkillsSection skills={skillsTable} />
      </div>
    </AdminLayout>
  );
}
