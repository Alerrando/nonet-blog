import "highlight.js/styles/panda-syntax-dark.css";
import "./Editor.css";

import * as Popover from "@radix-ui/react-popover";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import BulletList from "@tiptap/extension-bullet-list";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import { BubbleMenu, EditorContent, FloatingMenu, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import js from "highlight.js/lib/languages/javascript";
import html from "highlight.js/lib/languages/xml";
import { all, createLowlight } from "lowlight";
import { LuSettings2 } from "react-icons/lu";
import { RxChatBubble, RxChevronDown, RxCode, RxFontBold, RxFontItalic, RxStrikethrough } from "react-icons/rx";
import { twMerge } from "tailwind-merge";

import { FloatingMenuShow } from "../FloatingMenuShow";
import { ModalInfoPopover } from "../ModalInfoPopover";

const lowlight = createLowlight(all);

lowlight.register("html", html);
lowlight.register("js", js);

type EditorProps = {
  isNewContent: boolean;
  saveAnnotation: (getHtml: string | undefined, id?: string) => void;
};

export function Editor({ isNewContent, saveAnnotation }: EditorProps) {
  const toggleGroupItemClasses =
    "p-2 text-zinc-200 text-sm flex items-center gap-1.5 font-medium leading-none hover:text-zinc-50 hover:bg-zinc-600 data-[active=true]:text-violet-400";
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
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "h-full outline-none z-10",
      },
    },
  });

  return (
    <>
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
      >
        <div className="w-full h-auto flex items-center justify-end">
          <button
            className="px-6 md:px-8 py-1 md:py-2 border border-green-600 rounded-lg hover:bg-green-600 text-green-600 hover:text-white"
            onClick={() => saveAnnotation(editor?.getHTML(), id)}
          >
            Salvar
          </button>
        </div>
      </EditorContent>
      {editor && (
        <FloatingMenu
          editor={editor}
          shouldShow={({ state }) => {
            const { $from } = state.selection;

            const currentLineText = $from.nodeBefore?.textContent;

            return currentLineText === "/";
          }}
        >
          <Popover.Root>
            <Popover.Trigger asChild>
              <button
                className="rounded-full w-[32px] h-[32px] inline-flex items-center justify-center text-violet11 bg-zinc-100 shadow-lg hover:shadow-[0_0_0_2px] hover:shadow-zinc-800 focus:shadow-[0_0_0_2px] focus:shadow-zinc-800 cursor-default outline-none"
                aria-label="Update dimensions"
              >
                <LuSettings2 className="text-black" />
              </button>
            </Popover.Trigger>

            <Popover.Portal>
              <Popover.Content className="h-2/4 bg-zinc-700 md:bg-zinc-50 md:dark:bg-zinc-700/5 py-1 px-1 gap-1 shadow-xl border border-zinc-600 md:border-zinc-200 md:dark:border-zinc-700/md:dark:bg-zinc-700/5 shadow-black/20 rounded-lg overflow-hidden flex flex-col overflow-y-auto z-[65]">
                <div className="group flex relative" onClick={() => editor.chain().focus().setParagraph().run()}>
                  <FloatingMenuShow.Root>
                    <FloatingMenuShow.Img
                      src="https://www.notion.so/images/blocks/text/en-US.png"
                      alt="Text"
                      className="w-12 border border-zinc-600 rounded"
                    />

                    <FloatingMenuShow.TextInput
                      texts={[{ text: "Text" }, { text: "Just start writing with plain text." }]}
                    />
                  </FloatingMenuShow.Root>

                  <ModalInfoPopover
                    src="https://www.notion.so/images/tooltips/blocks/text/en-US.png"
                    alt="Text"
                    spanText="Just start writing with plain text"
                    classNamePopover="-top-6"
                  />
                </div>

                <div className="group" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
                  <FloatingMenuShow.Root>
                    <FloatingMenuShow.Img
                      src="https://www.notion.so/images/blocks/header.57a7576a.png"
                      alt="Heading 1"
                      className="w-12 border border-zinc-600 rounded"
                    />

                    <FloatingMenuShow.TextInput texts={[{ text: "Heading 1" }, { text: "Big section heading." }]} />
                  </FloatingMenuShow.Root>

                  <ModalInfoPopover
                    src="https://www.notion.so/images/tooltips/blocks/header/en-US.png"
                    alt="Heading 1"
                    spanText="Big section heading."
                    classNamePopover="top-6"
                  />
                </div>

                <div
                  className="group"
                  onClick={() => {
                    editor.chain().focus().toggleHeading({ level: 2 }).run();
                  }}
                >
                  <FloatingMenuShow.Root>
                    <FloatingMenuShow.Img
                      src="https://www.notion.so/images/blocks/subheader.9aab4769.png"
                      alt="Heading 2"
                      className="w-12 border border-zinc-600 rounded"
                    />

                    <FloatingMenuShow.TextInput texts={[{ text: "Heading 2" }, { text: "Medium section heading." }]} />
                  </FloatingMenuShow.Root>

                  <ModalInfoPopover
                    src="https://www.notion.so/images/tooltips/blocks/sub-header/en-US.png"
                    alt="Heading 2"
                    spanText="Medium section heading."
                    classNamePopover="top-16"
                  />
                </div>

                <div
                  className="group"
                  onClick={() => {
                    editor.chain().focus().toggleHeading({ level: 3 }).run();
                  }}
                >
                  <FloatingMenuShow.Root>
                    <FloatingMenuShow.Img
                      src="https://www.notion.so/images/blocks/subsubheader.d0ed0bb3.png"
                      alt="Heading 3"
                      className="w-12 border border-zinc-600 rounded"
                    />

                    <FloatingMenuShow.TextInput texts={[{ text: "Heading 3" }, { text: "Low section heading." }]} />
                  </FloatingMenuShow.Root>

                  <ModalInfoPopover
                    src="https://www.notion.so/images/tooltips/blocks/subsubheader/en-US.png"
                    alt="Heading 3"
                    spanText="Low section heading."
                    classNamePopover="top-32"
                  />
                </div>

                <div className="group" onClick={() => editor.chain().focus().toggleBulletList().run()}>
                  <FloatingMenuShow.Root>
                    <FloatingMenuShow.Img
                      src="https://www.notion.so/images/blocks/bulleted-list.0e87e917.png"
                      alt="List Bullet"
                      className="w-12 border border-zinc-600 rounded"
                    />

                    <FloatingMenuShow.TextInput texts={[{ text: "List Bullet" }, { text: "List bullet create." }]} />
                  </FloatingMenuShow.Root>

                  <ModalInfoPopover
                    src="https://www.notion.so/images/tooltips/blocks/bulleted-list/en-US.png"
                    alt="List Bullet"
                    spanText="List bullet create."
                    classNamePopover="top-52"
                  />
                </div>

                <div className="group" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                  <FloatingMenuShow.Root>
                    <FloatingMenuShow.Img
                      src="https://www.notion.so/images/blocks/numbered-list.0406affe.png"
                      alt="Ordered List"
                      className="w-12 border border-zinc-600 rounded"
                    />

                    <FloatingMenuShow.TextInput texts={[{ text: "Ordered List" }, { text: "Ordered List create." }]} />
                  </FloatingMenuShow.Root>

                  <ModalInfoPopover
                    src="https://www.notion.so/images/tooltips/blocks/numbered-list/en-US.png"
                    alt="Ordered Bullet"
                    spanText="Ordered bullet create."
                    classNamePopover="top-64"
                  />
                </div>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </FloatingMenu>
      )}

      {editor && (
        <BubbleMenu editor={editor}>
          <ToggleGroup.Root
            className="bg-zinc-700 shadow-xl border border-zinc-600 shadow-black/20 rounded-lg overflow-hidden flex divide-x divide-zinc-600"
            type="single"
            defaultValue="text"
            aria-label="Menu Bubble Item"
          >
            <ToggleGroup.Item value="text" aria-label="Text Item" className={toggleGroupItemClasses}>
              Text
              <RxChevronDown className="w-4 h-4" />
            </ToggleGroup.Item>

            <ToggleGroup.Item value="comment" aria-label="Comment Item" className={toggleGroupItemClasses}>
              Comment
              <RxChatBubble className="w-4 h-4" />
            </ToggleGroup.Item>

            <div className="flex items-center">
              <ToggleGroup.Item
                value="font-bold"
                aria-label="Font Bold Item"
                onClick={() => editor.chain().focus().toggleBold().run()}
                data-active={editor.isActive("bold")}
                className={toggleGroupItemClasses}
              >
                <RxFontBold className="w-4 h-4" />
              </ToggleGroup.Item>

              <ToggleGroup.Item
                value="font-italic"
                aria-label="Font Italic Item"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                data-active={editor.isActive("italic")}
                className={toggleGroupItemClasses}
              >
                <RxFontItalic className="w-4 h-4" />
              </ToggleGroup.Item>

              <ToggleGroup.Item
                value="font-strike"
                aria-label="Font Strike Item"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                data-active={editor.isActive("strike")}
                className={toggleGroupItemClasses}
              >
                <RxStrikethrough className="w-4 h-4" />
              </ToggleGroup.Item>

              <ToggleGroup.Item
                value="font-code"
                aria-label="Font Code Item"
                onClick={() => editor.chain().focus().toggleCode().run()}
                data-active={editor.isActive("code")}
                className={toggleGroupItemClasses}
              >
                <RxCode className="w-4 h-4" />
              </ToggleGroup.Item>
            </div>
          </ToggleGroup.Root>
        </BubbleMenu>
      )}
    </>
  );
}
