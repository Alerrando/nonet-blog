import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Editor } from "@/components/Editor/Editor";
import { Button } from "@/components/ui/button";
import { useBlog } from "@/provider/BlogProvider";

export function Article() {
  const { title } = useParams();
  const { getArticleByName } = useBlog();
  const [currentArticle, setCurrentArticle] = useState<ArticleModel | null>(null);

  useEffect(() => {
    if (!title) return;
    const aux = getArticleByName(title);
    setCurrentArticle(aux);
  }, [title]);

  if (!currentArticle) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <h2 className="text-2xl font-medium mb-4">Article not found</h2>
        <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist or has been removed.</p>
        <Link to="/">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link to="/">
          <Button variant="ghost" className="pl-0 hover:bg-transparent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Button>
        </Link>
      </div>

      <div className="w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-8">
        <img src={currentArticle.image} alt={currentArticle.title} className="w-full h-full object-cover" />
      </div>

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4">{currentArticle.title}</h1>
        <div className="flex items-center text-muted-foreground">
          <div className="flex items-center mr-4">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="text-sm">{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-sm">5 min read</span>
          </div>
        </div>
      </div>

      <Editor isNewContent={false} saveAnnotation={() => {}} />
    </div>
  );
}
