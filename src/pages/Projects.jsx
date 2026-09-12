import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { COLORS, FONTS } from "../theme";
import { useProjects } from "../hooks/resources";
import { useIsMobile, useIsTablet } from "../hooks/useIsMobile";

const CATS = ["Tous", "Résidentiel", "Collectif", "Patrimoine"];

function ProjectsMobile({ projects, filtered, filter, setFilter }) {
  return (
    <div style={{ background: COLORS.sand }}>
      <Header variant="light" />

      <div style={{ padding: "24px 20px 0", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracotta }}>Portfolio</div>
        <h1 style={{ margin: 0, fontSize: 40, fontWeight: 300, lineHeight: 1.02, letterSpacing: "-.035em" }}>
          Projets <span style={{ fontWeight: 600 }}>construits & dessinés</span>
        </h1>
        <div style={{ fontFamily: FONTS.display, fontSize: 13, color: COLORS.text2 }}>
          {filtered.length} / {projects.length}
        </div>
      </div>

      <div style={{ margin: "28px 20px 0", display: "flex", gap: 8, flexWrap: "wrap", borderTop: `1px solid ${COLORS.ink}`, padding: "20px 0 0" }}>
        {CATS.map((cat) => {
          const active = filter === cat;
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                fontFamily: "inherit",
                fontSize: 13,
                padding: "11px 16px",
                border: `1px solid ${active ? COLORS.ink : COLORS.taupe}`,
                background: active ? COLORS.ink : "transparent",
                color: active ? COLORS.sand : COLORS.text1,
                cursor: "pointer",
                letterSpacing: ".02em",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div style={{ padding: "32px 20px 72px", display: "flex", flexDirection: "column", gap: 36 }}>
        {filtered.map((p, i) => (
          <Reveal key={p.id || p.slug} as={Link} delay={(i % 3) * 0.08} to={`/projets/${p.slug}`} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ position: "relative", aspectRatio: "4/3", background: COLORS.taupe, overflow: "hidden" }}>
              <img src={p.cover_image_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", top: 12, left: 12, background: COLORS.sand, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", padding: "7px 10px" }}>
                {p.category}
              </div>
              <div style={{ position: "absolute", bottom: 12, right: 12, background: COLORS.ink, color: COLORS.sand, fontFamily: FONTS.display, fontSize: 11, padding: "7px 10px" }}>
                {p.year}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <div style={{ fontSize: 19, fontWeight: 500, letterSpacing: "-.01em" }}>{p.title}</div>
              <div style={{ fontSize: 12, color: COLORS.text2 }}>
                {p.client_type} · {p.surface}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Footer />
    </div>
  );
}

function ProjectsTablet({ projects, filtered, filter, setFilter }) {
  return (
    <div style={{ background: COLORS.sand }}>
      <Header variant="light" />

      <div style={{ padding: "88px 40px 0", display: "flex", justifyContent: "space-between", alignItems: "end" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracotta }}>Portfolio</div>
          <h1 style={{ margin: 0, fontSize: 48, fontWeight: 300, lineHeight: 1.02, letterSpacing: "-.035em" }}>
            Projets <span style={{ fontWeight: 600 }}>construits & dessinés</span>
          </h1>
        </div>
        <div style={{ fontFamily: FONTS.display, fontSize: 13, color: COLORS.text2 }}>
          {filtered.length} / {projects.length}
        </div>
      </div>

      <div style={{ margin: "36px 40px 0", display: "flex", gap: 8, flexWrap: "wrap", borderTop: `1px solid ${COLORS.ink}`, padding: "20px 0 0" }}>
        {CATS.map((cat) => {
          const active = filter === cat;
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                fontFamily: "inherit",
                fontSize: 13,
                padding: "11px 18px",
                border: `1px solid ${active ? COLORS.ink : COLORS.taupe}`,
                background: active ? COLORS.ink : "transparent",
                color: active ? COLORS.sand : COLORS.text1,
                cursor: "pointer",
                letterSpacing: ".02em",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div style={{ padding: "40px 40px 96px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px 28px" }}>
        {filtered.map((p, i) => (
          <Reveal key={p.id || p.slug} as={Link} delay={(i % 4) * 0.08} to={`/projets/${p.slug}`} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ position: "relative", aspectRatio: "4/3", background: COLORS.taupe, overflow: "hidden" }}>
              <img src={p.cover_image_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", top: 14, left: 14, background: COLORS.sand, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", padding: "7px 10px" }}>
                {p.category}
              </div>
              <div style={{ position: "absolute", bottom: 14, right: 14, background: COLORS.ink, color: COLORS.sand, fontFamily: FONTS.display, fontSize: 11, padding: "7px 10px" }}>
                {p.year}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <div style={{ fontSize: 19, fontWeight: 500, letterSpacing: "-.01em" }}>{p.title}</div>
              <div style={{ fontSize: 12, color: COLORS.text2 }}>
                {p.client_type} · {p.surface}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default function Projects() {
  const { rows: projects } = useProjects();
  const [filter, setFilter] = useState("Tous");
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const filtered = filter === "Tous" ? projects : projects.filter((p) => p.category === filter);

  if (isMobile) return <ProjectsMobile projects={projects} filtered={filtered} filter={filter} setFilter={setFilter} />;
  if (isTablet) return <ProjectsTablet projects={projects} filtered={filtered} filter={filter} setFilter={setFilter} />;

  return (
    <div style={{ background: COLORS.sand }}>
      <Header variant="light" />

      <div style={{ padding: "64px 64px 0", display: "flex", justifyContent: "space-between", alignItems: "end" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracotta }}>Portfolio</div>
          <h1 style={{ margin: 0, fontSize: 64, fontWeight: 300, lineHeight: 1.02, letterSpacing: "-.035em" }}>
            Projets <span style={{ fontWeight: 600 }}>construits & dessinés</span>
          </h1>
        </div>
        <div style={{ fontFamily: FONTS.display, fontSize: 14, color: COLORS.text2 }}>
          {filtered.length} / {projects.length}
        </div>
      </div>

      <div style={{ margin: "48px 64px 0", display: "flex", gap: 8, flexWrap: "wrap", borderTop: `1px solid ${COLORS.ink}`, padding: "24px 0 0" }}>
        {CATS.map((cat) => {
          const active = filter === cat;
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                fontFamily: "inherit",
                fontSize: 13,
                padding: "11px 20px",
                border: `1px solid ${active ? COLORS.ink : COLORS.taupe}`,
                background: active ? COLORS.ink : "transparent",
                color: active ? COLORS.sand : COLORS.text1,
                cursor: "pointer",
                letterSpacing: ".02em",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div style={{ padding: "48px 64px 128px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "48px 32px" }}>
        {filtered.map((p, i) => (
          <Reveal key={p.id || p.slug} as={Link} delay={(i % 3) * 0.1} to={`/projets/${p.slug}`} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ position: "relative", aspectRatio: "4/3", background: COLORS.taupe, overflow: "hidden" }}>
              <img src={p.cover_image_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", top: 14, left: 14, background: COLORS.sand, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", padding: "7px 11px" }}>
                {p.category}
              </div>
              <div style={{ position: "absolute", bottom: 14, right: 14, background: COLORS.ink, color: COLORS.sand, fontFamily: FONTS.display, fontSize: 11, padding: "7px 11px" }}>
                {p.year}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ fontSize: 19, fontWeight: 500, letterSpacing: "-.01em" }}>{p.title}</div>
              <div style={{ fontSize: 13, color: COLORS.text2 }}>
                {p.client_type} · {p.surface}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Footer />
    </div>
  );
}
