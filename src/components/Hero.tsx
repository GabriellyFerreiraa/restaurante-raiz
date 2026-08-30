import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Figure } from "./Figure";
import { photos } from "../data/images";
import { useT } from "../i18n/lang";
import { useScrollTo } from "./SmoothScroll";
import "./Hero.css";

export function Hero() {
  const t = useT();
  const ref = useRef<HTMLElement>(null);
  const scrollTo = useScrollTo();
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "34%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const parallax = !reduceMotion;

  return (
    <section className="hero" id="top" ref={ref}>
      <motion.div
        className="hero__media"
        style={parallax ? { y: imageY } : undefined}
      >
        <Figure
          photo={photos.hero}
          priority
          sizes="100vw"
          className="hero__figure"
        />
        <div className="hero__scrim" />
      </motion.div>

      <motion.div
        className="hero__content container container--wide"
        style={parallax ? { y: contentY, opacity: contentOpacity } : undefined}
      >
        <p className="hero__eyebrow">{t.hero.eyebrow}</p>
        <h1 className="hero__title">
          {t.hero.titleLead}
          <span className="hero__title-accent"> {t.hero.titleAccent}</span>
        </h1>
        <p className="hero__lede">{t.hero.lede}</p>
        <div className="hero__actions">
          <button
            type="button"
            className="btn btn--solid"
            onClick={() => scrollTo("#reservar")}
          >
            {t.hero.ctaReserve}
          </button>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => scrollTo("#menu")}
          >
            {t.hero.ctaMenu}
          </button>
        </div>
      </motion.div>

      <button
        type="button"
        className="hero__cue"
        onClick={() => scrollTo("#filosofia")}
      >
        <span>{t.hero.cue}</span>
        <span className="hero__cue-line" aria-hidden="true" />
      </button>
    </section>
  );
}
