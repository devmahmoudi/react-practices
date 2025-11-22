const dictionaries = {
  fa: () => import("./fa.json").then((module) => module.default)
}

export const getDictionary = (locale: "en" | "fa") => {
  try{
    return dictionaries[locale]()
  } catch {
    return null
  }
}