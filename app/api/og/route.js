import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") || "";
  const city = searchParams.get("city") || "";
  const rich = searchParams.get("rich") || "";
  const fans = searchParams.get("fans") || "";
  const quote = searchParams.get("quote") || "";

  const isDefault = !name;
  const richNum = parseFloat(rich) || 0;
  const rColor = richNum >= 9 ? "#22C55E" : richNum >= 8 ? "#E8B100" : richNum >= 7 ? "#F97316" : "#EF4444";

  // Default OG: hero card for the whole app
  if (isDefault) {
    return new ImageResponse(
      (
        <div style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          background: "linear-gradient(135deg, #0d0d14 0%, #1a1a2e 50%, #0d0d14 100%)",
          fontFamily: "sans-serif", color: "#fff", position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "6px", background: "linear-gradient(90deg, #E8B100, #D97706, #E8B100)" }} />
          <div style={{ position: "absolute", top: "40px", right: "60px", fontSize: "120px", opacity: 0.08, display: "flex" }}>🌮</div>
          <div style={{ position: "absolute", bottom: "80px", right: "200px", fontSize: "80px", opacity: 0.05, display: "flex" }}>🎸</div>

          <div style={{ display: "flex", flexDirection: "column", padding: "56px 64px", flex: 1, justifyContent: "center" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <div style={{
                width: "52px", height: "52px", borderRadius: "26px",
                background: "linear-gradient(135deg, #E8B100, #D97706)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "22px", fontWeight: 900, color: "#000", marginRight: "16px",
              }}>R</div>
              <span style={{ fontSize: "18px", fontWeight: 700, color: "#E8B100", letterSpacing: "2px", textTransform: "uppercase" }}>Rich O Toole</span>
            </div>

            <div style={{ fontSize: "72px", fontWeight: 900, lineHeight: 1.05, marginBottom: "20px", letterSpacing: "-1px", display: "flex" }}>
              Tacos Setlist
            </div>

            <div style={{ fontSize: "28px", color: "#aaa", marginBottom: "36px", lineHeight: 1.4, display: "flex" }}>
              Rate tacos. Debate Rich. Find the best spots in Texas.
            </div>

            <div style={{ display: "flex", gap: "24px", marginBottom: "32px" }}>
              <div style={{ display: "flex", alignItems: "center", background: "rgba(232,177,0,0.1)", border: "2px solid rgba(232,177,0,0.25)", borderRadius: "12px", padding: "14px 20px" }}>
                <span style={{ fontSize: "28px", marginRight: "10px", display: "flex" }}>🌮</span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "28px", fontWeight: 900, color: "#E8B100" }}>16</span>
                  <span style={{ fontSize: "13px", color: "#888", textTransform: "uppercase", letterSpacing: "1px" }}>Spots Rated</span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", background: "rgba(239,68,68,0.08)", border: "2px solid rgba(239,68,68,0.2)", borderRadius: "12px", padding: "14px 20px" }}>
                <span style={{ fontSize: "28px", marginRight: "10px", display: "flex" }}>🎸</span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "28px", fontWeight: 900, color: "#EF4444" }}>12</span>
                  <span style={{ fontSize: "13px", color: "#888", textTransform: "uppercase", letterSpacing: "1px" }}>Shows</span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", background: "rgba(96,165,250,0.08)", border: "2px solid rgba(96,165,250,0.2)", borderRadius: "12px", padding: "14px 20px" }}>
                <span style={{ fontSize: "28px", marginRight: "10px", display: "flex" }}>🗳</span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "28px", fontWeight: 900, color: "#60A5FA" }}>Vote</span>
                  <span style={{ fontSize: "13px", color: "#888", textTransform: "uppercase", letterSpacing: "1px" }}>Agree or Not</span>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <span style={{ fontSize: "20px", color: "#E8B100", fontWeight: 700 }}>tacos-lime.vercel.app</span>
              <span style={{ fontSize: "18px", color: "#555" }}>Country Music x Taco Reviews</span>
            </div>
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }

  // Spot-specific OG image
  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%", display: "flex", flexDirection: "column",
        background: "linear-gradient(135deg, #0d0d14 0%, #1a1a2e 50%, #0d0d14 100%)",
        fontFamily: "sans-serif", color: "#fff", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "6px", background: "linear-gradient(90deg, #E8B100, #D97706, #E8B100)" }} />
        <div style={{ position: "absolute", top: "60px", right: "60px", fontSize: "160px", opacity: 0.06, display: "flex" }}>🌮</div>

        <div style={{ display: "flex", flexDirection: "column", padding: "48px 64px", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "32px" }}>
            <div style={{
              width: "44px", height: "44px", borderRadius: "22px",
              background: "linear-gradient(135deg, #E8B100, #D97706)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px", fontWeight: 900, color: "#000", marginRight: "12px",
            }}>R</div>
            <span style={{ fontSize: "18px", color: "#E8B100", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>Tacos Setlist</span>
          </div>

          <div style={{ fontSize: "56px", fontWeight: 900, lineHeight: 1.1, marginBottom: "8px", display: "flex" }}>{name}</div>
          <div style={{ fontSize: "24px", color: "#888", marginBottom: "36px", display: "flex" }}>{city}</div>

          <div style={{ display: "flex", alignItems: "flex-end", gap: "48px", marginBottom: "36px" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: "14px", color: "#E8B100", textTransform: "uppercase", letterSpacing: "3px", fontWeight: 800, marginBottom: "8px" }}>Rich Says</span>
              <span style={{ fontSize: "108px", fontWeight: 900, color: rColor, lineHeight: 1 }}>{rich}</span>
            </div>
            <span style={{ fontSize: "36px", color: "#333", marginBottom: "20px", display: "flex" }}>vs</span>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: "14px", color: "#60A5FA", textTransform: "uppercase", letterSpacing: "3px", fontWeight: 800, marginBottom: "8px" }}>Fans Say</span>
              <span style={{ fontSize: "108px", fontWeight: 900, color: "#60A5FA", lineHeight: 1 }}>{fans}</span>
            </div>
          </div>

          {quote && (
            <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <div style={{ width: "4px", height: "44px", background: "linear-gradient(180deg, #E8B100, #D97706)", borderRadius: "2px", marginRight: "16px" }} />
              <span style={{ fontSize: "22px", color: "#ccc", fontStyle: "italic" }}>{quote}</span>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <span style={{ fontSize: "18px", color: "#E8B100", fontWeight: 700 }}>Do you agree? Vote now</span>
            <span style={{ fontSize: "16px", color: "#666" }}>tacos-lime.vercel.app</span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
