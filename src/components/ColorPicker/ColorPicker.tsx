import { Editor } from "@tiptap/react";
import { RxColorWheel } from "react-icons/rx";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface ColorPickerProps {
  editor: Editor;
}

export function ColorPicker({ editor }: ColorPickerProps) {
  const colors = ["#000000", "#ffffff", "#ef4444", "#f97316", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899"];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={`p-2 rounded hover:bg-zinc-700 ${editor?.isActive("textStyle", { color: true }) ? "bg-violet-600 text-white" : "text-zinc-300"}`}
          title="Cor do texto"
        >
          <RxColorWheel />
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-2 bg-zinc-800 rounded-lg shadow-lg grid grid-cols-3 gap-1 z-50">
        {colors.map((color) => (
          <button
            key={color}
            className={`w-8 h-8 rounded-full hover:ring-2 hover:ring-white ${editor.isActive("textStyle", { color: color }) ? "is-active" : ""}`}
            style={{ backgroundColor: color }}
            onClick={() => editor?.chain().focus().setColor(color).run()}
            title={`Cor ${color}`}
          />
        ))}
        <button
          className="col-span-3 mt-1 p-1 text-xs text-zinc-300 hover:bg-zinc-700 rounded"
          onClick={() => editor?.chain().focus().unsetColor().run()}
        >
          Remover cor
        </button>
      </PopoverContent>
    </Popover>
  );
}
