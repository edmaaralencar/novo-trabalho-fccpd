import { IProduct } from '@/entities/product'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async (): Promise<IProduct[]> => {
      const response = await api.get('/products')

      return response.data.products
    },
  })
}
