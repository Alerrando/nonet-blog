import "highlight.js/styles/panda-syntax-dark.css";
import "./Editor.css";

import { Color } from "@tiptap/extension-color";
import Image from "@tiptap/extension-image";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import js from "highlight.js/lib/languages/javascript";
import html from "highlight.js/lib/languages/xml";
import { all, createLowlight } from "lowlight";
import { RefreshCw } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { GoListOrdered, GoListUnordered } from "react-icons/go";
import { RxCode, RxFontBold, RxFontItalic, RxStrikethrough } from "react-icons/rx";
import { twMerge } from "tailwind-merge";

import { useToast } from "@/hooks/use-toast";
import { FontSize } from "@/lib/FontSizeExtension";
import { ArticleModel } from "@/models/ArticleModel";

import { ColorPicker } from "../ColorPicker/ColorPicker";
import { FontSizeEditor } from "../FontSizeEditor";
import { FormatButton } from "../FormatButton";
import { HeadingButton } from "../HeadingButton";
import { DialogImage } from "./DialogImage/DialogImage";
import { MenuBubbleEditor } from "./MenuBubbleEditor/MenuBubbleEditor";

const lowlight = createLowlight(all);

lowlight.register("html", html);
lowlight.register("js", js);

type EditorProps = {
  isNewContent: boolean;
  saveAnnotation: (getHtml: string | undefined, id?: string) => void;
  currentArticle: ArticleModel;
  edit: boolean;
  setEdit: (edit: boolean) => void;
};

export function Editor({ isNewContent, saveAnnotation, currentArticle, edit, setEdit }: EditorProps) {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        dropcursor: false,
        gapcursor: false,
      }),
      Color,
      TextStyle,
      Image,
      FontSize,
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "h-full outline-none z-10",
      },
      transformPastedHTML(html) {
        return html.replace(/<img[^>]*>/g, "");
      },
    },
    enableInputRules: false,
    enablePasteRules: false,
    parseOptions: {
      preserveWhitespace: false,
    },
  });

  function handleSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    editor.chain().focus().setImage({ src: e.target[0].value }).run();
  }

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(currentArticle.html);
    }
  }, [currentArticle]);

  const handleSaveWithFeedback = async (manual = false) => {
    if (!editor) return;

    setIsSaving(true);
    saveAnnotation(editor.getHTML(), currentArticle.id);

    setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSaveWithFeedback();
    }, 6000);

    return () => clearTimeout(timer);
  }, [editor?.getHTML()]);

  return (
    <div className="flex flex-col gap-2 sm:gap-4 relative">
      {edit ? (
        <>
          <div className="flex flex-wrap gap-2 sm:gap-4 p-2 bg-zinc-800 rounded-lg sticky top-16 sm:top-24 z-20">
            <div className="flex flex-wrap gap-1 sm:gap-2 w-full sm:w-auto">
              <ColorPicker editor={editor} />
              <div className="flex gap-1 sm:gap-2">
                <HeadingButton editor={editor} label="H1" level={1} />
                <HeadingButton editor={editor} label="H2" level={2} />
                <HeadingButton editor={editor} label="H3" level={3} />
                <FontSizeEditor editor={editor} />
              </div>
            </div>

            <div className="flex flex-wrap gap-1 sm:gap-2 w-full sm:w-auto">
              <FormatButton editor={editor} icon={<RxFontBold />} fontEditorName="toggleBold" font="bold" />
              <FormatButton editor={editor} icon={<RxFontItalic />} fontEditorName="toggleItalic" font="italic" />
              <FormatButton editor={editor} icon={<RxStrikethrough />} fontEditorName="toggleStrike" font="strike" />
              <FormatButton editor={editor} icon={<RxCode />} fontEditorName="toggleCode" font="code" />
              <DialogImage />
            </div>

            <div className="flex flex-wrap gap-1 sm:gap-2 w-full sm:w-auto">
              <FormatButton
                editor={editor}
                icon={<GoListUnordered size={18} />}
                fontEditorName="toggleBulletList"
                font="bulletList"
              />
              <FormatButton
                editor={editor}
                icon={<GoListOrdered size={16} />}
                fontEditorName="toggleOrderedList"
                font="orderedList"
              />
              <FormatButton editor={editor} icon={<RxCode />} fontEditorName="toggleCodeBlock" font="codeBlock" />
            </div>

            <div className="ml-auto flex items-center justify-center w-full sm:w-auto mt-2 sm:mt-0">
              {isSaving && (
                <span className="text-xs sm:text-sm text-zinc-300 flex items-center gap-1">
                  <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                  Salvando...
                </span>
              )}
            </div>
          </div>

          <EditorContent
            editor={editor}
            className={twMerge(
              `w-full h-auto flex flex-col-reverse mx-auto prose prose-invert relative editor`,
              `${
                editor?.getText().length === 0
                  ? "after:w-auto after:h-min after:content-['Sem_Titulo'] after:block after:text-zinc-600 after:text-2xl sm:text-4xl after:absolute after:-top-2 after:z-0"
                  : ""
              }`,
              `px-2 sm:px-4 ${isNewContent && "md:max-w-[92%] m-[0_auto!important]"}`,
              `md:mr-[15%] lg:mr-[25%]`,
            )}
          />

          <div className="w-full h-auto flex flex-col sm:flex-row items-center justify-end gap-2 sm:gap-4 px-2 sm:px-0">
            <button
              className="w-full sm:w-auto px-4 sm:px-6 md:px-8 py-1 md:py-2 border border-zinc-600 rounded-lg hover:bg-zinc-600 text-zinc-600 hover:text-white text-sm sm:text-base"
              onClick={() => setEdit(false)}
            >
              Cancelar
            </button>
            <button
              className="w-full sm:w-auto px-4 sm:px-6 md:px-8 py-1 md:py-2 border border-green-600 rounded-lg hover:bg-green-600 text-green-600 hover:text-white text-sm sm:text-base"
              onClick={() => saveAnnotation(editor?.getHTML(), currentArticle.id)}
            >
              Salvar
            </button>
          </div>

          {editor && <MenuBubbleEditor editor={editor} />}
        </>
      ) : (
        <div className="px-2 sm:px-4 md:px-0" dangerouslySetInnerHTML={{ __html: currentArticle.html }} />
      )}
    </div>
  );
}
