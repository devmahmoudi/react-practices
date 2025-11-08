import Link from "next/link"
import { Layers, SquareLibrary } from "lucide-react"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"

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
        <Button variant="outline" asChild>
          <Link href="/categories">
            <SquareLibrary className="mr-2 h-4 w-4" />
            Categories
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/blogs">
            <Layers className="mr-2 h-4 w-4" />
            Blogs
          </Link>
        </Button>
      </div>
    </section>
  )
}
