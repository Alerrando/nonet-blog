import { useMutation } from "@tanstack/react-query";

import { ArticleModel } from "@/models/ArticleModel";
import { addItem } from "@/services/indexedDB";

export function useMutationAddArticle() {
  const { mutateAsync: addArticleAsync, isPending: isPendingAddArticle } = useMutation({
    mutationKey: ["add-article"],
    mutationFn: async (article: ArticleModel) => {
      await addItem(article);
    },
    onSuccess: () => {},
    onError: () => {},
  });

  return { addArticleAsync, isPendingAddArticle };
}
