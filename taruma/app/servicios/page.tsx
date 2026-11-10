import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { services } from "@/data/studio";
import s from "../shared.module.css";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Diseño arquitectónico, construcción, gestión de proyectos, urbanismo, interiorismo y consultoría técnica en Honduras.",
};

export default function ServiciosPage() {
  return (
    <>
      <PageHeader
        title="Servicios"
        lede="Seis frentes de trabajo que se contratan por separado o como un paquete llave en mano."
      />

      <section className="band band-paper">
        <div className="shell">
          <div className={`${s.cardGrid} ${s.cardGrid3}`}>
            {services.map((service) => (
              <article key={service.title} className={s.card}>
                <h2 className={s.cardTitle}>{service.title}</h2>
                <p className={s.cardText}>{service.description}</p>
                <ul className={s.cardList}>
                  {service.scope.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <div className={s.sectionHead}>
            <div>
              <h2 className="heading">Cómo se contrata</h2>
              <p className="lede" style={{ marginTop: "0.9rem" }}>
                No todos los proyectos necesitan todo. Estas son las tres formas
                en que normalmente trabajamos.
              </p>
            </div>
          </div>

          <dl className={s.dataRows}>
            <div className={s.dataRow}>
              <dt className={s.dataKey}>Solo diseño</dt>
              <dd className={s.dataVal}>
                Entregamos el proyecto completo con planos ejecutivos y
                permisos. Usted contrata la construcción con quien prefiera.
              </dd>
              <dd className={s.dataNote}>Desde el anteproyecto</dd>
            </div>
            <div className={s.dataRow}>
              <dt className={s.dataKey}>Solo construcción</dt>
              <dd className={s.dataVal}>
                Si ya tiene planos, ejecutamos y supervisamos la obra con
                control de costos y calidad de materiales.
              </dd>
              <dd className={s.dataNote}>Con planos existentes</dd>
            </div>
            <div className={s.dataRow}>
              <dt className={s.dataKey}>Llave en mano</dt>
              <dd className={s.dataVal}>
                Diseño y obra con un solo responsable. Es la vía con menos
                fricción: lo que se dibuja es lo que se construye.
              </dd>
              <dd className={s.dataNote}>Diseño y obra</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="band band-dark">
        <div className={`shell ${s.closer}`}>
          <h2 className="subheading" style={{ color: "var(--white)" }}>
            Díganos el alcance y le preparamos una propuesta
          </h2>
          <div className={s.closerActions}>
            <Link href="/cotizaciones" className="btn btn-accent">
              Pedir cotización
            </Link>
            <Link href="/procesos" className="btn btn-line">
              Ver el proceso
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
