import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { THEMES } from "./theme";

const c = THEMES.dark;

const inputStyle = {
  background: c.card,
  border: `1px solid ${c.border4}`,
  color: c.text,
  padding: "14px 16px",
  borderRadius: 4,
  fontSize: 14,
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

const buttonStyle = {
  background: c.tc,
  color: c.cardText,
  border: "none",
  padding: "14px",
  borderRadius: 4,
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
};

export default function Auth({ children }) {
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
          ? "L’adresse email ou le mot de passe est incorrect."
          : "La connexion a échoué. Vérifie tes informations puis réessaie."
      );
    }
  };

  if (loading) {
    return <div style={{ textAlign: "center", padding: "4rem", color: c.muted }}>Chargement…</div>;
  }

  if (session) {
    return children;
  }

  return (
    <div
      style={{
        fontFamily: "'Segoe UI',sans-serif",
        background: c.bg,
        color: c.text,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          background: c.card,
          border: `1px solid ${c.border3}`,
          borderRadius: 8,
          padding: "2.5rem",
          width: "100%",
          maxWidth: 380,
        }}
      >
        <h1 style={{ margin: "0 0 0.5rem", fontSize: 22, color: c.tc }}>PlanifyBJ Dashboard</h1>
        <p style={{ color: c.muted, marginBottom: "2rem", fontSize: 14 }}>
          Accès réservé. Connecte-toi avec le compte créé dans Supabase.
        </p>

        {message && (
          <div
            style={{
              background: `${c.bg}`,
              border: `1px solid ${c.tc60}`,
              borderRadius: 4,
              padding: "0.75rem",
              marginBottom: "1rem",
              fontSize: 13,
              color: c.text,
            }}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSignIn} style={{ display: "grid", gap: "1rem" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, width: "100%" }}>
            <span style={{ color: c.muted }}>Email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} required />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, width: "100%" }}>
            <span style={{ color: c.muted }}>Mot de passe</span>
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
                  color: c.tc,
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
