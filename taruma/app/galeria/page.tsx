import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import GalleryBrowser from "@/components/GalleryBrowser";
import { galleryImages } from "@/data/work";

export const metadata: Metadata = {
  title: "Galería",
  description:
    "Galería de obra de Taruma Arquitectos: exteriores e interiores de proyectos residenciales, comerciales, turísticos, urbanos e industriales en Honduras.",
};

export default function GaleriaPage() {
  return (
    <>
      <PageHeader
        title="Galería"
        lede={`${galleryImages.length} imágenes de obra terminada y proyectos en desarrollo. Filtre por tipo de espacio o por categoría.`}
      />

      <section style={{ paddingBottom: "var(--band)" }}>
        <GalleryBrowser images={galleryImages} />
      </section>
    </>
  );
}
