const dictionaries = {
  en: () => import("./en.json").then((module) => module.default),
  fa: () => import("./fa.json").then((module) => module.default),
}

export const getDictionary = (locale: "en" | "fa") => dictionaries[locale]()