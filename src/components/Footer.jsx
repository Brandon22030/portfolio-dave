import { Link, useLocation } from "react-router-dom";
import { COLORS, FONTS } from "../theme";
import { CONTACT_INFO } from "../data/defaults";
import { useIsMobile, useIsTablet } from "../hooks/useIsMobile";

const NAV = ["À propos", "Parcours", "Projets", "Services", "Journal"];
const NAV_LINKS = {
  "À propos": "/a-propos",
  Parcours: "/parcours",
  Projets: "/projets",
  Services: "/services",
  Journal: "/journal",
};

export default function Footer({ topPadding = "80px 64px 40px", mobileTopPadding = "48px 20px 24px", tabletTopPadding = "64px 40px 32px" }) {
  const { pathname } = useLocation();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  if (isTablet) {
    return (
      <footer style={{ background: COLORS.ink, color: COLORS.text5, padding: tabletTopPadding, display: "flex", flexDirection: "column", gap: 48, fontSize: 13 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr", gap: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Link to="/" style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 24, letterSpacing: "-.02em", color: COLORS.sand }}>
              Smart'<span style={{ fontWeight: 500, color: COLORS.terracottaLight }}>Archi</span>
            </Link>
            <div style={{ fontSize: 14, lineHeight: 1.65, maxWidth: 300 }}>
              Dessin projeteur bâtiment, génie civil et visualisation 3D. Bennett David Medehou, Cotonou - Bénin.
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
              <a href={`tel:${CONTACT_INFO.phones.split(" · ")[0].replace(/\s/g, "")}`} style={{ color: COLORS.text5 }}>
                {CONTACT_INFO.phones}
              </a>
              <a href={`mailto:${CONTACT_INFO.email}`} style={{ color: COLORS.text5 }}>
                {CONTACT_INFO.email}
              </a>
              <div>{CONTACT_INFO.city}</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: COLORS.terracottaLight }}>Navigation</div>
            {NAV.map((n) => (
              <Link key={n} to={NAV_LINKS[n]} style={{ color: COLORS.text5 }}>
                {n}
              </Link>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: COLORS.terracottaLight }}>Réseaux</div>
            <a href="https://wa.me/22901617040070" style={{ color: COLORS.text5 }}>
              WhatsApp
            </a>
            <a href={CONTACT_INFO.linkedin} style={{ color: COLORS.text5 }}>
              LinkedIn
            </a>
            <a href="#" style={{ color: COLORS.text5 }}>
              Instagram
            </a>
          </div>
        </div>

        <div
          style={{
            fontFamily: FONTS.display,
            fontWeight: 700,
            fontSize: 92,
            lineHeight: 0.9,
            letterSpacing: "-.04em",
            color: COLORS.inkSoft,
            userSelect: "none",
          }}
        >
          Smart'Archi
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, paddingTop: 20, borderTop: "1px solid rgba(239,233,223,.12)", fontSize: 12, color: COLORS.text2 }}>
          <div>© 2026 Smart'Archi - Bennett David Medehou</div>
          <div style={{ display: "flex", gap: 20 }}>
            <Link to="/mentions-legales" style={{ color: pathname === "/mentions-legales" ? COLORS.sand : COLORS.text2 }}>
              Mentions légales
            </Link>
            <Link to="/confidentialite" style={{ color: pathname === "/confidentialite" ? COLORS.sand : COLORS.text2 }}>
              Confidentialité
            </Link>
          </div>
        </div>
      </footer>
    );
  }

  if (isMobile) {
    return (
      <footer style={{ background: COLORS.ink, color: COLORS.text5, padding: mobileTopPadding, display: "flex", flexDirection: "column", gap: 36, fontSize: 13 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Link to="/" style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 22, letterSpacing: "-.02em", color: COLORS.sand }}>
            Smart'<span style={{ fontWeight: 500, color: COLORS.terracottaLight }}>Archi</span>
          </Link>
          <div style={{ fontSize: 14, lineHeight: 1.65 }}>
            Dessin projeteur bâtiment, génie civil et visualisation 3D. Bennett David Medehou, Cotonou - Bénin.
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: COLORS.terracottaLight }}>Navigation</div>
            {NAV.map((n) => (
              <Link key={n} to={NAV_LINKS[n]} style={{ color: COLORS.text5 }}>
                {n}
              </Link>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: COLORS.terracottaLight }}>Réseaux</div>
            <a href="https://wa.me/22901617040070" style={{ color: COLORS.text5 }}>
              WhatsApp
            </a>
            <a href={CONTACT_INFO.linkedin} style={{ color: COLORS.text5 }}>
              LinkedIn
            </a>
            <a href="#" style={{ color: COLORS.text5 }}>
              Instagram
            </a>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: COLORS.terracottaLight }}>Contact</div>
          <a href={`tel:${CONTACT_INFO.phones.split(" · ")[0].replace(/\s/g, "")}`} style={{ color: COLORS.text5 }}>
            {CONTACT_INFO.phones}
          </a>
          <a href={`mailto:${CONTACT_INFO.email}`} style={{ color: COLORS.text5 }}>
            {CONTACT_INFO.email}
          </a>
          <div>{CONTACT_INFO.city}</div>
        </div>

        <div
          style={{
            fontFamily: FONTS.display,
            fontWeight: 700,
            fontSize: 42,
            lineHeight: 0.9,
            letterSpacing: "-.04em",
            color: COLORS.inkSoft,
            userSelect: "none",
          }}
        >
          Smart'Archi
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 20, borderTop: "1px solid rgba(239,233,223,.12)", fontSize: 12, color: COLORS.text2 }}>
          <div>© 2026 Smart'Archi - Bennett David Medehou</div>
          <div style={{ display: "flex", gap: 20 }}>
            <Link to="/mentions-legales" style={{ color: pathname === "/mentions-legales" ? COLORS.sand : COLORS.text2 }}>
              Mentions légales
            </Link>
            <Link to="/confidentialite" style={{ color: pathname === "/confidentialite" ? COLORS.sand : COLORS.text2 }}>
              Confidentialité
            </Link>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer style={{ background: COLORS.ink, color: COLORS.text5, padding: topPadding, display: "flex", flexDirection: "column", gap: 64, fontSize: 13 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 40 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Link to="/" style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 26, letterSpacing: "-.02em", color: COLORS.sand }}>
            Smart'<span style={{ fontWeight: 500, color: COLORS.terracottaLight }}>Archi</span>
          </Link>
          <div style={{ fontSize: 14, lineHeight: 1.65, maxWidth: 320 }}>
            Dessin projeteur bâtiment, génie civil et visualisation 3D. Bennett David Medehou, Cotonou - Bénin.
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: COLORS.terracottaLight }}>Navigation</div>
          {NAV.map((n) => (
            <Link key={n} to={NAV_LINKS[n]} style={{ color: COLORS.text5 }}>
              {n}
            </Link>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: COLORS.terracottaLight }}>Contact</div>
          <a href={`tel:${CONTACT_INFO.phones.split(" · ")[0].replace(/\s/g, "")}`} style={{ color: COLORS.text5 }}>
            {CONTACT_INFO.phones}
          </a>
          <a href={`mailto:${CONTACT_INFO.email}`} style={{ color: COLORS.text5 }}>
            {CONTACT_INFO.email}
          </a>
          <div>{CONTACT_INFO.city}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: COLORS.terracottaLight }}>Réseaux</div>
          <a href="https://wa.me/22901617040070" style={{ color: COLORS.text5 }}>
            WhatsApp
          </a>
          <a href={CONTACT_INFO.linkedin} style={{ color: COLORS.text5 }}>
            LinkedIn
          </a>
          <a href="#" style={{ color: COLORS.text5 }}>
            Instagram
          </a>
        </div>
      </div>

      <div
        style={{
          fontFamily: FONTS.display,
          fontWeight: 700,
          fontSize: 150,
          lineHeight: 0.9,
          letterSpacing: "-.04em",
          color: COLORS.inkSoft,
          userSelect: "none",
        }}
      >
        Smart'Archi
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 24, borderTop: "1px solid rgba(239,233,223,.12)", fontSize: 12, color: COLORS.text2 }}>
        <div>© 2026 Smart'Archi - Bennett David Medehou</div>
        <div style={{ display: "flex", gap: 24 }}>
          <Link to="/mentions-legales" style={{ color: pathname === "/mentions-legales" ? COLORS.sand : COLORS.text2 }}>
            Mentions légales
          </Link>
          <Link to="/confidentialite" style={{ color: pathname === "/confidentialite" ? COLORS.sand : COLORS.text2 }}>
            Confidentialité
          </Link>
        </div>
      </div>
    </footer>
  );
}
