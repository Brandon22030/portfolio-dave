import { Link } from "react-router-dom";
import { COLORS, FONTS } from "../theme";
import { useIsMobile, useIsTablet } from "../hooks/useIsMobile";

function BlueprintDrawing({ mobile, fill }) {
  return (
    <div
      style={{
        background: COLORS.ink,
        backgroundImage: "linear-gradient(rgba(239,233,223,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(239,233,223,.08) 1px,transparent 1px)",
        backgroundSize: mobile ? "32px 32px" : "48px 48px",
        position: "relative",
        padding: mobile ? "16px 20px 20px" : 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...(fill ? { flex: 1, minHeight: 0 } : null),
      }}
    >
      <svg
        viewBox="0 0 800 520"
        width="100%"
        height={fill ? "100%" : undefined}
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        stroke={COLORS.sand}
        strokeWidth="2"
        style={mobile ? undefined : { maxWidth: 560 }}
      >
        <rect x="60" y="60" width="680" height="400" strokeWidth="4" />
        <path d="M60 260H400M400 60V460M400 200H740M560 200V460M240 260V460" opacity=".7" />
        <path d="M400 120a60 60 0 0 1 60 60" strokeWidth="1.5" opacity=".7" />
        {!mobile && (
          <>
            <path d="M140 60v-20M660 60v-20M140 40h520" strokeWidth="1" opacity=".5" />
            <path d="M40 60h-20M40 460h-20M20 60v400" strokeWidth="1" opacity=".5" />
          </>
        )}
        <rect x="600" y="300" width="100" height="60" stroke={COLORS.terracotta} strokeWidth="3" />
        <path d="M600 300l100 60M700 300l-100 60" stroke={COLORS.terracotta} strokeWidth="3" />
        <circle cx="320" cy="360" r="40" strokeWidth="1.5" opacity=".7" />
      </svg>
      <div style={{ position: "absolute", left: mobile ? 20 : 32, bottom: mobile ? 16 : 24, fontSize: mobile ? 10 : 11, letterSpacing: ".16em", textTransform: "uppercase", color: COLORS.text3 }}>
        Pièce introuvable - 1:100
      </div>
      <div style={{ position: "absolute", right: mobile ? 20 : 32, bottom: mobile ? 16 : 24, fontFamily: FONTS.display, fontSize: mobile ? 10 : 11, color: COLORS.terracottaLight }}>
        A-404
      </div>
    </div>
  );
}

function NotFoundMobile() {
  return (
    <div style={{ background: COLORS.sand, height: "100dvh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ flex: 1, minHeight: 0, padding: "24px 20px 16px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 10 }}>
        <div style={{ fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracotta }}>Erreur 404</div>
        <div style={{ fontFamily: FONTS.display, fontSize: 64, fontWeight: 500, lineHeight: 0.85, letterSpacing: "-.05em", color: COLORS.ink }}>404</div>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 300, lineHeight: 1.15, letterSpacing: "-.03em" }}>
          Cette page n'est pas <span style={{ fontWeight: 600 }}>sur le plan.</span>
        </h1>
        <div style={{ fontSize: 13, lineHeight: 1.5, color: COLORS.text1 }}>
          L'adresse a peut-être changé, ou la page a été retirée du dossier. Revenez à l'accueil ou parcourez les projets.
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
          <Link to="/" style={{ flex: 1, background: COLORS.ink, color: COLORS.sand, padding: "12px 10px", fontSize: 12, letterSpacing: ".04em", fontWeight: 500, textAlign: "center" }}>
            Retour à l'accueil
          </Link>
          <Link to="/projets" style={{ flex: 1, border: `1px solid ${COLORS.ink}`, padding: "11px 10px", fontSize: 12, letterSpacing: ".04em", textAlign: "center" }}>
            Voir les projets
          </Link>
        </div>
      </div>

      <BlueprintDrawing mobile fill />
    </div>
  );
}

function NotFoundTablet() {
  return (
    <div style={{ background: COLORS.sand, minHeight: "100vh" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "100vh" }}>
        <div style={{ padding: "64px 40px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 44 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracotta }}>Erreur 404</div>
            <div style={{ fontFamily: FONTS.display, fontSize: 128, fontWeight: 500, lineHeight: 0.85, letterSpacing: "-.05em", color: COLORS.ink }}>404</div>
            <h1 style={{ margin: 0, fontSize: 38, fontWeight: 300, lineHeight: 1.05, letterSpacing: "-.035em" }}>
              Cette page n'est pas <span style={{ fontWeight: 600 }}>sur le plan.</span>
            </h1>
            <div style={{ fontSize: 14, lineHeight: 1.65, color: COLORS.text1, maxWidth: 360 }}>
              L'adresse a peut-être changé, ou la page a été retirée du dossier. Revenez à l'accueil ou parcourez les projets.
            </div>
          </div>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <Link to="/" style={{ background: COLORS.ink, color: COLORS.sand, padding: "16px 24px", fontSize: 13, letterSpacing: ".06em", fontWeight: 500 }}>
              Retour à l'accueil
            </Link>
            <Link to="/projets" style={{ fontSize: 13, letterSpacing: ".06em", border: `1px solid ${COLORS.ink}`, padding: "15px 24px" }}>
              Voir les projets
            </Link>
          </div>
        </div>

        <BlueprintDrawing />
      </div>
    </div>
  );
}

export default function NotFound() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  if (isMobile) return <NotFoundMobile />;
  if (isTablet) return <NotFoundTablet />;

  return (
    <div style={{ background: COLORS.sand, minHeight: "100vh" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "100vh" }}>
        <div style={{ padding: "96px 64px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 64 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div style={{ fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracotta }}>Erreur 404</div>
            <div style={{ fontFamily: FONTS.display, fontSize: 200, fontWeight: 500, lineHeight: 0.85, letterSpacing: "-.05em", color: COLORS.ink }}>404</div>
            <h1 style={{ margin: 0, fontSize: 56, fontWeight: 300, lineHeight: 1.02, letterSpacing: "-.035em" }}>
              Cette page n'est pas <span style={{ fontWeight: 600 }}>sur le plan.</span>
            </h1>
            <div style={{ fontSize: 16, lineHeight: 1.7, color: COLORS.text1, maxWidth: 460 }}>
              L'adresse a peut-être changé, ou la page a été retirée du dossier. Revenez à l'accueil ou parcourez les projets.
            </div>
          </div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <Link to="/" style={{ background: COLORS.ink, color: COLORS.sand, padding: "18px 30px", fontSize: 13, letterSpacing: ".06em", fontWeight: 500 }}>
              Retour à l'accueil
            </Link>
            <Link to="/projets" style={{ fontSize: 13, letterSpacing: ".06em", border: `1px solid ${COLORS.ink}`, padding: "17px 30px" }}>
              Voir les projets
            </Link>
          </div>
        </div>

        <BlueprintDrawing />
      </div>
    </div>
  );
}
