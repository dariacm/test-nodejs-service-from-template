import type { PrismaClient, Comment } from '@prisma/client'
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
}
