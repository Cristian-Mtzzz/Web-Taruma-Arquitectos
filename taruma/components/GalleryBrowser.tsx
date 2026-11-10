"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/data/work";
import Lightbox from "./Lightbox";
import styles from "./GalleryBrowser.module.css";

type Props = {
  images: GalleryImage[];
};

export default function GalleryBrowser({ images }: Props) {
  const [filter, setFilter] = useState("Todas");
  const [open, setOpen] = useState<number | null>(null);

  const filters = useMemo(() => {
    const categories = Array.from(new Set(images.map((i) => i.category)));
    const views = Array.from(new Set(images.map((i) => i.view)));
    return ["Todas", ...views, ...categories];
  }, [images]);

  const countFor = (key: string) =>
    key === "Todas"
      ? images.length
      : images.filter((i) => i.category === key || i.view === key).length;

  const visible = useMemo(() => {
    if (filter === "Todas") return images;
    return images.filter((i) => i.category === filter || i.view === filter);
  }, [images, filter]);

  const lightboxItems = visible.map((i) => ({
    src: i.src,
    alt: i.alt,
    title: i.project,
    meta: `${i.category}, ${i.view.toLowerCase()}. ${i.alt}`,
  }));

  return (
    <>
      <div className={styles.filters}>
        <div className={`shell ${styles.filtersInner}`}>
          {filters.map((key) => (
            <button
              key={key}
              type="button"
              className={`${styles.filter} ${
                filter === key ? styles.filterActive : ""
              }`}
              onClick={() => {
                setFilter(key);
                setOpen(null);
              }}
              aria-pressed={filter === key}
            >
              {key}
              <span className={styles.filterCount}>{countFor(key)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="shell">
        <p className={styles.tally} aria-live="polite">
          {visible.length} {visible.length === 1 ? "imagen" : "imágenes"}
          {filter !== "Todas" ? ` en ${filter.toLowerCase()}` : ""}
        </p>

        {visible.length === 0 ? (
          <p className={styles.empty}>
            Todavía no hay imágenes en esta categoría.
          </p>
        ) : (
          <div className={styles.masonry}>
            {visible.map((image, i) => (
              <button
                key={image.src}
                type="button"
                className={styles.tile}
                onClick={() => setOpen(i)}
                aria-label={`Ampliar: ${image.alt}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={800}
                  height={600}
                  sizes="(max-width: 620px) 100vw, (max-width: 1000px) 50vw, 33vw"
                />
                <span className={styles.tileMeta}>
                  <span className={styles.tileCat}>
                    {image.category}, {image.view.toLowerCase()}
                  </span>
                  <span className={styles.tileName}>{image.project}</span>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {open !== null && (
        <Lightbox
          items={lightboxItems}
          index={open}
          onIndexChange={setOpen}
          onClose={() => setOpen(null)}
        />
      )}
    </>
  );
}
