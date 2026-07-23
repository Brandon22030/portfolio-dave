import { useState } from "react";

const TC = "#C1673A";
const TCL = "#e8845a";
const DARK = "#141210";
const OFFWHITE = "#F5F2EE";
const MUTED = "#888076";

const NAV_LINKS = ["À propos","Services","Projets","Contact"];

const SERVICES = [
  { icon: "📐", title: "Plans 2D", desc: "Reproduction et conception de plans d'architecture conformes aux normes : façades, coupes, plans de masse." },
  { icon: "🏗️", title: "Modélisation 3D", desc: "Maquettes numériques BIM sur Archicad — villas, hôtels, halls d'événements." },
  { icon: "✨", title: "Rendu photoréaliste", desc: "Visualisations haute qualité avec Twinmotion et Artlantis pour présenter votre projet comme bâti." },
  { icon: "📋", title: "Suivi de chantier", desc: "Rapports techniques, documentation de chantier et contrôle de conformité des ouvrages." },
];

const PROJECTS = [
  { title: "Résidence Individuelle R+1", type: "Villa résidentielle", year: "2024", color: "#2A1F1A" },
  { title: "Complexe Sécurité Défense", type: "Bâtiment institutionnel", year: "2024", color: "#1A2420" },
  { title: "Hotel Dayalor", type: "Hôtellerie & tourisme", year: "2023", color: "#1F1A2A" },
  { title: "Hall de Réception", type: "Salle d'événements", year: "2023", color: "#1A2020" },
  { title: "Villa Contemporaine", type: "Résidence privée", year: "2023", color: "#2A1A1A" },
  { title: "Immeuble R+3", type: "Habitat collectif", year: "2022", color: "#1A1F2A" },
];

const SKILLS = ["Archicad","Twinmotion","Artlantis","Enscape","SketchUp","AutoCAD","BIM"];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name:"", email:"", message:"" });
  const [sent, setSent] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
    setMenuOpen(false);
  };

  const handleSend = () => {
    if (formData.name && formData.message) { setSent(true); }
  };

  return (
    <div style={{ fontFamily:"'Segoe UI',sans-serif", background:DARK, color:OFFWHITE, lineHeight:1.7 }}>

      {/* NAV */}
      <nav style={{ position:"sticky", top:0, zIndex:100, background:`${DARK}ee`, backdropFilter:"blur(12px)", borderBottom:`1px solid #ffffff18`, padding:"0 2rem", display:"flex", alignItems:"center", justifyContent:"space-between", height:60 }}>
        <span onClick={() => scrollTo("hero")} style={{ cursor:"pointer", fontWeight:700, fontSize:18, letterSpacing:2, color:TC }}>PLANIFY<span style={{color:OFFWHITE}}>BJ</span></span>
        <div style={{ display:"flex", gap:"2rem" }}>
          {NAV_LINKS.map(l => (
            <span key={l} onClick={() => scrollTo(l.toLowerCase().replace("à","a").replace(" ",""))} style={{ cursor:"pointer", fontSize:13, letterSpacing:1, color:MUTED, transition:"color .2s" }}
              onMouseEnter={e=>e.target.style.color=TC} onMouseLeave={e=>e.target.style.color=MUTED}>
              {l.toUpperCase()}
            </span>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" style={{ minHeight:"92vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"4rem 2rem", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse 60% 50% at 50% 60%, ${TC}22 0%, transparent 70%)`, pointerEvents:"none" }} />
        <p style={{ fontSize:12, letterSpacing:4, color:TC, marginBottom:"1rem", fontWeight:500 }}>ARCHITECTE · TECHNICIEN BIM · COTONOU, BÉNIN</p>
        <h1 style={{ fontSize:"clamp(2.8rem,7vw,5rem)", fontWeight:700, lineHeight:1.1, margin:"0 0 1.5rem", maxWidth:700 }}>
          Des espaces pensés.<br />
          <span style={{ color:TC }}>Des projets réalisés.</span>
        </h1>
        <p style={{ fontSize:17, color:MUTED, maxWidth:520, marginBottom:"2.5rem" }}>
          Du plan 2D au rendu photoréaliste — je transforme vos idées en projets architecturaux clairs, beaux et construits.
        </p>
        <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap", justifyContent:"center" }}>
          <button onClick={() => scrollTo("projets")} style={{ background:TC, color:OFFWHITE, border:"none", padding:"13px 32px", borderRadius:2, fontSize:14, fontWeight:600, cursor:"pointer", letterSpacing:1 }}>
            VOIR MES PROJETS
          </button>
          <button onClick={() => scrollTo("contact")} style={{ background:"transparent", color:OFFWHITE, border:`1px solid #ffffff40`, padding:"13px 32px", borderRadius:2, fontSize:14, cursor:"pointer", letterSpacing:1 }}>
            ME CONTACTER
          </button>
        </div>
        <div style={{ marginTop:"5rem", display:"flex", gap:"3rem", opacity:.5, fontSize:13, letterSpacing:2, color:MUTED }}>
          {["10+ PROJETS","BIM MANAGER","TWINMOTION"].map(t => <span key={t}>{t}</span>)}
        </div>
      </section>

      {/* À PROPOS */}
      <section id="apropos" style={{ padding:"6rem 2rem", maxWidth:900, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4rem", alignItems:"center" }}>
          <div>
            <p style={{ fontSize:11, letterSpacing:4, color:TC, marginBottom:"1rem" }}>À PROPOS</p>
            <h2 style={{ fontSize:"2.2rem", fontWeight:700, lineHeight:1.2, marginBottom:"1.5rem" }}>
              L'architecte qui <span style={{color:TC}}>décode</span> les maisons
            </h2>
            <p style={{ color:MUTED, marginBottom:"1rem" }}>
              Basé à Cotonou, je suis Dessinateur Projeteur Bâtiment et Technicien en Génie Civil, passionné par l'architecture africaine contemporaine.
            </p>
            <p style={{ color:MUTED, marginBottom:"2rem" }}>
              Mon objectif : rendre l'architecture accessible, lisible et concrète — des villas résidentielles aux complexes hôteliers, chaque projet raconte une histoire.
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
              {SKILLS.map(s => (
                <span key={s} style={{ fontSize:12, padding:"5px 14px", border:`1px solid ${TC}60`, color:TC, borderRadius:20, letterSpacing:1 }}>{s}</span>
              ))}
            </div>
          </div>
          <div style={{ background:`#1e1a17`, borderRadius:4, padding:"2.5rem", borderLeft:`3px solid ${TC}` }}>
            <div style={{ marginBottom:"1.5rem" }}>
              <p style={{ fontSize:11, color:MUTED, letterSpacing:2, marginBottom:4 }}>FORMATION</p>
              <p style={{ fontWeight:500 }}>Licence en Génie Civil</p>
              <p style={{ fontSize:13, color:MUTED }}>DT en DPB · Baccalauréat F4 · CAP BTP</p>
            </div>
            <div style={{ marginBottom:"1.5rem" }}>
              <p style={{ fontSize:11, color:MUTED, letterSpacing:2, marginBottom:4 }}>EXPÉRIENCE</p>
              <p style={{ fontWeight:500 }}>MODULOR ARCHI URBA · S2AP · ECCO-GC</p>
              <p style={{ fontSize:13, color:MUTED }}>Complexe Sécurité Défense, Abomey-Calavi</p>
            </div>
            <div>
              <p style={{ fontSize:11, color:MUTED, letterSpacing:2, marginBottom:4 }}>OBJECTIF</p>
              <p style={{ fontWeight:500, color:TC }}>BIM Manager</p>
            </div>
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div style={{ height:1, background:`linear-gradient(90deg, transparent, ${TC}60, transparent)`, maxWidth:700, margin:"0 auto" }} />

      {/* SERVICES */}
      <section id="services" style={{ padding:"6rem 2rem", maxWidth:900, margin:"0 auto" }}>
        <p style={{ fontSize:11, letterSpacing:4, color:TC, marginBottom:"1rem", textAlign:"center" }}>SERVICES</p>
        <h2 style={{ fontSize:"2rem", fontWeight:700, textAlign:"center", marginBottom:"3rem" }}>Ce que je propose</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"1.5rem" }}>
          {SERVICES.map(s => (
            <div key={s.title} style={{ background:"#1e1a17", padding:"2rem 1.5rem", borderRadius:4, border:`1px solid #ffffff0d`, transition:"border-color .3s", cursor:"default" }}
              onMouseEnter={e=>e.currentTarget.style.borderColor=TC+"60"}
              onMouseLeave={e=>e.currentTarget.style.borderColor="#ffffff0d"}>
              <div style={{ fontSize:32, marginBottom:"1rem" }}>{s.icon}</div>
              <h3 style={{ fontWeight:600, fontSize:16, marginBottom:"0.75rem" }}>{s.title}</h3>
              <p style={{ fontSize:13, color:MUTED, lineHeight:1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROJETS */}
      <section id="projets" style={{ padding:"6rem 2rem", maxWidth:900, margin:"0 auto" }}>
        <p style={{ fontSize:11, letterSpacing:4, color:TC, marginBottom:"1rem", textAlign:"center" }}>RÉALISATIONS</p>
        <h2 style={{ fontSize:"2rem", fontWeight:700, textAlign:"center", marginBottom:"3rem" }}>Mes projets</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:"1.5rem" }}>
          {PROJECTS.map((p,i) => (
            <div key={i} style={{ borderRadius:4, overflow:"hidden", border:`1px solid #ffffff0d`, background:"#1e1a17", cursor:"pointer", transition:"transform .2s" }}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-4px)"}
              onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
              <div style={{ height:160, background:p.color, display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
                <div style={{ position:"absolute", inset:0, background:`linear-gradient(135deg, ${TC}30 0%, transparent 60%)` }} />
                <span style={{ fontSize:40, opacity:.3 }}>🏛️</span>
                <span style={{ position:"absolute", bottom:12, right:14, fontSize:11, color:OFFWHITE, opacity:.5, letterSpacing:2 }}>{p.year}</span>
              </div>
              <div style={{ padding:"1.25rem" }}>
                <p style={{ fontSize:10, letterSpacing:3, color:TC, marginBottom:6 }}>{p.type.toUpperCase()}</p>
                <h3 style={{ fontWeight:600, fontSize:15 }}>{p.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DIVIDER */}
      <div style={{ height:1, background:`linear-gradient(90deg, transparent, ${TC}60, transparent)`, maxWidth:700, margin:"0 auto" }} />

      {/* CONTACT */}
      <section id="contact" style={{ padding:"6rem 2rem", maxWidth:600, margin:"0 auto", textAlign:"center" }}>
        <p style={{ fontSize:11, letterSpacing:4, color:TC, marginBottom:"1rem" }}>CONTACT</p>
        <h2 style={{ fontSize:"2rem", fontWeight:700, marginBottom:"1rem" }}>Parlons de votre projet</h2>
        <p style={{ color:MUTED, marginBottom:"3rem" }}>Un projet en tête ? Une question ? Envoyez-moi un message, je reviens rapidement.</p>

        {!sent ? (
          <div style={{ display:"flex", flexDirection:"column", gap:"1rem", textAlign:"left" }}>
            <input value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} placeholder="Votre nom"
              style={{ background:"#1e1a17", border:`1px solid #ffffff20`, color:OFFWHITE, padding:"14px 16px", borderRadius:2, fontSize:14, outline:"none" }} />
            <input value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} placeholder="Votre email (optionnel)"
              style={{ background:"#1e1a17", border:`1px solid #ffffff20`, color:OFFWHITE, padding:"14px 16px", borderRadius:2, fontSize:14, outline:"none" }} />
            <textarea value={formData.message} onChange={e=>setFormData({...formData,message:e.target.value})} placeholder="Décrivez votre projet..." rows={5}
              style={{ background:"#1e1a17", border:`1px solid #ffffff20`, color:OFFWHITE, padding:"14px 16px", borderRadius:2, fontSize:14, outline:"none", resize:"vertical" }} />
            <button onClick={handleSend} style={{ background:TC, color:OFFWHITE, border:"none", padding:"14px", borderRadius:2, fontSize:14, fontWeight:600, cursor:"pointer", letterSpacing:1 }}>
              ENVOYER LE MESSAGE
            </button>
          </div>
        ) : (
          <div style={{ background:"#1e1a17", borderRadius:4, padding:"3rem", border:`1px solid ${TC}40` }}>
            <div style={{ fontSize:48, marginBottom:"1rem" }}>✅</div>
            <h3 style={{ fontWeight:600, marginBottom:8 }}>Message bien reçu !</h3>
            <p style={{ color:MUTED }}>Je vous recontacte très bientôt.</p>
          </div>
        )}

        <div style={{ marginTop:"3rem", display:"flex", justifyContent:"center", gap:"2rem" }}>
          <a href="https://wa.me/22900000000" style={{ color:MUTED, textDecoration:"none", fontSize:13, letterSpacing:1 }}
            onMouseEnter={e=>e.target.style.color=TC} onMouseLeave={e=>e.target.style.color=MUTED}>
            WHATSAPP
          </a>
          <a href="https://tiktok.com/@PlanifyBJ" style={{ color:MUTED, textDecoration:"none", fontSize:13, letterSpacing:1 }}
            onMouseEnter={e=>e.target.style.color=TC} onMouseLeave={e=>e.target.style.color=MUTED}>
            TIKTOK @PLANIFYBJ
          </a>
          <a href="https://linkedin.com" style={{ color:MUTED, textDecoration:"none", fontSize:13, letterSpacing:1 }}
            onMouseEnter={e=>e.target.style.color=TC} onMouseLeave={e=>e.target.style.color=MUTED}>
            LINKEDIN
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop:`1px solid #ffffff10`, padding:"2rem", textAlign:"center", color:MUTED, fontSize:12, letterSpacing:2 }}>
        <span style={{ color:TC, fontWeight:700 }}>PLANIFYBJ</span> · BENNETT · COTONOU, BÉNIN · {new Date().getFullYear()}
      </footer>
    </div>
  );
}

