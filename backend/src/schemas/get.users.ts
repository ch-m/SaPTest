import { query } from 'express-validator'

export const getUsersSchema = [
  query('q').optional().isString()
]