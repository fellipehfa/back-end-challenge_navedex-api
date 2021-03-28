import 'reflect-metadata'
import createConnection from './database/connection'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import { naversRouter } from './routes/NaversRoutes'
import { projectNaversRouter } from './routes/ProjectsNaversRoutes'
import { projectsRouter } from './routes/ProjectsRoutes'
import { userTeamRouter } from './routes/TeamRoutes'
import { usersRouter } from './routes/UsersRoutes'
import { AppError } from './error/AppError'

createConnection()
const app = express()

app.use(express.json())
app.use(naversRouter, projectNaversRouter, projectsRouter, userTeamRouter, usersRouter)

app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    console.log('>', err.log, 'status code:', err.statusCode, 'message:', err.message)
    return response.status(err.statusCode).json({ message: err.message })
  }

  console.log('>', err.message)
  return response.status(500).json({ message: 'Internal Server Error' })
})

export { app }
