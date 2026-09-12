import { COLORS, FONTS } from "../theme";
import { simpleIconUrl } from "../data/defaults";

export default function SoftwareLogo({ software, size = 36, badgeBg = COLORS.sand, badgeColor = COLORS.ink }) {
  if (software.logo_url) {
    return <img src={software.logo_url} alt="" style={{ width: size, height: size, objectFit: "contain" }} />;
  }
  if (software.logoSlug) {
    return <img src={simpleIconUrl(software.logoSlug, COLORS.sand)} alt="" style={{ width: size, height: size, objectFit: "contain" }} />;
  }
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONTS.body,
        fontWeight: 600,
        fontSize: Math.round(size * 0.36),
        background: badgeBg,
        color: badgeColor,
      }}
    >
      {software.mark || software.n?.slice(0, 2)}
    </div>
  );
}
