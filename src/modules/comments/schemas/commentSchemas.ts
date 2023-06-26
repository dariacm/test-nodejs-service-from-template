import z from 'zod'

export const COMMENT_SCHEMA = z.object({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  content: z.string(),
  upvotes: z.number(),
  downvotes: z.number(),
  authorId: z.number(),
})

export type COMMENT_SCHEMA_TYPE = z.infer<typeof COMMENT_SCHEMA>
