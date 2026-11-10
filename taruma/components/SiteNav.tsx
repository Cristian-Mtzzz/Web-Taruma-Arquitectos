"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/data/site";
import styles from "./SiteNav.module.css";

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [oculta, setOculta] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let ultimaY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 48);

      // Se esconde al bajar y reaparece al subir, pero nunca cerca del tope
      // ni con saltos mínimos, que harían parpadear la barra.
      if (Math.abs(y - ultimaY) > 6) {
        setOculta(y > ultimaY && y > 200);
        ultimaY = y;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`on-dark ${styles.nav} ${scrolled ? styles.navScrolled : ""} ${
          oculta && !open ? styles.navOculta : ""
        }`}
      >
        <div className={`shell ${styles.inner}`}>
          <Link href="/" className={styles.brand}>
            {/* alt vacío a propósito: el nombre ya va escrito al lado y el
                lector de pantalla no debe anunciarlo dos veces */}
            <Image
              src="/img/marca-taruma.png"
              alt=""
              width={28}
              height={36}
              className={styles.brandMark}
              priority
            />
            <span className={`wordmark ${styles.brandName}`}>
              {site.name}
            </span>
          </Link>

          <nav aria-label="Navegación principal">
            <ul className={styles.links}>
              {nav.map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`${styles.link} ${
                        active ? styles.linkActive : ""
                      }`}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <Link href="/cotizaciones" className={`btn btn-accent ${styles.cta}`}>
            Pedir cotización
          </Link>

          <button
            type="button"
            className={styles.burger}
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {open && (
        <div className={`on-dark ${styles.panel}`} role="dialog" aria-label="Menú">
          <div className={styles.panelTop}>
            <span className={styles.panelBrand}>
              <Image
                src="/img/marca-taruma.png"
                alt=""
                width={25}
                height={32}
                className={styles.panelMark}
              />
              <span className={`wordmark ${styles.brandName}`}>
                {site.name}
              </span>
            </span>
            <button
              type="button"
              className={styles.panelClose}
              onClick={() => setOpen(false)}
            >
              Cerrar
            </button>
          </div>

          <ul className={styles.panelLinks}>
            {nav.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={styles.panelLink}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                  <span>{String(i + 1).padStart(2, "0")}</span>
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/cotizaciones"
            className={`btn btn-accent ${styles.panelCta}`}
            onClick={() => setOpen(false)}
          >
            Pedir cotización
          </Link>
        </div>
      )}
    </>
  );
}
