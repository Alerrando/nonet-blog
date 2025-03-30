import "highlight.js/styles/panda-syntax-dark.css";
import "./Editor.css";

import BulletList from "@tiptap/extension-bullet-list";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { Color } from "@tiptap/extension-color";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import js from "highlight.js/lib/languages/javascript";
import html from "highlight.js/lib/languages/xml";
import { all, createLowlight } from "lowlight";
import { useEffect } from "react";
import { FaImage } from "react-icons/fa";
import { RxCode, RxFontBold, RxFontItalic, RxListBullet, RxStrikethrough } from "react-icons/rx";
import { twMerge } from "tailwind-merge";

import { ArticleModel } from "@/models/ArticleModel";

import { ColorPicker } from "../ColorPicker/ColorPicker";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

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
    ],
    content: currentArticle.html,
    editorProps: {
      attributes: {
        class: "h-full outline-none z-10",
      },
    },
  });

  function handleSave(e) {
    e.preventDefault();
    console.log(e.target[0].value);
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
          <div className="flex flex-wrap gap-1 p-2 bg-zinc-800 rounded-lg sticky top-24 z-20">
            <ColorPicker editor={editor} />

            <div className="flex sticky gap-1">
              <button
                onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`p-2 rounded hover:bg-zinc-700 ${editor?.isActive("heading", { level: 1 }) ? "bg-violet-600 text-white" : "text-zinc-300"}`}
              >
                H1
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-2 rounded hover:bg-zinc-700 ${editor?.isActive("heading", { level: 2 }) ? "bg-violet-600 text-white" : "text-zinc-300"}`}
              >
                H2
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`p-2 rounded hover:bg-zinc-700 ${editor?.isActive("heading", { level: 3 }) ? "bg-violet-600 text-white" : "text-zinc-300"}`}
              >
                H3
              </button>
            </div>

            <div className="flex gap-1">
              <button
                onClick={() => editor?.chain().focus().toggleBold().run()}
                className={`p-2 rounded hover:bg-zinc-700 ${editor?.isActive("bold") ? "bg-violet-600 text-white" : "text-zinc-300"}`}
                title="Negrito"
              >
                <RxFontBold />
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                className={`p-2 rounded hover:bg-zinc-700 ${editor?.isActive("italic") ? "bg-violet-600 text-white" : "text-zinc-300"}`}
                title="Itálico"
              >
                <RxFontItalic />
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleStrike().run()}
                className={`p-2 rounded hover:bg-zinc-700 ${editor?.isActive("strike") ? "bg-violet-600 text-white" : "text-zinc-300"}`}
                title="Riscado"
              >
                <RxStrikethrough />
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleCode().run()}
                className={`p-2 rounded hover:bg-zinc-700 ${editor?.isActive("code") ? "bg-violet-600 text-white" : "text-zinc-300"}`}
                title="Código"
              >
                <RxCode />
              </button>

              <Dialog>
                <DialogTrigger asChild>
                  <button className={`p-2 rounded hover:bg-zinc-700 text-white`} title="Inserir imagem">
                    <FaImage />
                  </button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                  <form action="" onSubmit={handleSave}>
                    <DialogHeader>
                      <DialogTitle>Adicionar Imagem</DialogTitle>
                      <DialogDescription>
                        Adicione uma imagem para o seu artigo. Clique em Salvar quando terminar.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                      {/* Campo de URL */}
                      <div className="w-full flex flex-col gap-2">
                        <Label htmlFor="url">Url da Imagem</Label>
                        <Input id="url" type="url" accept="image/*" name="url" className="w-full" required />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button type="submit" className="w-full">
                        Salvar
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex gap-1">
              <button
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded hover:bg-zinc-700 ${editor?.isActive("bulletList") ? "bg-violet-600 text-white" : "text-zinc-300"}`}
                title="Lista"
              >
                <RxListBullet />
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
                className={`p-2 rounded hover:bg-zinc-700 ${editor?.isActive("codeBlock") ? "bg-violet-600 text-white" : "text-zinc-300"}`}
                title="Bloco de código"
              >
                <RxCode />
              </button>
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
        </>
      ) : (
        <>{currentArticle.html}</>
      )}
    </div>
  );
}
