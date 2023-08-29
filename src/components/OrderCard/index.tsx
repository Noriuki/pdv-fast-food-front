import { useOrders } from '@/context/ordersContext';
import { Order, Status } from '@/types';
import {
  CheckIcon,
  InboxArrowDownIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import OrderItemCard from '../OrderModal/OrderItemCard';

interface IOrderCard {
  order: Order;
}

export default function OrderCard({ order }: IOrderCard) {
  const { changeOrderStatus } = useOrders();

  const handleOrderStatus = (status: Status) => {
    changeOrderStatus(order, status);
  };

  return (
    <div className="flex flex-wrap w-full bg-white p-4 my-4 drop-shadow-md rounded-md">
      <div className="flex flex-wrap w-full justify-between">
        <h3 className="text-xl">{order.customer_name}</h3>
        <div className="flex flex-wrap space-x-4">
          {order.status === Status.FINISHED ? (
            <button
              type="button"
              onClick={() => handleOrderStatus(Status.CLOSED)}
              className="text-orange-500 bg-orange-200 w-8 h-8 rounded-md outline-none"
            >
              <InboxArrowDownIcon className="w-6 h-6 m-auto" />
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => handleOrderStatus(Status.CANCELED)}
                className="text-red-500 bg-red-200 w-8 h-8 rounded-md outline-none"
              >
                <XMarkIcon className="w-6 h-6 m-auto" />
              </button>
              <button
                type="button"
                onClick={() => handleOrderStatus(Status.FINISHED)}
                className="text-green-500 bg-green-200 w-8 h-8 rounded-md outline-none"
              >
                <CheckIcon className="w-6 h-6 m-auto" />
              </button>
            </>
          )}
        </div>
      </div>

      {order.items.map((item, idx) => (
        <OrderItemCard orderItem={item} key={idx} showPrice={false} />
      ))}
      {!!order?.observation?.length && (
        <textarea
          className="w-full bg-gray-100 rounded-md resize-none p-4 outline-none font-light"
          value={order.observation}
          disabled
        />
      )}
    </div>
  );
}
