import { dict, type Lang } from "@/i18n";

const STORAGE_KEY = "lang";

function getPath(obj: unknown, path: string): unknown {
  return path
    .split(".")
    .reduce<unknown>(
      (acc, key) => (acc && typeof acc === "object" ? (acc as Record<string, unknown>)[key] : undefined),
      obj,
    );
}

export function getLang(): Lang {
  const stored = typeof localStorage !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
  return stored === "en" ? "en" : "es";
}

export function translate(lang: Lang, path: string): string | undefined {
  const value = getPath(dict[lang], path);
  return typeof value === "string" ? value : undefined;
}

export function applyLang(lang: Lang, root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
    const path = el.dataset.i18n;
    if (!path) return;
    const value = translate(lang, path);
    if (value === undefined) return;

    const attr = el.dataset.i18nAttr;
    if (attr) {
      el.setAttribute(attr, value);
    } else {
      el.textContent = value;
    }
  });

  document.documentElement.lang = lang;
}

export function setLang(lang: Lang) {
  localStorage.setItem(STORAGE_KEY, lang);
  applyLang(lang);
  document.dispatchEvent(new CustomEvent<Lang>("langchange", { detail: lang }));
}

export function initI18n() {
  const lang = getLang();
  applyLang(lang);
  document.dispatchEvent(new CustomEvent<Lang>("langchange", { detail: lang }));
}
