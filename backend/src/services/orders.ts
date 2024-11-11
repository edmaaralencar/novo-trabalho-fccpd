import { db } from '@/database'

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

export interface OrderResponse {
  orderId: number
  userId: number
  total: string
  createdAt: Date
  orderItemId: number
  productId: number
  quantity: number
  productName: string
  productDescription: string
  productPrice: string
  productImages: string
}

class OrdersService {
  async create({
    cart,
    userId,
    total,
  }: {
    userId: number
    cart: {
      quantity: number
      productId: number
    }[]
    total: number
  }) {
    try {
      const sqlOrders =
        'INSERT INTO `orders`(`user_id`, `total`, `created_at`) VALUES (?, ?, ?)'
      const valuesOrders = [userId, total, new Date()]

      const [rows] = await db.execute(sqlOrders, valuesOrders)

      const insertedRow = rows as { insertId: number }

      for (const cartItem of cart) {
        const sqlOrdersItems =
          'INSERT INTO `orders_items`(`product_id`, `quantity`, `order_id`) VALUES (?, ?, ?)'
        const valuesOrdersItems = [
          cartItem.productId,
          cartItem.quantity,
          insertedRow.insertId,
        ]

        await db.execute(sqlOrdersItems, valuesOrdersItems)
      }

      return {
        status: 'success',
      }
    } catch (error) {
      console.log(error)
      return {
        status: 'error',
      }
    }
  }

  async findByUserId(userId: number): Promise<IOrder[]> {
    try {
      const sql = `
        SELECT 
          o.id AS orderId,
          o.user_id as userId,
          o.total,
          o.created_at as createdAt,
          oi.id AS orderItemId,
          oi.product_id as productId,
          oi.quantity,
          p.name AS productName,
          p.description AS productDescription,
          p.price AS productPrice,
          GROUP_CONCAT(pi.url) AS productImages
        FROM 
          orders o
        JOIN 
          orders_items oi ON o.id = oi.order_id
        JOIN 
          products p ON oi.product_id = p.id
        LEFT JOIN 
          products_images pi ON p.id = pi.product_id
        WHERE 
          o.user_id = ?
        GROUP BY 
          oi.id, p.id
        ORDER BY 
          o.created_at ASC;
      `
      const values = [userId]

      const [rows] = await db.execute(sql, values)

      const orders = rows as OrderResponse[]

      return orders.map((item) => ({
        createdAt: item.createdAt.toString(),
        orderId: item.orderId,
        orderItemId: item.orderItemId,
        productDescription: item.productDescription,
        productId: item.productId,
        productImages: item.productImages.split(','),
        productName: item.productName,
        productPrice: Number(item.productPrice),
        quantity: item.quantity,
        total: Number(item.total),
        userId: item.userId,
      }))
    } catch (error) {
      return []
    }
  }
}

export const ordersService = new OrdersService()
