
import { useMutation, useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { addItem, getAllItems } from "../services/indexedDB";
import { initialBlogState } from "@/lib/utils";
import { ArticleModel } from "@/models/ArticleModel";

interface BlogStoreProps {
  articles: ArticleModel[];
  currentArticle: ArticleModel | null;
  setArticles: (data: ArticleModel[]) => void;
  setCurrentArticle: (data: ArticleModel | null) => void;
}

export const useBlogStore = create<BlogStoreProps>()(
  persist(
    (set, get) => ({
      articles: [] as ArticleModel[],
      currentArticle: null,
      setArticles: (data) => set({ articles: data }),
      setCurrentArticle: (data) => set({ currentArticle: data }),
    }),
    {
      name: "blog-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        articles: state.articles,
        currentArticle: state.currentArticle,
      }),
    }
  )
);

export function useBlog() {
  const {
    articles,
    setArticles,
    currentArticle,
    setCurrentArticle,
  } = useBlogStore();

  const { isLoading: isLoadingGetAllArticles, error: errorGetAllArticles, refetch: refetchGetAllArticles } = useQuery({
    queryKey: ["get-all-articles"],
    queryFn: async () => {
      const response = await getAllItems();
      setArticles(response);
      return response;
    },
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24, // Replace cacheTime with gcTime
  });

  const { mutateAsync: addArticleAsync, isPending: isPendingAddArticle } = useMutation({
    mutationKey: ["add-article"],
    mutationFn: async (article: ArticleModel) => {
      await addItem(article);
    },
    onSuccess: () => {},
    onError: () => {},
  })

  return {
    articles,
    addArticleAsync,
    refetchGetAllArticles,
    isPendingAddArticle,
    isLoadingGetAllArticles,
    errorGetAllArticles,
    currentArticle,
    setCurrentArticle,
  };
}
