import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { COLORS, FONTS } from "../theme";
import { useIsMobile, useIsTablet } from "../hooks/useIsMobile";
import { CONTACT_INFO } from "../data/defaults";

const NAV = [
  { to: "/a-propos", label: "À propos" },
  { to: "/parcours", label: "Parcours" },
  { to: "/projets", label: "Projets" },
  { to: "/services", label: "Services" },
  { to: "/journal", label: "Journal" },
];

export const HEADER_HEIGHT = 84;
export const MOBILE_HEADER_HEIGHT = 80;
export const TABLET_HEADER_HEIGHT = 68;

function TabletHeader({ fg, logoColor, accent, pathname, solid, contactBg }) {
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "24px 40px",
          fontSize: 13,
          letterSpacing: ".02em",
          color: fg,
          background: solid ? "rgba(239,233,223,.92)" : "transparent",
          backdropFilter: solid ? "blur(10px)" : "none",
          borderBottom: solid ? `1px solid ${COLORS.taupe}` : "1px solid transparent",
          transition: "background .3s ease, border-color .3s ease, color .3s ease",
        }}
      >
        <Link to="/" style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 16, letterSpacing: "-.02em", color: logoColor }}>
          Smart'<span style={{ fontWeight: 500, color: accent }}>Archi</span>
        </Link>
        <div style={{ display: "flex", gap: 22, alignItems: "center" }}>
          {NAV.map((n) => {
            const active = pathname === n.to || pathname.startsWith(`${n.to}/`);
            return (
              <Link
                key={n.to}
                to={n.to}
                style={{
                  color: active ? logoColor : fg,
                  borderBottom: active ? `2px solid ${accent}` : "none",
                  paddingBottom: active ? 2 : 0,
                }}
              >
                {n.label}
              </Link>
            );
          })}
          <Link to="/contact" style={{ background: contactBg, color: COLORS.sand, padding: "11px 16px" }}>
            Contact
          </Link>
        </div>
      </div>
    </>
  );
}

function MobileHeader({ fg, logoColor, accent, pathname, solid }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "18px 20px",
          color: fg,
          background: solid ? "rgba(239,233,223,.92)" : "transparent",
          backdropFilter: solid ? "blur(10px)" : "none",
          borderBottom: solid ? `1px solid ${COLORS.taupe}` : "1px solid transparent",
          transition: "background .3s ease, border-color .3s ease, color .3s ease",
        }}
      >
        <Link
          to="/"
          style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 16, letterSpacing: "-.02em", color: logoColor }}
        >
          Smart'<span style={{ fontWeight: 500, color: accent }}>Archi</span>
        </Link>
        <button
          onClick={() => setOpen(true)}
          aria-label="Ouvrir le menu"
          style={{
            width: 44,
            height: 44,
            background: "none",
            border: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-end",
            gap: 6,
          }}
        >
          <span style={{ width: 26, height: 2, background: logoColor }} />
          <span style={{ width: 18, height: 2, background: logoColor }} />
        </button>
      </div>

      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: COLORS.ink,
            color: COLORS.sand,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 20px" }}>
            <Link to="/" style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 16, letterSpacing: "-.02em" }}>
              Smart'<span style={{ fontWeight: 500, color: COLORS.terracottaLight }}>Archi</span>
            </Link>
            <button
              onClick={() => setOpen(false)}
              aria-label="Fermer le menu"
              style={{
                width: 44,
                height: 44,
                background: "none",
                border: "1px solid rgba(239,233,223,.3)",
                position: "relative",
              }}
            >
              <span style={{ position: "absolute", top: "50%", left: "50%", width: 18, height: 1.5, background: COLORS.sand, transform: "translate(-50%,-50%) rotate(45deg)" }} />
              <span style={{ position: "absolute", top: "50%", left: "50%", width: 18, height: 1.5, background: COLORS.terracottaLight, transform: "translate(-50%,-50%) rotate(-45deg)" }} />
            </button>
          </div>

          <div style={{ padding: "40px 20px 0", display: "flex", flexDirection: "column" }}>
            {NAV.map((n, i) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                style={{
                  fontSize: 28,
                  fontWeight: pathname === n.to ? 600 : 300,
                  letterSpacing: "-.025em",
                  padding: "16px 0",
                  borderBottom: "1px solid rgba(239,233,223,.12)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                {n.label}
                <span style={{ fontFamily: FONTS.display, fontSize: 11, color: COLORS.terracottaLight }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: "auto", padding: "0 20px 32px", display: "flex", flexDirection: "column", gap: 24 }}>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              style={{ background: COLORS.terracotta, color: COLORS.sand, padding: 17, fontSize: 13, letterSpacing: ".06em", fontWeight: 500, textAlign: "center" }}
            >
              Contact
            </Link>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: COLORS.text3 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <a href={`tel:${CONTACT_INFO.phones.split(" · ")[0].replace(/\s/g, "")}`} style={{ color: COLORS.text5 }}>
                  {CONTACT_INFO.phones.split(" · ")[0]}
                </a>
                <a href={`mailto:${CONTACT_INFO.email}`} style={{ color: COLORS.text5 }}>
                  {CONTACT_INFO.email}
                </a>
              </div>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-end" }}>
                <a href="https://wa.me/22901617040070">WhatsApp</a>
                <a href={CONTACT_INFO.linkedin}>LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function Header({ variant = "light" }) {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const isDarkHero = variant === "dark";
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  useEffect(() => {
    if (!isDarkHero) return;
    const onScroll = () => setScrolled(window.scrollY > HEADER_HEIGHT * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isDarkHero]);

  const solid = !isDarkHero || scrolled;
  const fg = solid ? COLORS.text1 : COLORS.sand;
  const logoColor = solid ? COLORS.ink : COLORS.sand;
  const accent = solid ? COLORS.terracotta : COLORS.terracottaLight;
  const contactBg = pathname === "/contact" ? COLORS.terracotta : COLORS.ink;

  if (isMobile) {
    return (
      <>
        <MobileHeader fg={fg} logoColor={logoColor} accent={accent} pathname={pathname} solid={solid} />
        {!isDarkHero && <div style={{ height: MOBILE_HEADER_HEIGHT }} />}
      </>
    );
  }

  if (isTablet) {
    const tabletContactBg = !solid ? COLORS.terracotta : pathname === "/contact" ? COLORS.terracotta : COLORS.ink;
    return (
      <>
        <TabletHeader fg={fg} logoColor={logoColor} accent={accent} pathname={pathname} solid={solid} contactBg={tabletContactBg} />
        {!isDarkHero && <div style={{ height: TABLET_HEADER_HEIGHT }} />}
      </>
    );
  }

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "28px 64px",
          fontSize: 13,
          letterSpacing: ".04em",
          color: fg,
          background: solid ? "rgba(239,233,223,.92)" : "transparent",
          backdropFilter: solid ? "blur(10px)" : "none",
          borderBottom: solid ? `1px solid ${COLORS.taupe}` : "1px solid transparent",
          transition: "background .3s ease, border-color .3s ease, color .3s ease",
        }}
      >
        <Link
          to="/"
          style={{
            fontFamily: FONTS.display,
            fontWeight: 700,
            fontSize: 17,
            letterSpacing: "-.02em",
            color: logoColor,
          }}
        >
          Smart'<span style={{ fontWeight: 500, color: accent }}>Archi</span>
        </Link>
        <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {NAV.map((n) => {
            const active = pathname === n.to || pathname.startsWith(`${n.to}/`);
            return (
              <Link
                key={n.to}
                to={n.to}
                style={{
                  color: active ? logoColor : fg,
                  borderBottom: active ? `2px solid ${accent}` : "none",
                  paddingBottom: active ? 2 : 0,
                }}
              >
                {n.label}
              </Link>
            );
          })}
          <Link to="/contact" style={{ background: contactBg, color: COLORS.sand, padding: "12px 20px" }}>
            Contact
          </Link>
        </div>
      </div>
      {!isDarkHero && <div style={{ height: HEADER_HEIGHT }} />}
    </>
  );
}
