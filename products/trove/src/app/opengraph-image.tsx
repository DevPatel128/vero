import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Trove — Your financial operating system.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FAF7F2",
          padding: 80,
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, background: "#FFFFFF", border: "1px solid #E5E0D8", borderRadius: 4 }}>
            <div style={{ display: "flex", color: "#C9A96E", fontWeight: 700, fontSize: 30 }}>T</div>
          </div>
          <div style={{ display: "flex", color: "#111111", fontSize: 36, letterSpacing: -1 }}>Trove</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", color: "#C9A96E", fontSize: 18, fontFamily: "system-ui", textTransform: "uppercase", letterSpacing: 4, marginBottom: 16 }}>
            Financial operating system
          </div>
          <div style={{ display: "flex", color: "#111111", fontSize: 88, lineHeight: 1, letterSpacing: -3 }}>
            Your money,
          </div>
          <div style={{ display: "flex", color: "#A8884F", fontStyle: "italic", fontSize: 88, lineHeight: 1, letterSpacing: -3, marginTop: 8 }}>
            finally in focus.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", color: "#595959", fontFamily: "system-ui", fontSize: 18 }}>
          <div style={{ display: "flex" }}>trove.vroelabs.com</div>
          <div style={{ display: "flex" }}>by Vroe Labs</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
