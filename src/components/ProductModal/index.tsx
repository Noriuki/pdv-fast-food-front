'use client';

import { useOrders } from '@/context/ordersContext';
import { Product, ProductAdditional } from '@/types';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useState } from 'react';

interface IProductModal {
  product: Product;
  isOpen: boolean;
  closeModal: () => void;
}
export default function ProductModal({
  product,
  isOpen,
  closeModal,
}: IProductModal) {
  const { addProduct, countItemsById } = useOrders();
  const [selectedAdditional, setSelectedAdditional] =
    useState<ProductAdditional | null>(null);

  const handleAddToOrder = () => {
    addProduct(product, 1, selectedAdditional as ProductAdditional);
    closeModal();
  };

  return (
    <Dialog
      as="div"
      className="relative z-10"
      onClose={closeModal}
      open={isOpen}
    >
      <div className="fixed inset-0 bg-black bg-opacity-25">
        <div className="flex min-h-full items-center justify-center p-4 text-center overflow-y-scroll">
          <Dialog.Panel className="overflow-y-auto  w-2/3 max-w-screen-md rounded-2xl bg-white p-6 text-left align-middle drop-shadow-xl">
            <div className="flex flex-wrap justify-end mb-8">
              <button type="button" onClick={closeModal}>
                <XMarkIcon style={{ width: 24, height: 24 }} />
              </button>
            </div>

            <div className="flex flex-wrap">
              <div className="flex flex-wrap flex-col items-center relative w-1/2 h-72 rounded-xl drop-drop-shadow-lg text-center bg-fast-food-pattern-green">
                <Image
                  src={product?.image_url}
                  alt={product?.name}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="absolute top-8 w-52 h-auto"
                />
                <div className="flex flex-wrap bg-white rounded-xl w-full h-1/2 mt-auto" />
              </div>
              <div className="flex flex-wrap w-1/2 pl-8 content-between">
                <div className="flex flex-wrap justify-between w-full">
                  <h5 className="text-xl font-bold h-fit">{product?.name}</h5>
                  <div className="bg-green-800 text-white font-bold px-4 rounded-full flex flex-wrap items-center">
                    {countItemsById(product.id as number)}
                  </div>
                </div>
                <p className="text-base font-light h-fit w-full mt-4">
                  {product?.description}
                </p>

                <div className="flex flex-wrap items-center justify-between w-full">
                  <p className="text-lg font-bold">
                    {' '}
                    {Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                      maximumFractionDigits: 2,
                    }).format(product?.price)}
                  </p>
                  <button
                    type="button"
                    className="bg-green-800 text-white w-fit h-fit  py-2 px-8 text-lg font-bold rounded-full"
                    onClick={handleAddToOrder}
                  >
                    Adicionar
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap w-full flex-col mt-8">
                <h6>Adicionais</h6>
                <p className="text-base font-light h-fit w-full">
                  Selecione os adicionas que você quer adicionar ao seu pedido
                </p>

                <div className="flex flex-wrap w-full justify-between my-4">
                  {product?.additionals?.map((productAdditional, idx) => (
                    <div
                      className="w-full flex flex-wrap border-b border-gray-100 py-2"
                      key={idx}
                    >
                      <Image
                        src={productAdditional.additional.image_url}
                        alt={productAdditional.additional.name}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-12 h-auto"
                      />
                      <div className="flex flex-wrap flex-col flex-1 ml-4">
                        <h5 className="text-lg font-bold h-fit w-full">
                          {productAdditional?.additional.name}
                        </h5>
                        <p className="text-sm font-light h-fit w-full">
                          {productAdditional?.additional.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap content-center">
                        <p className="text-lg font-bold">
                          {' '}
                          {Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                            maximumFractionDigits: 2,
                          }).format(productAdditional?.additional.price)}
                        </p>
                        <input
                          type="radio"
                          name="product-additional"
                          className="accent-green-800 w-16"
                          onClick={() =>
                            setSelectedAdditional(productAdditional)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
