"use client"

export function translate(
  key: string,
  dictionary: object | null = null
): string {
  if (!dictionary) return key

  try {
    return dictionary[key]
  } catch {
    return key
  }
}
