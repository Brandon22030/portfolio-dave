import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { useSiteData } from "./useSiteData";
import { THEMES } from "./theme";

const c = THEMES.dark;

const SETTING_KEYS = [
  "hero_subtitle",
  "hero_title",
  "hero_description",
  "about_label",
  "about_title",
  "about_text1",
  "about_text2",
  "services_label",
  "services_title",
  "projects_label",
  "projects_title",
  "contact_label",
  "contact_title",
  "contact_description",
];

function Input({ label, value, onChange, type = "text" }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, width: "100%" }}>
      <span style={{ color: c.muted, letterSpacing: 1 }}>{label}</span>
      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          style={inputStyle}
        />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} style={inputStyle} />
      )}
    </label>
  );
}

const inputStyle = {
  background: c.card,
  border: `1px solid ${c.border4}`,
  color: c.text,
  padding: "12px 14px",
  borderRadius: 4,
  fontSize: 14,
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

const buttonStyle = {
  background: c.tc,
  color: c.cardText,
  border: "none",
  padding: "12px 20px",
  borderRadius: 4,
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
};

const dangerButtonStyle = {
  ...buttonStyle,
  background: "#c0392b",
};

const ghostButtonStyle = {
  background: "transparent",
  color: c.text,
  border: `1px solid ${c.border4}`,
  padding: "12px 20px",
  borderRadius: 4,
  fontSize: 14,
  cursor: "pointer",
};

export default function Dashboard() {
  const {
    projects,
    services,
    settings,
    loading,
    error,
    upsertSetting,
    addProject,
    updateProject,
    deleteProject,
    addService,
    updateService,
    deleteService,
  } = useSiteData();

  const [tab, setTab] = useState("projects");
  const [message, setMessage] = useState("");

  const [projectForm, setProjectForm] = useState({ title: "", type: "", year: "", color: "#1A1A1A", order_index: 0 });
  const [editingProject, setEditingProject] = useState(null);

  const [serviceForm, setServiceForm] = useState({ icon: "", title: "", description: "", order_index: 0 });
  const [editingService, setEditingService] = useState(null);

  const [contentForm, setContentForm] = useState({});

  useEffect(() => {
    if (Object.keys(settings).length) setContentForm({ ...settings });
  }, [settings]);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  const resetProjectForm = () => {
    setProjectForm({ title: "", type: "", year: "", color: "#1A1A1A", order_index: projects.length + 1 });
    setEditingProject(null);
  };

  const resetServiceForm = () => {
    setServiceForm({ icon: "", title: "", description: "", order_index: services.length + 1 });
    setEditingService(null);
  };

  useEffect(() => {
    if (!loading) {
      setProjectForm((f) => ({ ...f, order_index: projects.length + 1 }));
      setServiceForm((f) => ({ ...f, order_index: services.length + 1 }));
    }
  }, [loading, projects.length, services.length]);

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await updateProject(editingProject.id, projectForm);
        showMessage("Projet mis à jour.");
      } else {
        await addProject(projectForm);
        showMessage("Projet ajouté.");
      }
      resetProjectForm();
    } catch (err) {
      showMessage("Erreur : " + err.message);
    }
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingService) {
        await updateService(editingService.id, serviceForm);
        showMessage("Service mis à jour.");
      } else {
        await addService(serviceForm);
        showMessage("Service ajouté.");
      }
      resetServiceForm();
    } catch (err) {
      showMessage("Erreur : " + err.message);
    }
  };

  const handleContentSave = async (e) => {
    e.preventDefault();
    try {
      for (const key of SETTING_KEYS) {
        if (contentForm[key] !== undefined) await upsertSetting(key, contentForm[key]);
      }
      showMessage("Contenu enregistré.");
    } catch (err) {
      showMessage("Erreur : " + err.message);
    }
  };

  const startEditProject = (p) => {
    setEditingProject(p);
    setProjectForm({
      title: p.title,
      type: p.type,
      year: p.year,
      color: p.color,
      order_index: p.order_index,
    });
    setTab("projects");
  };

  const startEditService = (s) => {
    setEditingService(s);
    setServiceForm({
      icon: s.icon,
      title: s.title,
      description: s.description,
      order_index: s.order_index,
    });
    setTab("services");
  };

  return (
    <div style={{ fontFamily: "'Segoe UI',sans-serif", background: c.bg, color: c.text, minHeight: "100vh" }}>
      <nav
        style={{
          background: c.card,
          borderBottom: `1px solid ${c.border3}`,
          padding: "1rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <h1 style={{ margin: 0, fontSize: 20, color: c.tc }}>Dashboard PlanifyBJ</h1>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
          <Link to="/" style={{ color: c.muted, textDecoration: "none", fontSize: 14 }}>
            ← Retour au site
          </Link>
          <button
            onClick={() => supabase.auth.signOut()}
            style={{
              background: "transparent",
              border: `1px solid ${c.border4}`,
              color: c.text,
              padding: "8px 14px",
              borderRadius: 4,
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            Déconnexion
          </button>
        </div>
      </nav>

      <div style={{ padding: "2rem", maxWidth: 1000, margin: "0 auto" }}>
        {message && (
          <div
            style={{
              background: c.card,
              border: `1px solid ${c.tc60}`,
              borderRadius: 4,
              padding: "1rem",
              marginBottom: "1.5rem",
              color: c.text,
            }}
          >
            {message}
          </div>
        )}

        {error && (
          <div
            style={{
              background: "#2a1a1a",
              border: "1px solid #c0392b",
              borderRadius: 4,
              padding: "1rem",
              marginBottom: "1.5rem",
              color: c.text,
            }}
          >
            Erreur Supabase : {error}
          </div>
        )}

        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem", flexWrap: "wrap" }}>
          {[
            { id: "projects", label: "Projets" },
            { id: "services", label: "Services" },
            { id: "content", label: "Contenu" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                background: tab === t.id ? c.tc : c.card,
                color: tab === t.id ? c.cardText : c.text,
                border: `1px solid ${c.border3}`,
                padding: "10px 18px",
                borderRadius: 4,
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {loading && <p style={{ color: c.muted }}>Chargement...</p>}

        {/* PROJETS */}
        {tab === "projects" && !loading && (
          <div>
            <h2 style={{ fontSize: 18, marginBottom: "1rem" }}>
              {editingProject ? "Modifier un projet" : "Ajouter un projet"}
            </h2>
            <form onSubmit={handleProjectSubmit} style={{ display: "grid", gap: "1rem", margin: "0 auto 2rem", maxWidth: 720 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", alignItems: "stretch" }}>
                <Input label="Titre" value={projectForm.title} onChange={(v) => setProjectForm({ ...projectForm, title: v })} />
                <Input label="Type" value={projectForm.type} onChange={(v) => setProjectForm({ ...projectForm, type: v })} />
                <Input label="Année" value={projectForm.year} onChange={(v) => setProjectForm({ ...projectForm, year: v })} />
                <Input label="Couleur" value={projectForm.color} onChange={(v) => setProjectForm({ ...projectForm, color: v })} />
                <Input
                  label="Ordre"
                  type="number"
                  value={projectForm.order_index}
                  onChange={(v) => setProjectForm({ ...projectForm, order_index: Number(v) })}
                />
              </div>
              <div style={{ display: "flex", gap: "1rem" }}>
                <button type="submit" style={buttonStyle}>
                  {editingProject ? "Mettre à jour" : "Ajouter"}
                </button>
                {editingProject && (
                  <button type="button" onClick={resetProjectForm} style={ghostButtonStyle}>
                    Annuler
                  </button>
                )}
              </div>
            </form>

            <h3 style={{ fontSize: 16, marginBottom: "1rem", color: c.muted }}>Projets existants</h3>
            <div style={{ display: "grid", gap: "1rem" }}>
              {projects.map((p) => (
                <div
                  key={p.id || p.title}
                  style={{
                    background: c.card,
                    border: `1px solid ${c.border1}`,
                    borderRadius: 4,
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "1rem",
                  }}
                >
                  <div>
                    <p style={{ fontWeight: 600, marginBottom: 4 }}>{p.title}</p>
                    <p style={{ color: c.muted, fontSize: 13 }}>
                      {p.type} · {p.year} · {p.color} · ordre {p.order_index}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button onClick={() => startEditProject(p)} style={ghostButtonStyle}>
                      Modifier
                    </button>
                    <button onClick={() => deleteProject(p.id)} style={dangerButtonStyle}>
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SERVICES */}
        {tab === "services" && !loading && (
          <div>
            <h2 style={{ fontSize: 18, marginBottom: "1rem" }}>
              {editingService ? "Modifier un service" : "Ajouter un service"}
            </h2>
            <form onSubmit={handleServiceSubmit} style={{ display: "grid", gap: "1rem", margin: "0 auto 2rem", maxWidth: 720 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", alignItems: "stretch" }}>
                <Input label="Icône" value={serviceForm.icon} onChange={(v) => setServiceForm({ ...serviceForm, icon: v })} />
                <Input label="Titre" value={serviceForm.title} onChange={(v) => setServiceForm({ ...serviceForm, title: v })} />
                <Input
                  label="Ordre"
                  type="number"
                  value={serviceForm.order_index}
                  onChange={(v) => setServiceForm({ ...serviceForm, order_index: Number(v) })}
                />
              </div>
              <Input
                label="Description"
                type="textarea"
                value={serviceForm.description}
                onChange={(v) => setServiceForm({ ...serviceForm, description: v })}
              />
              <div style={{ display: "flex", gap: "1rem" }}>
                <button type="submit" style={buttonStyle}>
                  {editingService ? "Mettre à jour" : "Ajouter"}
                </button>
                {editingService && (
                  <button type="button" onClick={resetServiceForm} style={ghostButtonStyle}>
                    Annuler
                  </button>
                )}
              </div>
            </form>

            <h3 style={{ fontSize: 16, marginBottom: "1rem", color: c.muted }}>Services existants</h3>
            <div style={{ display: "grid", gap: "1rem" }}>
              {services.map((s) => (
                <div
                  key={s.id || s.title}
                  style={{
                    background: c.card,
                    border: `1px solid ${c.border1}`,
                    borderRadius: 4,
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "1rem",
                  }}
                >
                  <div>
                    <p style={{ fontWeight: 600, marginBottom: 4 }}>
                      {s.icon} {s.title}
                    </p>
                    <p style={{ color: c.muted, fontSize: 13 }}>{s.description}</p>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button onClick={() => startEditService(s)} style={ghostButtonStyle}>
                      Modifier
                    </button>
                    <button onClick={() => deleteService(s.id)} style={dangerButtonStyle}>
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTENU */}
        {tab === "content" && !loading && (
          <form onSubmit={handleContentSave} style={{ display: "grid", gap: "1rem", maxWidth: 700, margin: "0 auto" }}>
            {SETTING_KEYS.map((key) => (
              <Input
                key={key}
                label={key}
                type="textarea"
                value={contentForm[key] || ""}
                onChange={(v) => setContentForm({ ...contentForm, [key]: v })}
              />
            ))}
            <button type="submit" style={buttonStyle}>
              Enregistrer le contenu
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
