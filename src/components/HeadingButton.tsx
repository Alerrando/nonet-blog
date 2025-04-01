import { Editor } from "@tiptap/react";

interface HeadingButtonProps {
  label: string;
  level: number;
  editor: Editor;
}

export function HeadingButton({ editor, label, level }: HeadingButtonProps) {
  return (
    <button
      onClick={() => editor?.chain().focus().toggleHeading({ level: level }).run()}
      className={`p-2 rounded hover:bg-zinc-700 ${editor?.isActive("heading", { level: level }) ? "bg-violet-600 text-white" : "text-zinc-300"}`}
    >
      {label}
    </button>
  );
}
