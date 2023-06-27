import type { PrismaClient, Comment, Prisma } from '@prisma/client'
import type { Dependencies } from 'src/infrastructure/diConfig'

export class CommentRepository {
  private readonly prisma: PrismaClient

  constructor({ prisma }: Dependencies) {
    this.prisma = prisma
  }

  async getComments(): Promise<Comment[]> {
    const result = await this.prisma.comment.findMany()

    return result
  }

  async createComment(comment: Prisma.CommentUncheckedCreateInput): Promise<Comment> {
    const createdComment = await this.prisma.comment.create({
      data: comment,
    })

    return createdComment
  }
}
