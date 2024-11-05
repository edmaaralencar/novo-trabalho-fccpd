import { Header } from '@/components/header'
import { Loading } from '@/components/loading'
import { ProductCard } from '@/components/product-card'
import { useCart } from '@/hooks/use-cart'
import { useProducts } from '@/hooks/use-products'

export function Home() {
  const { data: products, isPending, isError } = useProducts()

  const { handleAddToCart, handleRemoveFromCart, cart } = useCart()

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

      <div className="flex flex-col px-8 mb-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Produtos</h2>
          <div className="grid grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard
                id={product.id}
                description={product.description}
                images={product.images}
                name={product.name}
                price={product.price}
                key={product.id}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
                quantityInCart={
                  cart.find((item) => item.productId === product.id)
                    ?.quantity ?? 0
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
