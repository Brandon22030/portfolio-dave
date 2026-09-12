import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { COLORS, FONTS } from "../theme";
import { CONTACT_INFO } from "../data/defaults";
import { useContacts } from "../hooks/resources";
import { useIsMobile, useIsTablet } from "../hooks/useIsMobile";

const PROJECT_TYPES = ["Résidentiel", "Collectif", "Patrimoine", "Rénovation", "Dossier de permis", "Visualisation 3D"];

const underlineInput = {
  border: "none",
  borderBottom: `1px solid ${COLORS.ink}`,
  background: "transparent",
  padding: "10px 0",
  fontSize: 15,
  outline: "none",
  width: "100%",
  color: COLORS.ink,
};

function Field({ label, children }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".14em", color: COLORS.terracotta }}>{label}</span>
      {children}
    </label>
  );
}

function ContactMobile({ form, setForm, sent, error, handleSubmit }) {
  return (
    <div style={{ background: COLORS.sand }}>
      <Header variant="light" />

      <div
        style={{
          margin: "16px 0 0",
          background: COLORS.ink,
          color: COLORS.sand,
          padding: "56px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 40,
          backgroundImage:
            "linear-gradient(rgba(239,233,223,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(239,233,223,.06) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracottaLight }}>Contact</div>
          <h1 style={{ margin: 0, fontSize: 40, fontWeight: 300, lineHeight: 1.02, letterSpacing: "-.035em" }}>
            Parlons de <span style={{ fontWeight: 600 }}>votre projet.</span>
          </h1>
          <div style={{ fontSize: 15, lineHeight: 1.7, color: COLORS.text4 }}>
            Terrain, rénovation, dossier de permis ou rendus 3D : décrivez votre besoin, je réponds sous 48 h.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontSize: 14 }}>
          {[
            ["Téléphone", CONTACT_INFO.phones],
            ["Email", CONTACT_INFO.email],
            ["Atelier", CONTACT_INFO.city],
          ].map(([label, value]) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", gap: 4, padding: "14px 0", borderTop: "1px solid rgba(239,233,223,.15)" }}>
              <div style={{ color: COLORS.text3, fontSize: 12 }}>{label}</div>
              <div>{value}</div>
            </div>
          ))}
          <div style={{ display: "flex", flexDirection: "column", gap: 6, padding: "14px 0", borderTop: "1px solid rgba(239,233,223,.15)", borderBottom: "1px solid rgba(239,233,223,.15)" }}>
            <div style={{ color: COLORS.text3, fontSize: 12 }}>Réseaux</div>
            <div style={{ display: "flex", gap: 18 }}>
              <a href="https://wa.me/22901617040070" style={{ borderBottom: `1px solid ${COLORS.terracottaLight}` }}>
                WhatsApp
              </a>
              <a href={CONTACT_INFO.linkedin} style={{ borderBottom: `1px solid ${COLORS.terracottaLight}` }}>
                LinkedIn
              </a>
              <a href="#" style={{ borderBottom: `1px solid ${COLORS.terracottaLight}` }}>
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "56px 20px", display: "flex", flexDirection: "column", gap: 28 }}>
        {sent ? (
          <div style={{ fontSize: 20, fontWeight: 500 }}>Message envoyé - je reviens vers vous sous 48 h.</div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <Field label="Nom">
              <input required style={underlineInput} placeholder="Votre nom" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </Field>
            <Field label="Email">
              <input type="email" required style={underlineInput} placeholder="vous@exemple.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </Field>
            <Field label="Téléphone">
              <input style={underlineInput} placeholder="+229 …" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </Field>
            <Field label="Type de projet">
              <select style={underlineInput} value={form.project_type} onChange={(e) => setForm({ ...form, project_type: e.target.value })}>
                {PROJECT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Message">
              <textarea
                required
                rows={5}
                style={{ ...underlineInput, resize: "vertical" }}
                placeholder="Décrivez votre projet, le terrain, le calendrier…"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </Field>
            {error && <div style={{ color: COLORS.terracotta, fontSize: 13 }}>{error}</div>}
            <button
              type="submit"
              style={{ background: COLORS.ink, color: COLORS.sand, border: "none", padding: 18, fontSize: 13, letterSpacing: ".06em", fontWeight: 500, cursor: "pointer", fontFamily: FONTS.body }}
            >
              Envoyer le message →
            </button>
            <div style={{ fontSize: 12, color: COLORS.text2, lineHeight: 1.6 }}>
              Vos données servent uniquement à vous répondre. Aucune newsletter sans votre accord.
            </div>
          </form>
        )}
      </div>

      <Footer />
    </div>
  );
}

function ContactTablet({ form, setForm, sent, error, handleSubmit }) {
  return (
    <div style={{ background: COLORS.sand }}>
      <Header variant="light" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div
          style={{
            background: COLORS.ink,
            color: COLORS.sand,
            padding: "88px 40px 48px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 48,
            backgroundImage:
              "linear-gradient(rgba(239,233,223,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(239,233,223,.06) 1px,transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracottaLight }}>Contact</div>
            <h1 style={{ margin: 0, fontSize: 44, fontWeight: 300, lineHeight: 1.04, letterSpacing: "-.035em" }}>
              Parlons de <span style={{ fontWeight: 600 }}>votre projet.</span>
            </h1>
            <div style={{ fontSize: 14, lineHeight: 1.7, color: COLORS.text4 }}>
              Terrain, rénovation, dossier de permis ou rendus 3D : décrivez votre besoin, je réponds sous 48 h.
            </div>
          </div>

          <div style={{ fontSize: 14 }}>
            {[
              ["Téléphone", CONTACT_INFO.phones],
              ["Email", CONTACT_INFO.email],
              ["Atelier", CONTACT_INFO.city],
            ].map(([label, value]) => (
              <div key={label} style={{ display: "grid", gridTemplateColumns: "100px 1fr", padding: "16px 0", borderTop: "1px solid rgba(239,233,223,.15)" }}>
                <div style={{ color: COLORS.text3 }}>{label}</div>
                <div>{value}</div>
              </div>
            ))}
            <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", padding: "16px 0", borderTop: "1px solid rgba(239,233,223,.15)", borderBottom: "1px solid rgba(239,233,223,.15)" }}>
              <div style={{ color: COLORS.text3 }}>Réseaux</div>
              <div style={{ display: "flex", gap: 14 }}>
                <a href="https://wa.me/22901617040070" style={{ borderBottom: `1px solid ${COLORS.terracottaLight}` }}>
                  WhatsApp
                </a>
                <a href={CONTACT_INFO.linkedin} style={{ borderBottom: `1px solid ${COLORS.terracottaLight}` }}>
                  LinkedIn
                </a>
                <a href="#" style={{ borderBottom: `1px solid ${COLORS.terracottaLight}` }}>
                  Instagram
                </a>
              </div>
            </div>
          </div>

          <a
            href="https://wa.me/22901617040070"
            style={{ background: COLORS.terracotta, color: COLORS.sand, padding: "18px 22px", fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 12 }}
          >
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: COLORS.sand }} />
            Écrire sur WhatsApp - réponse rapide
          </a>
        </div>

        <div style={{ padding: "88px 40px 48px", display: "flex", flexDirection: "column", gap: 28 }}>
          {sent ? (
            <div style={{ fontSize: 19, fontWeight: 500 }}>Message envoyé - je reviens vers vous sous 48 h.</div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                <Field label="Nom">
                  <input required style={underlineInput} placeholder="Votre nom" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </Field>
                <Field label="Email">
                  <input type="email" required style={underlineInput} placeholder="vous@exemple.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </Field>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                <Field label="Téléphone">
                  <input style={underlineInput} placeholder="+229 …" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </Field>
                <Field label="Type de projet">
                  <select style={underlineInput} value={form.project_type} onChange={(e) => setForm({ ...form, project_type: e.target.value })}>
                    {PROJECT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
              <Field label="Message">
                <textarea
                  required
                  rows={6}
                  style={{ ...underlineInput, resize: "vertical" }}
                  placeholder="Décrivez votre projet, le terrain, le calendrier…"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </Field>
              {error && <div style={{ color: COLORS.terracotta, fontSize: 13 }}>{error}</div>}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                <button
                  type="submit"
                  style={{ background: COLORS.ink, color: COLORS.sand, border: "none", padding: "17px 28px", fontSize: 13, letterSpacing: ".06em", fontWeight: 500, cursor: "pointer", fontFamily: FONTS.body }}
                >
                  Envoyer le message →
                </button>
                <div style={{ fontSize: 11, color: COLORS.text2, lineHeight: 1.5, maxWidth: 220 }}>
                  Vos données servent uniquement à vous répondre. Aucune newsletter sans votre accord.
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function Contact() {
  const { add } = useContacts();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [form, setForm] = useState({ name: "", email: "", phone: "", project_type: PROJECT_TYPES[0], message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await add({ ...form, status: "Nouveau" });
      setSent(true);
    } catch (err) {
      setError(err.message);
    }
  };

  if (isMobile) return <ContactMobile form={form} setForm={setForm} sent={sent} error={error} handleSubmit={handleSubmit} />;
  if (isTablet) return <ContactTablet form={form} setForm={setForm} sent={sent} error={error} handleSubmit={handleSubmit} />;

  return (
    <div style={{ background: COLORS.sand }}>
      <Header variant="light" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div
          style={{
            background: COLORS.ink,
            color: COLORS.sand,
            padding: "96px 72px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 64,
            backgroundImage:
              "linear-gradient(rgba(239,233,223,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(239,233,223,.06) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracottaLight }}>Contact</div>
            <h1 style={{ margin: 0, fontSize: 64, fontWeight: 300, lineHeight: 1.02, letterSpacing: "-.035em" }}>
              Parlons de <span style={{ fontWeight: 600 }}>votre projet.</span>
            </h1>
            <div style={{ fontSize: 16, lineHeight: 1.7, color: COLORS.text4, maxWidth: 420 }}>
              Terrain, rénovation, dossier de permis ou rendus 3D : décrivez votre besoin, je réponds sous 48 h.
            </div>
          </div>

          <div style={{ fontSize: 15 }}>
            {[
              ["Téléphone", CONTACT_INFO.phones],
              ["Email", CONTACT_INFO.email],
              ["Atelier", CONTACT_INFO.city],
            ].map(([label, value]) => (
              <div key={label} style={{ display: "grid", gridTemplateColumns: "130px 1fr", padding: "18px 0", borderTop: "1px solid rgba(239,233,223,.15)" }}>
                <div style={{ color: COLORS.text3 }}>{label}</div>
                <div>{value}</div>
              </div>
            ))}
            <div style={{ display: "grid", gridTemplateColumns: "130px 1fr", padding: "18px 0", borderTop: "1px solid rgba(239,233,223,.15)", borderBottom: "1px solid rgba(239,233,223,.15)" }}>
              <div style={{ color: COLORS.text3 }}>Réseaux</div>
              <div style={{ display: "flex", gap: 16 }}>
                <a href="https://wa.me/22901617040070" style={{ borderBottom: `1px solid ${COLORS.terracottaLight}` }}>
                  WhatsApp
                </a>
                <a href={CONTACT_INFO.linkedin} style={{ borderBottom: `1px solid ${COLORS.terracottaLight}` }}>
                  LinkedIn
                </a>
                <a href="#" style={{ borderBottom: `1px solid ${COLORS.terracottaLight}` }}>
                  Instagram
                </a>
              </div>
            </div>
          </div>

          <a
            href="https://wa.me/22901617040070"
            style={{ background: COLORS.terracotta, color: COLORS.sand, padding: "20px 24px", fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", gap: 12 }}
          >
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: COLORS.sand }} />
            Écrire sur WhatsApp - réponse rapide
          </a>
        </div>

        <div style={{ padding: "96px 72px", display: "flex", flexDirection: "column", gap: 32 }}>
          {sent ? (
            <div style={{ fontSize: 20, fontWeight: 500 }}>Message envoyé - je reviens vers vous sous 48 h.</div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
                <Field label="Nom">
                  <input required style={underlineInput} placeholder="Votre nom" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </Field>
                <Field label="Email">
                  <input type="email" required style={underlineInput} placeholder="vous@exemple.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </Field>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
                <Field label="Téléphone">
                  <input style={underlineInput} placeholder="+229 …" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </Field>
                <Field label="Type de projet">
                  <select style={underlineInput} value={form.project_type} onChange={(e) => setForm({ ...form, project_type: e.target.value })}>
                    {PROJECT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
              <Field label="Message">
                <textarea
                  required
                  rows={7}
                  style={{ ...underlineInput, resize: "vertical" }}
                  placeholder="Décrivez votre projet, le terrain, le calendrier…"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </Field>
              {error && <div style={{ color: COLORS.terracotta, fontSize: 13 }}>{error}</div>}
              <button
                type="submit"
                style={{ background: COLORS.ink, color: COLORS.sand, border: "none", padding: "20px 36px", fontSize: 13, letterSpacing: ".06em", fontWeight: 500, cursor: "pointer", alignSelf: "flex-start", fontFamily: FONTS.body }}
              >
                Envoyer le message →
              </button>
              <div style={{ fontSize: 12, color: COLORS.text2, lineHeight: 1.6 }}>
                Vos données servent uniquement à vous répondre. Aucune newsletter sans votre accord.
              </div>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
