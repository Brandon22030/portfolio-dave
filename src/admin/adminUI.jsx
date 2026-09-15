import { COLORS, FONTS } from "../theme";

export function PageHeader({ title, subtitle, actions }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 32 }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 500 }}>{title}</h1>
        {subtitle && <div style={{ fontSize: 13, color: COLORS.text3, marginTop: 6 }}>{subtitle}</div>}
      </div>
      {actions && <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>{actions}</div>}
    </div>
  );
}

export function StatCard({ label, value, sub, subColor }) {
  return (
    <div style={{ background: COLORS.adminCard, border: `1px solid ${COLORS.adminBorder}`, padding: "20px 22px" }}>
      <div style={{ fontSize: 12, color: COLORS.text3, marginBottom: 10 }}>{label}</div>
      <div style={{ fontFamily: FONTS.display, fontSize: 26, fontWeight: 500 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: subColor || COLORS.text3, marginTop: 6 }}>{sub}</div>}
    </div>
  );
}

const STATUS_STYLES = {
  Publié: { bg: COLORS.successBg, color: COLORS.successText },
  Brouillon: { bg: COLORS.warnBg, color: COLORS.terracotta },
  Nouveau: { bg: COLORS.warnBg, color: COLORS.terracotta },
  Répondu: { bg: COLORS.successBg, color: COLORS.successText },
  Archivé: { bg: COLORS.adminHairline, color: COLORS.text3 },
};

export function StatusPill({ status }) {
  const s = STATUS_STYLES[status] || { bg: COLORS.adminHairline, color: COLORS.text3 };
  return (
    <span style={{ fontSize: 11, padding: "4px 8px", background: s.bg, color: s.color, borderRadius: 2, whiteSpace: "nowrap" }}>{status}</span>
  );
}

export function PrimaryButton({ as: Tag = "button", ...props }) {
  return (
    <Tag
      {...props}
      style={{ background: COLORS.terracotta, color: COLORS.sand, border: "none", padding: "11px 18px", fontSize: 13, cursor: "pointer", fontFamily: "inherit", display: "inline-block", ...props.style }}
    />
  );
}

export function DarkButton({ as: Tag = "button", ...props }) {
  return (
    <Tag
      {...props}
      style={{ background: COLORS.ink, color: COLORS.sand, border: "none", padding: "11px 18px", fontSize: 13, cursor: "pointer", fontFamily: "inherit", display: "inline-block", ...props.style }}
    />
  );
}

export function OutlineButton({ as: Tag = "button", ...props }) {
  return (
    <Tag
      {...props}
      style={{ background: COLORS.adminCard, color: COLORS.ink, border: `1px solid ${COLORS.taupe}`, padding: "11px 18px", fontSize: 13, cursor: "pointer", fontFamily: "inherit", display: "inline-block", ...props.style }}
    />
  );
}

export function Field({ label, children }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13 }}>
      <span style={{ color: COLORS.text3, fontSize: 11, textTransform: "uppercase", letterSpacing: ".08em" }}>{label}</span>
      {children}
    </label>
  );
}

export const inputStyle = {
  border: `1px solid ${COLORS.adminBorder}`,
  background: COLORS.adminCard,
  padding: "10px 12px",
  fontSize: 14,
  fontFamily: "inherit",
  width: "100%",
  outline: "none",
  color: COLORS.ink,
};

export function Card({ children, style }) {
  return <div style={{ background: COLORS.adminCard, border: `1px solid ${COLORS.adminBorder}`, padding: 24, ...style }}>{children}</div>;
}

export function Modal({ title, onClose, children, width = 640 }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        background: "rgba(20,18,15,.6)",
        display: "flex",
        justifyContent: "center",
        padding: "48px 24px",
        overflowY: "auto",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: COLORS.adminCard,
          border: `1px solid ${COLORS.adminBorder}`,
          width: "100%",
          maxWidth: width,
          height: "fit-content",
          padding: 32,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div style={{ fontWeight: 500, fontSize: 18 }}>{title}</div>
          <button
            onClick={onClose}
            aria-label="Fermer"
            style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.text3, fontSize: 22, lineHeight: 1, padding: 4 }}
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// Real submissions from the public contact form never set `received` (only the
// seed/example rows do) - fall back to the actual `created_at` timestamp so
// real messages don't show a blank date.
export function contactDate(c) {
  if (c.received) return c.received;
  if (!c.created_at) return "-";
  return new Date(c.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}
