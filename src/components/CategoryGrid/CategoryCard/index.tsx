import Image from "next/image";

interface ICategoryCard {
  name: string,
  image_url: string,
}

export default function CategoryCard({ name, image_url }: ICategoryCard) {
  return (
    <div className="flex flex-wrap flex-col items-center relative w-60 h-48 rounded-lg drop-drop-shadow-lg bg-white px-12 py-8 text-center drop-shadow-md hover:scale-110 cursor-pointer">
      <div className="relative flex-1 w-2/3">
        <Image src={image_url} alt={name} fill />
      </div>
      <p className="font-bold pt-2 tracking-wide">{name}</p>
    </div>
  )
}
