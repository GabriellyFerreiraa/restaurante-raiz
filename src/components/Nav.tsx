import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useScrolled } from "../hooks/useScrolled";
import { useT } from "../i18n/lang";
import { useScrollTo } from "./SmoothScroll";
import { LangSwitch } from "./LangSwitch";
import "./Nav.css";

export function Nav() {
  const t = useT();
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

  const links = [
    { href: "#filosofia", label: t.nav.links.filosofia },
    { href: "#menu", label: t.nav.links.menu },
    { href: "#mesa", label: t.nav.links.mesa },
    { href: "#visita", label: t.nav.links.visita },
  ];

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

        <nav className="nav__links" aria-label={t.nav.sectionsAria}>
          {links.map((link) => (
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

        <LangSwitch className="nav__lang" />

        <button type="button" className="nav__cta" onClick={() => go("#reservar")}>
          {t.nav.cta}
        </button>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={menuOpen}
          aria-controls="nav-drawer"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="u-visually-hidden">
            {menuOpen ? t.nav.close : t.nav.open}
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
            {links.map((link) => (
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
              {t.nav.ctaFull}
            </button>
            <LangSwitch className="langsw--drawer" />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
