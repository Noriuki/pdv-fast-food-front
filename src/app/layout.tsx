import Header from '@/components/Layout/Header';
import { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import { OrdersProvider } from '@/context/ordersContext';
import { ProductsProvider } from '@/context/productContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fast Food',
  description: 'Sistema PDV',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

const roboto = Roboto({
  weight: ['100', '300', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={roboto.className}>
      <body className="bg-zinc-50">
        <div className="flex flex-wrap flex-col">
          <ProductsProvider>
            <OrdersProvider>
              <Header />
              <main className="flex-1 flex flex-wrap">{children}</main>
            </OrdersProvider>
          </ProductsProvider>
        </div>
      </body>
    </html>
  );
}
