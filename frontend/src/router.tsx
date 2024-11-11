import { createBrowserRouter } from 'react-router-dom'

import { AuthLayout } from './pages/_layouts/auth'
import { Home } from './pages/app/home'
import { Login } from './pages/auth/login'
import { Register } from './pages/auth/register'
import { Payment } from './pages/app/payment'
import { Orders } from './pages/app/orders'
import { Dashboard } from './pages/app/dashboard'

export const router = createBrowserRouter([
  {
    path: '/autenticacao',
    element: <AuthLayout />,
    children: [
      {
        path: '/autenticacao/cadastro',
        element: <Register />,
      },
      {
        path: '/autenticacao/login',
        element: <Login />,
      },
    ],
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/pagamento',
    element: <Payment />,
  },
  {
    path: '/pedidos',
    element: <Orders />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  }
])
