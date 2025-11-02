import type { Metadata } from "next"
import { images } from "@/app/data"

/**
 * Page params type
 */
type ImageDetailParams = Promise<{
  id: Number
}>

/**
 * Set image object title as page layout title dynamically
 */
export async function generateMetadata(
  { params }: { params: ImageDetailParams },
): Promise<Metadata> {
  const id = (await params).id
  const image = images.find((image) => image.id == id)

  return {
    title: image?.title || "Image Detail Page",
  }
}

/**
 * Image Detail page
 */
export default async function ImageDetail({
  params,
}: {
  params: ImageDetailParams
}) {
  const id = (await params).id
  const image = images.find((image) => image.id == id)

  // Return not found response
  if (!image) return <h3>Not found !</h3>

  // Return image detail response
  return (
    <div className="w-full flex justify-center items-center">
      <img src={image.url}></img>
    </div>
  )
}
