import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { COLORS, FONTS } from "../theme";
import { useProjects } from "../hooks/resources";
import { useIsMobile, useIsTablet } from "../hooks/useIsMobile";
import { supabase } from "../supabaseClient";

const DRAWING_TABS = ["Rez-de-chaussée", "Étage supérieur", "Coupe transversale", "Coupe longitudinale"];
const DRAWING_TABS_SHORT = ["Rez-de-chaussée", "Étage", "Coupe transv.", "Coupe long."];

function splitTitle(title) {
  const [first, ...rest] = title.split(" ");
  return { first, rest: rest.join(" ") };
}

function BlueprintPanel({ height, caption, code, accent }) {
  return (
    <div style={{ position: "relative", height, background: COLORS.taupe, backgroundImage: "linear-gradient(#cfc8bc 1px,transparent 1px),linear-gradient(90deg,#cfc8bc 1px,transparent 1px)", backgroundSize: "40px 40px", backgroundColor: COLORS.sand }}>
      <svg width="100%" height="100%" viewBox="0 0 800 520" preserveAspectRatio="xMidYMid meet">
        <rect x="60" y="60" width="680" height="400" fill="none" stroke={COLORS.ink} strokeWidth="3" />
        <path d="M300 60 A60 60 0 0 1 360 120" fill="none" stroke={COLORS.ink} strokeWidth="2" />
        <circle cx="620" cy="300" r="60" fill="none" stroke={COLORS.ink} strokeWidth="2" />
        <rect x="360" y="300" width="140" height="60" fill={accent ? COLORS.terracotta : "none"} stroke={COLORS.ink} strokeWidth="2" />
      </svg>
      <div style={{ position: "absolute", left: 16, bottom: 12, fontSize: 12, color: COLORS.text2 }}>{caption}</div>
      {code && (
        <div style={{ position: "absolute", right: 16, bottom: 12, fontFamily: FONTS.display, fontSize: 11, color: COLORS.terracotta }}>{code}</div>
      )}
    </div>
  );
}

function ProjectDetailMobile({ project, index, projects, gallery, prev, next }) {
  const [tab, setTab] = useState(DRAWING_TABS[0]);
  const { first, rest } = splitTitle(project.title);
  const paragraphs = (project.description || "").split("\n\n");

  return (
    <div style={{ background: COLORS.sand }}>
      <Header variant="dark" />
      <div style={{ position: "relative", height: 640, background: COLORS.ink, overflow: "hidden" }}>
        <img src={project.cover_image_url} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(20,18,15,.6) 0%,rgba(20,18,15,0) 35%,rgba(20,18,15,.85) 100%)" }} />
        <div style={{ position: "absolute", left: 20, right: 20, bottom: 32, color: COLORS.sand, display: "flex", flexDirection: "column", gap: 20 }}>
          <Link to="/projets" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".16em", color: COLORS.terracottaLight }}>
            ← Tous les projets
          </Link>
          <h1 style={{ margin: 0, fontSize: 44, fontWeight: 300, lineHeight: 0.98, letterSpacing: "-.035em" }}>
            {first} <span style={{ fontWeight: 600 }}>{rest}</span>
          </h1>
          <div style={{ display: "flex", gap: 24, fontSize: 12, borderTop: "1px solid rgba(239,233,223,.25)", paddingTop: 16 }}>
            {[
              ["Catégorie", project.category],
              ["Type", project.client_type],
              ["Année", project.year],
            ].map(([label, value]) => (
              <div key={label}>
                <div style={{ color: COLORS.text5, marginBottom: 3 }}>{label}</div>
                <div>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {project.quote_text && (
        <div style={{ padding: "48px 20px 0", display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontFamily: FONTS.display, fontSize: 64, fontWeight: 500, lineHeight: 0.8, color: COLORS.terracotta }}>
            {String(index + 1).padStart(2, "0")}
          </div>
          <div style={{ borderLeft: `2px solid ${COLORS.terracotta}`, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontSize: 21, fontWeight: 300, lineHeight: 1.4, letterSpacing: "-.015em" }}>« {project.quote_text} »</div>
            <div style={{ fontSize: 12, color: COLORS.text2, lineHeight: 1.5 }}>
              <span style={{ color: COLORS.ink, fontWeight: 500 }}>{project.quote_author}</span> - {project.quote_role}
            </div>
          </div>
        </div>
      )}

      <div style={{ padding: "56px 20px 0", display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracotta }}>Description architecturale</div>
        {project.lead && <div style={{ fontSize: 21, fontWeight: 300, lineHeight: 1.4, letterSpacing: "-.015em" }}>{project.lead}</div>}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: 15, lineHeight: 1.75, color: COLORS.text1 }}>
          {paragraphs.map((p, i) => (
            <p key={i} style={{ margin: 0 }}>
              {p}
            </p>
          ))}
        </div>
      </div>

      <div style={{ margin: "40px 20px 0", display: "flex", flexDirection: "column", borderTop: `2px solid ${COLORS.ink}`, fontSize: 14 }}>
        {Object.entries(project.sheet || {}).map(([label, value]) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", gap: 16, borderBottom: `1px solid ${COLORS.taupe}`, padding: "12px 0" }}>
            <div style={{ color: COLORS.text2, flexShrink: 0 }}>{label}</div>
            <div style={{ fontWeight: 500, textAlign: "right" }}>{value}</div>
          </div>
        ))}
        <button
          style={{
            marginTop: 20,
            background: COLORS.ink,
            color: COLORS.sand,
            border: "none",
            padding: 16,
            fontSize: 13,
            letterSpacing: ".06em",
            cursor: "pointer",
          }}
        >
          Télécharger la fiche PDF
        </button>
      </div>

      {gallery.length > 0 && (
        <>
          <div style={{ padding: "64px 20px 0", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracotta }}>
              Vues du projet · {gallery.length} vues
            </div>
            <h2 style={{ margin: 0, fontSize: 32, fontWeight: 300, letterSpacing: "-.03em" }}>
              Façades, plans, <span style={{ fontWeight: 600 }}>détails.</span>
            </h2>
          </div>
          <div style={{ padding: "28px 20px 0", display: "flex", flexDirection: "column", gap: 16 }}>
            {gallery.map((shot) => (
              <figure key={shot.url} style={{ margin: 0, position: "relative", aspectRatio: "4/3", background: COLORS.taupe, overflow: "hidden" }}>
                <img src={shot.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <figcaption style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "12px 16px", background: "linear-gradient(180deg,transparent,rgba(20,18,15,.75))", color: COLORS.sand, fontSize: 12, letterSpacing: ".04em" }}>
                  {shot.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </>
      )}

      <div style={{ margin: "72px 0 0", background: COLORS.ink, color: COLORS.sand, padding: "64px 20px", display: "flex", flexDirection: "column", gap: 28 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracottaLight }}>Documents techniques</div>
          <h2 style={{ margin: 0, fontSize: 32, fontWeight: 300, letterSpacing: "-.03em" }}>
            Plans techniques <span style={{ fontWeight: 600 }}>& coupes</span>
          </h2>
        </div>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", whiteSpace: "nowrap", fontSize: 12 }}>
          {DRAWING_TABS.map((t, i) => {
            const active = tab === t;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  fontFamily: "inherit",
                  cursor: "pointer",
                  flexShrink: 0,
                  background: active ? COLORS.sand : "transparent",
                  color: active ? COLORS.ink : COLORS.sand,
                  border: active ? "none" : "1px solid rgba(239,233,223,.3)",
                  padding: active ? "9px 14px" : "8px 14px",
                }}
              >
                {DRAWING_TABS_SHORT[i]}
              </button>
            );
          })}
        </div>

        <div style={{ aspectRatio: "4/3" }}>
          <BlueprintPanel height="100%" caption={`${tab} - 1:100`} code="A-101" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, borderTop: "1px solid rgba(239,233,223,.15)", paddingTop: 28 }}>
          <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracottaLight }}>Logiciels utilisés</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {(project.softwares || []).map((s) => (
              <span key={s} style={{ border: "1px solid rgba(239,233,223,.3)", fontSize: 12, padding: "9px 14px" }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, fontSize: 12, borderTop: "1px solid rgba(239,233,223,.15)", paddingTop: 20 }}>
          <Link to={`/projets/${prev.slug}`} style={{ color: COLORS.text3 }}>
            ← {prev.title}
          </Link>
          <Link to={`/projets/${next.slug}`} style={{ borderBottom: `2px solid ${COLORS.terracottaLight}` }}>
            {next.title} →
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function ProjectDetailTablet({ project, index, gallery, prev, next }) {
  const [tab, setTab] = useState(DRAWING_TABS[0]);
  const { first, rest } = splitTitle(project.title);
  const paragraphs = (project.description || "").split("\n\n");
  const views = gallery.map((shot, i) => ({
    ...shot,
    col: i === 0 ? "1 / -1" : "auto",
    ratio: i === 0 ? "16/9" : "4/3",
  }));

  return (
    <div style={{ background: COLORS.sand }}>
      <Header variant="dark" />
      <div style={{ position: "relative", height: 640, background: COLORS.ink, overflow: "hidden" }}>
        <img src={project.cover_image_url} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(20,18,15,.6) 0%,rgba(20,18,15,0) 35%,rgba(20,18,15,.75) 100%)" }} />
        <div style={{ position: "absolute", left: 40, right: 40, bottom: 48, color: COLORS.sand, display: "flex", flexDirection: "column", gap: 20 }}>
          <Link to="/projets" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: ".16em", color: COLORS.terracottaLight }}>
            ← Tous les projets
          </Link>
          <h1 style={{ margin: 0, fontSize: 64, fontWeight: 300, lineHeight: 0.97, letterSpacing: "-.035em" }}>
            {first} <span style={{ fontWeight: 600 }}>{rest}</span>
          </h1>
          <div style={{ display: "flex", gap: 32, fontSize: 13, borderTop: "1px solid rgba(239,233,223,.25)", paddingTop: 18 }}>
            {[
              ["Catégorie", project.category],
              ["Type", project.client_type],
              ["Année", project.year],
            ].map(([label, value]) => (
              <div key={label}>
                <div style={{ color: COLORS.text5, marginBottom: 3 }}>{label}</div>
                <div>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {project.quote_text && (
        <div style={{ padding: "72px 40px 0", display: "grid", gridTemplateColumns: "140px 1fr", gap: 32, alignItems: "start" }}>
          <div style={{ fontFamily: FONTS.display, fontSize: 72, fontWeight: 500, lineHeight: 0.8, color: COLORS.terracotta }}>
            {String(index + 1).padStart(2, "0")}
          </div>
          <div style={{ borderLeft: `2px solid ${COLORS.terracotta}`, paddingLeft: 24 }}>
            <div style={{ fontSize: 24, fontWeight: 300, lineHeight: 1.4, letterSpacing: "-.015em" }}>« {project.quote_text} »</div>
            <div style={{ marginTop: 14, fontSize: 13, color: COLORS.text2 }}>
              <span style={{ color: COLORS.ink, fontWeight: 500 }}>{project.quote_author}</span> - {project.quote_role}
            </div>
          </div>
        </div>
      )}

      <div style={{ padding: "80px 40px 0", display: "flex", flexDirection: "column", gap: 40 }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracotta, marginBottom: 20 }}>Description architecturale</div>
          {project.lead && (
            <div style={{ fontSize: 24, fontWeight: 300, lineHeight: 1.4, letterSpacing: "-.015em", marginBottom: 24 }}>{project.lead}</div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 18, fontSize: 15, lineHeight: 1.75, color: COLORS.text1 }}>
            {paragraphs.map((p, i) => (
              <p key={i} style={{ margin: 0 }}>
                {p}
              </p>
            ))}
          </div>
        </div>
        <div style={{ borderTop: `2px solid ${COLORS.ink}`, fontSize: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 32px" }}>
            {Object.entries(project.sheet || {}).map(([label, value]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${COLORS.taupe}`, padding: "14px 0" }}>
                <div style={{ color: COLORS.text2 }}>{label}</div>
                <div style={{ fontWeight: 500, textAlign: "right" }}>{value}</div>
              </div>
            ))}
          </div>
          <button
            style={{
              width: "100%",
              marginTop: 24,
              background: COLORS.ink,
              color: COLORS.sand,
              border: "none",
              padding: "16px 20px",
              fontSize: 13,
              letterSpacing: ".06em",
              cursor: "pointer",
            }}
          >
            Télécharger la fiche PDF
          </button>
        </div>
      </div>

      {views.length > 0 && (
        <>
          <div style={{ padding: "80px 40px 0", display: "flex", justifyContent: "space-between", alignItems: "end" }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracotta, marginBottom: 16 }}>Vues du projet</div>
              <h2 style={{ margin: 0, fontSize: 38, fontWeight: 300, letterSpacing: "-.03em" }}>
                Façades, plans, <span style={{ fontWeight: 600 }}>détails.</span>
              </h2>
            </div>
            <div style={{ fontSize: 13, color: COLORS.text2 }}>{views.length} vues</div>
          </div>

          <div style={{ padding: "32px 40px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {views.map((shot) => (
              <div key={shot.url} style={{ position: "relative", gridColumn: shot.col, aspectRatio: shot.ratio, overflow: "hidden" }}>
                <img src={shot.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent,rgba(20,18,15,.75))" }} />
                <div style={{ position: "absolute", left: 14, bottom: 12, color: COLORS.sand, fontSize: 12 }}>{shot.caption}</div>
              </div>
            ))}
          </div>
        </>
      )}

      <div style={{ margin: "96px 0 0", background: COLORS.ink, color: COLORS.sand, padding: "72px 40px", display: "flex", flexDirection: "column", gap: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracottaLight, marginBottom: 10 }}>Documents techniques</div>
            <h2 style={{ margin: 0, fontSize: 36, fontWeight: 300 }}>
              Plans techniques <span style={{ fontWeight: 600 }}>& coupes</span>
            </h2>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {DRAWING_TABS.map((t) => {
            const active = tab === t;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  fontFamily: "inherit",
                  fontSize: 12,
                  cursor: "pointer",
                  background: active ? COLORS.sand : "transparent",
                  color: active ? COLORS.ink : COLORS.sand,
                  border: active ? "none" : "1px solid rgba(239,233,223,.3)",
                  padding: active ? "9px 16px" : "8px 16px",
                }}
              >
                {t}
              </button>
            );
          })}
        </div>

        <div style={{ aspectRatio: "3/2" }}>
          <BlueprintPanel height="100%" caption={`${tab} - 1:100`} code="A-101" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24, borderTop: "1px solid rgba(239,233,223,.15)", paddingTop: 28 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracottaLight, marginBottom: 14 }}>Logiciels utilisés</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {(project.softwares || []).map((s) => (
                <span key={s} style={{ border: "1px solid rgba(239,233,223,.3)", fontSize: 12, padding: "9px 14px" }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, fontSize: 13, borderTop: "1px solid rgba(239,233,223,.15)", paddingTop: 20 }}>
            <Link to={`/projets/${prev.slug}`} style={{ color: COLORS.text3 }}>
              ← {prev.title}
            </Link>
            <Link to={`/projets/${next.slug}`} style={{ borderBottom: `2px solid ${COLORS.terracottaLight}` }}>
              {next.title} →
            </Link>
          </div>
        </div>
      </div>

      <Footer tabletTopPadding="0 40px 32px" />
    </div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const { rows: projects, loading } = useProjects();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [tab, setTab] = useState(DRAWING_TABS[0]);
  const [uploadedImages, setUploadedImages] = useState([]);

  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];

  useEffect(() => {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(project?.id || "");
    if (!isUuid) return;
    supabase
      .from("project_images")
      .select("*")
      .eq("project_id", project.id)
      .order("order_index", { ascending: true })
      .then(({ data, error }) => {
        if (!error && data?.length) {
          setUploadedImages(data.map((img) => ({ url: img.image_url, caption: img.alt_text || "" })));
        }
      });
  }, [project?.id]);

  if (loading) {
    return <div style={{ background: COLORS.sand, minHeight: "100vh" }} />;
  }

  if (!project) {
    return (
      <div style={{ background: COLORS.sand, minHeight: "100vh" }}>
        <Header variant="light" />
        <div style={{ padding: "6rem 64px", textAlign: "center", color: COLORS.text2 }}>
          <p>Ce projet est introuvable.</p>
          <Link to="/projets" style={{ color: COLORS.terracotta }}>
            Retour aux projets
          </Link>
        </div>
      </div>
    );
  }

  const { first, rest } = splitTitle(project.title);
  const paragraphs = (project.description || "").split("\n\n");
  const gallery = uploadedImages.length ? uploadedImages : project.gallery || [];
  const mainShots = gallery.slice(0, 3);
  const extraShots = gallery.slice(3, 6);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  if (isMobile) {
    return <ProjectDetailMobile project={project} index={index} projects={projects} gallery={gallery} prev={prev} next={next} />;
  }

  if (isTablet) {
    return <ProjectDetailTablet project={project} index={index} gallery={gallery} prev={prev} next={next} />;
  }

  return (
    <div style={{ background: COLORS.sand }}>
      <Header variant="dark" />
      <div style={{ position: "relative", height: 820, background: COLORS.ink, overflow: "hidden" }}>
        <img src={project.cover_image_url} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(20,18,15,.6) 0%,rgba(20,18,15,0) 35%,rgba(20,18,15,.7) 100%)" }} />
        <div style={{ position: "absolute", left: 64, right: 64, bottom: 64, color: COLORS.sand, display: "flex", justifyContent: "space-between", alignItems: "end" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Link to="/projets" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: ".16em", color: COLORS.terracottaLight }}>
              ← Tous les projets
            </Link>
            <h1 style={{ margin: 0, fontSize: 96, fontWeight: 300, lineHeight: 0.95, letterSpacing: "-.035em" }}>
              {first} <span style={{ fontWeight: 600 }}>{rest}</span>
            </h1>
          </div>
          <div style={{ display: "flex", gap: 40, fontSize: 13 }}>
            {[
              ["Catégorie", project.category],
              ["Type", project.client_type],
              ["Année", project.year],
            ].map(([label, value]) => (
              <div key={label}>
                <div style={{ color: COLORS.text5, marginBottom: 4 }}>{label}</div>
                <div>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {project.quote_text && (
        <div style={{ padding: "80px 64px 0", display: "grid", gridTemplateColumns: "200px 1fr", gap: 48, alignItems: "start" }}>
          <div style={{ fontFamily: FONTS.display, fontSize: 96, fontWeight: 500, lineHeight: 0.8, color: COLORS.terracotta }}>
            {String(index + 1).padStart(2, "0")}
          </div>
          <div style={{ borderLeft: `2px solid ${COLORS.terracotta}`, paddingLeft: 32, maxWidth: 760 }}>
            <div style={{ fontSize: 30, fontWeight: 300, lineHeight: 1.35, letterSpacing: "-.015em" }}>« {project.quote_text} »</div>
            <div style={{ marginTop: 16, fontSize: 13, color: COLORS.text2 }}>
              <span style={{ color: COLORS.ink, fontWeight: 500 }}>{project.quote_author}</span> - {project.quote_role}
            </div>
          </div>
        </div>
      )}

      <div style={{ padding: "96px 64px 0", display: "grid", gridTemplateColumns: "1fr 380px", gap: 96 }}>
        <div>
          <div style={{ fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracotta, marginBottom: 24 }}>Description architecturale</div>
          {project.lead && (
            <div style={{ fontSize: 30, fontWeight: 300, lineHeight: 1.35, letterSpacing: "-.015em", maxWidth: 720, marginBottom: 32 }}>{project.lead}</div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 20, fontSize: 16, lineHeight: 1.75, color: COLORS.text1, maxWidth: 640 }}>
            {paragraphs.map((p, i) => (
              <p key={i} style={{ margin: 0 }}>
                {p}
              </p>
            ))}
          </div>
        </div>
        <div style={{ borderTop: `2px solid ${COLORS.ink}`, fontSize: 14 }}>
          {Object.entries(project.sheet || {}).map(([label, value]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${COLORS.taupe}`, padding: "14px 0" }}>
              <div style={{ color: COLORS.text2 }}>{label}</div>
              <div style={{ fontWeight: 500, textAlign: "right" }}>{value}</div>
            </div>
          ))}
          <button
            style={{
              width: "100%",
              marginTop: 24,
              background: COLORS.ink,
              color: COLORS.sand,
              border: "none",
              padding: "16px 20px",
              fontSize: 13,
              letterSpacing: ".06em",
              cursor: "pointer",
            }}
          >
            Télécharger la fiche PDF
          </button>
        </div>
      </div>

      {gallery.length > 0 && (
        <>
          <div style={{ padding: "96px 64px 0", display: "flex", justifyContent: "space-between", alignItems: "end" }}>
            <div>
              <div style={{ fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracotta, marginBottom: 20 }}>Vues du projet</div>
              <h2 style={{ margin: 0, fontSize: 48, fontWeight: 300, letterSpacing: "-.03em" }}>
                Façades, plans, <span style={{ fontWeight: 600 }}>détails.</span>
              </h2>
            </div>
            <div style={{ fontSize: 13, color: COLORS.text2 }}>{gallery.length} vues</div>
          </div>

          <div style={{ padding: "40px 64px 0", display: "grid", gridTemplateColumns: mainShots.length > 1 ? "2fr 1fr" : "1fr", gridAutoRows: 400, gap: 24 }}>
            {mainShots.map((shot, i) => (
              <div key={shot.url} style={{ position: "relative", gridRow: i === 0 && mainShots.length > 1 ? "span 2" : "auto", overflow: "hidden" }}>
                <img src={shot.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent,rgba(20,18,15,.75))" }} />
                <div style={{ position: "absolute", left: 16, bottom: 14, color: COLORS.sand, fontSize: 13 }}>{shot.caption}</div>
              </div>
            ))}
          </div>

          {extraShots.length > 0 && (
            <div style={{ padding: "24px 64px 0", display: "grid", gridTemplateColumns: `repeat(${extraShots.length},1fr)`, gap: 24 }}>
              {extraShots.map((shot) => (
                <div key={shot.url} style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
                  <img src={shot.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent,rgba(20,18,15,.75))" }} />
                  <div style={{ position: "absolute", left: 12, bottom: 10, color: COLORS.sand, fontSize: 12 }}>{shot.caption}</div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <div style={{ margin: "128px 0 0", background: COLORS.ink, color: COLORS.sand, padding: "96px 64px", display: "flex", flexDirection: "column", gap: 40 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracottaLight, marginBottom: 12 }}>Documents techniques</div>
            <h2 style={{ margin: 0, fontSize: 48, fontWeight: 300 }}>
              Plans techniques <span style={{ fontWeight: 600 }}>& coupes</span>
            </h2>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {DRAWING_TABS.map((t) => {
              const active = tab === t;
              return (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  style={{
                    fontFamily: "inherit",
                    fontSize: 13,
                    cursor: "pointer",
                    background: active ? COLORS.sand : "transparent",
                    color: active ? COLORS.ink : COLORS.sand,
                    border: active ? "none" : "1px solid rgba(239,233,223,.3)",
                    padding: active ? "10px 18px" : "9px 18px",
                  }}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
          <BlueprintPanel height={640} caption={`${tab} - 1:100`} code="A-101" />
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <BlueprintPanel height={308} caption="Coupe transversale" />
            <BlueprintPanel height={308} caption="Coupe AA" accent />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, borderTop: "1px solid rgba(239,233,223,.15)", paddingTop: 40 }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracottaLight, marginBottom: 16 }}>Logiciels utilisés</div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {(project.softwares || []).map((s) => (
                <span key={s} style={{ border: "1px solid rgba(239,233,223,.3)", fontSize: 13, padding: "10px 16px" }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 32, fontSize: 14 }}>
            <Link to={`/projets/${prev.slug}`} style={{ color: COLORS.text3 }}>
              ← {prev.title}
            </Link>
            <Link to={`/projets/${next.slug}`} style={{ borderBottom: `2px solid ${COLORS.terracottaLight}` }}>
              {next.title} →
            </Link>
          </div>
        </div>
      </div>

      <Footer topPadding="0 64px 40px" />
    </div>
  );
}
