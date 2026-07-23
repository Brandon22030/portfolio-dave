import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { THEMES } from "./theme";

const c = THEMES.dark;

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [images, setImages] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProject() {
      setLoading(true);
      const [projectResult, imagesResult] = await Promise.all([
        supabase.from("projects").select("*").eq("id", id).single(),
        supabase.from("project_images").select("*").eq("project_id", id).order("order_index", { ascending: true }),
      ]);

      if (projectResult.error) {
        setError("Ce projet est introuvable.");
      } else {
        setProject(projectResult.data);
      }

      if (!imagesResult.error) {
        setImages(imagesResult.data || []);
      }
      setLoading(false);
    }

    loadProject();
  }, [id]);

  if (loading) {
    return <div style={{ background: c.bg, color: c.muted, minHeight: "100vh", padding: "4rem", textAlign: "center" }}>Chargement…</div>;
  }

  if (error || !project) {
    return (
      <div style={{ background: c.bg, color: c.text, minHeight: "100vh", padding: "4rem", textAlign: "center", fontFamily: "'Segoe UI', sans-serif" }}>
        <p style={{ color: c.muted, marginBottom: "1.5rem" }}>{error}</p>
        <Link to="/#projets" style={{ color: c.tc }}>Retour aux projets</Link>
      </div>
    );
  }

  return (
    <main style={{ background: c.bg, color: c.text, minHeight: "100vh", fontFamily: "'Segoe UI', sans-serif" }}>
      <nav style={{ padding: "1.25rem clamp(1.5rem, 5vw, 5rem)", borderBottom: `1px solid ${c.border3}` }}>
        <Link to="/#projets" style={{ color: c.muted, textDecoration: "none", fontSize: 14 }}>← Retour aux projets</Link>
      </nav>

      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(3rem, 8vw, 6rem) 2rem" }}>
        <p style={{ color: c.tc, fontSize: 11, letterSpacing: 4, marginBottom: "1rem" }}>{project.type?.toUpperCase()}</p>
        <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1.08, margin: "0 0 1.25rem", maxWidth: 800 }}>{project.title}</h1>
        <p style={{ color: c.muted, fontSize: 16, maxWidth: 720, marginBottom: "3rem", whiteSpace: "pre-line" }}>
          {project.description || "Découvrez les visuels et détails de cette réalisation."}
        </p>

        {images.length ? (
          <div style={{ display: "grid", gap: "1rem" }}>
            <div style={{ position: "relative", aspectRatio: "16 / 9", overflow: "hidden", borderRadius: 4, background: c.card }}>
              <img src={images[activeImageIndex].image_url} alt={images[activeImageIndex].alt_text || project.title} style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }} />
              {images.length > 1 && (
                <>
                  <button type="button" onClick={() => setActiveImageIndex((index) => (index - 1 + images.length) % images.length)} aria-label="Image précédente" style={{ position: "absolute", top: "50%", left: 16, transform: "translateY(-50%)", background: "rgba(20,18,16,.75)", border: `1px solid ${c.border4}`, color: c.text, width: 42, height: 42, borderRadius: "50%", cursor: "pointer", fontSize: 22 }}>‹</button>
                  <button type="button" onClick={() => setActiveImageIndex((index) => (index + 1) % images.length)} aria-label="Image suivante" style={{ position: "absolute", top: "50%", right: 16, transform: "translateY(-50%)", background: "rgba(20,18,16,.75)", border: `1px solid ${c.border4}`, color: c.text, width: 42, height: 42, borderRadius: "50%", cursor: "pointer", fontSize: 22 }}>›</button>
                  <span style={{ position: "absolute", right: 18, bottom: 14, background: "rgba(20,18,16,.75)", color: c.text, padding: "5px 9px", borderRadius: 12, fontSize: 12 }}>{activeImageIndex + 1} / {images.length}</span>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div style={{ display: "flex", gap: "0.75rem", overflowX: "auto", paddingBottom: 4 }}>
                {images.map((image, index) => (
                  <button key={image.id} type="button" onClick={() => setActiveImageIndex(index)} style={{ padding: 0, width: 100, height: 72, flex: "0 0 auto", overflow: "hidden", borderRadius: 4, cursor: "pointer", border: index === activeImageIndex ? `2px solid ${c.tc}` : `1px solid ${c.border1}`, background: c.card }}>
                    <img src={image.image_url} alt={image.alt_text || project.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div style={{ background: project.color, minHeight: 320, borderRadius: 4, display: "grid", placeItems: "center", color: c.muted, textAlign: "center", padding: "2rem" }}>
            Les visuels de ce projet seront bientôt disponibles.
          </div>
        )}
      </section>

    </main>
  );
}
