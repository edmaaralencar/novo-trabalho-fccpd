import { env } from '@/env'
import mysql from 'mysql2/promise'

export const db = mysql.createPool({
  host: env.MYSQL_HOST,
  user: env.MYSQL_USER,
  database: env.MYSQL_DB,
  password: env.MYSQL_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
})
