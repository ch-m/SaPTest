import { createReadStream } from 'fs'
import { unlink } from 'fs/promises'
import path from 'path'
import { NextFunction, Request, Response } from 'express'
import { parse } from 'fast-csv'
import { assemblePostFilesResponse } from '../assemblers/filesAssembler'
import * as usersService from '../services/users.service'
import { User } from '../types'

const extensions = ['csv']

export async function postFile (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const users: User[] = []
    const tempFilePath = path.join('./temp', req.file!.filename)
    await new Promise<void>((resolve, reject) => {
      createReadStream(tempFilePath)
      .pipe(parse({ headers: true }))
      .on('error', error => reject(error))
      .on('data', (user: User) => users.push(user))
      .on('end', () => resolve())
    })
    await usersService.saveUsers(users)
    await unlink(tempFilePath)
    res.send(assemblePostFilesResponse())
  } catch (error: any) {
    next(error)
  }
}

