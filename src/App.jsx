import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import Home from './ui/Home';
import Menu, {loader as menuLoader} from './features/menu/Menu';
import Order, {loader as orderLoader} from './features/order/Order';
import Cart from './features/cart/Cart';
import CreateOrder, {action as createOrderAction} from './features/order/CreateOrder';
import AppLayout from './ui/AppLayout';
import Error from './ui/Error';
import { Provider } from 'react-redux';
import store from './store';
import { action as UpdateOrderAction} from './features/order/UpdateOrder';

const router = createBrowserRouter([
  {
    element: <AppLayout/>,
    errorElement: <Error/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/menu',
        element: <Menu/>,
        errorElement: <Error/>,
        loader: menuLoader
      },
      {
        path: '/order/new',
        element: <CreateOrder/>,
        action: createOrderAction
      },
      {
        path: '/cart',
        element: <Cart/>
      },
      {
        path: '/order/:orderId',
        element: <Order/>,
        loader: orderLoader,
        errorElement: <Error/>,
        action: UpdateOrderAction
      }
    ]
  }
])

export default function App() {

  return (
    <Provider store={store}>

      <RouterProvider router={router}/>
    </Provider>
  )
}
