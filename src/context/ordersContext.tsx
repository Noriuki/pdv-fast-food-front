'use client'
import apiService from '@/services/api';
import { NewOrder, Order, OrderItem, Payment_Method, Product, ProductAdditional, Status } from '@/types';
import { createContext, useContext, useEffect, useState } from 'react';

interface OrdersContextProps {
  currentOrder: NewOrder;
  orders: Order[];
  loading: boolean;
  addProduct: (product: Product, quantity: number, additional: ProductAdditional | null) => void;
  removeProduct: (product: Product) => void;
  saveOrder: (customerName: string, observation: string, payment_method: Payment_Method) => Promise<boolean>;
  countItemsById: (id: number) => number;
}

const OrdersContext = createContext<OrdersContextProps | undefined>(undefined);

export function OrdersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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

  const addProduct = (product: Product, quantity: number, productAdditional: ProductAdditional | null) => {
    const baseAmount = product.price * quantity;
    let totalAmount = baseAmount;

    let additional: ProductAdditional | null = null;
    if (productAdditional) {
      totalAmount += Number(productAdditional.additional.price);
      additional = productAdditional;
    }

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
  };

  const removeProduct = (product: Product) => {
    setCurrentOrder(prevOrder => {
      const updatedItems = prevOrder.items.filter(item => item.product.id !== product.id);
      const newTotalAmount = updatedItems.reduce((total, item) => total + item?.total_amount, 0);
      return {
        ...prevOrder,
        items: updatedItems,
        total_amount: newTotalAmount,
      };
    });
  };

  const saveOrder = async (customerName: string, observation: string, payment_method: Payment_Method): Promise<boolean> => {
    try {

      await apiService.post('orders', JSON.stringify({ ...currentOrder, customer_name: customerName, payment_method, observation }));
      setCurrentOrder({
        customer_name: '',
        total_amount: 0,
        status: Status.PENDING,
        payment_method,
        observation: "",
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
  }

  return (
    <OrdersContext.Provider
      value={{
        currentOrder,
        orders,
        loading,
        addProduct,
        removeProduct,
        saveOrder,
        countItemsById
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