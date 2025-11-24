import Link from "next/link"
import { getDictionary } from "@/utils/localization/dictrionaries"
import { translate } from "@/utils/localization/helper"
import { Layers, SquareLibrary } from "lucide-react"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"

export default async function IndexPage({
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

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          {translate("Internationalization practice in NextJs", dictionary)}
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          {translate(
            "This is a practice project wrote by Mahdi Mahmoudi",
            dictionary
          )}{" "}
          <br />
          {translate(
            "for learning about NextJs Internationalization",
            dictionary
          )}
        </p>
      </div>
      <div className="flex gap-4">
        <Button variant="outline" asChild>
          <Link href="/categories">
            <SquareLibrary className="mr-2 h-4 w-4" />
            {translate("Categories", dictionary)}
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/blogs">
            <Layers className="mr-2 h-4 w-4" />
            {translate("Blogs", dictionary)}
          </Link>
        </Button>
      </div>
    </section>
  )
}
