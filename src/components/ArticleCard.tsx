
import React from 'react';
import { cn } from '@/lib/utils';

interface ArticleCardProps {
  title: string;
  summary: string;
  image: string;
  className?: string;
}

const ArticleCard = ({ title, summary, image, className }: ArticleCardProps) => {
  return (
    <div 
      className={cn(
        "bg-card rounded-lg overflow-hidden shadow-sm card-hover content-animation",
        className
      )}
    >
      <div className="aspect-[16/9] overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-medium mb-2 line-clamp-2">{title}</h3>
        <p className="text-muted-foreground text-sm line-clamp-3">{summary}</p>
        
        <div className="mt-4">
          <button className="text-primary font-medium text-sm inline-flex items-center group">
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
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
