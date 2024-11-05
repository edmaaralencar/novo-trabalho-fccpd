import { db } from '@/database'

interface IUser {
  id: number
  name: string
  email: string
  password: string
}

class UsersService {
  async create({
    email,
    name,
    password,
  }: {
    email: string
    password: string
    name: string
  }) {
    try {
      const sql =
        'INSERT INTO `users`(`name`, `email`, `password`) VALUES (?, ?, ?)'
      const values = [name, email, password]

      await db.execute(sql, values)

      return {
        status: 'success',
      }
    } catch (error) {
      return {
        status: 'error',
      }
    }
  }

  async findByEmail(email: string): Promise<IUser | null> {
    try {
      const sql = 'SELECT * FROM `users` WHERE `email` = ?'
      const values = [email]

      const [rows] = await db.execute(sql, values)

      const user = rows as IUser[]

      if (user.length === 0) {
        return null
      }

      return user[0]
    } catch (error) {
      return null
    }
  }
}

export const usersService = new UsersService()
