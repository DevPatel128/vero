import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "VERO — Verified proof-of-work identity",
    template: "%s · VERO",
  },
  description:
    "LinkedIn shows claims. VERO shows proof. A verified proof-of-work identity platform for India.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  openGraph: {
    title: "VERO — Verified proof-of-work identity",
    description:
      "LinkedIn shows claims. VERO shows proof. Verified work history that belongs to you.",
    type: "website",
    locale: "en_IN",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "oklch(0.14 0.005 240)" },
    { media: "(prefers-color-scheme: light)", color: "oklch(0.985 0.003 95)" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface-0 text-ink-0">
        {children}
      </body>
    </html>
  );
}
