import ProductModal from "@/components/ProductModal";
import { Product } from "@/types";
import Image from "next/image";
import { useState } from "react";

interface IProductCard {
  product: Product;
  position: number;
}

export default function ProductCard({ product, position }: IProductCard) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  let bgPattern;

  if (position < 4) {
    bgPattern = "bg-fast-food-pattern-red";
  } else if (position < 8) {
    bgPattern = "bg-fast-food-pattern-green";
  } else {
    bgPattern = "bg-fast-food-pattern-yellow";
  }

  return (
    <>
      <button onClick={() => setIsOpenModal(true)}>
        <div className={`flex flex-wrap flex-col items-center relative w-56 h-72 rounded-xl drop-drop-shadow-lg text-center ${bgPattern}`}>
          <Image src={product?.image_url} alt={product?.name} width={0} height={0} sizes="100vw" className="absolute top-8 w-32 h-auto" />
          <div className="flex flex-wrap justify-center pt-16 pb-4 tracking-wide bg-white rounded-xl w-full h-2/3 mt-auto">
            <div>
              <h5 className="text-lg font-bold h-fit w-full">{product?.name}</h5>
              <p className="text-sm font-light h-fit w-full">{product?.description}</p>
            </div>
            <p className="text-lg font-bold mt-auto h-fit w-full">
              {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 2 }).format(product?.price)}
            </p>
          </div>
        </div>
      </button>
      <ProductModal
        product={product}
        isOpen={isOpenModal}
        closeModal={() => setIsOpenModal(false)}
      />
    </>
  )
}
