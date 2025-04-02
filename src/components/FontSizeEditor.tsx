import { Editor } from "@tiptap/react";
import React, { useEffect, useState } from "react";

interface FontSizeEditorProps {
  editor: Editor;
}

export const FontSizeEditor = React.forwardRef<HTMLDivElement, FontSizeEditorProps>(({ editor }, ref) => {
  const [fontSize, setFontSize] = useState("16px");
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    if (editor) {
      const currentSize = editor.getAttributes("textStyle").fontSize || "16px";
      setFontSize(currentSize);
    }
  }, [editor?.state.selection]);

  return (
    <div ref={ref} className="flex items-center">
      <div className="relative">
        <select
          value={fontSize}
          onChange={(e) => {
            setFontSize(e.target.value);
            editor.chain().focus().setFontSize(e.target.value).run();
          }}
          name="fontSize"
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
});

FontSizeEditor.displayName = "FontSizeEditor";
