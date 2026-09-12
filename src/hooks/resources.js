import { useTable } from "./useTable";
import {
  PROJECTS,
  SERVICES,
  TIMELINE,
  SKILLS,
  SOFTWARES,
  ARTICLES,
  CONTACTS,
  SEO_PAGES,
} from "../data/defaults";

export const useProjects = () => useTable("projects", PROJECTS, "order_index");
export const useServicesData = () => useTable("services", SERVICES, "order_index");
export const useTimeline = () => useTable("timeline_entries", TIMELINE, "order_index");
export const useSkills = () => useTable("skills", SKILLS, "order_index");
export const useSoftwares = () => useTable("softwares", SOFTWARES, "order_index");
export const useArticles = () => useTable("articles", ARTICLES, "order_index");
export const useContacts = () => useTable("contacts", CONTACTS, "created_at", false);
export const useSeoPages = () => useTable("seo_pages", SEO_PAGES, "page_key");
export const useMedia = () => useTable("media", [], "created_at", false);
