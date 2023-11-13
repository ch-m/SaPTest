import * as userService from '../services/users.service'
import { NextFunction, Request, Response } from 'express'

export async function getUsers (req: Request, res: Response, next: NextFunction): Promise<void>  {
  try {
    const users = await userService.queryUsers(req.query.q as string)
    res.json({ data: users })  
  } catch (error) {
    next(error)
  }
}
