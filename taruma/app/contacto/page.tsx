import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import Faq from "@/components/Faq";
import { faq } from "@/data/editorial";
import { site } from "@/data/site";
import s from "../shared.module.css";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacte a Taruma Arquitectos en Tegucigalpa, Honduras. Teléfono, correo, horarios y formulario de consulta. La primera reunión es gratuita.",
};

export default function ContactoPage() {
  return (
    <>
      <PageHeader
        title="Contacto"
        lede="Cuéntenos sobre su proyecto. La primera consulta es gratuita y sin compromiso."
      />

      <section className="band band-paper">
        <div className={`shell split-reveal ${s.split}`}>
          <div>
            <h2 className="subheading">Datos del estudio</h2>
            <hr className="accent-rule" style={{ marginBlock: "1.2rem" }} />

            <dl className={s.dataRows}>
              <div className={s.dataRow}>
                <dt className={s.dataKey}>Teléfono</dt>
                <dd className={s.dataVal}>
                  <a href={`tel:${site.phoneHref}`} className="link">
                    {site.phone}
                  </a>
                  <br />
                  <a
                    href={`https://wa.me/${site.whatsapp}`}
                    className="link"
                    target="_blank"
                    rel="noopener"
                  >
                    Escribir por WhatsApp
                  </a>
                </dd>
              </div>
              <div className={s.dataRow}>
                <dt className={s.dataKey}>Correo</dt>
                <dd className={s.dataVal}>
                  <a href={`mailto:${site.email}`} className="link">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className={s.dataRow}>
                <dt className={s.dataKey}>Ubicación</dt>
                <dd className={s.dataVal}>
                  {site.city}, {site.country}
                  <br />
                  Coordinamos visitas de campo en todo el país.
                </dd>
              </div>
              <div className={s.dataRow}>
                <dt className={s.dataKey}>Horarios</dt>
                <dd className={s.dataVal}>
                  {site.hours.map((h) => (
                    <span key={h.days} style={{ display: "block" }}>
                      {h.days}: {h.time}
                    </span>
                  ))}
                </dd>
              </div>
              <div className={s.dataRow}>
                <dt className={s.dataKey}>Redes</dt>
                <dd className={s.dataVal}>
                  <a
                    href={site.social.instagram}
                    className="link"
                    target="_blank"
                    rel="noopener"
                  >
                    Instagram
                  </a>
                  {"  "}
                  <a
                    href={site.social.facebook}
                    className="link"
                    target="_blank"
                    rel="noopener"
                    style={{ marginLeft: "1rem" }}
                  >
                    Facebook
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <h2 className="subheading">Escríbanos</h2>
            <hr className="accent-rule" style={{ marginBlock: "1.2rem" }} />
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Ubicación */}
      <section className="band band-vellum">
        <div className="shell">
          <div className={s.sectionHead}>
            <div>
              <h2 className="heading">Dónde estamos</h2>
              <p className="lede" style={{ marginTop: "0.9rem" }}>
                Atendemos en {site.city} y coordinamos visitas de campo en todo
                el país.
              </p>
            </div>
          </div>
          <div
            style={{
              border: "1px solid var(--line-dark)",
              background: "var(--concrete)",
              lineHeight: 0,
            }}
          >
            <iframe
              src={site.mapSrc}
              title={`Ubicación de ${site.name} en ${site.city}`}
              width="100%"
              height="460"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Preguntas frecuentes */}
      <section className="band band-paper">
        <div className="shell">
          <div className={s.sectionHead}>
            <div>
              <h2 className="heading">Preguntas frecuentes</h2>
              <p className="lede" style={{ marginTop: "0.9rem" }}>
                Lo que más nos preguntan antes de la primera reunión.
              </p>
            </div>
          </div>
          <div style={{ maxWidth: "880px" }}>
            <Faq items={faq} />
          </div>
        </div>
      </section>
    </>
  );
}
