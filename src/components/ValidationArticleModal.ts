import { z } from "zod";

export const schemaArticleModal = z.object({
  title: z.string().min(1, "Titulo é obrigatorio"),
  summary: z.string(),
  image: z.string(),
});

export type SchemaArticleModal = z.infer<typeof schemaArticleModal>;

export const defaultValuesSectionModal: SchemaArticleModal = { title: "", summary: "", image: "" };
