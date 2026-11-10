import Link from "next/link";
import { site } from "@/data/site";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className="shell">
        <div className={styles.top}>
          <div>
            <span className={`wordmark ${styles.brandName}`}>{site.name}</span>
            <p className={styles.blurb}>
              Diseño arquitectónico responsable y soluciones constructivas para
              proyectos residenciales, comerciales e institucionales en
              Honduras.
            </p>
          </div>

          <div>
            <h2 className={styles.colTitle}>Estudio</h2>
            <ul className={styles.list}>
              <li>
                <Link href="/nosotros">Nosotros</Link>
              </li>
              <li>
                <Link href="/servicios">Servicios</Link>
              </li>
              <li>
                <Link href="/procesos">Procesos</Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className={styles.colTitle}>Obra</h2>
            <ul className={styles.list}>
              <li>
                <Link href="/portafolio">Portafolio</Link>
              </li>
              <li>
                <Link href="/proyectos">Proyectos</Link>
              </li>
              <li>
                <Link href="/galeria">Galería</Link>
              </li>
              <li>
                <Link href="/cotizaciones">Cotizaciones</Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className={styles.colTitle}>Contacto</h2>
            <ul className={styles.list}>
              <li>
                <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <a href={site.social.instagram} target="_blank" rel="noopener">
                  Instagram
                </a>
              </li>
              <li>
                <a href={site.social.facebook} target="_blank" rel="noopener">
                  Facebook
                </a>
              </li>
            </ul>
            <div style={{ marginTop: "1.25rem" }}>
              {site.hours.map((h) => (
                <div key={h.days} className={styles.hours}>
                  <span>{h.days}</span>
                  <span>{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © {site.copyrightYear} {site.name}. Todos los derechos
            reservados.
          </p>
          <p>
            {site.city}, {site.country}
          </p>
        </div>
      </div>
    </footer>
  );
}
