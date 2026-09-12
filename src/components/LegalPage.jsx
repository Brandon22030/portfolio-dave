import { useEffect, useRef } from "react";
import Header, { HEADER_HEIGHT, MOBILE_HEADER_HEIGHT, TABLET_HEADER_HEIGHT } from "./Header";
import Footer from "./Footer";
import { COLORS } from "../theme";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { useIsMobile, useIsTablet } from "../hooks/useIsMobile";

const STICKY_TOP = HEADER_HEIGHT + 32;
const TABLET_STICKY_TOP = TABLET_HEADER_HEIGHT + 24;
const MOBILE_TOC_HEIGHT = 53;
const MOBILE_SCROLL_MARGIN = MOBILE_HEADER_HEIGHT + MOBILE_TOC_HEIGHT + 16;

function MobileToc({ sections, activeId }) {
  const linkRefs = useRef({});

  useEffect(() => {
    linkRefs.current[activeId]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeId]);

  return (
    <div
      style={{
        position: "sticky",
        top: MOBILE_HEADER_HEIGHT,
        zIndex: 10,
        background: "rgba(239,233,223,.94)",
        backdropFilter: "blur(10px)",
        borderBottom: `1px solid ${COLORS.taupe}`,
        display: "flex",
        gap: 8,
        overflowX: "auto",
        whiteSpace: "nowrap",
        padding: "10px 20px",
      }}
    >
      {sections.map((s) => {
        const active = s.id === activeId;
        return (
          <a
            key={s.id}
            ref={(el) => (linkRefs.current[s.id] = el)}
            href={`#${s.id}`}
            style={{
              flexShrink: 0,
              fontSize: 12,
              padding: "8px 14px",
              border: `1px solid ${active ? COLORS.ink : COLORS.taupe}`,
              background: active ? COLORS.ink : "transparent",
              color: active ? COLORS.sand : COLORS.text1,
              transition: "background-color .2s ease, border-color .2s ease, color .2s ease",
            }}
          >
            {s.heading}
          </a>
        );
      })}
    </div>
  );
}

function LegalPageMobile({ eyebrow, title, titleAccent, updated, sections, banner, activeId }) {
  return (
    <div style={{ background: COLORS.sand }}>
      <Header variant="light" />

      <div style={{ padding: "24px 20px 0", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracotta }}>{eyebrow}</div>
        <h1 style={{ margin: 0, fontSize: 40, fontWeight: 300, lineHeight: 1.02, letterSpacing: "-.035em" }}>
          {title} <span style={{ fontWeight: 600 }}>{titleAccent}</span>
        </h1>
        <div style={{ fontSize: 12, color: COLORS.text2 }}>Dernière mise à jour : {updated}</div>
      </div>

      {banner && (
        <div style={{ margin: "40px 20px 0", background: COLORS.ink, color: COLORS.sand, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 24 }}>
          {banner.map((b) => (
            <div key={b.label} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", color: COLORS.terracottaLight }}>{b.label}</div>
              <div style={{ fontSize: 14, lineHeight: 1.6 }}>{b.text}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 32 }}>
        <MobileToc sections={sections} activeId={activeId} />

        <div style={{ padding: "40px 20px 72px", display: "flex", flexDirection: "column", gap: 40, fontSize: 15, lineHeight: 1.75, color: COLORS.text1 }}>
          {sections.map((s) => (
          <div key={s.id} id={s.id} style={{ display: "flex", flexDirection: "column", gap: 14, scrollMarginTop: MOBILE_SCROLL_MARGIN }}>
            <h2 style={{ margin: 0, fontSize: 23, fontWeight: 500, letterSpacing: "-.02em", color: COLORS.ink }}>{s.heading}</h2>
            <p style={{ margin: 0 }}>{s.body}</p>
            {s.grid && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14, borderTop: `1px solid ${COLORS.taupe}`, paddingTop: 14 }}>
                {s.grid.map(([label, value]) => (
                  <div key={label}>
                    <div style={{ color: COLORS.text2, fontSize: 12 }}>{label}</div>
                    <div>{value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

function LegalPageTablet({ eyebrow, title, titleAccent, updated, sections, banner, activeId }) {
  return (
    <div style={{ background: COLORS.sand }}>
      <Header variant="light" />

      <div style={{ padding: "88px 40px 0", display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracotta }}>{eyebrow}</div>
        <h1 style={{ margin: 0, fontSize: 44, fontWeight: 300, lineHeight: 1.02, letterSpacing: "-.035em" }}>
          {title} <span style={{ fontWeight: 600 }}>{titleAccent}</span>
        </h1>
        <div style={{ fontSize: 12, color: COLORS.text2 }}>Dernière mise à jour : {updated}</div>
      </div>

      {banner && (
        <div
          style={{
            margin: "48px 40px 0",
            background: COLORS.ink,
            color: COLORS.sand,
            padding: "32px 36px",
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 28,
          }}
        >
          {banner.map((b) => (
            <div key={b.label} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", color: COLORS.terracottaLight }}>{b.label}</div>
              <div style={{ fontSize: 14, lineHeight: 1.6 }}>{b.text}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{ padding: "64px 40px 96px", display: "grid", gridTemplateColumns: "200px 1fr", gap: 48 }}>
        <div style={{ position: "sticky", top: TABLET_STICKY_TOP, alignSelf: "start", fontSize: 12, display: "flex", flexDirection: "column" }}>
          {sections.map((s) => {
            const active = s.id === activeId;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                style={{
                  padding: "9px 0",
                  paddingLeft: 12,
                  borderLeft: `2px solid ${active ? COLORS.terracotta : COLORS.taupe}`,
                  color: active ? COLORS.ink : COLORS.text1,
                  fontWeight: active ? 500 : 400,
                  transition: "border-color .2s ease, color .2s ease",
                }}
              >
                {s.heading}
              </a>
            );
          })}
        </div>

        <div style={{ fontSize: 15, lineHeight: 1.75, color: COLORS.text1, display: "flex", flexDirection: "column", gap: 48 }}>
          {sections.map((s) => (
            <div key={s.id} id={s.id} style={{ display: "flex", flexDirection: "column", gap: 14, scrollMarginTop: TABLET_STICKY_TOP }}>
              <h2 style={{ margin: 0, fontSize: 24, fontWeight: 500, letterSpacing: "-.02em", color: COLORS.ink }}>{s.heading}</h2>
              <p style={{ margin: 0 }}>{s.body}</p>
              {s.grid && (
                <div style={{ borderTop: `1px solid ${COLORS.taupe}`, fontSize: 13 }}>
                  {s.grid.map(([label, value]) => (
                    <div key={label} style={{ display: "grid", gridTemplateColumns: "140px 1fr", padding: "12px 0", borderBottom: `1px solid ${COLORS.taupe}` }}>
                      <div style={{ color: COLORS.text2 }}>{label}</div>
                      <div>{value}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function LegalPage({ eyebrow, title, titleAccent, updated, sections, banner }) {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const activeId = useScrollSpy(
    sections.map((s) => s.id),
    (isMobile ? MOBILE_SCROLL_MARGIN : isTablet ? TABLET_STICKY_TOP : STICKY_TOP) + 20
  );

  if (isMobile) {
    return <LegalPageMobile eyebrow={eyebrow} title={title} titleAccent={titleAccent} updated={updated} sections={sections} banner={banner} activeId={activeId} />;
  }

  if (isTablet) {
    return <LegalPageTablet eyebrow={eyebrow} title={title} titleAccent={titleAccent} updated={updated} sections={sections} banner={banner} activeId={activeId} />;
  }

  return (
    <div style={{ background: COLORS.sand }}>
      <Header variant="light" />

      <div style={{ padding: "64px 64px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "end" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: COLORS.terracotta }}>{eyebrow}</div>
          <h1 style={{ margin: 0, fontSize: 64, fontWeight: 300, lineHeight: 1.02, letterSpacing: "-.035em" }}>
            {title} <span style={{ fontWeight: 600 }}>{titleAccent}</span>
          </h1>
        </div>
        <div style={{ fontSize: 13, color: COLORS.text2, justifySelf: "end" }}>Dernière mise à jour : {updated}</div>
      </div>

      {banner && (
        <div
          style={{
            margin: "64px 64px 0",
            background: COLORS.ink,
            color: COLORS.sand,
            padding: "40px 48px",
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 40,
          }}
        >
          {banner.map((b) => (
            <div key={b.label} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase", color: COLORS.terracottaLight }}>{b.label}</div>
              <div style={{ fontSize: 15, lineHeight: 1.6 }}>{b.text}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{ padding: "80px 64px 128px", display: "grid", gridTemplateColumns: "280px 1fr", gap: 96 }}>
        <div style={{ position: "sticky", top: STICKY_TOP, alignSelf: "start", fontSize: 13, display: "flex", flexDirection: "column" }}>
          {sections.map((s) => {
            const active = s.id === activeId;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                style={{
                  padding: "10px 0",
                  paddingLeft: 14,
                  borderLeft: `2px solid ${active ? COLORS.terracotta : COLORS.taupe}`,
                  color: active ? COLORS.ink : COLORS.text1,
                  fontWeight: active ? 500 : 400,
                  transition: "border-color .2s ease, color .2s ease",
                }}
              >
                {s.heading}
              </a>
            );
          })}
        </div>

        <div style={{ maxWidth: 760, fontSize: 16, lineHeight: 1.75, color: COLORS.text1, display: "flex", flexDirection: "column", gap: 56 }}>
          {sections.map((s) => (
            <div key={s.id} id={s.id} style={{ display: "flex", flexDirection: "column", gap: 16, scrollMarginTop: STICKY_TOP }}>
              <h2 style={{ margin: 0, fontSize: 28, fontWeight: 500, letterSpacing: "-.02em", color: COLORS.ink }}>{s.heading}</h2>
              <p style={{ margin: 0 }}>{s.body}</p>
              {s.grid && (
                <div style={{ borderTop: `1px solid ${COLORS.taupe}`, fontSize: 14 }}>
                  {s.grid.map(([label, value]) => (
                    <div key={label} style={{ display: "grid", gridTemplateColumns: "160px 1fr", padding: "12px 0", borderBottom: `1px solid ${COLORS.taupe}` }}>
                      <div style={{ color: COLORS.text2 }}>{label}</div>
                      <div>{value}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
