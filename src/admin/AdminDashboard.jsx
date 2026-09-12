import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { PageHeader, StatCard, StatusPill, PrimaryButton, OutlineButton, Card, contactDate } from "./adminUI";
import { COLORS, FONTS } from "../theme";
import { useProjects, useArticles, useContacts, useMedia } from "../hooks/resources";
import { usePageViewStats } from "../hooks/usePageViews";

const QUICK_ACTIONS = [
  { label: "Ajouter un projet", to: "/dashboard/projets" },
  { label: "Importer des médias", to: "/dashboard/medias" },
  { label: "Rédiger un article", to: "/dashboard/articles" },
  { label: "Vérifier le SEO", to: "/dashboard/seo" },
];

export default function AdminDashboard() {
  const { rows: projects } = useProjects();
  const { rows: articles } = useArticles();
  const { rows: contacts } = useContacts();
  const { rows: media } = useMedia();
  const viewStats = usePageViewStats();

  const newContacts = contacts.filter((c) => c.status === "Nouveau").length;
  const publishedProjects = projects.filter((p) => p.status === "Publié").length;
  const draftProjects = projects.length - publishedProjects;
  const publishedArticles = articles.filter((a) => a.status === "Publié").length;
  const draftArticles = articles.length - publishedArticles;
  const today = new Date().toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const storageBytes = media.reduce((sum, m) => sum + (m.size_bytes || 0), 0);
  const storageMb = storageBytes / (1024 * 1024);
  const storageQuotaMb = 1024;
  const storagePct = Math.min(100, (storageMb / storageQuotaMb) * 100);

  const visitsSub =
    viewStats.trendPct === null
      ? "Pas encore assez de recul"
      : `${viewStats.trendPct >= 0 ? "+" : ""}${viewStats.trendPct} % vs mois dernier`;

  const stats = [
    {
      label: "Visites (30 j)",
      value: viewStats.total30.toLocaleString("fr-FR"),
      sub: visitsSub,
      subColor: viewStats.trendPct === null ? COLORS.text3 : viewStats.trendPct >= 0 ? COLORS.successText : COLORS.terracotta,
    },
    { label: "Demandes de contact", value: contacts.length, sub: `${newContacts} à traiter`, subColor: COLORS.terracotta },
    { label: "Projets publiés", value: publishedProjects, sub: `${draftProjects} brouillon`, subColor: COLORS.text3 },
    { label: "Articles", value: publishedArticles, sub: `${draftArticles} brouillon`, subColor: COLORS.text3 },
  ];

  const maxWeekly = Math.max(1, ...viewStats.weekly);
  const topProjects = viewStats.topProjectSlugs
    .map(({ slug, count }) => ({ ...projects.find((p) => p.slug === slug), count }))
    .filter((p) => p.slug);
  const projectsCardList = topProjects.length ? topProjects : projects.slice(0, 3);

  return (
    <AdminLayout active="Tableau de bord" counts={{ Projets: projects.length, Contacts: newContacts }}>
      <PageHeader
        title="Bonjour Bennett"
        subtitle={`${today.charAt(0).toUpperCase()}${today.slice(1)} · ${newContacts} nouveaux messages`}
        actions={
          <>
            <OutlineButton as="a" href="/" target="_blank" rel="noreferrer">
              Voir le site ↗
            </OutlineButton>
            <PrimaryButton as={Link} to="/dashboard/projets">
              + Nouveau projet
            </PrimaryButton>
          </>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1fr)", gap: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <Card>
            <div style={{ fontWeight: 500, marginBottom: 4 }}>Visites - 12 dernières semaines</div>
            <div style={{ fontSize: 12, color: COLORS.text3, marginBottom: 20 }}>
              {viewStats.weekly.every((w) => w === 0) ? "Pas encore de données" : "Suivi interne · page_views"}
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 120 }}>
              {viewStats.weekly.map((h, i) => (
                <div key={i} style={{ flex: 1, height: `${Math.max(2, (h / maxWeekly) * 100)}%`, background: COLORS.ink }} />
              ))}
            </div>
          </Card>

          <Card style={{ padding: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: `1px solid ${COLORS.adminHairline}` }}>
              <div style={{ fontWeight: 500 }}>Derniers messages</div>
              <Link to="/dashboard/contacts" style={{ color: COLORS.terracotta, fontSize: 13 }}>
                Tous les contacts →
              </Link>
            </div>
            {contacts.slice(0, 5).map((c) => (
              <div key={c.id} style={{ display: "grid", gridTemplateColumns: "1fr 130px 70px 80px", alignItems: "center", padding: "12px 20px", borderBottom: `1px solid ${COLORS.adminHairline}`, fontSize: 13 }}>
                <div style={{ fontWeight: 500 }}>{c.name}</div>
                <div style={{ color: COLORS.text3 }}>{c.project_type}</div>
                <div style={{ color: COLORS.text3 }}>{contactDate(c)}</div>
                <StatusPill status={c.status} />
              </div>
            ))}
          </Card>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ background: COLORS.ink, color: COLORS.sand, padding: 24 }}>
            <div style={{ fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: COLORS.terracottaLight, marginBottom: 12 }}>Actions rapides</div>
            {QUICK_ACTIONS.map((a, i) => (
              <Link
                key={a.label}
                to={a.to}
                style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: i < 3 ? "1px solid rgba(239,233,223,.15)" : "none" }}
              >
                <span>{a.label}</span>
                <span>→</span>
              </Link>
            ))}
          </div>

          <Card>
            <div style={{ fontWeight: 500, marginBottom: 16 }}>{topProjects.length ? "Projets les plus vus" : "Derniers projets"}</div>
            {projectsCardList.map((p) => (
              <div key={p.id || p.slug} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <img src={p.cover_image_url} alt="" style={{ width: 48, height: 36, objectFit: "cover" }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, fontSize: 13 }}>{p.title}</div>
                  <div style={{ fontSize: 12, color: COLORS.text3 }}>{p.category}</div>
                </div>
                {p.count !== undefined && <div style={{ fontSize: 12, color: COLORS.text3 }}>{p.count} vues</div>}
              </div>
            ))}
          </Card>

          <Card>
            <div style={{ fontWeight: 500, marginBottom: 12 }}>Stockage médias</div>
            <div style={{ height: 6, background: "#eeebe5" }}>
              <div style={{ height: 6, width: `${storagePct}%`, background: COLORS.terracotta }} />
            </div>
            <div style={{ fontSize: 12, color: COLORS.text3, marginTop: 10 }}>
              {storageMb.toFixed(1)} Mo utilisés sur 1 Go · {media.length} fichier{media.length > 1 ? "s" : ""}
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
