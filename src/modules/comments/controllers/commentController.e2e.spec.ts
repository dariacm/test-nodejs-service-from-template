import type { FastifyInstance } from 'fastify'
import { beforeEach, expect } from 'vitest'

import { cleanTables } from '../../../../test/DbCleaner'
import { getTestConfigurationOverrides } from '../../../../test/jwtUtils'
import { getApp } from '../../../app'
import { generateJwtToken } from '../../../infrastructure/tokenUtils'
import type {
  CREATE_USER_BODY_SCHEMA_TYPE,
  GET_USER_SCHEMA_RESPONSE_SCHEMA_TYPE,
} from '../../users/schemas/userSchemas'
import type { CREATE_COMMENT_BODY_SCHEMA_TYPE } from '../schemas/commentSchemas'

describe('CommentController', () => {
  let app: FastifyInstance
  beforeAll(async () => {
    app = await getApp(getTestConfigurationOverrides())
  })
  beforeEach(async () => {
    await cleanTables(app.diContainer.cradle.prisma)
  })
  afterAll(async () => {
    await app.close()
  })

  describe('POST /comments', () => {
    it('creates comment', async () => {
      const token = await generateJwtToken(app.jwt, { userId: 1 }, 9999)

      const user = await app
        .inject()
        .post('/users')
        .headers({
          authorization: `Bearer ${token}`,
        })
        .body({ name: 'dummy', email: 'email@test.com' } as CREATE_USER_BODY_SCHEMA_TYPE)
        .end()
      expect(user.statusCode).toBe(201)
      const { id } = user.json<GET_USER_SCHEMA_RESPONSE_SCHEMA_TYPE>().data

      const response = await app
        .inject()
        .post('/comments')
        .headers({
          authorization: `Bearer ${token}`,
        })
        .body({ content: 'some comment', authorId: id } as CREATE_COMMENT_BODY_SCHEMA_TYPE)
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
