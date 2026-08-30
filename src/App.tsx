import { LangProvider, useT } from "./i18n/lang";
import { SmoothScroll } from "./components/SmoothScroll";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Philosophy } from "./components/Philosophy";
import { Menu } from "./components/Menu";
import { Space } from "./components/Space";
import { Reservation } from "./components/Reservation";
import { Footer } from "./components/Footer";

function Site() {
  const t = useT();
  return (
    <SmoothScroll>
      <a className="skip-link" href="#menu">
        {t.skipLink}
      </a>
      <Nav />
      <main>
        <Hero />
        <Philosophy />
        <Menu />
        <Space />
        <Reservation />
      </main>
      <Footer />
    </SmoothScroll>
  );
}

export function App() {
  return (
    <LangProvider>
      <Site />
    </LangProvider>
  );
}
