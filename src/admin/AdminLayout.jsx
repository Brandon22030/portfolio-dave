import { Link } from "react-router-dom";
import { COLORS, FONTS } from "../theme";
import { supabase } from "../supabaseClient";

const NAV = [
  { label: "Tableau de bord", to: "/dashboard" },
  { label: "Projets", to: "/dashboard/projets" },
  { label: "Logiciels", to: "/dashboard/logiciels" },
  { label: "Médias", to: "/dashboard/medias" },
  { label: "Articles", to: "/dashboard/articles" },
  { label: "Contacts", to: "/dashboard/contacts" },
  { label: "SEO & paramètres", to: "/dashboard/seo" },
];

export default function AdminLayout({ active, counts = {}, children }) {
  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "240px 1fr", background: COLORS.adminBg, fontFamily: FONTS.body, color: COLORS.ink }}>
      <div style={{ background: COLORS.ink, color: COLORS.text5, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 32, fontSize: 13, position: "sticky", top: 0, height: "100vh" }}>
        <div>
          <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 15, color: COLORS.sand }}>Smart'Archi</div>
          <div style={{ fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: COLORS.text3, marginTop: 4 }}>Admin</div>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {NAV.map((n) => {
            const isActive = n.label === active;
            const count = counts[n.label];
            return (
              <Link
                key={n.label}
                to={n.to}
                style={{
                  padding: "10px 12px",
                  display: "flex",
                  justifyContent: "space-between",
                  borderLeft: `2px solid ${isActive ? COLORS.terracotta : "transparent"}`,
                  background: isActive ? "rgba(255,255,255,.06)" : "transparent",
                  color: isActive ? COLORS.sand : COLORS.text5,
                }}
              >
                <span>{n.label}</span>
                {count !== undefined && count !== "" && <span>{count}</span>}
              </Link>
            );
          })}
        </nav>

        <div style={{ marginTop: "auto", fontSize: 12, color: COLORS.text3, display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ color: COLORS.text5 }}>Bennett D. Medehou</div>
          <div>Session sécurisée · Supabase Auth</div>
          <button
            onClick={() => supabase.auth.signOut()}
            style={{ marginTop: 12, background: "transparent", border: `1px solid rgba(255,255,255,.2)`, color: COLORS.text5, padding: "8px 12px", cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}
          >
            Déconnexion
          </button>
          <Link to="/" style={{ color: COLORS.text3, marginTop: 4 }}>
            ← Retour au site
          </Link>
        </div>
      </div>

      <div style={{ padding: "40px 48px", overflowY: "auto" }}>{children}</div>
    </div>
  );
}
