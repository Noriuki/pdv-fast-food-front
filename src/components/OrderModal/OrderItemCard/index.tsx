import { useOrders } from '@/context/ordersContext';
import { OrderItem } from '@/types';
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from 'next/image';

interface IOrderItemCard {
  orderItem: OrderItem;
}
export default function OrderItemCard({ orderItem }: IOrderItemCard) {
  const { removeProduct } = useOrders();

  const handleRemoveProduct = () => {
    removeProduct(orderItem.product);
  };

  return (
    <div className="w-full flex flex-wrap  items-center drop-shadow-md bg-white px-8 py-4 rounded-md my-4">
      <Image src={orderItem.product?.image_url} alt={orderItem.product?.name} width={0} height={0} sizes="100vw" className="w-16 h-auto" />
      <div className="flex flex-wrap flex-col flex-1 ml-8">
        <h5 className="text-lg font-bold h-fit w-full">{orderItem.product?.name}</h5>
        <p className="text-sm font-light h-fit w-full">{orderItem.product?.description}</p>
      </div>
      <p className="flex pr-4">
        {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 2 }).format(orderItem.product?.price)}
      </p>
      <button onClick={handleRemoveProduct} className="text-red-500 bg-red-200 w-8 h-8 rounded-md outline-none">
        <XMarkIcon />
      </button>
    </div>
  )
}
