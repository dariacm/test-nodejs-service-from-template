import type { Cradle } from '@fastify/awilix'
import type { AwilixContainer } from 'awilix'

import { cleanTables, DB_MODEL } from '../../../../test/DbCleaner'
import type { TestContext } from '../../../../test/TestContext'
import { createTestContext, destroyTestContext } from '../../../../test/TestContext'

describe('CommentRepository', () => {
  let testContext: TestContext
  let diContainer: AwilixContainer<Cradle>
  beforeEach(async () => {
    testContext = createTestContext()
    diContainer = testContext.diContainer
    await cleanTables(diContainer.cradle.prisma, [DB_MODEL.Comment])
  })
  afterEach(async () => {
    await destroyTestContext(testContext)
  })

  describe('getComments', () => {
    it('Returns empty list if no comments found', async () => {
      const { commentRepository } = diContainer.cradle

      const result = await commentRepository.getComments()

      expect(result).toStrictEqual([])
    })

    it('Returns values for existing comments', async () => {
      const { commentRepository } = diContainer.cradle

      const comment = await commentRepository.createComment({
        content: 'test',
        authorId: 123,
      })

      const result = await commentRepository.getComments()

      expect(result[0]).toMatchObject(comment)
    })
  })

  describe('createComment', () => {
    it('Creates comment', async () => {
      const { commentRepository } = diContainer.cradle

      const comment = await commentRepository.createComment({
        content: 'test',
        authorId: 123,
      })

      expect(comment).toMatchObject({
        content: 'test',
        authorId: 123,
      })
    })
  })
})
