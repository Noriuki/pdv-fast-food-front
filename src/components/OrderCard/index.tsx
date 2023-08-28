import { Order } from "@/types";
import OrderItemCard from "../OrderModal/OrderItemCard";

interface IOrderCard {
  order: Order;
}

export default function OrderCard({ order }: IOrderCard) {
  console.log('PEDIDO?:', order);
  return (
    <div>
      {
        order.items.map((item, idx) => (
          <OrderItemCard orderItem={item} key={idx} />
        ))
      }
      {!!order?.observation?.length && (
        <textarea
          rows={4}
          className="bg-gray-100 rounded-md resize-none p-4 outline-none"
          value={order.observation}
          disabled
        />
      )}
    </div>

  )
}
