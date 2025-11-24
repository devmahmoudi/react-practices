import { siteConfig } from "@/config/site";

export function translate(
  key: string,
  dictionary: object | null = null
): string {
  if (!dictionary) return key

  try {
    return dictionary[key] ?? key
  } catch {
    return key
  }
}

/**
 * Remove locales segment from passed pathname based support locales which defined in site.ts config
 * @param pathname example: /en/categories
 * @returns pathname without locale
 */
export function removePathnameLocale(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  if (siteConfig.locales.includes(segments[0])) {
    segments.shift(); // remove locale
  }

  return "/" + segments.join("/");
}

