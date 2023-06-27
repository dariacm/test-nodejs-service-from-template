import type { Dependencies } from 'src/infrastructure/diConfig'

import type { CommentRepository } from '../repositories/commentRepository'
import type {
  COMMENT_SCHEMA_TYPE,
  CREATE_COMMENT_BODY_SCHEMA_TYPE,
} from '../schemas/commentSchemas'

export type CommentDTO = COMMENT_SCHEMA_TYPE
export type CommentCreateDTO = CREATE_COMMENT_BODY_SCHEMA_TYPE

export class CommentService {
  private readonly commentRepository: CommentRepository

  constructor({ commentRepository }: Dependencies) {
    this.commentRepository = commentRepository
  }

  async getComments(): Promise<CommentDTO[]> {
    const comments = await this.commentRepository.getComments()

    return comments
  }

  async createComment(comment: CommentCreateDTO) {
    const newComment = await this.commentRepository.createComment({
      content: comment.content,
      authorId: comment.authorId,
    })

    return newComment
  }
}
