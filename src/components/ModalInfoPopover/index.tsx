import { twMerge } from "tailwind-merge";

type ModalInfoPopoverProps = {
  src: string;
  alt: string;
  spanText: string;
  classNamePopover: string;
};

export function ModalInfoPopover({ src, alt, spanText, classNamePopover }: ModalInfoPopoverProps) {
  return (
    <div
      className={twMerge(
        "w-[55%] h-auto hidden group-hover:flex flex-col gap-2 justify-center bg-black border border-zinc-200 fixed left-full shadow-xl py-2 px-3 rounded-md",
        classNamePopover,
      )}
    >
      <img src={src} alt={alt} className="w-full h-24 rounded-md" />

      <span className="text-white text-xs">{spanText}</span>
    </div>
  );
}
