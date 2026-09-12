import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { COLORS, FONTS } from "../theme";
import { EXPERTISES, STEPS } from "../data/defaults";
import { useProjects } from "../hooks/resources";
import { useIsMobile, useIsTablet } from "../hooks/useIsMobile";

const MARQUEE = [
  "Conception architecturale",
  "Dessin technique",
  "Dossiers de permis",
  "Visualisation 3D",
  "Suivi de chantier",
  "Archicad · Revit · AutoCAD · Twinmotion · Lumion",
];

const MOBILE_MARQUEE = ["Conception architecturale", "Dessin technique", "Dossiers de permis", "Visualisation 3D"];

function HomeMobile({ projects }) {
  const featured = projects.slice(0, 3);

  return (
    <div style={{ background: COLORS.sand }}>
      <Header variant="dark" />
      <div style={{ position: "relative", height: 720, background: COLORS.ink, overflow: "hidden" }}>
        <img
          src="/img/hero-accueil.jpg"
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.75 }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg,rgba(20,18,15,.55) 0%,rgba(20,18,15,.1) 30%,rgba(20,18,15,.6) 55%,rgba(20,18,15,.92) 100%)",
          }}
        />
        <div style={{ position: "absolute", left: 20, right: 20, bottom: 32, display: "flex", flexDirection: "column", gap: 22, color: COLORS.sand }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: COLORS.terracottaLight, lineHeight: 1.5 }}>
            <span style={{ width: 24, height: 2, background: COLORS.terracotta, flexShrink: 0 }} />
            Cotonou, Bénin · Dessin projeteur · Génie civil
          </div>
          <h1 style={{ margin: 0, fontSize: 46, lineHeight: 0.98, fontWeight: 300, letterSpacing: "-.035em" }}>
            Des bâtiments <span style={{ fontWeight: 600 }}>justes,</span> dessinés au{" "}
            <span style={{ fontWeight: 600, color: COLORS.terracottaLight }}>millimètre.</span>
          </h1>
          <div style={{ fontSize: 14, lineHeight: 1.65, color: "rgba(239,233,223,.85)", borderLeft: "1px solid rgba(239,233,223,.3)", paddingLeft: 16 }}>
            Bennett David Medehou - dessinateur projeteur bâtiment, technicien supérieur en génie civil. De l'esquisse au dossier
            de permis.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Link to="/projets" style={{ background: COLORS.sand, color: COLORS.ink, padding: 16, fontSize: 13, letterSpacing: ".06em", fontWeight: 500, textAlign: "center" }}>
              Voir les projets
            </Link>
            <Link to="/contact" style={{ fontSize: 13, letterSpacing: ".06em", border: "1px solid rgba(239,233,223,.5)", padding: 15, textAlign: "center" }}>
              Démarrer un projet
            </Link>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 18, borderTop: "1px solid rgba(239,233,223,.2)" }}>
            {[
              ["6", "projets conçus"],
              ["4", "agences & BE"],
              ["8", "logiciels"],
            ].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: FONTS.display, fontSize: 22, fontWeight: 500 }}>{n}</div>
                <div style={{ fontSize: 11, color: COLORS.text5 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: COLORS.terracotta, color: COLORS.sand, padding: "14px 20px", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", overflow: "hidden", whiteSpace: "nowrap" }}>
        <div className="marquee-track">
          {[...MOBILE_MARQUEE, ...MOBILE_MARQUEE].map((m, i) => (
            <span key={i} style={{ display: "flex", gap: 20, alignItems: "center", paddingRight: 20 }}>
              <span>◆</span>
              {m}
            </span>
          ))}
        </div>
      </div>

      <div style={{ padding: "72px 20px 0", display: "flex", flexDirection: "column", gap: 32 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracotta }}>Expertises</div>
          <h2 style={{ margin: 0, fontSize: 36, fontWeight: 300, lineHeight: 1.02, letterSpacing: "-.03em" }}>
            Quatre métiers, <span style={{ fontWeight: 600 }}>un seul dessin.</span>
          </h2>
          <div style={{ fontSize: 15, lineHeight: 1.7, color: COLORS.text1 }}>
            Chaque projet est construit dans un modèle 3D unique : les plans, les rendus et le devis quantitatif en sortent
            cohérents, du premier croquis au chantier.
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 1, background: COLORS.taupe, border: `1px solid ${COLORS.taupe}` }}>
          {EXPERTISES.map((e, i) => (
            <Reveal key={e.n} delay={i * 0.06} style={{ background: COLORS.sand, padding: "24px 20px", display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ fontFamily: FONTS.display, fontSize: 12, color: COLORS.terracotta }}>{e.n}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 18, fontWeight: 500 }}>{e.t}</div>
                <div style={{ fontSize: 14, lineHeight: 1.6, color: COLORS.text1 }}>{e.d}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div style={{ padding: "72px 20px 0", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracotta }}>Projets sélectionnés</div>
        <h2 style={{ margin: 0, fontSize: 36, fontWeight: 300, letterSpacing: "-.03em" }}>
          Travaux <span style={{ fontWeight: 600 }}>récents</span>
        </h2>
      </div>

      <div style={{ padding: "32px 20px 0", display: "flex", flexDirection: "column", gap: 28 }}>
        {featured.map((p, i) => (
          <Reveal key={p.id || p.slug} as={Link} delay={i * 0.08} to={`/projets/${p.slug}`} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ position: "relative", aspectRatio: "4/3", background: COLORS.taupe, overflow: "hidden" }}>
              <img src={p.cover_image_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", top: 12, left: 12, background: COLORS.sand, color: COLORS.ink, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", padding: "7px 10px" }}>
                {p.category}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <div style={{ fontSize: 19, fontWeight: 500, letterSpacing: "-.01em" }}>{p.title}</div>
              <div style={{ fontSize: 12, color: COLORS.text2 }}>
                {p.client_type} · {p.year}
              </div>
            </div>
          </Reveal>
        ))}
        <Link to="/projets" style={{ fontSize: 13, letterSpacing: ".06em", borderBottom: `2px solid ${COLORS.terracotta}`, paddingBottom: 4, alignSelf: "flex-start" }}>
          Tous les projets →
        </Link>
      </div>

      <div style={{ margin: "72px 0 0", background: COLORS.ink, color: COLORS.sand, padding: "64px 20px", display: "flex", flexDirection: "column", gap: 40 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracottaLight }}>Méthode</div>
          <h2 style={{ margin: 0, fontSize: 34, fontWeight: 300, lineHeight: 1.02, letterSpacing: "-.03em" }}>
            De l'idée au chantier, <span style={{ fontWeight: 600 }}>en quatre temps.</span>
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06} style={{ display: "grid", gridTemplateColumns: "64px 1fr", gap: 16, borderTop: "1px solid rgba(239,233,223,.25)", paddingTop: 20 }}>
              <div style={{ fontFamily: FONTS.display, fontSize: 28, fontWeight: 500, color: COLORS.terracottaLight, lineHeight: 1 }}>{s.n}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 17, fontWeight: 500 }}>{s.t}</div>
                <div style={{ fontSize: 14, lineHeight: 1.6, color: COLORS.text4 }}>{s.d}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div style={{ height: 300, background: COLORS.taupe, overflow: "hidden" }}>
        <img src="/img/citation-accueil.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <Reveal style={{ background: COLORS.terracotta, color: COLORS.sand, padding: "48px 20px", display: "flex", flexDirection: "column", gap: 24 }}>
        <svg width="40" height="32" viewBox="0 0 56 44" fill="none">
          <path
            d="M0 44V22C0 9.8 8 2 22 0l2 6C16 8 11 13 11 20h11v24H0Zm33 0V22C33 9.8 41 2 55 0l1 6c-8 2-13 7-13 14h11v24H33Z"
            fill={COLORS.sand}
            opacity=".6"
          />
        </svg>
        <div style={{ fontSize: 21, fontWeight: 300, lineHeight: 1.4, letterSpacing: "-.01em" }}>
          « Concevoir ne consiste pas seulement à dessiner, mais à donner vie à des espaces fonctionnels, durables et adaptés
          aux besoins réels. »
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 3, fontSize: 13 }}>
          <div style={{ fontWeight: 500 }}>Bennett David Medehou</div>
          <div style={{ opacity: 0.8 }}>Dessinateur projeteur bâtiment - Cotonou</div>
        </div>
      </Reveal>

      <Reveal as="div" style={{ padding: "72px 20px", display: "flex", flexDirection: "column", gap: 28 }}>
        <h2 style={{ margin: 0, fontSize: 38, fontWeight: 300, letterSpacing: "-.035em", lineHeight: 1.02 }}>
          Un terrain, une idée, un besoin de plans ? <span style={{ fontWeight: 600 }}>Parlons-en.</span>
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Link to="/contact" style={{ background: COLORS.ink, color: COLORS.sand, padding: 17, fontSize: 13, letterSpacing: ".06em", fontWeight: 500, textAlign: "center" }}>
            Prendre contact
          </Link>
          <a href="https://wa.me/22901617040070" style={{ border: `1px solid ${COLORS.ink}`, padding: 16, fontSize: 13, letterSpacing: ".06em", textAlign: "center" }}>
            WhatsApp
          </a>
        </div>
      </Reveal>

      <Footer />
    </div>
  );
}

function HomeTablet({ projects }) {
  const featured = projects.slice(0, 3);

  return (
    <div style={{ background: COLORS.sand }}>
      <Header variant="dark" />
      <div style={{ position: "relative", height: 820, background: COLORS.ink, overflow: "hidden" }}>
        <img
          src="/img/hero-accueil.jpg"
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.75 }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg,rgba(20,18,15,.55) 0%,rgba(20,18,15,.1) 30%,rgba(20,18,15,.6) 55%,rgba(20,18,15,.92) 100%)",
          }}
        />
        <div style={{ position: "absolute", left: 40, right: 40, bottom: 48, display: "flex", flexDirection: "column", gap: 28, color: COLORS.sand }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracottaLight }}>
            <span style={{ width: 28, height: 2, background: COLORS.terracotta }} />
            Cotonou, Bénin · Dessin projeteur bâtiment · Génie civil
          </div>
          <h1 style={{ margin: 0, fontSize: 68, lineHeight: 0.96, fontWeight: 300, letterSpacing: "-.035em", maxWidth: 700 }}>
            Des bâtiments <span style={{ fontWeight: 600 }}>justes,</span>
            <br />
            dessinés au <span style={{ fontWeight: 600, color: COLORS.terracottaLight }}>millimètre.</span>
          </h1>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "end" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-start" }}>
              <Link to="/projets" style={{ background: COLORS.sand, color: COLORS.ink, padding: "16px 24px", fontSize: 13, letterSpacing: ".06em", fontWeight: 500, whiteSpace: "nowrap" }}>
                Voir les projets
              </Link>
              <Link to="/contact" style={{ fontSize: 13, letterSpacing: ".06em", border: "1px solid rgba(239,233,223,.5)", padding: "15px 24px", whiteSpace: "nowrap" }}>
                Démarrer un projet
              </Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: 14, lineHeight: 1.65, color: "rgba(239,233,223,.85)", borderLeft: "1px solid rgba(239,233,223,.3)", paddingLeft: 20 }}>
              <div>
                Bennett David Medehou - dessinateur projeteur bâtiment, technicien supérieur en génie civil. De l'esquisse au
                dossier de permis.
              </div>
              <div style={{ display: "flex", gap: 24 }}>
                {[
                  ["6", "projets conçus"],
                  ["4", "agences & BE"],
                  ["8", "logiciels"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <div style={{ fontFamily: FONTS.display, fontSize: 24, fontWeight: 500 }}>{n}</div>
                    <div style={{ fontSize: 11, color: COLORS.text5 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: COLORS.terracotta, color: COLORS.sand, padding: "16px 40px", fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", overflow: "hidden", whiteSpace: "nowrap" }}>
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} style={{ display: "flex", gap: 32, alignItems: "center", paddingRight: 32 }}>
              <span>◆</span>
              {m}
            </span>
          ))}
        </div>
      </div>

      <div style={{ padding: "96px 40px 0", display: "flex", flexDirection: "column", gap: 40 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "end" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracotta }}>Expertises</div>
            <h2 style={{ margin: 0, fontSize: 44, fontWeight: 300, lineHeight: 1.02, letterSpacing: "-.03em" }}>
              Quatre métiers, <span style={{ fontWeight: 600 }}>un seul dessin.</span>
            </h2>
          </div>
          <div style={{ fontSize: 15, lineHeight: 1.7, color: COLORS.text1 }}>
            Chaque projet est construit dans un modèle 3D unique : les plans, les rendus et le devis quantitatif en sortent
            cohérents, du premier croquis au chantier.
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: COLORS.taupe, border: `1px solid ${COLORS.taupe}` }}>
          {EXPERTISES.map((e, i) => (
            <Reveal key={e.n} delay={i * 0.06} style={{ background: COLORS.sand, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 32, minHeight: 200 }}>
              <div style={{ fontFamily: FONTS.display, fontSize: 12, color: COLORS.terracotta }}>{e.n}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 19, fontWeight: 500 }}>{e.t}</div>
                <div style={{ fontSize: 14, lineHeight: 1.6, color: COLORS.text1 }}>{e.d}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div style={{ padding: "96px 40px 0", display: "flex", justifyContent: "space-between", alignItems: "end" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracotta }}>Projets sélectionnés</div>
          <h2 style={{ margin: 0, fontSize: 44, fontWeight: 300, letterSpacing: "-.03em" }}>
            Travaux <span style={{ fontWeight: 600 }}>récents</span>
          </h2>
        </div>
        <Link to="/projets" style={{ fontSize: 13, letterSpacing: ".06em", borderBottom: `2px solid ${COLORS.terracotta}`, paddingBottom: 4 }}>
          Tous les projets →
        </Link>
      </div>

      <div style={{ padding: "36px 40px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px 24px" }}>
        {featured.map((p, i) => (
          <Reveal
            key={p.id || p.slug}
            as={Link}
            delay={i * 0.08}
            to={`/projets/${p.slug}`}
            style={{ display: "flex", flexDirection: "column", gap: 12, gridColumn: i === 0 ? "1 / -1" : "auto" }}
          >
            <div style={{ position: "relative", aspectRatio: i === 0 ? "16/9" : "4/3", background: COLORS.taupe, overflow: "hidden" }}>
              <img src={p.cover_image_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", top: 14, left: 14, background: COLORS.sand, color: COLORS.ink, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", padding: "7px 10px" }}>
                {p.category}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
              <div style={{ fontSize: 19, fontWeight: 500, letterSpacing: "-.01em" }}>{p.title}</div>
              <div style={{ fontSize: 12, color: COLORS.text2, flexShrink: 0 }}>{p.year}</div>
            </div>
          </Reveal>
        ))}
      </div>

      <div style={{ margin: "96px 0 0", background: COLORS.ink, color: COLORS.sand, padding: "80px 40px", display: "flex", flexDirection: "column", gap: 48 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 520 }}>
          <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracottaLight }}>Méthode</div>
          <h2 style={{ margin: 0, fontSize: 42, fontWeight: 300, lineHeight: 1.02, letterSpacing: "-.03em" }}>
            De l'idée au chantier, <span style={{ fontWeight: 600 }}>en quatre temps.</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px 28px" }}>
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06} style={{ display: "flex", flexDirection: "column", gap: 18, borderTop: "1px solid rgba(239,233,223,.25)", paddingTop: 20 }}>
              <div style={{ fontFamily: FONTS.display, fontSize: 30, fontWeight: 500, color: COLORS.terracottaLight }}>{s.n}</div>
              <div style={{ fontSize: 17, fontWeight: 500 }}>{s.t}</div>
              <div style={{ fontSize: 14, lineHeight: 1.65, color: COLORS.text4 }}>{s.d}</div>
            </Reveal>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ background: COLORS.taupe, overflow: "hidden" }}>
          <img src="/img/citation-accueil.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <Reveal style={{ background: COLORS.terracotta, color: COLORS.sand, padding: "56px 36px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 28 }}>
          <svg width="40" height="32" viewBox="0 0 56 44" fill="none">
            <path
              d="M0 44V22C0 9.8 8 2 22 0l2 6C16 8 11 13 11 20h11v24H0Zm33 0V22C33 9.8 41 2 55 0l1 6c-8 2-13 7-13 14h11v24H33Z"
              fill={COLORS.sand}
              opacity=".6"
            />
          </svg>
          <div style={{ fontSize: 20, fontWeight: 300, lineHeight: 1.4, letterSpacing: "-.01em" }}>
            « Concevoir ne consiste pas seulement à dessiner, mais à donner vie à des espaces fonctionnels, durables et adaptés
            aux besoins réels. »
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3, fontSize: 13 }}>
            <div style={{ fontWeight: 500 }}>Bennett David Medehou</div>
            <div style={{ opacity: 0.8 }}>Dessinateur projeteur bâtiment - Cotonou</div>
          </div>
        </Reveal>
      </div>

      <Reveal as="div" style={{ padding: "96px 40px", display: "flex", flexDirection: "column", gap: 32, alignItems: "center", textAlign: "center" }}>
        <h2 style={{ margin: 0, fontSize: 52, fontWeight: 300, letterSpacing: "-.035em", lineHeight: 1.02, maxWidth: 640 }}>
          Un terrain, une idée, un besoin de plans ? <span style={{ fontWeight: 600 }}>Parlons-en.</span>
        </h2>
        <div style={{ display: "flex", gap: 12 }}>
          <Link to="/contact" style={{ background: COLORS.ink, color: COLORS.sand, padding: "18px 30px", fontSize: 13, letterSpacing: ".06em", fontWeight: 500 }}>
            Prendre contact
          </Link>
          <a href="https://wa.me/22901617040070" style={{ border: `1px solid ${COLORS.ink}`, padding: "17px 30px", fontSize: 13, letterSpacing: ".06em" }}>
            WhatsApp
          </a>
        </div>
      </Reveal>

      <Footer />
    </div>
  );
}

export default function Home() {
  const { rows: projects } = useProjects();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const featured = projects.slice(0, 3);

  if (isMobile) return <HomeMobile projects={projects} />;
  if (isTablet) return <HomeTablet projects={projects} />;

  return (
    <div style={{ background: COLORS.sand }}>
      <Header variant="dark" />
      <div style={{ position: "relative", height: 900, background: COLORS.ink, overflow: "hidden" }}>
        <img
          src="/img/hero-accueil.jpg"
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.75 }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg,rgba(20,18,15,.55) 0%,rgba(20,18,15,.1) 30%,rgba(20,18,15,.6) 60%,rgba(20,18,15,.9) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 64,
            right: 64,
            bottom: 72,
            display: "grid",
            gridTemplateColumns: "1fr 360px",
            gap: 64,
            alignItems: "end",
            color: COLORS.sand,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracottaLight }}>
              <span style={{ width: 32, height: 2, background: COLORS.terracotta }} />
              Cotonou, Bénin · Dessin projeteur bâtiment · Génie civil
            </div>
            <h1 style={{ margin: 0, fontSize: 96, lineHeight: 0.95, fontWeight: 300, letterSpacing: "-.035em" }}>
              Des bâtiments <span style={{ fontWeight: 600 }}>justes,</span>
              <br />
              dessinés au <span style={{ fontWeight: 600, color: COLORS.terracottaLight }}>millimètre.</span>
            </h1>
            <div style={{ display: "flex", gap: 16, alignItems: "center", marginTop: 8 }}>
              <Link to="/projets" style={{ background: COLORS.sand, color: COLORS.ink, padding: "18px 30px", fontSize: 13, letterSpacing: ".06em", fontWeight: 500 }}>
                Voir les projets
              </Link>
              <Link to="/contact" style={{ fontSize: 13, letterSpacing: ".06em", border: "1px solid rgba(239,233,223,.5)", padding: "17px 30px" }}>
                Démarrer un projet
              </Link>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              fontSize: 15,
              lineHeight: 1.7,
              color: "rgba(239,233,223,.85)",
              borderLeft: "1px solid rgba(239,233,223,.3)",
              paddingLeft: 24,
            }}
          >
            <div>
              Bennett David Medehou - dessinateur projeteur bâtiment, technicien supérieur en génie civil. De l'esquisse au dossier
              de permis : conception, plans techniques, rendus 3D et suivi de chantier.
            </div>
            <div style={{ display: "flex", gap: 32 }}>
              {[
                ["6", "projets conçus"],
                ["4", "agences & bureaux d'études"],
                ["8", "logiciels maîtrisés"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: FONTS.display, fontSize: 28, fontWeight: 500 }}>{n}</div>
                  <div style={{ fontSize: 12, color: COLORS.text5 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          background: COLORS.terracotta,
          color: COLORS.sand,
          padding: "20px 0",
          fontSize: 13,
          letterSpacing: ".12em",
          textTransform: "uppercase",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} style={{ display: "flex", gap: 48, alignItems: "center", paddingRight: 48 }}>
              <span>◆</span>
              {m}
            </span>
          ))}
        </div>
      </div>

      <div style={{ padding: "128px 64px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracotta }}>Expertises</div>
          <h2 style={{ margin: 0, fontSize: 56, fontWeight: 300, lineHeight: 1.02, letterSpacing: "-.03em" }}>
            Quatre métiers, <span style={{ fontWeight: 600 }}>un seul dessin.</span>
          </h2>
          <div style={{ fontSize: 16, lineHeight: 1.7, color: COLORS.text1, maxWidth: 460 }}>
            Chaque projet est construit dans un modèle 3D unique : les plans, les rendus et le devis quantitatif en sortent
            cohérents, du premier croquis au chantier.
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: COLORS.taupe, border: `1px solid ${COLORS.taupe}` }}>
          {EXPERTISES.map((e, i) => (
            <Reveal key={e.n} delay={i * 0.08} style={{ background: COLORS.sand, padding: "32px 28px", display: "flex", flexDirection: "column", gap: 40, minHeight: 240 }}>
              <div style={{ fontFamily: FONTS.display, fontSize: 13, color: COLORS.terracotta }}>{e.n}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ fontSize: 20, fontWeight: 500 }}>{e.t}</div>
                <div style={{ fontSize: 14, lineHeight: 1.6, color: COLORS.text1 }}>{e.d}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div style={{ padding: "128px 64px 0", display: "flex", justifyContent: "space-between", alignItems: "end" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracotta }}>Projets sélectionnés</div>
          <h2 style={{ margin: 0, fontSize: 56, fontWeight: 300, letterSpacing: "-.03em" }}>
            Travaux <span style={{ fontWeight: 600 }}>récents</span>
          </h2>
        </div>
        <Link to="/projets" style={{ fontSize: 13, letterSpacing: ".06em", borderBottom: `2px solid ${COLORS.terracotta}`, paddingBottom: 4 }}>
          Tous les projets →
        </Link>
      </div>

      <div style={{ padding: "48px 64px 0", display: "grid", gridTemplateColumns: "1.5fr 1fr", gridTemplateRows: "auto auto", gap: 32 }}>
        {featured.map((p, i) => (
          <Reveal
            key={p.id || p.slug}
            as={Link}
            delay={i * 0.1}
            to={`/projets/${p.slug}`}
            style={{ display: "flex", flexDirection: "column", gap: 16, gridRow: i === 0 ? "span 2" : "auto" }}
          >
            <div style={{ position: "relative", height: i === 0 ? 720 : 340, background: COLORS.taupe, overflow: "hidden" }}>
              <img src={p.cover_image_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  background: COLORS.sand,
                  color: COLORS.ink,
                  fontSize: 11,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  padding: "8px 12px",
                }}
              >
                {p.category}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-.01em" }}>{p.title}</div>
              <div style={{ fontSize: 13, color: COLORS.text2 }}>
                {p.client_type} · {p.year}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div
        style={{
          margin: "128px 0 0",
          background: COLORS.ink,
          color: COLORS.sand,
          padding: "112px 64px",
          display: "grid",
          gridTemplateColumns: "420px 1fr",
          gap: 96,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracottaLight }}>Méthode</div>
          <h2 style={{ margin: 0, fontSize: 52, fontWeight: 300, lineHeight: 1.02, letterSpacing: "-.03em" }}>
            De l'idée au chantier, <span style={{ fontWeight: 600 }}>en quatre temps.</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32 }}>
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08} style={{ display: "flex", flexDirection: "column", gap: 24, borderTop: "1px solid rgba(239,233,223,.25)", paddingTop: 24 }}>
              <div style={{ fontFamily: FONTS.display, fontSize: 36, fontWeight: 500, color: COLORS.terracottaLight }}>{s.n}</div>
              <div style={{ fontSize: 18, fontWeight: 500 }}>{s.t}</div>
              <div style={{ fontSize: 14, lineHeight: 1.65, color: COLORS.text4 }}>{s.d}</div>
            </Reveal>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ height: 640, background: COLORS.taupe, overflow: "hidden" }}>
          <img src="/img/citation-accueil.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <Reveal style={{ background: COLORS.terracotta, color: COLORS.sand, padding: "96px 80px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 40 }}>
          <svg width="56" height="44" viewBox="0 0 56 44" fill="none">
            <path
              d="M0 44V22C0 9.8 8 2 22 0l2 6C16 8 11 13 11 20h11v24H0Zm33 0V22C33 9.8 41 2 55 0l1 6c-8 2-13 7-13 14h11v24H33Z"
              fill={COLORS.sand}
              opacity=".6"
            />
          </svg>
          <div style={{ fontSize: 30, fontWeight: 300, lineHeight: 1.35, letterSpacing: "-.01em" }}>
            « Concevoir ne consiste pas seulement à dessiner, mais à donner vie à des espaces fonctionnels, durables et adaptés
            aux besoins réels. »
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 14 }}>
            <div style={{ fontWeight: 500 }}>Bennett David Medehou</div>
            <div style={{ opacity: 0.8 }}>Dessinateur projeteur bâtiment - Cotonou</div>
          </div>
        </Reveal>
      </div>

      <Reveal as="div" style={{ padding: "128px 64px", display: "flex", flexDirection: "column", gap: 40, alignItems: "center", textAlign: "center" }}>
        <h2 style={{ margin: 0, fontSize: 72, fontWeight: 300, letterSpacing: "-.035em", lineHeight: 1, maxWidth: 900 }}>
          Un terrain, une idée, un besoin de plans ? <span style={{ fontWeight: 600 }}>Parlons-en.</span>
        </h2>
        <div style={{ display: "flex", gap: 16 }}>
          <Link to="/contact" style={{ background: COLORS.ink, color: COLORS.sand, padding: "20px 36px", fontSize: 13, letterSpacing: ".06em", fontWeight: 500 }}>
            Prendre contact
          </Link>
          <a href="https://wa.me/22901617040070" style={{ border: `1px solid ${COLORS.ink}`, padding: "19px 36px", fontSize: 13, letterSpacing: ".06em" }}>
            WhatsApp
          </a>
        </div>
      </Reveal>

      <Footer />
    </div>
  );
}
