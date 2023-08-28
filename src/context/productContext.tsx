'use client'
import apiService from '@/services/api';
import { Product } from '@/types';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface ProductsContextProps {
  products: Product[];
  loading: boolean;
  fetchProducts: (query: any) => void;
}

const ProductsContext = createContext<ProductsContextProps | undefined>(undefined);

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProducts = async (query = {}) => {
    try {
      setLoading(true);
      const response = await apiService.get('/products', { params: query });

      setProducts(response.data);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading, fetchProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};