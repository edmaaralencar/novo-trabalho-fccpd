import { api } from "@/lib/axios";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type ProductFormProps = {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  product?: {
    id: number
    price: number
    name: string
    description: string
  }
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Campo obrigatório.',
  }),
  description: z.string().min(1, {
    message: 'Campo obrigatório.',
  }),
  price: z.number({
    required_error: 'Campo obrigatório'
  }).min(1, {
    message: 'Campo obrigatório.',
  }),
  images: z.string().optional(),
})

type FormInput = z.infer<typeof formSchema>

export function ProductForm({ isOpen, setIsOpen, product }: ProductFormProps) {
  const queryClient = useQueryClient()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name,
      description: product?.description,
      price: product?.price ? product?.price : undefined,
    }
  })

  const createProductMutation = useMutation({
    mutationFn: async (values: Omit<FormInput, 'id'>) => {
      await api.post('/products', values)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['products']
      })
       
      toast.success('Produto criado com sucesso')

      setIsOpen(false)
    }
  })

  const updateProductMutation = useMutation({
    mutationFn: async (values: Omit<FormInput, 'id' | 'images'>) => {
      await api.put(`/products/${product?.id}`, values)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['products']
      })
       
      toast.success('Produto atualizado com sucesso')

      setIsOpen(false)
    }
  })

  async function onSubmit(values: FormInput) {
    if (product) {
      await updateProductMutation.mutateAsync({
        name: values.name,
        description: values.description,
        price: values.price,
      })
    } else {
      await createProductMutation.mutateAsync({
        name: values.name,
        description: values.description,
        price: values.price,
        images: values.images ?? ''
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{product ? `Editar produto ${product.name}` : 'Criar produto'}</DialogTitle>
          <DialogDescription>
            Crie ou edite um produto.
          </DialogDescription>
        </DialogHeader>
        <form id="create-form" onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">
              Nome
            </Label>
            <Input
              id="name"
              className="col-span-3"
              {...register('name')}
            />
            {errors.name?.message && (
              <span className="text-destructive text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">
              Descrição
            </Label>
            <Input
              id="description"
              className="col-span-3"
              {...register('description')}
            />
            {errors.description?.message && (
              <span className="text-destructive text-sm">
                {errors.description.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="price">
              Preço (utilize PONTO para casas decimais)
            </Label>
            <Input
              id="price"
              className="col-span-3"
              type="number"
              {...register('price', {
                valueAsNumber: true
              })}
            />
            {errors.price?.message && (
              <span className="text-destructive text-sm">
                {errors.price.message}
              </span>
            )}
          </div>
          {!product && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="price">
                Imagens (separe por um espaço em branco cada URL de imagem)
              </Label>
              <Input
                id="images"
                className="col-span-3"
                {...register('images')}
              />
              {errors.images?.message && (
                <span className="text-destructive text-sm">
                  {errors.images.message}
                </span>
              )}
            </div>
          )}
        </form>
        <DialogFooter>
          <Button isLoading={isSubmitting} form="create-form" type="submit">Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}