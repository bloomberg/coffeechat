import { PrismaClient } from '@prisma/client'
import log from '../src/server/log'

const prisma = new PrismaClient()

async function main(): Promise<void> {
  await prisma.system_role.createMany({
    data: [
      {
        name: 'admin',
      },
    ],
  })
}

// eslint-disable-next-line promise/catch-or-return
main()
  .catch((error) => {
    log.error(error, 'failed to run the migration')
    // this is a script and we want to set exit code to 1
    // when something fails
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1)
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect()
  })
