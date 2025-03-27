import { ComponentProps } from "react";
type TextsProps = ComponentProps<"span">;

export function Texts({ title }: TextsProps) {
  return (
    <span className="text-xs text-zinc-800 group-hover:text-zinc-950 dark:text-zinc-200 dark:group-hover:text-zinc-50">
      {title}
    </span>
  );
}
