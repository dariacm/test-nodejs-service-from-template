import type { PrismaClient } from '@prisma/client'

export enum DB_MODEL {
  User = 'user',
  Comment = 'comment',
}

export async function cleanTables(
  prisma: PrismaClient,
  modelNames: readonly DB_MODEL[] = [DB_MODEL.Comment, DB_MODEL.User],
) {
  const delegates = modelNames.map<{ deleteMany: () => Promise<unknown> }>(
    (modelName) => prisma[modelName],
  )

  for (const delegate of delegates) {
    await delegate.deleteMany()
  }
}
