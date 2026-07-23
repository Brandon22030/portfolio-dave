import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSiteData } from "./useSiteData";
import { THEMES } from "./theme";

const NAV_LINKS = ["À propos", "Services", "Projets", "Contact"];
const SKILLS = ["Archicad", "Twinmotion", "Artlantis", "Enscape", "SketchUp", "AutoCAD", "BIM"];

function TitleWithAccent({ text, accent }) {
  const parts = (text || "").split(/(<span>[\s\S]*?<\/span>)/gi);

  return parts.map((part, index) => {
    const spanMatch = part.match(/^<span>([\s\S]*?)<\/span>$/i);
    if (spanMatch) {
      return (
        <span key={index} style={{ color: accent }}>
          {spanMatch[1]}
        </span>
      );
    }

    const [beforeAccent, accentText] = part.split("|");
    return (
      <span key={index}>
        {beforeAccent}
        {accentText && <span style={{ color: accent }}>{accentText}</span>}
      </span>
    );
  });
}

export default function App() {
  const { projects, services, settings, loading } = useSiteData();
  const [theme, setTheme] = useState(() => localStorage.getItem("planify-theme") || "dark");
  const [mobile, setMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const c = THEMES[theme];

  useEffect(() => {
    localStorage.setItem("planify-theme", theme);
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [theme]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSend = () => {
    if (formData.name && formData.message) setSent(true);
  };

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div
      style={{
        fontFamily: "'Segoe UI',sans-serif",
        background: c.bg,
        color: c.text,
        lineHeight: 1.7,
        minHeight: "100vh",
      }}
    >
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: `${c.bg}ee`,
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${c.border3}`,
          padding: mobile ? "0 1rem" : "0 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 60,
        }}
      >
        <span
          onClick={() => scrollTo("hero")}
          style={{ cursor: "pointer", fontWeight: 700, fontSize: 18, letterSpacing: 2, color: c.tc }}
        >
          PLANIFY<span style={{ color: c.text }}>BJ</span>
        </span>

        <div
          style={{
            display: mobile ? (menuOpen ? "flex" : "none") : "flex",
            flexDirection: mobile ? "column" : "row",
            gap: mobile ? "1rem" : "2rem",
            position: mobile ? "absolute" : "static",
            top: 60,
            left: 0,
            right: 0,
            background: mobile ? `${c.bg}fa` : "transparent",
            padding: mobile ? "1rem 2rem" : "0",
            borderBottom: mobile ? `1px solid ${c.border3}` : "none",
            alignItems: mobile ? "flex-start" : "center",
          }}
        >
          {NAV_LINKS.map((l) => (
            <span
              key={l}
              onClick={() => scrollTo(l.toLowerCase().replace("à", "a").replace(" ", ""))}
              style={{ cursor: "pointer", fontSize: 13, letterSpacing: 1, color: c.muted, transition: "color .2s" }}
              onMouseEnter={(e) => (e.target.style.color = c.tc)}
              onMouseLeave={(e) => (e.target.style.color = c.muted)}
            >
              {l.toUpperCase()}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button
            onClick={toggleTheme}
            aria-label="Changer de thème"
            style={{ background: "none", border: "none", color: c.text, fontSize: 20, cursor: "pointer", padding: 4 }}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: mobile ? "block" : "none",
              background: "none",
              border: "none",
              color: c.text,
              fontSize: 24,
              cursor: "pointer",
            }}
          >
            ☰
          </button>
        </div>
      </nav>

      {loading && (
        <div style={{ textAlign: "center", padding: "4rem", color: c.muted }}>Chargement…</div>
      )}

      <section
        id="hero"
        style={{
          minHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "4rem 2rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse 60% 50% at 50% 60%, ${c.tc22} 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
        <p style={{ fontSize: 12, letterSpacing: 4, color: c.tc, marginBottom: "1rem", fontWeight: 500 }}>
          {settings.hero_subtitle}
        </p>
        <h1 style={{ fontSize: "clamp(2.8rem,7vw,5rem)", fontWeight: 700, lineHeight: 1.1, margin: "0 0 1.5rem", maxWidth: 700 }}>
          <TitleWithAccent text={settings.hero_title} accent={c.tc} />
        </h1>
        <p style={{ fontSize: 17, color: c.muted, maxWidth: 520, marginBottom: "2.5rem" }}>{settings.hero_description}</p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={() => scrollTo("projets")}
            style={{
              background: c.tc,
              color: c.cardText,
              border: "none",
              padding: "13px 32px",
              borderRadius: 2,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: 1,
            }}
          >
            VOIR MES PROJETS
          </button>
          <button
            onClick={() => scrollTo("contact")}
            style={{
              background: "transparent",
              color: c.text,
              border: `1px solid ${c.border5}`,
              padding: "13px 32px",
              borderRadius: 2,
              fontSize: 14,
              cursor: "pointer",
              letterSpacing: 1,
            }}
          >
            ME CONTACTER
          </button>
        </div>
        <div
          style={{
            marginTop: "5rem",
            display: "flex",
            gap: mobile ? "1.5rem" : "3rem",
            flexWrap: "wrap",
            justifyContent: "center",
            opacity: 0.5,
            fontSize: 13,
            letterSpacing: 2,
            color: c.muted,
          }}
        >
          {["10+ PROJETS", "BIM MANAGER", "TWINMOTION"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </section>

      <section id="apropos" style={{ padding: "6rem 2rem", maxWidth: 900, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
            gap: mobile ? "2rem" : "4rem",
            alignItems: "center",
          }}
        >
          <div>
            <p style={{ fontSize: 11, letterSpacing: 4, color: c.tc, marginBottom: "1rem" }}>{settings.about_label}</p>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 700, lineHeight: 1.2, marginBottom: "1.5rem" }}>
              <TitleWithAccent text={settings.about_title} accent={c.tc} />
            </h2>
            <p style={{ color: c.muted, marginBottom: "1rem" }}>{settings.about_text1}</p>
            <p style={{ color: c.muted, marginBottom: "2rem" }}>{settings.about_text2}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {SKILLS.map((s) => (
                <span
                  key={s}
                  style={{
                    fontSize: 12,
                    padding: "5px 14px",
                    border: `1px solid ${c.tc60}`,
                    color: c.tc,
                    borderRadius: 20,
                    letterSpacing: 1,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div
            style={{
              background: c.card,
              borderRadius: 4,
              padding: "2.5rem",
              borderLeft: `3px solid ${c.tc}`,
            }}
          >
            <div style={{ marginBottom: "1.5rem" }}>
              <p style={{ fontSize: 11, color: c.muted, letterSpacing: 2, marginBottom: 4 }}>FORMATION</p>
              <p style={{ fontWeight: 500 }}>Licence en Génie Civil</p>
              <p style={{ fontSize: 13, color: c.muted }}>DT en DPB · Baccalauréat F4 · CAP BTP</p>
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <p style={{ fontSize: 11, color: c.muted, letterSpacing: 2, marginBottom: 4 }}>EXPÉRIENCE</p>
              <p style={{ fontWeight: 500 }}>MODULOR ARCHI URBA · S2AP · ECCO-GC</p>
              <p style={{ fontSize: 13, color: c.muted }}>Complexe Sécurité Défense, Abomey-Calavi</p>
            </div>
            <div>
              <p style={{ fontSize: 11, color: c.muted, letterSpacing: 2, marginBottom: 4 }}>OBJECTIF</p>
              <p style={{ fontWeight: 500, color: c.tc }}>BIM Manager</p>
            </div>
          </div>
        </div>
      </section>

      <div
        style={{
          height: 1,
          background: `linear-gradient(90deg, transparent, ${c.tc60}, transparent)`,
          maxWidth: 700,
          margin: "0 auto",
        }}
      />

      <section id="services" style={{ padding: "6rem 2rem", maxWidth: 900, margin: "0 auto" }}>
        <p style={{ fontSize: 11, letterSpacing: 4, color: c.tc, marginBottom: "1rem", textAlign: "center" }}>
          {settings.services_label}
        </p>
        <h2 style={{ fontSize: "2rem", fontWeight: 700, textAlign: "center", marginBottom: "3rem" }}>{settings.services_title}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1.5rem" }}>
          {services.map((s) => (
            <div
              key={s.id || s.title}
              style={{
                background: c.card,
                padding: "2rem 1.5rem",
                borderRadius: 4,
                border: `1px solid ${c.border1}`,
                transition: "border-color .3s",
                cursor: "default",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = c.tc60)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = c.border1)}
            >
              <div style={{ fontSize: 32, marginBottom: "1rem" }}>{s.icon}</div>
              <h3 style={{ fontWeight: 600, fontSize: 16, marginBottom: "0.75rem" }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: c.muted, lineHeight: 1.7 }}>{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="projets" style={{ padding: "6rem 2rem", maxWidth: 900, margin: "0 auto" }}>
        <p style={{ fontSize: 11, letterSpacing: 4, color: c.tc, marginBottom: "1rem", textAlign: "center" }}>
          {settings.projects_label}
        </p>
        <h2 style={{ fontSize: "2rem", fontWeight: 700, textAlign: "center", marginBottom: "3rem" }}>{settings.projects_title}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.5rem" }}>
          {projects.map((p, i) => (
            <div
              key={p.id || i}
              style={{
                borderRadius: 4,
                overflow: "hidden",
                border: `1px solid ${c.border1}`,
                background: c.card,
                cursor: "pointer",
                transition: "transform .2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <div
                style={{
                  height: 160,
                  background: p.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(135deg, ${c.tc30} 0%, transparent 60%)`,
                  }}
                />
                <span style={{ fontSize: 40, opacity: 0.3 }}>🏛️</span>
                <span
                  style={{
                    position: "absolute",
                    bottom: 12,
                    right: 14,
                    fontSize: 11,
                    color: c.cardText,
                    opacity: 0.5,
                    letterSpacing: 2,
                  }}
                >
                  {p.year}
                </span>
              </div>
              <div style={{ padding: "1.25rem" }}>
                <p style={{ fontSize: 10, letterSpacing: 3, color: c.tc, marginBottom: 6 }}>{p.type.toUpperCase()}</p>
                <h3 style={{ fontWeight: 600, fontSize: 15, color: c.cardText }}>{p.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div
        style={{
          height: 1,
          background: `linear-gradient(90deg, transparent, ${c.tc60}, transparent)`,
          maxWidth: 700,
          margin: "0 auto",
        }}
      />

      <section id="contact" style={{ padding: "6rem 2rem", maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontSize: 11, letterSpacing: 4, color: c.tc, marginBottom: "1rem" }}>{settings.contact_label}</p>
        <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1rem" }}>{settings.contact_title}</h2>
        <p style={{ color: c.muted, marginBottom: "3rem" }}>{settings.contact_description}</p>

        {!sent ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", textAlign: "left" }}>
            <input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Votre nom"
              style={{
                background: c.card,
                border: `1px solid ${c.border4}`,
                color: c.text,
                padding: "14px 16px",
                borderRadius: 2,
                fontSize: 14,
                outline: "none",
                width: "100%",
                boxSizing: "border-box",
                fontFamily: "inherit",
              }}
            />
            <input
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Votre email (optionnel)"
              style={{
                background: c.card,
                border: `1px solid ${c.border4}`,
                color: c.text,
                padding: "14px 16px",
                borderRadius: 2,
                fontSize: 14,
                outline: "none",
                width: "100%",
                boxSizing: "border-box",
                fontFamily: "inherit",
              }}
            />
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Décrivez votre projet..."
              rows={5}
              style={{
                background: c.card,
                border: `1px solid ${c.border4}`,
                color: c.text,
                padding: "14px 16px",
                borderRadius: 2,
                fontSize: 14,
                outline: "none",
                resize: "vertical",
                width: "100%",
                boxSizing: "border-box",
                fontFamily: "inherit",
              }}
            />
            <button
              onClick={handleSend}
              style={{
                background: c.tc,
                color: c.cardText,
                border: "none",
                padding: "14px",
                borderRadius: 2,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: 1,
              }}
            >
              ENVOYER LE MESSAGE
            </button>
          </div>
        ) : (
          <div
            style={{
              background: c.card,
              borderRadius: 4,
              padding: "3rem",
              border: `1px solid ${c.tc40}`,
            }}
          >
            <div style={{ fontSize: 48, marginBottom: "1rem" }}>✅</div>
            <h3 style={{ fontWeight: 600, marginBottom: 8 }}>Message bien reçu !</h3>
            <p style={{ color: c.muted }}>Je vous recontacte très bientôt.</p>
          </div>
        )}

        <div
          style={{
            marginTop: "3rem",
            display: "flex",
            justifyContent: "center",
            gap: mobile ? "1.5rem" : "2rem",
            flexWrap: "wrap",
          }}
        >
          {[
            { href: "https://wa.me/22900000000", label: "WHATSAPP" },
            { href: "https://tiktok.com/@PlanifyBJ", label: "TIKTOK @PLANIFYBJ" },
            { href: "https://linkedin.com", label: "LINKEDIN" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{ color: c.muted, textDecoration: "none", fontSize: 13, letterSpacing: 1 }}
              onMouseEnter={(e) => (e.target.style.color = c.tc)}
              onMouseLeave={(e) => (e.target.style.color = c.muted)}
            >
              {l.label}
            </a>
          ))}
        </div>
      </section>

      <footer
        style={{
          borderTop: `1px solid ${c.border2}`,
          padding: "2rem",
          textAlign: "center",
          color: c.muted,
          fontSize: 12,
          letterSpacing: 2,
        }}
      >
        <span style={{ color: c.tc, fontWeight: 700 }}>PLANIFYBJ</span> · BENNETT · COTONOU, BÉNIN · {new Date().getFullYear()} ·{" "}
        <Link to="/dashboard" style={{ color: c.muted, textDecoration: "none" }}>
          admin
        </Link>
      </footer>
    </div>
  );
}
