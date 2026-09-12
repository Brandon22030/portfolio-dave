import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { COLORS } from "../theme";
import { useArticles } from "../hooks/resources";
import { useIsMobile, useIsTablet } from "../hooks/useIsMobile";

function ArticleMobile({ article }) {
  return (
    <div style={{ background: COLORS.sand }}>
      <Header variant="light" />

      <div style={{ padding: "24px 20px 0" }}>
        <Link to="/journal" style={{ fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: COLORS.terracotta }}>
          ← Journal
        </Link>
        <div style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", margin: "20px 0 14px" }}>
          <span style={{ color: COLORS.terracotta }}>{article.category}</span>
          <span style={{ color: COLORS.text3, textTransform: "none", letterSpacing: 0 }}>{article.date}</span>
        </div>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 300, lineHeight: 1.15, letterSpacing: "-.025em" }}>{article.title}</h1>
      </div>

      <div style={{ margin: "32px 0 0", aspectRatio: "4/3", overflow: "hidden" }}>
        <img src={article.cover_image_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      <div style={{ padding: "40px 20px 72px", fontSize: 16, lineHeight: 1.75, color: COLORS.text1 }}>
        <p style={{ margin: 0 }}>{article.content}</p>
      </div>

      <Footer />
    </div>
  );
}

function ArticleTablet({ article }) {
  return (
    <div style={{ background: COLORS.sand }}>
      <Header variant="light" />

      <div style={{ padding: "88px 40px 0" }}>
        <Link to="/journal" style={{ fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: COLORS.terracotta }}>
          ← Journal
        </Link>
        <div style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", margin: "22px 0 14px" }}>
          <span style={{ color: COLORS.terracotta }}>{article.category}</span>
          <span style={{ color: COLORS.text3, textTransform: "none", letterSpacing: 0 }}>{article.date}</span>
        </div>
        <h1 style={{ margin: 0, fontSize: 40, fontWeight: 300, lineHeight: 1.14, letterSpacing: "-.025em" }}>{article.title}</h1>
      </div>

      <div style={{ margin: "40px 40px 0", height: 400, overflow: "hidden" }}>
        <img src={article.cover_image_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      <div style={{ padding: "56px 40px 96px", fontSize: 16, lineHeight: 1.78, color: COLORS.text1 }}>
        <p>{article.content}</p>
      </div>

      <Footer />
    </div>
  );
}

export default function Article() {
  const { slug } = useParams();
  const { rows: articles, loading } = useArticles();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const article = articles.find((a) => a.slug === slug);

  if (loading) return <div style={{ background: COLORS.sand, minHeight: "100vh" }} />;

  if (!article) {
    return (
      <div style={{ background: COLORS.sand, minHeight: "100vh" }}>
        <Header variant="light" />
        <div style={{ padding: "6rem 64px", textAlign: "center", color: COLORS.text2 }}>
          <p>Cet article est introuvable.</p>
          <Link to="/journal" style={{ color: COLORS.terracotta }}>
            Retour au journal
          </Link>
        </div>
      </div>
    );
  }

  if (isMobile) return <ArticleMobile article={article} />;
  if (isTablet) return <ArticleTablet article={article} />;

  return (
    <div style={{ background: COLORS.sand }}>
      <Header variant="light" />

      <div style={{ padding: "64px 64px 0", maxWidth: 820, margin: "0 auto" }}>
        <Link to="/journal" style={{ fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: COLORS.terracotta }}>
          ← Journal
        </Link>
        <div style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", margin: "24px 0 16px" }}>
          <span style={{ color: COLORS.terracotta }}>{article.category}</span>
          <span style={{ color: COLORS.text3, textTransform: "none", letterSpacing: 0 }}>{article.date}</span>
        </div>
        <h1 style={{ margin: 0, fontSize: 48, fontWeight: 300, lineHeight: 1.12, letterSpacing: "-.025em" }}>{article.title}</h1>
      </div>

      <div style={{ margin: "48px auto 0", maxWidth: 1000, height: 480, overflow: "hidden" }}>
        <img src={article.cover_image_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "64px 64px 128px", fontSize: 17, lineHeight: 1.8, color: COLORS.text1 }}>
        <p>{article.content}</p>
      </div>

      <Footer />
    </div>
  );
}
