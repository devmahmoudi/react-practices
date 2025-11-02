import { images } from "@/app/data"

type ImageDetailParams = Promise<{
  id: Number
}>

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
