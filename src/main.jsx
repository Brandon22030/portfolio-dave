import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./global.css";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import About from "./pages/About";
import Career from "./pages/Career";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Services from "./pages/Services";
import Journal from "./pages/Journal";
import Article from "./pages/Article";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

import Auth from "./Auth";
import AdminDashboard from "./admin/AdminDashboard";
import AdminProjects from "./admin/AdminProjects";
import AdminSoftwares from "./admin/AdminSoftwares";
import AdminMedia from "./admin/AdminMedia";
import AdminArticles from "./admin/AdminArticles";
import AdminContacts from "./admin/AdminContacts";
import AdminSeo from "./admin/AdminSeo";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/parcours" element={<Career />} />
        <Route path="/projets" element={<Projects />} />
        <Route path="/projets/:slug" element={<ProjectDetail />} />
        <Route path="/services" element={<Services />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/journal/:slug" element={<Article />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mentions-legales" element={<Legal />} />
        <Route path="/confidentialite" element={<Privacy />} />

        <Route path="/dashboard" element={<Auth><AdminDashboard /></Auth>} />
        <Route path="/dashboard/projets" element={<Auth><AdminProjects /></Auth>} />
        <Route path="/dashboard/logiciels" element={<Auth><AdminSoftwares /></Auth>} />
        <Route path="/dashboard/medias" element={<Auth><AdminMedia /></Auth>} />
        <Route path="/dashboard/articles" element={<Auth><AdminArticles /></Auth>} />
        <Route path="/dashboard/contacts" element={<Auth><AdminContacts /></Auth>} />
        <Route path="/dashboard/seo" element={<Auth><AdminSeo /></Auth>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
