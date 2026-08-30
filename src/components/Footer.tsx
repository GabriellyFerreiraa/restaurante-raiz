import { useT } from "../i18n/lang";
import { useScrollTo } from "./SmoothScroll";
import "./Footer.css";

const GITHUB_URL = "https://github.com/GabriellyFerreiraa";
const LINKEDIN_URL =
  "https://www.linkedin.com/in/gabrielly-ferreira-619609113/";

export function Footer() {
  const t = useT();
  const f = t.footer;
  const scrollTo = useScrollTo();
  const year = new Date().getFullYear();

  return (
    <footer className="footer" id="visita">
      <div className="footer__grid container container--wide">
        <div className="footer__brand">
          <p className="footer__word">Raíz</p>
          <p className="footer__tagline">{f.tagline}</p>
        </div>

        <div className="footer__col">
          <h3>{f.visit}</h3>
          <address>
            {f.address[0]}
            <br />
            {f.address[1]}
          </address>
          <p>
            <a
              href="https://maps.google.com/?q=Gorriti+4820+Buenos+Aires"
              target="_blank"
              rel="noreferrer noopener"
            >
              {f.directions}
            </a>
          </p>
        </div>

        <div className="footer__col">
          <h3>{f.hours}</h3>
          <p>
            {f.hoursLine1}
            <br />
            {f.hoursLine2}
          </p>
          <p className="footer__muted">{f.closed}</p>
        </div>

        <div className="footer__col">
          <h3>{f.contact}</h3>
          <p>
            <a href="tel:+541148200000">+54 11 4820 0000</a>
            <br />
            <a href="mailto:hola@raiz.rest">hola@raiz.rest</a>
          </p>
          <p className="footer__social">
            <a href="https://instagram.com" target="_blank" rel="noreferrer noopener">
              Instagram
            </a>
            <a href="https://ig.com" target="_blank" rel="noreferrer noopener">
              {f.newsletter}
            </a>
          </p>
        </div>
      </div>

      <div className="footer__bar container container--wide">
        <button type="button" onClick={() => scrollTo("#top")}>
          {f.backToTop} ↑
        </button>
        <div className="footer__meta">
          <p className="footer__author">
            {f.author}
            <span className="footer__author-links">
              <a href={GITHUB_URL} target="_blank" rel="noreferrer noopener">
                GitHub
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer noopener">
                LinkedIn
              </a>
            </span>
          </p>
          <p>{f.rights(year)}</p>
        </div>
      </div>
    </footer>
  );
}
