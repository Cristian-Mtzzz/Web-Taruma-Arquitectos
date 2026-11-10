import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import PortfolioGrid from "@/components/PortfolioGrid";
import { categories, galleryImages, projects } from "@/data/work";
import s from "../shared.module.css";

export const metadata: Metadata = {
  title: "Portafolio",
  description:
    "Índice completo de proyectos de Taruma Arquitectos, filtrable por categoría: residencial, comercial, institucional, turístico, urbano e industrial.",
};

export default function PortafolioPage() {
  return (
    <>
      <PageHeader
        title="Portafolio"
        lede={`${projects.length} proyectos y ${galleryImages.length} imágenes. Filtre por categoría y abra cualquiera para ver el conjunto completo.`}
      />

      <section className="band band-paper">
        <div className="shell sin-revelado">
          <PortfolioGrid projects={projects} categories={categories} />
        </div>
      </section>

      <section className="band band-dark">
        <div className={`shell ${s.closer}`}>
          <h2 className="subheading" style={{ color: "var(--white)" }}>
            ¿Busca algo parecido a uno de estos proyectos?
          </h2>
          <div className={s.closerActions}>
            <Link href="/cotizaciones" className="btn btn-accent">
              Pedir cotización
            </Link>
            <Link href="/galeria" className="btn btn-line">
              Ver la galería
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
