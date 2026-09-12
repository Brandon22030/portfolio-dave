import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { COLORS, FONTS } from "./theme";
import { useIsMobile } from "./hooks/useIsMobile";

const inputStyle = {
  background: COLORS.adminCard,
  border: `1px solid ${COLORS.adminBorder}`,
  color: COLORS.ink,
  padding: "14px 16px",
  fontSize: 14,
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

const buttonStyle = {
  background: COLORS.terracotta,
  color: COLORS.sand,
  border: "none",
  padding: "14px",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
};

function MobileBlocked() {
  return (
    <div
      style={{
        fontFamily: "'Sora', sans-serif",
        background: COLORS.ink,
        color: COLORS.sand,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 340 }}>
        <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 20, letterSpacing: "-.02em" }}>
          Smart'<span style={{ fontWeight: 500, color: COLORS.terracottaLight }}>Archi</span>
        </div>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 500 }}>Tableau de bord indisponible sur mobile</h1>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: COLORS.text4 }}>
          L'administration de Smart'Archi est conçue pour un écran d'ordinateur. Connecte-toi depuis un ordinateur pour y
          accéder.
        </p>
        <Link
          to="/"
          style={{ marginTop: 12, border: "1px solid rgba(239,233,223,.4)", padding: "14px 20px", fontSize: 13, letterSpacing: ".06em" }}
        >
          ← Retour au site
        </Link>
      </div>
    </div>
  );
}

export default function Auth({ children }) {
  const isMobile = useIsMobile();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setMessage("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(
        error.message === "Invalid login credentials"
          ? "L'adresse email ou le mot de passe est incorrect."
          : "La connexion a échoué. Vérifie tes informations puis réessaie."
      );
    }
  };

  if (isMobile) {
    return <MobileBlocked />;
  }

  if (loading) {
    return <div style={{ textAlign: "center", padding: "4rem", color: COLORS.text3 }}>Chargement…</div>;
  }

  if (session) {
    return children;
  }

  return (
    <div
      style={{
        fontFamily: "'Sora', sans-serif",
        background: COLORS.adminBg,
        color: COLORS.ink,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          background: COLORS.adminCard,
          border: `1px solid ${COLORS.adminBorder}`,
          padding: "2.5rem",
          width: "100%",
          maxWidth: 380,
        }}
      >
        <h1 style={{ margin: "0 0 0.5rem", fontSize: 22, color: COLORS.terracotta }}>Smart'Archi Admin</h1>
        <p style={{ color: COLORS.text3, marginBottom: "2rem", fontSize: 14 }}>
          Accès réservé. Connecte-toi avec le compte créé dans Supabase.
        </p>

        {message && (
          <div
            style={{
              background: COLORS.adminHighlight,
              border: `1px solid ${COLORS.terracotta}`,
              padding: "0.75rem",
              marginBottom: "1rem",
              fontSize: 13,
              color: COLORS.ink,
            }}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSignIn} style={{ display: "grid", gap: "1rem" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, width: "100%" }}>
            <span style={{ color: COLORS.text3 }}>Email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} required />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, width: "100%" }}>
            <span style={{ color: COLORS.text3 }}>Mot de passe</span>
            <div style={{ position: "relative", width: "100%" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ ...inputStyle, paddingRight: 92 }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: 12,
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: COLORS.terracotta,
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 600,
                  padding: 4,
                }}
              >
                {showPassword ? "Masquer" : "Afficher"}
              </button>
            </div>
          </label>
          <button type="submit" style={buttonStyle}>
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
