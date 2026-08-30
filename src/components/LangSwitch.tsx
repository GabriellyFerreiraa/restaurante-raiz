import { useLang } from "../i18n/lang";
import { LANG_OPTIONS } from "../i18n/strings";
import "./LangSwitch.css";

export function LangSwitch({ className }: { className?: string }) {
  const { lang, setLang, t } = useLang();

  return (
    <div
      className={`langsw${className ? ` ${className}` : ""}`}
      role="group"
      aria-label={t.langLabel}
    >
      {LANG_OPTIONS.map((opt, i) => (
        <span key={opt.code} className="langsw__item">
          {i > 0 && (
            <span className="langsw__sep" aria-hidden="true">
              /
            </span>
          )}
          <button
            type="button"
            className="langsw__btn"
            data-on={opt.code === lang}
            aria-pressed={opt.code === lang}
            onClick={() => setLang(opt.code)}
          >
            {opt.label}
          </button>
        </span>
      ))}
    </div>
  );
}
