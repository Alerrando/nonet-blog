import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
type FloatingMenuShowImgProps = ComponentProps<"img">;

export function FloatingMenuShowImg({ src, alt, className }: FloatingMenuShowImgProps) {
  return <img src={src} alt={alt} className={twMerge("w-12 border border-zinc-600 rounded", className)} />;
}
