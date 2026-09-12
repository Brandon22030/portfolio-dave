import Header, { HEADER_HEIGHT } from "../components/Header";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { COLORS, FONTS } from "../theme";
import { useTimeline } from "../hooks/resources";
import { useInView } from "../hooks/useInView";
import { useIsMobile, useIsTablet } from "../hooks/useIsMobile";

const STATS = [
  ["2018", "début de la formation"],
  ["4", "agences & bureaux d'études"],
  ["3", "chantiers suivis"],
  ["4", "diplômes obtenus"],
];

function TimelineRow({ t }) {
  const [ref, inView] = useInView();
  const dot = COLORS.terracotta;

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "200px 80px 1fr",
        padding: "0 0 56px",
        alignItems: "start",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: "opacity .6s ease, transform .6s cubic-bezier(.2,.7,.3,1)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ fontFamily: FONTS.display, fontSize: 20, fontWeight: 500, letterSpacing: "-.02em" }}>{t.years}</div>
        <div style={{ fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: COLORS.terracotta }}>{t.kind}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", paddingTop: 6 }}>
        <div
          style={{
            width: 14,
            height: 14,
            background: inView ? dot : COLORS.taupe,
            border: `3px solid ${COLORS.sand}`,
            outline: `1px solid ${inView ? dot : COLORS.taupe}`,
            transform: inView ? "scale(1)" : "scale(0.6)",
            transition: "background-color .5s ease .15s, outline-color .5s ease .15s, transform .5s ease .15s",
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-.01em" }}>{t.title}</div>
        <div style={{ fontSize: 13, color: COLORS.text2 }}>{t.place}</div>
        <div style={{ fontSize: 15, lineHeight: 1.7, color: COLORS.text1, maxWidth: 560 }}>{t.description}</div>
      </div>
    </div>
  );
}

function TimelineRowMobile({ t }) {
  const [ref, inView] = useInView();
  const dot = COLORS.terracotta;

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "14px 1fr",
        gap: 20,
        padding: "0 0 40px",
        alignItems: "start",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: "opacity .6s ease, transform .6s cubic-bezier(.2,.7,.3,1)",
      }}
    >
      <div style={{ paddingTop: 5 }}>
        <div
          style={{
            width: 14,
            height: 14,
            background: inView ? dot : COLORS.taupe,
            border: `3px solid ${COLORS.sand}`,
            outline: `1px solid ${inView ? dot : COLORS.taupe}`,
            transform: inView ? "scale(1)" : "scale(0.6)",
            transition: "background-color .5s ease .15s, outline-color .5s ease .15s, transform .5s ease .15s",
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ fontFamily: FONTS.display, fontSize: 15, fontWeight: 500, letterSpacing: "-.02em" }}>{t.years}</div>
          <div style={{ fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: COLORS.terracotta }}>{t.kind}</div>
        </div>
        <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: "-.01em", lineHeight: 1.3 }}>{t.title}</div>
        <div style={{ fontSize: 12, color: COLORS.text2 }}>{t.place}</div>
        <div style={{ fontSize: 14, lineHeight: 1.65, color: COLORS.text1 }}>{t.description}</div>
      </div>
    </div>
  );
}

function CareerMobile({ timeline }) {
  return (
    <div style={{ background: COLORS.sand }}>
      <Header variant="light" />

      <div style={{ padding: "24px 20px 0", display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracotta }}>Parcours</div>
        <h1 style={{ margin: 0, fontSize: 40, fontWeight: 300, lineHeight: 1.02, letterSpacing: "-.035em" }}>
          Formations, agences, <span style={{ fontWeight: 600 }}>chantiers.</span>
        </h1>
        <div style={{ fontSize: 15, lineHeight: 1.7, color: COLORS.text1 }}>
          Depuis 2018, entre les bancs de l'école, les agences de Cotonou et le terrain. Par ordre chronologique inverse.
        </div>
      </div>

      <div style={{ padding: "40px 20px 0" }}>
        <div style={{ aspectRatio: "4/3", background: COLORS.taupe, overflow: "hidden" }}>
          <img src="/img/cv-parcours.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>

      <div style={{ padding: "56px 20px 0", display: "flex", flexDirection: "column", position: "relative" }}>
        <div style={{ position: "absolute", left: 27, top: 56, bottom: 0, width: 1, background: COLORS.taupe }} />
        {timeline.map((t) => (
          <TimelineRowMobile key={t.title} t={t} />
        ))}
      </div>

      <div style={{ margin: "16px 20px 0", background: COLORS.ink, color: COLORS.sand, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracottaLight }}>CV complet</div>
        <div style={{ fontSize: 14, lineHeight: 1.6, color: COLORS.text5 }}>Version PDF détaillée avec références et projets par année.</div>
        <a href="#" style={{ border: "1px solid rgba(239,233,223,.4)", padding: 14, fontSize: 13, letterSpacing: ".06em", textAlign: "center" }}>
          Télécharger le CV →
        </a>
      </div>

      <div style={{ margin: "56px 0 0", background: COLORS.terracotta, color: COLORS.sand, padding: "40px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px 16px" }}>
        {STATS.map(([n, l]) => (
          <div key={l}>
            <div style={{ fontFamily: FONTS.display, fontSize: 34, fontWeight: 500 }}>{n}</div>
            <div style={{ fontSize: 12, opacity: 0.85 }}>{l}</div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

function CareerTablet({ timeline }) {
  return (
    <div style={{ background: COLORS.sand }}>
      <Header variant="light" />

      <div style={{ padding: "88px 40px 0", display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracotta }}>Parcours</div>
        <h1 style={{ margin: 0, fontSize: 48, fontWeight: 300, lineHeight: 1.02, letterSpacing: "-.035em" }}>
          Formations, agences, <span style={{ fontWeight: 600 }}>chantiers.</span>
        </h1>
        <div style={{ fontSize: 15, lineHeight: 1.7, color: COLORS.text1, maxWidth: 500 }}>
          Depuis 2018, entre les bancs de l'école, les agences de Cotonou et le terrain. Par ordre chronologique inverse.
        </div>
      </div>

      <div style={{ padding: "56px 40px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "stretch" }}>
        <div style={{ height: 340, background: COLORS.taupe, overflow: "hidden" }}>
          <img src="/img/cv-parcours.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ background: COLORS.ink, color: COLORS.sand, padding: 32, display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracottaLight }}>CV complet</div>
          <div style={{ fontSize: 14, lineHeight: 1.6, color: COLORS.text5 }}>Version PDF détaillée avec références et projets par année.</div>
          <a href="#" style={{ border: "1px solid rgba(239,233,223,.4)", padding: "14px 20px", fontSize: 13, letterSpacing: ".06em", alignSelf: "flex-start" }}>
            Télécharger le CV →
          </a>
        </div>
      </div>

      <div style={{ padding: "80px 40px 0" }}>
        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <div style={{ position: "absolute", left: 239, top: 0, bottom: 0, width: 1, background: COLORS.taupe }} />
          {timeline.map((t) => (
            <TimelineRow key={t.title} t={t} />
          ))}
        </div>
      </div>

      <div style={{ margin: "56px 0 0", background: COLORS.terracotta, color: COLORS.sand, padding: "48px 40px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
        {STATS.map(([n, l]) => (
          <div key={l}>
            <div style={{ fontFamily: FONTS.display, fontSize: 38, fontWeight: 500 }}>{n}</div>
            <div style={{ fontSize: 12, opacity: 0.85 }}>{l}</div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default function Career() {
  const { rows: timeline } = useTimeline();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  if (isMobile) return <CareerMobile timeline={timeline} />;
  if (isTablet) return <CareerTablet timeline={timeline} />;

  return (
    <div style={{ background: COLORS.sand }}>
      <Header variant="light" />

      <div style={{ padding: "64px 64px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "end" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracotta }}>Parcours</div>
          <h1 style={{ margin: 0, fontSize: 64, fontWeight: 300, lineHeight: 1.02, letterSpacing: "-.035em" }}>
            Formations, agences, <span style={{ fontWeight: 600 }}>chantiers.</span>
          </h1>
        </div>
        <div style={{ fontSize: 16, lineHeight: 1.7, color: COLORS.text1, maxWidth: 440, justifySelf: "end" }}>
          Depuis 2018, entre les bancs de l'école, les agences de Cotonou et le terrain. Par ordre chronologique inverse.
        </div>
      </div>

      <div style={{ padding: "96px 64px 0", display: "grid", gridTemplateColumns: "1fr 400px", gap: 96, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <div style={{ position: "absolute", left: 239, top: 0, bottom: 0, width: 1, background: COLORS.taupe }} />
          {timeline.map((t) => (
            <TimelineRow key={t.title} t={t} />
          ))}
        </div>

        <div style={{ position: "sticky", top: HEADER_HEIGHT + 32, display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ height: 520, background: COLORS.taupe, overflow: "hidden" }}>
            <img src="/img/cv-parcours.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ background: COLORS.ink, color: COLORS.sand, padding: 32, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracottaLight }}>CV complet</div>
            <div style={{ fontSize: 15, lineHeight: 1.6, color: COLORS.text5 }}>Version PDF détaillée avec références et projets par année.</div>
            <a href="#" style={{ border: "1px solid rgba(239,233,223,.4)", padding: "14px 20px", fontSize: 13, letterSpacing: ".06em", alignSelf: "flex-start" }}>
              Télécharger le CV →
            </a>
          </div>
        </div>
      </div>

      <div style={{ margin: "64px 0 0", background: COLORS.terracotta, color: COLORS.sand, padding: "56px 64px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32 }}>
        {STATS.map(([n, l]) => (
          <div key={l}>
            <div style={{ fontFamily: FONTS.display, fontSize: 44, fontWeight: 500 }}>{n}</div>
            <div style={{ fontSize: 13, opacity: 0.85 }}>{l}</div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
