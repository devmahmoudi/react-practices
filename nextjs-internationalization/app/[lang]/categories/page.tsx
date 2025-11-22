import React from "react"
import CategoriesClient from "./CategoriesClient"
import { getDictionary } from "../localization/dictrionaries"

export default async function CategoriesPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  /**
   * Destruct client selected language
   */
  const { lang } = await params

  /**
   * Load dictionary translation object through lang prop for localization
   */
  const dictionary = getDictionary(lang)

  /**
   * Return client component as response
   */
  return <CategoriesClient dictionary={dictionary}/>
}
