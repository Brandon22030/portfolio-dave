import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { PageHeader, StatCard, StatusPill, PrimaryButton, OutlineButton, Card } from "./adminUI";
import { COLORS, FONTS } from "../theme";
import { useProjects, useArticles, useContacts, useMedia } from "../hooks/resources";

const TRAFFIC = [38, 52, 44, 70, 64, 58, 82, 76, 60, 90, 84, 96];
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

  const newContacts = contacts.filter((c) => c.status === "Nouveau").length;
  const publishedProjects = projects.filter((p) => p.status === "Publié").length;
  const draftProjects = projects.length - publishedProjects;
  const publishedArticles = articles.filter((a) => a.status === "Publié").length;
  const draftArticles = articles.length - publishedArticles;
  const today = new Date().toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const stats = [
    { label: "Visites (30 j)", value: "3 482", sub: "+18 % vs mois dernier", subColor: COLORS.successText },
    { label: "Demandes de contact", value: contacts.length, sub: `${newContacts} à traiter`, subColor: COLORS.terracotta },
    { label: "Projets publiés", value: publishedProjects, sub: `${draftProjects} brouillon`, subColor: COLORS.text3 },
    { label: "Articles", value: publishedArticles, sub: `${draftArticles} brouillon`, subColor: COLORS.text3 },
  ];

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
            <div style={{ fontSize: 12, color: COLORS.text3, marginBottom: 20 }}>Vercel Analytics</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 120 }}>
              {TRAFFIC.map((h, i) => (
                <div key={i} style={{ flex: 1, height: `${h}%`, background: COLORS.ink }} />
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
              <div key={c.name + c.received} style={{ display: "grid", gridTemplateColumns: "1fr 130px 70px 80px", alignItems: "center", padding: "12px 20px", borderBottom: `1px solid ${COLORS.adminHairline}`, fontSize: 13 }}>
                <div style={{ fontWeight: 500 }}>{c.name}</div>
                <div style={{ color: COLORS.text3 }}>{c.project_type}</div>
                <div style={{ color: COLORS.text3 }}>{c.received}</div>
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
            <div style={{ fontWeight: 500, marginBottom: 16 }}>Projets les plus vus</div>
            {projects.slice(0, 3).map((p) => (
              <div key={p.id || p.slug} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <img src={p.cover_image_url} alt="" style={{ width: 48, height: 36, objectFit: "cover" }} />
                <div>
                  <div style={{ fontWeight: 500, fontSize: 13 }}>{p.title}</div>
                  <div style={{ fontSize: 12, color: COLORS.text3 }}>{p.category}</div>
                </div>
              </div>
            ))}
          </Card>

          <Card>
            <div style={{ fontWeight: 500, marginBottom: 12 }}>Stockage médias</div>
            <div style={{ height: 6, background: "#eeebe5" }}>
              <div style={{ height: 6, width: "31%", background: COLORS.terracotta }} />
            </div>
            <div style={{ fontSize: 12, color: COLORS.text3, marginTop: 10 }}>312 Mo utilisés sur 1 Go · Supabase Storage</div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
