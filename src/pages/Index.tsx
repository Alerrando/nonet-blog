
import React, { useState } from 'react';
import Header from '@/components/Header';
import ArticleCard from '@/components/ArticleCard';
import AddArticleButton from '@/components/AddArticleButton';
import AddArticleModal from '@/components/AddArticleModal';
import Footer from '@/components/Footer';

interface Article {
  id: number;
  title: string;
  summary: string;
  image: string;
}

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articles, setArticles] = useState<Article[]>([
    {
      id: 1,
      title: "The Art of Minimalism in Design",
      summary: "Explore how minimalism can enhance user experience and create more intuitive interfaces. This article covers the principles of minimalist design and how to apply them.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 2,
      title: "Creating Delightful User Experiences",
      summary: "Learn how small details and micro-interactions can create memorable and delightful experiences for your users. This guide explores practical techniques.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 3,
      title: "The Psychology of Color in Web Design",
      summary: "Discover how colors affect user perception and behavior, and how to use color psychology to create more effective web designs.",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 4,
      title: "Responsive Design Best Practices",
      summary: "A comprehensive guide to creating responsive websites that work seamlessly across all devices. Learn about flexible grids, media queries, and more.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 5,
      title: "Typography Fundamentals for Web Design",
      summary: "Understand the basics of typography and how to choose and pair fonts for maximum readability and visual appeal in your web projects.",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80"
    }
  ]);

  const handleAddArticle = (title: string, imageUrl: string) => {
    const newArticle: Article = {
      id: Date.now(),
      title,
      summary: "This is a placeholder summary for the newly added article. Click to read more.",
      image: imageUrl
    };
    
    setArticles([newArticle, ...articles]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 content-animation">
            <h1 className="text-4xl md:text-5xl font-heading font-medium mb-4">
              My Personal Blog
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Welcome to my space on the web where I share thoughts, ideas, and stories. Explore the articles below and enjoy the journey.
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
      </main>
      
      <Footer />
      
      <AddArticleButton onClick={() => setIsModalOpen(true)} />
      
      <AddArticleModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddArticle={handleAddArticle}
      />
    </div>
  );
};

export default Index;
