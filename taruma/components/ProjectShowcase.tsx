"use client";

import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/data/work";
import Lightbox from "./Lightbox";
import styles from "./ProjectShowcase.module.css";

const STRIP = 4;

export default function ProjectShowcase({
  project,
  first = false,
  flip = false,
}: {
  project: Project;
  first?: boolean;
  flip?: boolean;
}) {
  const [index, setIndex] = useState<number | null>(null);

  const items = project.images.map((img) => ({
    src: img.src,
    alt: img.alt,
    title: project.title,
    meta: `${project.category}. ${project.location}, ${project.year}`,
  }));

  const strip = project.images.slice(1, 1 + STRIP);
  const remaining = project.images.length - 1 - strip.length;

  return (
    <article
      className={`${styles.project} ${first ? styles.projectFirst : ""} ${
        flip ? styles.flip : ""
      }`}
    >
      <div className={styles.visual}>
        <button
          type="button"
          className={styles.hero}
          onClick={() => setIndex(0)}
          aria-label={`Ampliar imágenes de ${project.title}`}
        >
          <Image
            src={project.images[0].src}
            alt={project.images[0].alt}
            width={1400}
            height={963}
            sizes="(max-width: 1000px) 100vw, 55vw"
          />
          <span className={styles.heroHint}>
            {project.images.length}{" "}
            {project.images.length === 1 ? "imagen" : "imágenes"}
          </span>
        </button>

        {strip.length > 0 && (
          <div className={styles.strip}>
            {strip.map((img, i) => {
              const isLast = i === strip.length - 1 && remaining > 0;
              return (
                <button
                  key={img.src}
                  type="button"
                  className={styles.thumb}
                  onClick={() => setIndex(i + 1)}
                  aria-label={
                    isLast
                      ? `Ver las ${remaining + 1} imágenes restantes de ${project.title}`
                      : `Ampliar: ${img.alt}`
                  }
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={400}
                    height={400}
                    sizes="140px"
                  />
                  {isLast && (
                    <span className={styles.more}>+{remaining + 1}</span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div>
        <h2 className={styles.title}>{project.title}</h2>
        <p className={styles.desc}>{project.description}</p>

        <dl className={styles.specs}>
          <div className={styles.spec}>
            <dt className={styles.specKey}>Categoría</dt>
            <dd className={styles.specVal}>{project.category}</dd>
          </div>
          <div className={styles.spec}>
            <dt className={styles.specKey}>Ubicación</dt>
            <dd className={styles.specVal}>{project.location}</dd>
          </div>
          <div className={styles.spec}>
            <dt className={styles.specKey}>Año</dt>
            <dd className={styles.specVal}>{project.year}</dd>
          </div>
          <div className={styles.spec}>
            <dt className={styles.specKey}>Alcance</dt>
            <dd className={styles.specVal}>{project.service}</dd>
          </div>
        </dl>

        <button
          type="button"
          className={`btn btn-line ${styles.open}`}
          onClick={() => setIndex(0)}
        >
          Ver las {project.images.length} imágenes
        </button>
      </div>

      {index !== null && (
        <Lightbox
          items={items}
          index={index}
          onIndexChange={setIndex}
          onClose={() => setIndex(null)}
        />
      )}
    </article>
  );
}
