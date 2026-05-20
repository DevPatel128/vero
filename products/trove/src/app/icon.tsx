import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: 32, height: 32, background: "#FAF7F2", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A96E", fontSize: 24, fontFamily: "Georgia, serif", fontWeight: 700, borderRadius: 4 }}>
        T
      </div>
    ),
    { ...size },
  );
}
