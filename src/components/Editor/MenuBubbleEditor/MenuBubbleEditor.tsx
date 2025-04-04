import { BubbleMenu, Editor } from "@tiptap/react";
import { useEffect, useState } from "react";
import { RxCode, RxFontBold, RxFontItalic, RxStrikethrough } from "react-icons/rx";

import { ColorPicker } from "@/components/ColorPicker/ColorPicker";
import { FontSizeEditor } from "@/components/FontSizeEditor";
import { FormatButton } from "@/components/FormatButton";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface MenuBubbleEditorProps {
  editor: Editor;
}

export function MenuBubbleEditor({ editor }: MenuBubbleEditorProps) {
  const [fontSize, setFontSize] = useState("16px");

  useEffect(() => {
    if (editor) {
      const currentSize = editor.getAttributes("textStyle").fontSize || "16px";
      setFontSize(currentSize);
    }
  }, [editor?.state.selection]);

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{
        maxWidth: "none",
        placement: "top",
        duration: 200,
        animation: "shift-away",
        moveTransition: "transform 0.2s ease-out",
      }}
    >
      <ToggleGroup
        className="bg-zinc-800 shadow-xl border border-zinc-600 shadow-black/20 rounded-lg overflow-hidden flex divide-x divide-zinc-600 p-0.5 sm:p-1"
        type="single"
        defaultValue="text"
        aria-label="Menu Bubble Item"
      >
        <div className="flex items-center flex-wrap">
          <ToggleGroupItem asChild className="p-1 sm:p-2">
            <ColorPicker editor={editor} />
          </ToggleGroupItem>

          <ToggleGroupItem asChild className="p-1 sm:p-2">
            <FormatButton editor={editor} icon={<RxFontBold size={16} />} fontEditorName="toggleBold" font="bold" />
          </ToggleGroupItem>

          <ToggleGroupItem asChild className="p-1 sm:p-2">
            <FormatButton
              editor={editor}
              icon={<RxFontItalic size={16} />}
              fontEditorName="toggleItalic"
              font="italic"
            />
          </ToggleGroupItem>

          <ToggleGroupItem asChild className="p-1 sm:p-2">
            <FormatButton
              editor={editor}
              icon={<RxStrikethrough size={16} />}
              fontEditorName="toggleStrike"
              font="strike"
            />
          </ToggleGroupItem>

          <ToggleGroupItem asChild className="p-1 sm:p-2">
            <FormatButton editor={editor} icon={<RxCode size={16} />} fontEditorName="toggleCode" font="code" />
          </ToggleGroupItem>

          <ToggleGroupItem asChild className="p-1 sm:p-2">
            <div className="w-[80px] sm:w-[100px]">
              <FontSizeEditor editor={editor} />
            </div>
          </ToggleGroupItem>
        </div>
      </ToggleGroup>
    </BubbleMenu>
  );
}
