'use client';

import { useProducts } from '@/context/productContext';
import { Product } from '@/types';
import FlexContainer from '../FlexContainer';
import ProductCard from './ProductCard';

export default function ProductGrid() {
  const { products } = useProducts();

  return (
    <FlexContainer>
      <div>
        <h3 className="text-2xl font-black">Produtos</h3>
        <span className="font-light">
          Selecione um produto para adicionar ao seu pedido
        </span>
      </div>
      <div className="grid grid-cols-[repeat(4,minmax(0,max-content))] gap-y-16 justify-between">
        {products?.map((product: Product, index: number) => (
          <ProductCard key={product?.id} product={product} position={index} />
        ))}
      </div>
    </FlexContainer>
  );
}
