import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { news, philosophy, services, specialties } from "@/data/studio";
import { featured, projects } from "@/data/work";
import styles from "./home.module.css";

const projectCount = projects.length;

export default function HomePage() {
  const cover = featured[0];

  return (
    <>
      {/* ===== Héroe ===== */}
      <section className={`on-dark ${styles.hero}`}>
        <div className="gridlines" aria-hidden="true" />

        <div className={styles.heroBody}>
          <div className={styles.heroText}>
            <p className={styles.heroEyebrow}>
              Despacho de arquitectura en {site.city}, {site.country}
            </p>
            <h1 className={`display ${styles.heroTitle}`}>
              Construimos lo que otros solo dibujan
            </h1>
            <p className={styles.heroDesc}>
              Diseño arquitectónico, construcción y planificación urbana.
              Llevamos cada proyecto del primer boceto a la obra entregada, con
              el mismo equipo de principio a fin.
            </p>
            <div className={styles.heroActions}>
              <Link href="/proyectos" className="btn btn-accent">
                Ver nuestra obra
              </Link>
              <Link href="/cotizaciones" className="btn btn-line">
                Pedir cotización
              </Link>
            </div>
          </div>

          <figure className={styles.heroFigure}>
            <Image
              src={cover.images[0].src}
              alt={cover.images[0].alt}
              fill
              priority
              sizes="(max-width: 1000px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
            <figcaption className={styles.heroCaption}>
              <strong>{cover.title}</strong>
              {cover.location}, {cover.year}
            </figcaption>
          </figure>
        </div>

        {/* Cuadro de rotulación */}
        <div className={`shell ${styles.heroBlock}`}>
          <dl className="titleblock">
            <div>
              <dt className="tb-key">Sede</dt>
              <dd className="tb-val">{site.city}</dd>
            </div>
            <div>
              <dt className="tb-key">Fundación</dt>
              <dd className="tb-val">{site.founded}</dd>
            </div>
            <div>
              <dt className="tb-key">Proyectos</dt>
              <dd className="tb-val">{projectCount}</dd>
            </div>
            <div>
              <dt className="tb-key">Alcance</dt>
              <dd className="tb-val">Nacional</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ===== Especialidades ===== */}
      <div className={styles.specialties}>
        <div className={styles.specialtiesTrack}>
          {[...specialties, ...specialties].map((s, i) => (
            <span key={i}>{s}</span>
          ))}
        </div>
      </div>

      {/* ===== Estudio ===== */}
      <section className="band band-paper">
        <div className={`shell split-reveal ${styles.studio}`}>
          <figure className={styles.studioFigure}>
            <Image
              src="/img/viviendasanjeronimo1.jpg"
              alt="Vivienda San Jerónimo, proyecto residencial de Taruma Arquitectos"
              width={900}
              height={1125}
              sizes="(max-width: 1000px) 100vw, 45vw"
            />
            <figcaption className={styles.studioStamp}>
              <span className={styles.studioStampVal}>Desde {site.founded}</span>
              <span className={styles.studioStampKey}>
                Diseño y obra bajo un mismo techo
              </span>
            </figcaption>
          </figure>

          <div>
            <h2 className="heading">
              Un despacho que también levanta la obra
            </h2>
            <hr className="accent-rule" style={{ marginBlock: "1.4rem" }} />
            <div className="prose">
              <p>
                Somos un despacho con sede en {site.city}. Diseñamos y
                construimos proyectos residenciales, comerciales, turísticos y
                urbanos en todo Honduras, combinando criterio técnico con
                sensibilidad al contexto.
              </p>
              <p>
                Que el diseño y la construcción estén en la misma casa cambia el
                resultado: lo que se dibuja es lo que se puede construir, dentro
                del presupuesto y en el plazo acordado.
              </p>
            </div>

            <div className={styles.pillars}>
              <div className={styles.pillar}>
                <span className={styles.pillarName}>Misión</span>
                <p className={styles.pillarText}>
                  Diseñar espacios innovadores, funcionales y sostenibles que
                  eleven la calidad de vida de quienes los usan.
                </p>
              </div>
              <div className={styles.pillar}>
                <span className={styles.pillarName}>Visión</span>
                <p className={styles.pillarText}>
                  Ser un referente en arquitectura con impacto positivo en la
                  sociedad y el medio ambiente.
                </p>
              </div>
              <div className={styles.pillar}>
                <span className={styles.pillarName}>Compromiso</span>
                <p className={styles.pillarText}>
                  Acompañamos al cliente en cada etapa, del anteproyecto a la
                  entrega de llaves.
                </p>
              </div>
            </div>

            <Link
              href="/nosotros"
              className="link"
              style={{ marginTop: "2rem" }}
            >
              Conocer el estudio
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Servicios ===== */}
      <section className="band">
        <div className="shell">
          <div className={styles.sectionHead}>
            <div>
              <h2 className="heading">Qué hacemos</h2>
              <p className="lede" style={{ marginTop: "0.9rem" }}>
                Seis frentes de trabajo que se pueden contratar por separado o
                como un paquete llave en mano.
              </p>
            </div>
            <Link href="/servicios" className="btn btn-line">
              Ver servicios en detalle
            </Link>
          </div>

          <div className={styles.servicesList}>
            {services.map((service) => (
              <Link
                key={service.title}
                href="/servicios"
                className={styles.serviceRow}
              >
                <span className={styles.serviceName}>{service.title}</span>
                <span className={styles.serviceText}>
                  {service.description}
                </span>
                <span className={styles.serviceGo} aria-hidden="true">
                  Ver
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Obra destacada ===== */}
      <section className="band band-paper">
        <div className="shell">
          <div className={styles.sectionHead}>
            <div>
              <h2 className="heading">Obra reciente</h2>
              <p className="lede" style={{ marginTop: "0.9rem" }}>
                Cómo trabajamos la escala, el material y el contexto, en {featured.length}{" "}
                proyectos.
              </p>
            </div>
            <Link href="/proyectos" className="btn btn-line">
              Ver todos los proyectos
            </Link>
          </div>

          <div className={styles.workGrid}>
            {featured.map((project, i) => (
              <Link
                key={project.slug}
                href="/proyectos"
                className={styles.workCard}
              >
                <Image
                  src={project.images[0].src}
                  alt={project.images[0].alt}
                  width={1200}
                  height={900}
                  className={styles.workImg}
                  sizes={
                    i === 0
                      ? "(max-width: 620px) 100vw, 50vw"
                      : "(max-width: 620px) 100vw, 25vw"
                  }
                />
                <div className={styles.workMeta}>
                  <p className={styles.workCat}>{project.category}</p>
                  <p className={styles.workName}>{project.title}</p>
                  <p className={styles.workPlace}>
                    {project.location}, {project.year}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Filosofía ===== */}
      <section className={`band band-deep ${styles.quoteBand}`}>
        <div className="gridlines" aria-hidden="true" />
        <div className="shell">
          <blockquote className={styles.quote}>
            {philosophy.quote}
            <cite className={styles.quoteWho}>{site.name}</cite>
          </blockquote>
        </div>
      </section>

      {/* ===== Noticias ===== */}
      <section className="band band-vellum">
        <div className="shell">
          <div className={styles.sectionHead}>
            <div>
              <h2 className="heading">El estudio en marcha</h2>
              <p className="lede" style={{ marginTop: "0.9rem" }}>
                Hitos recientes y lo que viene para el despacho.
              </p>
            </div>
            <Link href="/nosotros" className="btn btn-line">
              Conocer el estudio
            </Link>
          </div>

          <div className={styles.newsGrid}>
            {news.map((item) => (
              <article key={item.date} className={styles.newsItem}>
                <span className={styles.newsWhen}>{item.date}</span>
                <p className={styles.newsText}>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Cierre ===== */}
      <section className="band band-dark">
        <div className={`shell ${styles.closer}`}>
          <div>
            <h2 className="heading" style={{ color: "var(--white)" }}>
              Cuéntenos qué quiere construir
            </h2>
            <p className="lede" style={{ marginTop: "1rem" }}>
              La primera consulta es gratuita. Revisamos su terreno, su
              presupuesto y los plazos, y le decimos con franqueza qué es
              posible.
            </p>
            <div className={styles.closerActions}>
              <Link href="/cotizaciones" className="btn btn-accent">
                Pedir cotización
              </Link>
              <Link href="/contacto" className="btn btn-line">
                Hablar con el estudio
              </Link>
            </div>
          </div>

          <dl className={styles.closerAside}>
            <dt>Teléfono</dt>
            <dd>{site.phone}</dd>
            <dt>Correo</dt>
            <dd style={{ fontSize: "1rem", wordBreak: "break-word" }}>
              {site.email}
            </dd>
            <dt>Respuesta</dt>
            <dd>Menos de 24 h hábiles</dd>
          </dl>
        </div>
      </section>
    </>
  );
}
