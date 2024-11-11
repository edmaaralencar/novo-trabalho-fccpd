import { DashboardProductCard } from '@/components/dashboard-product-card'
import { Header } from '@/components/header'
import { Loading } from '@/components/loading'
import { ProductForm } from '@/components/product-form'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/use-cart'
import { useProducts } from '@/hooks/use-products'
import { Plus } from 'lucide-react'
import { useState } from 'react'

export function Dashboard() {
  const { data: products, isPending, isError } = useProducts()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<{ id: number; description: string; name: string; price: number } | null>(null)

  const { cart } = useCart()

  if (isError) {
    return null
  }

  if (isPending) {
    return (
      <div className="h-screen w-screen grid place-items-center">
        <Loading />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-16">
      <Header totalItems={cart.reduce((acc, item) => acc + item.quantity, 0)} />

      <ProductForm key={selectedProduct?.id} isOpen={isOpen} setIsOpen={setIsOpen} product={selectedProduct ?? undefined} />

      <div className="flex flex-col px-8 mb-8">
        <div className="flex flex-col gap-4">
          <div className='flex items-center justify-between'>
            <h2 className="text-xl font-bold">Produtos</h2>
            <Button type="button" onClick={() => {
              setIsOpen(true)
              setSelectedProduct(null)
            }}>
              <Plus />
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {products.map((product) => (
              <DashboardProductCard
                id={product.id}
                description={product.description}
                images={product.images}
                name={product.name}
                price={product.price}
                key={product.id}
                onEdit={() => {
                  setSelectedProduct({
                    id: product.id,
                    description: product.description,
                    name: product.name,
                    price: product.price
                  })
                  setIsOpen(true)
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
