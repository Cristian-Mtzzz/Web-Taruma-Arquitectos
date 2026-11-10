import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ProjectShowcase from "@/components/ProjectShowcase";
import { projects } from "@/data/work";
import s from "../shared.module.css";

export const metadata: Metadata = {
  title: "Proyectos destacados",
  description:
    "Proyectos destacados de Taruma Arquitectos: complejos habitacionales, deportivos y turísticos, urbanizaciones, plazas comerciales y vivienda en Honduras.",
};

// Los seis proyectos de mayor escala, en orden de presentación
const showcase = [
  "complejo-habitacional-lapidario",
  "urbanizacion-rubra",
  "cabanas-the-rubra",
  "complejo-turistico-colonial",
  "complejo-deportivo",
  "la-pizza-nostra",
]
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is (typeof projects)[number] => Boolean(p));

export default function ProyectosPage() {
  return (
    <>
      <PageHeader
        title="Proyectos destacados"
        lede="Seis obras representativas de nuestra práctica, con su alcance, ubicación y el conjunto completo de imágenes."
      />

      <section className="band band-paper">
        <div className="shell">
          {showcase.map((project, i) => (
            <ProjectShowcase
              key={project.slug}
              project={project}
              first={i === 0}
              flip={i % 2 === 1}
            />
          ))}
        </div>
      </section>

      <section className="band band-dark">
        <div className={`shell ${s.closer}`}>
          <h2 className="subheading" style={{ color: "var(--white)" }}>
            El portafolio completo tiene {projects.length} proyectos
          </h2>
          <div className={s.closerActions}>
            <Link href="/portafolio" className="btn btn-accent">
              Ver el portafolio
            </Link>
            <Link href="/cotizaciones" className="btn btn-line">
              Pedir cotización
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
