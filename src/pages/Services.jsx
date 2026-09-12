import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { COLORS, FONTS } from "../theme";
import { useServicesData } from "../hooks/resources";
import { useIsMobile, useIsTablet } from "../hooks/useIsMobile";

function ServicesMobile({ services }) {
  return (
    <div style={{ background: COLORS.sand }}>
      <Header variant="light" />

      <div style={{ padding: "24px 20px 0", display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracotta }}>Services</div>
        <h1 style={{ margin: 0, fontSize: 40, fontWeight: 300, lineHeight: 1.02, letterSpacing: "-.035em" }}>
          Cinq prestations, <span style={{ fontWeight: 600 }}>combinables.</span>
        </h1>
        <div style={{ fontSize: 15, lineHeight: 1.7, color: COLORS.text1 }}>
          De la première esquisse à l'accompagnement technique en phase chantier. Chaque mission peut être prise seule ou
          enchaînée.
        </div>
      </div>

      <div style={{ padding: "48px 20px 0", display: "flex", flexDirection: "column", gap: 12 }}>
        {services.map((s, i) => (
          <Reveal
            key={s.id || s.numeral}
            delay={i * 0.06}
            style={{
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 36,
              minHeight: 260,
              background: s.bg_color,
              color: s.fg_color,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
              <div style={{ fontFamily: FONTS.display, fontSize: 40, fontWeight: 500, lineHeight: 1, color: s.numeral_color }}>{s.numeral}</div>
              <div style={{ fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", opacity: 0.7, textAlign: "right" }}>{s.label}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ fontSize: 23, fontWeight: 500, letterSpacing: "-.02em", lineHeight: 1.1 }}>{s.title}</div>
              <div style={{ fontSize: 14, lineHeight: 1.65, opacity: 0.85 }}>{s.description}</div>
            </div>
          </Reveal>
        ))}
      </div>

      <div style={{ margin: "72px 0 0", display: "flex", flexDirection: "column" }}>
        <div style={{ height: 280, background: COLORS.taupe, overflow: "hidden" }}>
          <img src="/img/villa-piscine.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ background: COLORS.terracotta, color: COLORS.sand, padding: "56px 20px", display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ opacity: 0.85, fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase" }}>Devis</div>
          <div style={{ fontSize: 36, fontWeight: 300, lineHeight: 1.02, letterSpacing: "-.03em" }}>
            Besoin d'un <span style={{ fontWeight: 600 }}>devis ?</span>
          </div>
          <div style={{ fontSize: 15, lineHeight: 1.7, opacity: 0.9 }}>
            Décrivez votre projet, votre terrain et votre calendrier. Réponse sous 48 h avec une proposition de mission et un
            budget.
          </div>
          <Link to="/contact" style={{ background: COLORS.ink, color: COLORS.sand, padding: 17, fontSize: 13, letterSpacing: ".06em", textAlign: "center" }}>
            Demander un devis →
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function ServicesTablet({ services }) {
  return (
    <div style={{ background: COLORS.sand }}>
      <Header variant="light" />

      <div style={{ padding: "88px 40px 0", display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracotta }}>Services</div>
        <h1 style={{ margin: 0, fontSize: 48, fontWeight: 300, lineHeight: 1.02, letterSpacing: "-.035em" }}>
          Cinq prestations, <span style={{ fontWeight: 600 }}>combinables.</span>
        </h1>
        <div style={{ fontSize: 15, lineHeight: 1.7, color: COLORS.text1, maxWidth: 500 }}>
          De la première esquisse à l'accompagnement technique en phase chantier. Chaque mission peut être prise seule ou
          enchaînée.
        </div>
      </div>

      <div style={{ padding: "56px 40px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {services.map((s, i) => (
          <Reveal
            key={s.id || s.numeral}
            delay={i * 0.08}
            style={{
              gridColumn: i === 0 ? "1 / -1" : "auto",
              minHeight: 320,
              padding: "32px 28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 44,
              background: s.bg_color,
              color: s.fg_color,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ fontFamily: FONTS.display, fontSize: 44, fontWeight: 500, color: s.numeral_color }}>{s.numeral}</div>
              <div style={{ fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", opacity: 0.7, textAlign: "right" }}>{s.label}</div>
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 500, letterSpacing: "-.02em", marginBottom: 10 }}>{s.title}</div>
              <div style={{ fontSize: 14, lineHeight: 1.65, opacity: 0.85 }}>{s.description}</div>
            </div>
          </Reveal>
        ))}
      </div>

      <div style={{ margin: "96px 0 0", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ background: COLORS.terracotta, color: COLORS.sand, padding: "64px 40px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 24 }}>
          <div style={{ opacity: 0.85, fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase" }}>Devis</div>
          <h2 style={{ margin: 0, fontSize: 38, fontWeight: 300, lineHeight: 1.02, letterSpacing: "-.03em" }}>
            Besoin d'un <span style={{ fontWeight: 600 }}>devis ?</span>
          </h2>
          <div style={{ fontSize: 14, lineHeight: 1.7, opacity: 0.9 }}>
            Décrivez votre projet, votre terrain et votre calendrier. Réponse sous 48 h avec une proposition de mission et un
            budget.
          </div>
          <Link to="/contact" style={{ background: COLORS.ink, color: COLORS.sand, padding: "16px 26px", fontSize: 13, letterSpacing: ".06em", alignSelf: "flex-start" }}>
            Demander un devis →
          </Link>
        </div>
        <div style={{ overflow: "hidden" }}>
          <img src="/img/villa-piscine.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function Services() {
  const { rows: services } = useServicesData();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  if (isMobile) return <ServicesMobile services={services} />;
  if (isTablet) return <ServicesTablet services={services} />;

  return (
    <div style={{ background: COLORS.sand }}>
      <Header variant="light" />

      <div style={{ padding: "64px 64px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "end" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracotta }}>Services</div>
          <h1 style={{ margin: 0, fontSize: 64, fontWeight: 300, lineHeight: 1.02, letterSpacing: "-.035em" }}>
            Cinq prestations, <span style={{ fontWeight: 600 }}>combinables.</span>
          </h1>
        </div>
        <div style={{ fontSize: 16, lineHeight: 1.7, color: COLORS.text1, maxWidth: 440, justifySelf: "end" }}>
          De la première esquisse à l'accompagnement technique en phase chantier. Chaque mission peut être prise seule ou
          enchaînée.
        </div>
      </div>

      <div style={{ padding: "80px 64px 0", display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 24 }}>
        {services.map((s, i) => (
          <Reveal
            key={s.id || s.numeral}
            delay={i * 0.08}
            style={{
              gridColumn: `span ${s.span}`,
              minHeight: 420,
              padding: "40px 36px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 56,
              background: s.bg_color,
              color: s.fg_color,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ fontFamily: FONTS.display, fontSize: 56, fontWeight: 500, color: s.numeral_color }}>{s.numeral}</div>
              <div style={{ fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", opacity: 0.7 }}>{s.label}</div>
            </div>
            <div>
              <div style={{ fontSize: 28, fontWeight: 500, letterSpacing: "-.02em", marginBottom: 12 }}>{s.title}</div>
              <div style={{ fontSize: 14, lineHeight: 1.65, opacity: 0.85, maxWidth: 520 }}>{s.description}</div>
            </div>
          </Reveal>
        ))}
      </div>

      <div style={{ margin: "128px 0 0", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ background: COLORS.terracotta, color: COLORS.sand, padding: "96px 80px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 28 }}>
          <div style={{ opacity: 0.85, fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase" }}>Devis</div>
          <h2 style={{ margin: 0, fontSize: 52, fontWeight: 300, lineHeight: 1.02, letterSpacing: "-.03em" }}>
            Besoin d'un <span style={{ fontWeight: 600 }}>devis ?</span>
          </h2>
          <div style={{ fontSize: 16, lineHeight: 1.7, maxWidth: 420, opacity: 0.9 }}>
            Décrivez votre projet, votre terrain et votre calendrier. Réponse sous 48 h avec une proposition de mission et un
            budget.
          </div>
          <Link to="/contact" style={{ background: COLORS.ink, color: COLORS.sand, padding: "18px 32px", fontSize: 13, letterSpacing: ".06em", alignSelf: "flex-start" }}>
            Demander un devis →
          </Link>
        </div>
        <div style={{ height: 620, overflow: "hidden" }}>
          <img src="/img/villa-piscine.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
