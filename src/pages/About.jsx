import Header from "../components/Header";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import SoftwareLogo from "../components/SoftwareLogo";
import { COLORS, FONTS } from "../theme";
import { useSkills, useSoftwares } from "../hooks/resources";
import { useInView } from "../hooks/useInView";
import { useIsMobile, useIsTablet } from "../hooks/useIsMobile";

const VISION_COLS = [
  { label: "Vision", text: "Des espaces sobres, adaptés au climat tropical, économes en matière et pensés pour durer." },
  { label: "Méthode", text: "Un modèle 3D unique, de l'APS au dossier de permis, partagé avec ingénieurs et entreprises." },
  { label: "Terrain", text: "Suivi de chantier et relevés : les dessins restent en phase avec la réalité construite." },
];

function SkillBar({ s, delay }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16 }}>
        <div>{s.t}</div>
        <div style={{ color: COLORS.text3, fontSize: 13 }}>{s.lvl}</div>
      </div>
      <div style={{ height: 3, background: "rgba(239,233,223,.15)" }}>
        <div
          style={{
            height: 3,
            background: COLORS.terracotta,
            width: inView ? s.w : 0,
            transition: `width 1s cubic-bezier(.2,.7,.3,1) ${delay}s`,
          }}
        />
      </div>
    </div>
  );
}

function AboutMobile({ skills, softwares }) {
  return (
    <div style={{ background: COLORS.sand }}>
      <Header variant="light" />

      <div style={{ padding: "24px 20px 0", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracotta }}>À propos</div>
        <h1 style={{ margin: 0, fontSize: 40, fontWeight: 300, lineHeight: 1.02, letterSpacing: "-.035em" }}>
          Entre <span style={{ fontWeight: 600 }}>conception</span> et <span style={{ fontWeight: 600 }}>rigueur technique.</span>
        </h1>
      </div>

      <div style={{ padding: "32px 20px 0", position: "relative" }}>
        <div style={{ aspectRatio: "4/5", background: COLORS.taupe, overflow: "hidden" }}>
          <img src="/img/portrait-bennett.jpg" alt="Bennett David Medehou" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(20%)" }} />
        </div>
        <div style={{ position: "absolute", left: 20, bottom: 24, background: COLORS.terracotta, color: COLORS.sand, padding: "16px 20px", display: "flex", flexDirection: "column", gap: 3 }}>
          <div style={{ fontFamily: FONTS.display, fontSize: 16, fontWeight: 500 }}>Bennett D. Medehou</div>
          <div style={{ fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase" }}>Dessinateur projeteur · Génie civil</div>
        </div>
      </div>

      <div style={{ padding: "40px 20px 0", display: "flex", flexDirection: "column", gap: 32 }}>
        <div style={{ fontSize: 15, lineHeight: 1.75, color: COLORS.text1, display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            Diplômé en Génie Civil et exerçant en tant que dessinateur projeteur bâtiment, je vois chaque projet comme
            l'alliance entre technicité, créativité et sens du détail. Pour moi, concevoir ne consiste pas seulement à
            dessiner, mais à donner vie à des espaces fonctionnels, durables et adaptés aux besoins réels.
          </div>
          <div>
            Curieux, rigoureux et passionné par l'univers du bâtiment, j'aime relever de nouveaux défis, approfondir mes
            compétences et perfectionner mes méthodes de travail. Mon objectif est de proposer des conceptions précises,
            harmonieuses et en accord avec les exigences techniques, esthétiques et contemporaines.
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, borderTop: `1px solid ${COLORS.ink}`, paddingTop: 24 }}>
          {[
            ["6", "projets conçus"],
            ["4", "agences & BE"],
            ["8", "logiciels"],
          ].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontFamily: FONTS.display, fontSize: 28, fontWeight: 500, color: COLORS.terracotta }}>{n}</div>
              <div style={{ fontSize: 12, color: COLORS.text1 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, fontSize: 14, color: COLORS.text1 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: COLORS.terracotta }}>Langues</div>
            <div>Français · Anglais</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: COLORS.terracotta }}>Centres d'intérêt</div>
            <div>Jeux vidéo · Musique · Films & séries · IA & technologies</div>
          </div>
        </div>
      </div>

      <div style={{ margin: "64px 0 0", background: COLORS.ink, color: COLORS.sand, padding: "64px 20px", display: "flex", flexDirection: "column", gap: 56 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracottaLight }}>Compétences</div>
          {skills.map((s, i) => (
            <SkillBar key={s.t} s={s} delay={i * 0.06} />
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracottaLight }}>Logiciels</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(239,233,223,.15)", border: "1px solid rgba(239,233,223,.15)" }}>
            {softwares.map((s, i) => (
              <div
                key={s.n}
                style={{
                  background: COLORS.ink,
                  padding: "18px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  gridColumn: i === softwares.length - 1 && softwares.length % 2 !== 0 ? "1 / -1" : "auto",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <SoftwareLogo software={s} size={28} />
                  </div>
                  <div style={{ fontFamily: FONTS.display, fontSize: 13, fontWeight: 500 }}>{s.n}</div>
                </div>
                <div style={{ fontSize: 11, color: COLORS.text3, lineHeight: 1.5 }}>{s.u}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: COLORS.text3, borderTop: "1px solid rgba(239,233,223,.15)", paddingTop: 14 }}>
            <div>Bureautique</div>
            <div style={{ color: COLORS.text5 }}>Word · Excel · PowerPoint</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {VISION_COLS.map((v, i) => (
          <div key={v.label} style={{ padding: "40px 20px", display: "flex", flexDirection: "column", gap: 12, borderBottom: i < VISION_COLS.length - 1 ? `1px solid ${COLORS.taupe}` : "none" }}>
            <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracotta }}>{v.label}</div>
            <div style={{ fontSize: 19, lineHeight: 1.45, fontWeight: 300 }}>{v.text}</div>
          </div>
        ))}
      </div>

      <div style={{ height: 280, background: COLORS.taupe, overflow: "hidden" }}>
        <img src="/img/vision-apropos.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      <Footer />
    </div>
  );
}

function AboutTablet({ skills, softwares }) {
  return (
    <div style={{ background: COLORS.sand }}>
      <Header variant="light" />

      <div style={{ padding: "40px 40px 0", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracotta }}>À propos</div>
        <h1 style={{ margin: 0, fontSize: 52, fontWeight: 300, lineHeight: 1.02, letterSpacing: "-.035em", maxWidth: 680 }}>
          Entre <span style={{ fontWeight: 600 }}>conception</span> et <span style={{ fontWeight: 600 }}>rigueur technique.</span>
        </h1>
      </div>

      <div style={{ padding: "48px 40px 0", display: "grid", gridTemplateColumns: "340px 1fr", gap: 40, alignItems: "start" }}>
        <div style={{ position: "relative" }}>
          <div style={{ aspectRatio: "3/4", background: COLORS.taupe, overflow: "hidden" }}>
            <img src="/img/portrait-bennett.jpg" alt="Bennett David Medehou" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(20%)" }} />
          </div>
          <div style={{ position: "absolute", right: -20, bottom: 32, background: COLORS.terracotta, color: COLORS.sand, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 3 }}>
            <div style={{ fontFamily: FONTS.display, fontSize: 16, fontWeight: 500 }}>Bennett D. Medehou</div>
            <div style={{ fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase" }}>Dessinateur projeteur · Génie civil</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div style={{ fontSize: 15, lineHeight: 1.75, color: COLORS.text1, display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              Diplômé en Génie Civil et exerçant en tant que dessinateur projeteur bâtiment, je vois chaque projet comme
              l'alliance entre technicité, créativité et sens du détail. Pour moi, concevoir ne consiste pas seulement à
              dessiner, mais à donner vie à des espaces fonctionnels, durables et adaptés aux besoins réels.
            </div>
            <div>
              Curieux, rigoureux et passionné par l'univers du bâtiment, j'aime relever de nouveaux défis, approfondir mes
              compétences et perfectionner mes méthodes de travail. Mon objectif est de proposer des conceptions précises,
              harmonieuses et en accord avec les exigences techniques, esthétiques et contemporaines.
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, borderTop: `1px solid ${COLORS.ink}`, paddingTop: 24 }}>
            {[
              ["6", "projets conçus"],
              ["4", "agences & BE"],
              ["8", "logiciels"],
            ].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: FONTS.display, fontSize: 30, fontWeight: 500, color: COLORS.terracotta }}>{n}</div>
                <div style={{ fontSize: 12, color: COLORS.text1 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: 14, color: COLORS.text1 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: COLORS.terracotta }}>Langues</div>
              <div>Français · Anglais</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: COLORS.terracotta }}>Centres d'intérêt</div>
              <div>Jeux vidéo · Musique · Films & séries · IA & technologies</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ margin: "96px 0 0", background: COLORS.ink, color: COLORS.sand, padding: "80px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracottaLight }}>Compétences</div>
          {skills.map((s, i) => (
            <SkillBar key={s.t} s={s} delay={i * 0.06} />
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracottaLight }}>Logiciels</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(239,233,223,.15)", border: "1px solid rgba(239,233,223,.15)" }}>
            {softwares.map((s, i) => (
              <div
                key={s.n}
                style={{
                  background: COLORS.ink,
                  padding: "16px 14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  gridColumn: i === softwares.length - 1 && softwares.length % 2 !== 0 ? "1 / -1" : "auto",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <SoftwareLogo software={s} size={26} />
                  </div>
                  <div style={{ fontFamily: FONTS.display, fontSize: 12, fontWeight: 500 }}>{s.n}</div>
                </div>
                <div style={{ fontSize: 11, color: COLORS.text3, lineHeight: 1.5 }}>{s.u}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: COLORS.text3, borderTop: "1px solid rgba(239,233,223,.15)", paddingTop: 14 }}>
            <div>Bureautique</div>
            <div style={{ color: COLORS.text5 }}>Word · Excel · PowerPoint</div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
        {VISION_COLS.map((v, i) => (
          <div key={v.label} style={{ padding: "48px 28px", display: "flex", flexDirection: "column", gap: 12, borderRight: i < 2 ? `1px solid ${COLORS.taupe}` : "none" }}>
            <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracotta }}>{v.label}</div>
            <div style={{ fontSize: 17, lineHeight: 1.45, fontWeight: 300 }}>{v.text}</div>
          </div>
        ))}
      </div>

      <div style={{ height: 380, background: COLORS.taupe, overflow: "hidden" }}>
        <img src="/img/vision-apropos.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      <Footer />
    </div>
  );
}

export default function About() {
  const { rows: skills } = useSkills();
  const { rows: softwares } = useSoftwares();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  if (isMobile) return <AboutMobile skills={skills} softwares={softwares} />;
  if (isTablet) return <AboutTablet skills={skills} softwares={softwares} />;

  return (
    <div style={{ background: COLORS.sand }}>
      <Header variant="light" />

      <div style={{ padding: "64px 64px 0", display: "grid", gridTemplateColumns: "560px 1fr", gap: 96 }}>
        <div style={{ position: "relative" }}>
          <div style={{ height: 720, background: COLORS.taupe, overflow: "hidden" }}>
            <img src="/img/portrait-bennett.jpg" alt="Bennett David Medehou" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(20%)" }} />
          </div>
          <div style={{ position: "absolute", right: -32, bottom: 48, background: COLORS.terracotta, color: COLORS.sand, padding: "24px 28px", display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ fontFamily: FONTS.display, fontSize: 22, fontWeight: 500 }}>Bennett D. Medehou</div>
            <div style={{ fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase" }}>Dessinateur projeteur · Génie civil</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 44, paddingTop: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracotta }}>À propos</div>
            <h1 style={{ margin: 0, fontSize: 64, fontWeight: 300, lineHeight: 1.02, letterSpacing: "-.035em" }}>
              Entre <span style={{ fontWeight: 600 }}>conception</span> et <span style={{ fontWeight: 600 }}>rigueur technique.</span>
            </h1>
          </div>
          <div style={{ fontSize: 17, lineHeight: 1.75, color: COLORS.text1, display: "flex", flexDirection: "column", gap: 20, maxWidth: 600 }}>
            <div>
              Diplômé en Génie Civil et exerçant en tant que dessinateur projeteur bâtiment, je vois chaque projet comme
              l'alliance entre technicité, créativité et sens du détail. Pour moi, concevoir ne consiste pas seulement à
              dessiner, mais à donner vie à des espaces fonctionnels, durables et adaptés aux besoins réels.
            </div>
            <div>
              Curieux, rigoureux et passionné par l'univers du bâtiment, j'aime relever de nouveaux défis, approfondir mes
              compétences et perfectionner mes méthodes de travail. Mon objectif est de proposer des conceptions précises,
              harmonieuses et en accord avec les exigences techniques, esthétiques et contemporaines.
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, borderTop: `1px solid ${COLORS.ink}`, paddingTop: 32 }}>
            {[
              ["6", "projets conçus"],
              ["4", "agences & bureaux d'études"],
              ["8", "logiciels maîtrisés"],
            ].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: FONTS.display, fontSize: 36, fontWeight: 500, color: COLORS.terracotta }}>{n}</div>
                <div style={{ fontSize: 13, color: COLORS.text1 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, fontSize: 14, color: COLORS.text1 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: COLORS.terracotta }}>Langues</div>
              <div>Français · Anglais</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: COLORS.terracotta }}>Centres d'intérêt</div>
              <div>Jeux vidéo · Musique · Films & séries · IA & technologies</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ margin: "128px 0 0", background: COLORS.ink, color: COLORS.sand, padding: "104px 64px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 96 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div style={{ fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracottaLight }}>Compétences</div>
          {skills.map((s, i) => (
            <SkillBar key={s.t} s={s} delay={i * 0.06} />
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div style={{ fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracottaLight }}>Logiciels</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(239,233,223,.15)", border: "1px solid rgba(239,233,223,.15)" }}>
            {softwares.map((s, i) => (
              <div
                key={s.n}
                style={{
                  background: COLORS.ink,
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 24,
                  minHeight: 132,
                  gridColumn: i === softwares.length - 1 && softwares.length % 2 !== 0 ? "1 / -1" : "auto",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <SoftwareLogo software={s} />
                  </div>
                  <div style={{ fontFamily: FONTS.display, fontSize: 16, fontWeight: 500 }}>{s.n}</div>
                </div>
                <div style={{ fontSize: 12, color: COLORS.text3 }}>{s.u}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: COLORS.text3, borderTop: "1px solid rgba(239,233,223,.15)", paddingTop: 16 }}>
            <div>Bureautique</div>
            <div style={{ color: COLORS.text5 }}>Word · Excel · PowerPoint</div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
        {VISION_COLS.map((v, i) => (
          <div key={v.label} style={{ padding: "80px 56px", display: "flex", flexDirection: "column", gap: 16, borderRight: i < 2 ? `1px solid ${COLORS.taupe}` : "none" }}>
            <div style={{ fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracotta }}>{v.label}</div>
            <div style={{ fontSize: 22, lineHeight: 1.45, fontWeight: 300 }}>{v.text}</div>
          </div>
        ))}
      </div>

      <div style={{ height: 520, background: COLORS.taupe, overflow: "hidden" }}>
        <img src="/img/vision-apropos.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      <Footer />
    </div>
  );
}
