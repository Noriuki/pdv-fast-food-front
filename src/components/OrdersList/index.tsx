'use client'
import { useOrders } from '@/context/ordersContext';
import { Order, Status } from '@/types';
import { useEffect, useState } from 'react';
import OrderCard from '../OrderCard';

interface IOrderList {
  filterByStatus: Status;
}

export default function OrdersList({ filterByStatus }: IOrderList) {
  const [orderList, setOrderList] = useState<Order[]>([])
  const { orders } = useOrders();

  useEffect(() => {
    filterOrderList()
  }, [filterByStatus])

  const filterOrderList = () => {
    setOrderList(orders.filter(order => order.status === filterByStatus))
  }

  return (
    <div className="flex flex-wrap w-full">
      {orderList?.map(order => (
        <OrderCard order={order} />
      ))}
    </div>

  )
}
