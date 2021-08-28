import { PrismaClient } from '@prisma/client'
import { PRISMA_LOG_LEVELS } from '../environment'

const log = PRISMA_LOG_LEVELS.split(',').filter(Boolean) as Array<
  'query' | 'info' | 'warn' | 'error'
>

/** *
 * Per prismas best practices, only create 1
 * single PrismaClient per process
 */
const prisma = new PrismaClient({
  log,
})

export default prisma
