import type { FastifyReply, FastifyRequest } from 'fastify'

import type { CREATE_COMMENT_BODY_SCHEMA_TYPE } from '../schemas/commentSchemas'

export const getComments = async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const { commentService } = req.diScope.cradle

  const comments = await commentService.getComments()

  return reply.send({
    data: comments,
  })
}

export const createComment = async (
  req: FastifyRequest<{ Body: CREATE_COMMENT_BODY_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { content, authorId } = req.body

  const { commentService } = req.diScope.cradle

  const createComment = await commentService.createComment({
    content,
    authorId,
  })

  return reply.status(201).send({
    data: createComment,
  })
}
