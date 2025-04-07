import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import { ArticleModel } from "@/models/ArticleModel";
import { useBlog } from "@/provider/BlogProvider";

interface ArticleCardProps {
  id: string;
  title: string;
  summary: string;
  image: string;
  className?: string;
  setIsModalOpen: (isOpen: boolean) => void;
  setEdit: (edit: ArticleModel) => void;
}

export function ArticleCard({ id, title, summary, image, className, setIsModalOpen, setEdit }: ArticleCardProps) {
  const { getArticleByName } = useBlog();

  async function handleEdit() {
    const aux = await getArticleByName(title);
    setEdit(aux);
    setIsModalOpen(true);
  }

  return (
    <div
      className={cn(
        "bg-card rounded-lg overflow-hidden shadow-sm card-hover content-animation",
        "hover:shadow-md transition-shadow duration-300",
        "dark:bg-gray-800 dark:hover:shadow-lg dark:hover:shadow-gray-700/50",
        className,
      )}
    >
      <div className="aspect-[4/3] sm:aspect-[16/9] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="p-4 sm:p-6">
        <header className="w-full flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-medium mb-1 sm:mb-2 line-clamp-2 dark:text-white">{title}</h3>

          <CiEdit
            size={20}
            className="hover:text-zinc-700 dark:hover:text-gray-300 transition-colors cursor-pointer min-w-[20px] dark:text-gray-400"
            onClick={() => handleEdit()}
          />
        </header>
        <p className="text-muted-foreground text-xs sm:text-sm line-clamp-3 dark:text-gray-400">{summary}</p>
        <div className="mt-3 sm:mt-4">
          <Link to={`/article/${id}`}>
            <button className="text-primary font-medium text-xs sm:text-sm inline-flex items-center group dark:text-blue-400">
              Read More
              <svg
                className="ml-1 h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1 dark:text-blue-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
