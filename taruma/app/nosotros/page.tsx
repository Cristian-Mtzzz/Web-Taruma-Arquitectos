import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { site } from "@/data/site";
import { history, philosophy, pillars, team, values } from "@/data/studio";
import s from "../shared.module.css";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Historia, misión, visión, valores y equipo de Taruma Arquitectos, despacho de arquitectura y construcción en Tegucigalpa, Honduras.",
};

export default function NosotrosPage() {
  return (
    <>
      <PageHeader
        title="Nosotros"
        lede="Quiénes somos, cómo trabajamos y qué nos comprometemos a entregar en cada proyecto."
      />

      {/* Historia */}
      <section className="band band-paper">
        <div className={`shell ${s.split}`}>
          <figure className={s.splitFigure}>
            <Image
              src="/img/complejo-habitacional-lipidario2.png"
              alt="Complejo Habitacional Lapidario, proyecto de uso mixto de Taruma Arquitectos"
              width={900}
              height={1125}
              sizes="(max-width: 1000px) 100vw, 42vw"
            />
          </figure>

          <div>
            <h2 className="heading">{history.title}</h2>
            <hr className="marker-rule" style={{ marginBlock: "1.4rem" }} />
            <div className="prose">
              {history.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            <dl className={s.dataRows} style={{ marginTop: "2.5rem" }}>
              <div className={s.dataRow}>
                <dt className={s.dataKey}>Sede</dt>
                <dd className={s.dataVal}>
                  {site.city}, {site.country}
                </dd>
              </div>
              <div className={s.dataRow}>
                <dt className={s.dataKey}>Fundación</dt>
                <dd className={s.dataVal}>{site.founded}</dd>
              </div>
              <div className={s.dataRow}>
                <dt className={s.dataKey}>Cobertura</dt>
                <dd className={s.dataVal}>
                  Todo el territorio nacional, con visitas de campo coordinadas
                  según la ubicación del proyecto.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Misión y visión */}
      <section className="band">
        <div className="shell">
          <div className={`${s.cardGrid} ${s.cardGrid2}`}>
            {pillars.map((item) => (
              <div key={item.title} className={s.card}>
                <h2 className={s.cardTitle}>{item.title}</h2>
                <p className={s.cardText}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="band band-paper">
        <div className="shell">
          <div className={s.sectionHead}>
            <div>
              <h2 className="heading">Nuestros valores</h2>
              <p className="lede" style={{ marginTop: "0.9rem" }}>
                Cuatro criterios que usamos para tomar decisiones cuando un
                proyecto obliga a elegir.
              </p>
            </div>
          </div>

          <div className={`${s.cardGrid} ${s.cardGrid4}`}>
            {values.map((value) => (
              <div key={value.title} className={s.card}>
                <h3 className={s.cardTitle}>{value.title}</h3>
                <p className={s.cardText}>{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="band band-vellum">
        <div className="shell">
          <div className={s.sectionHead}>
            <div>
              <h2 className="heading">El equipo</h2>
              <p className="lede" style={{ marginTop: "0.9rem" }}>
                {team.intro}
              </p>
            </div>
          </div>

          <div className={s.teamGrid}>
            {team.members.map((member) => (
              <div key={member.name} className={s.member}>
                <figure>
                  <Image
                    src={member.src}
                    alt={`${member.name}, ${member.role.toLowerCase()} en ${site.name}`}
                    width={600}
                    height={600}
                    sizes="(max-width: 620px) 100vw, 400px"
                  />
                </figure>
                <p className={s.memberName}>{member.name}</p>
                <p className={s.memberRole}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filosofía */}
      <section className="band band-deep">
        <div className="gridlines" aria-hidden="true" />
        <div className="shell" style={{ position: "relative" }}>
          <h2 className="heading" style={{ color: "var(--white)" }}>
            {philosophy.title}
          </h2>
          <hr className="marker-rule" style={{ marginBlock: "1.4rem" }} />
          <p
            className="prose"
            style={{
              fontSize: "clamp(1.05rem, 1.6vw, 1.25rem)",
              color: "rgba(237,238,234,0.78)",
            }}
          >
            {philosophy.text}
          </p>
        </div>
      </section>

      {/* Cierre */}
      <section className="band band-paper">
        <div className={`shell ${s.closer}`}>
          <h2 className="subheading">
            ¿Quiere conocer cómo llevamos un proyecto de la idea a la obra?
          </h2>
          <div className={s.closerActions}>
            <Link href="/procesos" className="btn btn-solid">
              Ver nuestro proceso
            </Link>
            <Link href="/contacto" className="btn btn-line">
              Hablar con el estudio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
