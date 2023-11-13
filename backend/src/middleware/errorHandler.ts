import { NextFunction, Request, Response } from 'express'
import errorMessages from '../common/errorMessages'

export const errorHandler = (error: any, _req: Request, res: Response, _next: NextFunction): void => {
  let status: number, message: string
  if (error.code) {
    status = error.httpCode
    message = error.message
  } else {
    status = 500
    message = errorMessages.internalError().message
  }
  res.status(status).send({ message })
}