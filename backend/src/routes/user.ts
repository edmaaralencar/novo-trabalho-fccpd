import { AppError } from '@/errors/app-error'
import { usersService } from '@/services/users'
import { Router } from 'express'
import { z } from 'zod'

export const userRoutes = Router()

userRoutes.post('/', async (req, res) => {
  const userSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  })

  const { email, name, password } = userSchema.parse(req.body)

  const userExists = await usersService.findByEmail(email)

  if (userExists) {
    throw new AppError('Já existe um usuário cadastrado com esse e-mail', 400)
  }

  await usersService.create({
    email,
    name,
    password,
  })

  res.status(200).json({
    success: true,
  })
})

userRoutes.post('/sessions', async (req, res) => {
  const userSchema = z.object({
    email: z.string(),
    password: z.string(),
  })

  const { email, password } = userSchema.parse(req.body)

  const userExists = await usersService.findByEmail(email)

  if (!userExists) {
    throw new AppError('Credenciais inváliads', 400)
  }

  if (password !== userExists.password) {
    throw new AppError('Credenciais inváliads', 400)
  }

  res.status(200).json({
    userId: userExists.id,
  })
})
