import { useToast } from "@/hooks/use-toast";
import { ArticleModel } from "@/models/ArticleModel";
import { useBlog } from "@/provider/BlogProvider";

import { useMutationAddArticle } from "./useMutationAddArticle";
import { useQueryAllArticles } from "./useQueryAllArticles";

export function useImportExport() {
  const { articles } = useBlog();
  const { toast } = useToast();
  const { addArticleAsync } = useMutationAddArticle();
  const { refetchGetAllArticles } = useQueryAllArticles();

  async function importArticle(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event) return;

    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const articleData: ArticleModel = JSON.parse(e.target?.result as string);

        if (!articleData.id || !articleData.title || !articleData.html) {
          throw new Error("Formato de arquivo inválido");
        }

        if (articles.find((article) => article.id === articleData.id)) {
          toast({ description: "Artigo ja cadastrado", className: "bg-red-500 text-white" });
          return;
        }

        await addArticleAsync(articleData as ArticleModel);
        refetchGetAllArticles();
        toast({ description: "Artigo importado com sucesso!" });
      } catch (error) {
        console.error("Erro ao importar artigo:", error);
        toast({ description: "Erro ao importar artigo", className: "bg-red-500 text-white" });
      }
    };

    reader.readAsText(event);
  }

  function exportArticle(articleData: ArticleModel) {
    const blob = new Blob([JSON.stringify(articleData, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${articleData.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.json`;
    a.click();

    setTimeout(() => URL.revokeObjectURL(url), 100);
  }

  return { importArticle, exportArticle };
}
