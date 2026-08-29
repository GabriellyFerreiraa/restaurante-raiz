import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";

type ScrollTarget = string | number | HTMLElement;
const ScrollCtx = createContext<(target: ScrollTarget) => void>(() => {});

/** Hook para desplazar suavemente a un ancla (`#menu`) o posición. */
export const useScrollTo = () => useContext(ScrollCtx);

const HEADER_OFFSET = -72;

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduceMotion]);

  const scrollTo = useCallback(
    (target: ScrollTarget) => {
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target, { offset: HEADER_OFFSET });
        return;
      }
      const el =
        typeof target === "string" ? document.querySelector(target) : null;
      (el instanceof HTMLElement ? el : null)?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    },
    [reduceMotion],
  );

  return <ScrollCtx.Provider value={scrollTo}>{children}</ScrollCtx.Provider>;
}
