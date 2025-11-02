import Link from "next/link"
import { images } from "./data"

export default function Images() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((image) => (
        <div className="p-2">
          <Link href={`/images/${image.id}`}>
            <img
              key={image.id}
              src={image.url}
              className="w-full h-[250px] dark:border border-dark-400 rounded-lg cursor-pointer hover:scale-105 transition-all duration-300"
            />
          </Link>
        </div>
      ))}
    </div>
  )
}