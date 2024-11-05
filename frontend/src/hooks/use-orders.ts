import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { useUser } from './use-user'
import { IOrder } from '@/entities/order'

export function useOrders() {
  const { userId } = useUser()

  return useQuery({
    queryKey: ['orders', userId],
    queryFn: async (): Promise<IOrder[]> => {
      const response = await api.get(`/orders/${userId}`)

      return response.data.orders
    },
    enabled: !!userId,
  })
}
