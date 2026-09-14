import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { COLORS } from "../theme";
import { useArticles } from "../hooks/resources";
import { useIsMobile, useIsTablet } from "../hooks/useIsMobile";

function splitFeaturedTitle(title) {
  const i = title.lastIndexOf(" : ");
  if (i === -1) return { lead: "", bold: title };
  return { lead: title.slice(0, i + 2), bold: title.slice(i + 2) };
}

function JournalMobile({ featured, rest, lead, bold }) {
  return (
    <div style={{ background: COLORS.sand }}>
      <Header variant="light" />

      <div style={{ padding: "24px 20px 0", display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracotta }}>Journal</div>
        <h1 style={{ margin: 0, fontSize: 40, fontWeight: 300, lineHeight: 1.02, letterSpacing: "-.035em" }}>
          Notes d'atelier <span style={{ fontWeight: 600 }}>& de chantier</span>
        </h1>
        <div style={{ fontSize: 15, lineHeight: 1.7, color: COLORS.text1 }}>
          Architecture, chantier, retours d'expérience et processus de conception. Un article par mois.
        </div>
      </div>

      {featured && (
        <Link to={`/journal/${featured.slug}`} className="link-card" style={{ margin: "40px 20px 0", display: "flex", flexDirection: "column", background: COLORS.ink, color: COLORS.sand }}>
          <div style={{ aspectRatio: "4/3", background: COLORS.taupe, overflow: "hidden" }}>
            <img src={featured.cover_image_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ padding: "28px 24px", display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase" }}>
              <div style={{ color: COLORS.terracottaLight }}>À la une · {featured.category}</div>
              <div style={{ color: COLORS.text3 }}>{featured.date}</div>
            </div>
            <h2 className="link-card-title" style={{ margin: 0, fontSize: 26, fontWeight: 300, lineHeight: 1.15, letterSpacing: "-.025em" }}>
              {lead}
              <span style={{ fontWeight: 600 }}>{bold}</span>
            </h2>
            <div style={{ fontSize: 14, lineHeight: 1.7, color: COLORS.text4 }}>{featured.excerpt}</div>
            <div style={{ fontSize: 13, letterSpacing: ".06em", borderBottom: `2px solid ${COLORS.terracottaLight}`, paddingBottom: 4, alignSelf: "flex-start" }}>
              Lire l'article →
            </div>
          </div>
        </Link>
      )}

      <div style={{ padding: "48px 20px 72px", display: "flex", flexDirection: "column", gap: 40 }}>
        {rest.map((a, i) => (
          <Reveal key={a.slug} as={Link} className="link-card" delay={(i % 3) * 0.08} to={`/journal/${a.slug}`} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ aspectRatio: "4/3", overflow: "hidden" }}>
              <img src={a.cover_image_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase" }}>
              <span style={{ color: COLORS.terracotta }}>{a.category}</span>
              <span style={{ color: COLORS.text2 }}>{a.date}</span>
            </div>
            <div className="link-card-title" style={{ fontSize: 21, fontWeight: 500, lineHeight: 1.25, letterSpacing: "-.015em" }}>{a.title}</div>
            <div style={{ fontSize: 14, lineHeight: 1.65, color: COLORS.text1 }}>{a.excerpt}</div>
          </Reveal>
        ))}
      </div>

      <Footer />
    </div>
  );
}

function JournalTablet({ featured, rest, lead, bold }) {
  return (
    <div style={{ background: COLORS.sand }}>
      <Header variant="light" />

      <div style={{ padding: "88px 40px 0", display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracotta }}>Journal</div>
        <h1 style={{ margin: 0, fontSize: 48, fontWeight: 300, lineHeight: 1.02, letterSpacing: "-.035em" }}>
          Notes d'atelier <span style={{ fontWeight: 600 }}>& de chantier</span>
        </h1>
        <div style={{ fontSize: 15, lineHeight: 1.7, color: COLORS.text1, maxWidth: 500 }}>
          Architecture, chantier, retours d'expérience et processus de conception. Un article par mois.
        </div>
      </div>

      {featured && (
        <Link to={`/journal/${featured.slug}`} className="link-card" style={{ margin: "56px 40px 0", display: "flex", flexDirection: "column", background: COLORS.ink, color: COLORS.sand }}>
          <div style={{ height: 340, overflow: "hidden" }}>
            <img src={featured.cover_image_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ padding: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase" }}>
                <span style={{ color: COLORS.terracottaLight }}>À la une · {featured.category}</span>
                <span style={{ color: COLORS.text3, textTransform: "none", letterSpacing: 0 }}>{featured.date}</span>
              </div>
              <h2 className="link-card-title" style={{ margin: 0, fontSize: 32, fontWeight: 300, lineHeight: 1.12, letterSpacing: "-.025em" }}>
                {lead}
                <span style={{ fontWeight: 600 }}>{bold}</span>
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 20 }}>
              <div style={{ fontSize: 14, lineHeight: 1.7, color: COLORS.text4 }}>{featured.excerpt}</div>
              <span style={{ fontSize: 13, borderBottom: `2px solid ${COLORS.terracottaLight}`, alignSelf: "flex-start" }}>Lire l'article →</span>
            </div>
          </div>
        </Link>
      )}

      <div style={{ padding: "56px 40px 96px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
        {rest.map((a, i) => (
          <Reveal key={a.slug} as={Link} className="link-card" delay={(i % 3) * 0.1} to={`/journal/${a.slug}`} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ aspectRatio: "4/3", overflow: "hidden" }}>
              <img src={a.cover_image_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase" }}>
              <span style={{ color: COLORS.terracotta }}>{a.category}</span>
              <span style={{ color: COLORS.text2, textTransform: "none", letterSpacing: 0 }}>{a.date}</span>
            </div>
            <div className="link-card-title" style={{ fontSize: 19, fontWeight: 500, lineHeight: 1.25, letterSpacing: "-.015em" }}>{a.title}</div>
            <div style={{ fontSize: 13, lineHeight: 1.65, color: COLORS.text1 }}>{a.excerpt}</div>
          </Reveal>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default function Journal() {
  const { rows: articles } = useArticles();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const featured = articles.find((a) => a.featured) || articles[0];
  const rest = articles.filter((a) => a !== featured && a.status === "Publié");
  const { lead, bold } = splitFeaturedTitle(featured?.title || "");

  if (isMobile) return <JournalMobile featured={featured} rest={rest} lead={lead} bold={bold} />;
  if (isTablet) return <JournalTablet featured={featured} rest={rest} lead={lead} bold={bold} />;

  return (
    <div style={{ background: COLORS.sand }}>
      <Header variant="light" />

      <div style={{ padding: "64px 64px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "end" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracotta }}>Journal</div>
          <h1 style={{ margin: 0, fontSize: 64, fontWeight: 300, lineHeight: 1.02, letterSpacing: "-.035em" }}>
            Notes d'atelier <span style={{ fontWeight: 600 }}>& de chantier</span>
          </h1>
        </div>
        <div style={{ fontSize: 16, lineHeight: 1.7, color: COLORS.text1, maxWidth: 440, justifySelf: "end" }}>
          Architecture, chantier, retours d'expérience et processus de conception. Un article par mois.
        </div>
      </div>

      {featured && (
        <Link
          to={`/journal/${featured.slug}`}
          className="link-card"
          style={{ margin: "64px 64px 0", display: "grid", gridTemplateColumns: "1.3fr 1fr", background: COLORS.ink, color: COLORS.sand }}
        >
          <div style={{ height: 560, overflow: "hidden" }}>
            <img src={featured.cover_image_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ padding: 64, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase" }}>
              <span style={{ color: COLORS.terracottaLight }}>À la une · {featured.category}</span>
              <span style={{ color: COLORS.text3, textTransform: "none", letterSpacing: 0 }}>{featured.date}</span>
            </div>
            <h2 className="link-card-title" style={{ margin: 0, fontSize: 40, fontWeight: 300, lineHeight: 1.12, letterSpacing: "-.025em" }}>
              {lead}
              <span style={{ fontWeight: 600 }}>{bold}</span>
            </h2>
            <div style={{ fontSize: 15, lineHeight: 1.7, color: COLORS.text4 }}>{featured.excerpt}</div>
            <span style={{ fontSize: 13, borderBottom: `2px solid ${COLORS.terracottaLight}`, alignSelf: "flex-start" }}>Lire l'article →</span>
          </div>
        </Link>
      )}

      <div style={{ padding: "64px 64px 128px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32 }}>
        {rest.map((a, i) => (
          <Reveal key={a.slug} as={Link} className="link-card" delay={(i % 3) * 0.1} to={`/journal/${a.slug}`} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ aspectRatio: "4/3", overflow: "hidden" }}>
              <img src={a.cover_image_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase" }}>
              <span style={{ color: COLORS.terracotta }}>{a.category}</span>
              <span style={{ color: COLORS.text2, textTransform: "none", letterSpacing: 0 }}>{a.date}</span>
            </div>
            <div className="link-card-title" style={{ fontSize: 24, fontWeight: 500, lineHeight: 1.25, letterSpacing: "-.015em" }}>{a.title}</div>
            <div style={{ fontSize: 14, lineHeight: 1.65, color: COLORS.text1 }}>{a.excerpt}</div>
          </Reveal>
        ))}
      </div>

      <Footer />
    </div>
  );
}
