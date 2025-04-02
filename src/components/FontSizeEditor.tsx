import { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";

interface FontSizeEditorProps {
  editor: Editor;
}

export function FontSizeEditor({ editor }: FontSizeEditorProps) {
  const [fontSize, setFontSize] = useState("16px");
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    if (editor) {
      const currentSize = editor.getAttributes("textStyle").fontSize || "16px";
      setFontSize(currentSize);
    }
  }, [editor?.state.selection]);

  return (
    <div className="flex items-center">
      <div className="relative">
        <select
          value={fontSize}
          onChange={(e) => {
            setFontSize(e.target.value);
            editor.chain().focus().setFontSize(e.target.value).run();
          }}
          className="bg-zinc-700 text-white text-xs rounded pl-2 pr-6 py-1 border border-zinc-600 focus:outline-none focus:ring-1 focus:ring-violet-500"
        >
          {["10px", "12px", "14px", "16px", "18px", "24px"].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
