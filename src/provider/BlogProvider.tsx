import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { ArticleModel } from "@/models/ArticleModel";
import { HistoryArticleModel } from "@/models/HistoryArticleModel";

interface BlogStoreProps {
  articles: ArticleModel[];
  currentArticle: ArticleModel | null;
  zenMode: boolean;
  setArticles: (data: ArticleModel[]) => void;
  setCurrentArticle: (data: ArticleModel | null) => void;
  setZenMode: (data: boolean) => void;
  getArticleByName: (name: string) => ArticleModel | undefined;
  getArticleById: (id: string) => ArticleModel | undefined;
}

export const useBlogStore = create<BlogStoreProps>()(
  persist(
    (set, get) => ({
      articles: [] as ArticleModel[],
      currentArticle: null,
      zenMode: false,
      setArticles: (data) => set({ articles: data }),
      setCurrentArticle: (data) => set({ currentArticle: data }),
      setZenMode: (data) => set({ zenMode: data }),
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
  const {
    articles,
    setArticles,
    currentArticle,
    setCurrentArticle,
    zenMode,
    setZenMode,
    getArticleByName,
    getArticleById,
  } = useBlogStore();

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
    setArticles,
    currentArticle,
    setCurrentArticle,
    zenMode,
    setZenMode,
    getArticleByName,
    getArticleById,
    verifyCurrentIsUpdate,
    createNewVersion,
  };
}
