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

  const [projectForm, setProjectForm] = useState({ title: "", type: "", year: "", color: "#1A1A1A", description: "", order_index: 0 });
  const [editingProject, setEditingProject] = useState(null);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [pendingImageFiles, setPendingImageFiles] = useState([]);

  const [serviceForm, setServiceForm] = useState({ icon: "", title: "", description: "", order_index: 0 });
  const [editingService, setEditingService] = useState(null);

  const [contentForm, setContentForm] = useState({});
  const [galleryProject, setGalleryProject] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryError, setGalleryError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (Object.keys(settings).length) setContentForm({ ...settings });
  }, [settings]);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  const resetProjectForm = () => {
    setProjectForm({ title: "", type: "", year: "", color: "#1A1A1A", description: "", order_index: projects.length + 1 });
    setEditingProject(null);
    setGalleryProject(null);
    setGalleryImages([]);
    setPendingImageFiles([]);
    setGalleryError("");
    setProjectModalOpen(false);
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
      const savedProject = editingProject
        ? await updateProject(editingProject.id, projectForm)
        : await addProject(projectForm);
      await uploadProjectImages(savedProject, pendingImageFiles);
      showMessage(editingProject ? "Projet mis à jour." : "Projet ajouté.");
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

  const loadGallery = async (project) => {
    setGalleryProject(project);
    setGalleryImages([]);
    setGalleryError("");
    setTimeout(() => document.getElementById("project-gallery")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);

    const { data, error: galleryRequestError } = await supabase
      .from("project_images")
      .select("*")
      .eq("project_id", project.id)
      .order("order_index", { ascending: true });

    if (galleryRequestError) {
      setGalleryError("La galerie n’est pas encore configurée dans Supabase. Exécute le fichier supabase/migrate_project_gallery.sql dans SQL Editor, puis réessaie.");
      return;
    }
    setGalleryImages(data || []);
  };

  const selectProjectImages = (event) => {
    const files = Array.from(event.target.files || []);
    const invalidFile = files.find((file) => !file.type.startsWith("image/") || file.size > 10 * 1024 * 1024);
    if (invalidFile) {
      showMessage("Utilise des images de moins de 10 Mo.");
      event.target.value = "";
      return;
    }
    setPendingImageFiles((current) => [...current, ...files]);
    event.target.value = "";
  };

  const uploadProjectImages = async (project, files) => {
    if (!files.length) return;

    setUploadingImage(true);
    try {
      for (const [index, file] of files.entries()) {
        const extension = file.name.split(".").pop() || "jpg";
        const path = `${project.id}/${crypto.randomUUID()}.${extension}`;
        const { error: uploadError } = await supabase.storage.from("project-images").upload(path, file, { contentType: file.type });
        if (uploadError) throw uploadError;

        const { data: publicUrl } = supabase.storage.from("project-images").getPublicUrl(path);
        const { error: imageError } = await supabase.from("project_images").insert({
          project_id: project.id,
          storage_path: path,
          image_url: publicUrl.publicUrl,
          alt_text: project.title,
          order_index: galleryImages.length + index,
        });
        if (imageError) throw imageError;
      }
      if (galleryProject?.id === project.id) await loadGallery(project);
    } finally {
      setUploadingImage(false);
    }
  };

  const deleteGalleryImage = async (image) => {
    try {
      const { error: storageError } = await supabase.storage.from("project-images").remove([image.storage_path]);
      if (storageError) throw storageError;
      const { error: databaseError } = await supabase.from("project_images").delete().eq("id", image.id);
      if (databaseError) throw databaseError;
      setGalleryImages((images) => images.filter((item) => item.id !== image.id));
      showMessage("Image supprimée.");
    } catch (err) {
      showMessage("Erreur de suppression : " + err.message);
    }
  };

  const startEditProject = (p) => {
    setEditingProject(p);
    setProjectForm({
      title: p.title,
      type: p.type,
      year: p.year,
      color: p.color,
      description: p.description || "",
      order_index: p.order_index,
    });
    setGalleryProject(p);
    setPendingImageFiles([]);
    setGalleryError("");
    setProjectModalOpen(true);
    loadGallery(p);
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
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
              <h2 style={{ fontSize: 18, margin: 0 }}>Projets existants</h2>
              <button
                type="button"
                onClick={() => {
                  resetProjectForm();
                  setProjectModalOpen(true);
                }}
                style={buttonStyle}
              >
                Ajouter un projet
              </button>
            </div>
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
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
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

            {projectModalOpen && (
              <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,.72)", padding: "1rem", overflowY: "auto" }}>
                <form onSubmit={handleProjectSubmit} style={{ maxWidth: 760, margin: "3rem auto", padding: "1.5rem", background: c.card, border: `1px solid ${c.border3}`, borderRadius: 8, display: "grid", gap: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
                    <h2 style={{ margin: 0, fontSize: 20 }}>{editingProject ? "Modifier le projet" : "Ajouter un projet"}</h2>
                    <button type="button" onClick={resetProjectForm} style={ghostButtonStyle}>Fermer</button>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                    <Input label="Titre" value={projectForm.title} onChange={(v) => setProjectForm({ ...projectForm, title: v })} />
                    <Input label="Type" value={projectForm.type} onChange={(v) => setProjectForm({ ...projectForm, type: v })} />
                    <Input label="Année" value={projectForm.year} onChange={(v) => setProjectForm({ ...projectForm, year: v })} />
                    <Input label="Couleur" value={projectForm.color} onChange={(v) => setProjectForm({ ...projectForm, color: v })} />
                    <Input label="Ordre" type="number" value={projectForm.order_index} onChange={(v) => setProjectForm({ ...projectForm, order_index: Number(v) })} />
                  </div>
                  <Input label="Description du projet" type="textarea" value={projectForm.description} onChange={(v) => setProjectForm({ ...projectForm, description: v })} />
                  {galleryError && <p style={{ margin: 0, color: "#f08a7f", lineHeight: 1.6 }}>{galleryError}</p>}
                  <div>
                    <p style={{ color: c.muted, fontSize: 13, margin: "0 0 0.5rem" }}>Images du projet · JPG, PNG ou WebP · 10 Mo maximum.</p>
                    <label style={{ ...buttonStyle, display: "inline-block", marginBottom: "0.75rem" }}>
                      Ajouter des images
                      <input type="file" accept="image/*" multiple onChange={selectProjectImages} style={{ display: "none" }} />
                    </label>
                    {pendingImageFiles.length > 0 && <p style={{ color: c.muted, fontSize: 13, margin: "0 0 0.75rem" }}>{pendingImageFiles.length} image(s) prête(s) à être ajoutée(s) lors de l’enregistrement.</p>}
                    {galleryImages.length > 0 && (
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.75rem" }}>
                        {galleryImages.map((image) => (
                          <div key={image.id} style={{ position: "relative", aspectRatio: "4 / 3", overflow: "hidden", borderRadius: 4 }}>
                            <img src={image.image_url} alt={image.alt_text || projectForm.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            <button type="button" onClick={() => deleteGalleryImage(image)} style={{ ...dangerButtonStyle, position: "absolute", bottom: 6, right: 6, padding: "5px 8px", fontSize: 11 }}>Supprimer</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <button type="submit" disabled={uploadingImage} style={{ ...buttonStyle, opacity: uploadingImage ? 0.7 : 1 }}>{uploadingImage ? "Enregistrement…" : editingProject ? "Mettre à jour" : "Créer le projet"}</button>
                    <button type="button" onClick={resetProjectForm} style={ghostButtonStyle}>Annuler</button>
                  </div>
                </form>
              </div>
            )}
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
