import { es } from "./es";
import { en } from "./en";

export const dict = { es, en };

export type Lang = keyof typeof dict;

// Cambia este valor a "en" para probar el sitio en inglés.
// TODO: reemplazar por selector de idioma (query param, toggle, etc.) cuando exista.
export const lang: Lang = "es";

export const t = dict[lang];
