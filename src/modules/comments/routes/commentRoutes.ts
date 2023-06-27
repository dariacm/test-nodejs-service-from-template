import type { Routes } from 'src/modules/routes'

import { createComment, getComments } from '../controllers/commentController'
import { CREATE_COMMENT_BODY_SCHEMA } from '../schemas/commentSchemas'

export const getCommentRoutes = (): {
  routes: Routes
} => {
  return {
    routes: [
      {
        method: 'GET',
        url: '/comments',
        handler: getComments,
        schema: { describe: 'Get comments' },
      },
      {
        method: 'POST',
        url: '/comments',
        handler: createComment,
        schema: { body: CREATE_COMMENT_BODY_SCHEMA, describe: 'Create comments' },
      },
    ],
  }
}
