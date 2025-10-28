import { images } from "@/app/data"

type ImageDetailPrams = Promise<{
  id: Number
}>

export default async function ImageDetail(props: ImageDetailPrams) {
  const id = (await props).params.id
  const image = images.find((image) => image.id == id)

  // Return not found response
  if (!image) return <h3>Not found !</h3>

  // Return image detail response
  return <img src={image.url}></img>
}