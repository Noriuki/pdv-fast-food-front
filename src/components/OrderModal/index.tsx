'use client';

import { useOrders } from '@/context/ordersContext';
import { OrderItem, Payment_Method } from '@/types';
import { Dialog, Tab } from '@headlessui/react';
import {
  BanknotesIcon,
  CreditCardIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useState } from 'react';
import OrderItemCard from './OrderItemCard';

interface IOrderModal {
  isOpen: boolean;
  closeModal: () => void;
}

export default function OrderModal({ isOpen, closeModal }: IOrderModal) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [observation, setObservation] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<Payment_Method | null>(null);

  const { currentOrder, removeProduct, saveOrder } = useOrders();

  const handleSaveOrder = async () => {
    const res = await saveOrder(
      customerName,
      observation,
      selectedPaymentMethod as Payment_Method,
    );
    if (res) {
      setSelectedTab(2);
    }
  };

  const handleRemoveProduct = (item: OrderItem) => {
    removeProduct(item);
  };

  const handleClose = () => {
    setObservation('');
    setSelectedPaymentMethod(null);
    setSelectedTab(0);
    closeModal();
  };

  const disableContinue = currentOrder.items?.length === 0;
  const disabledFinish =
    selectedPaymentMethod === null ||
    currentOrder.items?.length === 0 ||
    customerName.length === 0;

  return (
    <Dialog
      as="div"
      className="relative z-10"
      onClose={handleClose}
      open={isOpen}
    >
      <div className="fixed inset-0 bg-black bg-opacity-25">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Dialog.Panel className="overflow-y-auto w-2/3 max-w-screen-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle drop-shadow-xl transition-all">
            <div className="flex flex-wrap justify-end mb-4">
              <button type="button" onClick={handleClose}>
                <XMarkIcon style={{ width: 24, height: 24 }} />
              </button>
            </div>
            <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
              <Tab.List>
                <Tab />
                <Tab />
                <Tab />
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel>
                  <div className="flex flex-wrap">
                    <h6 className="flex flex-wrap w-full font-bold text-xl">
                      Detalhes do pedido:
                    </h6>
                    <div className="flex flex-wrap w-full flex-col mt-4">
                      <p className="flex flex-wrap w-full text-md my-4">
                        Itens do pedido:
                      </p>
                      <div className="flex flex-wrap w-full justify-between my-4 overflow-y-auto max-h-64">
                        {currentOrder.items.length ? (
                          currentOrder.items.map((item, idx) => (
                            <OrderItemCard
                              key={idx}
                              orderItem={item}
                              showPrice
                              handleRemoveProduct={handleRemoveProduct}
                            />
                          ))
                        ) : (
                          <p className="text-gray-900 font-light">
                            Adicione itens ao seu pedido...
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap w-full flex-col mt-4">
                      <p className="flex flex-wrap w-full text-md my-4">
                        Observações:
                      </p>
                      <textarea
                        rows={4}
                        className="border border-gray-300 rounded-md resize-none p-4 outline-none"
                        value={observation}
                        onChange={e => setObservation(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-wrap w-full justify-end mt-4 space-x-4">
                      <button
                        type="button"
                        className="border border-green-800 text-green-800 font-bold px-8 py-2 rounded-md"
                        onClick={handleClose}
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        className={`bg-green-800 text-white font-bold px-8 py-2 rounded-md ${
                          disableContinue && 'opacity-70'
                        }`}
                        onClick={() => setSelectedTab(oldState => oldState + 1)}
                        disabled={disableContinue}
                      >
                        Continuar
                      </button>
                    </div>
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="flex flex-wrap">
                    <h6 className="flex flex-wrap w-full font-bold text-xl">
                      Finalizar pedido:
                    </h6>

                    <div className="flex flex-wrap w-full flex-col mt-4">
                      <p className="flex flex-wrap w-full text-md my-4">
                        Nome do cliente:
                      </p>
                      <input
                        type="text"
                        className="bg-white rounded-md resize-none p-2 border border-gray-500 outline-none"
                        value={customerName}
                        onChange={e => setCustomerName(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-wrap w-full mt-4 justify-between">
                      <p className="flex flex-wrap w-full text-md my-4">
                        Selecione a forma de pagamento:
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedPaymentMethod(
                            'debit_card' as Payment_Method,
                          )
                        }
                        className={`flex flex-wrap w-1/4 justify-center items-center border border-gray-500 p-4 rounded-md text-gray-500 ${
                          selectedPaymentMethod === Payment_Method.DEBIT_CARD &&
                          'border-green-800 text-green-800'
                        }`}
                      >
                        <CreditCardIcon style={{ width: 32, height: 32 }} />
                        Débito
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedPaymentMethod(
                            'credit_card' as Payment_Method,
                          )
                        }
                        className={`flex flex-wrap w-1/4 justify-center items-center border border-gray-500 p-4 rounded-md text-gray-500 ${
                          selectedPaymentMethod ===
                            Payment_Method.CREDIT_CARD &&
                          'border-green-800 text-green-800'
                        }`}
                      >
                        <CreditCardIcon style={{ width: 32, height: 32 }} />{' '}
                        Crédito
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedPaymentMethod('cash' as Payment_Method)
                        }
                        className={`flex flex-wrap w-1/4 justify-center items-center border border-gray-500 p-4 rounded-md text-gray-500 ${
                          selectedPaymentMethod === Payment_Method.CASH &&
                          'border-green-800 text-green-800'
                        }`}
                      >
                        <BanknotesIcon style={{ width: 32, height: 32 }} />
                        Dinheiro
                      </button>
                    </div>

                    <div className="flex flex-wrap w-full mt-4 border border-gray-500 p-4 rounded-md">
                      <div className="flex flex-wrap w-full justify-between my-4">
                        <span>Valor Total: </span>
                        <span>
                          {Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                            maximumFractionDigits: 2,
                          }).format(currentOrder.total_amount)}
                        </span>
                      </div>
                      <div className="flex flex-wrap w-full justify-between my-4">
                        <span>Valor Pago: </span>
                        <span>
                          {Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                            maximumFractionDigits: 2,
                          }).format(currentOrder.total_amount)}
                        </span>
                      </div>
                      <div className="flex flex-wrap w-full justify-between py-4 border-t border-dashed border-gray-500">
                        <span>Troco: </span>
                        <span>
                          {Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                            maximumFractionDigits: 2,
                          }).format(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap w-full justify-end mt-4 space-x-4">
                    <button
                      type="button"
                      className="border border-green-800 text-green-800 font-bold px-8 py-2 rounded-md"
                      onClick={() => setSelectedTab(oldState => oldState - 1)}
                    >
                      Voltar
                    </button>
                    <button
                      type="button"
                      className={`bg-green-800 text-white font-bold px-8 py-2 rounded-md ${
                        disabledFinish && 'opacity-70'
                      }`}
                      onClick={handleSaveOrder}
                      disabled={disabledFinish}
                    >
                      Finalizar
                    </button>
                  </div>
                </Tab.Panel>

                <Tab.Panel>
                  <div className="flex flex-wrap w-full justify-center space-y-8">
                    <div className="flex flex-wrap relative w-full h-48">
                      <Image src="/images/new-order.svg" alt="" fill />
                    </div>

                    <div>
                      <p className="text-2xl font-bold h-fit w-full text-center">
                        Pedido finalizado com sucesso!!
                      </p>
                      <p className="text-lg h-fit w-full font-light text-center">
                        O pedido foi encaminhado para a cozinha.
                      </p>
                    </div>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
