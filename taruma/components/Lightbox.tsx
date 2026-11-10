"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./Lightbox.module.css";

export type LightboxItem = {
  src: string;
  alt: string;
  title?: string;
  meta?: string;
};

type Props = {
  items: LightboxItem[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export default function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: Props) {
  const total = items.length;
  const dialogRef = useRef<HTMLDivElement>(null);

  // Mueve el foco al visor al abrirlo y lo devuelve al cerrarlo
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    return () => previous?.focus?.();
  }, []);

  const go = useCallback(
    (delta: number) => {
      onIndexChange((index + delta + total) % total);
    },
    [index, total, onIndexChange]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [go, onClose]);

  const item = items[index];
  if (!item) return null;

  return (
    <div
      ref={dialogRef}
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label={item.title ?? "Imagen del proyecto"}
      tabIndex={-1}
    >
      <div className={styles.bar}>
        <span className={styles.count}>
          {index + 1} de {total}
        </span>
        <button type="button" className={styles.close} onClick={onClose}>
          Cerrar
        </button>
      </div>

      <div className={styles.stage}>
        {total > 1 && (
          <button
            type="button"
            className={styles.arrow}
            onClick={() => go(-1)}
            aria-label="Imagen anterior"
          >
            &#8592;
          </button>
        )}

        <div className={styles.frame}>
          <Image
            src={item.src}
            alt={item.alt}
            width={1800}
            height={1200}
            sizes="100vw"
            priority
          />
        </div>

        {total > 1 && (
          <button
            type="button"
            className={styles.arrow}
            onClick={() => go(1)}
            aria-label="Imagen siguiente"
          >
            &#8594;
          </button>
        )}
      </div>

      <div className={styles.caption}>
        {item.title && <p className={styles.captionTitle}>{item.title}</p>}
        <p className={styles.captionText}>{item.meta ?? item.alt}</p>
      </div>
    </div>
  );
}
