import type { Dependencies } from 'src/infrastructure/diConfig'

import type { CommentRepository } from '../repositories/CommentRepository'
import type { COMMENT_SCHEMA_TYPE } from '../schemas/commentSchemas'

export type CommentDTO = COMMENT_SCHEMA_TYPE

export class CommentService {
  private readonly commentRepository: CommentRepository

  constructor({ commentRepository }: Dependencies) {
    this.commentRepository = commentRepository
  }

  async getComments(): Promise<CommentDTO[]> {
    const comments = await this.commentRepository.getComments()

    return comments
  }
}
