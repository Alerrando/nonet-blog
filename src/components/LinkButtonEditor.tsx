import { Editor } from "@tiptap/react";
import { Link } from "lucide-react";
import { useCallback } from "react";

import { useIsMobile } from "@/hooks/use-mobile";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface LinkButtonEditorProps {
  editor: Editor;
}

export function LinkButtonEditor({ editor }: LinkButtonEditorProps) {
  const isMobile = useIsMobile();

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    try {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    } catch (e) {
      alert(e.message);
    }
  }, [editor]);

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <button onClick={setLink} className={`p-2 rounded hover:bg-zinc-700`}>
            <Link size={isMobile ? 16 : 18} onClick={setLink} />
          </button>
        </TooltipTrigger>
        <TooltipContent className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
          <p>Selecione um texto e transforme ele em um link</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
