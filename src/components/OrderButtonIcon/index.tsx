'use client'
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useState } from 'react';
import OrderModal from '../OrderModal';

export default function OrderButtonIcon() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpenModal(true)} className="flex h-fit w-fit fixed right-14 bottom-14 text-white bg-green-800 p-4 rounded-full drop-shadow-2xl">
        <ShoppingCartIcon style={{ width: 24, height: 24 }} />
      </button>

      <OrderModal isOpen={isOpenModal} closeModal={() => setIsOpenModal(false)} />
    </>
  )
}
