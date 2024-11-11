import { Pen, Trash } from 'lucide-react'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { toast } from 'sonner'

type ProductCardProps = {
  id: number
  name: string
  description: string
  price: number
  images: string[]
  onEdit: () => void
}

export function DashboardProductCard({
  id,
  description,
  name,
  price,
  images,
  onEdit
}: ProductCardProps) {
  const queryClient = useQueryClient()
  const deleteProductMutation = useMutation({
    mutationFn: async () => {
      await api.delete(`/products/${id}`)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['products']
      })

      toast.success('Produto deletado com sucesso.')
    },
    onError: error => console.log(error)
  })
  async function onDelete() {
    await deleteProductMutation.mutateAsync()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription className='break-words
        '>{description}</CardDescription>
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
          <Button type="button" onClick={onEdit}>
            <Pen />
          </Button>
          <Button type="button" onClick={onDelete} variant="destructive">
            <Trash />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
