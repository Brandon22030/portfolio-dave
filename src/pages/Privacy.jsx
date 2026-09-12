import LegalPage from "../components/LegalPage";

const BANNER = [
  { label: "En bref", text: "Seules les données du formulaire de contact sont collectées : nom, email, téléphone, type de projet et message." },
  { label: "Usage", text: "Elles servent uniquement à répondre à votre demande. Aucune revente, aucune newsletter sans accord explicite." },
  { label: "Vos droits", text: "Accès, rectification et suppression sur simple email à bennett.medehou6@gmail.com." },
];

const SECTIONS = [
  {
    id: "donnees",
    heading: "Données collectées",
    body: "Lorsque vous utilisez le formulaire de contact ou le bouton WhatsApp, nous recueillons les informations que vous saisissez : nom, adresse email, numéro de téléphone, type de projet et contenu du message. Aucune donnée n'est collectée à votre insu lors de la simple consultation du site.",
  },
  {
    id: "finalites",
    heading: "Finalités",
    body: "Ces données sont utilisées pour répondre à votre demande, établir un devis et, le cas échéant, assurer le suivi de votre projet. Elles ne sont ni vendues ni cédées à des tiers.",
  },
  {
    id: "conservation",
    heading: "Conservation",
    body: "Les messages sont conservés dans l'espace d'administration du site pendant 24 mois à compter du dernier échange, puis supprimés. Les données liées à un contrat sont conservées pendant la durée légale applicable.",
  },
  {
    id: "hebergement",
    heading: "Hébergement & sous-traitants",
    body: "Le site est hébergé par Vercel et les données sont stockées par Supabase (Union européenne). Ces prestataires agissent en qualité de sous-traitants et n'accèdent aux données que pour les besoins techniques du service.",
  },
  {
    id: "cookies",
    heading: "Cookies & mesure d'audience",
    body: "Le site n'utilise aucun cookie publicitaire. La mesure d'audience est réalisée avec un outil sans cookie ni identifiant personnel (Vercel Analytics). Aucun bandeau de consentement n'est donc nécessaire.",
  },
  {
    id: "droits",
    heading: "Vos droits",
    body: "Conformément à la loi n° 2017-20 portant code du numérique en République du Bénin, vous disposez d'un droit d'accès, de rectification, d'opposition et de suppression de vos données. Pour l'exercer, écrivez à bennett.medehou6@gmail.com. Vous pouvez également saisir l'Autorité de protection des données personnelles (APDP).",
  },
];

export default function Privacy() {
  return (
    <LegalPage
      eyebrow="Données personnelles"
      title="Politique de"
      titleAccent="confidentialité"
      updated="11 septembre 2026"
      banner={BANNER}
      sections={SECTIONS}
    />
  );
}
