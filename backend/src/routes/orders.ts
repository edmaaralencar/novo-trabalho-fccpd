import { ordersService } from '@/services/orders'
import { Router } from 'express'
import { z } from 'zod'

export const ordersRoutes = Router()

ordersRoutes.post('/', async (req, res) => {
  const bodySchema = z.object({
    userId: z.number(),
    total: z.number(),
    cart: z.array(
      z.object({
        productId: z.number(),
        quantity: z.number(),
      }),
    ),
  })

  const { cart, userId, total } = bodySchema.parse(req.body)

  await ordersService.create({
    userId,
    cart,
    total,
  })

  res.status(200).json({
    success: true,
  })
})

ordersRoutes.get('/:userId', async (req, res) => {
  const bodySchema = z.object({
    userId: z.string(),
  })

  const { userId } = bodySchema.parse(req.params)

  const orders = await ordersService.findByUserId(Number(userId))

  res.status(200).json({
    orders,
  })
})
