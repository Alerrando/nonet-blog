import { Key } from "react";

import { Texts } from "./Texts";

type TextsInputProps = {
  className: string;
  text: string;
};

type FloatingMenuTextsProps = {
  texts: TextsInputProps[];
};

export function FloatingMenuShowTexts({ texts }: FloatingMenuTextsProps) {
  return (
    <div className="flex flex-col text-left">
      {texts.map((text: TextsInputProps, index: Key) => (
        <Texts className={"text-sm text-zinc-50 dark:text-black"} title={text.text} key={index} />
      ))}
    </div>
  );
}
