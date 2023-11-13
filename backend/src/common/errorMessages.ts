import { Error } from '../types'

const errorCode = (c: number): number => 0 + c

const errorMessages = {
  internalError: (): Error => ({
    httpCode: 500,
    code: 0,
    message: "An error has occurred"
  }),
  validationError: (message: string): Error => ({
    httpCode: 400,
    code: 1,
    message
  }),
}

export default errorMessages
