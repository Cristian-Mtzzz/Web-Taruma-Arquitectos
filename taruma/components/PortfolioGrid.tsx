"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { Project } from "@/data/work";
import Lightbox from "./Lightbox";
import styles from "./PortfolioGrid.module.css";

type Props = {
  projects: Project[];
  categories: string[];
};

export default function PortfolioGrid({ projects, categories }: Props) {
  const [filter, setFilter] = useState("Todos");
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [index, setIndex] = useState(0);

  const visible = useMemo(
    () =>
      filter === "Todos"
        ? projects
        : projects.filter((p) => p.category === filter),
    [projects, filter]
  );

  return (
    <>
      <div className={styles.toolbar}>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`${styles.chip} ${
              filter === cat ? styles.chipActive : ""
            }`}
            onClick={() => setFilter(cat)}
            aria-pressed={filter === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      <p className={styles.tally} aria-live="polite">
        {visible.length} {visible.length === 1 ? "proyecto" : "proyectos"}
        {filter !== "Todos" ? ` en ${filter.toLowerCase()}` : ""}
      </p>

      <div className={styles.grid}>
        {visible.map((project) => (
          <button
            key={project.slug}
            type="button"
            className={styles.card}
            onClick={() => {
              setOpenProject(project);
              setIndex(0);
            }}
            aria-label={`Ver imágenes de ${project.title}`}
          >
            <div className={styles.frame}>
              <Image
                src={project.images[0].src}
                alt={project.images[0].alt}
                width={900}
                height={675}
                sizes="(max-width: 620px) 100vw, (max-width: 1000px) 50vw, 33vw"
              />
              <span className={styles.shots}>
                {project.images.length}{" "}
                {project.images.length === 1 ? "imagen" : "imágenes"}
              </span>
            </div>

            <div className={styles.body}>
              <span className={styles.name}>{project.title}</span>
              <span className={styles.year}>{project.year}</span>
            </div>

            <div className={styles.meta}>
              <span>{project.category}</span>
              <span>{project.location}</span>
              <span>{project.service}</span>
            </div>
          </button>
        ))}
      </div>

      {openProject && (
        <Lightbox
          items={openProject.images.map((img) => ({
            src: img.src,
            alt: img.alt,
            title: openProject.title,
            meta: `${openProject.category}. ${openProject.location}, ${openProject.year}`,
          }))}
          index={index}
          onIndexChange={setIndex}
          onClose={() => setOpenProject(null)}
        />
      )}
    </>
  );
}
