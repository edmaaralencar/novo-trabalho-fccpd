import { productsService } from '@/services/products'
import { Router } from 'express'

export const productRoutes = Router()

productRoutes.get('/', async (req, res) => {
  const products = await productsService.findAll()

  res.status(200).json({
    products,
  })
})
