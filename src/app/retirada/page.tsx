'use client';

import { useOrders } from '@/context/ordersContext';
import { Status } from '@/types';

export default function Retirada() {
  const { orders } = useOrders();
  return (
    <div className="max-w-screen-lg w-full flex flex-wrap mx-auto my-4">
      <div className="flex flex-wrap flex-col w-1/2 p-4 border-r border-black">
        <h3 className="text-4xl font-bold">Preparando:</h3>
        {orders?.map(
          order =>
            order.status === Status.PENDING && (
              <h5 className="text-6xl text-gray-500 my-4">
                {order.customer_name}
              </h5>
            ),
        )}
      </div>

      <div className="flex flex-wrap w-1/2 p-4 flex-col">
        <h3 className="text-4xl font-bold">Pronto:</h3>
        {orders?.map(
          order =>
            order.status === Status.FINISHED && (
              <h5 className="text-6xl text-green-900 my-4">
                {order.customer_name}
              </h5>
            ),
        )}
      </div>
    </div>
  );
}
