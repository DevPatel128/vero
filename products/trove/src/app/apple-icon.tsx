import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: 180, height: 180, background: "#FAF7F2", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A96E", fontSize: 130, fontFamily: "Georgia, serif", fontWeight: 700 }}>
        T
      </div>
    ),
    { ...size },
  );
}
