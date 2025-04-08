import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { useMutationPutArticle } from "@/hooks/useMutationPutArticle";
import { useQueryAllArticles } from "@/hooks/useQueryAllArticles";

import { useBlog } from "./BlogProvider";

interface BlogStoreProps {
  selectedHistory: string;
  setSelectedHistory: (data: string) => void;
}

export const useHistoryProviderStore = create<BlogStoreProps>()(
  persist(
    (set, get) => ({
      selectedHistory: "",
      setSelectedHistory: (data) => set({ selectedHistory: data }),
    }),
    {
      name: "blog-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        articles: state.articles,
        currentArticle: state.currentArticle,
      }),
    },
  ),
);

export function useHistoryProvider() {
  const { selectedHistory, setSelectedHistory } = useHistoryProviderStore();
  const { updateArticleAsync } = useMutationPutArticle();
  const { currentArticle } = useBlog();
  const { refetchGetAllArticles } = useQueryAllArticles();

  async function deleteHistory(id: string) {
    const index = currentArticle?.history?.findIndex((item) => item.id === id);

    if (index !== undefined && index !== -1) {
      const aux = { ...currentArticle };
      aux.history?.splice(index, 1);
      await updateArticleAsync(aux);
      refetchGetAllArticles();

      if (aux.history?.length - 1 === 0) setSelectedHistory(aux.history[aux.history?.length - 1].id);
    }
  }

  return {
    selectedHistory,
    setSelectedHistory,
    deleteHistory,
  };
}
