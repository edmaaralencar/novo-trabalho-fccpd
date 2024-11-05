import { Minus, Plus } from 'lucide-react'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'

type ProductCardProps = {
  id: number
  name: string
  description: string
  price: number
  images: string[]
  quantityInCart: number
  onAddToCart: (productId: number) => void
  onRemoveFromCart: (productId: number) => void
}

export function ProductCard({
  id,
  description,
  name,
  price,
  images,
  quantityInCart,
  onAddToCart,
  onRemoveFromCart,
}: ProductCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={images[0]} className="h-[300px] w-full" />
      </CardContent>
      <CardFooter className="flex justify-between">
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'brl',
          }).format(price)}
        </strong>
        <div className="flex gap-2 items-center">
          <Button onClick={() => onRemoveFromCart(id)} variant="ghost">
            <Minus className="w-4 h-4" />
          </Button>
          <span>{quantityInCart}</span>
          <Button onClick={() => onAddToCart(id)} variant="ghost">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
