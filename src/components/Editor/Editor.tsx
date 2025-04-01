import "highlight.js/styles/panda-syntax-dark.css";
import "./Editor.css";

import BulletList from "@tiptap/extension-bullet-list";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { Color } from "@tiptap/extension-color";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import js from "highlight.js/lib/languages/javascript";
import html from "highlight.js/lib/languages/xml";
import { all, createLowlight } from "lowlight";
import { FormEvent, useEffect } from "react";
import { GoListOrdered, GoListUnordered } from "react-icons/go";
import { RxCode, RxFontBold, RxFontItalic, RxStrikethrough } from "react-icons/rx";
import { twMerge } from "tailwind-merge";

import { ArticleModel } from "@/models/ArticleModel";

import { ColorPicker } from "../ColorPicker/ColorPicker";
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
  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Paragraph,
      BulletList,
      Color,
      TextStyle,
      Image,
    ],
    content: currentArticle.html,
    editorProps: {
      attributes: {
        class: "h-full outline-none z-10",
      },
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

  return (
    <div className="flex flex-col gap-4 relative">
      {edit ? (
        <>
          <div className="flex flex-wrap gap-4 p-2 bg-zinc-800 rounded-lg sticky top-24 z-20">
            <ColorPicker editor={editor} />

            <div className="flex sticky gap-1">
              <HeadingButton editor={editor} label="H1" level={1} />
              <HeadingButton editor={editor} label="H2" level={2} />
              <HeadingButton editor={editor} label="H3" level={3} />
            </div>

            <div className="flex gap-1">
              <FormatButton editor={editor} icon={<RxFontBold />} fontEditorName="toggleBold" font="bold" />
              <FormatButton editor={editor} icon={<RxFontItalic />} fontEditorName="toggleItalic" font="italic" />
              <FormatButton editor={editor} icon={<RxStrikethrough />} fontEditorName="toggleStrike" font="strike" />
              <FormatButton editor={editor} icon={<RxCode />} fontEditorName="toggleCode" font="code" />

              <DialogImage />
            </div>

            <div className="flex gap-1">
              <FormatButton
                editor={editor}
                icon={<GoListUnordered size={20} />}
                fontEditorName="toggleBulletList"
                font="bulletList"
              />
              <FormatButton
                editor={editor}
                icon={<GoListOrdered size={18} />}
                fontEditorName="toggleOrderedList"
                font="orderedList"
              />
              <FormatButton editor={editor} icon={<RxCode />} fontEditorName="toggleCodeBlock" font="codeBlock" />
            </div>
          </div>

          <EditorContent
            editor={editor}
            className={twMerge(
              `w-full h-auto flex flex-col-reverse mx-auto prose prose-invert relative editor`,
              `${
                editor?.getText().length === 0
                  ? "after:w-auto after:h-min after:content-['Sem_Titulo'] after:block after:text-zinc-600 after:text-4xl after:absolute after:-top-2 after:z-0"
                  : ""
              }
              ${isNewContent && "md: md:max-w-[92%] m-[0_auto!important]"}
              md:mr-[25%]
              `,
            )}
          />

          <div className="w-full h-auto flex items-center justify-end gap-4">
            <button
              className="px-6 md:px-8 py-1 md:py-2 border border-zinc-600 rounded-lg hover:bg-zinc-600 text-zinc-600 hover:text-white"
              onClick={() => setEdit(false)}
            >
              Cancelar
            </button>
            <button
              className="px-6 md:px-8 py-1 md:py-2 border border-green-600 rounded-lg hover:bg-green-600 text-green-600 hover:text-white"
              onClick={() => saveAnnotation(editor?.getHTML(), currentArticle.id)}
            >
              Salvar
            </button>
          </div>

          {editor && <MenuBubbleEditor editor={editor} />}
        </>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: currentArticle.html }} />
      )}
    </div>
  );
}
