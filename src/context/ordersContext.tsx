'use client';

import apiService from '@/services/api';
import {
  NewOrder,
  Order,
  OrderItem,
  Payment_Method,
  Product,
  ProductAdditional,
  Status,
} from '@/types';
import { createContext, useContext, useEffect, useState } from 'react';

interface OrdersContextProps {
  currentOrder: NewOrder;
  orders: Order[];
  loading: boolean;
  addProduct: (
    product: Product,
    quantity: number,
    additional: ProductAdditional | null,
  ) => void;
  removeProduct: (ordemItem: OrderItem) => void;
  saveOrder: (
    customerName: string,
    observation: string,
    payment_method: Payment_Method,
  ) => Promise<boolean>;
  countItemsById: (id: number) => number;
  changeOrderStatus: (order: Order, status: Status) => Promise<void>;
}

const OrdersContext = createContext<OrdersContextProps | undefined>(undefined);

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [currentOrder, setCurrentOrder] = useState<NewOrder>({
    customer_name: '',
    total_amount: 0,
    status: Status.PENDING,
    payment_method: Payment_Method.CASH,
    items: [],
  });

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await apiService.get('/orders');
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const addProduct = (
    product: Product,
    quantity: number,
    productAdditional: ProductAdditional | null,
  ) => {
    const baseAmount = product.price * quantity;
    let totalAmount = baseAmount;

    let additional: ProductAdditional | null = null;
    if (productAdditional) {
      totalAmount += Number(productAdditional.additional.price);
      additional = productAdditional;
    }

    const existingItemIndex = currentOrder.items.findIndex(
      item =>
        item.product.id === product.id &&
        item.additionals?.id === additional?.id,
    );

    if (existingItemIndex !== -1) {
      const updatedItems = [...currentOrder.items];
      updatedItems[existingItemIndex].quantity += quantity;

      setCurrentOrder(prevOrder => ({
        ...prevOrder,
        items: updatedItems,
        total_amount: prevOrder.total_amount + totalAmount,
      }));
    } else {
      const newItem: OrderItem = {
        product,
        quantity,
        base_amount: baseAmount,
        total_amount: totalAmount,
        additionals: additional,
      };

      setCurrentOrder(prevOrder => ({
        ...prevOrder,
        items: [...prevOrder.items, newItem],
        total_amount: prevOrder.total_amount + totalAmount,
      }));
    }
  };

  const removeProduct = (orderItem: OrderItem) => {
    setCurrentOrder(prevOrder => {
      const updatedItems = prevOrder.items.filter(item => {
        if (item.product.id !== orderItem.product.id) return true;

        const checkAdditionals =
          item.additionals?.id === orderItem.additionals?.id;
        return !checkAdditionals;
      });
      const newTotalAmount = updatedItems.reduce(
        (total, item) => total + Number(item?.total_amount),
        0,
      );
      return {
        ...prevOrder,
        items: updatedItems,
        total_amount: newTotalAmount,
      };
    });
  };

  const saveOrder = async (
    customerName: string,
    observation: string,
    payment_method: Payment_Method,
  ): Promise<boolean> => {
    try {
      await apiService.post(
        'orders',
        JSON.stringify({
          ...currentOrder,
          customer_name: customerName,
          payment_method,
          observation,
        }),
      );
      setCurrentOrder({
        customer_name: '',
        total_amount: 0,
        status: Status.PENDING,
        payment_method,
        observation: '',
        items: [],
      });
      setLoading(false);
      fetchOrders();
      return true;
    } catch (error) {
      setLoading(false);
      return false;
    }
  };

  const countItemsById = (id: number) => {
    return currentOrder.items.filter(item => item.product.id === id).length;
  };

  const changeOrderStatus = async (
    order: Order,
    status: Status,
  ): Promise<void> => {
    try {
      await apiService.put(`orders/${order.id}`, { status });
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <OrdersContext.Provider
      value={{
        currentOrder,
        orders,
        loading,
        addProduct,
        removeProduct,
        saveOrder,
        countItemsById,
        changeOrderStatus,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}
