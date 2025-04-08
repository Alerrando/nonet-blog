import { z } from "zod";

export const formSchemaImage = z.object({
  imageUpload: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "You must upload an image.")
    .refine((files) => {
      const file = files[0];
      return file && file.type.startsWith("image/");
    }, "The file must be an image.")
    .nullable(),

  imageUrl: z.string().url().optional(),
});

export type FormDataImage = z.infer<typeof formSchemaImage>;
