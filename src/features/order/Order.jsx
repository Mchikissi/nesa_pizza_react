import { useEffect } from "react";
// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import OrderItem from './OrderItem';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import UpdateOrder from "./UpdateOrder";

function Order() {
  const order = useLoaderData();
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  
  const fetcher = useFetcher();

  useEffect(function(){
    if(!fetcher.data && fetcher.state === 'idle')
      fetcher.load('/menu');
    console.log(fetcher.data)
  }, [fetcher])

  
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-xl font-semibold">Order # {id} status</h2>

        <div className="space-x-2">
          {priority && <span className="bg-red-500 rounded-full py-1 px-3 text-sm uppercase font-semibold text-red-50 tracking-wide">Priority</span>}
          <span className="bg-green-500 rounded-full py-1 px-3 text-sm uppercase font-semibold text-green-50 tracking-wide">{status} order</span>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2 bg-stone-200 px-8 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className="divide-y divide-stone-200 border-b border-t">
        {cart.map(item => <OrderItem item={item} key={item.pizzaId} ingredients={fetcher?.data?.find(el => el.id === item.pizzaId)?.ingredients ?? []} isLoadingIngredients={fetcher.state === 'loading'}/>)}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className="text-sm font-medium text-stone-600">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>

        {!priority && <UpdateOrder order={order}/>}
      </div>
    </div>
  );
}

export async function loader({params}){
  const order = getOrder(params.orderId);

  return order
}
export default Order;