import { useState } from "react";
import AdminLayout from "./AdminLayout";
import { PageHeader, StatusPill, DarkButton, PrimaryButton, OutlineButton, inputStyle, Card, contactDate } from "./adminUI";
import { COLORS } from "../theme";
import { useContacts, useProjects } from "../hooks/resources";

const TABS = ["Tous", "Nouveaux", "Répondus", "Archivés"];
const TAB_STATUS = { Nouveaux: "Nouveau", Répondus: "Répondu", Archivés: "Archivé" };

function exportCsv(contacts) {
  const header = ["Nom", "Email", "Téléphone", "Type de projet", "Statut", "Message"];
  const rows = contacts.map((c) => [c.name, c.email, c.phone, c.project_type, c.status, (c.message || "").replace(/\n/g, " ")]);
  const csv = [header, ...rows].map((r) => r.map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "contacts.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminContacts() {
  const { rows: contacts, update } = useContacts();
  const { rows: projects } = useProjects();
  const [tab, setTab] = useState("Tous");
  const [selectedId, setSelectedId] = useState(null);
  const [note, setNote] = useState("");

  const visible = tab === "Tous" ? contacts : contacts.filter((c) => c.status === TAB_STATUS[tab]);
  const selected = contacts.find((c) => c.id === selectedId) || visible[0];

  const openContact = (c) => {
    setSelectedId(c.id);
    setNote(c.internal_note || "");
  };

  const setStatus = async (status) => {
    if (!selected) return;
    await update(selected.id, { status });
  };

  const saveNote = async () => {
    if (!selected) return;
    await update(selected.id, { internal_note: note });
  };

  return (
    <AdminLayout active="Contacts" counts={{ Projets: projects.length, Contacts: contacts.filter((c) => c.status === "Nouveau").length }}>
      <PageHeader
        title="Contacts"
        actions={
          <>
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  fontSize: 13,
                  padding: "9px 16px",
                  background: tab === t ? COLORS.ink : COLORS.adminCard,
                  color: tab === t ? COLORS.sand : COLORS.ink,
                  border: tab === t ? "none" : `1px solid ${COLORS.adminBorder}`,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {t}
              </button>
            ))}
            <button onClick={() => exportCsv(contacts)} style={{ background: "none", border: "none", color: COLORS.terracotta, cursor: "pointer", fontSize: 13, marginLeft: 8 }}>
              Exporter CSV
            </button>
          </>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 460px", gap: 24 }}>
        <Card style={{ padding: 0, overflowX: "auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 130px 80px 90px", fontSize: 11, textTransform: "uppercase", letterSpacing: ".1em", color: COLORS.text3, padding: "14px 20px", borderBottom: `1px solid ${COLORS.adminHairline}` }}>
            <div>Contact</div>
            <div>Type de projet</div>
            <div>Reçu</div>
            <div>Statut</div>
          </div>
          {visible.map((c) => (
            <div
              key={c.id}
              onClick={() => openContact(c)}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 130px 80px 90px",
                alignItems: "center",
                padding: "12px 20px",
                borderBottom: `1px solid ${COLORS.adminHairline}`,
                fontSize: 13,
                cursor: "pointer",
                background: selected?.id === c.id ? COLORS.adminHighlight : "transparent",
              }}
            >
              <div style={{ fontWeight: 500 }}>{c.name}</div>
              <div style={{ color: COLORS.text1 }}>{c.project_type}</div>
              <div style={{ color: COLORS.text3 }}>{contactDate(c)}</div>
              <StatusPill status={c.status} />
            </div>
          ))}
        </Card>

        {selected && (
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 500 }}>{selected.name}</div>
                <div style={{ fontSize: 12, color: COLORS.text3, marginTop: 4 }}>Reçu le {contactDate(selected)} · via formulaire</div>
              </div>
              <StatusPill status={selected.status} />
            </div>

            <div style={{ fontSize: 14, marginBottom: 16 }}>
              {[
                ["Email", selected.email],
                ["Téléphone", selected.phone],
                ["Type", selected.project_type],
              ].map(([label, value]) => (
                <div key={label} style={{ display: "grid", gridTemplateColumns: "110px 1fr", borderTop: `1px solid ${COLORS.adminBorder}`, padding: "10px 0" }}>
                  <div style={{ color: COLORS.text3 }}>{label}</div>
                  <div>{value}</div>
                </div>
              ))}
              <div style={{ borderBottom: `1px solid ${COLORS.adminBorder}` }} />
            </div>

            <div style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{selected.message}</div>

            <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
              <DarkButton as="a" href={`mailto:${selected.email}`}>
                Répondre par email
              </DarkButton>
              <PrimaryButton as="a" href={`https://wa.me/${(selected.phone || "").replace(/\D/g, "")}`} target="_blank" rel="noreferrer">
                WhatsApp
              </PrimaryButton>
              <OutlineButton onClick={() => setStatus("Archivé")}>Archiver</OutlineButton>
            </div>

            <label style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".08em", color: COLORS.text3 }}>Note interne</label>
            <textarea
              style={{ ...inputStyle, resize: "vertical", marginTop: 6 }}
              rows={3}
              placeholder="Rappeler lundi, envoyer grille tarifaire…"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              onBlur={saveNote}
            />
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
