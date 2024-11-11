import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCart } from '@/hooks/use-cart'
import { useProducts } from '@/hooks/use-products'
import { useUser } from '@/hooks/use-user'
import { api } from '@/lib/axios'
import { formatMoney } from '@/utils/format-money'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
  cardNumber: z.string().min(1, {
    message: 'Campo obrigatório',
  }),
  cardHolder: z.string().min(1, {
    message: 'Campo obrigatório',
  }),
  cvv: z.string().min(1, {
    message: 'Campo obrigatório',
  }),
  expirationDate: z.string().min(1, {
    message: 'Campo obrigatório',
  }),
})

type FormInput = z.infer<typeof formSchema>

export function Payment() {
  const { data: products, isPending, isError } = useProducts()
  const { userId } = useUser()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInput>({
    resolver: zodResolver(formSchema),
  })

  const queryClient = useQueryClient()

  const { cart, clearCart } = useCart()

  if (isError) {
    return null
  }

  if (isPending) {
    return (
      <div className="h-screen w-screen grid place-items-center">
        <Loader className="animate-spin w-4 h-4" />
      </div>
    )
  }

  async function onSubmit() {
    try {
      await api.post('/orders', {
        userId,
        cart,
        total: cart.reduce(
          (acc, item) =>
            acc +
            item.quantity *
              (products?.find((prod) => prod.id === item.productId)?.price ??
                0),
          0,
        ),
      })

      clearCart()

      await queryClient.invalidateQueries({
        queryKey: ['orders'],
      })

      toast.success('Pedido realizado com sucesso', {
        description: 'Veja seus pedidos agora',
      })

      // navigate('/pedidos')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col gap-16">
      <Header totalItems={cart.reduce((acc, item) => acc + item.quantity, 0)} />

      <div className="grid grid-cols-2 gap-12 px-8 mb-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Checkout</h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col p-4 border border-border rounded-lg gap-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Número do cartão</Label>
                <Input {...register('cardNumber')} />
                {errors.cardNumber?.message && (
                  <span className="text-destructive text-sm">
                    {errors.cardNumber.message}
                  </span>
                )}
              </div>
              <div className="grid gap-2">
                <Label>Nome da pessoa</Label>
                <Input {...register('cardHolder')} />
                {errors.cardHolder?.message && (
                  <span className="text-destructive text-sm">
                    {errors.cardHolder.message}
                  </span>
                )}
              </div>
              <div className="grid gap-2">
                <Label>CVV</Label>
                <Input {...register('cvv')} />
                {errors.cvv?.message && (
                  <span className="text-destructive text-sm">
                    {errors.cvv.message}
                  </span>
                )}
              </div>
              <div className="grid gap-2">
                <Label>Data de expiração</Label>
                <Input {...register('expirationDate')} />
                {errors.expirationDate?.message && (
                  <span className="text-destructive text-sm">
                    {errors.expirationDate.message}
                  </span>
                )}
              </div>
            </div>

            <Button isLoading={isSubmitting} type="submit">
              Comprar
            </Button>
          </form>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Resumo</h2>

          <div className="flex flex-col p-4 border border-border rounded-lg gap-4">
            {cart.map((item) => {
              const product = products.find(
                (prod) => prod.id === item.productId,
              )

              if (!product) {
                return <div key={item.productId}></div>
              }

              return (
                <div
                  className="flex items-center justify-between"
                  key={item.productId}
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={product.images[0]}
                      className="w-24 h-24 rounded-sm"
                    />
                    <div className="flex flex-col gap-2">
                      <strong>{product.name}</strong>
                      <p className="text-muted-foreground text-sm">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <p>Total</p>
                    <strong>
                      {formatMoney(item.quantity * product.price)}
                    </strong>
                  </div>
                </div>
              )
            })}
            <div className="flex items-center text-lg justify-between">
              <strong>Total</strong>
              <strong>
                {formatMoney(
                  cart.reduce(
                    (acc, item) =>
                      acc +
                      item.quantity *
                        (products.find((prod) => prod.id === item.productId)
                          ?.price ?? 0),
                    0,
                  ),
                )}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
