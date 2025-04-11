import { z } from "zod";

export const formSchemaImage = z.object({
  image: z.string().url().optional(),
});

export type FormDataImage = z.infer<typeof formSchemaImage>;
