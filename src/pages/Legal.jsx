import LegalPage from "../components/LegalPage";
import { CONTACT_INFO } from "../data/defaults";

const SECTIONS = [
  {
    id: "editeur",
    heading: "Éditeur du site",
    body: "Le site smartarchi.bj est édité par Bennett David Medehou, architecte-concepteur exerçant à titre indépendant sous la marque Smart'Archi.",
    grid: [
      ["Adresse", CONTACT_INFO.city],
      ["Téléphone", CONTACT_INFO.phones],
      ["Email", CONTACT_INFO.email],
      ["IFU / RCCM", "À compléter"],
      ["Directeur de publication", "Bennett David Medehou"],
    ],
  },
  {
    id: "hebergement",
    heading: "Hébergement",
    body: "Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis. Les données (projets, articles, messages) sont stockées par Supabase Inc. sur des serveurs situés dans l'Union européenne.",
  },
  {
    id: "propriete",
    heading: "Propriété intellectuelle",
    body: "L'ensemble des contenus du site - plans, coupes, façades, rendus 3D, photographies, textes et logo Smart'Archi - est protégé par le droit d'auteur. Toute reproduction, diffusion ou utilisation, même partielle, sans autorisation écrite préalable est interdite. Les documents techniques présentés sont des extraits non contractuels.",
  },
  {
    id: "credits",
    heading: "Crédits",
    body: "Conception et design du site : Smart'Archi. Développement : Next.js et Supabase. Typographies : Sora et Unbounded (Google Fonts, licence OFL). Photographies de projets : Bennett David Medehou, sauf mention contraire.",
  },
  {
    id: "responsabilite",
    heading: "Responsabilité",
    body: "Les informations publiées sont fournies à titre indicatif et peuvent être modifiées sans préavis. L'éditeur ne saurait être tenu responsable des dommages liés à l'utilisation du site ou des liens externes qu'il contient.",
  },
  {
    id: "droit",
    heading: "Droit applicable",
    body: "Le présent site est soumis au droit béninois. Tout litige relatif à son utilisation relève de la compétence des tribunaux de Cotonou.",
  },
];

export default function Legal() {
  return (
    <LegalPage
      eyebrow="Informations légales"
      title="Mentions"
      titleAccent="légales"
      updated="11 septembre 2026"
      sections={SECTIONS}
    />
  );
}
