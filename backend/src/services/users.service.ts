import { User } from "../types"
import * as usersDb from '../db/usersDb'

export const queryUsers = async (queryValue?: string): Promise<User[]> => {
  return usersDb.queryUsers(queryValue)
}

export const saveUsers = async (users: User[]): Promise<void> => {
  return usersDb.saveUsers(users)
}