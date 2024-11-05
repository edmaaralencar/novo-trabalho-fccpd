import 'express-async-errors'
import 'dotenv/config'

import express from 'express'
import cors from 'cors'
import { errorHandler } from './error-handler'
import { userRoutes } from './routes/user'
import { productRoutes } from './routes/products'
import { ordersRoutes } from './routes/orders'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', ordersRoutes)

app.use(errorHandler)

app.listen(4000, () => {
  console.log('Server running on port 4000!')
})
