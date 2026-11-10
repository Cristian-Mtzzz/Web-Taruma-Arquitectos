import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import QuoteWizard from "@/components/QuoteWizard";
import { quoteRequirements, quoteTimeline } from "@/data/editorial";
import s from "../shared.module.css";

export const metadata: Metadata = {
  title: "Cotizaciones",
  description:
    "Solicite una cotización a Taruma Arquitectos. Complete el formulario en tres pasos y reciba una propuesta preliminar en cinco días hábiles.",
};

export default function CotizacionesPage() {
  return (
    <>
      <PageHeader
        title="Cotizaciones"
        lede="Tres pasos, unos dos minutos. Con esa información le preparamos una propuesta ajustada a su proyecto."
      />

      <section className="band band-vellum">
        <div className="shell">
          <QuoteWizard />
        </div>
      </section>

      <section className="band band-paper">
        <div className="shell">
          <div className={s.sectionHead}>
            <div>
              <h2 className="heading">Qué pasa después de enviar</h2>
              <p className="lede" style={{ marginTop: "0.9rem" }}>
                Los tiempos a los que nos comprometemos desde que recibimos su
                solicitud.
              </p>
            </div>
          </div>

          <dl className={s.dataRows}>
            {quoteTimeline.map((item) => (
              <div key={item.step} className={s.dataRow}>
                <dt className={s.dataKey}>{item.step}</dt>
                <dd className={s.dataVal}>{item.text}</dd>
                <dd className={s.dataNote}>{item.when}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="band band-dark">
        <div className="shell">
          <h2 className="heading" style={{ color: "var(--white)" }}>
            Lo que conviene tener a mano
          </h2>
          <hr className="accent-rule" style={{ marginBlock: "1.4rem" }} />
          <ul
            style={{
              listStyle: "none",
              maxWidth: "60ch",
              borderTop: "1px solid var(--line-light)",
            }}
          >
            {quoteRequirements.map((req) => (
              <li
                key={req}
                style={{
                  padding: "0.9rem 0",
                  borderBottom: "1px solid var(--line-light)",
                  color: "rgba(237,238,234,0.78)",
                }}
              >
                {req}
              </li>
            ))}
          </ul>
          <p
            className="lede"
            style={{ marginTop: "1.5rem", fontSize: "0.95rem" }}
          >
            Si todavía no tiene esta información, puede enviar la solicitud de
            todas formas. La revisamos en la reunión inicial, que es gratuita.
          </p>
        </div>
      </section>
    </>
  );
}
