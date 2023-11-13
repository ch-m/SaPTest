import fs from 'fs/promises'
import { Request, Response, NextFunction } from 'express'
import errorMessages from '../common/errorMessages'

export const validateFile =  (validExtensions: string[]) => (req: Request, _res: Response, next: NextFunction): void => {
  try {
    if (!req.file) throw errorMessages.validationError('Please upload a .csv file')
    if (!validExtensions.includes(getExtensionFromOriginalname(req.file.originalname))) 
      throw errorMessages.validationError(`Only the following extensions are permitted: ${validExtensions.join(',')}`)
    next()
  } catch (error) {
    if (req.file) fs.unlink(`./${req.file.path}`).catch(err => console.log(err))
    next(error)
  }
}

// private

const getExtensionFromOriginalname = (originalname: string): string => {
  const parts = originalname.split('.')
  return parts.pop() ?? originalname
}