import { ButtonHTMLAttributes, HtmlHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface AddArticleButtonProps extends ButtonHTMLAttributes<HtmlHTMLAttributes> {
  onClick: () => void;
  icon: HTMLElement;
}

export function AddArticle({ onClick, icon: Icon, ...rest }: AddArticleButtonProps) {
  return (
    <button
      {...rest}
      onClick={onClick}
      className={twMerge(
        "fixed bottom-8 right-8 z-40 bg-primary text-primary-foreground rounded-full p-4 shadow-lg btn-hover",
        rest.className,
      )}
      aria-label="Add new article"
    >
      <Icon className="h-6 w-6" />
    </button>
  );
}
