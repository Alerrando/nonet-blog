import { BubbleMenu, Editor } from "@tiptap/react";
import { useEffect, useState } from "react";
import { RxCode, RxFontBold, RxFontItalic, RxStrikethrough } from "react-icons/rx";

import { FontSizeEditor } from "@/components/FontSizeEditor";
import { FormatButton } from "@/components/FormatButton";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface MenuBubbleEditorProps {
  editor: Editor;
}

export function MenuBubbleEditor({ editor }: MenuBubbleEditorProps) {
  const [fontSize, setFontSize] = useState("16px");
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    if (editor) {
      const currentSize = editor.getAttributes("textStyle").fontSize || "16px";
      setFontSize(currentSize);
    }
  }, [editor?.state.selection]);

  return (
    <BubbleMenu editor={editor}>
      <ToggleGroup
        className="bg-zinc-800 shadow-xl border border-zinc-600 shadow-black/20 rounded-lg overflow-hidden flex divide-x divide-zinc-600 p-1"
        type="single"
        defaultValue="text"
        aria-label="Menu Bubble Item"
      >
        <div className="flex items-center">
          <ToggleGroupItem asChild>
            <FormatButton editor={editor} icon={<RxFontBold />} fontEditorName="toggleBold" font="bold" />
          </ToggleGroupItem>

          <ToggleGroupItem asChild>
            <FormatButton editor={editor} icon={<RxFontItalic />} fontEditorName="toggleItalic" font="italic" />
          </ToggleGroupItem>

          <ToggleGroupItem asChild>
            <FormatButton editor={editor} icon={<RxStrikethrough />} fontEditorName="toggleStrike" font="strike" />
          </ToggleGroupItem>

          <ToggleGroupItem asChild>
            <FormatButton editor={editor} icon={<RxCode />} fontEditorName="toggleCode" font="code" />
          </ToggleGroupItem>

          <ToggleGroupItem asChild>
            <FontSizeEditor editor={editor} />
          </ToggleGroupItem>
        </div>
      </ToggleGroup>
    </BubbleMenu>
  );
}
