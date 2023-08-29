import { OrderItem } from '@/types';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface IOrderItemCard {
  orderItem: OrderItem;
  showPrice: boolean;
  handleRemoveProduct?: (item: OrderItem) => void;
}

export default function OrderItemCard({
  orderItem,
  showPrice,
  handleRemoveProduct,
}: IOrderItemCard) {
  return (
    <div className="w-full h-28 flex flex-wrap items-center bg-white border-2 border-gray-100 px-8 py-4 rounded-md my-2">
      <Image
        src={orderItem.product?.image_url}
        alt={orderItem.product?.name}
        width={0}
        height={0}
        sizes="100vw"
        className="w-20 h-auto"
      />
      <div className="flex flex-wrap h-full flex-1 ml-8 justify">
        <h5 className="text-md font-bold h-fit w-full">{`${orderItem.quantity}x ${orderItem.product?.name}`}</h5>
        <p className="text-sm font-light h-fit w-full overflow-hidden">
          {orderItem.product?.description}
        </p>
        {orderItem.additionals && (
          <span className="text-xs font-light h-fit w-full text-green-700">{`Adicionais: ${orderItem.additionals.additional.name}`}</span>
        )}
      </div>

      {showPrice && (
        <p className="flex px-4 text-md">
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            maximumFractionDigits: 2,
          }).format(orderItem.product?.price)}
        </p>
      )}
      {handleRemoveProduct !== undefined && (
        <button
          type="button"
          onClick={() => handleRemoveProduct(orderItem)}
          className="text-red-500 bg-red-200 w-8 h-8 rounded-md outline-none"
        >
          <XMarkIcon className="w-6 h-6 m-auto" />
        </button>
      )}
    </div>
  );
}
