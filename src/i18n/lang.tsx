import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { STRINGS, type Dict, type Lang } from "./strings";

const STORAGE_KEY = "raiz.lang";
// restaurante en Buenos Aires: abre en español (cambiar acá si se quiere otro)
const DEFAULT_LANG: Lang = "es";

interface LangContext {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
}

const Ctx = createContext<LangContext | null>(null);

function readStored(): Lang {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "es" || v === "en" || v === "pt") return v;
  } catch {
    /* localStorage no disponible */
  }
  return DEFAULT_LANG;
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStored);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = STRINGS[lang].docTitle;
  }, [lang]);

  const value = useMemo<LangContext>(
    () => ({ lang, setLang, t: STRINGS[lang] }),
    [lang, setLang],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang(): LangContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang debe usarse dentro de <LangProvider>");
  return ctx;
}

export function useT(): Dict {
  return useLang().t;
}
