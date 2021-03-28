import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import createConnection from './database/connection'
import { router } from './routes/routes'
import { AppError } from './errors/AppError'

createConnection()
const app = express()

app.use(express.json())
app.use(router)

app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(400).json({
      message: err.message
    })
  }

  return response.status(400).json({
    status: 'Error',
    message: `Internal server error ${err.message}`
  })
})

export { app }
