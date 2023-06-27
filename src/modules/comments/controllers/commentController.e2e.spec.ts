import type { FastifyInstance } from 'fastify'
import { beforeEach, expect } from 'vitest'

import { cleanTables, DB_MODEL } from '../../../../test/DbCleaner'
import { getTestConfigurationOverrides } from '../../../../test/jwtUtils'
import { getApp } from '../../../app'
import { generateJwtToken } from '../../../infrastructure/tokenUtils'
import type { CREATE_COMMENT_BODY_SCHEMA_TYPE } from '../schemas/commentSchemas'

describe('CommentController', () => {
  let app: FastifyInstance
  beforeAll(async () => {
    app = await getApp(getTestConfigurationOverrides())
  })
  beforeEach(async () => {
    await cleanTables(app.diContainer.cradle.prisma, [DB_MODEL.Comment])
  })
  afterAll(async () => {
    await app.close()
  })

  describe('POST /comments', () => {
    it('creates comment', async () => {
      const token = await generateJwtToken(app.jwt, { userId: 1 }, 9999)

      const response = await app
        .inject()
        .post('/comments')
        .headers({
          authorization: `Bearer ${token}`,
        })
        .body({ content: 'some comment', authorId: 123 } as CREATE_COMMENT_BODY_SCHEMA_TYPE)
        .end()

      expect(response.statusCode).toBe(201)
    })
  })

  describe('GET /comments', () => {
    it('retrieves comments', async () => {
      const token = await generateJwtToken(app.jwt, { userId: 1 }, 9999)

      const response = await app
        .inject()
        .get('/comments')
        .headers({
          authorization: `Bearer ${token}`,
        })
        .end()

      expect(response.statusCode).toBe(200)
    })
  })
})
