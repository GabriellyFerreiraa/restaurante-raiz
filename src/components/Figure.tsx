import { useCallback, useState } from "react";
import { photoSrc, type Photo } from "../data/images";
import "./Figure.css";

const WIDTHS = [640, 960, 1280, 1920, 2400];

interface FigureProps {
  photo: Photo;
  /** describe el tamaño de render para elegir la resolución correcta */
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/** Imagen responsive con color de respaldo mientras carga (o si falla). */
export function Figure({
  photo,
  sizes = "100vw",
  priority = false,
  className,
}: FigureProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  // si la imagen ya estaba en caché, `onLoad` puede no dispararse
  const imgRef = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete && node.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    <span
      className={`figure${className ? ` ${className}` : ""}`}
      data-loaded={loaded}
      style={{ backgroundColor: photo.tone }}
    >
      {!failed && (
        <img
          ref={imgRef}
          src={photoSrc(photo, 1280)}
          srcSet={WIDTHS.map((w) => `${photoSrc(photo, w)} ${w}w`).join(", ")}
          sizes={sizes}
          alt={photo.alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          style={{ objectPosition: photo.focus ?? "50% 50%" }}
        />
      )}
    </span>
  );
}
