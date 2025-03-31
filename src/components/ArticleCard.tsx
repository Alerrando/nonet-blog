import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import { ArticleModel } from "@/models/ArticleModel";
import { useBlog } from "@/provider/BlogProvider";

interface ArticleCardProps {
  title: string;
  summary: string;
  image: string;
  className?: string;
  setIsModalOpen: (isOpen: boolean) => void;
  setEdit: (edit: ArticleModel) => void;
}

export function ArticleCard({ title, summary, image, className, setIsModalOpen, setEdit }: ArticleCardProps) {
  const { getArticleByName } = useBlog();

  async function handleEdit() {
    const aux = await getArticleByName(title);

    setEdit(aux);
    setIsModalOpen(true);
  }

  return (
    <div className={cn("bg-card rounded-lg overflow-hidden shadow-sm card-hover content-animation", className)}>
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="p-6">
        <header className="w-full flex items-center justify-between">
          <h3 className="text-xl font-medium mb-2 line-clamp-2">{title}</h3>

          <CiEdit
            size={24}
            className="hover:text-zinc-700 transition-colors cursor-pointer"
            onClick={() => handleEdit()}
          />
        </header>
        <p className="text-muted-foreground text-sm line-clamp-3">{summary}</p>

        <div className="mt-4">
          <Link to={`/article/${title}`}>
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
          </Link>
        </div>
      </div>
    </div>
  );
}
