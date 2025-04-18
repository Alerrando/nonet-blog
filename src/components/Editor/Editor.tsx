import "highlight.js/styles/panda-syntax-dark.css";
import "./Editor.css";

import { Color } from "@tiptap/extension-color";
import Image from "@tiptap/extension-image";
import { Link } from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import js from "highlight.js/lib/languages/javascript";
import html from "highlight.js/lib/languages/xml";
import { all, createLowlight } from "lowlight";
import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { GoListOrdered, GoListUnordered } from "react-icons/go";
import { RxCode, RxFontBold, RxFontItalic, RxStrikethrough } from "react-icons/rx";
import { twMerge } from "tailwind-merge";

import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { useLoading } from "@/hooks/useLoading";
import { FontSize } from "@/lib/FontSizeExtension";
import { useBlog } from "@/provider/BlogProvider";
import { useHistoryProvider } from "@/provider/HistoryArticleProvider";

import { ColorPicker } from "../ColorPicker/ColorPicker";
import { FontSizeEditor } from "../FontSizeEditor";
import { FormatButton } from "../FormatButton";
import { HeadingButton } from "../HeadingButton";
import { LinkButtonEditor } from "../LinkButtonEditor";
import { Loading } from "../Loading";
import { DialogImage } from "./DialogImage/DialogImage";
import { MenuBubbleEditor } from "./MenuBubbleEditor/MenuBubbleEditor";

const lowlight = createLowlight(all);

lowlight.register("html", html);
lowlight.register("js", js);

type EditorProps = {
  isNewContent: boolean;
  saveAnnotation: (getHtml: string | undefined, id?: string, handleButtonClick?: boolean) => void;
  edit: boolean;
  setEdit: (edit: boolean) => void;
};

export function Editor({ isNewContent, saveAnnotation, edit, setEdit }: EditorProps) {
  const { toast } = useToast();
  const { currentArticle, zenMode } = useBlog();
  const { selectedHistory } = useHistoryProvider();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [isSaving, setIsSaving] = useState(false);
  const isMobile = useIsMobile();

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
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":") ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`);

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false;
            }

            // disallowed protocols
            const disallowedProtocols = ["ftp", "file", "mailto"];
            const protocol = parsedUrl.protocol.replace(":", "");

            if (disallowedProtocols.includes(protocol)) {
              return false;
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map((p) => (typeof p === "string" ? p : p.scheme));

            if (!allowedProtocols.includes(protocol)) {
              return false;
            }

            // disallowed domains
            const disallowedDomains = ["example-phishing.com", "malicious-site.net"];
            const domain = parsedUrl.hostname;

            if (disallowedDomains.includes(domain)) {
              return false;
            }

            // all checks have passed
            return true;
          } catch {
            return false;
          }
        },
        shouldAutoLink: (url) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":") ? new URL(url) : new URL(`https://${url}`);

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = ["example-no-autolink.com", "another-no-autolink.com"];
            const domain = parsedUrl.hostname;

            return !disallowedDomains.includes(domain);
          } catch {
            return false;
          }
        },
      }),
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

  const handleSaveWithFeedback = async (manual = false) => {
    if (!editor) return;

    setIsSaving(true);
    saveAnnotation(editor.getHTML(), currentArticle.id);

    setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  };

  useEffect(() => {
    editor?.commands.setContent(currentArticle.html);
  }, []);

  useEffect(() => {
    if (editor?.getHTML() === currentArticle.html || editor?.getHTML() === "<p></p>") return;

    if (selectedHistory.length === 0) {
      const timer = setTimeout(() => {
        handleSaveWithFeedback();
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [editor?.getHTML()]);

  useEffect(() => {
    if (!selectedHistory || !editor || !currentArticle?.history) return;

    startLoading();
    const historyItem = currentArticle.history.find((item) => item.id === selectedHistory);

    if (historyItem?.content) {
      editor.commands.setContent(historyItem.content);
    }

    stopLoading();
  }, [selectedHistory, currentArticle?.history, editor]);

  return (
    <>
      <div className={`flex flex-col gap-2 sm:gap-4 relative ${zenMode ? "zen-editor" : ""}`}>
        {edit ? (
          <>
            <div
              className={`flex flex-wrap gap-1 sm:gap-4 p-1 sm:p-2 bg-zinc-800 rounded-lg sticky top-12 sm:top-16 md:top-24 z-20 ${
                zenMode ? "opacity-80 hover:opacity-100 transition-opacity" : ""
              }`}
            >
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
                <DialogImage editor={editor} />
                <LinkButtonEditor editor={editor} />
              </div>

              <div className="flex flex-wrap gap-1 sm:gap-2 w-full sm:w-auto">
                <FormatButton
                  editor={editor}
                  icon={<GoListUnordered size={isMobile ? 16 : 18} />}
                  fontEditorName="toggleBulletList"
                  font="bulletList"
                />
                <FormatButton
                  editor={editor}
                  icon={<GoListOrdered size={isMobile ? 14 : 16} />}
                  fontEditorName="toggleOrderedList"
                  font="orderedList"
                />
                <FormatButton editor={editor} icon={<RxCode />} fontEditorName="toggleCodeBlock" font="codeBlock" />
              </div>

              <div className="ml-auto flex items-center justify-center w-full sm:w-auto mt-1 sm:mt-0">
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
                    ? "after:w-auto after:h-min after:content-['Sem_Titulo'] after:block after:text-zinc-600 after:text-xl sm:text-2xl md:text-4xl after:absolute after:-top-2 after:z-0"
                    : ""
                }`,
                `px-2 sm:px-4 ${isNewContent && "md:max-w-[92%] m-[0_auto!important]"}`,
                `${zenMode ? "md:mr-0" : isMobile ? "mr-0" : "md:mr-[15%] lg:mr-[25%]"}`,
              )}
            />

            <div
              className={`w-full h-auto flex flex-col sm:flex-row items-center justify-end gap-2 sm:gap-4 px-2 sm:px-0 ${
                zenMode ? "opacity-80 hover:opacity-100 transition-opacity" : ""
              }`}
            >
              <button
                className="w-full sm:w-auto px-3 sm:px-6 md:px-8 py-1 md:py-2 border border-zinc-600 rounded-lg hover:bg-zinc-600 text-zinc-600 dark:border-zinc-400 dark:hover:bg-zinc-400 dark:hover:text-white dark:text-gray-400 hover:text-white text-sm"
                onClick={() => setEdit(false)}
              >
                Cancelar
              </button>
              <button
                className="w-full sm:w-auto px-3 sm:px-6 md:px-8 py-1 md:py-2 border border-green-600 rounded-lg hover:bg-green-600 text-green-600 hover:text-white text-sm"
                onClick={() => saveAnnotation(editor?.getHTML(), currentArticle.id, true)}
              >
                Salvar
              </button>
            </div>

            {editor && <MenuBubbleEditor editor={editor} />}
          </>
        ) : (
          <div
            className={`px-2 sm:px-4 md:px-0 ${zenMode ? "zen-content text-base sm:text-lg leading-relaxed" : ""}`}
            dangerouslySetInnerHTML={{ __html: editor?.getHTML() }}
          />
        )}
      </div>

      {isLoading && <Loading />}
    </>
  );
}
