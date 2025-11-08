import Link from "next/link"
import { Layers, SquareLibrary } from "lucide-react"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          NextJs Internationalization & Route Handler
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          This is a practice project wrote with Mahdi Mahmoudi <br />
          for learning about NextJs Internationaliztion and Route Handler
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          href={siteConfig.links.docs}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants({ variant: "outline" })}
        >
          <SquareLibrary className="pr-3" />
          Categories
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.github}
          className={buttonVariants({ variant: "outline" })}
        >
          <Layers className="pr-3" />
          Blogs
        </Link>
      </div>
    </section>
  )
}
