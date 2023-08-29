import Image from 'next/image';

interface ICategoryCard {
  name: string;
  image_url: string;
}

export default function CategoryCard({ name, image_url }: ICategoryCard) {
  return (
    <div className="flex flex-wrap flex-col items-center relative w-32 h-12 md:w-60 md:h-48 rounded-lg drop-drop-shadow-lg bg-white md:px-12 md:py-8 text-center drop-shadow-md hover:scale-110 cursor-pointer">
      <Image
        src={image_url}
        alt={name}
        width={0}
        height={0}
        sizes="100vw"
        className="w-2/3 h-auto"
      />

      <p className="font-bold pt-2 tracking-wide mt-auto">{name}</p>
    </div>
  );
}
