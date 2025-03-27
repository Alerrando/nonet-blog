
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useBlog } from '@/provider/BlogProvider';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export function Article() {
  const { title } = useParams<{ title: string }>();
  const { articles, setCurrentArticle, currentArticle } = useBlog();

  // Find the article by title from the URL
  useEffect(() => {
    const decodedTitle = decodeURIComponent(title || '');
    const foundArticle = articles.find(article => article.title === decodedTitle);
    if (foundArticle) {
      setCurrentArticle(foundArticle);
    }
  }, [title, articles, setCurrentArticle]);

  if (!currentArticle) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <h2 className="text-2xl font-medium mb-4">Article not found</h2>
        <p className="text-muted-foreground mb-6">
          The article you're looking for doesn't exist or has been removed.
        </p>
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
      {/* Back button */}
      <div className="mb-6">
        <Link to="/">
          <Button variant="ghost" className="pl-0 hover:bg-transparent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Button>
        </Link>
      </div>

      {/* Article header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4">
          {currentArticle.title}
        </h1>
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

      {/* Article hero image */}
      <div className="w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-8">
        <img 
          src={currentArticle.image} 
          alt={currentArticle.title} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article content */}
      <div className="prose prose-lg max-w-none">
        <p className="text-xl font-medium mb-6">{currentArticle.summary}</p>
        
        <p className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        
        <p className="mb-4">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <h2 className="text-2xl font-medium my-6">More about this topic</h2>
        
        <p className="mb-4">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </p>
        
        <p className="mb-4">
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
        </p>
      </div>

      {/* Related articles section */}
      <div className="mt-12 mb-8">
        <h3 className="text-2xl font-medium mb-6">You might also like</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles
            .filter(article => article.id !== currentArticle.id)
            .slice(0, 2)
            .map(article => (
              <Card key={article.id} className="overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h4 className="text-lg font-medium mb-2">{article.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">{article.summary}</p>
                  <Link to={`/article/${article.title}`} className="text-primary font-medium text-sm inline-flex items-center group mt-2">
                    Read More
                    <svg 
                      className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
