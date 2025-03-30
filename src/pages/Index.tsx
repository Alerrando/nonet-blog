import { QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import AddArticleButton from "@/components/AddArticleButton";
import { AddArticleModal } from "@/components/AddArticleModal";
import { ArticleCard } from "@/components/ArticleCard";
import { ArticleModel } from "@/models/ArticleModel";
import { useBlog } from "@/provider/BlogProvider";

const Index = () => {
  const { articles, addArticleAsync, refetchGetAllArticles } = useBlog();
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleAddArticle(title: string, summary: string, imageUrl: string) {
    const newArticle: ArticleModel = {
      id: uuidv4(),
      title,
      summary,
      image: imageUrl,
      html: "",
      lastUpdate: new Date(),
    };

    await addArticleAsync(newArticle);
    refetchGetAllArticles();
  }

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 content-animation">
          <h1 className="text-4xl md:text-5xl font-heading font-medium mb-4">Meu blog pessoal</h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Bem -vindo ao meu espaço na web, onde compartilho pensamentos, idéias e histórias.Explore os artigos abaixo
            e aproveite a jornada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {articles.map((article, index) => (
            <ArticleCard
              key={article.id}
              title={article.title}
              summary={article.summary}
              image={article.image}
              className={`content-animation`}
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
      </div>

      <AddArticleButton onClick={() => setIsModalOpen(true)} />

      <AddArticleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddArticle={handleAddArticle} />
    </>
  );
};

export default Index;
