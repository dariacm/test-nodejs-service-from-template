import type { FastifyReply, FastifyRequest } from 'fastify'

export const getComments = async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const { commentService } = req.diScope.cradle

  const comments = await commentService.getComments()

  return reply.send({
    data: comments,
  })
}
