import type { Metadata } from "next";
import { Geist, Geist_Mono, Spectral } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { OrganizationJsonLd } from "@/components/JsonLd";
import { ScrollProgress } from "@/components/motion/ScrollProgress";

const sans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

const editorial = Spectral({
  subsets: ["latin"],
  display: "swap",
  weight: ["500"],
  style: ["italic"],
  variable: "--font-editorial",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.parent }],
  keywords: [
    "proof of work",
    "verified freelance",
    "apprenticeship network",
    "execution record",
    "reputation infrastructure",
    "trust marketplace",
    "VERO",
    "VROE Labs",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

// Inline theme bootstrap — runs before paint, no FOUC.
const themeBootstrap = `
(function(){try{
  var t=localStorage.getItem('vero-theme');
  var prefersLight=window.matchMedia('(prefers-color-scheme: light)').matches;
  var theme=t||(prefersLight?'light':'dark');
  if(theme==='light')document.documentElement.classList.add('light');
}catch(e){}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${editorial.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <OrganizationJsonLd />
        <ScrollProgress />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
