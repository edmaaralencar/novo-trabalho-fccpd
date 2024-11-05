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
})

type FormInput = z.infer<typeof formSchema>

export function Login() {
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
      const response = await api.post('/users/sessions', {
        email: values.email,
        password: values.password,
      })

      localStorage.setItem('userId', response.data.userId)
      navigate('/')
    } catch (error) {
      toast.error('Ocorreu um erro.')
    }
  }

  return (
    <div className="grid place-items-center">
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Entre agora</CardTitle>
          <CardDescription>Digite seu email para entrar agora</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
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
              Entrar agora
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Não possui uma conta?{' '}
            <Link to="/autenticacao/cadastro" className="underline">
              Crie agora
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
