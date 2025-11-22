import { getDictionary } from "@/utils/localization/dictrionaries"
import CreateCategoryClient from "./CreateCategoryClient"

export default async function CreateCategoryPage({
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
   * Return client component as result
   */
  return <CreateCategoryClient dictionary={dictionary} />
}
