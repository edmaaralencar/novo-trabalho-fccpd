import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/axios'
import { toast } from 'sonner'

const formSchema = z.object({
  email: z.string().min(1, {
    message: 'Campo obrigatório.',
  }),
  password: z.string().min(1, {
    message: 'Campo obrigatório.',
  }),
  name: z.string().min(1, {
    message: 'Campo obrigatório.',
  }),
})

type FormInput = z.infer<typeof formSchema>

export function Register() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormInput>({
    resolver: zodResolver(formSchema),
  })
  const navigate = useNavigate()

  async function onSubmit(values: FormInput) {
    try {
      await api.post('/users', {
        email: values.email,
        password: values.password,
        name: values.name,
      })

      toast.success('Conta criada com sucesso')

      navigate('/autenticacao/login')
    } catch (error) {
      toast.error('Ocorreu um erro.')
    }
  }

  return (
    <div className="grid place-items-center">
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Cadastro</CardTitle>
          <CardDescription>
            Digite seu email para criar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" {...register('name')} />
              {errors.name?.message && (
                <span className="text-destructive text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register('email')}
              />
              {errors.email?.message && (
                <span className="text-destructive text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label>Senha</Label>
              </div>
              <Input
                type="password"
                placeholder="*******"
                {...register('password')}
              />
              {errors.password?.message && (
                <span className="text-destructive text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
            <Button isLoading={isSubmitting} type="submit" className="w-full">
              Criar conta
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Já tem uma conta?{' '}
            <Link to="/autenticacao/login" className="underline">
              Entre agora
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
