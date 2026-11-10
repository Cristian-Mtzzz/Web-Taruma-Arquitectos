import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { site } from "@/data/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Arquitectura y construcción en ${site.country}`,
    template: `%s — ${site.name}`,
  },
  description:
    "Despacho de arquitectura, construcción y planificación urbana en Tegucigalpa, Honduras. Diseño arquitectónico, obra nueva, remodelación e interiorismo.",
  icons: { icon: "/img/favicon.png" },
  openGraph: {
    title: site.name,
    description: site.tagline,
    locale: "es_HN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={archivo.variable}>
      <body>
        <a href="#contenido" className="skip">
          Saltar al contenido
        </a>
        <SiteNav />
        <main id="contenido">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
