import { getDictionary } from "@/utils/localization/dictrionaries"
import BlogsClient from "./BlogsClient"

export default async function({
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
   * Return client component as response
   */
  return <BlogsClient dictionary={dictionary}/>
}