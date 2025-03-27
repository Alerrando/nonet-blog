
import { ArticleModel } from "@/models/ArticleModel"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { v4 as uuidv4 } from 'uuid';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const initialBlogState: ArticleModel[] = [
  {
    id: uuidv4(),
    title: "The Art of Minimalism in Design",
    summary: "Explore how minimalism can enhance user experience and create more intuitive interfaces. This article covers the principles of minimalist design and how to apply them.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: uuidv4(),
    title: "Creating Delightful User Experiences",
    summary: "Learn how small details and micro-interactions can create memorable and delightful experiences for your users. This guide explores practical techniques.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: uuidv4(),
    title: "The Psychology of Color in Web Design",
    summary: "Discover how colors affect user perception and behavior, and how to use color psychology to create more effective web designs.",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: uuidv4(),
    title: "Responsive Design Best Practices",
    summary: "A comprehensive guide to creating responsive websites that work seamlessly across all devices. Learn about flexible grids, media queries, and more.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: uuidv4(),
    title: "Typography Fundamentals for Web Design",
    summary: "Understand the basics of typography and how to choose and pair fonts for maximum readability and visual appeal in your web projects.",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80"
  }
]
