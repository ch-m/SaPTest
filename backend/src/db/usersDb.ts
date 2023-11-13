import fs from'fs/promises'
import path from 'path'
import { User } from "../types"

const tempFolderPath = './temp'

export const saveUsers = async (users: User[]): Promise<void> => {
  await fs.writeFile(path.join(tempFolderPath, 'users.json'), JSON.stringify(users))
}

export const queryUsers = async (queryValue?: string): Promise<User[]> => {
  const fileContent = await fs.readFile(path.join(tempFolderPath, 'users.json'), { encoding: 'utf8' }).catch(handleFileNotExisting)
  const allUsers = JSON.parse(fileContent) as User[]
  if (queryValue) {
    return allUsers.filter(user => Object.values(user).join('').toLowerCase().includes(queryValue.toLowerCase()))
  } else {
    return allUsers
  }
}

// private

const handleFileNotExisting = (error: any): string | never => {
  if (error.code === 'ENOENT') return '[]'
  throw error
}