import { getDictionary } from "@/utils/localization/dictrionaries"
import EditBlogClient from "./EditBlogClient"

export default async function EditBlogPage({
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

    /**
   * Return client component as result
   */
  return <EditBlogClient dictionary={dictionary}/>
}
