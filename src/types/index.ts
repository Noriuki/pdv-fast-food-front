export type Category = {
  id?: number;
  name: string;
  image_url: string;
};

export type Additional = {
  id?: number;
  name: string;
  description?: string;
  image_url: string;
  price: number;
};

export type Product = {
  id?: number;
  code: string;
  name: string;
  price: number;
  description?: string;
  image_url: string;
  category_id: number;

  additionals: ProductAdditional[];
};

export type ProductAdditional = {
  id?: number;
  product_id: number;
  additional_id: number;
  additional: Additional;
};

export type Order = {
  id: number;
  customer_name: string;
  total_amount: number;
  status: Status;
  payment_method: Payment_Method;
  observation?: string;
  items: OrderItem[];
};

export type OrderItem = {
  id?: number;
  quantity: number;
  base_amount: number;
  total_amount: number;
  product: Product;
  additionals: ProductAdditional | null;
};

export type NewOrder = {
  customer_name: string;
  total_amount: number;
  status: Status;
  payment_method: Payment_Method;
  observation?: string;
  items: OrderItem[];
};

export enum Payment_Method {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  CASH = 'cash',
}

export enum Status {
  PENDING = 'pending',
  CLOSED = 'closed',
  FINISHED = 'finished',
  CANCELED = 'canceled',
}
