import { getDictionary } from "@/utils/localization/dictrionaries"

import CreateBlogClient from "./CreateBlogClient"

export default async function CreateBlogPage({
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
  return <CreateBlogClient dictionary={dictionary} />
}
