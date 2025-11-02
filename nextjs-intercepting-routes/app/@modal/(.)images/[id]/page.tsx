import { images } from "@/app/data"
import ImageDetail from "@/app/images/[id]/page"

import { Modal } from "./modal"

type ImageModalParams = Promise<{
  id: Number
}>

export default async function ImageModal({
  params,
}: {
  params: ImageModalParams
}) {
  const id = (await params).id
  const image = images.find((image) => image.id == id)

  // Return not found response
  if (!image) return <h3>Not found !</h3>

  // Return image detail response
  return <Modal image={image} />
}
