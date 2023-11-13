import { Express } from "express";
import multer from 'multer'
import * as userController from './controllers/user.controller'
import * as fileController from "./controllers/file.controller";
import { validateRequest } from "./middleware/validateRequest";
import { getUsersSchema } from "./schemas/get.users";
import { validateFile } from "./middleware/customFileValidator";

const upload = multer({ dest: './temp' })

function routes(app: Express) {
  app.post(
    '/api/files', 
    upload.single('file'),
    validateFile(['csv']),
    fileController.postFile
  )
  app.get(
    '/api/users', 
    getUsersSchema, 
    validateRequest, 
    userController.getUsers
  )
}

export default routes