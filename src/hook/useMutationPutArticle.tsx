import { useMutation } from "@tanstack/react-query";

import { ArticleModel } from "@/models/ArticleModel";
import { updateItem } from "@/services/indexedDB";

export function useMutationPutArticle() {
  const { mutateAsync: updateArticleAsync, isPending: isPendingUpdateArticle } = useMutation({
    mutationKey: ["put-article"],
    mutationFn: async (article: ArticleModel) => {
      await updateItem(article);
    },
    onSuccess: () => {
      console.log("Artigo atualizado com sucesso!");
    },
    onError: () => {},
  });

  return { updateArticleAsync, isPendingUpdateArticle };
}
