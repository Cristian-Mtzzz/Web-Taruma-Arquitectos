import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { processStages } from "@/data/studio";
import s from "../shared.module.css";

export const metadata: Metadata = {
  title: "Procesos",
  description:
    "Las cuatro etapas de un proyecto con Taruma Arquitectos: etapa conceptual, desarrollo de diseño, proyecto ejecutivo y construcción.",
};

export default function ProcesosPage() {
  return (
    <>
      <PageHeader
        title="Procesos"
        lede="Cuatro etapas, en orden, con entregables y plazos definidos desde el inicio."
      />

      <section className="band band-paper">
        <div className="shell">
          <div className={s.steps}>
            {processStages.map((stage) => (
              <article key={stage.stage} className={s.step}>
                <span className={s.stepNum} aria-hidden="true" />
                <div>
                  <h2 className={s.stepName}>{stage.stage}</h2>
                  <span className={s.stepDeliverable}>
                    Entregable: {stage.deliverable}
                  </span>
                </div>
                <p className={s.stepText}>{stage.description}</p>
                <span className={s.stepWhen}>{stage.duration}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <div className={s.sectionHead}>
            <div>
              <h2 className="heading">Qué necesitamos de usted</h2>
              <p className="lede" style={{ marginTop: "0.9rem" }}>
                Mientras más completa sea la información inicial, más preciso es
                el presupuesto y menos cambios hay después.
              </p>
            </div>
          </div>

          <div className={`${s.cardGrid} ${s.cardGrid3}`}>
            <div className={s.card}>
              <h3 className={s.cardTitle}>Antes de empezar</h3>
              <ul className={s.cardList}>
                <li>Medidas aproximadas del terreno o espacio</li>
                <li>Documentación de propiedad, si aplica</li>
                <li>Presupuesto estimado y plazo deseado</li>
                <li>Referencias o ideas de diseño, opcional</li>
              </ul>
            </div>
            <div className={s.card}>
              <h3 className={s.cardTitle}>Durante el diseño</h3>
              <ul className={s.cardList}>
                <li>Revisión y aprobación de cada entrega</li>
                <li>Decisiones sobre acabados y materiales</li>
                <li>Una contraparte designada para aprobar cambios</li>
              </ul>
            </div>
            <div className={s.card}>
              <h3 className={s.cardTitle}>Durante la obra</h3>
              <ul className={s.cardList}>
                <li>Acceso al sitio para la supervisión</li>
                <li>Aprobación de órdenes de cambio</li>
                <li>Pagos según el avance acordado</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="band band-dark">
        <div className={`shell ${s.closer}`}>
          <h2 className="subheading" style={{ color: "var(--white)" }}>
            Empecemos por la etapa conceptual
          </h2>
          <div className={s.closerActions}>
            <Link href="/cotizaciones" className="btn btn-accent">
              Pedir cotización
            </Link>
            <Link href="/proyectos" className="btn btn-line">
              Ver obra terminada
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
