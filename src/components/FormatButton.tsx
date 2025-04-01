import { Editor } from "@tiptap/react";

interface FormatButtonProps {
  editor: Editor;
  icon: React.ReactNode;
  fontEditorName: string;
  font: string;
}

export function FormatButton({ editor, font, icon, fontEditorName }: FormatButtonProps) {
  function handleClick() {
    if (editor) {
      editor.chain().focus()[fontEditorName]().run();
    }
  }

  return (
    <button
      onClick={() => handleClick()}
      className={`p-2 rounded hover:bg-zinc-700 ${editor?.isActive(font) ? "bg-violet-600 text-white" : "text-zinc-300"}`}
      title="Negrito"
    >
      {icon}
    </button>
  );
}
