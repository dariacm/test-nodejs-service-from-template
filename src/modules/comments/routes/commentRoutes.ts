import type { Routes } from 'src/modules/routes'

import { getComments } from '../controllers/commentController'

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
    ],
  }
}
