import { z } from 'zod'

export const ImpressionSchema = z.object({
  text: z.string().min(10).max(5000).optional(),
  rating: z.number().min(1).max(5),
  bookId: z.string(),
  tags: z.array(z.string()).optional(),
});

export type ImpressionSchemaType = z.infer<typeof ImpressionSchema>;
