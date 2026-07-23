import { useEffect, useState, useCallback } from "react";
import { supabase } from "./supabaseClient";

const DEFAULT_SETTINGS = {
  hero_subtitle: "ARCHITECTE · TECHNICIEN BIM · COTONOU, BÉNIN",
  hero_title: "Des espaces pensés.|<span>Des projets réalisés.</span>",
  hero_description: "Du plan 2D au rendu photoréaliste — je transforme vos idées en projets architecturaux clairs, beaux et construits.",
  about_label: "À PROPOS",
  about_title: "L'architecte qui <span>décode</span> les maisons",
  about_text1: "Basé à Cotonou, je suis Dessinateur Projeteur Bâtiment et Technicien en Génie Civil, passionné par l'architecture africaine contemporaine.",
  about_text2: "Mon objectif : rendre l'architecture accessible, lisible et concrète — des villas résidentielles aux complexes hôteliers, chaque projet raconte une histoire.",
  services_label: "SERVICES",
  services_title: "Ce que je propose",
  projects_label: "RÉALISATIONS",
  projects_title: "Mes projets",
  contact_label: "CONTACT",
  contact_title: "Parlons de votre projet",
  contact_description: "Un projet en tête ? Une question ? Envoyez-moi un message, je reviens rapidement.",
};

const DEFAULT_SERVICES = [
  { icon: "📐", title: "Plans 2D", description: "Reproduction et conception de plans d'architecture conformes aux normes : façades, coupes, plans de masse.", order_index: 1 },
  { icon: "🏗️", title: "Modélisation 3D", description: "Maquettes numériques BIM sur Archicad — villas, hôtels, halls d'événements.", order_index: 2 },
  { icon: "✨", title: "Rendu photoréaliste", description: "Visualisations haute qualité avec Twinmotion et Artlantis pour présenter votre projet comme bâti.", order_index: 3 },
  { icon: "📋", title: "Suivi de chantier", description: "Rapports techniques, documentation de chantier et contrôle de conformité des ouvrages.", order_index: 4 },
];

const DEFAULT_PROJECTS = [
  { title: "Résidence Individuelle R+1", type: "Villa résidentielle", year: "2024", color: "#2A1F1A", order_index: 1 },
  { title: "Complexe Sécurité Défense", type: "Bâtiment institutionnel", year: "2024", color: "#1A2420", order_index: 2 },
  { title: "Hotel Dayalor", type: "Hôtellerie & tourisme", year: "2023", color: "#1F1A2A", order_index: 3 },
  { title: "Hall de Réception", type: "Salle d'événements", year: "2023", color: "#1A2020", order_index: 4 },
  { title: "Villa Contemporaine", type: "Résidence privée", year: "2023", color: "#2A1A1A", order_index: 5 },
  { title: "Immeuble R+3", type: "Habitat collectif", year: "2022", color: "#1A1F2A", order_index: 6 },
];

function toSettingsObject(rows) {
  const obj = { ...DEFAULT_SETTINGS };
  for (const row of rows) obj[row.key] = row.value;
  return obj;
}

export function useSiteData() {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [pRes, sRes, stRes] = await Promise.all([
        supabase.from("projects").select("*").order("order_index", { ascending: true }),
        supabase.from("services").select("*").order("order_index", { ascending: true }),
        supabase.from("settings").select("*"),
      ]);

      if (pRes.error) throw pRes.error;
      if (sRes.error) throw sRes.error;
      if (stRes.error) throw stRes.error;

      if (pRes.data?.length) setProjects(pRes.data);
      if (sRes.data?.length) setServices(sRes.data);
      if (stRes.data?.length) setSettings(toSettingsObject(stRes.data));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();

    const channels = [
      supabase.channel("projects-changes").on(
        "postgres_changes",
        { event: "*", schema: "public", table: "projects" },
        () => refresh()
      ),
      supabase.channel("services-changes").on(
        "postgres_changes",
        { event: "*", schema: "public", table: "services" },
        () => refresh()
      ),
      supabase.channel("settings-changes").on(
        "postgres_changes",
        { event: "*", schema: "public", table: "settings" },
        () => refresh()
      ),
    ];
    channels.forEach((c) => c.subscribe());
    return () => channels.forEach((c) => supabase.removeChannel(c));
  }, [refresh]);

  async function upsertSetting(key, value) {
    const { error } = await supabase.from("settings").upsert({ key, value }, { onConflict: "key" });
    if (error) throw error;
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  async function addProject(project) {
    const { data, error } = await supabase.from("projects").insert(project).select().single();
    if (error) throw error;
    setProjects((prev) => [...prev, data].sort((a, b) => a.order_index - b.order_index));
    return data;
  }

  async function updateProject(id, updates) {
    const { data, error } = await supabase.from("projects").update(updates).eq("id", id).select().single();
    if (error) throw error;
    setProjects((prev) => prev.map((p) => (p.id === id ? data : p)).sort((a, b) => a.order_index - b.order_index));
    return data;
  }

  async function deleteProject(id) {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) throw error;
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  async function addService(service) {
    const { data, error } = await supabase.from("services").insert(service).select().single();
    if (error) throw error;
    setServices((prev) => [...prev, data].sort((a, b) => a.order_index - b.order_index));
    return data;
  }

  async function updateService(id, updates) {
    const { data, error } = await supabase.from("services").update(updates).eq("id", id).select().single();
    if (error) throw error;
    setServices((prev) => prev.map((s) => (s.id === id ? data : s)).sort((a, b) => a.order_index - b.order_index));
    return data;
  }

  async function deleteService(id) {
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) throw error;
    setServices((prev) => prev.filter((s) => s.id !== id));
  }

  return {
    projects,
    services,
    settings,
    loading,
    error,
    refresh,
    upsertSetting,
    addProject,
    updateProject,
    deleteProject,
    addService,
    updateService,
    deleteService,
  };
}
