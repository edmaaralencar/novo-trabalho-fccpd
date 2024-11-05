import { Header } from '@/components/header'
import { Loading } from '@/components/loading'
import { OrderCard } from '@/components/order-card'
import { useCart } from '@/hooks/use-cart'
import { useOrders } from '@/hooks/use-orders'
import { useMemo } from 'react'

type OrderItem = {
  orderItemId: number
  productId: number
  quantity: number
  productName: string
  productDescription: string
  productPrice: number
  productImages: string[]
}

export type Order = {
  orderId: number
  userId: number
  total: number
  createdAt: string
  items: OrderItem[]
}

export function Orders() {
  const { data: orders, isLoading, isError } = useOrders()
  const { cart } = useCart()

  const groupedOrders = useMemo(() => {
    if (!orders) {
      return []
    }

    const groupedOrders = orders.reduce((acc, item) => {
      if (!acc[item.orderId]) {
        acc[item.orderId] = {
          orderId: item.orderId,
          userId: item.userId,
          total: item.total,
          createdAt: item.createdAt,
          items: [],
        }
      }
      acc[item.orderId].items.push({
        orderItemId: item.orderItemId,
        productId: item.productId,
        quantity: item.quantity,
        productName: item.productName,
        productDescription: item.productDescription,
        productPrice: item.productPrice,
        productImages: item.productImages,
      })
      return acc
    }, {} as Record<number, Order>)

    return Object.values(groupedOrders)
  }, [orders])

  if (isError) {
    return null
  }

  if (isLoading) {
    return (
      <div className="h-screen w-screen grid place-items-center">
        <Loading />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-16">
      <Header totalItems={cart.reduce((acc, item) => acc + item.quantity, 0)} />

      <div className="space-y-8 px-8 w-full max-w-5xl mx-auto">
        {[
          ...groupedOrders.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          ),
        ].map((order) => (
          <OrderCard key={order.orderId} order={order} />
        ))}
      </div>
    </div>
  )
}
