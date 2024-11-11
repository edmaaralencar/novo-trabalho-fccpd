import { db } from '@/database'

interface IProduct {
  id: number
  name: string
  description: string
  price: number
  images: string[]
}

interface ProductResponse {
  id: number
  name: string
  description: string
  price: number
  image_urls: string
}

class ProductsService {
  async findAll(): Promise<IProduct[]> {
    try {
      const [rows] = await db.query(`
        SELECT 
          p.id,
          p.name,
          p.description,
          p.price,
          GROUP_CONCAT(pi.url) AS image_urls
        FROM 
          products p
        LEFT JOIN 
          products_images pi
        ON 
          p.id = pi.product_id
        GROUP BY 
          p.id;
      `)

      const products = rows as ProductResponse[]

      return products.map((product) => ({
        id: product.id,
        description: product.description,
        name: product.name,
        price: Number(product.price),
        images:
          product?.image_urls?.length > 0 ? product.image_urls.split(',') : [],
      }))
    } catch (error) {
      console.log(error)
      return []
    }
  }

  async create({
    images,
    name,
    description,
    price,
  }: {
    images: string[]
    name: string
    description: string
    price: string
  }) {
    try {
      const sqlProduct =
        'INSERT INTO `products`(`name`, `description`, `price`) VALUES (?, ?, ?)'
      const valuesOrders = [name, description, price]

      const [rows] = await db.execute(sqlProduct, valuesOrders)

      const insertedRow = rows as { insertId: number }

      for (const image of images) {
        const sqlOrdersItems =
          'INSERT INTO `products_images`(`product_id`, `url`) VALUES (?, ?)'
        const valuesOrdersItems = [insertedRow.insertId, image]

        await db.execute(sqlOrdersItems, valuesOrdersItems)
      }

      return {
        status: 'success',
      }
    } catch (error) {
      return {
        status: 'error',
      }
    }
  }

  async delete(productId: string) {
    try {
      const sql = 'DELETE FROM `products` WHERE `id` = ?'
      const valuesOrders = [productId]

      await db.execute(sql, valuesOrders)

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

  async update({
    description,
    id,
    name,
    price,
  }: {
    id: number
    name: string
    price: number
    description: string
  }) {
    try {
      const sql =
        'UPDATE `products` SET `name` = ?, `description`= ?, `price` = ? WHERE `id` = ?'
      const values = [name, description, price, id]

      await db.execute(sql, values)

      return {
        status: 'success',
      }
    } catch (err) {
      return {
        status: 'error',
      }
    }
  }
}

export const productsService = new ProductsService()
