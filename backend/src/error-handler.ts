import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import { AppError } from './errors/app-error'

export async function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof ZodError) {
    console.log(error)
    response.status(400).json({
      message: 'Validation error.',
      issues: error.format()
    })
    return
  }

  if (error instanceof AppError) {
    response
      .status(error.statusCode)
      .json({ statusCode: error.statusCode, message: error.message })
    return
  }

  response.status(500).json({
    message: 'Internal server error'
  })
  return
}
