import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useScrolled } from "../hooks/useScrolled";
import { useScrollTo } from "./SmoothScroll";
import "./Nav.css";

const LINKS = [
  { href: "#filosofia", label: "Filosofía" },
  { href: "#menu", label: "Menú" },
  { href: "#mesa", label: "La mesa" },
  { href: "#visita", label: "Visitá" },
];

export function Nav() {
  const scrolled = useScrolled(24);
  const scrollTo = useScrollTo();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const go = (href: string) => {
    setMenuOpen(false);
    scrollTo(href);
  };

  return (
    <header className="nav" data-scrolled={scrolled} data-open={menuOpen}>
      <div className="nav__bar container container--wide">
        <a
          className="nav__brand"
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            go("#top");
          }}
        >
          Raíz
          <span className="nav__brand-mark" aria-hidden="true" />
        </a>

        <nav className="nav__links" aria-label="Secciones">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                go(link.href);
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="nav__cta"
          onClick={() => go("#reservar")}
        >
          Reservar
        </button>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={menuOpen}
          aria-controls="nav-drawer"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="u-visually-hidden">
            {menuOpen ? "Cerrar menú" : "Abrir menú"}
          </span>
          <span className="nav__toggle-lines" aria-hidden="true" />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="nav-drawer"
            className="nav__drawer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(link.href);
                }}
              >
                {link.label}
              </a>
            ))}
            <button type="button" onClick={() => go("#reservar")}>
              Reservar una mesa
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
