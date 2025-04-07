import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import AddArticleButton from "@/components/AddArticleButton";
import { AddArticleModal } from "@/components/AddArticleModal";
import { ArticleCard } from "@/components/ArticleCard";
import { ArticleModel } from "@/models/ArticleModel";
import { useBlog } from "@/provider/BlogProvider";

const Index = () => {
  const { articles, addArticleAsync, refetchGetAllArticles, updateArticleAsync } = useBlog();
  const [edit, setEdit] = useState({} as ArticleModel);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        lastUpdate: new Date(),
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 md:mb-12 content-animation">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium mb-3 md:mb-4">Meu blog pessoal</h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-3xl dark:text-white/60">
            Bem-vindo ao meu espaço na web, onde compartilho pensamentos, idéias e histórias. Explore os artigos abaixo
            e aproveite a jornada.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
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

      <AddArticleButton
        onClick={() => {
          setEdit({} as ArticleModel);
          setIsModalOpen(true);
        }}
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
