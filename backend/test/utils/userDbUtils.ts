import fs from 'fs/promises'

const userPath = './temp/users.json'

export const saveUsers = async (dummyData: Record<string, any>[]): Promise<void> => {
  await fs.writeFile(userPath, JSON.stringify(dummyData))
}

export const cleanUsers = async (): Promise<void> => fs.unlink(userPath).catch(err => {
  if (err.code === 'ENOENT') return 
  throw err
})