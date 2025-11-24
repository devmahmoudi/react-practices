import { getDictionary } from "@/utils/localization/dictrionaries"
import CategoriesClient from "./CategoriesClient"

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
  const dictionary = await getDictionary(lang)

  console.log(dictionary);
  

  /**
   * Return client component as response
   */
  return <CategoriesClient dictionary={dictionary} />
}
