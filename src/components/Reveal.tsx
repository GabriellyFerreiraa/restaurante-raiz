import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 22 },
  shown: { opacity: 1, y: 0 },
};

interface RevealProps {
  children: ReactNode;
  /** retardo en segundos */
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Envuelve su contenido y lo hace aparecer al entrar en viewport.
 * Respeta `prefers-reduced-motion` (se muestra sin desplazamiento).
 */
export function Reveal({ children, delay = 0, className, style }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={style}
      initial={reduceMotion ? "shown" : "hidden"}
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={variants}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
