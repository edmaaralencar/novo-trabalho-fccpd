import { productsService } from '@/services/products'
import { Router } from 'express'

export const productRoutes = Router()

productRoutes.get('/', async (req, res) => {
  const products = await productsService.findAll()

  res.status(200).json({
    products,
  })
})

productRoutes.post('/', async (req, res) => {
  await productsService.create({
    description: req.body.description,
    images: req.body.images.split(', '),
    name: req.body.name,
    price: req.body.price,
  })

  res.status(201).end()
})

productRoutes.delete('/:id', async (req, res) => {
  await productsService.delete(req.params.id)

  res.status(204).send()
})

productRoutes.put('/:id', async (req, res) => {
  await productsService.update({
    description: req.body.description,
    id: Number(req.params.id),
    name: req.body.name,
    price: req.body.price,
  })

  res.status(204).send()
})
