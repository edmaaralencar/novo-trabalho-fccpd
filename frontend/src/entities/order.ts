export interface IOrder {
  orderId: number
  userId: number
  total: number
  createdAt: string
  orderItemId: number
  productId: number
  quantity: number
  productName: string
  productDescription: string
  productPrice: number
  productImages: string[]
}
