import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { useToast } from "@/hooks/use-toast";
import { ArticleModel } from "@/models/ArticleModel";
import { HistoryArticleModel } from "@/models/HistoryArticleModel";

import { getAllItems } from "../services/indexedDB";

interface BlogStoreProps {
  articles: ArticleModel[];
  currentArticle: ArticleModel | null;
  setArticles: (data: ArticleModel[]) => void;
  setCurrentArticle: (data: ArticleModel | null) => void;
  getArticleByName: (name: string) => ArticleModel | undefined;
  getArticleById: (id: string) => ArticleModel | undefined;
}

export const useBlogStore = create<BlogStoreProps>()(
  persist(
    (set, get) => ({
      articles: [] as ArticleModel[],
      currentArticle: null,
      setArticles: (data) => set({ articles: data }),
      setCurrentArticle: (data) => set({ currentArticle: data }),
      getArticleByName: (name: string) => get().articles.find((article) => article.title === name),
      getArticleById: (id: string) => get().articles.find((article) => article.id === id),
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

export function useBlog() {
  const { articles, setArticles, currentArticle, setCurrentArticle, getArticleByName, getArticleById } = useBlogStore();
  const { toast } = useToast();

  const {
    isLoading: isLoadingGetAllArticles,
    error: errorGetAllArticles,
    refetch: refetchGetAllArticles,
  } = useQuery({
    queryKey: ["get-all-articles"],
    queryFn: async () => {
      const response = await getAllItems();
      setArticles(response);
      return response;
    },
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
  });

  function verifyCurrentIsUpdate(id: number, html: string) {
    const aux = getArticleById(id);

    if (aux?.html !== html) {
      return false;
    }

    return true;
  }

  function createNewVersion(content: string, parentVersion: string | null = null): HistoryArticleModel {
    const now = new Date();
    const idUuid = uuidv4();

    return {
      id: idUuid,
      parentId: parentVersion || null,
      name: idUuid,
      createdAt: now,
      updatedAt: now,
      content,
    };
  }

  return {
    articles,
    refetchGetAllArticles,
    isLoadingGetAllArticles,
    errorGetAllArticles,
    currentArticle,
    setCurrentArticle,
    getArticleByName,
    getArticleById,
    verifyCurrentIsUpdate,
    createNewVersion,
  };
}
