import type { Cradle } from '@fastify/awilix'
import type { AwilixContainer } from 'awilix'

import { cleanTables, DB_MODEL } from '../../../../test/DbCleaner'
import type { TestContext } from '../../../../test/TestContext'
import { createTestContext, destroyTestContext } from '../../../../test/TestContext'
import { TEST_USER_2 } from '../../../../test/fixtures/testUsers'

describe('CommentRepository', () => {
  let testContext: TestContext
  let diContainer: AwilixContainer<Cradle>
  beforeEach(async () => {
    testContext = createTestContext()
    diContainer = testContext.diContainer
    await cleanTables(diContainer.cradle.prisma)
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
      const { userRepository } = diContainer.cradle

      const user = await userRepository.createUser({
        ...TEST_USER_2,
      })

      const comment = await commentRepository.createComment({
        content: 'test',
        authorId: user.id,
      })

      const result = await commentRepository.getComments()

      expect(result[0]).toMatchObject(comment)
    })
  })

  describe('createComment', () => {
    it('Creates comment', async () => {
      const { commentRepository } = diContainer.cradle
      const { userRepository } = diContainer.cradle

      const user = await userRepository.createUser({
        ...TEST_USER_2,
      })

      const comment = await commentRepository.createComment({
        content: 'test',
        authorId: user.id,
      })

      expect(comment).toMatchObject({
        content: 'test',
        authorId: user.id,
      })
    })
  })
})
