'use client'
import { useProducts } from "@/context/productContext";

export default function SearchProduct() {
  const { fetchProducts } = useProducts();

  const handleSearch = (e: any) => {
    const searchText = e.target.value;

    fetchProducts({ name: searchText });
  };

  return (
    <input
      type="text"
      className="bg-gray-100 px-4 py-2 placeholder:font-light max-w-md rounded-sm outline-none"
      placeholder="O que você procura?"
      onChange={handleSearch}
    />

  );
}
