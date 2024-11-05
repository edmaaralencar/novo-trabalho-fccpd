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
        images: product.image_urls.split(','),
      }))
    } catch (error) {
      console.log(error)
      return []
    }
  }
}

export const productsService = new ProductsService()
