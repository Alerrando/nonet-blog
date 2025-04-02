import { Editor } from "@tiptap/react";
import React from "react";

interface FormatButtonProps {
  editor: Editor;
  icon: React.ReactNode;
  fontEditorName: string;
  font: string;
}

export const FormatButton = React.forwardRef<HTMLButtonElement, FormatButtonProps>(
  ({ editor, font, icon, fontEditorName }, ref) => {
    function handleClick() {
      if (editor) {
        editor.chain().focus()[fontEditorName]().run();
      }
    }

    return (
      <button
        ref={ref}
        onClick={handleClick}
        className={`p-2 rounded hover:bg-zinc-700 ${
          editor?.isActive(font) ? "bg-violet-600 text-white" : "text-zinc-300"
        }`}
        title={font}
      >
        {icon}
      </button>
    );
  },
);

FormatButton.displayName = "FormatButton";
