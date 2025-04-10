
import { ButtonHTMLAttributes, ElementType } from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface AddArticleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  classNameIcon?: string;
  icon: IconType | ElementType;
}

export function AddArticle({ onClick, icon: Icon, classNameIcon, ...rest }: AddArticleButtonProps) {
  return (
    <button
      {...rest}
      onClick={onClick}
      className={twMerge(
        "fixed bottom-8 right-8 z-40 bg-primary text-white flex items-center justify-center rounded-full md:p-4 shadow-lg btn-hover",
        rest.className,
      )}
      aria-label="Add new article"
    >
      <Icon className={twMerge("h-6 w-6", classNameIcon)} />
    </button>
  );
}
