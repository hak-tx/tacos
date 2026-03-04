import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") || "Rich O'Toole's Taco Tour";
  const city = searchParams.get("city") || "Texas";
  const rich = searchParams.get("rich") || "9.0";
  const fans = searchParams.get("fans") || "8.5";
  const quote = searchParams.get("quote") || "Tacos. Tunes. Takes.";

  const richNum = parseFloat(rich);
  const ratingColor = richNum >= 9 ? "#22C55E" : richNum >= 8 ? "#E8B100" : richNum >= 7 ? "#F97316" : "#EF4444";

  return new ImageResponse(
    (
      <div style={{
        width: "1200px", height: "630px", display: "flex", flexDirection: "column",
        background: "linear-gradient(160deg, #0d0d14 0%, #1a1a2e 50%, #0d0d14 100%)",
        fontFamily: "system-ui, sans-serif",
      }}>
        <div style={{ height: "6px", background: "linear-gradient(90deg, #E8B100, #D97706, #E8B100)", width: "100%" }} />
        <div style={{ display: "flex", flexDirection: "column", padding: "48px 60px", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "36px" }}>
            <div style={{
              width: "56px", height: "56px", borderRadius: "50%",
              background: "linear-gradient(135deg, #E8B100, #D97706)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "24px", fontWeight: "900", color: "#000",
            }}>R</div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "24px", color: "#fff", fontWeight: "700" }}>Rich O'Toole</span>
              <span style={{ fontSize: "16px", color: "#E8B100", fontWeight: "600" }}>Taco Tour 🌮</span>
            </div>
          </div>
          <div style={{ fontSize: "52px", fontWeight: "900", color: "#fff", lineHeight: "1.1", marginBottom: "8px" }}>{name}</div>
          <div style={{ fontSize: "22px", color: "#888", marginBottom: "40px" }}>{city}</div>
          <div style={{ display: "flex", alignItems: "center", gap: "40px", marginBottom: "40px" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: "96px", fontWeight: "900", color: ratingColor, lineHeight: "1" }}>{rich}</span>
              <span style={{ fontSize: "14px", color: "#E8B100", textTransform: "uppercase", letterSpacing: "3px", fontWeight: "700", marginTop: "8px" }}>Rich Says</span>
            </div>
            <span style={{ fontSize: "32px", color: "#444" }}>vs</span>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: "96px", fontWeight: "900", color: "#60A5FA", lineHeight: "1" }}>{fans}</span>
              <span style={{ fontSize: "14px", color: "#60A5FA", textTransform: "uppercase", letterSpacing: "3px", fontWeight: "700", marginTop: "8px" }}>Fans Say</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1 }}>
            <div style={{ width: "4px", height: "100%", maxHeight: "60px", background: "#E8B100", borderRadius: "2px" }} />
            <span style={{ fontSize: "22px", color: "#ccc", fontStyle: "italic", lineHeight: "1.5" }}>&ldquo;{quote}&rdquo;</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <span style={{ fontSize: "18px", color: "#E8B100", fontWeight: "700" }}>richstacotour.com</span>
            <span style={{ fontSize: "16px", color: "#666" }}>Tag @RichOToole</span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
