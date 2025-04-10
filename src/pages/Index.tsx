import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { AddArticle } from "@/components/AddArticleButton";
import { AddArticleModal } from "@/components/AddArticleModal";
import { ArticleCard } from "@/components/ArticleCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { useMutationAddArticle } from "@/hooks/useMutationAddArticle";
import { useMutationPutArticle } from "@/hooks/useMutationPutArticle";
import { useQueryAllArticles } from "@/hooks/useQueryAllArticles";
import { ArticleModel } from "@/models/ArticleModel";
import { useBlog } from "@/provider/BlogProvider";

const Index = () => {
  const { articles, setCurrentArticle } = useBlog();
  const [edit, setEdit] = useState({} as ArticleModel);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addArticleAsync } = useMutationAddArticle();
  const { updateArticleAsync } = useMutationPutArticle();
  const { refetchGetAllArticles } = useQueryAllArticles();
  const isMobile = useIsMobile();

  useEffect(() => {
    setCurrentArticle(null);
  }, []);

  async function handleAddArticle(title: string, summary: string, imageUrl: string) {
    if (edit.title) {
      await handleEditArticle(title, summary, imageUrl);
    } else {
      const newArticle: ArticleModel = {
        id: uuidv4(),
        title,
        summary,
        image: imageUrl,
        html: "",
        createdAt: new Date(),
        lastUpdate: new Date(),
        statistics: { countViews: 0, timeRead: 0, lastAccess: new Date() },
      };

      await addArticleAsync(newArticle);
    }
    refetchGetAllArticles();
  }

  async function handleEditArticle(title: string, summary: string, imageUrl: string) {
    const aux = { ...edit, title, summary, image: imageUrl, lastUpdate: new Date() };
    await updateArticleAsync(aux);
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8 md:mb-12 content-animation">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-medium mb-2 sm:mb-3 md:mb-4">
            Meu blog pessoal
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-3xl dark:text-white/60">
            Bem-vindo ao meu espaço na web, onde compartilho pensamentos, idéias e histórias. Explore os artigos abaixo
            e aproveite a jornada.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {articles.map((article, index) => (
            <ArticleCard
              key={article.id}
              id={article.id}
              title={article.title}
              summary={article.summary}
              image={article.image}
              className={`content-animation`}
              style={{ animationDelay: `${index * 0.1}s` }}
              setIsModalOpen={setIsModalOpen}
              setEdit={setEdit}
            />
          ))}
        </div>
      </div>

      <AddArticle
        icon={Plus}
        onClick={() => {
          setEdit({} as ArticleModel);
          setIsModalOpen(true);
        }}
        className={isMobile ? "h-10 w-10" : ""}
      />

      <AddArticleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddArticle={handleAddArticle}
        edit={edit}
      />
    </>
  );
};

export default Index;
